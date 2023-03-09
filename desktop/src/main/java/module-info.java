module hu.muscles.desktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires spring.web;
    requires spring.core;
    requires com.fasterxml.jackson.databind;


    opens hu.muscles.desktop to javafx.fxml;
    opens hu.muscles.desktop.loginData to com.fasterxml.jackson.databind;
    exports hu.muscles.desktop;
}