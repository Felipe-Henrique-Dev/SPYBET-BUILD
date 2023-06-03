"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const SmashCrash_1 = __importDefault(require("../../Models/SmashCrash"));
const PadroesSmashCrash_1 = __importDefault(require("../../Models/PadroesSmashCrash"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class SmashCrashController {
    async SmashCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketSubscribeString1 = '40/crash,' + JSON.stringify({ "token": "LYA4ehpsPLBp9AaXsNLwcG" });
        open();
        function open() {
            var SocketSmashCrash = new Websocket('wss://br-socket.t1tcp.com/socket.io/?EIO=4&transport=websocket');
            SocketSmashCrash.onopen = () => {
                SocketSmashCrash.send(SocketSubscribeString1);
            };
            SocketSmashCrash.onclose = function (e) {
                console.log('Socket smash Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketSmashCrash.onerror = function (err) {
                console.error('Socket smash Crash encountered error: ', err.message, 'Closing socket');
                SocketSmashCrash.close();
            };
            let ç = [];
            SocketSmashCrash.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var j = e.data.split('40/crash,');
                    if (j == '2') {
                        SocketSmashCrash.send('3');
                    }
                    var i = e.data.split("42/crash,");
                    if (i[1]) {
                        let data = JSON.parse(i[1]);
                        let x = data[1];
                        if (!x.stage) {
                            return;
                        }
                        let status = x.stage;
                        if (status === 'rising') {
                            if (status === 'rising') {
                                setTimeout(() => {
                                    Ws_2.default.io.emit('crashSmash', {
                                        smashCrashStatus: 'Vela subindo...'
                                    });
                                }, 1000);
                            }
                            return;
                        }
                        if (x.stage !== 'crashed') {
                            ç = [];
                            return;
                        }
                        if (ç.length === 0) {
                            ç.push('1');
                            let CrashValue = x.data.pt;
                            crash(CrashValue);
                        }
                    }
                }
            };
        }
        async function crash(CrashValue) {
            let crashValue = CrashValue;
            const updateCrash = new Date();
            let crashHora = updateCrash.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updateCrash.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (crashValue === '0' || crashValue === '1') {
                crashValue = '1.00';
            }
            var crashStatus = String();
            if (crashValue < 2) {
                crashStatus = 'odd-lose';
            }
            else {
                crashStatus = 'odd-win';
            }
            String(crashStatus);
            String(crashHora);
            let crashValue2 = String(crashValue.toFixed(2)) + 'X';
            await Database_1.default.transaction(async (trx) => {
                const newCrash = new SmashCrash_1.default();
                newCrash.crash_point = crashValue2;
                newCrash.statuscrash = crashStatus;
                newCrash.crash_hora = crashHora;
                newCrash.useTransaction(trx);
                await newCrash.save();
            });
            setTimeout(function () {
                Ws_2.default.io.emit('crashSmash', {
                    CrashValue: crashValue2,
                    CrashStatus: crashStatus,
                    CrashHora: crashHora,
                });
                Ws_2.default.io.emit('crashSmash', {
                    smashCrashStatus: 'Novo'
                });
            }, 2000);
        }
        Ws_2.default.io.on('connection', (SocketSmashCrash) => {
            SocketSmashCrash.on('pingSC', (data) => {
                SocketSmashCrash.emit('pongSC', data);
            });
            SocketSmashCrash.on('qtJogosCrashSmash', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await SmashCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await SmashCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashSmash', {
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
            SocketSmashCrash.on('smashCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesSmashCrash_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketSmashCrash.on('smashCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesSmashCrash_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashSmash', { listPadrao2 });
                }
            });
            SocketSmashCrash.once('smashCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesSmashCrash_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketSmashCrash.on('PadroesShareSmashCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                SmashCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function SmashCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesSmashCrash_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketSmashCrash.emit('PadroesShareSmashCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketSmashCrash.emit('PadroesShareSmashCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = SmashCrashController;
//# sourceMappingURL=SmashCrashController.js.map