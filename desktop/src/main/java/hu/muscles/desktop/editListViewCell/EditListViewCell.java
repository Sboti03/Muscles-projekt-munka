package hu.muscles.desktop.editListViewCell;

import javafx.scene.control.ListView;
import javafx.scene.control.cell.TextFieldListCell;
import javafx.util.StringConverter;

public class EditListViewCell {
    private ListView<String> mainList;

    public EditListViewCell(ListView<String> mainList) {
        this.mainList = mainList;
    }

    public void SetEditbaleList() {
        mainList.setEditable(true);
        mainList.setCellFactory(TextFieldListCell.forListView(new StringConverter<String>() {
            @Override
            public String toString(String object) {
                return object;
            }

            @Override
            public String fromString(String string) {
                return string;
            }
        }));

        mainList.setOnEditCommit(event ->
        {
            int index = event.getIndex();
            String newValue = event.getNewValue();
            mainList.getItems().set(index, newValue);
        });
    }
}