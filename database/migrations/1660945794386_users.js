"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UsersSchema extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('sobrenome').notNullable();
            table.string('password').notNullable();
            table.string('data_nascimento').notNullable();
            table.string('email').notNullable().unique();
            table.string('telefone').notNullable();
            table.string('cpf').nullable();
            table.timestamp('email_verified_at').nullable();
            table.string('name_token').nullable();
            table.string('remember_me_token').nullable();
            table.timestamp('expires_at', { useTz: true }).nullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UsersSchema;
//# sourceMappingURL=1660945794386_users.js.map