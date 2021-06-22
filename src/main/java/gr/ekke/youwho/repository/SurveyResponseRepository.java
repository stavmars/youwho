package gr.ekke.youwho.repository;

import gr.ekke.youwho.domain.QuestionResponse;
import gr.ekke.youwho.domain.SurveyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Integer countAllBySurveyIdAndQuestionResponsesGreaterThan(String surveyId, List<QuestionResponse> questionResponses);

    Integer countAllBySurveyIdAndStatusEquals(String surveyId, String status);

    List<SurveyResponse> getAllBySurveyIdAndStatusEquals(String surveyId, String status);

    Page<SurveyResponse> getAllBySurveyIdAndQuestionResponsesGreaterThan(String surveyId, List<QuestionResponse> questionResponses, Pageable pageable);
}
