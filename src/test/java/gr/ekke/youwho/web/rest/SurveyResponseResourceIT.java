package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.YouwhoApp;
import gr.ekke.youwho.domain.SurveyResponse;
import gr.ekke.youwho.repository.SurveyResponseRepository;
import gr.ekke.youwho.service.SurveyResponseService;
import gr.ekke.youwho.service.SurveyService;
import gr.ekke.youwho.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static gr.ekke.youwho.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SurveyResponseResource} REST controller.
 */
@SpringBootTest(classes = YouwhoApp.class)
public class SurveyResponseResourceIT {

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_START_TIME = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_END_TIME = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_SURVEY_ID = "AAAAAAAAAA";
    private static final String UPDATED_SURVEY_ID = "BBBBBBBBBB";

    @Autowired
    private SurveyResponseRepository surveyResponseRepository;

    @Autowired
    private SurveyResponseService surveyResponseService;

    @Autowired
    private SurveyService surveyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSurveyResponseMockMvc;

    private SurveyResponse surveyResponse;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SurveyResponseResource surveyResponseResource = new SurveyResponseResource(surveyResponseService, surveyService);
        this.restSurveyResponseMockMvc = MockMvcBuilders.standaloneSetup(surveyResponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyResponse createEntity() {
        SurveyResponse surveyResponse = new SurveyResponse()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .status(DEFAULT_STATUS)
            .surveyId(DEFAULT_SURVEY_ID);
        return surveyResponse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SurveyResponse createUpdatedEntity() {
        SurveyResponse surveyResponse = new SurveyResponse()
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .status(UPDATED_STATUS)
            .surveyId(UPDATED_SURVEY_ID);
        return surveyResponse;
    }

    @BeforeEach
    public void initTest() {
        surveyResponseRepository.deleteAll();
        surveyResponse = createEntity();
    }

    @Test
    public void createSurveyResponse() throws Exception {
        int databaseSizeBeforeCreate = surveyResponseRepository.findAll().size();

        // Create the SurveyResponse
        restSurveyResponseMockMvc.perform(post("/api/survey-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyResponse)))
            .andExpect(status().isCreated());

        // Validate the SurveyResponse in the database
        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeCreate + 1);
        SurveyResponse testSurveyResponse = surveyResponseList.get(surveyResponseList.size() - 1);
        assertThat(testSurveyResponse.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testSurveyResponse.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testSurveyResponse.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSurveyResponse.getSurveyId()).isEqualTo(DEFAULT_SURVEY_ID);
    }

    @Test
    public void createSurveyResponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = surveyResponseRepository.findAll().size();

        // Create the SurveyResponse with an existing ID
        surveyResponse.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSurveyResponseMockMvc.perform(post("/api/survey-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyResponse)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyResponse in the database
        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkSurveyIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = surveyResponseRepository.findAll().size();
        // set the field null
        surveyResponse.setSurveyId(null);

        // Create the SurveyResponse, which fails.

        restSurveyResponseMockMvc.perform(post("/api/survey-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyResponse)))
            .andExpect(status().isBadRequest());

        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSurveyResponses() throws Exception {
        // Initialize the database
        surveyResponseRepository.save(surveyResponse);

        // Get all the surveyResponseList
        restSurveyResponseMockMvc.perform(get("/api/survey-responses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(surveyResponse.getId())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].surveyId").value(hasItem(DEFAULT_SURVEY_ID.toString())));
    }

    @Test
    public void getSurveyResponse() throws Exception {
        // Initialize the database
        surveyResponseRepository.save(surveyResponse);

        // Get the surveyResponse
        restSurveyResponseMockMvc.perform(get("/api/survey-responses/{id}", surveyResponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(surveyResponse.getId()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.surveyId").value(DEFAULT_SURVEY_ID.toString()));
    }

    @Test
    public void getNonExistingSurveyResponse() throws Exception {
        // Get the surveyResponse
        restSurveyResponseMockMvc.perform(get("/api/survey-responses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSurveyResponse() throws Exception {
        // Initialize the database
        surveyResponseService.save(surveyResponse);

        int databaseSizeBeforeUpdate = surveyResponseRepository.findAll().size();

        // Update the surveyResponse
        SurveyResponse updatedSurveyResponse = surveyResponseRepository.findById(surveyResponse.getId()).get();
        updatedSurveyResponse
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .status(UPDATED_STATUS)
            .surveyId(UPDATED_SURVEY_ID);

        restSurveyResponseMockMvc.perform(put("/api/survey-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSurveyResponse)))
            .andExpect(status().isOk());

        // Validate the SurveyResponse in the database
        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeUpdate);
        SurveyResponse testSurveyResponse = surveyResponseList.get(surveyResponseList.size() - 1);
        assertThat(testSurveyResponse.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testSurveyResponse.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testSurveyResponse.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSurveyResponse.getSurveyId()).isEqualTo(UPDATED_SURVEY_ID);
    }

    @Test
    public void updateNonExistingSurveyResponse() throws Exception {
        int databaseSizeBeforeUpdate = surveyResponseRepository.findAll().size();

        // Create the SurveyResponse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSurveyResponseMockMvc.perform(put("/api/survey-responses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(surveyResponse)))
            .andExpect(status().isBadRequest());

        // Validate the SurveyResponse in the database
        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSurveyResponse() throws Exception {
        // Initialize the database
        surveyResponseService.save(surveyResponse);

        int databaseSizeBeforeDelete = surveyResponseRepository.findAll().size();

        // Delete the surveyResponse
        restSurveyResponseMockMvc.perform(delete("/api/survey-responses/{id}", surveyResponse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAll();
        assertThat(surveyResponseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SurveyResponse.class);
        SurveyResponse surveyResponse1 = new SurveyResponse();
        surveyResponse1.setId("id1");
        SurveyResponse surveyResponse2 = new SurveyResponse();
        surveyResponse2.setId(surveyResponse1.getId());
        assertThat(surveyResponse1).isEqualTo(surveyResponse2);
        surveyResponse2.setId("id2");
        assertThat(surveyResponse1).isNotEqualTo(surveyResponse2);
        surveyResponse1.setId(null);
        assertThat(surveyResponse1).isNotEqualTo(surveyResponse2);
    }
}
