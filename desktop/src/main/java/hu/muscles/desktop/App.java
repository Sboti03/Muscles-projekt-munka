package hu.muscles.desktop;

import hu.muscles.desktop.controllers.LoginController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.input.KeyCombination;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.IOException;
import java.util.Objects;

public class App extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("login-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1080, 1920);
        stage.setTitle("Login");
        stage.getIcons().add(new Image(Objects.requireNonNull(getClass().getResourceAsStream("/hu/muscles/desktop/style/backgrounds/icon.png"))));
        stage.setScene(scene);
        setNewWindow(scene, stage);
    }

    public void setNewWindow(Scene scene, Stage stage) {
        stage.setMaximized(true);
        stage.setResizable(false);
        stage.setFullScreenExitHint("");
        stage.setFullScreenExitKeyCombination(KeyCombination.NO_MATCH);
        stage.fullScreenProperty();
        stage.initStyle(StageStyle.TRANSPARENT);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}