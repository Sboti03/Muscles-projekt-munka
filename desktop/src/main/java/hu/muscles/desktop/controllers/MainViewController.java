package hu.muscles.desktop.controllers;

import hu.muscles.desktop.app;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.listViewShowAndHideFunctions.ListViewFunctionsForMain;
import hu.muscles.desktop.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.profileData.ProfileResponse;
import hu.muscles.desktop.urls.Urls;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
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
    private Button loadCreateBtn;
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
    private Button undeleteBtn;
    @FXML
    private VBox editVbox;
    @FXML
    private TextArea messageTextArea;


    private List<Foods> foods;
    private List<ProfileResponse> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private FoodModel foodmodel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();
    private final String[] profileDataString = new String[]{"First name", "Last name", "Birthdate", "Registration date", "Height", "Gender", "Last changed"};
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private ListViewFunctionsForMain listViewFunctionsForMain;
    private final FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("update-food-view.fxml"));


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the app?");
        loadFromServerToPOJO = new LoadFromServerToPojo(mainListView);
        listViewFunctionsForMain = new ListViewFunctionsForMain(mainListView, messageTextArea);
        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> {
            if (isFoodShown && !isProfileShown) {
                if (mainListView.getSelectionModel().getSelectedItems() != null && (listViewFunctionsForMain.getCurrentItemIndex(mainListView) - 1) != -1) {
                    int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
                    Foods food = foods.stream().filter(x -> x.getFoodId() == index).findFirst().orElse(null);
                    if (food != null) {
                        if (food.getName().startsWith("#DELETED#"))
                            food.setName(food.getName().replaceAll(food.getName().substring(0, 10), ""));
                        foodmodel = new FoodModel(food);
                        ((UpdateFoodController) fxmlLoader.getController()).setUpdateModelForUpdate(foodmodel);
                        editVbox.setVisible(true);
                    }
                }
                if (mainListView.getSelectionModel().isEmpty()) {
                    editVbox.setVisible(false);
                }
            }
            if (isProfileShown && !isFoodShown) {
             /*   labelForData.getItems().addAll(profileDataString);
                if (!mainListView.getSelectionModel().isEmpty()) {
                    mainEditText.getItems().clear();
                    mainEditText.getItems().addAll(String.valueOf(profiles.get(mainListView.getSelectionModel().getSelectedIndex())).split("\n"));
                    updateButtonArea.setVisible(true);
                }*/
            }
        });
        mainListView.setOnMouseClicked(event -> {
            if (mainListView.getSelectionModel().getSelectedItem() != null) {
                if (event.getClickCount() == 2) {
                    mainListView.getSelectionModel().clearSelection();
                }
            }
        });
    }


    public void setLoginModelForMain(LoginModel loginModel) {
        this.loginModel = loginModel;
        loadEditVboxContent();
    }


    @FXML
    public void loadCreateClick(ActionEvent actionEvent) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("create-food-view.fxml"));
            Stage stage = (Stage) loadCreateBtn.getScene().getWindow();
            stage.getScene().setRoot(fxmlLoader.load());
            ((CreateFoodController) fxmlLoader.getController()).setLoginModelCreateFood(loginModel);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @FXML
    public void deleteClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url.DELETE_FOOD(index), HttpMethod.DELETE, requestEntity, String.class);
            System.out.println(responseEntity.getBody());
            listViewFunctionsForMain.emptyAllText();
            messageTextArea.setText(requestEntity.getBody());
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllText();
            messageTextArea.setText("ERROR: Couldn't delete food. -> " + e.getMessage());
            e.printStackTrace();
        }
    }

    @FXML
    public void undeleteClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
            RestTemplate restTemplate2 = new RestTemplate(factory);
            ResponseEntity<String> responseEntity = restTemplate2.exchange(url.UNDELETE_FOOD(index), HttpMethod.PATCH, requestEntity, String.class);
            System.out.println(responseEntity.getBody());
            listViewFunctionsForMain.emptyAllText();
            messageTextArea.setText(responseEntity.getBody());
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllText();
            messageTextArea.setText("ERROR: Couldn't undelete food. -> " + e.getMessage());
            e.printStackTrace();
        }
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
        isFoodShown = false;
        changeButtonsBetweenProfileAndFood(true);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllText();
        try {
            profiles = loadFromServerToPOJO.loadAllProfile(getResponseString(this.url.GET_ALL_PROFILE()));
        } catch (IOException e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(true, e);
        }
        try {
            if (profiles != null) {
                listViewFunctionsForMain.loadProfilesToListView(profiles);
                isProfileShown = true;
            }
        } catch (Exception e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(true, e);
        }
    }


    @FXML
    public void foodsClick(ActionEvent actionEvent) {
        isProfileShown = false;
        changeButtonsBetweenProfileAndFood(false);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllText();
        try {
            foods = loadFromServerToPOJO.loadAllFood(getResponseString(this.url.GET_ALL_FOOD()));
        } catch (IOException e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(false, e);
        }
        try {
            if (foods != null) {
                listViewFunctionsForMain.loadFoodsToListView(foods);
                isFoodShown = true;
            }
        } catch (Exception e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(false, e);
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
        connection.setConnectTimeout(20000);
        connection.connect();
        return connection.getInputStream();
    }

    public void changeButtonsBetweenProfileAndFood(boolean isProfile) {
        if (isProfile) {
            undeleteBtn.setVisible(false);
            loadCreateBtn.setVisible(false);
            undeleteBtn.setManaged(false);
            loadCreateBtn.setManaged(false);
        } else {
            undeleteBtn.setVisible(true);
            loadCreateBtn.setVisible(true);
            undeleteBtn.setManaged(true);
            loadCreateBtn.setManaged(true);
        }
    }

    private void loadEditVboxContent() {
        try {
            Parent view = fxmlLoader.load();
            // Optional: ScrollPane scrollPane = new ScrollPane(view);
            ((UpdateFoodController) fxmlLoader.getController()).setLoginModelForUpdate(loginModel);
            editVbox.getChildren().add(view);
        } catch (IOException e) {
            messageTextArea.setText(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}