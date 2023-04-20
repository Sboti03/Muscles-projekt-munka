package hu.muscles.desktop.responses.foodResponse;

public enum UnitsEnum {
    gram("gram"),
    liter("liter"),
    deciliter("deciliter"),
    milliliters("milliliters");

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
