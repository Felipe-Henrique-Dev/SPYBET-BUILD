"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
class BetbrysController {
    async betbry({ auth, session, response }) {
        const user = await auth.user;
        try {
            if (user?.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar!' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return response.redirect('/betbry/crash/' + userId);
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
    async crash({ view, auth, response, session }) {
        const userId = Number(auth.user.id) + 122930000000;
        const user = await auth.user;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar!!' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return view.render('betbry-tabela-crash', { userId });
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
    async double({ view, auth, response, session }) {
        const user = await auth.user;
        const userId = Number(auth.user.id) + 122930000000;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar!!!' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return view.render('betbry-tabela-double', { userId });
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
    async fruit({ view, auth, response, session }) {
        const user = await auth.user;
        const userId = Number(auth.user.id) + 122930000000;
        try {
            if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
                session.flash({ error: 'Seu plano expirou,faça login para renovar!!!' });
                return response.redirect('/auth/login');
            }
            const userId = Number(auth.user.id) + 122930000000;
            return view.render('betbry-tabela-fruit', { userId });
        }
        catch (err) {
            console.log('erro voltou ao login');
            return response.redirect('/auth/login');
        }
    }
}
exports.default = BetbrysController;
//# sourceMappingURL=BetbrysController.js.map