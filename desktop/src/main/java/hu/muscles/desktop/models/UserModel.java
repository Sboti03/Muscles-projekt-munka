package hu.muscles.desktop.models;

import hu.muscles.desktop.responses.userResponse.User;
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
