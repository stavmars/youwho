package gr.ekke.youwho.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

/**
 * A Question.
 */
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @NotBlank
    private String text;

    @NotNull
    private String type;

    private String displayType;

    private String category;

    private List<ResponseChoice> responseChoices;

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

    public List<ResponseChoice> getResponseChoices() {
        return responseChoices;
    }

    public void setResponseChoices(List<ResponseChoice> responseChoices) {
        this.responseChoices = responseChoices;
    }
}
