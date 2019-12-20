package gr.ekke.youwho.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * A Question.
 */
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private String id;

    @NotBlank
    private String text;

    @NotNull
    private String type;

    private String displayType;

    private String category;

    private String imageURL;

    private List<ResponseChoice> responseChoices;

    private Map<String, Double> profilingWeights;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDisplayType() {
        return displayType;
    }

    public void setDisplayType(String displayType) {
        this.displayType = displayType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public List<ResponseChoice> getResponseChoices() {
        return responseChoices;
    }

    public void setResponseChoices(List<ResponseChoice> responseChoices) {
        this.responseChoices = responseChoices;
    }

    public Map<String, Double> getProfilingWeights() {
        return profilingWeights;
    }

    public void setProfilingWeights(Map<String, Double> profilingWeights) {
        this.profilingWeights = profilingWeights;
    }
}
