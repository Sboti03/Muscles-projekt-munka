package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.app;
import hu.muscles.desktop.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.listViewShowAndHideFunctions.ListViewFunctionsForMain;
import hu.muscles.desktop.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.models.ProfileModel;
import hu.muscles.desktop.models.UserModel;
import hu.muscles.desktop.profileData.Profiles;
import hu.muscles.desktop.requestsender.RequestSender;
import hu.muscles.desktop.urls.Urls;
import hu.muscles.desktop.userData.User;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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
    @FXML
    private VBox showDataVbox;


    private List<Foods> foods;
    private List<Profiles> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private UserModel userModel;
    private FoodModel foodModel;
    private ProfileModel profileModel;
    private final Urls url = new Urls();
    private RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private ListViewFunctionsForMain listViewFunctionsForMain;
    private final FXMLLoader updateFoodLoader = new FXMLLoader(app.class.getResource("update-food-view.fxml"));
    private final FXMLLoader profileInfoLoader = new FXMLLoader(app.class.getResource("profile-info-view.fxml"));
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    private final RequestSender rqs = new RequestSender();
    private List<User> users = new ArrayList<>();
    @FXML
    private Button blockButton;
    @FXML
    private Button unblockButton;


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
                if (mainListView.getSelectionModel().getSelectedItems() != null && (listViewFunctionsForMain.getCurrentItemIndex(mainListView)) != -1) {
                    int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
                    Foods food = foods.stream().filter(x -> x.getFoodId() == index).findFirst().orElse(null);
                    if (food != null) {
                        if (food.getName().startsWith("#DELETED#"))
                            food.setName(food.getName().replaceAll(food.getName().substring(0, 10), ""));
                        foodModel = new FoodModel(food);
                        ((UpdateFoodController) updateFoodLoader.getController()).setUpdateModelForUpdate(foodModel);
                        editVbox.setVisible(true);
                        editVbox.setManaged(true);
                    }
                }
                if (mainListView.getSelectionModel().isEmpty()) {
                    editVbox.setVisible(false);
                    editVbox.setManaged(false);
                }
            }
            if (isProfileShown && !isFoodShown) {
                if (mainListView.getSelectionModel().getSelectedItems() != null) {
                    if (mainListView.getSelectionModel().getSelectedItems() != null && (listViewFunctionsForMain.getCurrentItemIndex(mainListView)) != -1) {
                        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
                        Profiles profile = profiles.stream().filter(x -> x.getProfileId() == index).findFirst().orElse(null);
                        if (profile != null) {
                            Optional<User> user = users.stream().filter(x->x.userId == profile.getUserId()).findFirst();
                            if (profile.getFirstName().startsWith("#BLOCKED#"))
                                profile.setFirstName(profile.getFirstName().replaceAll(profile.getFirstName().substring(0, 10), ""));
                            userModel = new UserModel(user.get());
                            profileModel = new ProfileModel(profile);
                            ((ProfileInfoController) profileInfoLoader.getController()).setProfileForProfileInfo(profileModel, userModel);
                            showDataVbox.setVisible(true);
                            showDataVbox.setManaged(true);
                        }
                    }
                    if (mainListView.getSelectionModel().isEmpty()) {
                        showDataVbox.setVisible(false);
                        showDataVbox.setManaged(false);
                    }

                }
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
        if (!isProfileShown && isFoodShown) {
            int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
            sendRequest(HttpMethod.DELETE, url.DELETE_FOOD(index), actionEvent, "Food deleted successfully!", "An error has occurred.", "ERROR: Couldn't delete profile.", true);
        }
        if (isProfileShown && !isFoodShown) {
            int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
            sendRequest(HttpMethod.DELETE, url.DELETE_USER(index), actionEvent, "User deleted successfully!", "An error has occurred.", "ERROR: Couldn't delete user.", false);
        }
    }

    @FXML
    public void undeleteClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        sendRequest(HttpMethod.PATCH, url.UNDELETE_FOOD(index), actionEvent, "Food undeleted successfully!", "An error has occurred.", "ERROR: Couldn't undelete food.", true);
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
        isFoodShown = false;
        changeButtonsBetweenProfileAndFood(true);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllText();
        editVbox.setVisible(false);
        try {
            profiles = loadFromServerToPOJO.loadAllProfile(rqs.sendGet(this.url.GET_ALL_PROFILE(), loginModel));
        } catch (IOException e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(true, e);
        }
        try {
            users = getUsersList();
            if (profiles != null && users != null) {
                listViewFunctionsForMain.loadProfilesToListView(profiles, users);
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
            foods = loadFromServerToPOJO.loadAllFood(rqs.sendGet(this.url.GET_ALL_FOOD(), loginModel));
        } catch (IOException e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(false, e);
        }
        try {
            if (foods != null) {
                listViewFunctionsForMain.loadFoodsToListView(foods);
                isFoodShown = true;
            } else {
                messageTextArea.clear();
                messageTextArea.setText("An error has occurred");
            }
        } catch (Exception e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(false, e);
        }
    }

    @FXML
    public void blockClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        sendRequest(HttpMethod.DELETE, url.BLOCK_USER(index), actionEvent, "Profile blocked successfully!", "An error has occurred.", "ERROR: Couldn't block profile.", false);
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

    public void changeButtonsBetweenProfileAndFood(boolean isProfile) {
        if (isProfile) {
            undeleteBtn.setVisible(false);
            loadCreateBtn.setVisible(false);
            undeleteBtn.setManaged(false);
            loadCreateBtn.setManaged(false);
            blockButton.setVisible(true);
            unblockButton.setVisible(true);
            editVbox.setVisible(false);
            editVbox.setManaged(false);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(true);
        } else {
            undeleteBtn.setVisible(true);
            loadCreateBtn.setVisible(true);
            undeleteBtn.setManaged(true);
            loadCreateBtn.setManaged(true);
            blockButton.setVisible(false);
            blockButton.setManaged(true);
            unblockButton.setVisible(false);
            unblockButton.setManaged(true);
            editVbox.setVisible(false);
            editVbox.setManaged(true);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(false);
        }
    }

    private void loadEditVboxContent() {
        try {
            Parent view = updateFoodLoader.load();
            Parent view2 = profileInfoLoader.load();
            // Optional: ScrollPane scrollPane = new ScrollPane(view);
            ((UpdateFoodController) updateFoodLoader.getController()).setLoginModelForUpdate(loginModel);
            ((ProfileInfoController) profileInfoLoader.getController()).setLoginModelForProfileInfo(loginModel);
            editVbox.getChildren().add(view);
            showDataVbox.getChildren().add(view2);
            editVbox.setVisible(false);
            editVbox.setManaged(false);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(false);
        } catch (IOException e) {
            messageTextArea.setText(e.getMessage());
            throw new RuntimeException(e);
        }
    }


    @FXML
    public void unblockClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        sendRequest(HttpMethod.PATCH, url.UNBLOCK_USER(index), actionEvent, "Profile unblocked successfully!", "An error has occurred.", "ERROR: Couldn't unblock profile.", false);
    }

    public void sendRequest(HttpMethod httpMethod, String url, ActionEvent actionEvent, String successMessage, String JsonError, String errorMessage, boolean changeInFoodList) {
        if (mainListView.getSelectionModel().isEmpty()) {
            messageTextArea.clear();
            messageTextArea.setText("Please select an item from the list!");
            return;
        }
        try {
            RequestSender requestSender = new RequestSender();
            String request = requestSender.sendRequest(restTemplate, loginModel, httpMethod, url);
            listViewFunctionsForMain.emptyAllText();
            if (createFoodMainMethods.isValidJSON(request)) {
                if (changeInFoodList) {
                    foodsClick(actionEvent);
                    messageTextArea.setText(successMessage);
                } else {
                    profilesClick(actionEvent);
                    messageTextArea.setText(successMessage);
                }
            } else {
                messageTextArea.setText(JsonError);
            }
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllText();
            messageTextArea.setText(errorMessage + " -> " + e.getMessage());
            e.printStackTrace();
        }
    }



    private List<User> getUsersList() {
        RequestSender rqs = new RequestSender();
        try {
            InputStream ipr = rqs.sendGet(url.GET_ALL_USER(), loginModel);
            String content = new String(ipr.readAllBytes(), StandardCharsets.UTF_8);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(content, new TypeReference<>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}