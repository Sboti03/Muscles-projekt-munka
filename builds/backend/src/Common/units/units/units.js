"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = exports.UnitsEnum = void 0;
var UnitsEnum;
(function (UnitsEnum) {
    UnitsEnum["GRAM"] = "gram";
    UnitsEnum["LITER"] = "liter";
    UnitsEnum["DECILITER"] = "deciliter";
    UnitsEnum["MILLILITERS"] = "milliliters";
})(UnitsEnum = exports.UnitsEnum || (exports.UnitsEnum = {}));
exports.Units = [
    { unit: UnitsEnum.GRAM, defaultValue: 100, unitId: 0 },
    { unit: UnitsEnum.LITER, defaultValue: 1, unitId: 1 },
    { unit: UnitsEnum.DECILITER, defaultValue: 10, unitId: 2 },
    { unit: UnitsEnum.MILLILITERS, defaultValue: 100, unitId: 3 },
];
//# sourceMappingURL=units.js.map