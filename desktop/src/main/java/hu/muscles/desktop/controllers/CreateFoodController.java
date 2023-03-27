package hu.muscles.desktop.controllers;

import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.models.LoginModel;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;

import java.net.URL;
import java.util.ResourceBundle;

public class CreateFoodController implements Initializable {
    @FXML
    private TextField nameField;
    @FXML
    private Spinner<Double> kcalField;
    @FXML
    private ComboBox<UnitsEnum> unitField;
    @FXML
    private Spinner<Double> perUnitField;
    @FXML
    private Spinner<Double> proteinField;
    @FXML
    private Spinner<Double> fatField;
    @FXML
    private Spinner<Double> saturatedField;
    @FXML
    private Spinner<Double> polyunsaturatedFatField;
    @FXML
    private Spinner<Double> monounsaturatedFatField;
    @FXML
    private Spinner<Double> carbohydrateField;
    @FXML
    private Spinner<Double> sugarField;
    @FXML
    private Spinner<Double> fiberField;
    @FXML
    private Button createFoodBtn;
    @FXML
    private Button cancelCreateFoodBtn;
    @FXML
    private TextArea messageTextArea;

    private LoginModel loginModel;

    public void setLoginModelCreateFood(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

    }


    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
    }

    @FXML
    public void cancelCreateFoodBtnClick(ActionEvent actionEvent) {
    }
}
