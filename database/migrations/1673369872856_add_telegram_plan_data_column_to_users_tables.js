"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    up() {
        this.schema.alterTable('users', (table) => {
            table.string('telegram_plan_data').nullable();
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1673369872856_add_telegram_plan_data_column_to_users_tables.js.map