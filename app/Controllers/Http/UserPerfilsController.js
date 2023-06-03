"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const luxon_1 = require("luxon");
class UserPerfilsController {
    async userPerfils({ view, auth, session, response }) {
        const user = await auth.user;
        if (user?.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        let diasRestantes = Math.round((user.expires_at - new Date()) / (1000 * 3600 * 24));
        return view.render('userPerfils', { dias: diasRestantes });
    }
    async update({ request, response, auth }) {
        const user = await User_1.default.query().where('id', auth.user.id).first();
        const { name, sobrenome, email, password, telefone, } = request.all();
        if (password) {
            user.password = password;
        }
        user.name = name;
        user.sobrenome = sobrenome;
        user.email = email;
        user.telefone = telefone;
        await user.save();
        return response.redirect('back');
    }
}
exports.default = UserPerfilsController;
//# sourceMappingURL=UserPerfilsController.js.map