package hu.muscles.desktop.models;

import hu.muscles.desktop.profileData.Profiles;
import hu.muscles.desktop.userData.User;
import javafx.beans.binding.ObjectBinding;

public class UserModel extends ObjectBinding<User> {
    private final User user;

    public UserModel(User user) {
        this.user = user;
    }


    public User getUser() {
        return user;
    }

    @Override
    protected User computeValue() {
        return user;
    }
}
