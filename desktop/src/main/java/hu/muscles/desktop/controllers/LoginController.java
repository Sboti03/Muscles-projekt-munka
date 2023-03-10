package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.app;
import hu.muscles.desktop.loginData.LoginResponse;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyCombination;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import javafx.stage.WindowEvent;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

public class LoginController {

    @FXML
    private TextField emailTextField;
    @FXML
    private TextField passwordTextField;
    @FXML
    private Button loginButton;
    @FXML
    private TextArea textAreaTest;

    private LoginModel loginModel;

    private final static RestTemplate restTemplate = new RestTemplate();
    private final Urls url = new Urls();


    @FXML
    public void LoginButtonClick(ActionEvent actionEvent) {
        String email = emailTextField.getText().trim();
        String password = passwordTextField.getText().trim();
        try {
            String response = login(email, password);
            ObjectMapper om = new ObjectMapper();
            LoginResponse user = om.readValue(response, LoginResponse.class);
            if (!userIsAdmin(user)) {
                //url.LOGOUT();
                //TODO: logout
                return;
            }
            loginModel = new LoginModel(user);
            showMainWindow(loginModel);
        } catch (Exception e) {
            textAreaTest.setText(e.getMessage());
            textAreaTest.setStyle("-fx-text-fill: #de0e0e ;");
            e.printStackTrace();
        }
    }

    private String login(String email, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("email", email.trim());
        map.add("password", password.trim());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url.LOGIN(), request, String.class);
        return response.getBody();
    }

    private void showMainWindow(LoginModel loginModel) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("main-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1080, 1920);
        Stage stage = new Stage();
        ((MainViewController) fxmlLoader.getController()).setLoginModel(loginModel);
        stage.setTitle("Admin");
        stage.setOnShowing(event -> {
            closeLoginWindow();
        });
        setNewWindow(scene, stage);
    }

    public static void setNewWindow(Scene scene, Stage stage) {
        stage.setMaximized(true);
        stage.setResizable(false);
        stage.setFullScreenExitHint("");
        stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
        stage.fullScreenProperty();
        stage.initStyle(StageStyle.TRANSPARENT);
        stage.setScene(scene);
        stage.show();
    }


    private void closeLoginWindow() {
        FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("login-view.fxml"));
        Stage stage = (Stage) loginButton.getScene().getWindow();
        stage.close();
    }


    private boolean userIsAdmin(LoginResponse loginResponse) {
        return loginResponse.getUser().getRoles().getRoleName().equals("admin");
    }
}