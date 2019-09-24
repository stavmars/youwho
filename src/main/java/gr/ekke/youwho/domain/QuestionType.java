package gr.ekke.youwho.domain;

/**
 * Constants for Question Types.
 */
public final class QuestionType {
    // type for text that does not expect an answer (info/context text in chat flow)
    public static final String INFO_TEXT = "info_text";
    public static final String SINGLE_SELECT = "single_select";
    public static final String MULTI_SELECT = "multi_select";



    public static final String LIKE_DISLIKE = "like_dislike";
    public static final String SCALE_1_5 = "scale_1_5";
    public static final String NUMERIC_SCALE_1_10 = "numeric_scale_1_10";
    public static final String AGREEMENT_SCALE = "agreement_scale";
    public static final String YES_NO = "yes_no";
}
