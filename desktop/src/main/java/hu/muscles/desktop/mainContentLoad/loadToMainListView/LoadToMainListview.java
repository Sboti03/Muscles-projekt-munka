package hu.muscles.desktop.mainContentLoad.loadToMainListView;


import hu.muscles.desktop.responses.foodResponse.Food;
import hu.muscles.desktop.responses.profileResponse.Profile;
import hu.muscles.desktop.responses.userResponse.User;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.layout.Background;
import javafx.scene.paint.Color;
import javafx.scene.paint.Paint;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class LoadToMainListview {
    private final ListView<String> mainListView;


    public LoadToMainListview(ListView<String> mainListView) {
        this.mainListView = mainListView;
    }

    public void loadProfilesToListView(List<Profile> profiles, List<User> users) {
        mainListView.getItems().clear();
        List<Profile> sortedProfiles = profiles.stream().sorted(Comparator.comparingInt(Profile::getUserId)).collect(Collectors.toList());
        List<Profile> deletedProfiles = profiles.stream().filter(profile -> users.stream().anyMatch(user -> user.getUserId() == profile.getUserId() && user.isBlocked())).toList();
        deletedProfiles.forEach(profile -> profile.setFirstName("#BLOCKED#\t" + profile.getFirstName()));
        sortedProfiles.removeAll(deletedProfiles);
        sortedProfiles.addAll(deletedProfiles);
        mainListView.getItems().addAll(sortedProfiles.stream().map(profile -> profile.getUserId() + "\t" + profile.getFirstName() + " " + (profile.getLastName() != null ? profile.getLastName() : "")).toList());

        mainListView.setCellFactory(listView -> new ListCell<>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);
                if (empty || item == null) {
                    setText(null);
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                } else {
                    setText(item);
                    int index = getIndex();
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                    if (index >= 0 && index < profiles.size() && item.contains("#BLOCKED#")) {
                        setTextFill(Color.RED);
                    } else {
                        setTextFill(Color.WHITE);
                    }
                    if (index >= 0 && index < profiles.size()) {
                        if (!mainListView.getSelectionModel().isEmpty()) {
                            if (item.contains(mainListView.getSelectionModel().getSelectedItem())) {
                                setBackground(Background.fill(Paint.valueOf("#2b1354")));
                            }
                        }
                    }
                }
            }
        });
    }

    public void loadFoodsToListView(List<Food> foods) {
        mainListView.getItems().clear();
        List<Food> sortedFoods = foods.stream().sorted(Comparator.comparingInt(Food::getFoodId)).collect(Collectors.toList());
        List<Food> deletedFoods = sortedFoods.stream().filter(Food::isDeleted).toList();
        deletedFoods.forEach(food -> food.setName("#DELETED#\t" + food.getName()));
        sortedFoods.removeAll(deletedFoods);
        sortedFoods.addAll(deletedFoods);
        mainListView.getItems().addAll(sortedFoods.stream().map(food -> food.getFoodId() + "\t" + food.getName()).toList());

        mainListView.setCellFactory(listView -> new ListCell<>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);
                if (empty || item == null) {
                    setText(null);
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                } else {
                    setText(item);
                    setBackground(Background.fill(Paint.valueOf("#1F0449B0")));
                    int index = getIndex();
                    if (index >= 0 && index < foods.size() && item.contains("#DELETED#")) {
                        setTextFill(Color.RED);
                    } else {
                        setTextFill(Color.WHITE);
                    }
                    if (index >= 0 && index < foods.size()) {
                        if (!mainListView.getSelectionModel().isEmpty()) {
                            if (item.contains(mainListView.getSelectionModel().getSelectedItem())) {
                                setBackground(Background.fill(Paint.valueOf("#2b1354")));
                            }
                        }
                    }
                }
            }
        });
    }


}
