package hu.muscles.desktop.controllers;

import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.models.ProfileModel;
import hu.muscles.desktop.profileData.Profiles;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;

import java.net.URL;
import java.util.ResourceBundle;

public class ProfileInfoController implements Initializable {
    @FXML
    private ListView<String> dataLabelListView;
    @FXML
    private ListView<String> dataListView;
    @FXML
    private Button loadUserDataBtn;

    private LoginModel loginModel;
    private ProfileModel profileModel;
    private final String[] profileDataString = new String[]{"First name", "Last name", "Birthdate", "Registration date", "Height", "Gender", "Last changed"};


    @FXML
    public void loadUserDataClick(ActionEvent actionEvent) {

    }

    public void setProfileForProfileInfo(ProfileModel profileModel) {
        dataListView.getItems().clear();
        this.profileModel = profileModel;
        String[] tempArray = new String[]{setStringToEmptyIfItsNull(profileModel.getProfile().getFirstName()), setStringToEmptyIfItsNull(profileModel.getProfile().getLastName()), setStringToEmptyIfItsNull(profileModel.getProfile().getBirthDay()), setStringToEmptyIfItsNull(profileModel.getProfile().getRegistrationDate()), setStringToEmptyIfItsNull(profileModel.getProfile().getHeight()), setStringToEmptyIfItsNull(profileModel.getProfile().getChangedAt())};
        dataListView.getItems().addAll(tempArray);
    }

    public void setLoginModelForProfileInfo(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        dataLabelListView.getItems().addAll(profileDataString);
    }

    public <T> String setStringToEmptyIfItsNull(T val) {
        if (val == null) {
            return "";
        }
        return val.toString();
    }
}
