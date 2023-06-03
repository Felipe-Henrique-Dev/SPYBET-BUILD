"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class PasswordResetValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            token: Validator_1.schema.string(),
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.exists({ table: 'users', column: 'email' }),
            ]),
            password: Validator_1.schema.string({}, [Validator_1.rules.confirmed('password_confirmation')]),
        });
        this.messages = {};
    }
}
exports.default = PasswordResetValidator;
//# sourceMappingURL=PasswordResetValidator.js.map