"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Af2l1p3eAso3a532x1nib extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Af2l1p3eAso3a532x1nib.prototype, "linkafiliado", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "carteira", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "afiliacaototal", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "afiliacaotrimestral", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "afiliacaobimestral", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "afiliacaomensal", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Af2l1p3eAso3a532x1nib.prototype, "cpf", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Af2l1p3eAso3a532x1nib.prototype, "tipochavepix", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Af2l1p3eAso3a532x1nib.prototype, "chavepix", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Af2l1p3eAso3a532x1nib.prototype, "banco", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Af2l1p3eAso3a532x1nib.prototype, "nometitular", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Af2l1p3eAso3a532x1nib.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Af2l1p3eAso3a532x1nib.prototype, "updatedAt", void 0);
exports.default = Af2l1p3eAso3a532x1nib;
//# sourceMappingURL=Af2l1p3eAso3a532x1nib.js.map