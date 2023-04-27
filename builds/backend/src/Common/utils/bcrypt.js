"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareData = exports.encryptData = void 0;
const bcrypt = require("bcrypt");
function encryptData(data) {
    return bcrypt.hashSync(data, bcrypt.genSaltSync());
}
exports.encryptData = encryptData;
function compareData(data, hashed) {
    return bcrypt.compareSync(data, hashed);
}
exports.compareData = compareData;
//# sourceMappingURL=bcrypt.js.map