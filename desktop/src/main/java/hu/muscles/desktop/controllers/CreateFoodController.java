package hu.muscles.desktop.controllers;

import hu.muscles.desktop.app;
import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.models.LoginModel;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.control.Spinner;
import javafx.scene.control.SpinnerValueFactory.DoubleSpinnerValueFactory;
import javafx.stage.Stage;
import javafx.util.StringConverter;
import javafx.util.converter.DoubleStringConverter;

import java.io.IOException;
import java.net.URL;
import java.util.OptionalDouble;
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

    public void setLoginModelCreateFood(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        setTextFieldToDoubleOrNull(kcalField);
        setTextFieldToDoubleOrNull(perUnitField);
        setTextFieldToDoubleOrNull(proteinField);
        setTextFieldToDoubleOrNull(fatField);
        setTextFieldToDoubleOrNull(saturatedFatField);
        setTextFieldToDoubleOrNull(polyunsaturatedFatField);
        setTextFieldToDoubleOrNull(monounsaturatedFatField);
        setTextFieldToDoubleOrNull(carbohydrateField);
        setTextFieldToDoubleOrNull(sugarField);
        setTextFieldToDoubleOrNull(fiberField);
    }


    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
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

    public void setTextFieldToDoubleOrNull(TextField textField) {
        textField.setTextFormatter(new TextFormatter<>(new DoubleStringConverter(), null, change -> {
            String newText = change.getControlNewText();
            if (newText.isEmpty()) {
                return change;
            }
            if (newText.contains("f")) {
                newText.replace("f", "");
                return null;
            }
            if (newText.contains("d")) {
                newText.replace("d", "");
                return null;
            }
            try {
                Double.parseDouble(newText);
                return change;
            } catch (NumberFormatException e) {
                return null;
            }
        }));
    }
}



