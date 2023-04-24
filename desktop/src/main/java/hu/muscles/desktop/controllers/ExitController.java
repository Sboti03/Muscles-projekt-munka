package hu.muscles.desktop.controllers;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.stage.Stage;


public class ExitController {

    @FXML
    private Button cancelButton;
    @FXML
    private Button confirmButton;

    private static boolean exit;

    @FXML
    public void cancelClick(ActionEvent actionEvent) {
        exit = false;
        Stage stage = (Stage) cancelButton.getScene().getWindow();
        stage.close();
    }

    @FXML
    public void confirmClick(ActionEvent actionEvent) {
        exit = true;
        Stage stage = (Stage) confirmButton.getScene().getWindow();
        stage.close();
    }

    protected static boolean getExitStatus() {
        return exit;
    }
}
