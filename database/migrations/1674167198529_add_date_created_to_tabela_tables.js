"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    up() {
        this.schema.alterTable('tabelas', (table) => {
            table.string('datacriacao').nullable();
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1674167198529_add_date_created_to_tabela_tables.js.map