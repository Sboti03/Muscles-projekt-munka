package hu.muscles.desktop.loginData;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class User {
    private int userId;
    private String email;
    private int roleId;
    private Date changedAt;
    private Roles roles;


    @JsonProperty("userId")
    public int getUserId() {
        return this.userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    @JsonProperty("email")
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("roleId")
    public int getRoleId() {
        return this.roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return this.changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    @JsonProperty("isBlocked")
    public boolean getIsBlocked() {
        return this.isBlocked;
    }

    public void setIsBlocked(boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

    boolean isBlocked;


    @JsonProperty("roles")
    public Roles getRoles() {
        return this.roles;
    }

    public void setRoles(Roles roles) {
        this.roles = roles;
    }
}