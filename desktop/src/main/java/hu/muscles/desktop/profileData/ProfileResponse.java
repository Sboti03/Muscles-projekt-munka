package hu.muscles.desktop.profileData;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProfileResponse {
    private int profileId;
    private int userId;
    private Date registrationDate;
    private String firstName;
    private Date birthDay;
    private String lastName;
    private int height;
    private Date changedAt;

    public ProfileResponse(int profileId, int userId, Date registrationDate, String firstName, Date birthDay, String lastName, int height, Date changedAt) {
        this.profileId = profileId;
        this.userId = userId;
        this.registrationDate = registrationDate;
        this.firstName = firstName;
        this.birthDay = birthDay;
        this.lastName = lastName;
        this.height = height;
        this.changedAt = changedAt;
    }

    public ProfileResponse() {
    }

    @JsonProperty("profileId")
    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    @JsonProperty("userId")

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @JsonProperty("registrationDate")
    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    @JsonProperty("firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonProperty("birthDay")
    public Date getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(Date birthDay) {
        this.birthDay = birthDay;
    }

    @JsonProperty("lastName")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @JsonProperty("height")
    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    @Override
    public String toString() {
        return "" +
                this.firstName + "\n" +
                this.lastName + "\n" +
                this.birthDay + "\n" +
                this.registrationDate + "\n" +
                this.height + "\n" +
                this.changedAt + "\n";
    }


}
