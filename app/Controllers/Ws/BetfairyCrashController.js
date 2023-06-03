"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class BetbryCrashController {
    async BetbryCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        open();
        function open() {
            var SocketBetbryCrash = new Websocket('wss://www.betbry.com/listen?module=jU86x7bq');
            SocketBetbryCrash.onopen = () => {
                console.log('Conectado ao Betbry Crash');
                SocketBetbryCrash.send(JSON.stringify({ "data": "switch-module", "modules": ["jU86x7bq"] }));
                setInterval(() => {
                    SocketBetbryCrash.send(JSON.stringify({ "data": "switch-module", "modules": ["jU86x7bq", "G-FO0ER0GS"] }));
                }, 500);
            };
            SocketBetbryCrash.onclose = function (e) {
                console.log('Socket betbry Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBetbryCrash.onerror = function (err) {
                console.error('Socket betbry Crash  encountered error: ', err.message, 'Closing socket');
                SocketBetbryCrash.close();
            };
            let ç = [];
            SocketBetbryCrash.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var i = e.data.split(':');
                    var i2 = (i[10]);
                    var i3 = String(String(String(i[12]).split('"')).split(',')[1]).replace(/\\/g, '');
                    if (i3 == 'finish') {
                        var i4 = i2.split('\\');
                        crash(i4[0]);
                        console.log(i4[0]);
                    }
                    else {
                        Ws_2.default.io.emit('crashBlaze', {
                            betbryCrashStatus: 'Vela subindo...'
                        });
                    }
                    return;
                }
            };
        }
        async function crash(crashValue) {
            let crashHora = updateCrash.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updateCrash.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (crashValue === '0' || crashValue === '1') {
                crashValue = '1.00';
            }
            if (crashValue < 2) {
                var crashStatus = 'odd-lose';
            }
            else {
                var crashStatus = 'odd-win';
            }
            String(crashStatus);
            String(crashHora);
            let crashValue2 = String(crashValue) + 'X';
            await Database_1.default.transaction(async (trx) => {
                const newSave = new BetbryCrash();
                newSave.crash_point = crashValue2;
                newSave.statuscrash = crashStatus;
                newSave.crash_hora = crashHora;
                newSave.useTransaction(trx);
                await newSave.save();
            });
            setTimeout(() => {
                Ws_2.default.io.emit('crashBetbry', {
                    CrashValue: crashValue2,
                    CrashStatus: crashStatus,
                    CrashHora: crashHora,
                });
                Ws_2.default.io.emit('crashBetbry', { betbryCrashStatus: 'Novo' });
            }, 2000);
        }
        Ws_2.default.io.on('connection', (SocketBetbryCrash2) => {
            SocketBetbryCrash2.on('pingBC', (data) => {
                SocketBetbryCrash2.emit('pongBC', { data });
            });
            SocketBetbryCrash2.on('qtJogosCrashBetbry', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BetbryCrash.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BetbryCrash.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashBetbry', {
                        qtJogos: quantidadeJogos,
                        list: list2.map(item => {
                            return {
                                id: item.id,
                                CrashValue: item.crash_point,
                                CrashStatus: item.statuscrash,
                                CrashHora: item.crash_hora
                            };
                        })
                    });
                }
            });
            SocketBetbryCrash2.on('betbryCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBetbryCrash.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBetbryCrash2.on('betbryCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBetbryCrash.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashBetbry', { listPadrao2 });
                }
            });
            SocketBetbryCrash2.on('betbryCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBetbryCrash.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBetbryCrash2.on('PadroesShareBetbryCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BetbryCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BetbryCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBetbryCrash.query().where('id', idPadraoBusca).first();
                    let padrao = padraoBusca?.$original.padrao;
                    salvarPadrao(userId, name, casaDeAposta, casaDeApostaTipo, padrao);
                }
                async function salvarPadrao(userId, name, casaDeAposta, casaDeApostaTipo, padrao) {
                    let data = String(new Date());
                    let userid = userId;
                    let casadeAposta = casaDeAposta;
                    let casadeApostaTipo = casaDeApostaTipo;
                    let nameUser = name;
                    let padraoBusca = await PadroesCompartilhado_1.default.query().where('padrao', padrao).first();
                    if (padraoBusca !== null) {
                        SocketBetbryCrash2.emit('PadroesShareBetbryCrashMsg', { error: 'Padrão já compartilhado' });
                    }
                    else {
                        await PadroesCompartilhado_1.default.create({
                            user_id: userid,
                            name: nameUser,
                            padrao: padrao,
                            data: data,
                            site: casadeAposta,
                            site_tipo: casadeApostaTipo
                        });
                        SocketBetbryCrash2.emit('PadroesShareBetbryCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BetbryCrashController;
//# sourceMappingURL=BetfairyCrashController.js.map