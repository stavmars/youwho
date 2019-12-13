package gr.ekke.youwho.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

/**
 * A SurveyResponse.
 */
@Document(collection = "survey_response")
public class SurveyResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("start_time")
    private Instant startTime;

    @Field("end_time")
    private Instant endTime;

    @Field("status")
    private String status;

    @NotNull
    @Field("survey_id")
    private String surveyId;

    private List<QuestionResponse> questionResponses = new ArrayList<>();

    private Map<String, Double> profilingResults;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public SurveyResponse startTime(Instant startTime) {
        this.startTime = startTime;
        return this;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public SurveyResponse endTime(Instant endTime) {
        this.endTime = endTime;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public SurveyResponse status(String status) {
        this.status = status;
        return this;
    }

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public SurveyResponse surveyId(String surveyId) {
        this.surveyId = surveyId;
        return this;
    }

    public List<QuestionResponse> getQuestionResponses() {
        return questionResponses;
    }

    public void setQuestionResponses(List<QuestionResponse> questionResponses) {
        this.questionResponses = questionResponses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SurveyResponse)) {
            return false;
        }
        return id != null && id.equals(((SurveyResponse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SurveyResponse{" +
            "id='" + id + '\'' +
            ", startTime=" + startTime +
            ", endTime=" + endTime +
            ", status='" + status + '\'' +
            ", surveyId='" + surveyId + '\'' +
            ", questionResponses=" + questionResponses +
            ", profilingResults=" + profilingResults +
            '}';
    }

    public SurveyResponse addQuestionResponse(QuestionResponse questionResponse) {
        if (!this.questionResponses.isEmpty()) {
            QuestionResponse lastResponse = this.questionResponses.get(this.questionResponses.size() - 1);
            if(lastResponse.getQuestionId().equals(questionResponse.getQuestionId())) {
                this.questionResponses.set(this.questionResponses.indexOf(lastResponse), questionResponse);
                return this;
            }
        }
        this.questionResponses.add(questionResponse);
        return this;
    }
}
