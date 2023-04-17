package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfoenix.controls.JFXListView;
import com.jfoenix.controls.JFXTextArea;
import hu.muscles.desktop.App;
import hu.muscles.desktop.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.listViewShowAndHideFunctions.ListViewFunctionsForMain;
import hu.muscles.desktop.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.messageFunctions.MessageFunctions;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.models.ProfileModel;
import hu.muscles.desktop.models.UserModel;
import hu.muscles.desktop.profileData.Profiles;
import hu.muscles.desktop.requestsender.RequestSender;
import hu.muscles.desktop.urls.Urls;
import hu.muscles.desktop.userData.User;
import javafx.application.Platform;
import javafx.beans.binding.Bindings;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.layout.Background;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Paint;
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
    private JFXListView<String> mainListView;
    @FXML
    private Button exitButton;
    @FXML
    private Button undeleteBtn;
    @FXML
    private VBox editVbox;
    @FXML
    private JFXTextArea messageTextArea;
    @FXML
    private VBox showDataVbox;
    @FXML
    private HBox buttonsHbox;
    @FXML
    private Button blockButton;
    @FXML
    private Button unblockButton;


    private List<Foods> foods;
    private List<Profiles> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private UserModel userModel;
    private FoodModel foodModel;
    private ProfileModel profileModel;
    private final Urls url = new Urls();
    private RestTemplate restTemplate = new RestTemplate();
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private ListViewFunctionsForMain listViewFunctionsForMain;
    private final FXMLLoader updateFoodLoader = new FXMLLoader(App.class.getResource("update-food-view.fxml"));
    private final FXMLLoader profileInfoLoader = new FXMLLoader(App.class.getResource("profile-info-view.fxml"));
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    private final RequestSender rqs = new RequestSender();
    private List<User> users = new ArrayList<>();
    private final MessageFunctions messageFunctions = new MessageFunctions();
    private static VBox editVboxStatic;
    private static ListView<String> mainListViewStatic;
    private static JFXTextArea staticMessageTextArea;
    @FXML
    private JFXTextArea showListNameText;
    @FXML
    private ProgressIndicator loading;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the App?");
        loadFromServerToPOJO = new LoadFromServerToPojo(mainListView);
        listViewFunctionsForMain = new ListViewFunctionsForMain(mainListView, messageTextArea);
        editVboxStatic = editVbox;
        staticMessageTextArea = messageTextArea;
        mainListView.setBackground(Background.fill(Paint.valueOf("#1F0449B0")));

        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> {
            mainListViewStatic = mainListView;
            if (isFoodShown && !isProfileShown) {
                if (!mainListView.getSelectionModel().isEmpty() && (listViewFunctionsForMain.getCurrentItemIndex(mainListView)) != -1) {
                    int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
                    Foods food = foods.stream().filter(x -> x.getFoodId() == index).findFirst().orElse(null);
                    if (food != null) {
                        if (food.getName().startsWith("#DELETED#")) {
                            food.setName(food.getName().replaceAll(food.getName().substring(0, 10), ""));
                        }
                        foodModel = new FoodModel(food);
                        ((UpdateFoodController) updateFoodLoader.getController()).setMainController(this);
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
                            Optional<User> user = users.stream().filter(x -> x.userId == profile.getUserId()).findFirst();
                            if (profile.getFirstName().startsWith("#BLOCKED#")) {
                                profile.setFirstName(profile.getFirstName().replaceAll(profile.getFirstName().substring(0, 10), ""));
                            }
                            userModel = new UserModel(user.get());
                            profileModel = new ProfileModel(profile);
                            ((ProfileInfoController) profileInfoLoader.getController()).setProfileForProfileInfo(profileModel, userModel);
                            showDataVbox.setVisible(true);
                            showDataVbox.setManaged(true);
                        }
                    }
                }
                if (mainListView.getSelectionModel().isEmpty()) {
                    showDataVbox.setVisible(false);
                    showDataVbox.setManaged(false);

                }
            }


        });
        buttonsHbox.visibleProperty().bind(Bindings.createBooleanBinding(() -> !mainListView.getItems().isEmpty(), mainListView.getItems()));
        Platform.runLater(() -> {
            foodsClick(new ActionEvent());
        });
    }


    public void setLoginModelForMain(LoginModel loginModel) {
        this.loginModel = loginModel;
        loadEditVboxContent();
    }


    @FXML
    public void loadCreateClick(ActionEvent actionEvent) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("create-food-view.fxml"));
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
            Optional<Foods> optionalFood = foods.stream().filter(food1 -> food1.getFoodId() == index).findFirst();
            if (optionalFood.isPresent()) {
                Foods food = optionalFood.get();
                if (!food.isDeleted()) {
                    sendRequest(HttpMethod.DELETE, url.DELETE_FOOD(index), actionEvent, "Food deleted successfully", "An error has occurred.", "ERROR: Couldn't delete profile.", true);
                } else {
                    messageFunctions.setTextThenEmpty(messageTextArea, "Food is deleted already.", "#ef1400", 3);
                }
            } else {
                messageFunctions.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            }
        }
    }

    @FXML
    public void undeleteClick(ActionEvent actionEvent) {
        if (!isProfileShown && isFoodShown) {
            int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
            Optional<Foods> optionalFood = foods.stream().filter(food1 -> food1.getFoodId() == index).findFirst();
            if (optionalFood.isPresent()) {
                Foods food = optionalFood.get();
                if (food.isDeleted()) {
                    sendRequest(HttpMethod.PATCH, url.UNDELETE_FOOD(index), actionEvent, "Food undeleted successfully", "An error has occurred.", "ERROR: Couldn't undelete food.", true);
                } else {
                    messageFunctions.setTextThenEmpty(messageTextArea, "Food isn't deleted.", "#ef1400", 3);
                }
            } else {
                messageFunctions.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            }
        }
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
        mainListView.setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
        isFoodShown = false;
        changeButtonsBetweenProfileAndFood(true);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllText();
        editVbox.setVisible(false);
        showListNameText.setText("Profiles");
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
        mainListView.setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
        isProfileShown = false;
        changeButtonsBetweenProfileAndFood(false);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllText();
        showListNameText.setText("Foods");

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
                messageFunctions.setTextThenEmpty(messageTextArea, "An error has occurred while loading foods", "#ef1400", 3);
            }
        } catch (Exception e) {
            listViewFunctionsForMain.CouldNotLoadFoodOrProfiles(false, e);
        }
    }

    @FXML
    public void blockClick(ActionEvent actionEvent) {
        if (isProfileShown && !isFoodShown) {
            int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
            Optional<User> optionalUser = users.stream().filter(x->x.getUserId() == index).findFirst();
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (!user.isBlocked()) {
                    sendRequest(HttpMethod.DELETE, url.BLOCK_USER(index), actionEvent, "Profile blocked successfully", "An error has occurred.", "ERROR: Couldn't block profile.", false);
                } else {
                    messageFunctions.setTextThenEmpty(messageTextArea, "Profile is blocked.", "#ef1400", 3);
                }
            } else {
                messageFunctions.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            }

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

    public void changeButtonsBetweenProfileAndFood(boolean isProfile) {
        if (isProfile) {
            undeleteBtn.setVisible(false);
            undeleteBtn.setManaged(false);
            loadCreateBtn.setVisible(false);
            loadCreateBtn.setManaged(false);
            editVbox.setVisible(false);
            editVbox.setManaged(false);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(true);
            deleteBtn.setVisible(false);
            deleteBtn.setManaged(false);
            blockButton.setVisible(true);
            blockButton.setManaged(true);
            unblockButton.setVisible(true);
            unblockButton.setManaged(true);
        } else {
            blockButton.setVisible(false);
            blockButton.setManaged(false);
            unblockButton.setVisible(false);
            unblockButton.setManaged(false);
            undeleteBtn.setVisible(true);
            loadCreateBtn.setVisible(true);
            undeleteBtn.setManaged(true);
            loadCreateBtn.setManaged(true);
            editVbox.setVisible(false);
            editVbox.setManaged(true);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(false);
            deleteBtn.setVisible(true);
            deleteBtn.setManaged(true);
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
            messageFunctions.setTextThenEmpty(messageTextArea, messageFunctions.messageFromError(e), "#ef1400", 3);
        }
    }


    @FXML
    public void unblockClick(ActionEvent actionEvent) {
        if (isProfileShown && !isFoodShown) {
            int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
            Optional<User> optionalUser = users.stream().filter(x->x.getUserId() == index).findFirst();
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (user.isBlocked()) {
                    sendRequest(HttpMethod.PATCH, url.UNBLOCK_USER(index), actionEvent, "Profile unblocked successfully", "An error has occurred.", "ERROR: Couldn't unblock profile.", false);
                } else {
                    messageFunctions.setTextThenEmpty(messageTextArea, "Profile is not blocked.", "#ef1400", 3);
                }
            } else {
                messageFunctions.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            }
        }
    }

    public void sendRequest(HttpMethod httpMethod, String url, ActionEvent actionEvent, String successMessage, String JsonError, String errorMessage, boolean changeInFoodList) {
        if (mainListView.getSelectionModel().isEmpty()) {
            messageFunctions.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            return;
        }
        try {
            RequestSender requestSender = new RequestSender();
            String request = requestSender.sendRequest(loginModel, httpMethod, url);
            listViewFunctionsForMain.emptyAllText();
            if (createFoodMainMethods.isValidJSON(request)) {
                if (changeInFoodList) {
                    foodsClick(actionEvent);
                    messageTextArea.setText(successMessage);
                    messageFunctions.setTextThenEmpty(messageTextArea, successMessage, "#29be0e", 3);

                } else {
                    profilesClick(actionEvent);
                    messageFunctions.setTextThenEmpty(messageTextArea, successMessage, "#29be0e", 3);
                }
            } else {
                messageFunctions.setTextThenEmpty(messageTextArea, JsonError, "#ef1400", 3);
            }
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllText();
            messageFunctions.setTextThenEmpty(messageTextArea, errorMessage + " -> " + messageFunctions.messageFromError(e), "#ef1400", 3);

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

    public static void setUpdateToInvisible() {
        editVboxStatic.setVisible(false);
        mainListViewStatic.getSelectionModel().clearSelection();
    }

    public static void setMessageForMainTextArea(String text, String color, int seconds) {
        MessageFunctions messageFunctions1 = new MessageFunctions();
        messageFunctions1.setTextThenEmpty(staticMessageTextArea, text, color, seconds);
    }

}

/*
* TODO: (NRI - Not really important)
*  NRI - Food create/update double, (maybe convert to int) stuff
*  NRI - Loading circle while loading food and profile data
*      - Exit button custom confirmation window (new View)
*  NRI - Listview -> no little lines (each 4 -> css)
*      - Maybe some error does not give understandable message to user
*      - more constructors in update and create
* */