package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jfoenix.controls.JFXListView;
import com.jfoenix.controls.JFXTextArea;
import hu.muscles.desktop.App;
import hu.muscles.desktop.foodMethods.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.mainContentLoad.mainListViewHelperFunctions.MainListViewHelperFunctions;
import hu.muscles.desktop.responses.foodResponse.Food;
import hu.muscles.desktop.mainContentLoad.loadToMainListView.LoadToMainListview;
import hu.muscles.desktop.mainContentLoad.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.informUser.InformUser;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.models.ProfileModel;
import hu.muscles.desktop.models.UserModel;
import hu.muscles.desktop.responses.profileResponse.Profile;
import hu.muscles.desktop.requestsender.RequestSender;
import hu.muscles.desktop.urls.Urls;
import hu.muscles.desktop.responses.userResponse.User;
import javafx.application.Platform;
import javafx.beans.binding.Bindings;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.concurrent.Task;
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
    @FXML
    private JFXTextArea showListNameText;
    @FXML
    private ProgressIndicator loading;
    @FXML
    private TextField searchField;


    private List<Food> foods;
    private List<Profile> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private UserModel userModel;
    private FoodModel foodModel;
    private ProfileModel profileModel;
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private LoadToMainListview loadToMainListview;
    private final FXMLLoader updateFoodLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/updateFoodResources/update-food-view.fxml"));
    private final MainListViewHelperFunctions mainListViewHelper = new MainListViewHelperFunctions();
    private final Urls url = new Urls();
    private final FXMLLoader profileInfoLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/profileInfoResources/profile-info-view.fxml"));
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    private final RequestSender rqs = new RequestSender();
    private final InformUser informUser = new InformUser();
    private List<User> users = new ArrayList<>();
    private static VBox editVboxStatic;
    private static JFXListView<String> mainListViewStatic;
    private static JFXTextArea staticMessageTextArea;
    private ObservableList<String> originalMainItems;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the App?");
        loadFromServerToPOJO = new LoadFromServerToPojo(mainListView);
        loadToMainListview = new LoadToMainListview(mainListView);
        editVboxStatic = editVbox;
        staticMessageTextArea = messageTextArea;
        mainListView.setBackground(Background.fill(Paint.valueOf("#1F0449B0")));

        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> {
            mainListViewStatic = mainListView;
            if (isFoodShown && !isProfileShown) {
                if (!mainListView.getSelectionModel().isEmpty() && (mainListViewHelper.getCurrentSelectedItemIndex(mainListView)) != -1) {
                    int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                    Food food = foods.stream().filter(x -> x.getFoodId() == index).findFirst().orElse(null);
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
                    if (mainListView.getSelectionModel().getSelectedItems() != null && (mainListViewHelper.getCurrentSelectedItemIndex(mainListView)) != -1) {
                        int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                        Profile profile = profiles.stream().filter(x -> x.getProfileId() == index).findFirst().orElse(null);
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
        Platform.runLater(() -> foodsClick(new ActionEvent()));

        searchField.textProperty().addListener((observable, oldValue, newValue) -> {
            if (isFoodShown || isProfileShown) {
                ObservableList<String> items = FXCollections.observableArrayList();
                for (String item : originalMainItems) {
                    if (item.toLowerCase().contains(newValue.toLowerCase())) {
                        items.add(item);
                    }
                }
                mainListView.setItems(items);
                if (items.isEmpty()) {
                    mainListView.setPlaceholder(new Label("No matches found"));
                } else {
                    mainListView.setPlaceholder(null);
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
            FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/createFoodResources/create-food-view.fxml"));
            Stage stage = (Stage) loadCreateBtn.getScene().getWindow();
            stage.getScene().setRoot(fxmlLoader.load());
            ((CreateFoodController) fxmlLoader.getController()).setLoginModelCreateFood(loginModel);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @FXML
    public void deleteClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                if (!isProfileShown && isFoodShown) {
                    int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                    Optional<Food> optionalFood = foods.stream().filter(food1 -> food1.getFoodId() == index).findFirst();
                    if (optionalFood.isPresent()) {
                        Food food = optionalFood.get();
                        if (!food.isDeleted()) {
                            sendRequest(HttpMethod.DELETE, url.DELETE_FOOD(index), actionEvent, "Food deleted successfully", "An error has occurred.", "ERROR: Couldn't delete profile.", true);
                        } else {
                            informUser.setTextThenEmpty(messageTextArea, "Food is deleted already.", "#ef1400", 3);
                        }
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
                    }
                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
    }

    @FXML
    public void undeleteClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                if (!isProfileShown && isFoodShown) {
                    int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                    Optional<Food> optionalFood = foods.stream().filter(food1 -> food1.getFoodId() == index).findFirst();
                    if (optionalFood.isPresent()) {
                        Food food = optionalFood.get();
                        if (food.isDeleted()) {
                            sendRequest(HttpMethod.PATCH, url.UNDELETE_FOOD(index), actionEvent, "Food undeleted successfully", "An error has occurred.", "ERROR: Couldn't undelete food.", true);
                        } else {
                            informUser.setTextThenEmpty(messageTextArea, "Food isn't deleted.", "#ef1400", 3);
                        }
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
                    }
                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        showListNameText.setText("Profile");
        mainListView.getItems().clear();
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                isFoodShown = false;
                mainListViewHelper.changeButtonsBetweenProfileAndFood(true, undeleteBtn, loadCreateBtn, deleteBtn, blockButton, unblockButton, editVbox, showDataVbox);
                try {
                    profiles = loadFromServerToPOJO.loadAllProfile(rqs.sendGet(url.GET_ALL_PROFILE(), loginModel));
                } catch (IOException e) {
                    mainListViewHelper.couldNotLoadFoodOrProfilesTextSetter(messageTextArea, true, e);
                }
                try {
                    users = getUsersList();
                    if (profiles != null && users != null) {
                        loadToMainListview.loadProfilesToListView(profiles, users);
                        isProfileShown = true;
                        originalMainItems = mainListView.getItems();
                        searchField.setText("");
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "An error has occurred while loading profiles", "#ef1400", 3);
                    }
                } catch (Exception e) {
                    mainListViewHelper.couldNotLoadFoodOrProfilesTextSetter(messageTextArea, true, e);
                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
    }


    @FXML
    public void foodsClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        mainListView.getItems().clear();
        showListNameText.setText("Food");
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                isProfileShown = false;
                mainListViewHelper.changeButtonsBetweenProfileAndFood(false, undeleteBtn, loadCreateBtn, deleteBtn, blockButton, unblockButton, editVbox, showDataVbox);

                try {
                    foods = loadFromServerToPOJO.loadAllFood(rqs.sendGet(url.GET_ALL_FOOD(), loginModel));
                } catch (IOException e) {
                    mainListViewHelper.couldNotLoadFoodOrProfilesTextSetter(messageTextArea, false, e);
                }
                try {
                    if (foods != null) {
                        loadToMainListview.loadFoodsToListView(foods);
                        isFoodShown = true;
                        originalMainItems = mainListView.getItems();
                        searchField.setText("");
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "An error has occurred while loading foods", "#ef1400", 3);
                    }
                } catch (Exception e) {
                    mainListViewHelper.couldNotLoadFoodOrProfilesTextSetter(messageTextArea, false, e);
                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
    }

    @FXML
    public void blockClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                if (isProfileShown && !isFoodShown) {
                    int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                    Optional<User> optionalUser = users.stream().filter(x -> x.getUserId() == index).findFirst();
                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();
                        if (!user.isBlocked()) {
                            sendRequest(HttpMethod.DELETE, url.BLOCK_USER(index), actionEvent, "Profile blocked successfully", "An error has occurred.", "ERROR: Couldn't block profile.", false);
                        } else {
                            informUser.setTextThenEmpty(messageTextArea, "Profile is blocked.", "#ef1400", 3);
                        }
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
                    }

                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
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
            informUser.setTextThenEmpty(messageTextArea, informUser.messageFromError(e), "#ef1400", 3);
        }
    }


    @FXML
    public void unblockClick(ActionEvent actionEvent) {
        loading.setVisible(true);
        Task<Void> task = new Task<>() {
            @Override
            protected Void call() throws Exception {
                if (isProfileShown && !isFoodShown) {
                    int index = mainListViewHelper.getCurrentSelectedItemIndex(mainListView);
                    Optional<User> optionalUser = users.stream().filter(x -> x.getUserId() == index).findFirst();
                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();
                        if (user.isBlocked()) {
                            sendRequest(HttpMethod.PATCH, url.UNBLOCK_USER(index), actionEvent, "Profile unblocked successfully", "An error has occurred.", "ERROR: Couldn't unblock profile.", false);
                        } else {
                            informUser.setTextThenEmpty(messageTextArea, "Profile is not blocked.", "#ef1400", 3);
                        }
                    } else {
                        informUser.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
                    }
                }
                return null;
            }
        };
        task.setOnSucceeded(event -> loading.setVisible(false));
        new Thread(task).start();
    }

    public void sendRequest(HttpMethod httpMethod, String url, ActionEvent actionEvent, String successMessage, String JsonError, String errorMessage, boolean changeInFoodList) {
        if (mainListView.getSelectionModel().isEmpty()) {
            informUser.setTextThenEmpty(messageTextArea, "Please select an item from the list!", "#ef1400", 3);
            return;
        }
        try {
            RequestSender requestSender = new RequestSender();
            String request = requestSender.sendRequest(loginModel, httpMethod, url);
            mainListView.getItems().clear();
            if (createFoodMainMethods.isValidJSON(request)) {
                if (changeInFoodList) {
                    foodsClick(actionEvent);
                    messageTextArea.setText(successMessage);
                    informUser.setTextThenEmpty(messageTextArea, successMessage, "#29be0e", 3);

                } else {
                    profilesClick(actionEvent);
                    informUser.setTextThenEmpty(messageTextArea, successMessage, "#29be0e", 3);
                }
            } else {
                informUser.setTextThenEmpty(messageTextArea, JsonError, "#ef1400", 3);
            }
        } catch (Exception e) {
            informUser.setTextThenEmpty(messageTextArea, errorMessage + " -> " + informUser.messageFromError(e), "#ef1400", 3);
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
        InformUser informUser1 = new InformUser();
        informUser1.setTextThenEmpty(staticMessageTextArea, text, color, seconds);
    }

}