package hu.muscles.desktop.foodMethods.foodJsonDeserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import hu.muscles.desktop.responses.foodResponse.Food;
import hu.muscles.desktop.responses.foodResponse.Unit;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;

public class FoodJsonDeserializer extends StdDeserializer<Food> {
    public FoodJsonDeserializer() {
        this(null);
    }

    public FoodJsonDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Food deserialize(JsonParser jp, DeserializationContext context)
            throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        int foodId = node.get("foodId").asInt();
        String name = node.get("name").asText();
        double kcal = node.get("kcal").asDouble();
        int unitId = node.get("unitId").asInt();
        int perUnit = node.get("perUnit").asInt();
        double protein = node.get("protein").asDouble();
        double fat = node.get("fat").asDouble();
        double saturatedFat = node.get("saturatedFat").isNull() ? -1 : node.get("saturatedFat").asDouble();
        double polyunsaturatedFat = node.get("polyunsaturatedFat").isNull() ? -1 : node.get("polyunsaturatedFat").asDouble();
        double monounsaturatedFat = node.get("monounsaturatedFat").isNull() ? -1 : node.get("monounsaturatedFat").asDouble();
        double carbohydrate = node.get("carbohydrate").asDouble();
        double sugar = node.get("sugar").isNull() ? -1 : node.get("sugar").asDouble();
        double fiber = node.get("fiber").isNull() ? -1 : node.get("fiber").asDouble();
        boolean isDeleted = node.get("isDeleted").asBoolean();

        JsonNode unitNode = node.get("unit");
        int unitId2 = unitNode.get("unitId").asInt();
        String unitName = unitNode.get("unit").asText();
        int defaultValue = unitNode.get("defaultValue").asInt();
        String changedAtStr = unitNode.get("changedAt").asText();
        Date changedAt = Date.from(Instant.parse(changedAtStr));
        Unit unit = new Unit(unitId2, unitName, defaultValue, changedAt);

        return new Food(foodId, name, kcal, unitId, perUnit, protein, fat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, carbohydrate, sugar, fiber, isDeleted, unit);
    }
}
