module hu.muscles.desktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires spring.web;
    requires spring.core;
    requires com.fasterxml.jackson.databind;
    requires org.controlsfx.controls;
    requires org.apache.httpcomponents.client5.httpclient5;
    requires org.apache.httpcomponents.core5.httpcore5;
    requires com.jfoenix;

    opens hu.muscles.desktop to javafx.fxml;
    opens hu.muscles.desktop.responses.loginResponse to com.fasterxml.jackson.databind;
    opens hu.muscles.desktop.responses.profileResponse to com.fasterxml.jackson.databind;
    opens hu.muscles.desktop.controllers to javafx.fxml;
    opens hu.muscles.desktop.urls to javafx.fxml;
    opens hu.muscles.desktop.responses.foodResponse to com.fasterxml.jackson.databind;
    opens hu.muscles.desktop.responses.userResponse to com.fasterxml.jackson.databind;
    exports hu.muscles.desktop.urls;
    exports hu.muscles.desktop;
    exports hu.muscles.desktop.controllers;
    exports hu.muscles.desktop.models;
    exports hu.muscles.desktop.responses.loginResponse;
    exports hu.muscles.desktop.responses.foodResponse;
    exports hu.muscles.desktop.responses.profileResponse;
    exports hu.muscles.desktop.responses.userResponse;
}