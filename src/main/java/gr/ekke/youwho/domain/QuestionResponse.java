package gr.ekke.youwho.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * A Question Response.
 */
public class QuestionResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private String questionId;

    @Field("start_time")
    private Instant startTime;

    @Field("end_time")
    private Instant endTime;

    List<String> choiceIds = new ArrayList<>();

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public List<String> getChoiceIds() {
        return choiceIds;
    }

    public void setChoiceIds(List<String> choiceIds) {
        this.choiceIds = choiceIds;
    }

}
