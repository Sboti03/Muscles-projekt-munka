package hu.muscles.desktop.mainContentLoad.loadFromServerToPOJO;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.responses.foodResponse.Food;
import hu.muscles.desktop.responses.profileResponse.Profile;
import javafx.scene.control.ListView;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class LoadFromServerToPojo {


    private final ListView<String> edit;

    public LoadFromServerToPojo(ListView<String> edit) {
        this.edit = edit;
    }


    public List<Food> loadAllFood(InputStream responseStream) {
        try {
            return foodConverterToPOJO((new String(responseStream.readAllBytes(), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public List<Profile> loadAllProfile(InputStream responseStream) {
        try {
            return profileConverterToPOJO((new String(responseStream.readAllBytes(), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private List<Food> foodConverterToPOJO(String response) {
        try {
            ObjectMapper om = new ObjectMapper();
            return om.readValue(response, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            return null;
        }
    }

    private List<Profile> profileConverterToPOJO(String response) {
        try {
            ObjectMapper om = new ObjectMapper();
            return om.readValue(response, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            return null;
        }
    }
}
