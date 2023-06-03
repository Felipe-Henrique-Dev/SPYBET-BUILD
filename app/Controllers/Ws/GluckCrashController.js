"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const GluckCrash_1 = __importDefault(require("../../Models/GluckCrash"));
const PadroesGluckCrash_1 = __importDefault(require("../../Models/PadroesGluckCrash"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class GluckCrashController {
    async GluckCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketAuthStringOne = '42' + JSON.stringify(["join-in-room", "crash-room"]);
        open();
        function open() {
            var SocketGluckCrash = new Websocket('wss://gluck-ws-games-mfgep5u4mq-rj.a.run.app/socket.io/?EIO=4&transport=websocket');
            SocketGluckCrash.onopen = () => {
                SocketGluckCrash.onmessage = (msg) => {
                    if (msg.data[0] == '0') {
                        SocketGluckCrash.send('40');
                    }
                    if ((msg.data[0] + msg.data[1] + msg.data[2]) == '40{') {
                        SocketGluckCrash.send(SocketAuthStringOne);
                        SocketGluckCrash.send(SocketAuthStringOne);
                    }
                    responseMSG(msg);
                };
            };
            SocketGluckCrash.onclose = function (e) {
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketGluckCrash.onerror = function (err) {
                SocketGluckCrash.close();
            };
            let ç = [];
            function responseMSG(e) {
                if (e.data[0] == '2') {
                    SocketGluckCrash.send('3');
                }
                if (!e) {
                    return;
                }
                else {
                    var I = e.data.split('42["tick",');
                    var i = (I[1] + '[').split(',');
                    if (i.length == 3) {
                        ç = [];
                        Ws_2.default.io.emit('crashGluck', {
                            gluckCrashStatus: 'Vela subindo...'
                        });
                    }
                    if (i.length == 5) {
                        let status;
                        if (Number(i[1].split(':')[1]) < 2) {
                            status = 'odd-lose';
                        }
                        else {
                            status = 'odd-win';
                        }
                        let crashPoint = i[1].split(':')[1];
                        let crashStatus = status;
                        if (ç.length == 0) {
                            ç.push(1);
                            crash(crashStatus, crashPoint);
                        }
                    }
                }
            }
        }
        async function crash(crashStatus, crashPoint) {
            const updateCrash = new Date();
            let crashHora = updateCrash.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updateCrash.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            String(crashStatus);
            String(crashHora);
            if (crashPoint == 0 || crashPoint == 1) {
                crashPoint = 1.00;
            }
            let crashValue2 = String(crashPoint) + 'X';
            await Database_1.default.transaction(async (trx) => {
                const newSave = new GluckCrash_1.default();
                newSave.crash_point = crashValue2;
                newSave.statuscrash = crashStatus;
                newSave.crash_hora = crashHora;
                newSave.useTransaction(trx);
                await newSave.save();
            });
            setTimeout(() => {
                Ws_2.default.io.emit('crashGluck', {
                    CrashValue: crashValue2,
                    CrashStatus: crashStatus,
                    CrashHora: crashHora,
                });
                Ws_2.default.io.emit('crashGluck', { gluckCrashStatus: 'Novo' });
            }, 2000);
        }
        Ws_2.default.io.on('connection', (SocketGluckCrash2) => {
            SocketGluckCrash2.on('pingBC', (data) => {
                SocketGluckCrash2.emit('pongBC', { data });
            });
            SocketGluckCrash2.on('qtJogosCrashGluck', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await GluckCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await GluckCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashGluck', {
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
            SocketGluckCrash2.on('gluckCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesGluckCrash_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketGluckCrash2.on('gluckCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesGluckCrash_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashGluck', { listPadrao2 });
                }
            });
            SocketGluckCrash2.on('gluckCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesGluckCrash_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketGluckCrash2.on('PadroesShareGluckCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                GluckCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function GluckCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesGluckCrash_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketGluckCrash2.emit('PadroesShareGluckCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketGluckCrash2.emit('PadroesShareGluckCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = GluckCrashController;
//# sourceMappingURL=GluckCrashController.js.map