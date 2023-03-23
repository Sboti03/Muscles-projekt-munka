package hu.muscles.desktop.editListViewCell;

import javafx.beans.value.ObservableValue;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.util.Callback;

public class EditListViewCell {

    public EditListViewCell() {
    }

    public Callback<ListView<String>, ListCell<String>> createEditableCellFactory() {
        return listView -> {
            return new ListCell<>() {
                private TextField textField;

                @Override
                protected void updateItem(String item, boolean empty) {
                    super.updateItem(item, empty);
                    if (empty) {
                        setText(null);
                        setGraphic(null);
                    } else if (isEditing()) {
                        if (textField == null) {
                            textField = createTextField(item);
                        }
                        setText(null);
                        setGraphic(textField);
                    } else {
                        setText(item);
                        setGraphic(null);
                    }
                }

                private TextField createTextField(String initialText) {
                    TextField textField = new TextField(initialText);
                    textField.setOnAction(event -> {
                        commitEdit(textField.getText());
                    });
                    textField.focusedProperty().addListener((ObservableValue<? extends Boolean> observable, Boolean oldValue, Boolean newValue) -> {
                        if (!newValue) {
                            commitEdit(textField.getText());
                        }
                    });
                    return textField;
                }

                @Override
                public void startEdit() {
                    super.startEdit();
                    if (textField == null) {
                        textField = createTextField(getItem());
                    }
                    setText(null);
                    setGraphic(textField);
                }

                @Override
                public void cancelEdit() {
                    super.cancelEdit();
                    setText(getItem());
                    setGraphic(null);
                }

                @Override
                public void commitEdit(String newValue) {
                    super.commitEdit(newValue);
                    if (textField != null) {
                        textField.setText(newValue);
                    }
                }
            };
        };
    }
}