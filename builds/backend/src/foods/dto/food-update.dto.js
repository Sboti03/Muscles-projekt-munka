"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const food_create_dto_1 = require("./food-create.dto");
class FoodUpdateDto extends (0, swagger_1.PartialType)(food_create_dto_1.FoodCreateDto) {
}
exports.FoodUpdateDto = FoodUpdateDto;
//# sourceMappingURL=food-update.dto.js.map