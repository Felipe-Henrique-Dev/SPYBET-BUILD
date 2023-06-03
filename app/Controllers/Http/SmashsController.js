"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
class SmashsController {
    async smash({ auth, session, response }) {
        let user = auth.user;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return response.redirect('/smash/crash/' + userId);
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
    async crash({ view, auth, response, session }) {
        const userId = Number(auth.user.id) + 122930000000;
        let user = auth.user;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return view.render('smash-tabela-crash', { userId });
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
    async double({ view, auth, response, session }) {
        const userId = Number(auth.user.id) + 122930000000;
        let user = auth.user;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return view.render('smash-tabela-double', { userId });
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
}
exports.default = SmashsController;
//# sourceMappingURL=SmashsController.js.map