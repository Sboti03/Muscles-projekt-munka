package hu.muscles.desktop.informUser;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Platform;
import javafx.scene.control.TextArea;
import javafx.util.Duration;

public class InformUser {

    public InformUser() {
    }

    public void setTextThenEmpty(TextArea textArea, String text, String color, int seconds) {
        Platform.runLater(() -> {
            textArea.setStyle(String.format("-fx-text-fill: %s;", color));
            textArea.setText(text);
            Timeline timeline = new Timeline(new KeyFrame(Duration.seconds(seconds), event -> textArea.setText("")));
            timeline.play();
        });
    }

    public String messageFromError(Exception e) {
        String errorMessage = e.getMessage();
        if (errorMessage.contains("\"message\":\"") && errorMessage.contains("\",\"error\"")) {
            String error = errorMessage.substring(errorMessage.indexOf("\"message\":\"") + 11, errorMessage.indexOf("\",\"error\""));
            if (error.equals("Access Denied")) {
                return "Incorrect password";
            }
            return error;
        } else {
            if (errorMessage.contains("No route to host")) {
                return "Cannot connect to server";
            }
            return errorMessage;
        }
    }
}
