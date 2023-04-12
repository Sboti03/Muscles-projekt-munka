package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import hu.muscles.desktop.app;
import hu.muscles.desktop.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.customdoubleserializer.CustomDoubleSerializer;
import hu.muscles.desktop.foodsData.FoodsCreateOrUpdate;
import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.stage.Stage;
import javafx.util.StringConverter;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.ResourceBundle;

public class CreateFoodController implements Initializable {
    @FXML
    private TextField nameField;
    @FXML
    private TextField kcalField;
    @FXML
    private ComboBox<UnitsEnum> unitField;
    @FXML
    private TextField perUnitField;
    @FXML
    private TextField proteinField;
    @FXML
    private TextField fatField;
    @FXML
    private TextField saturatedFatField;
    @FXML
    private TextField polyunsaturatedFatField;
    @FXML
    private TextField monounsaturatedFatField;
    @FXML
    private TextField carbohydrateField;
    @FXML
    private TextField sugarField;
    @FXML
    private TextField fiberField;
    @FXML
    private Button createFoodBtn;
    @FXML
    private Button cancelCreateFoodBtn;
    @FXML
    private TextArea messageTextArea;

    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();

    public void setLoginModelCreateFood(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        createFoodMainMethods.InitializeFields(kcalField, perUnitField, proteinField, fatField, carbohydrateField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, sugarField, fiberField, unitField);
        unitField.setValue((UnitsEnum.gram));
    }

    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
        createFoodMainMethods.CreateFood(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, messageTextArea, loginModel, restTemplate, url, false, -1);
    }

    @FXML
    public void cancelCreateFoodBtnClick(ActionEvent actionEvent) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("main-view.fxml"));
            Stage stage = (Stage) cancelCreateFoodBtn.getScene().getWindow();
            stage.getScene().setRoot(fxmlLoader.load());
            ((MainViewController) fxmlLoader.getController()).setLoginModelForMain(loginModel);
        } catch (IOException e) {
            messageTextArea.setText("Error in heading back to main.");
        }

    }

}




