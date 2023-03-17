package hu.muscles.desktop.loginData;


import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
    private User user;
    private Tokens tokens;

    @JsonProperty("user")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @JsonProperty("tokens")
    public Tokens getTokens() {
        return this.tokens;
    }

    public void setTokens(Tokens tokens) {
        this.tokens = tokens;
    }


}
