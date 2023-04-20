package hu.muscles.desktop.models;

import hu.muscles.desktop.responses.foodResponse.Food;
import javafx.beans.binding.ObjectBinding;

public class FoodModel extends ObjectBinding<Food> {
    private final Food food;

    public FoodModel(Food food) {
        this.food = food;
    }


    public Food getFood() {
        return food;
    }

    @Override
    protected Food computeValue() {
        return food;
    }
}
