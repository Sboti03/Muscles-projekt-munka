package hu.muscles.desktop.controllers;

import com.jfoenix.controls.JFXTextArea;
import hu.muscles.desktop.App;
import hu.muscles.desktop.foodMethods.createfoodmainmethods.CreateFoodMainMethods;
import hu.muscles.desktop.foodMethods.foodTextInput.FoodTextInput;
import hu.muscles.desktop.informUser.InformUser;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.responses.foodResponse.UnitsEnum;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
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
    private JFXTextArea messageTextArea;

    private LoginModel loginModel;
    private final Urls url = new Urls();
    private final CreateFoodMainMethods createFoodMainMethods = new CreateFoodMainMethods();
    private final InformUser informUser = new InformUser();
    private static JFXTextArea staticMessageTextArea;
    private final FoodTextInput foodTextInput = new FoodTextInput();

    public void setLoginModelCreateFood(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        foodTextInput.InitializeFields(kcalField, perUnitField, proteinField, fatField, carbohydrateField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, sugarField, fiberField, unitField);
        unitField.setValue((UnitsEnum.gram));
        staticMessageTextArea = messageTextArea;
        List<TextField> textFields = new ArrayList<>(List.of(nameField, kcalField, perUnitField, proteinField, fatField, saturatedFatField, carbohydrateField, monounsaturatedFatField, sugarField, fiberField, polyunsaturatedFatField));
        createFoodMainMethods.addEnterExecution(textFields, unitField,false,this, null);
    }

    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
        createFoodMainMethods.CreateFood(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, loginModel, url, false, -1);
    }

    @FXML
    public void cancelCreateFoodBtnClick(ActionEvent actionEvent) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/mainResources/main-view.fxml"));
            Stage stage = (Stage) cancelCreateFoodBtn.getScene().getWindow();
            stage.getScene().setRoot(fxmlLoader.load());
            ((MainViewController) fxmlLoader.getController()).setLoginModelForMain(loginModel);
        } catch (IOException e) {
            informUser.setTextThenEmpty(messageTextArea, "Error in heading back to main.", "#ef1400", 3);
        }
    }

    public static void setMessageForCreateTextArea(String text, String color, int seconds) {
        InformUser informUser1 = new InformUser();
        informUser1.setTextThenEmpty(staticMessageTextArea, text, color, seconds);
    }
}




