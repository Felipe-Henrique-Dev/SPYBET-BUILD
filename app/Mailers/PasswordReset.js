"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
class PasswordReset extends Mail_1.BaseMailer {
    constructor(user) {
        super();
        this.user = user;
    }
    prepare(message) {
        message
            .subject('SPYBET - atualização de senha')
            .from('suporte@spybet.com.br')
            .to(this.user.email)
            .htmlView('emails/password-reset', { user: this.user });
    }
}
exports.default = PasswordReset;
//# sourceMappingURL=PasswordReset.js.map