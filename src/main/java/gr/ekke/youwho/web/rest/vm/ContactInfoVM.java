package gr.ekke.youwho.web.rest.vm;

/**
 * View Model for Contact Info.
 */
public class ContactInfoVM {

    private String contactName;

    private String contactEmail;

    private String contactContent;

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactContent() {
        return contactContent;
    }

    public void setContactContent(String contactContent) {
        this.contactContent = contactContent;
    }
}
