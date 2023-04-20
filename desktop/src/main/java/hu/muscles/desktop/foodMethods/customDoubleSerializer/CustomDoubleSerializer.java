package hu.muscles.desktop.foodMethods.customDoubleSerializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class CustomDoubleSerializer extends StdSerializer<Double> {

    public CustomDoubleSerializer() {
        super(Double.class);
    }

    @Override
    public void serialize(Double value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        if (value == Math.floor(value)) {
            gen.writeNumber(String.format("%d", value.longValue()));
        } else {
            gen.writeNumber(value);
        }
    }
}
