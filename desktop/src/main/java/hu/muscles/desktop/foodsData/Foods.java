package hu.muscles.desktop.foodsData;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Foods {

    private int foodId;

    private String name;
    private double kcal;
    private int unitId;
    private double perUnit;
    private double protein;
    private double fat;
    private double saturatedFat;
    private double polyunsaturatedFat;
    private double monounsaturatedFat;
    private double carbohydrate;
    private double sugar;
    private double fiber;
    private Date changedAt;
    private Unit unit;

    public Foods(int foodId, String name, int kcal, int unitId, int perUnit, double protein, double fat, double saturatedFat, double polyunsaturatedFat, double monounsaturatedFat, double carbohydrate, double sugar, double fiber, Date changedAt, Unit unit) {
        this.foodId = foodId;
        this.name = name;
        this.kcal = kcal;
        this.unitId = unitId;
        this.perUnit = perUnit;
        this.protein = protein;
        this.fat = fat;
        this.saturatedFat = saturatedFat;
        this.polyunsaturatedFat = polyunsaturatedFat;
        this.monounsaturatedFat = monounsaturatedFat;
        this.carbohydrate = carbohydrate;
        this.sugar = sugar;
        this.fiber = fiber;
        this.changedAt = changedAt;
        this.unit = unit;
    }

    public Foods(String name, int kcal, int unitId, int perUnit, double protein, double fat, double saturatedFat, double polyunsaturatedFat, double monounsaturatedFat, double carbohydrate, double sugar, double fiber, Date changedAt, Unit unit) {
        this.name = name;
        this.kcal = kcal;
        this.unitId = unitId;
        this.perUnit = perUnit;
        this.protein = protein;
        this.fat = fat;
        this.saturatedFat = saturatedFat;
        this.polyunsaturatedFat = polyunsaturatedFat;
        this.monounsaturatedFat = monounsaturatedFat;
        this.carbohydrate = carbohydrate;
        this.sugar = sugar;
        this.fiber = fiber;
        this.changedAt = changedAt;
        this.unit = unit;
    }

    public Foods() {
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("kcal")
    public double getKcal() {
        return kcal;
    }

    public void setKcal(int kcal) {
        this.kcal = kcal;
    }

    @JsonProperty("unitId")
    public int getUnitId() {
        return unitId;
    }

    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }

    @JsonProperty("perUnit")
    public double getPerUnit() {
        return perUnit;
    }

    public void setPerUnit(int perUnit) {
        this.perUnit = perUnit;
    }

    @JsonProperty("protein")
    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    @JsonProperty("fat")
    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    @JsonProperty("saturatedFat")
    public double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    @JsonProperty("polyunsaturatedFat")
    public double getPolyunsaturatedFat() {
        return polyunsaturatedFat;
    }

    public void setPolyunsaturatedFat(double polyunsaturatedFat) {
        this.polyunsaturatedFat = polyunsaturatedFat;
    }

    @JsonProperty("monounsaturatedFat")
    public double getMonounsaturatedFat() {
        return monounsaturatedFat;
    }

    public void setMonounsaturatedFat(double monounsaturatedFat) {
        this.monounsaturatedFat = monounsaturatedFat;
    }

    @JsonProperty("carbohydrate")
    public double getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(double carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    @JsonProperty("sugar")
    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    @JsonProperty("fiber")
    public double getFiber() {
        return fiber;
    }

    public void setFiber(double fiber) {
        this.fiber = fiber;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    @JsonProperty("unit")
    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    @JsonProperty("foodId")
    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Override
    public String toString() {
        return "Foods{" +
                "foodId=" + foodId +
                ", name='" + name + '\'' +
                ", kcal=" + kcal +
                ", unitId=" + unitId +
                ", perUnit=" + perUnit +
                ", protein=" + protein +
                ", fat=" + fat +
                ", saturatedFat=" + saturatedFat +
                ", polyunsaturatedFat=" + polyunsaturatedFat +
                ", monounsaturatedFat=" + monounsaturatedFat +
                ", carbohydrate=" + carbohydrate +
                ", sugar=" + sugar +
                ", fiber=" + fiber +
                ", changedAt=" + changedAt +
                ", unit=" + unit +
                '}';
    }
}