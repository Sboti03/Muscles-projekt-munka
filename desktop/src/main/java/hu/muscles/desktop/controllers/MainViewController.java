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
    private ListView<String> foodEditLabelText;

    @FXML
    private ListView<String> foodEditText;


    private List<Foods> foods;
    private Alert confirmExit;
    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();
    private final String[] updateFoodDataString = new String[]{"Name", "Fat", "Fiber", "kCal", "Carbohydrate", "Per Unit", "Protein", "Sugar", "Monounsaturated fat", "Polyunsaturated fat", "Saturated fat", "Unit"};



    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the app?");
        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> {
            foodEditLabelText.getItems().clear();
            foodEditLabelText.getItems().addAll(updateFoodDataString);
            if (!mainListView.getSelectionModel().isEmpty()) {
                foodEditText.getItems().clear();
                foodEditText.getItems().addAll(String.valueOf(foods.get(mainListView.getSelectionModel().getSelectedIndex())).split("\n"));
            }
            foodEditText.setEditable(true);
        });
    }


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
        mainListView.getSelectionModel().clearSelection();
        foods = loadAllFood();
        try {
            if (foods != null) {
                loadFoodsToListView(foods);
            } else {
                foodEditLabelText.getItems().add("Couldn't read foods.");
            }
        } catch (Exception e) {
            foodEditText.getItems().clear();
            foodEditText.getItems().add(e.getMessage());
            e.printStackTrace();
        }

    }


    // TODO: kiszervezés

    // Food load
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
            foodEditText.getItems().clear();
            foodEditText.getItems().add(e.getMessage());
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
            foodEditText.getItems().clear();
            foodEditText.getItems().add(e.getMessage());
            return null;
        }
    }

    private void loadFoodsToListView(List<Foods> foods) {
        foodEditLabelText.getItems().clear();
        foodEditText.getItems().clear();
        mainListView.getItems().clear();
        mainListView.getItems().addAll(foods.stream().map(Foods::getName).toList());
    }


    // Profile load





}
