package gr.ekke.youwho.service;

import gr.ekke.youwho.domain.Survey;
import gr.ekke.youwho.repository.SurveyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Survey}.
 */
@Service
public class SurveyService {

    private final Logger log = LoggerFactory.getLogger(SurveyService.class);

    private final SurveyRepository surveyRepository;

    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    /**
     * Save a survey.
     *
     * @param survey the entity to save.
     * @return the persisted entity.
     */
    public Survey save(Survey survey) {
        log.debug("Request to save Survey : {}", survey);
        return surveyRepository.save(survey);
    }

    /**
     * Get all the surveys.
     *
     * @return the list of entities.
     */
    public List<Survey> findAll() {
        log.debug("Request to get all Surveys");
        return surveyRepository.findAll();
    }


    /**
     * Get one survey by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Survey> findOne(String id) {
        log.debug("Request to get Survey : {}", id);
        return surveyRepository.findById(id);
    }

    /**
     * Delete the survey by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Survey : {}", id);
        surveyRepository.deleteById(id);
    }
}
