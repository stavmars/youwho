package gr.ekke.youwho.service;

import gr.ekke.youwho.domain.QuestionResponse;
import gr.ekke.youwho.domain.Survey;
import gr.ekke.youwho.domain.SurveyResponse;
import gr.ekke.youwho.repository.SurveyResponseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service Implementation for managing {@link SurveyResponse}.
 */
@Service
public class SurveyResponseService {

    private final Logger log = LoggerFactory.getLogger(SurveyResponseService.class);

    private final SurveyResponseRepository surveyResponseRepository;

    public SurveyResponseService(SurveyResponseRepository surveyResponseRepository) {
        this.surveyResponseRepository = surveyResponseRepository;
    }

    /**
     * Save a surveyResponse.
     *
     * @param surveyResponse the entity to save.
     * @return the persisted entity.
     */
    public SurveyResponse save(SurveyResponse surveyResponse) {
        log.debug("Request to save SurveyResponse : {}", surveyResponse);
        return surveyResponseRepository.save(surveyResponse);
    }

    /**
     * Get all the surveyResponses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<SurveyResponse> findAll(Pageable pageable) {
        log.debug("Request to get all SurveyResponses");
        return surveyResponseRepository.findAll(pageable);
    }


    /**
     * Get one surveyResponse by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<SurveyResponse> findOne(String id) {
        log.debug("Request to get SurveyResponse : {}", id);
        return surveyResponseRepository.findById(id);
    }

    /**
     * Delete the surveyResponse by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete SurveyResponse : {}", id);
        surveyResponseRepository.deleteById(id);
    }

    /**
     * Add new question to the surveyResponse id.
     *
     * @param id               the id of the entity.
     * @param questionResponse the question to be added
     */
    public SurveyResponse addQuestionResponse(String id, QuestionResponse questionResponse) {
        log.debug("Request to add QuestionResponse : {} to SurveyResponse : {}", questionResponse, id);
        SurveyResponse surveyResponse = surveyResponseRepository.findById(id).get();
        return surveyResponseRepository.save(surveyResponse.addQuestionResponse(questionResponse));
    }

    public Map<String, Double> getAverageProfilingResults(Survey survey, Map<String, String> questionFilters) {
        log.debug("Request to get average profiling resutls for questionFilters: {}", questionFilters);
        return surveyResponseRepository.getAverageProfilingResults(survey, questionFilters);
    }
}
