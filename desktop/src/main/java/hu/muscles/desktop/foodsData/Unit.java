package hu.muscles.desktop.foodsData;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Unit {
    private int unitId;
    private String unit;
    private int defaultValue;
    private Date changedAt;

    public Unit(int unitId, String unit, int defaultValue, Date changedAt) {
        this.unitId = unitId;
        this.unit = unit;
        this.defaultValue = defaultValue;
        this.changedAt = changedAt;
    }

    public Unit(String unit, int defaultValue, Date changedAt) {
        this.unit = unit;
        this.defaultValue = defaultValue;
        this.changedAt = changedAt;
    }

    @JsonProperty("unitId")
    public int getUnitId() {
        return unitId;
    }

    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }

    public Unit() {
    }

    @JsonProperty("unit")
    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @JsonProperty("defaultValue")
    public int getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(int defaultValue) {
        this.defaultValue = defaultValue;
    }

    @JsonProperty("changedAt")
    public Date getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Date changedAt) {
        this.changedAt = changedAt;
    }

    @Override
    public String toString() {
        return "Unit{" +
                "unitId=" + unitId +
                ", unit='" + unit + '\'' +
                ", defaultValue=" + defaultValue +
                ", changedAt=" + changedAt +
                '}';
    }
}