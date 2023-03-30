package hu.muscles.desktop.listViewShowAndHideFunctions;

import hu.muscles.desktop.editListViewCell.EditListViewCell;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.profileData.ProfileResponse;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;

import java.util.List;

public class ListViewFunctionsForMain {
    private final ListView<String> mainListView;
    private final ListView<String> mainEditText;
    private final ListView<String> labelForData;


    public ListViewFunctionsForMain(ListView<String> mainListView, ListView<String> labelForData, ListView<String> mainEditText) {
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
        mainListView.getItems().addAll(foods.stream().map(food -> food.getFoodId() + "\t" + food.getName()).toList());

        mainListView.setCellFactory(listView -> new ListCell<String>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);

                if (empty || item == null) {
                    setText(null);
                    setStyle("");
                } else {
                    setText(item);

                    int index = getIndex();
                    if (index >= 0 && index < foods.size() && foods.get(index).isDeleted()) {
                        setStyle("-fx-text-fill: #d20e0e;");
                    } else {
                        setStyle("");
                    }
                }
            }
        });
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
                editListViewCell.SetEditbaleList();
                updateButtonArea.setVisible(true);
                mainListView.setCellFactory(listView -> new ListCell<>() {
                    @Override
                    protected void updateItem(String item, boolean empty) {
                        super.updateItem(item, empty);
                        if (empty || item == null) {
                            setText(null);
                        } else {
                            setText(item);
                            Foods food = foods.get(getIndex());
                            if (food.isDeleted()) {
                                setTextFill(Color.RED);
                            } else {
                                setTextFill(Color.BLACK);
                            }
                        }
                    }
                });
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

    public int getCurrentItemIndex(ListView<String> mainListView) {
        String selected = mainListView.getSelectionModel().getSelectedItem();
        if (selected != null && !selected.isEmpty()) {
            int tabPosition = selected.indexOf("\t");
            if (tabPosition > 0) {
                return Integer.parseInt(selected.substring(0, tabPosition));
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    }
}
