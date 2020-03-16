package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.YouwhoApp;
import gr.ekke.youwho.domain.NewsPost;
import gr.ekke.youwho.repository.NewsPostRepository;
import gr.ekke.youwho.service.NewsPostService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;


import java.util.List;

import static gr.ekke.youwho.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NewsPostResource} REST controller.
 */
@SpringBootTest(classes = YouwhoApp.class)
public class NewsPostResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PREVIEW_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PREVIEW_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PREVIEW_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PREVIEW_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_PREVIEW_TITLE = "BBBBBBBBBB";

    @Autowired
    private NewsPostRepository newsPostRepository;

    @Autowired
    private NewsPostService newsPostService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restNewsPostMockMvc;

    private NewsPost newsPost;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NewsPostResource newsPostResource = new NewsPostResource(newsPostService);
        this.restNewsPostMockMvc = MockMvcBuilders.standaloneSetup(newsPostResource)
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
    public static NewsPost createEntity() {
        NewsPost newsPost = new NewsPost()
            .content(DEFAULT_CONTENT)
            .previewImage(DEFAULT_PREVIEW_IMAGE)
            .previewImageContentType(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE)
            .previewTitle(DEFAULT_PREVIEW_TITLE);
        return newsPost;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsPost createUpdatedEntity() {
        NewsPost newsPost = new NewsPost()
            .content(UPDATED_CONTENT)
            .previewImage(UPDATED_PREVIEW_IMAGE)
            .previewImageContentType(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE)
            .previewTitle(UPDATED_PREVIEW_TITLE);
        return newsPost;
    }

    @BeforeEach
    public void initTest() {
        newsPostRepository.deleteAll();
        newsPost = createEntity();
    }

    @Test
    public void createNewsPost() throws Exception {
        int databaseSizeBeforeCreate = newsPostRepository.findAll().size();

        // Create the NewsPost
        restNewsPostMockMvc.perform(post("/api/news-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsPost)))
            .andExpect(status().isCreated());

        // Validate the NewsPost in the database
        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeCreate + 1);
        NewsPost testNewsPost = newsPostList.get(newsPostList.size() - 1);
        assertThat(testNewsPost.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testNewsPost.getPreviewImage()).isEqualTo(DEFAULT_PREVIEW_IMAGE);
        assertThat(testNewsPost.getPreviewImageContentType()).isEqualTo(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE);
        assertThat(testNewsPost.getPreviewTitle()).isEqualTo(DEFAULT_PREVIEW_TITLE);
    }

    @Test
    public void createNewsPostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = newsPostRepository.findAll().size();

        // Create the NewsPost with an existing ID
        newsPost.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsPostMockMvc.perform(post("/api/news-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsPost)))
            .andExpect(status().isBadRequest());

        // Validate the NewsPost in the database
        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsPostRepository.findAll().size();
        // set the field null
        newsPost.setContent(null);

        // Create the NewsPost, which fails.

        restNewsPostMockMvc.perform(post("/api/news-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsPost)))
            .andExpect(status().isBadRequest());

        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllNewsPosts() throws Exception {
        // Initialize the database
        newsPostRepository.save(newsPost);

        // Get all the newsPostList
        restNewsPostMockMvc.perform(get("/api/news-posts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsPost.getId())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].previewImageContentType").value(hasItem(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].previewImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_PREVIEW_IMAGE))))
            .andExpect(jsonPath("$.[*].previewTitle").value(hasItem(DEFAULT_PREVIEW_TITLE.toString())));
    }
    
    @Test
    public void getNewsPost() throws Exception {
        // Initialize the database
        newsPostRepository.save(newsPost);

        // Get the newsPost
        restNewsPostMockMvc.perform(get("/api/news-posts/{id}", newsPost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(newsPost.getId()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.previewImageContentType").value(DEFAULT_PREVIEW_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.previewImage").value(Base64Utils.encodeToString(DEFAULT_PREVIEW_IMAGE)))
            .andExpect(jsonPath("$.previewTitle").value(DEFAULT_PREVIEW_TITLE.toString()));
    }

    @Test
    public void getNonExistingNewsPost() throws Exception {
        // Get the newsPost
        restNewsPostMockMvc.perform(get("/api/news-posts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateNewsPost() throws Exception {
        // Initialize the database
        newsPostService.save(newsPost);

        int databaseSizeBeforeUpdate = newsPostRepository.findAll().size();

        // Update the newsPost
        NewsPost updatedNewsPost = newsPostRepository.findById(newsPost.getId()).get();
        updatedNewsPost
            .content(UPDATED_CONTENT)
            .previewImage(UPDATED_PREVIEW_IMAGE)
            .previewImageContentType(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE)
            .previewTitle(UPDATED_PREVIEW_TITLE);

        restNewsPostMockMvc.perform(put("/api/news-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNewsPost)))
            .andExpect(status().isOk());

        // Validate the NewsPost in the database
        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeUpdate);
        NewsPost testNewsPost = newsPostList.get(newsPostList.size() - 1);
        assertThat(testNewsPost.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testNewsPost.getPreviewImage()).isEqualTo(UPDATED_PREVIEW_IMAGE);
        assertThat(testNewsPost.getPreviewImageContentType()).isEqualTo(UPDATED_PREVIEW_IMAGE_CONTENT_TYPE);
        assertThat(testNewsPost.getPreviewTitle()).isEqualTo(UPDATED_PREVIEW_TITLE);
    }

    @Test
    public void updateNonExistingNewsPost() throws Exception {
        int databaseSizeBeforeUpdate = newsPostRepository.findAll().size();

        // Create the NewsPost

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsPostMockMvc.perform(put("/api/news-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(newsPost)))
            .andExpect(status().isBadRequest());

        // Validate the NewsPost in the database
        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteNewsPost() throws Exception {
        // Initialize the database
        newsPostService.save(newsPost);

        int databaseSizeBeforeDelete = newsPostRepository.findAll().size();

        // Delete the newsPost
        restNewsPostMockMvc.perform(delete("/api/news-posts/{id}", newsPost.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NewsPost> newsPostList = newsPostRepository.findAll();
        assertThat(newsPostList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NewsPost.class);
        NewsPost newsPost1 = new NewsPost();
        newsPost1.setId("id1");
        NewsPost newsPost2 = new NewsPost();
        newsPost2.setId(newsPost1.getId());
        assertThat(newsPost1).isEqualTo(newsPost2);
        newsPost2.setId("id2");
        assertThat(newsPost1).isNotEqualTo(newsPost2);
        newsPost1.setId(null);
        assertThat(newsPost1).isNotEqualTo(newsPost2);
    }
}
