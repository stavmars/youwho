package gr.ekke.youwho.repository;

import gr.ekke.youwho.domain.SurveyResponse;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SurveyResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyResponseRepository extends MongoRepository<SurveyResponse, String> {

}
