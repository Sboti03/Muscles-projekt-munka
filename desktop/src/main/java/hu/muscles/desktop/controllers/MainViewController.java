package hu.muscles.desktop.controllers;

import hu.muscles.desktop.app;
import hu.muscles.desktop.editListViewCell.EditListViewCell;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.foodsData.FoodsCreateOrUpdate;
import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.listViewShowAndHideFunctions.ListViewFunctionsForMain;
import hu.muscles.desktop.loadFromServerToPOJO.LoadFromServerToPojo;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.profileData.ProfileResponse;
import hu.muscles.desktop.urls.Urls;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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
    @FXML
    private Button cancelUpdateBtn;
    @FXML
    private Button undeleteBtn;
    @FXML
    private HBox updateButtonArea;


    private List<Foods> foods;
    private List<ProfileResponse> profiles;
    private Alert confirmExit;
    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();
    private final String[] updateFoodDataString = new String[]{"Name", "Fat", "Fiber", "kCal", "Carbohydrate", "Per Unit", "Protein", "Sugar", "Monounsaturated fat", "Polyunsaturated fat", "Saturated fat", "Unit"};
    private final String[] profileDataString = new String[]{"First name", "Last name", "Birthdate", "Registration date", "Height", "Gender", "Last changed"};
    private boolean isProfileShown = false;
    private boolean isFoodShown = false;
    private LoadFromServerToPojo loadFromServerToPOJO;
    private ListViewFunctionsForMain listViewFunctionsForMain;
    private EditListViewCell editListViewCell;


    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        mainVbox.setDisable(false);
        confirmExit = new Alert(Alert.AlertType.CONFIRMATION);
        confirmExit.setResizable(false);
        confirmExit.setTitle("Exit");
        confirmExit.setHeaderText("Are you sure you want to exit the app?");
        loadFromServerToPOJO = new LoadFromServerToPojo(mainEditText);
        listViewFunctionsForMain = new ListViewFunctionsForMain(mainListView, labelForData, mainEditText);
        editListViewCell = new EditListViewCell(mainEditText);
        mainListView.getSelectionModel().selectedItemProperty().addListener((observableValue, oldValue, newValue) -> listViewFunctionsForMain.listViewListener(foods, profiles, updateFoodDataString, profileDataString, isProfileShown, isFoodShown, editListViewCell, updateButtonArea));
    }


    public void setLoginModelForMain(LoginModel loginModel) {
        this.loginModel = loginModel;
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
    public void updateClick(ActionEvent actionEvent) {
        FoodsCreateOrUpdate food = foodsUpdateFromListview(mainEditText);
        int foodId = mainListView.getSelectionModel().getSelectedIndex() + 1;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("name", food.getName());
        map.add("kcal", food.getKcal().toString());
        map.add("unit", food.getUnit().toString());
        map.add("perUnit", food.getPerUnit().toString());
        map.add("protein", food.getProtein().toString());
        map.add("fat", food.getFat().toString());
        map.add("saturatedFat", food.getSaturatedFat().toString());
        map.add("polyunsaturatedFat", food.getPolyunsaturatedFat().toString());
        map.add("monounsaturatedFat", food.getMonounsaturatedFat().toString());
        map.add("carbohydrate", food.getCarbohydrate().toString());
        map.add("sugar", food.getSugar().toString());
        map.add("fiber", food.getFiber().toString());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        String response = restTemplate.patchForObject(url.UPDATE_FOOD(foodId), request, String.class);
        System.out.println(response);
    }

    @FXML
    public void cancelUpdateClick(ActionEvent actionEvent) {
    }

    @FXML
    public void deleteClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        System.out.println(index);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url.DELETE_FOOD(index), HttpMethod.DELETE, requestEntity, String.class);
            System.out.println(responseEntity.getBody());
            listViewFunctionsForMain.emptyAllListView();
            mainEditText.getItems().add(responseEntity.getBody());
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllListView();
            mainEditText.getItems().add("ERROR: Couldn't delete food. -> " + e.getMessage());
            e.printStackTrace();
        }
    }

    @FXML
    public void undeleteClick(ActionEvent actionEvent) {
        int index = listViewFunctionsForMain.getCurrentItemIndex(mainListView);
        System.out.println(index);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url.UNDELETE_FOOD(index), HttpMethod.PATCH, requestEntity, String.class);
            System.out.println(responseEntity.getBody());
            listViewFunctionsForMain.emptyAllListView();
            mainEditText.getItems().add(responseEntity.getBody());
        } catch (Exception e) {
            listViewFunctionsForMain.emptyAllListView();
            mainEditText.getItems().add("ERROR: Couldn't undelete food. -> " + e.getMessage());
            e.printStackTrace();
        }
    }

    @FXML
    public void profilesClick(ActionEvent actionEvent) {
        isFoodShown = false;
        changeButtonsBetweenProfileAndFood(true);
        mainListView.getSelectionModel().clearSelection();
        listViewFunctionsForMain.emptyAllListView();
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
        listViewFunctionsForMain.emptyAllListView();
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

    private FoodsCreateOrUpdate foodsUpdateFromListview(ListView<String> editText) {
        String name = editText.getItems().get(0).trim();
        Double fat = Double.parseDouble(editText.getItems().get(1));
        Double fiber = Double.parseDouble(editText.getItems().get(2));
        Double kcal = Double.parseDouble(editText.getItems().get(3));
        Double carbohydrate = Double.parseDouble(editText.getItems().get(4));
        Double perUnit = Double.parseDouble(editText.getItems().get(5));
        Double protein = Double.parseDouble(editText.getItems().get(6));
        Double sugar = Double.parseDouble(editText.getItems().get(7));
        Double monounsaturatedFat = Double.parseDouble(editText.getItems().get(8));
        Double polyunsaturatedFat = Double.parseDouble(editText.getItems().get(9));
        Double saturatedFat = Double.parseDouble(editText.getItems().get(10));
        UnitsEnum unit = UnitsEnum.gram;
        return new FoodsCreateOrUpdate(name, kcal, unit, perUnit, protein, fat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, carbohydrate, sugar, fiber);
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
}
