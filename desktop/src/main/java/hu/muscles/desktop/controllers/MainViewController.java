package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;


public class MainViewController implements Initializable {

    @FXML
    private VBox mainVbox;
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
    private ListView<String> mainListView;
    @FXML
    private Button exitButton;
    @FXML
    private TextArea informationOfSelectedItemTextArea;


    private Alert confirmExit;
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
    public void exitClick(ActionEvent actionEvent) {
        mainVbox.setDisable(true);
        Optional<ButtonType> optionalButtonType = confirmExit.showAndWait();
        if (optionalButtonType.get().equals(ButtonType.OK)) {
            Platform.exit();
        } else {
            mainVbox.setDisable(false);
            confirmExit.close();
        }
    }

    @FXML
    public void foodsClick(ActionEvent actionEvent) {
        List<Foods> foods = loadAllFood();
        try {
            if (foods != null) {
                loadFoodsToTable(foods);
            } else {
                informationOfSelectedItemTextArea.setText("Couldn't read foods.");
            }
        } catch (Exception e) {
            informationOfSelectedItemTextArea.setText(e.getMessage());
            e.printStackTrace();
        }

    }


    private List<Foods> loadAllFood() {
        try {
            URL url = new URL(this.url.GET_ALL_FOOD());
            URLConnection connection = url.openConnection();
            String authToken = loginModel.getLoginData().getTokens().getAccessToken();
            connection.setRequestProperty("Authorization", "Bearer " + authToken);
            connection.connect();
            InputStream responseStream = connection.getInputStream();
            return foodConverterToPOJO((new String(responseStream.readAllBytes(), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            informationOfSelectedItemTextArea.setText(e.getMessage());
            e.printStackTrace();
            e.printStackTrace();
            return null;
        }
    }

    private List<Foods> foodConverterToPOJO(String response) {
        try {
            ObjectMapper om = new ObjectMapper();
            return om.readValue(response, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            informationOfSelectedItemTextArea.setText(e.getMessage());
            return null;
        }
    }

    private void loadFoodsToTable(List<Foods> foods) {
        mainListView.getItems().addAll(foods.stream().map(Foods::getName).toList());
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the app?");
    }
}
