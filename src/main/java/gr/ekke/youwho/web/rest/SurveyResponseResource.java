package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.domain.SurveyResponse;
import gr.ekke.youwho.service.SurveyResponseService;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.youwho.domain.SurveyResponse}.
 */
@RestController
@RequestMapping("/api")
public class SurveyResponseResource {

    private final Logger log = LoggerFactory.getLogger(SurveyResponseResource.class);

    private static final String ENTITY_NAME = "surveyResponse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyResponseService surveyResponseService;

    public SurveyResponseResource(SurveyResponseService surveyResponseService) {
        this.surveyResponseService = surveyResponseService;
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
}
