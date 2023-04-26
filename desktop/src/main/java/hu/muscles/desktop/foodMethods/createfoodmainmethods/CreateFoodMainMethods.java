package hu.muscles.desktop.foodMethods.createfoodmainmethods;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import hu.muscles.desktop.controllers.CreateFoodController;
import hu.muscles.desktop.controllers.UpdateFoodController;
import hu.muscles.desktop.foodMethods.customDoubleSerializer.CustomDoubleSerializer;
import hu.muscles.desktop.foodMethods.foodTextInput.FoodTextInput;
import hu.muscles.desktop.responses.foodResponse.FoodsCreateOrUpdate;
import hu.muscles.desktop.responses.foodResponse.UnitsEnum;
import hu.muscles.desktop.informUser.InformUser;
import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.requestsender.RequestSender;
import hu.muscles.desktop.urls.Urls;
import javafx.event.ActionEvent;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.input.KeyCode;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static hu.muscles.desktop.controllers.CreateFoodController.setMessageForCreateTextArea;
import static hu.muscles.desktop.controllers.MainViewController.setMessageForMainTextArea;

public class CreateFoodMainMethods {
    private final InformUser informUser;
    private final FoodTextInput foodTextInput;

    public CreateFoodMainMethods() {
        informUser = new InformUser();
        foodTextInput = new FoodTextInput();
    }

    public FoodsCreateOrUpdate foodCreate(TextField nameField, TextField kcalField, ComboBox<UnitsEnum> unitField, TextField perUnitField, TextField proteinField, TextField fatField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField carbohydrateField, TextField sugarField, TextField fiberField) {
        String name = nameField.getText().trim();
        UnitsEnum units = unitField.getValue();
        Double kcal;
        Double perUnit;
        Double protein;
        Double fat;
        Double carbohydrate;
        try {
            kcal = foodTextInput.returnDoubleValue(kcalField);
            perUnit = foodTextInput.returnDoubleValue(perUnitField);
            protein = foodTextInput.returnDoubleValue(proteinField);
            fat = foodTextInput.returnDoubleValue(fatField);
            carbohydrate = foodTextInput.returnDoubleValue(carbohydrateField);
        } catch (IllegalArgumentException e) {
            return null;
        }
        Double saturatedFat = foodTextInput.returnNullableDoubleValue(saturatedFatField);
        Double polyunsaturatedFat = foodTextInput.returnNullableDoubleValue(polyunsaturatedFatField);
        Double monounsaturatedFat = foodTextInput.returnNullableDoubleValue(monounsaturatedFatField);
        Double sugar = foodTextInput.returnNullableDoubleValue(sugarField);
        Double fiber = foodTextInput.returnNullableDoubleValue(fiberField);
        return new FoodsCreateOrUpdate(name, kcal, units, perUnit, protein, fat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, carbohydrate, sugar, fiber);
    }


    public boolean CreateFood(TextField nameField, TextField kcalField, ComboBox<UnitsEnum> unitField, TextField perUnitField, TextField proteinField, TextField fatField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField carbohydrateField, TextField sugarField, TextField fiberField, LoginModel loginModel, Urls url, boolean isUpdate, int foodId) {
        try {
            FoodsCreateOrUpdate food = foodCreate(nameField, kcalField, unitField, perUnitField, proteinField, fatField, saturatedFatField, polyunsaturatedFatField, monounsaturatedFatField, carbohydrateField, sugarField, fiberField);
            if (food != null && !food.getName().equals("")) {
                ObjectMapper mapper = new ObjectMapper();
                mapper.registerModule(new SimpleModule().addSerializer(Double.class, new CustomDoubleSerializer()));
                String json = "";
                try {
                    json = mapper.writeValueAsString(food);
                } catch (JsonProcessingException e) {
                    setMessage(isUpdate, "Json Processing Error happened.", "#ef1400");
                    return false;
                }
                if (!isUpdate) {
                    if (!json.isEmpty()) {
                       return sendRequest(loginModel, url.CREATE_FOOD(), json, "Food created successfully!", HttpMethod.POST, false);
                    }
                } else {
                    if (!json.isEmpty()) {
                       return sendRequest(loginModel, url.UPDATE_FOOD(foodId), json, "Food updated successfully!", HttpMethod.PATCH, true);
                    }
                }
            } else {
                setMessage(isUpdate, "Not all value are valid.", "#ef1400");
                return false;
            }
        } catch (Exception e) {
            setMessage(isUpdate, informUser.messageFromError(e), "#ef1400");
            return false;
        }
        return false;
    }


    private boolean sendRequest(LoginModel loginModel, String url, String json, String textareaMessage, HttpMethod httpMethod, boolean isUpdate) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            json = json.replaceAll(": \"\"", ": null");
            HttpEntity<String> requestEntity = new HttpEntity<>(json, headers);
            RestTemplate restTemplate = new RestTemplate();
            RequestSender rq = new RequestSender();
            restTemplate = rq.getPATCHRestTemplate(restTemplate, httpMethod);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
            if (isValidJSON(requestEntity.getBody())) {
                setMessage(isUpdate, textareaMessage, "#29be0e");
                return true;
            } else {
                setMessage(isUpdate, "ERROR -> got back: " + responseEntity.getBody(), "#ef1400");
                return false;
            }
        } catch (Exception e) {
            setMessage(isUpdate, informUser.messageFromError(e), "#ef1400");
            return false;
        }
    }


    private void setMessage(boolean isUpdate, String text, String color) {
        if (isUpdate) {
            setMessageForMainTextArea(text, color, 3);
        } else {
            setMessageForCreateTextArea(text, color, 3);
        }
    }

    public void addEnterExecution(List<TextField> textFieldList, ComboBox<UnitsEnum> units, boolean isUpdate, CreateFoodController createFoodController, UpdateFoodController updateFoodController) {
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
        units.setOnKeyPressed(keyEvent -> {
            if (keyEvent.getCode() == KeyCode.ENTER) {
                updateFoodController.updateFoodClick(new ActionEvent());
            }
        });
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
}