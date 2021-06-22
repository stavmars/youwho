package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.domain.QuestionResponse;
import gr.ekke.youwho.domain.SurveyResponse;
import gr.ekke.youwho.service.SurveyResponseService;
import gr.ekke.youwho.service.SurveyService;
import gr.ekke.youwho.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.youwho.domain.SurveyResponse}.
 */
@RestController
@RequestMapping("/api")
public class SurveyResponseResource {

    private static final String ENTITY_NAME = "surveyResponse";
    private final Logger log = LoggerFactory.getLogger(SurveyResponseResource.class);
    private final SurveyResponseService surveyResponseService;
    private final SurveyService surveyService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public SurveyResponseResource(SurveyResponseService surveyResponseService, SurveyService surveyService) {
        this.surveyResponseService = surveyResponseService;
        this.surveyService = surveyService;
    }

    /**
     * {@code POST  /survey-responses} : Create a new surveyResponse.
     *
     * @param surveyResponse the surveyResponse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new surveyResponse, or with status {@code 400 (Bad Request)} if the surveyResponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/survey-responses")
    public ResponseEntity<SurveyResponse> createSurveyResponse(@Valid @RequestBody SurveyResponse surveyResponse) throws URISyntaxException {
        log.debug("REST request to save SurveyResponse : {}", surveyResponse);
        if (surveyResponse.getId() != null) {
            throw new BadRequestAlertException("A new surveyResponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SurveyResponse result = surveyResponseService.save(surveyResponse);
        return ResponseEntity.created(new URI("/api/survey-responses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /survey-responses} : Updates an existing surveyResponse.
     *
     * @param surveyResponse the surveyResponse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated surveyResponse,
     * or with status {@code 400 (Bad Request)} if the surveyResponse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the surveyResponse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/survey-responses")
    public ResponseEntity<SurveyResponse> updateSurveyResponse(@Valid @RequestBody SurveyResponse surveyResponse) throws URISyntaxException {
        log.debug("REST request to update SurveyResponse : {}", surveyResponse);
        if (surveyResponse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SurveyResponse result = surveyResponseService.save(surveyResponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, surveyResponse.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /survey-responses} : get all the surveyResponses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveyResponses in body.
     */
    @GetMapping("/survey-responses")
    public ResponseEntity<List<SurveyResponse>> getAllSurveyResponses(Pageable pageable) {
        log.debug("REST request to get a page of SurveyResponses");
        Page<SurveyResponse> page = surveyResponseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /survey-responses/:id} : get the "id" surveyResponse.
     *
     * @param id the id of the surveyResponse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the surveyResponse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/survey-responses/{id}")
    public ResponseEntity<SurveyResponse> getSurveyResponse(@PathVariable String id) {
        log.debug("REST request to get SurveyResponse : {}", id);
        Optional<SurveyResponse> surveyResponse = surveyResponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(surveyResponse);
    }

    /**
     * {@code DELETE  /survey-responses/:id} : delete the "id" surveyResponse.
     *
     * @param id the id of the surveyResponse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/survey-responses/{id}")
    public ResponseEntity<Void> deleteSurveyResponse(@PathVariable String id) {
        log.debug("REST request to delete SurveyResponse : {}", id);
        surveyResponseService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code PUT /survey-responses/:id/response}
     *
     * @param id               the id of the surveyResponse to update
     * @param questionResponse to add
     * @return the updated surveyResponse.
     */
    @PutMapping("/survey-responses/{id}/response")
    public SurveyResponse addQuestionResponse(@PathVariable String id, @RequestBody QuestionResponse questionResponse) {
        log.debug("REST request to add QuestionResponse : {} to SurveyRespons : {}", questionResponse, id);
        return surveyResponseService.addQuestionResponse(id, questionResponse);
    }

    /**
     * {@code GET  /survey-responses/results/:id} : get the profiling results of "id" surveyResponse.
     *
     * @param id the id of the surveyResponse to retrieve its profiling results.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profiling results, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/survey-responses/results/{id}")
    public ResponseEntity<Map<String, Double>> getProfilingResults(@PathVariable String id) {
        log.debug("REST request to get profiling resutls for survey response : {}", id);
        return ResponseUtil.wrapOrNotFound(surveyResponseService.findOne(id).map(SurveyResponse::getProfilingResults));
    }

    /**
     * {@code POST  /survey-responses/:surveyId/results} : get the average profiling results for survey responses with "questionFilters" included in QuestionResponses.
     *
     * @param surveyId        the id of the survey to get average profiling results for
     * @param questionFilters the list of questionFilters
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profiling results, or with status {@code 404 (Not Found)}.
     */
    @PostMapping("/survey-responses/total-results/{surveyId}")
    public Optional<Map<String, Double>> getAverageProfilingResults(@PathVariable String surveyId, @RequestBody Map<String, Object> questionFilters) {
        log.debug("REST request to get average profiling results for questionFilters: {}", questionFilters);
        return surveyService.findOne(surveyId).map(survey -> survey.getProfilingVariables() != null ? surveyResponseService.getAverageProfilingResults(survey, questionFilters) : null);
    }

    /**
     * {@code GET  /survey-responses/non-empty} : get count of all non empty surveyResponses.
     *
     * @return the amount.
     */
    @GetMapping("/survey-responses/{surveyId}/non-empty")
    public Integer countAllNonEmptySurveyResponses(@PathVariable String surveyId) {
        log.debug("REST request to get count of all non empty SurveyResponses");
        return surveyResponseService.countAllNonEmptySurveyResponses(surveyId);
    }

    /**
     * {@code GET  /survey-responses/completed} : get count of all completed surveyResponses.
     *
     * @return the amount.
     */
    @GetMapping("/survey-responses/{surveyId}/completed")
    public Integer countAllCompletedSurveyResponses(@PathVariable String surveyId) {
        log.debug("REST request to get count of all completed SurveyResponses");
        return surveyResponseService.countAllCompletedSurveyResponses(surveyId);
    }

    /**
     * {@code GET  /survey-responses/avgTime/:surveyId} : get average completion time of survey.
     *
     * @param surveyId the id of the survey to get average completion time for
     * @return the total time.
     */
    @GetMapping("/survey-responses/{surveyId}/avgTime")
    public Double getAverageSurveyResponseTime(@PathVariable String surveyId) {
        log.debug("REST request to get count of all completed SurveyResponses");
        return surveyResponseService.getAverageSurveyResponseTime(surveyService.findOne(surveyId).get());
    }

    /**
     * {@code GET  /survey-responses/all/completed/:surveyId} : get all completed surveyResponses.
     *
     * @return the desired list.
     */
    @GetMapping("/survey-responses/{surveyId}/all/completed")
    public List<SurveyResponse> getAllCompletedSurveyResponse(@PathVariable String surveyId) {
        log.debug("REST request to get all completed SurveyResponses");
        return surveyResponseService.getAllSurveyResponseByStatus(surveyId, "completed");
    }

    /**
     * {@code GET  /survey-responses/all/non-empty} : get all non empty surveyResponses.
     *
     * @return the desired list.
     */
    @GetMapping("/survey-responses/{surveyId}/all/non-empty")
    public ResponseEntity<List<SurveyResponse>> getAllNonEmptySurveyResponses(@PathVariable String surveyId, Pageable pageable) {
        log.debug("REST request to get a page of all non empty SurveyResponses");
        Page<SurveyResponse> page = surveyResponseService.getAllNonEmptySurveyResponses(surveyId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

   /* *//**
     * {@code GET /survey-responses/duplicate/answers/completed} : find and fix all completed responses with duplicated answers.
     *
     * @return the desired list.
     *//*
    @GetMapping("/survey-responses/duplicate/answers/completed")
    public List<SurveyResponse> findAndFixAllCompletedSurveyResponseWithDuplicateAnswers() {
        log.debug("REST request to get all completed SurveyResponses with duplicated answers");
        List<SurveyResponse> completedSurveys = surveyResponseService.getAllSurveyResponseByStatus("completed");

        // Keep only those with duplicate question responses.
        completedSurveys.removeIf(surveyResponse -> surveyResponse.getQuestionResponses().size() <= 89);

        for (SurveyResponse completedSurvey : completedSurveys) {
            // Create an array with 0s for all questions.
            int[] answersArray = new int[89];
            Arrays.fill(answersArray, 0);
            // Count for each question response the amount of answer each question has.
            for (int i = 0; i < completedSurvey.getQuestionResponses().size(); i++) {
                QuestionResponse questionResponse = completedSurvey.getQuestionResponses().get(i);
                answersArray[Integer.parseInt(questionResponse.getQuestionId()) - 1]++;
            }
            for (int i = 0; i < 89; i++) {
                // For any question with more than one answer, remove all duplicates and keep the last one.
                while (answersArray[i] > 1) {
                    final int id = i + 1;
                    QuestionResponse duplicate = completedSurvey.getQuestionResponses()
                        .stream()
                        .filter(questionResponse -> questionResponse.getQuestionId().equals(String.valueOf(id)))
                        .findFirst()
                        .get();
                    completedSurvey.getQuestionResponses().remove(duplicate);
                    answersArray[i]--;
                }
            }
        }
        // Finally return this list so it can be updated to the database.
        return completedSurveys;
    }*/
}
