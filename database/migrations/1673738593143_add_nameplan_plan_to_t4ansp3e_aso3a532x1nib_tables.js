"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    up() {
        this.schema.alterTable('t4ansp3e_aso3a532x1nibs', (table) => {
            table.string('nameplan').nullable();
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1673738593143_add_nameplan_plan_to_t4ansp3e_aso3a532x1nib_tables.js.map