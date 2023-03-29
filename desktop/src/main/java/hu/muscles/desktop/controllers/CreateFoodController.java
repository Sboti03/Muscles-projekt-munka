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
        createFoodMainMethods.setTextFieldToDoubleOrNull(kcalField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(perUnitField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(proteinField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(fatField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(carbohydrateField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(saturatedFatField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(polyunsaturatedFatField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(monounsaturatedFatField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(sugarField);
        createFoodMainMethods.setTextFieldToDoubleOrNull(fiberField);
        unitField.setItems(FXCollections.observableArrayList(UnitsEnum.values()));
        unitField.setValue((UnitsEnum.gram));
    }

    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
        try {
            FoodsCreateOrUpdate food = createFoodMainMethods.foodCreate(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, messageTextArea);
            if (food != null && !Objects.equals(food.getName(), "")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new SimpleModule().addSerializer(Double.class, new CustomDoubleSerializer()));
                String json = "";
                try {
                    json = mapper.writeValueAsString(food);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    messageTextArea.setText(e.getMessage());
                }
                if (!json.isEmpty()) {
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
                    HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
                    ResponseEntity<String> responseEntity = restTemplate.exchange(url.CREATE_FOOD(), HttpMethod.POST, requestEntity, String.class);
                    System.out.println(responseEntity.getBody());
                    messageTextArea.clear();
                    if (createFoodMainMethods.isValidJSON(requestEntity.getBody())) {
                        messageTextArea.setText("Food is added successfully!");
                    } else {
                        messageTextArea.setText(responseEntity.getBody());
                    }
                }
            } else {
                messageTextArea.clear();
                messageTextArea.setText("Not all argument are valid.");
            }
        } catch (Exception e) {
            messageTextArea.clear();
            messageTextArea.setText(e.getMessage());
            System.out.println(e.getMessage());
        }
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




