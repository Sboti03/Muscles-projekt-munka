package hu.muscles.desktop.userData;

import com.fasterxml.jackson.annotation.JsonProperty;
import hu.muscles.desktop.loginData.Role;

import java.util.ArrayList;
import java.util.Date;

public class User {
    public int userId;
    public String email;
    public String password;
    public int roleId;
    public ArrayList<String> refreshTokens;
    public Date changedAt;
    public boolean isBlocked;
    public Role role;

    @JsonProperty("userId")
    public int getUserId() {
        return userId;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("password")
    public String getPassword() {
        return password;
    }

    @JsonProperty("roleId")
    public int getRoleId() {
        return roleId;
    }

    @JsonProperty("refreshTokens")
    public ArrayList<String> getRefreshTokens() {
        return refreshTokens;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return changedAt;
    }

    @JsonProperty("isBlocked")
    public boolean isBlocked() {
        return isBlocked;
    }

    @JsonProperty("role")
    public Role getRole() {
        return role;
    }


    public User(int userId, String email, String password, int roleId, ArrayList<String> refreshTokens, Date changedAt, boolean isBlocked, Role role) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.refreshTokens = refreshTokens;
        this.changedAt = changedAt;
        this.isBlocked = isBlocked;
        this.role = role;
    }

    public User() {
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public void setRefreshTokens(ArrayList<String> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "LoggedUser{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roleId=" + roleId +
                ", refreshTokens=" + refreshTokens +
                ", changedAt=" + changedAt +
                ", isBlocked=" + isBlocked +
                ", role=" + role +
                '}';
    }
}
