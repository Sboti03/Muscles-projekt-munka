package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfoenix.controls.JFXTextArea;
import hu.muscles.desktop.App;
import hu.muscles.desktop.exitFromApp.ExitFromApp;
import hu.muscles.desktop.informUser.InformUser;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.responses.loginResponse.LoginResponse;
import hu.muscles.desktop.urls.Urls;
import javafx.application.Platform;
import javafx.concurrent.Task;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.PasswordField;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

public class LoginController implements Initializable {

    @FXML
    private TextField emailTextField;
    @FXML
    private Button loginButton;
    @FXML
    private JFXTextArea infoArea;
    @FXML
    private PasswordField passwordTextField;
    @FXML
    private ProgressIndicator loading;
    @FXML
    private Button exitBtn;
    @FXML
    private VBox mainVbox;

    private final InformUser informUser = new InformUser();
    private final static RestTemplate restTemplate = new RestTemplate();
    private final Urls url = new Urls();
    private LoginModel loginModel;


    @FXML
    public void LoginButtonClick(ActionEvent actionEvent) {
        String email = emailTextField.getText().trim();
        String password = passwordTextField.getText().trim();

        if (email.isEmpty() || password.isEmpty()) {
            informUser.setTextThenEmpty(infoArea, "In order to login, fill all gaps.", "#ef1400", 3);
            return;
        }

        loading.setVisible(true);
        Task<Void> loginTask = new Task<Void>() {
            @Override
            protected Void call() throws Exception {
                String response = login(email, password);
                ObjectMapper om = new ObjectMapper();
                LoginResponse user = om.readValue(response, LoginResponse.class);
                if (!userIsAdmin(user)) {
                    Platform.runLater(() -> {
                        informUser.setTextThenEmpty(infoArea, "Your profile does not have admin rights.", "#ef1400", 3);
                        url.LOGOUT();
                    });
                    return null;
                }
                loginModel = new LoginModel(user);
                Platform.runLater(() -> {
                    try {
                        showMainWindow(loginModel);
                    } catch (IOException e) {
                        informUser.setTextThenEmpty(infoArea, "ERROR: Couldn't load main page", "#ef1400", 3);
                    }
                });
                return null;
            }

            @Override
            protected void succeeded() {
                loading.setVisible(false);
            }

            @Override
            protected void failed() {
                loading.setVisible(false);
                informUser.setTextThenEmpty(infoArea, informUser.messageFromError((Exception) getException()), "#ef1400", 3);
            }
        };
        Thread loginThread = new Thread(loginTask);
        loginThread.start();
    }


    private String login(String email, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("email", email.trim());
        map.add("password", password.trim());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url.LOGIN(), request, String.class);
        return response.getBody();
    }

    private void showMainWindow(LoginModel loginModel) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/mainResources/main-view.fxml"));
        Stage stage = (Stage) loginButton.getScene().getWindow();
        stage.getScene().setRoot(fxmlLoader.load());
        ((MainViewController) fxmlLoader.getController()).setLoginModelForMain(loginModel);
    }


    private boolean userIsAdmin(LoginResponse loginResponse) {
        return loginResponse.getUser().getRole().getRoleName().equals("admin");
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        ProgressIndicator progressIndicator = new ProgressIndicator();
        progressIndicator.setProgress(ProgressIndicator.INDETERMINATE_PROGRESS);
        emailTextField.setOnKeyPressed(event -> {
            if (event.getCode() == KeyCode.ENTER) {
                LoginButtonClick(new ActionEvent());
            }
        });

        passwordTextField.setOnKeyPressed(event -> {
            if (event.getCode() == KeyCode.ENTER) {
                LoginButtonClick(new ActionEvent());
            }
        });

        loading.setProgress(ProgressIndicator.INDETERMINATE_PROGRESS);
    }

    @FXML
    public void exitClick(ActionEvent actionEvent) {
        new ExitFromApp(mainVbox, infoArea);
    }
}