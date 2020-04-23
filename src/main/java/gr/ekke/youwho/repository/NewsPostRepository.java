package gr.ekke.youwho.repository;
import gr.ekke.youwho.domain.NewsPost;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the NewsPost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsPostRepository extends MongoRepository<NewsPost, String> {

    @Query(value="{}", fields="{ 'content': 0 }")
    List<NewsPost> findAll();
}
