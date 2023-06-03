"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'add_entradas_pt_to_estatistics_tables';
    }
    async up() {
        this.schema.alterTable('estatistics', (table) => {
            table.integer('pt').nullable();
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=1679679628300_add_entradas_pt_to_estatistics_tables.js.map