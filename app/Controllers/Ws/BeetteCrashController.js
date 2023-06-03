"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BeetteCrash_1 = __importDefault(require("../../Models/BeetteCrash"));
const PadroesBeetteCrash_1 = __importDefault(require("../../Models/PadroesBeetteCrash"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class BeetteCrashController {
    async BeetteCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        open();
        function open() {
            var SocketBeetteDouble = new Websocket("wss://beette.com:8443/socket.io/?EIO=3&transport=websocket&sid");
            SocketBeetteDouble.onopen = () => {
                SocketBeetteDouble.send('2probe');
                SocketBeetteDouble.send('5');
                setInterval(() => {
                    SocketBeetteDouble.send('2probe');
                    SocketBeetteDouble.send('5');
                }, 20000);
            };
            SocketBeetteDouble.onclose = function (e) {
                console.log('Socket beette Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBeetteDouble.onerror = function (err) {
                console.error('Socket beette Double  encountered error: ', err.message, 'Closing socket');
                SocketBeetteDouble.close();
            };
            let ç = [];
            SocketBeetteDouble.onmessage = (e) => {
                let i = String(String(String(e.data.split('42["crash",')[1]).split(',"float":')[1]).split(',')[1]).split(':')[1];
                let i1 = String(String(e.data.split('42["crash",')[1]).split(',"float":')[1]).split(',')[0];
                if (i == 'true') {
                    crash(i1);
                }
            };
        }
        async function crash(crashValue) {
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
                const newSave = new BeetteCrash_1.default();
                newSave.crash_point = crashValue2;
                newSave.statuscrash = crashStatus;
                newSave.crash_hora = crashHora;
                newSave.useTransaction(trx);
                await newSave.save();
            });
            setTimeout(() => {
                Ws_2.default.io.emit('crashBeette', {
                    CrashValue: crashValue2,
                    CrashStatus: crashStatus,
                    CrashHora: crashHora,
                });
                Ws_2.default.io.emit('crashBeette', { beetteCrashStatus: 'Novo' });
            }, 2000);
        }
        Ws_2.default.io.on('connection', (SocketBeetteCrash2) => {
            SocketBeetteCrash2.on('pingBC', (data) => {
                SocketBeetteCrash2.emit('pongBC', { data });
            });
            SocketBeetteCrash2.on('qtJogosCrashBeette', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BeetteCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BeetteCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashBeette', {
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
            SocketBeetteCrash2.on('beetteCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBeetteCrash_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBeetteCrash2.on('beetteCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBeetteCrash_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashBeette', { listPadrao2 });
                }
            });
            SocketBeetteCrash2.on('beetteCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBeetteCrash_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBeetteCrash2.on('PadroesShareBeetteCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BeetteCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BeetteCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBeetteCrash_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBeetteCrash2.emit('PadroesShareBeetteCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBeetteCrash2.emit('PadroesShareBeetteCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BeetteCrashController;
//# sourceMappingURL=BeetteCrashController.js.map