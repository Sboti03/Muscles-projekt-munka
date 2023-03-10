package hu.muscles.desktop.models;

import hu.muscles.desktop.loginData.LoginResponse;
import javafx.beans.binding.ObjectBinding;
import javafx.beans.value.ObservableObjectValue;
import javafx.collections.FXCollections;

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
