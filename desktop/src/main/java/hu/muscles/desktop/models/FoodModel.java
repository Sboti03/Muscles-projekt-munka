package hu.muscles.desktop.models;

import hu.muscles.desktop.foodsData.Foods;
import javafx.beans.binding.ObjectBinding;

public class FoodModel extends ObjectBinding<Foods> {
    private final Foods food;

    public FoodModel(Foods foods) {
        food = foods;
    }


    public Foods getFood() {
        return food;
    }

    @Override
    protected Foods computeValue() {
        return food;
    }
}
