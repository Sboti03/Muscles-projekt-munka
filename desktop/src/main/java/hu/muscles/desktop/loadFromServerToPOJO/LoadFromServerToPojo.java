package hu.muscles.desktop.loadFromServerToPOJO;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.muscles.desktop.foodsData.Foods;
import hu.muscles.desktop.profileData.ProfileResponse;
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


    // Return lists
    public List<Foods> loadAllFood(InputStream responseStream) {
        try {
            return foodConverterToPOJO((new String(responseStream.readAllBytes(), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public List<ProfileResponse> loadAllProfile(InputStream responseStream) {
        try {
            return profileConverterToPOJO((new String(responseStream.readAllBytes(), StandardCharsets.UTF_8)));
        } catch (IOException e) {
            edit.getItems().clear();
            edit.getItems().add(e.getMessage());
            e.printStackTrace();
            return null;
        }
    }


    // POJO Converters
    private List<Foods> foodConverterToPOJO(String response) {
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

    private List<ProfileResponse> profileConverterToPOJO(String response) {
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
