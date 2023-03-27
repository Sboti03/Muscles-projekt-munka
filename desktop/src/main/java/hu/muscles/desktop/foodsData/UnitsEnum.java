package hu.muscles.desktop.foodsData;

public enum UnitsEnum {
    GRAM("gram"),
    LITER("liter"),
    DECILITER("deciliter"),
    MILLILITERS("milliliters");

    private String value;

    UnitsEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
