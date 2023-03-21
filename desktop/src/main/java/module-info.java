module hu.muscles.desktop {
    requires javafx.controls;
    requires javafx.fxml;
    requires spring.web;
    requires spring.core;
    requires com.fasterxml.jackson.databind;


    opens hu.muscles.desktop to javafx.fxml;
    opens hu.muscles.desktop.loginData to com.fasterxml.jackson.databind;
    exports hu.muscles.desktop;
    exports hu.muscles.desktop.controllers;
    opens hu.muscles.desktop.controllers to javafx.fxml;
    exports hu.muscles.desktop.urls;
    opens hu.muscles.desktop.urls to javafx.fxml;
    exports hu.muscles.desktop.models;
    exports hu.muscles.desktop.loginData;
    exports hu.muscles.desktop.foodsData;
    opens hu.muscles.desktop.foodsData to com.fasterxml.jackson.databind;
    opens hu.muscles.desktop.profileData to com.fasterxml.jackson.databind;
}