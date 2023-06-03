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
class Estatistic extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Estatistic.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Estatistic.prototype, "resultado", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Estatistic.prototype, "data", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "win", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "lose", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Estatistic.prototype, "plataforma", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "entradas", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "pg", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "nm", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "cm", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "ld", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "pt", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "zs", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Estatistic.prototype, "xg", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Estatistic.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Estatistic.prototype, "updatedAt", void 0);
exports.default = Estatistic;
//# sourceMappingURL=Estatistic.js.map