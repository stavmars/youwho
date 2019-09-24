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

    @NotNull
    private String type;


    private String imageURL;

    //To response tis giagias an iparxei
    private String responseReaction;

    // if existing, it's the question to redirect the user to
    private String redirectQuestionId;


}
