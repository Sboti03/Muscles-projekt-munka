package hu.muscles.desktop.exitFromApp;

import hu.muscles.desktop.App;
import hu.muscles.desktop.informUser.InformUser;
import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.TextArea;
import javafx.scene.image.Image;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.IOException;
import java.util.Objects;

import static hu.muscles.desktop.controllers.ExitController.getExitStatus;

public class ExitFromApp {
    public ExitFromApp(VBox mainScene, TextArea messageToUser) {
        Platform.runLater(() -> mainScene.setDisable(true));
        try {
            FXMLLoader loadExitConfirmation = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/exitResources/exit-view.fxml"));
            Scene scene = new Scene(loadExitConfirmation.load(), 366, 174);
            Stage stage = new Stage();
            stage.setScene(scene);
            stage.setResizable(false);
            stage.setTitle("Confirm Exit");
            stage.setAlwaysOnTop(true);
            stage.initStyle(StageStyle.UTILITY);
            stage.alwaysOnTopProperty();
            stage.getIcons().add(new Image(Objects.requireNonNull(getClass().getResourceAsStream("/hu/muscles/desktop/backgroundResources/question.png"))));
            stage.showAndWait();
            if (getExitStatus()) {
                Platform.exit();
            } else {
                mainScene.setDisable(false);
            }
        } catch (IOException e) {
            InformUser informUser = new InformUser();
            informUser.setTextThenEmpty(messageToUser, "Couldn't open exit confirmation window, please use Alt+F4 to exit", "#ef1400", 3);
        }
    }
}
