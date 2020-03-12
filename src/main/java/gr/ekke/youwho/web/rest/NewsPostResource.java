package gr.ekke.youwho.web.rest;

import gr.ekke.youwho.domain.NewsPost;
import gr.ekke.youwho.service.NewsPostService;
import gr.ekke.youwho.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link gr.ekke.youwho.domain.NewsPost}.
 */
@RestController
@RequestMapping("/api")
public class NewsPostResource {

    private final Logger log = LoggerFactory.getLogger(NewsPostResource.class);

    private static final String ENTITY_NAME = "newsPost";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsPostService newsPostService;

    public NewsPostResource(NewsPostService newsPostService) {
        this.newsPostService = newsPostService;
    }

    /**
     * {@code POST  /news-posts} : Create a new newsPost.
     *
     * @param newsPost the newsPost to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new newsPost, or with status {@code 400 (Bad Request)} if the newsPost has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news-posts")
    public ResponseEntity<NewsPost> createNewsPost(@Valid @RequestBody NewsPost newsPost) throws URISyntaxException {
        log.debug("REST request to save NewsPost : {}", newsPost);
        if (newsPost.getId() != null) {
            throw new BadRequestAlertException("A new newsPost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NewsPost result = newsPostService.save(newsPost);
        return ResponseEntity.created(new URI("/api/news-posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /news-posts} : Updates an existing newsPost.
     *
     * @param newsPost the newsPost to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsPost,
     * or with status {@code 400 (Bad Request)} if the newsPost is not valid,
     * or with status {@code 500 (Internal Server Error)} if the newsPost couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news-posts")
    public ResponseEntity<NewsPost> updateNewsPost(@Valid @RequestBody NewsPost newsPost) throws URISyntaxException {
        log.debug("REST request to update NewsPost : {}", newsPost);
        if (newsPost.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NewsPost result = newsPostService.save(newsPost);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, newsPost.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /news-posts} : get all the newsPosts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of newsPosts in body.
     */
    @GetMapping("/news-posts")
    public List<NewsPost> getAllNewsPosts() {
        log.debug("REST request to get all NewsPosts");
        return newsPostService.findAll();
    }

    /**
     * {@code GET  /news-posts/:id} : get the "id" newsPost.
     *
     * @param id the id of the newsPost to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the newsPost, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news-posts/{id}")
    public ResponseEntity<NewsPost> getNewsPost(@PathVariable String id) {
        log.debug("REST request to get NewsPost : {}", id);
        Optional<NewsPost> newsPost = newsPostService.findOne(id);
        return ResponseUtil.wrapOrNotFound(newsPost);
    }

    /**
     * {@code DELETE  /news-posts/:id} : delete the "id" newsPost.
     *
     * @param id the id of the newsPost to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news-posts/{id}")
    public ResponseEntity<Void> deleteNewsPost(@PathVariable String id) {
        log.debug("REST request to delete NewsPost : {}", id);
        newsPostService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
