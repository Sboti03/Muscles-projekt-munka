package hu.muscles.desktop.loginData;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Role {
    private int roleId;
    private String roleName;
    private Date changedAt;


    @JsonProperty("roleId")
    public int getRoleId() {
        return this.roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    @JsonProperty("roleName")
    public String getRoleName() {
        return this.roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return this.changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }
}