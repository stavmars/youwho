package gr.ekke.youwho.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Response Choice.
 */
public class ResponseChoice implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @NotBlank
    private String text;

    private String description;

    @NotNull
    private String type;


    private String imageURL;

    //To response tis giagias an iparxei
    private String responseReaction;

    // if existing, it's the question to redirect the user to
    private String redirectQuestionId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getResponseReaction() {
        return responseReaction;
    }

    public void setResponseReaction(String responseReaction) {
        this.responseReaction = responseReaction;
    }

    public String getRedirectQuestionId() {
        return redirectQuestionId;
    }

    public void setRedirectQuestionId(String redirectQuestionId) {
        this.redirectQuestionId = redirectQuestionId;
    }
}
