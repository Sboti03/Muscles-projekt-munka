package hu.muscles.desktop.models;

import hu.muscles.desktop.profileData.Profiles;
import javafx.beans.binding.ObjectBinding;

public class ProfileModel extends ObjectBinding<Profiles> {
    private final Profiles profile;

    public ProfileModel(Profiles profile) {
        this.profile = profile;
    }


    public Profiles getProfile() {
        return profile;
    }

    @Override
    protected Profiles computeValue() {
        return profile;
    }
}
