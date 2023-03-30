import { ValidationOptions, ValidateIf } from 'class-validator';
export function IsUndefinable(validationOptions?: ValidationOptions) {
    return ValidateIf((_object, value) => value !== undefined, validationOptions);
}

export function IsNullable(validationOptions?: ValidationOptions) {
    return ValidateIf((_object, value) => value !== null, validationOptions);
}