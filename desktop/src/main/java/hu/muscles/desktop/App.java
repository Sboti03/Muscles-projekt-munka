package hu.muscles.desktop;

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
        FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource("/hu/muscles/desktop/loginResources/login-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 1080, 1920);
        stage.setTitle("Muscles Admin App");
        stage.getIcons().add(new Image(Objects.requireNonNull(getClass().getResourceAsStream("/hu/muscles/desktop/backgroundResources/icon.png"))));
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