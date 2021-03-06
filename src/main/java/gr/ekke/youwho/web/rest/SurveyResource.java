package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.domain.Survey;
import gr.ekke.youwho.service.MailService;
import gr.ekke.youwho.service.SurveyService;
import gr.ekke.youwho.web.rest.errors.BadRequestAlertException;

import gr.ekke.youwho.web.rest.vm.ContactInfoVM;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.youwho.domain.Survey}.
 */
@RestController
@RequestMapping("/api")
public class SurveyResource {

    private final Logger log = LoggerFactory.getLogger(SurveyResource.class);

    private static final String ENTITY_NAME = "survey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SurveyService surveyService;

    private final MailService mailService;

    public SurveyResource(SurveyService surveyService, MailService mailService) {
        this.surveyService = surveyService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /surveys} : Create a new survey.
     *
     * @param survey the survey to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new survey, or with status {@code 400 (Bad Request)} if the survey has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/surveys")
    public ResponseEntity<Survey> createSurvey(@Valid @RequestBody Survey survey) throws URISyntaxException {
        log.debug("REST request to save Survey : {}", survey);
        Survey result = surveyService.save(survey);
        return ResponseEntity.created(new URI("/api/surveys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /surveys} : Updates an existing survey.
     *
     * @param survey the survey to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated survey,
     * or with status {@code 400 (Bad Request)} if the survey is not valid,
     * or with status {@code 500 (Internal Server Error)} if the survey couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/surveys")
    public ResponseEntity<Survey> updateSurvey(@Valid @RequestBody Survey survey) throws URISyntaxException {
        log.debug("REST request to update Survey : {}", survey);
        if (survey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Survey result = surveyService.save(survey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, survey.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /surveys} : get all the surveys.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of surveys in body.
     */
    @GetMapping("/surveys")
    public List<Survey> getAllSurveys() {
        log.debug("REST request to get all Surveys");
        return surveyService.findAll();
    }

    /**
     * {@code GET  /surveys/:id} : get the "id" survey.
     *
     * @param id the id of the survey to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the survey, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/surveys/{id}")
    public ResponseEntity<Survey> getSurvey(@PathVariable String id) {
        log.debug("REST request to get Survey : {}", id);
        Optional<Survey> survey = surveyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(survey);
    }

    /**
     * {@code DELETE  /surveys/:id} : delete the "id" survey.
     *
     * @param id the id of the survey to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/surveys/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable String id) {
        log.debug("REST request to delete Survey : {}", id);
        surveyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code POST  /surveys/contact} : Contact Survey owner.
     *
     * @param contactInfoVM name, email and content of the contacting person.
     */
    @PostMapping("/surveys/contact")
    public void contactSurveyOwner(@Valid @RequestBody ContactInfoVM contactInfoVM) {
        log.debug("REST request to contact Survey Owner by {} {} with comment {}", contactInfoVM.getContactName(), contactInfoVM.getContactEmail(), contactInfoVM.getContactContent());
        mailService.sendContactEmailFromTemplate(contactInfoVM.getContactName(), contactInfoVM.getContactEmail(), contactInfoVM.getContactContent(), "mail/contactEmail", "email.contact.title");
    }
}
