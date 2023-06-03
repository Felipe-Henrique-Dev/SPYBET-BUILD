"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'admin_dashboards';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('nivelacesso').notNullable();
            table.string('codigodeacesso').notNullable().unique();
            table.string('verifycodigodeacesso').notNullable();
            table.string('email').notNullable().unique();
            table.string('cpf').notNullable().unique();
            table.string('ip').notNullable();
            table.string('emailspybet').notNullable();
            table.string('senhaspybet').notNullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1663113759137_admin_dashboards.js.map