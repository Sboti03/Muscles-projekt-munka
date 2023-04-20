package hu.muscles.desktop.responses.foodResponse;

public class FoodsCreateOrUpdate {

    private String name;

    private Double kcal;

    private UnitsEnum unit;

    private Double perUnit;

    private Double protein;

    private Double fat;

    private Double saturatedFat;

    private Double polyunsaturatedFat;

    private Double monounsaturatedFat;

    private Double carbohydrate;

    private Double sugar;

    private Double fiber;

    public FoodsCreateOrUpdate() {
    }

    public FoodsCreateOrUpdate(String name, Double kcal, UnitsEnum unit, Double perUnit, Double protein, Double fat, Double saturatedFat, Double polyunsaturatedFat, Double monounsaturatedFat, Double carbohydrate, Double sugar, Double fiber) {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getKcal() {
        return kcal;
    }

    public void setKcal(Double kcal) {
        this.kcal = kcal;
    }

    public UnitsEnum getUnit() {
        return unit;
    }

    public void setUnit(UnitsEnum unit) {
        this.unit = unit;
    }

    public Double getPerUnit() {
        return perUnit;
    }

    public void setPerUnit(Double perUnit) {
        this.perUnit = perUnit;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(Double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public Double getPolyunsaturatedFat() {
        return polyunsaturatedFat;
    }

    public void setPolyunsaturatedFat(Double polyunsaturatedFat) {
        this.polyunsaturatedFat = polyunsaturatedFat;
    }

    public Double getMonounsaturatedFat() {
        return monounsaturatedFat;
    }

    public void setMonounsaturatedFat(Double monounsaturatedFat) {
        this.monounsaturatedFat = monounsaturatedFat;
    }

    public Double getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(Double carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public Double getSugar() {
        return sugar;
    }

    public void setSugar(Double sugar) {
        this.sugar = sugar;
    }

    public Double getFiber() {
        return fiber;
    }

    public void setFiber(Double fiber) {
        this.fiber = fiber;
    }
}
