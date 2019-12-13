package gr.ekke.youwho.domain;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class ProfilingVariable implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private String id;

    @NotBlank
    private String name;

    @NotNull
    private ProfilingVariableType lowerEnd;

    @NotNull
    private ProfilingVariableType upperEnd;

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

    public ProfilingVariableType getLowerEnd() {
        return lowerEnd;
    }

    public void setLowerEnd(ProfilingVariableType lowerEnd) {
        this.lowerEnd = lowerEnd;
    }

    public ProfilingVariableType getUpperEnd() {
        return upperEnd;
    }

    public void setUpperEnd(ProfilingVariableType upperEnd) {
        this.upperEnd = upperEnd;
    }
}
