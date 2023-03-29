package hu.muscles.desktop.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import hu.muscles.desktop.app;
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

    public void setLoginModelCreateFood(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {

        // can't be null
        setTextFieldToDoubleOrNull(kcalField);
        setTextFieldToDoubleOrNull(perUnitField);
        setTextFieldToDoubleOrNull(proteinField);
        setTextFieldToDoubleOrNull(fatField);
        setTextFieldToDoubleOrNull(carbohydrateField);
        //can't be null

        setTextFieldToDoubleOrNull(saturatedFatField);
        setTextFieldToDoubleOrNull(polyunsaturatedFatField);
        setTextFieldToDoubleOrNull(monounsaturatedFatField);
        setTextFieldToDoubleOrNull(sugarField);
        setTextFieldToDoubleOrNull(fiberField);
        unitField.setItems(FXCollections.observableArrayList(UnitsEnum.values()));
        unitField.setValue((UnitsEnum.gram));
    }


    @FXML
    public void createFoodClick(ActionEvent actionEvent) {
        FoodsCreateOrUpdate food = foodCreate();
        if (food != null && !Objects.equals(food.getName(), "")) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new SimpleModule().addSerializer(Double.class, new CustomDoubleSerializer()));
            String json = "";
            try {
                json = mapper.writeValueAsString(food);
                messageTextArea.setText(json);
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
                messageTextArea.setText(responseEntity.getBody());
            }
        } else {
            messageTextArea.clear();
            messageTextArea.setText("Not all argument are valid.");
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

    public void setTextFieldToDoubleOrNull(TextField textField) {
        StringConverter<Double> customDoubleStringConverter = new StringConverter<Double>() {
            @Override
            public String toString(Double value) {
                if (value == null) {
                    return "";
                }
                if (value == Math.rint(value)) {
                    return String.format("%.0f", value);
                } else {
                    return value.toString();
                }
            }

            @Override
            public Double fromString(String string) {
                if (string == null || string.isEmpty()) {
                    return null;
                }
                try {
                    return Double.parseDouble(string);
                } catch (NumberFormatException e) {
                    return null;
                }
            }
        };

        textField.setTextFormatter(new TextFormatter<>(customDoubleStringConverter, null, change -> {
            String newText = change.getControlNewText();
            if (newText.isEmpty()) {
                return change;
            }
            if (newText.toLowerCase().contains("f")) {
                return null;
            }
            if (newText.toLowerCase().contains("d")) {
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

    public FoodsCreateOrUpdate foodCreate() {
        String name = nameField.getText().trim();
        UnitsEnum units = unitField.getValue();
        Double kcal;
        Double perUnit;
        Double protein;
        Double fat;
        try {
            kcal = returnDoubleValue(kcalField);
            perUnit = returnDoubleValue(perUnitField);
            protein = returnDoubleValue(proteinField);
            fat = returnDoubleValue(fatField);
        } catch (IllegalArgumentException e) {
            return null;
        }
        Double saturatedFat = returnNullableDoubleValue(saturatedFatField);
        Double polyunsaturatedFat = returnNullableDoubleValue(polyunsaturatedFatField);
        Double monounsaturatedFat = returnNullableDoubleValue(monounsaturatedFatField);
        Double carbohydrate = returnNullableDoubleValue(carbohydrateField);
        Double sugar = returnNullableDoubleValue(sugarField);
        Double fiber = returnNullableDoubleValue(fiberField);
        return new FoodsCreateOrUpdate(name, kcal, units, perUnit, protein, fat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, carbohydrate, sugar, fiber);
    }

    public Double returnNullableDoubleValue(TextField field) {
        Double fieldElement = null;
        try {
            fieldElement = Double.parseDouble(field.getText());
        } catch (NumberFormatException ignored) {
        }
        return fieldElement;
    }

    public Double returnDoubleValue(TextField field) {
        try {
            return Double.parseDouble(field.getText());
        } catch (NumberFormatException e) {
            messageTextArea.clear();
            messageTextArea.setText(e.getMessage());
            throw new IllegalArgumentException();
        }
    }

}




