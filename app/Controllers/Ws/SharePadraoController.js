"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const PadroesBlazeDouble_1 = __importDefault(require("../../Models/PadroesBlazeDouble"));
const PadroesBlazeCrash_1 = __importDefault(require("../../Models/PadroesBlazeCrash"));
const PadroesSmashCrash_1 = __importDefault(require("../../Models/PadroesSmashCrash"));
const PadroesSmashDouble_1 = __importDefault(require("../../Models/PadroesSmashDouble"));
const PadroesCompartilhado_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PadroesCompartilhado"));
class SharePadraoController {
    async SharePadrao() {
        Ws_1.default.io.on('connection', (SocketSharePadrao) => {
            SocketSharePadrao.on('listarPadroesSalvos', (filtroSite) => {
                listarPadroes();
                async function listarPadroes() {
                    let padraoAll = await PadroesCompartilhado_1.default.all();
                    let padrao = padraoAll.map(item => {
                        return {
                            id: item.id,
                            user_id: item.user_id,
                            name: item.name,
                            padrao: item.padrao,
                            data: item.data,
                            site: item.site,
                            site_tipo: item.site_tipo
                        };
                    });
                    Ws_1.default.io.emit('listarPadroesSalvos', { padrao: padrao });
                }
            });
            SocketSharePadrao.on('listarPadroesSiteGet', (user_id) => {
                listarPadroesSite(user_id);
                async function listarPadroesSite(user_id) {
                    let qtdPadroesSmashDouble = (await PadroesSmashDouble_1.default.query().where('user_id', '=', user_id.idUser)).length;
                    let qtdPadroesSmashCrash = (await PadroesSmashCrash_1.default.query().where('user_id', '=', user_id.idUser)).length;
                    let qtdPadroesBlazeDouble = (await PadroesBlazeDouble_1.default.query().where('user_id', '=', user_id.idUser)).length;
                    let qtdPadroesBlazeCrash = (await PadroesBlazeCrash_1.default.query().where('user_id', '=', user_id.idUser)).length;
                    SocketSharePadrao.emit('listarPadroesSitePut', {
                        qtdPadroesSmashDouble: qtdPadroesSmashDouble,
                        qtdPadroesSmashCrash: qtdPadroesSmashCrash,
                        qtdPadroesBlazeDouble: qtdPadroesBlazeDouble,
                        qtdPadroesBlazeCrash: qtdPadroesBlazeCrash
                    });
                }
            });
        });
    }
}
exports.default = SharePadraoController;
//# sourceMappingURL=SharePadraoController.js.map