package hu.muscles.desktop;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.loginData.LoginResponse;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class LoginController {

    @FXML
    private TextField emailTextField;
    @FXML
    private TextField passwordTextField;
    @FXML
    private Button loginButton;
    @FXML
    private TextArea textAreaTest;

    private final static RestTemplate restTemplate = new RestTemplate();
    private final static String LOGIN_URL = "http://34.22.242.178:3000/api/auth/login";

    @FXML
    public void LoginButtonClick(ActionEvent actionEvent) {
        try {
            String email = emailTextField.getText().trim();
            String password = passwordTextField.getText().trim();
            //checking
            // "admin@muscles.com", "admin"
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
            map.add("email", email.trim());
            map.add("password", password.trim());
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(LOGIN_URL, request, String.class);

            ObjectMapper om = new ObjectMapper();
            LoginResponse loginResponse = om.readValue(response.getBody(), LoginResponse.class);

            textAreaTest.setText("Hello Admin: "+loginResponse.getUser().getEmail() + "\nAccess Tokened: " + loginResponse.getTokens().getAccessToken());

        } catch (Exception e) {
            textAreaTest.setText(e.getMessage());
            e.printStackTrace();
        }
    }
}