"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminDashboard_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AdminDashboard"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class DashboardController {
    async login({ view }) {
        return view.render('dashboard/dashboardLogin');
    }
    async loginPost({ request, auth, response, session }) {
        const email = request.input('email');
        const password = request.input('password');
        const ip = request.input('ip');
        const codigoDeAcesso = request.input('codigoDeAcesso');
        try {
            const user = await User_1.default.findByOrFail('email', email);
            const userDash = await AdminDashboard_1.default.findByOrFail('email', email);
            if (userDash.codigodeacesso === codigoDeAcesso) {
                userDash.verifycodigodeacesso = 'Confirmado';
                userDash.ip = ip;
                await userDash.save();
            }
            if (userDash.verifycodigodeacesso != 'Confirmado') {
                session.flash({ error: 'Código de acesso inválido!' });
                return response.redirect('/dashboard/admin/auth/login');
            }
            try {
                await auth.attempt(email, password);
                return response.redirect('/dashboard/admin/auth/main');
            }
            catch (error) {
                session.flash({ error: 'Email ou senha inválidos!' });
                return response.redirect('/dashboard/admin/auth/login');
            }
        }
        catch (error) {
            session.flash({ error: 'Você não tem permissão para acessar o painel de administração!' });
            return response.redirect().back();
        }
    }
    async main({ view, auth }) {
        let nome = auth.user.name;
        let nivelacesso = await (await AdminDashboard_1.default.findByOrFail('email', auth.user.email)).nivelacesso;
        let userstotal = (await User_1.default.all()).length;
        let usersplanofree = (await User_1.default.query().where('nameToken', 'Free session')).length;
        let usersplanotrimestral = (await User_1.default.query().where('nameToken', 'trimestral')).length;
        let usersplanobimestral = (await User_1.default.query().where('nameToken', 'bimestral')).length;
        let usersplanomensal = (await User_1.default.query().where('nameToken', 'mensal')).length;
        return view.render('dashboard/dashboardMain', {
            userstotal,
            usersplanofree,
            usersplanotrimestral,
            usersplanobimestral,
            usersplanomensal,
            nome,
            nivelacesso
        });
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map