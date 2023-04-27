"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNullable = exports.IsUndefinable = void 0;
const class_validator_1 = require("class-validator");
function IsUndefinable(validationOptions) {
    return (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined, validationOptions);
}
exports.IsUndefinable = IsUndefinable;
function IsNullable(validationOptions) {
    return (0, class_validator_1.ValidateIf)((_object, value) => value !== null, validationOptions);
}
exports.IsNullable = IsNullable;
//# sourceMappingURL=IsNullable.validation.js.map