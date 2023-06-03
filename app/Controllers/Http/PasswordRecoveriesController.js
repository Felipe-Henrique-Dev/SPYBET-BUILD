"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/EmailValidator"));
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const PasswordResetToken_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PasswordResetToken"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Encryption_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Encryption"));
const PasswordResetValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/PasswordResetValidator"));
class PasswordRecoveriesController {
    async create({ view }) {
        return view.render('recuperar-senha');
    }
    async store({ request, response, session }) {
        const { email } = await request.validate(EmailValidator_1.default);
        if (!email) {
            session.flash({ error: 'E-mail não encontrado' });
            return response.redirect('back');
        }
        const user = await User_1.default.findByOrFail('email', email);
        await PasswordResetToken_1.default.query().where('user_id', user.id).delete();
        const { token } = await PasswordResetToken_1.default.create({
            userId: user.id,
            token: Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32)),
        });
        Event_1.default.emit('passwordResetRequested', { user, token });
        response.redirect('/auth/login');
        session.flash({
            alert: {
                type: 'success',
                message: `Um e-mail foi enviado para ${email} com as instruções para recuperar sua senha.`
            }
        });
    }
    async resetCreate({ params, view, session, response }) {
        try {
            const token = await PasswordResetToken_1.default.query().where('token', decodeURIComponent(params.token)).preload('user').firstOrFail();
            return view.render('reset-password', {
                token: token.token,
                email: token.user.email
            });
        }
        catch (error) {
            session.flash({ error: 'Token inválido' });
            return response.redirect('/auth/recuperar-senha');
        }
    }
    async resetStore({ request, response, session }) {
        const payload = await request.validate(PasswordResetValidator_1.default);
        try {
            const token = await PasswordResetToken_1.default.query().where('token', payload.token).preload('user').firstOrFail();
            const user = token.user;
            user.password = payload.password;
            await user.save();
            await token.delete();
            Event_1.default.emit('passwordReset', user);
            session.flash({
                alert: {
                    type: 'success',
                    message: 'Senha alterada com sucesso'
                }
            });
            return response.redirect('/auth/login');
        }
        catch (error) {
            session.flash({ error: 'Token inválido' });
            return response.redirect('/auth/recuperar-senha');
        }
    }
}
exports.default = PasswordRecoveriesController;
//# sourceMappingURL=PasswordRecoveriesController.js.map