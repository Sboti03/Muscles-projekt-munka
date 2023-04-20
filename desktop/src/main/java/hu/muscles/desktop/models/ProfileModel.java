package hu.muscles.desktop.models;

import hu.muscles.desktop.responses.profileResponse.Profile;
import javafx.beans.binding.ObjectBinding;

public class ProfileModel extends ObjectBinding<Profile> {
    private final Profile profile;

    public ProfileModel(Profile profile) {
        this.profile = profile;
    }


    public Profile getProfile() {
        return profile;
    }

    @Override
    protected Profile computeValue() {
        return profile;
    }
}
