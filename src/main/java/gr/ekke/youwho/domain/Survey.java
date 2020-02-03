package gr.ekke.youwho.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * A Survey.
 */
@Document(collection = "survey")
public class Survey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("open_time")
    private Instant openTime;

    @Field("close_time")
    private Instant closeTime;

    private List<Question> questions = new ArrayList<>();

    private List<ProfilingVariable> profilingVariables = new ArrayList<>();

    private List<String> topics = new ArrayList<>();

    @DBRef
    @Field("user")
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Survey name(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Survey description(String description) {
        this.description = description;
        return this;
    }

    public Instant getOpenTime() {
        return openTime;
    }

    public void setOpenTime(Instant openTime) {
        this.openTime = openTime;
    }

    public Survey openTime(Instant openTime) {
        this.openTime = openTime;
        return this;
    }

    public Instant getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Instant closeTime) {
        this.closeTime = closeTime;
    }

    public Survey closeTime(Instant closeTime) {
        this.closeTime = closeTime;
        return this;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Survey user(User user) {
        this.user = user;
        return this;
    }

    public List<ProfilingVariable> getProfilingVariables() {
        return profilingVariables;
    }

    public void setProfilingVariables(List<ProfilingVariable> profilingVariables) {
        this.profilingVariables = profilingVariables;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Survey)) {
            return false;
        }
        return id != null && id.equals(((Survey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Survey{" +
            "id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", description='" + description + '\'' +
            ", openTime=" + openTime +
            ", closeTime=" + closeTime +
            ", questions=" + questions +
            ", profilingVariables=" + profilingVariables +
            ", user=" + user +
            '}';
    }
}
