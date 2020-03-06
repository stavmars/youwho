package gr.ekke.youwho.repository;

import gr.ekke.youwho.domain.QuestionResponse;
import gr.ekke.youwho.domain.SurveyResponse;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the SurveyResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyResponseRepository extends MongoRepository<SurveyResponse, String>, SurveyResponseRepositoryCustom {

    Integer countAllByQuestionResponsesGreaterThan(List<QuestionResponse> questionResponses);

    Integer countAllByStatusEquals(String status);

    List<SurveyResponse> getAllByStatusEquals(String status);

    List<SurveyResponse> getAllByQuestionResponsesGreaterThan(List<QuestionResponse> questionResponses);
}
