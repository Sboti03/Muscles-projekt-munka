package hu.muscles.desktop.createfoodmainmethods;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.foodsData.FoodsCreateOrUpdate;
import hu.muscles.desktop.foodsData.UnitsEnum;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.TextFormatter;
import javafx.util.StringConverter;

public class CreateFoodMainMethods {

    public CreateFoodMainMethods() {
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

    public FoodsCreateOrUpdate foodCreate(TextField nameField, TextField kcalField, ComboBox<UnitsEnum> unitField, TextField perUnitField, TextField proteinField, TextField fatField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField carbohydrateField, TextField sugarField, TextField fiberField, TextArea messageTextArea) {
        String name = nameField.getText().trim();
        UnitsEnum units = unitField.getValue();
        Double kcal;
        Double perUnit;
        Double protein;
        Double fat;
        Double carbohydrate;
        try {
            kcal = returnDoubleValue(kcalField, messageTextArea);
            perUnit = returnDoubleValue(perUnitField, messageTextArea);
            protein = returnDoubleValue(proteinField, messageTextArea);
            fat = returnDoubleValue(fatField, messageTextArea);
            carbohydrate = returnDoubleValue(carbohydrateField, messageTextArea);
        } catch (IllegalArgumentException e) {
            return null;
        }
        Double saturatedFat = returnNullableDoubleValue(saturatedFatField);
        Double polyunsaturatedFat = returnNullableDoubleValue(polyunsaturatedFatField);
        Double monounsaturatedFat = returnNullableDoubleValue(monounsaturatedFatField);
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

    public Double returnDoubleValue(TextField field, TextArea messageTextArea) {
        try {
            return Double.parseDouble(field.getText());
        } catch (NumberFormatException e) {
            messageTextArea.clear();
            messageTextArea.setText(e.getMessage());
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

}
