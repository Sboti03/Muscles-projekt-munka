package hu.muscles.desktop.controllers;

import hu.muscles.desktop.foodMethods.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.foodMethods.foodTextInput.FoodTextInput;
import hu.muscles.desktop.responses.foodResponse.FoodsCreateOrUpdate;
import hu.muscles.desktop.responses.foodResponse.UnitsEnum;
import hu.muscles.desktop.models.FoodModel;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;

import java.util.ArrayList;
import java.util.List;

import static hu.muscles.desktop.controllers.MainViewController.*;

public class UpdateFoodController {

    private LoginModel loginModel;
    private FoodModel foodModel;
    private FoodsCreateOrUpdate foodOriginalValue;

    private final Urls url = new Urls();
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    private MainViewController mainViewController;
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
    private Button updateFoodBtn;
    @FXML
    private Button cancelFoodBtn;
    @FXML
    private Button resetFoodBtn;

    private final FoodTextInput foodTextInput = new FoodTextInput();


    @FXML
    public void updateFoodClick(ActionEvent actionEvent) {
       if (createFoodMainMethods.CreateFood(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, loginModel, url, true, foodModel.getFood().getFoodId())) {
           mainViewController.foodsClick(actionEvent);
           cancelFoodClick(actionEvent);
       }
    }

    @FXML
    public void cancelFoodClick(ActionEvent actionEvent) {
        resetFieldsToDefault();
        setUpdateToInvisible();
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
        foodTextInput.InitializeFields(kcalField, perUnitField, proteinField, fatField, carbohydrateField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, sugarField, fiberField, unitField);
        nameField.setText(foodModel.getFood().getName());
        kcalField.setText(String.valueOf(foodModel.getFood().getKcal()));
        unitField.setValue(UnitsEnum.valueOf(foodModel.getFood().getUnit().getUnit()));
        perUnitField.setText(String.valueOf(foodModel.getFood().getPerUnit()));
        proteinField.setText(String.valueOf(foodModel.getFood().getProtein()));
        fatField.setText(String.valueOf(foodModel.getFood().getFat()));
        saturatedFatField.setText((foodModel.getFood().getSaturatedFat() != -1 ? String.valueOf(foodModel.getFood().getSaturatedFat()) : ""));
        polyunsaturatedFatField.setText((foodModel.getFood().getPolyunsaturatedFat() != -1 ? String.valueOf(foodModel.getFood().getPolyunsaturatedFat()) : ""));
        carbohydrateField.setText(String.valueOf(foodModel.getFood().getCarbohydrate()));
        monounsaturatedFatField.setText((foodModel.getFood().getMonounsaturatedFat() != -1 ? String.valueOf(foodModel.getFood().getMonounsaturatedFat()) : ""));
        sugarField.setText((foodModel.getFood().getSugar() != -1 ? String.valueOf(foodModel.getFood().getSugar()) : ""));
        fiberField.setText((foodModel.getFood().getFiber() != -1 ? String.valueOf(foodModel.getFood().getFiber()) : ""));
        foodOriginalValue = new FoodsCreateOrUpdate(foodModel.getFood().getName(), foodModel.getFood().getKcal(), UnitsEnum.valueOf(foodModel.getFood().getUnit().getUnit()), foodModel.getFood().getPerUnit(), foodModel.getFood().getProtein(), foodModel.getFood().getFat(), foodModel.getFood().getSaturatedFat(), foodModel.getFood().getPolyunsaturatedFat(), foodModel.getFood().getMonounsaturatedFat(), foodModel.getFood().getCarbohydrate(), foodModel.getFood().getSugar(), foodModel.getFood().getFiber());
        List<TextField> textFields = new ArrayList<>(List.of(nameField, kcalField, perUnitField, proteinField, fatField, saturatedFatField, carbohydrateField, monounsaturatedFatField, sugarField, fiberField, polyunsaturatedFatField));
        createFoodMainMethods.addEnterExecution(textFields, unitField, true, null, this);
    }

    private void resetFieldsToDefault() {
        nameField.setText(foodOriginalValue.getName());
        kcalField.setText(String.valueOf(foodOriginalValue.getKcal()));
        unitField.setValue(foodOriginalValue.getUnit());
        perUnitField.setText(String.valueOf(foodOriginalValue.getPerUnit()));
        proteinField.setText(String.valueOf(foodOriginalValue.getProtein()));
        fatField.setText(String.valueOf(foodOriginalValue.getFat()));
        saturatedFatField.setText((foodOriginalValue.getSaturatedFat() != -1 ? String.valueOf(foodOriginalValue.getSaturatedFat()) : ""));
        polyunsaturatedFatField.setText((foodOriginalValue.getPolyunsaturatedFat() != -1 ? String.valueOf(foodOriginalValue.getPolyunsaturatedFat()) : ""));
        monounsaturatedFatField.setText((foodOriginalValue.getMonounsaturatedFat() != -1 ? String.valueOf(foodOriginalValue.getMonounsaturatedFat()) : ""));
        carbohydrateField.setText(String.valueOf(foodOriginalValue.getCarbohydrate()));
        sugarField.setText((foodOriginalValue.getSugar() != -1 ? String.valueOf(foodOriginalValue.getSugar()) : ""));
        fiberField.setText((foodOriginalValue.getFiber() != -1 ? String.valueOf(foodOriginalValue.getFiber()): ""));
    }


    public void setMainController(MainViewController mainViewController) {
        this.mainViewController = mainViewController;
    }
}
