"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
class VerifyEmail extends Mail_1.BaseMailer {
    constructor(user) {
        super();
        this.user = user;
        this.signedUrl = Route_1.default.makeSignedUrl('EmailVerificationController.verify', {
            email: this.user.email,
        }, {
            expiresIn: '24h',
        });
    }
    prepare(message) {
        message
            .subject('SPYBET - Confirme seu email')
            .from('spybet-sistema@spybet.com.br')
            .to(this.user.email)
            .htmlView('emails/verify-email', { user: this.user, SignupUrl: this.signedUrl });
    }
}
exports.default = VerifyEmail;
//# sourceMappingURL=VerifyEmail.js.map