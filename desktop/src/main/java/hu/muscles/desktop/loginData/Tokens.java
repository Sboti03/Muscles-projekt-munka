package hu.muscles.desktop.loginData;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Tokens {
    private String refreshToken;
    private String accessToken;


    @JsonProperty("accessToken")
    public String getAccessToken() {
        return this.accessToken;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }


    @JsonProperty("refreshToken")
    public String getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
