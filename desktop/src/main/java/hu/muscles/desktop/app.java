package hu.muscles.desktop;

import hu.muscles.desktop.controllers.LoginController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.input.KeyCombination;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.IOException;

public class app extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(app.class.getResource("login-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1080, 1920);
        stage.setTitle("Login");
        stage.setScene(scene);
        LoginController.setNewWindow(scene, stage);
    }

    public static void main(String[] args) {
        launch();
    }
}