package hu.muscles.desktop.controllers;

import hu.muscles.desktop.editListViewCell.EditListViewCell;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.listViewShowAndHideFunctions.ListViewShowAndHideFunctions;
import hu.muscles.desktop.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.profileData.ProfileResponse;
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
    private ListView<String> labelForData;

    @FXML
    private ListView<String> mainEditText;


    private List<Foods> foods;
    private List<ProfileResponse> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();
    private final String[] updateFoodDataString = new String[]{"Name", "Fat", "Fiber", "kCal", "Carbohydrate", "Per Unit", "Protein", "Sugar", "Monounsaturated fat", "Polyunsaturated fat", "Saturated fat", "Unit"};
    private final String[] profileDataString = new String[]{"First name", "Last name", "Birthdate", "Registration date", "Height", "Last changed"};
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private ListViewShowAndHideFunctions listViewShowAndHideFunctions;
    private EditListViewCell editListViewCell;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the app?");
        loadFromServerToPOJO = new LoadFromServerToPojo(mainEditText);
        listViewShowAndHideFunctions = new ListViewShowAndHideFunctions(mainListView, labelForData, mainEditText);
        editListViewCell = new EditListViewCell();
        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> listViewShowAndHideFunctions.listViewListener(foods, profiles, updateFoodDataString, profileDataString, isProfileShown, isFoodShown, editListViewCell));
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
        isFoodShown = false;
        mainListView.getSelectionModel().clearSelection();
        listViewShowAndHideFunctions.emptyAllListView();
        try {
            profiles = loadFromServerToPOJO.loadAllProfile(getResponseString(this.url.GET_ALL_PROFILE()));
        } catch (IOException e) {
            listViewShowAndHideFunctions.CouldNotLoadFoodOrProfiles(true, e);
        }
        try {
            if (profiles != null) {
                listViewShowAndHideFunctions.loadProfilesToListView(profiles);
                isProfileShown = true;
            }
        } catch (Exception e) {
            listViewShowAndHideFunctions.CouldNotLoadFoodOrProfiles(true, e);
        }
    }




    @FXML
    public void foodsClick(ActionEvent actionEvent) {
        isProfileShown = false;
        mainListView.getSelectionModel().clearSelection();
        listViewShowAndHideFunctions.emptyAllListView();
        try {
            foods = loadFromServerToPOJO.loadAllFood(getResponseString(this.url.GET_ALL_FOOD()));
        } catch (IOException e) {
            listViewShowAndHideFunctions.CouldNotLoadFoodOrProfiles(false, e);
        }
        try {
            if (foods != null) {
                listViewShowAndHideFunctions.loadFoodsToListView(foods);
                isFoodShown = true;
            }
        } catch (Exception e) {
            listViewShowAndHideFunctions.CouldNotLoadFoodOrProfiles(false, e);
        }
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

    private InputStream getResponseString(String urlString) throws IOException {
        URL url = new URL(urlString);
        URLConnection connection = url.openConnection();
        String authToken = loginModel.getLoginData().getTokens().getAccessToken();
        connection.setRequestProperty("Authorization", "Bearer " + authToken);
        connection.connect();
        return connection.getInputStream();
    }
}
