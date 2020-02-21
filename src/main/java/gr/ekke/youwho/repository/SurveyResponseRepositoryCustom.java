package gr.ekke.youwho.repository;

import gr.ekke.youwho.domain.Survey;

import java.util.Map;

/**
 * Custom repository for the SurveyResponse entity.
 */
@SuppressWarnings("unused")
public interface SurveyResponseRepositoryCustom {

    Map<String, Double> getAverageProfilingResults(Survey survey, Map<String, Object> questionFilters);

    Map<String, Double> getAverageQuestionResponseTime();

    Double getAverageSurveyResponseTime(Survey survey);

}
