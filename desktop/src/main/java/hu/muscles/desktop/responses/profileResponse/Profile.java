package hu.muscles.desktop.responses.profileResponse;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Profile {
    private int profileId;
    private int userId;
    private Date registrationDate;
    private String firstName;
    private Date birthDay;
    private String lastName;
    private int height;
    private boolean male;
    private String profilePicPath;
    private Date changedAt;

    public Profile(int profileId, int userId, Date registrationDate, String firstName, Date birthDay, String lastName, int height, boolean male, String profilePicPath, Date changedAt) {
        this.profileId = profileId;
        this.userId = userId;
        this.registrationDate = registrationDate;
        this.firstName = firstName;
        this.birthDay = birthDay;
        this.lastName = lastName;
        this.height = height;
        this.changedAt = changedAt;
        this.male = male;
        this.profilePicPath = profilePicPath;
    }

    public Profile() {
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

    @JsonProperty("male")
    public boolean isMale() {
        return male;
    }

    public void setMale(boolean male) {
        this.male = male;
    }

    @JsonProperty("profilePicPath")
    public String getProfilePicPath() {
        return profilePicPath;
    }

    public void setProfilePicPath(String profilePicPath) {
        this.profilePicPath = profilePicPath;
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
                (this.male ? "Male" : "Female") + "\n" +
                this.changedAt + "\n";
    }


}
