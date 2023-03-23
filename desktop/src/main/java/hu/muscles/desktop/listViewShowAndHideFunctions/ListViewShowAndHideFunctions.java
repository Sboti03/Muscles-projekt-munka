package hu.muscles.desktop.listViewShowAndHideFunctions;

import hu.muscles.desktop.editListViewCell.EditListViewCell;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.profileData.ProfileResponse;
import javafx.scene.control.ListView;
import javafx.scene.layout.HBox;

import java.util.List;

public class ListViewShowAndHideFunctions {
    private final ListView<String> mainListView;
    private final ListView<String> mainEditText;
    private final ListView<String> labelForData;


    public ListViewShowAndHideFunctions(ListView<String> mainListView, ListView<String> labelForData, ListView<String> mainEditText) {
        this.mainListView = mainListView;
        this.labelForData = labelForData;
        this.mainEditText = mainEditText;
    }

    public void CouldNotLoadFoodOrProfiles(boolean isProfile, Exception e) {
        if (isProfile) {
            mainEditText.getItems().clear();
            mainEditText.getItems().add(e.getMessage());
            labelForData.getItems().add("Couldn't read profiles.");
            e.printStackTrace();
        } else {
            mainEditText.getItems().clear();
            mainEditText.getItems().add(e.getMessage());
            labelForData.getItems().add("Couldn't read foods.");
            e.printStackTrace();
        }
    }

    public void emptyAllListView() {
        labelForData.getItems().clear();
        mainEditText.getItems().clear();
        mainListView.getItems().clear();
    }

    public void loadProfilesToListView(List<ProfileResponse> profiles) {
        emptyAllListView();
        mainListView.getItems().addAll(profiles.stream().map(profile -> profile.getFirstName() + " " + (profile.getLastName() != null ? profile.getLastName() : "")).toList());
    }

    public void loadFoodsToListView(List<Foods> foods) {
        emptyAllListView();
        mainListView.getItems().addAll(foods.stream().map(Foods::getName).toList());
    }


    public void listViewListener(List<Foods> foods, List<ProfileResponse> profiles, String[] updateFoodDataString, String[] profileDataString, boolean isProfileShown, boolean isFoodShown, EditListViewCell editListViewCell, HBox updateButtonArea) {
        labelForData.getItems().clear();
        updateButtonArea.setVisible(false);
        if (!isProfileShown && isFoodShown) {
            labelForData.getItems().addAll(updateFoodDataString);
            if (!mainListView.getSelectionModel().isEmpty()) {
                mainEditText.getItems().clear();
                mainEditText.getItems().addAll(String.valueOf(foods.get(mainListView.getSelectionModel().getSelectedIndex())).split("\n"));
                mainEditText.setEditable(true);
                mainEditText.setCellFactory(editListViewCell.createEditableCellFactory());
                updateButtonArea.setVisible(true);
            }
        }
        if (!isFoodShown && isProfileShown) {
            labelForData.getItems().addAll(profileDataString);
            if (!mainListView.getSelectionModel().isEmpty()) {
                mainEditText.getItems().clear();
                mainEditText.getItems().addAll(String.valueOf(profiles.get(mainListView.getSelectionModel().getSelectedIndex())).split("\n"));
                updateButtonArea.setVisible(true);
            }
        }
    }

}
