"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tabela_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tabela"));
"use strict";
class TabelasController {
    async index({ view, auth }) {
        const userid = auth.user.id;
        const tabela = await (await Tabela_1.default.query().where('user_id', userid));
        let tabelaarray = tabela.map(function (tabela) {
            return tabela.toJSON();
        });
        let tabelaarray2 = [...tabelaarray].map(function (tabela) {
            return tabela.tabelacontrole;
        });
        let tabelaarray3 = tabelaarray2.map(function (tabela) {
            return tabela.trim();
        });
        var tabelaID = [...tabelaarray].map(function (tabela) {
            let id = tabela.id.toString().split(',');
            return id;
        });
        var nomeTabela = tabelaarray.map(function (tabela) {
            let nome = tabela.name.split(',');
            return nome;
        });
        var qtdTabela = nomeTabela.length;
        return view.render('home-gerenciamento-tabela', { tabela, tabelaarray3, nomeTabela, tabelaID, qtdTabela });
    }
    async store({ request, auth, response }) {
        const name = request.input('nomeTabela');
        const requisicao = request.all();
        const userid = auth.user.id;
        let tabelacontrole = String(Object.keys(requisicao).map(function (key) {
            let value = requisicao[key];
            return value;
        }));
        let save = await Tabela_1.default.create({ user_id: auth.user.id, tabelacontrole, name });
        let tabela = await (await Tabela_1.default.query().where('user_id', userid));
        let tabelaarray = tabela.map(function (tabela) {
            return tabela.toJSON();
        });
        let tabelaarray2 = [...tabelaarray].map(function (tabela) {
            return tabela.id;
        });
        let tabelaarray3 = tabelaarray2.map(function (tabela) {
            return tabela;
        });
        let tabelaarray4 = tabelaarray3[tabelaarray3.length - 1];
        return response.redirect('/home/gerenciamento/tabela/' + tabelaarray4);
    }
    async show({ view, params, auth, session, response }) {
        const tabela = await Tabela_1.default.findOrFail(params.id);
        let tabelaarray = tabela.tabelacontrole.split(',');
        let idAtual = tabela.id;
        const userid = auth.user.id;
        const tabela1 = await (await Tabela_1.default.query().where('user_id', userid));
        let tabelaarray1 = tabela1.map(function (tabela1) {
            return tabela1.toJSON();
        });
        let tabelaarray2 = [...tabelaarray1].map(function (tabela1) {
            return tabela1.tabelacontrole;
        });
        var tabelaID = [...tabelaarray1].map(function (tabela1) {
            let id = tabela1.id.toString().split(',');
            return id;
        });
        var nomeTabela = tabelaarray1.map(function (tabela1) {
            let nome = tabela1.name.split(',');
            return nome;
        });
        var qtdTabela = nomeTabela.length;
        if (qtdTabela === 10) {
            session.flash({ error: 'Você atingiu o limite de tabelas' });
            return response.redirect('/home/gerenciamento/tabela/criadas');
        }
        return view.render('home-gerenciamento-tabela-preenchida', { tabela, tabelaarray, nomeTabela, tabelaID, qtdTabela, idAtual });
    }
    async tabelaupdate({ request, response, params }) {
        const tabela = await Tabela_1.default.findOrFail(params.id);
        const requisicao = request.all();
        const name = request.input('nomeTabela');
        let tabelacontrole = String(Object.keys(requisicao).map(function (key) {
            let value = requisicao[key];
            return value;
        }));
        tabela.tabelacontrole = tabelacontrole;
        tabela.name = name;
        await tabela.save();
        return response.redirect('/home/gerenciamento/tabela/' + tabela.id);
    }
    async tabeladestroy({ params, response }) {
        const tabela = await Tabela_1.default.findOrFail(params.id);
        await tabela.delete();
        return response.redirect('back');
    }
    async tabelasCriadas({ view, auth }) {
        const userid = auth.user.id;
        const tabela = await (await Tabela_1.default.query().where('user_id', userid));
        let tabelaarray = tabela.map(function (tabela) {
            return tabela.toJSON();
        });
        let tabelaarray2 = [...tabelaarray].map(function (tabela) {
            return tabela.tabelacontrole;
        });
        let tabelaarray3 = tabelaarray2.map(function (tabela) {
            return tabela.trim();
        });
        var tabelaID = [...tabelaarray].map(function (tabela) {
            let id = tabela.id.toString().split(',');
            return id;
        });
        var nomeTabela = tabelaarray.map(function (tabela) {
            let nome = tabela.name.split(',');
            return nome;
        });
        var qtdTabela = nomeTabela.length;
        return view.render('home-gerenciamento-tabelascriadas', { tabela, tabelaarray3, nomeTabela, tabelaID, qtdTabela });
    }
    async sobreGerenciamento({ view }) {
        return view.render('home-gerenciamento-sobre');
    }
}
exports.default = TabelasController;
//# sourceMappingURL=TabelasController.js.map