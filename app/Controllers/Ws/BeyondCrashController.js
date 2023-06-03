"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BeyondCrash_1 = __importDefault(require("../../Models/BeyondCrash"));
const PadroesBeyondCrash_1 = __importDefault(require("../../Models/PadroesBeyondCrash"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class BeyondCrashController {
    async BeyondCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketSubscribeString = '42' + JSON.stringify(["init", { lang: "en", game: "crash", logged: false, email: "", username: "", avatar: "", token: "", }]);
        open();
        function open() {
            var SocketBeyondCrash = new Websocket('wss://beyondoficial.com:8443/socket.io/?EIO=3&transport=websocket');
            SocketBeyondCrash.onopen = () => {
                console.log('Conectado ao Beyond Crash');
                SocketBeyondCrash.send(SocketSubscribeString);
                setInterval(() => {
                    SocketBeyondCrash.send(SocketSubscribeString);
                }, 20000);
            };
            SocketBeyondCrash.onclose = function (e) {
                console.log('Socket beyond Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBeyondCrash.onerror = function (err) {
                console.error('Socket beyond Crash  encountered error: ', err.message, 'Closing socket');
                SocketBeyondCrash.close();
            };
            let ç = [];
            SocketBeyondCrash.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var i = e.data.split('42["crash end",');
                    var i2 = String(String(String(i[1])).split(',')[2]).split(':')[1];
                    if (i.length != 2 && ç.length == 1) {
                        Ws_2.default.io.emit('crashBeyond', {
                            beyondCrashStatus: 'Vela subindo...'
                        });
                        return;
                    }
                    ç = [];
                    setTimeout(() => {
                        ç.push('i2');
                    }, 4000);
                    let data = Number(i2).toFixed(2);
                    crash(data);
                }
            };
        }
        async function crash(data) {
            if (data == 'NaN') {
                return;
            }
            let crashValue = data;
            const updateCrash = new Date();
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
                const newSave = new BeyondCrash_1.default();
                newSave.crash_point = crashValue2;
                newSave.statuscrash = crashStatus;
                newSave.crash_hora = crashHora;
                newSave.useTransaction(trx);
                await newSave.save();
            });
            setTimeout(() => {
                Ws_2.default.io.emit('crashBeyond', {
                    CrashValue: crashValue2,
                    CrashStatus: crashStatus,
                    CrashHora: crashHora,
                });
                Ws_2.default.io.emit('crashBeyond', { beyondCrashStatus: 'Novo' });
            }, 2000);
        }
        Ws_2.default.io.on('connection', (SocketBeyondCrash2) => {
            SocketBeyondCrash2.on('pingBC', (data) => {
                SocketBeyondCrash2.emit('pongBC', { data });
            });
            SocketBeyondCrash2.on('qtJogosCrashBeyond', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BeyondCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BeyondCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashBeyond', {
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
            SocketBeyondCrash2.on('beyondCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBeyondCrash_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBeyondCrash2.on('beyondCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBeyondCrash_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashBeyond', { listPadrao2 });
                }
            });
            SocketBeyondCrash2.on('beyondCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBeyondCrash_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBeyondCrash2.on('PadroesShareBeyondCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BeyondCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BeyondCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBeyondCrash_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBeyondCrash2.emit('PadroesShareBeyondCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBeyondCrash2.emit('PadroesShareBeyondCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BeyondCrashController;
//# sourceMappingURL=BeyondCrashController.js.map