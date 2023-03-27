package hu.muscles.desktop.foodsData;

import org.springframework.lang.Nullable;

public class FoodsUpdate {

    @Nullable
    private String name;

    @Nullable
    private Double kcal;

    @Nullable
    private UnitsEnum unit;

    @Nullable
    private Double perUnit;

    @Nullable
    private Double protein;

    @Nullable
    private Double fat;

    @Nullable
    private Double saturatedFat;

    @Nullable
    private Double polyunsaturatedFat;

    @Nullable
    private Double monounsaturatedFat;

    @Nullable
    private Double carbohydrate;

    @Nullable
    private Double sugar;

    @Nullable
    private Double fiber;

    public FoodsUpdate() {
    }

    public FoodsUpdate(@Nullable String name, @Nullable Double kcal, @Nullable UnitsEnum unit, @Nullable Double perUnit, @Nullable Double protein, @Nullable Double fat, @Nullable Double saturatedFat, @Nullable Double polyunsaturatedFat, @Nullable Double monounsaturatedFat, @Nullable Double carbohydrate, @Nullable Double sugar, @Nullable Double fiber) {
        this.name = name;
        this.kcal = kcal;
        this.unit = unit;
        this.perUnit = perUnit;
        this.protein = protein;
        this.fat = fat;
        this.saturatedFat = saturatedFat;
        this.polyunsaturatedFat = polyunsaturatedFat;
        this.monounsaturatedFat = monounsaturatedFat;
        this.carbohydrate = carbohydrate;
        this.sugar = sugar;
        this.fiber = fiber;
    }

    @Nullable
    public String getName() {
        return name;
    }

    public void setName(@Nullable String name) {
        this.name = name;
    }

    @Nullable
    public Double getKcal() {
        return kcal;
    }

    public void setKcal(@Nullable Double kcal) {
        this.kcal = kcal;
    }

    @Nullable
    public UnitsEnum getUnit() {
        return unit;
    }

    public void setUnit(@Nullable UnitsEnum unit) {
        this.unit = unit;
    }

    @Nullable
    public Double getPerUnit() {
        return perUnit;
    }

    public void setPerUnit(@Nullable Double perUnit) {
        this.perUnit = perUnit;
    }

    @Nullable
    public Double getProtein() {
        return protein;
    }

    public void setProtein(@Nullable Double protein) {
        this.protein = protein;
    }

    @Nullable
    public Double getFat() {
        return fat;
    }

    public void setFat(@Nullable Double fat) {
        this.fat = fat;
    }

    @Nullable
    public Double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(@Nullable Double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    @Nullable
    public Double getPolyunsaturatedFat() {
        return polyunsaturatedFat;
    }

    public void setPolyunsaturatedFat(@Nullable Double polyunsaturatedFat) {
        this.polyunsaturatedFat = polyunsaturatedFat;
    }

    @Nullable
    public Double getMonounsaturatedFat() {
        return monounsaturatedFat;
    }

    public void setMonounsaturatedFat(@Nullable Double monounsaturatedFat) {
        this.monounsaturatedFat = monounsaturatedFat;
    }

    @Nullable
    public Double getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(@Nullable Double carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    @Nullable
    public Double getSugar() {
        return sugar;
    }

    public void setSugar(@Nullable Double sugar) {
        this.sugar = sugar;
    }

    @Nullable
    public Double getFiber() {
        return fiber;
    }

    public void setFiber(@Nullable Double fiber) {
        this.fiber = fiber;
    }
}
