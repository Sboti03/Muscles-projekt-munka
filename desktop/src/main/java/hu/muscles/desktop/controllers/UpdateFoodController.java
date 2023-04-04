package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import hu.muscles.desktop.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.customdoubleserializer.CustomDoubleSerializer;
import hu.muscles.desktop.foodsData.FoodsCreateOrUpdate;
import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

public class UpdateFoodController {

    private LoginModel loginModel;
    private FoodModel foodModel;
    private FoodsCreateOrUpdate foodOriginalValue;

    private final Urls url = new Urls();
    private final RestTemplate restTemplate = new RestTemplate();
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    @FXML
    private TextField nameField;
    @FXML
    private TextField kcalField;
    @FXML
    private ComboBox unitField;
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
    private Button updateFoodBtn;
    @FXML
    private Button cancelFoodBtn;
    @FXML
    private Button resetFoodBtn;
    @FXML
    private TextArea messageTextArea;

    @FXML
    public void updateFoodClick(ActionEvent actionEvent) {
        createFoodMainMethods.CreateFood(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, messageTextArea, loginModel, restTemplate, url, true, foodModel.getFood().getFoodId());
    }



    @FXML
    public void cancelFoodClick(ActionEvent actionEvent) {
        resetFieldsToDefault();

    }

    @FXML
    public void resetFoodBtnClick(ActionEvent actionEvent) {
        resetFieldsToDefault();
    }

    public void setLoginModelForUpdate(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    public void setUpdateModelForUpdate(FoodModel foodModel) {
        this.foodModel = foodModel;
        nameField.setText(foodModel.getFood().getName());
        kcalField.setText(String.valueOf(foodModel.getFood().getKcal()));
        unitField.setValue(UnitsEnum.valueOf(foodModel.getFood().getUnit().getUnit()));
        perUnitField.setText(String.valueOf(foodModel.getFood().getPerUnit()));
        proteinField.setText(String.valueOf(foodModel.getFood().getProtein()));
        fatField.setText(String.valueOf(foodModel.getFood().getFat()));
        saturatedFatField.setText(String.valueOf(foodModel.getFood().getSaturatedFat()));
        polyunsaturatedFatField.setText(String.valueOf(foodModel.getFood().getPolyunsaturatedFat()));
        monounsaturatedFatField.setText(String.valueOf(foodModel.getFood().getMonounsaturatedFat()));
        carbohydrateField.setText(String.valueOf(foodModel.getFood().getCarbohydrate()));
        sugarField.setText(String.valueOf(foodModel.getFood().getSugar()));
        fiberField.setText(String.valueOf(foodModel.getFood().getFiber()));
        foodOriginalValue = new FoodsCreateOrUpdate(foodModel.getFood().getName(), foodModel.getFood().getKcal(), UnitsEnum.valueOf(foodModel.getFood().getUnit().getUnit()), foodModel.getFood().getPerUnit(), foodModel.getFood().getProtein(), foodModel.getFood().getFat(), foodModel.getFood().getSaturatedFat(), foodModel.getFood().getPolyunsaturatedFat(), foodModel.getFood().getMonounsaturatedFat(), foodModel.getFood().getCarbohydrate(), foodModel.getFood().getSugar(), foodModel.getFood().getFiber());
    }

    private void resetFieldsToDefault() {
        nameField.setText(foodOriginalValue.getName());
        kcalField.setText(String.valueOf(foodOriginalValue.getKcal()));
        unitField.setValue(foodOriginalValue.getUnit());
        perUnitField.setText(String.valueOf(foodOriginalValue.getPerUnit()));
        proteinField.setText(String.valueOf(foodOriginalValue.getProtein()));
        fatField.setText(String.valueOf(foodOriginalValue.getFat()));
        saturatedFatField.setText(String.valueOf(foodOriginalValue.getSaturatedFat()));
        polyunsaturatedFatField.setText(String.valueOf(foodOriginalValue.getPolyunsaturatedFat()));
        monounsaturatedFatField.setText(String.valueOf(foodOriginalValue.getMonounsaturatedFat()));
        carbohydrateField.setText(String.valueOf(foodOriginalValue.getCarbohydrate()));
        sugarField.setText(String.valueOf(foodOriginalValue.getSugar()));
        fiberField.setText(String.valueOf(foodOriginalValue.getFiber()));
    }

    @Deprecated
    public void loadUserDataClick(ActionEvent actionEvent) {
    }
}
