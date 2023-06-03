"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
const EmailValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/EmailValidator"));
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));
class EmailVerificationController {
    async verify({ request, params, response, session }) {
        if (!request.hasValidSignature()) {
            session.flash({
                alert: {
                    type: 'error',
                    message: 'Link inválido ou expirado.',
                },
            });
            return response.redirect('/verification/new');
        }
        const user = await User_1.default.findByOrFail('email', params.email);
        if (user.emailVerifiedAt) {
            session.flash({
                alert: {
                    type: 'info',
                    message: 'Email já verificado.',
                },
            });
            return response.redirect('/auth/login');
        }
        user.emailVerifiedAt = luxon_1.DateTime.now();
        await user.save();
        session.flash({
            alert: {
                type: 'success',
                message: `Otimo ${user.name}! Seu E-mail foi verificado com sucesso.`,
            },
        });
        return response.redirect('/auth/login');
    }
    async create({ view }) {
        return view.render('emails/resend-verification');
    }
    async store({ request, response, session }) {
        const { email } = await request.validate(EmailValidator_1.default);
        const user = await User_1.default.findByOrFail('email', email);
        if (user?.emailVerifiedAt) {
            session.flash({
                alert: {
                    type: 'info',
                    message: 'Email já verificado.',
                },
            });
            return response.redirect('/auth/login');
        }
        Event_1.default.emit('userRegister', user);
        session.flash({
            alert: {
                type: 'success',
                message: `Um e-mail de verificação foi enviado para ${user.email}.`,
            },
        });
        return response.redirect('/auth/login');
    }
}
exports.default = EmailVerificationController;
//# sourceMappingURL=EmailVerificationController.js.map