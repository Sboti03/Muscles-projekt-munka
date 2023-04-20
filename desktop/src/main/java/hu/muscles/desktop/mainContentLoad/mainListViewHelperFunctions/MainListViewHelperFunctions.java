package hu.muscles.desktop.mainContentLoad.mainListViewHelperFunctions;

import com.jfoenix.controls.JFXTextArea;
import hu.muscles.desktop.informUser.InformUser;
import javafx.scene.control.Button;
import javafx.scene.control.ListView;
import javafx.scene.layout.VBox;

public class MainListViewHelperFunctions {
    private final InformUser informUser = new InformUser();

    public MainListViewHelperFunctions() {
    }

    public int getCurrentSelectedItemIndex(ListView<String> mainListView) {
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

    public void couldNotLoadFoodOrProfilesTextSetter(JFXTextArea messageTextArea, boolean isProfile, Exception e) {
        if (isProfile) {
            informUser.setTextThenEmpty(messageTextArea, "Couldn't read profiles. -> " + informUser.messageFromError(e), "#ef1400", 3);
        } else {
            informUser.setTextThenEmpty(messageTextArea, "Couldn't read foods. -> " + informUser.messageFromError(e), "#ef1400", 3);
        }
    }

    public void changeButtonsBetweenProfileAndFood(boolean isProfile, Button undeleteBtn, Button loadCreateBtn, Button deleteBtn, Button blockButton, Button unblockButton, VBox editVbox, VBox showDataVbox) {
        if (isProfile) {
            undeleteBtn.setVisible(false);
            undeleteBtn.setManaged(false);
            loadCreateBtn.setVisible(false);
            loadCreateBtn.setManaged(false);
            editVbox.setVisible(false);
            editVbox.setManaged(false);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(true);
            deleteBtn.setVisible(false);
            deleteBtn.setManaged(false);
            blockButton.setVisible(true);
            blockButton.setManaged(true);
            unblockButton.setVisible(true);
            unblockButton.setManaged(true);
        } else {
            blockButton.setVisible(false);
            blockButton.setManaged(false);
            unblockButton.setVisible(false);
            unblockButton.setManaged(false);
            undeleteBtn.setVisible(true);
            loadCreateBtn.setVisible(true);
            undeleteBtn.setManaged(true);
            loadCreateBtn.setManaged(true);
            editVbox.setVisible(false);
            editVbox.setManaged(true);
            showDataVbox.setVisible(false);
            showDataVbox.setManaged(false);
            deleteBtn.setVisible(true);
            deleteBtn.setManaged(true);
        }
    }

}
