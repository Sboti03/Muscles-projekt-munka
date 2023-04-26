package hu.muscles.desktop.foodMethods.foodTextInput;

import hu.muscles.desktop.responses.foodResponse.UnitsEnum;
import javafx.collections.FXCollections;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.control.TextFormatter;
import javafx.util.StringConverter;

public class FoodTextInput {

    public void setTextFieldToDoubleOrNull(TextField textField) {
        StringConverter<Number> customDoubleStringConverter = new StringConverter<>() {
            @Override
            public String toString(Number value) {
                if (value == null) {
                    return "";
                } else {
                    if (value.doubleValue() == Math.floor(value.doubleValue())) {
                        return String.format("%.0f", value.doubleValue());
                    } else {
                        return value.toString();
                    }
                }
            }

            @Override
            public Number fromString(String string) {
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


    public void InitializeFields(TextField kcalField, TextField perUnitField, TextField proteinField, TextField fatField, TextField carbohydrateField, TextField saturatedFatField, TextField polyunsaturatedFatField, TextField monounsaturatedFatField, TextField sugarField, TextField fiberField, ComboBox<UnitsEnum> unitField) {
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
            throw new IllegalArgumentException();
        }
    }


}
