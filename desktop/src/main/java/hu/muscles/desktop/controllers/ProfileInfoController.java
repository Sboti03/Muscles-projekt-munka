package hu.muscles.desktop.controllers;

import hu.muscles.desktop.models.LoginModel;
import hu.muscles.desktop.models.ProfileModel;
import hu.muscles.desktop.models.UserModel;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.layout.Background;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
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
    private UserModel userModel;
    private ProfileModel profileModel;
    private final String[] profileDataString = new String[]{"First name", "Last name", "Email", "Birthdate", "Registration date", "Height", "Role", "Gender", "User last changed", "Profile last Changed"};

    public void setProfileForProfileInfo(ProfileModel profileModel, UserModel userModel) {
        dataListView.getItems().clear();
        this.profileModel = profileModel;
        this.userModel = userModel;
        String[] tempArray = new String[]{setStringToEmptyIfItsNull(profileModel.getProfile().getFirstName()), setStringToEmptyIfItsNull(profileModel.getProfile().getLastName()), setStringToEmptyIfItsNull(userModel.get().email), setStringToEmptyIfItsNull(profileModel.getProfile().getBirthDay()), setStringToEmptyIfItsNull(profileModel.getProfile().getRegistrationDate()), setStringToEmptyIfItsNull(profileModel.getProfile().getHeight()), setStringToEmptyIfItsNull(userModel.get().role.getRoleName()), (profileModel.getProfile().isMale() ? "Male" : "Female"), setStringToEmptyIfItsNull(userModel.get().changedAt), setStringToEmptyIfItsNull(profileModel.getProfile().getChangedAt())};
        dataListView.getItems().addAll(tempArray);
    }

    public void setLoginModelForProfileInfo(LoginModel loginModel) {
        this.loginModel = loginModel;
    }

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        dataLabelListView.getItems().addAll(profileDataString);
        setCellFactory(dataLabelListView);
        setCellFactory(dataListView);
    }

    public <T> String setStringToEmptyIfItsNull(T val) {
        if (val == null) {
            return "";
        }
        return val.toString();
    }

    private void setCellFactory(ListView<String> infoList) {
        infoList.setCellFactory(listView -> new ListCell<>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);
                if (empty || item == null) {
                    setText(null);
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                } else {
                    setText(item);
                    setTextFill(Color.WHITE);
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                }
            }
        });
    }
}
