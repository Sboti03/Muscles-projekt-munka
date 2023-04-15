package hu.muscles.desktop.createfoodmainmethods;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import hu.muscles.desktop.controllers.CreateFoodController;
import hu.muscles.desktop.controllers.MainViewController;
import hu.muscles.desktop.controllers.UpdateFoodController;
import hu.muscles.desktop.customdoubleserializer.CustomDoubleSerializer;
import hu.muscles.desktop.foodsData.FoodsCreateOrUpdate;
import hu.muscles.desktop.foodsData.UnitsEnum;
import hu.muscles.desktop.messageFunctions.MessageFunctions;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.requestsender.RequestSender;
import hu.muscles.desktop.urls.Urls;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.control.TextFormatter;
import javafx.scene.input.KeyCode;
import javafx.util.StringConverter;
import javafx.util.converter.NumberStringConverter;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Objects;

import static hu.muscles.desktop.controllers.CreateFoodController.setMessageForCreateTextArea;
import static hu.muscles.desktop.controllers.MainViewController.setMessageForMainTextArea;

public class CreateFoodMainMethods {
    private final MessageFunctions messageFunctions;

    public CreateFoodMainMethods() {
        messageFunctions = new MessageFunctions();
    }

    public void setTextFieldToDoubleOrNull(TextField textField) {
        DecimalFormat decimalFormat = new DecimalFormat("#.##################");
        StringConverter<Number> converter = new NumberStringConverter(decimalFormat);
        StringConverter<Double> customDoubleStringConverter = new StringConverter<Double>() {
            @Override
            public String toString(Double value) {
                if (value == null) {
                    return "";
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
                    double number = Double.parseDouble(string);
                    if (Double.compare(number, 0.0001) <= 0 && Double.compare(number, 0) != 0) {
                        return null;
                    }
                    return number;
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


    public FoodsCreateOrUpdate foodCreate(TextField nameField, TextField kcalField, ComboBox<UnitsEnum> unitField, TextField perUnitField, TextField proteinField, TextField fatField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField carbohydrateField, TextField sugarField, TextField fiberField, boolean isUpdate) {
        String name = nameField.getText().trim();
        UnitsEnum units = unitField.getValue();
        Double kcal;
        Double perUnit;
        Double protein;
        Double fat;
        Double carbohydrate;
        try {
            kcal = returnDoubleValue(kcalField, isUpdate);
            perUnit = returnDoubleValue(perUnitField, isUpdate);
            protein = returnDoubleValue(proteinField, isUpdate);
            fat = returnDoubleValue(fatField, isUpdate);
            carbohydrate = returnDoubleValue(carbohydrateField, isUpdate);
        } catch (IllegalArgumentException e) {
            return null;
        }
        Double saturatedFat = returnNullableDoubleValue(saturatedFatField);
        Double polyunsaturatedFat = returnNullableDoubleValue(polyunsaturatedFatField);
        Double monounsaturatedFat = returnNullableDoubleValue(monounsaturatedFatField);
        Double sugar = returnNullableDoubleValue(sugarField);
        Double fiber = returnNullableDoubleValue(fiberField);
        return new FoodsCreateOrUpdate(name, kcal, units, perUnit, protein, fat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, carbohydrate, sugar, fiber);
        //TODO: above here create more constructors
    }

    public Double returnNullableDoubleValue(TextField field) {
        Double fieldElement = null;
        try {
            fieldElement = Double.parseDouble(field.getText());
        } catch (NumberFormatException ignored) {
        }
        return fieldElement;
    }

    public Double returnDoubleValue(TextField field, boolean isUpdate) {
        try {
            return Double.parseDouble(field.getText());
        } catch (NumberFormatException e) {
            setMessage(isUpdate, "Error -> " + messageFunctions.messageFromError(e), "ef1400", 3);
            throw new IllegalArgumentException();
        }
    }

    public boolean isValidJSON(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.readTree(json);
            return true;
        } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
            return false;
        }
    }

    public void CreateFood(TextField nameField, TextField kcalField, ComboBox<UnitsEnum> unitField, TextField perUnitField, TextField proteinField, TextField fatField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField carbohydrateField, TextField sugarField, TextField fiberField, LoginModel loginModel, Urls url, boolean isUpdate, int foodId) {
        try {
            FoodsCreateOrUpdate food = foodCreate(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField, isUpdate);
            if (food != null && !Objects.equals(food.getName(), "")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new SimpleModule().addSerializer(Double.class, new CustomDoubleSerializer()));
                String json = "";
                try {
                    json = mapper.writeValueAsString(food);
                } catch (JsonProcessingException e) {
                    setMessage(isUpdate, "Json Processing Error happened.", "#ef1400", 3);
                    return;
                }
                if (!isUpdate) {
                    if (!json.isEmpty()) {
                        sendRequest(loginModel, url.CREATE_FOOD(), json, "Food created successfully!", HttpMethod.POST, false);
                    }
                } else {
                    if (!json.isEmpty()) {
                        sendRequest(loginModel, url.UPDATE_FOOD(foodId), json, "Food updated successfully!", HttpMethod.PATCH, true);
                    }
                }
            } else {
                setMessage(isUpdate, "Not all value are valid.", "#ef1400", 3);
            }
        } catch (Exception e) {
            setMessage(isUpdate, messageFunctions.messageFromError(e), "#ef1400", 3);
        }
    }


    private void sendRequest(LoginModel loginModel, String url, String json, String textareaMessage, HttpMethod httpMethod, boolean isUpdate) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
            RestTemplate restTemplate = new RestTemplate();
            RequestSender rq = new RequestSender();
            restTemplate = rq.getPATCHRestTemplate(restTemplate, httpMethod);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
            if (isValidJSON(requestEntity.getBody())) {
                setMessage(isUpdate, textareaMessage, "#29be0e", 3);
            } else {
                setMessage(isUpdate, "ERROR -> got back: " + responseEntity.getBody(), "#ef1400", 3);
            }
        } catch (Exception e) {
            setMessage(isUpdate, messageFunctions.messageFromError(e), "#ef1400", 3);
        }
    }

    public void InitializeFields(TextField kcalField, TextField perUnitField, TextField proteinField, TextField fatField, TextField carbohydrateField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField sugarField, TextField fiberField, ComboBox unitField) {
        setTextFieldToDoubleOrNull(kcalField);
        setTextFieldToDoubleOrNull(perUnitField);
        setTextFieldToDoubleOrNull(proteinField);
        setTextFieldToDoubleOrNull(fatField);
        setTextFieldToDoubleOrNull(carbohydrateField);
        setTextFieldToDoubleOrNull(saturatedFatField);
        setTextFieldToDoubleOrNull(polyunsaturatedFatField);
        setTextFieldToDoubleOrNull(monounsaturatedFatField);
        setTextFieldToDoubleOrNull(sugarField);
        setTextFieldToDoubleOrNull(fiberField);
        unitField.setItems(FXCollections.observableArrayList(UnitsEnum.values()));
    }

    private void setMessage(boolean isUpdate, String text, String color, int seconds) {
        if (isUpdate) {
            setMessageForMainTextArea(text, color, seconds);
        } else {
            setMessageForCreateTextArea(text, color, seconds);
        }
    }

    public void addEnterExecution(List<TextField> textFieldList, boolean isUpdate, CreateFoodController createFoodController, UpdateFoodController updateFoodController) {
        if (isUpdate) {
            for (TextField textField : textFieldList) {
                textField.setOnKeyPressed(keyEvent -> {
                    if (keyEvent.getCode() == KeyCode.ENTER) {
                        updateFoodController.updateFoodClick(new ActionEvent());
                    }
                });
            }
        } else {
            for (TextField textField : textFieldList) {
                textField.setOnKeyPressed(keyEvent -> {
                    if (keyEvent.getCode() == KeyCode.ENTER) {
                        createFoodController.createFoodClick(new ActionEvent());
                    }
                });
            }
        }
    }
}