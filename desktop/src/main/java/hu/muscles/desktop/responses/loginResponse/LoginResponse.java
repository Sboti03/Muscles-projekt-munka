package hu.muscles.desktop.responses.loginResponse;


import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
    private LoggedUser loggedUser;
    private Tokens tokens;

    @JsonProperty("user")
    public LoggedUser getUser() {
        return this.loggedUser;
    }

    public void setUser(LoggedUser loggedUser) {
        this.loggedUser = loggedUser;
    }


    @JsonProperty("tokens")
    public Tokens getTokens() {
        return this.tokens;
    }

    public void setTokens(Tokens tokens) {
        this.tokens = tokens;
    }


}
