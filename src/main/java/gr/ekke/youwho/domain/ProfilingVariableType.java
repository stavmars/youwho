package gr.ekke.youwho.domain;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class ProfilingVariableType implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotBlank
    private String name;

    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
