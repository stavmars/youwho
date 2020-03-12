package gr.ekke.youwho.service;

import gr.ekke.youwho.domain.NewsPost;
import gr.ekke.youwho.repository.NewsPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link NewsPost}.
 */
@Service
public class NewsPostService {

    private final Logger log = LoggerFactory.getLogger(NewsPostService.class);

    private final NewsPostRepository newsPostRepository;

    public NewsPostService(NewsPostRepository newsPostRepository) {
        this.newsPostRepository = newsPostRepository;
    }

    /**
     * Save a newsPost.
     *
     * @param newsPost the entity to save.
     * @return the persisted entity.
     */
    public NewsPost save(NewsPost newsPost) {
        log.debug("Request to save NewsPost : {}", newsPost);
        return newsPostRepository.save(newsPost);
    }

    /**
     * Get all the newsPosts.
     *
     * @return the list of entities.
     */
    public List<NewsPost> findAll() {
        log.debug("Request to get all NewsPosts");
        return newsPostRepository.findAll();
    }


    /**
     * Get one newsPost by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<NewsPost> findOne(String id) {
        log.debug("Request to get NewsPost : {}", id);
        return newsPostRepository.findById(id);
    }

    /**
     * Delete the newsPost by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete NewsPost : {}", id);
        newsPostRepository.deleteById(id);
    }
}
