"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'af2l1p3e_aso3a532x1nibs';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
            table.string('linkafiliado').nullable().unique();
            table.integer('carteira').nullable();
            table.integer('afiliacaototal').nullable();
            table.integer('afiliacaotrimestral').nullable();
            table.integer('afiliacaobimestral').nullable();
            table.integer('afiliacaomensal').nullable();
            table.integer('cpf').nullable().unique();
            table.string('tipochavepix').nullable();
            table.string('chavepix').nullable();
            table.string('banco').nullable();
            table.string('nometitular').nullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1670373922570_af2l1p3e_aso3a532x1nibs.js.map