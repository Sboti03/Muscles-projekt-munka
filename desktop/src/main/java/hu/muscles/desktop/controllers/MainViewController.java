package hu.muscles.desktop.controllers;

import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.ResourceBundle;


public class MainViewController {


    @FXML
    private Button createBtn;
    @FXML
    private Button updateBtn;
    @FXML
    private Button deleteBtn;
    @FXML
    private Button profilesBtn;
    @FXML
    private Button foodsBtn;


    @FXML
    private TextArea testArea;


    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();

    public void setLoginModel(LoginModel loginModel) {
        this.loginModel = loginModel;
    }





    @FXML
    public void createClick(ActionEvent actionEvent) {
    }

    @FXML
    public void updateClick(ActionEvent actionEvent) {
    }

    @FXML
    public void deleteClick(ActionEvent actionEvent) {
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
    }

    @FXML
    public void foodsClick(ActionEvent actionEvent) {
        try {
            System.out.println(loginModel.getLoginData().getUser().getEmail() + ", aki " + loginModel.getLoginData().getUser().getRoles().getRoleName() + "megkapta:\n\n" + loadAllFood());
            testArea.setText(loginModel.getLoginData().getUser().getEmail() + ", aki " + loginModel.getLoginData().getUser().getRoles().getRoleName() + "megkapta:\n\n" + loadAllFood());
        } catch (Exception e) {
            testArea.setText(e.getMessage());
        }
    }


    private String loadAllFood() {
        try {
            URL url = new URL(this.url.GET_ALL_FOOD());
            URLConnection connection = url.openConnection();
            String authToken = loginModel.getLoginData().getTokens().getAccessToken();
            connection.setRequestProperty("Authorization", "Bearer " + authToken);
            connection.connect();
            InputStream responseStream = connection.getInputStream();
            return new String(responseStream.readAllBytes(), StandardCharsets.UTF_8);
        }   catch (IOException e) {
            System.out.println(e.getMessage());
            testArea.setText(e.getMessage());
            return "error";
        }
    }

}
