"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
class PasswordResetRequested extends Mail_1.BaseMailer {
    constructor(user, token) {
        super();
        this.user = user;
        this.token = token;
    }
    prepare(message) {
        message
            .subject('SPYBET - Recuperação de senha')
            .from('suporte@spybet.com.br')
            .to(this.user.email)
            .htmlView('emails/password-reset-requested', { user: this.user, token: this.token });
    }
}
exports.default = PasswordResetRequested;
//# sourceMappingURL=PasswordResetRequested.js.map