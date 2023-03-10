package hu.muscles.desktop.controllers;

import hu.muscles.desktop.loginData.LoginResponse;
import hu.muscles.desktop.models.LoginModel;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.TextArea;

import java.net.URL;
import java.util.ResourceBundle;

public class MainViewController {
    @FXML
    private LoginModel loginModel;

    @FXML
    private TextArea textAreaTest2;

    public void setLoginModel(LoginModel loginModel) {
        this.loginModel = loginModel;
    }



    @FXML
    public void showButtonClick(ActionEvent actionEvent) {
        textAreaTest2.setText("Hello:  "+loginModel.getLoginData().getUser().getEmail()+"\n\nA tokened:"+loginModel.getLoginData().getTokens().getAccessToken()+"\n\nA te profilod:"+loginModel.getLoginData().getUser().getRoles().getRoleName());
    }

}
