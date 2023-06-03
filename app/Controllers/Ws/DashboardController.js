"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const Tokensplataforma_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tokensplataforma"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const ConfirmPayment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ConfirmPayment"));
const AdminDashboard_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AdminDashboard"));
class DashboardController {
    async Dashboard() {
        Ws_1.default.io.on('connection', (Dashboard) => {
            Dashboard.on('buscar-email', (data) => {
                let email = data;
                if (email === ' ' || email === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha todos os campos!');
                }
                try {
                    buscarEmail();
                }
                catch (error) {
                    Dashboard.emit('receber-email-informações-msg', 'Email não encontrado!');
                }
                async function buscarEmail() {
                    let user = await User_1.default.findByOrFail('email', data);
                    Dashboard.emit('receber-email-informações', user);
                }
            });
            Dashboard.on('confirmar-pagamento', (data) => {
                let email = data.email;
                let plano = data.plano;
                if (plano === ' ' || plano === '' || email === ' ' || email === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha todos os campos!');
                }
                else {
                    confirmarPagamento(email, plano);
                }
                async function confirmarPagamento(email, plano) {
                    let user = await User_1.default.findByOrFail('email', email);
                    try {
                        let ordem = await (await ConfirmPayment_1.default.findByOrFail('user_id', user.id)).delete();
                        user.nameToken = plano;
                        user.rememberMeToken = "new";
                        await user.save();
                        Dashboard.emit('receber-email-informações-msg', 'Pagamento confirmado com sucesso!');
                    }
                    catch (error) {
                        user.nameToken = plano;
                        user.rememberMeToken = "new";
                        await user.save();
                        Dashboard.emit('receber-email-informações-msg', 'Pagamento confirmado! Sem ordem de pagamento!');
                    }
                }
            });
            Dashboard.on('buscar-email-funcionario', (data) => {
                let email = data;
                if (email === null || email === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha o email!');
                }
                buscarEmail();
                async function buscarEmail() {
                    let user = await User_1.default.findByOrFail('email', data);
                    Dashboard.emit('receber-email-informações-funcionario', user);
                }
            });
            Dashboard.on('adicionar-funcionario', (data) => {
                let email = data.email;
                let cpf = data.cpf;
                let niveldeacesso = data.niveldeacesso;
                let codigodeacesso = data.codigodeacesso;
                if (email === null || email === '' || cpf === null || cpf === '' || niveldeacesso === null || niveldeacesso === '' || codigodeacesso === null || codigodeacesso === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha todos os campos!');
                }
                let novoFuncionario = new AdminDashboard_1.default();
                novoFuncionario.email = email;
                novoFuncionario.cpf = cpf;
                novoFuncionario.nivelacesso = niveldeacesso;
                novoFuncionario.codigodeacesso = codigodeacesso;
                novoFuncionario.save();
            });
            Dashboard.on('buscar-email-funcionario-excluir', (data) => {
                let email = data;
                if (email === null || email === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha o email!');
                }
                buscarEmail();
                async function buscarEmail() {
                    await (await AdminDashboard_1.default.findByOrFail('email', data)).delete();
                    Dashboard.emit('receber-email-informações-msg', 'Funcionario excluido com sucesso!');
                }
            });
            Dashboard.on('buscar-token-smash', (data) => {
                let token = data.smashToken;
                if (token === ' ' || token === '') {
                    return Dashboard.emit('receber-email-informações-msg', 'Preencha todos os campos!');
                }
                buscarToken();
                async function buscarToken() {
                    let token = await Tokensplataforma_1.default.findByOrFail('id', 1);
                    token.token = data.smashToken;
                    await token.save();
                    Dashboard.emit('reload-token-smash', token);
                    Dashboard.emit('receber-token-informações-msg', 'Token atualizado com sucesso!');
                }
            });
            Dashboard.on('buscar-token-blaze', (data) => {
                let token = data.blazeToken;
                if (token === ' ' || token === '') {
                    return Dashboard.emit('receber-token-informações-msg', 'Preencha todos os campos!');
                }
                buscarToken();
                async function buscarToken() {
                    let token = await Tokensplataforma_1.default.findByOrFail('id', 2);
                    token.token = data.blazeToken;
                    await token.save();
                    Dashboard.emit('reload-token-blaze', 'token');
                    Dashboard.emit('receber-token-informações-msg', 'Token atualizado com sucesso!');
                }
            });
        });
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map