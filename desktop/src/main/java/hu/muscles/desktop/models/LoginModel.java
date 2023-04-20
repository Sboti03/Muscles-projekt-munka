package hu.muscles.desktop.models;

import hu.muscles.desktop.responses.loginResponse.LoginResponse;
import javafx.beans.binding.ObjectBinding;

public class LoginModel extends ObjectBinding<LoginResponse> {
    private final LoginResponse loginData;

    public LoginModel(LoginResponse loginResponse) {
        loginData = loginResponse;
    }


    public LoginResponse getLoginData() {
        return loginData;
    }

    @Override
    protected LoginResponse computeValue() {
        return loginData;
    }
}
