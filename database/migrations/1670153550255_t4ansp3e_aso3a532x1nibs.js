"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 't4ansp3e_aso3a532x1nibs';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
            table.integer('idtransacao').nullable();
            table.string('tipo').notNullable();
            table.string('status').notNullable();
            table.string('valor').nullable();
            table.string('metodotransacao').nullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1670153550255_t4ansp3e_aso3a532x1nibs.js.map