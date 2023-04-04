package hu.muscles.desktop.listViewShowAndHideFunctions;

import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.profileData.Profiles;
import javafx.scene.control.ListCell;
import javafx.scene.control.ListView;
import javafx.scene.control.TextArea;
import javafx.scene.paint.Color;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ListViewFunctionsForMain {
    private final ListView<String> mainListView;
    private final TextArea messageTextArea;


    public ListViewFunctionsForMain(ListView<String> mainListView, TextArea messageTextArea) {
        this.mainListView = mainListView;
        this.messageTextArea = messageTextArea;
    }

    public void CouldNotLoadFoodOrProfiles(boolean isProfile, Exception e) {
        if (isProfile) {
            messageTextArea.clear();
            messageTextArea.setText("Couldn't read profiles. -> " + e.getMessage());
            e.printStackTrace();
        } else {
            messageTextArea.clear();
            messageTextArea.setText("Couldn't read foods. -> " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void emptyAllText() {
        messageTextArea.clear();
        mainListView.getItems().clear();
    }

    public void loadProfilesToListView(List<Profiles> profiles) {
        emptyAllText();
        mainListView.getItems().addAll(profiles.stream().map(profile -> profile.getUserId() +"\t"+ profile.getFirstName() + " " + (profile.getLastName() != null ? profile.getLastName() : "")).toList());
    }

    public void loadFoodsToListView(List<Foods> foods) {
        emptyAllText();
        List<Foods> sortedFoods = foods.stream().sorted(Comparator.comparingInt(Foods::getFoodId)).collect(Collectors.toList());
        List<Foods> deletedFoods = sortedFoods.stream().filter(Foods::isDeleted).toList();
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
                } else {
                    setText(item);

                    int index = getIndex();
                    if (index >= 0 && index < foods.size() && item.contains("#DELETED#")) {
                        setTextFill(Color.RED);
                    } else {
                        setTextFill(Color.BLACK);
                    }
                }
            }
        });
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
