package gr.ekke.youwho.repository;

import gr.ekke.youwho.domain.ProfilingVariable;
import gr.ekke.youwho.domain.Survey;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.previousOperation;

public class SurveyResponseRepositoryImpl implements SurveyResponseRepositoryCustom {

    private final Logger log = LoggerFactory.getLogger(SurveyResponseRepositoryImpl.class);


    @Autowired
    MongoTemplate mongoTemplate;


    @Override
    public Map<String, Double> getAverageProfilingResults(Survey survey, Map<String, Object> questionFilters) {
        List<AggregationOperation> aggregationOperations = new ArrayList<>();
        if (questionFilters != null && !questionFilters.isEmpty()) {
            Criteria[] criteria = questionFilters.entrySet().stream().map(entry -> {
                Criteria tmpCriteria = Criteria.where("questionId").is(entry.getKey())
                    .and("choiceIds.0");
                Object value = entry.getValue();
                tmpCriteria = value instanceof Collection ? tmpCriteria.in(((Collection)value).toArray()) : tmpCriteria.is(value);
                return Criteria.where("questionResponses").elemMatch(tmpCriteria);}
            ).toArray(Criteria[]::new);
            aggregationOperations.add(Aggregation.match(new Criteria().andOperator(criteria)));
        }
        aggregationOperations.add(Aggregation.match(Criteria.where("survey_id").is(survey.getId())));
        aggregationOperations.add(Aggregation.match(Criteria.where("profilingResults").ne(null)));
        GroupOperation groupOperation = Aggregation.group();

        for (ProfilingVariable profilingVariable : survey.getProfilingVariables()) {
            groupOperation = groupOperation.avg("profilingResults." + profilingVariable.getId()).as(profilingVariable.getId());
        }
        aggregationOperations.add(groupOperation);
        aggregationOperations.add(Aggregation.project().andExclude(previousOperation()));
        Aggregation agg = Aggregation.newAggregation(aggregationOperations);
        log.debug("Mongo agg query to get profiling total results: {} ", agg);

        AggregationResults<Document> result = mongoTemplate
            .aggregate(agg, "survey_response", Document.class);
        Document document = result.getUniqueMappedResult();
        return document == null ? null : document.entrySet().stream().collect(Collectors.toMap(entry -> entry.getKey(), entry -> (Double) entry.getValue()));
    }
}
