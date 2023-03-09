module hu.muscles.desktop {
    requires javafx.controls;
    requires javafx.fxml;
            
                            
    opens hu.muscles.desktop to javafx.fxml;
    exports hu.muscles.desktop;
}