"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BlazeCrash_1 = __importDefault(require("../../Models/BlazeCrash"));
const PadroesBlazeCrash_1 = __importDefault(require("../../Models/PadroesBlazeCrash"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class BlazeCrashController {
    async BlazeCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketSubscribeString = '421' + JSON.stringify(["cmd", { "id": "subscribe", "payload": { "room": "crash_v2" } }]);
        var SocketAuthStringOne = '420' + JSON.stringify(["cmd", { "id": "authenticate", "payload": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkyMjIwMywiYmxvY2tzIjpbXSwiaWF0IjoxNjc1NzI0MTEyLCJleHAiOjE2ODA5MDgxMTJ9.X1UNgRNiDFaTyzJJHKW15VDYHGJgQGiUWqjZ2QrfQ-4" } }]);
        var SocketAuthStringTwo = '423' + JSON.stringify(["cmd", { "id": "authenticate", "payload": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkyMjIwMywiYmxvY2tzIjpbXSwiaWF0IjoxNjc1NzI0MTEyLCJleHAiOjE2ODA5MDgxMTJ9.X1UNgRNiDFaTyzJJHKW15VDYHGJgQGiUWqjZ2QrfQ-4" } }]);
        open();
        function open() {
            var SocketBlazeCrash = new Websocket('wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket');
            SocketBlazeCrash.onopen = () => {
                console.log('Conectado ao Blaze Crash');
                SocketBlazeCrash.send(SocketSubscribeString);
                setInterval(() => {
                    SocketBlazeCrash.send('2');
                }, 10000);
                setInterval(() => {
                    SocketBlazeCrash.send(SocketSubscribeString);
                }, 12000);
            };
            SocketBlazeCrash.onclose = function (e) {
                console.log('Socket blaze Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBlazeCrash.onerror = function (err) {
                console.error('Socket blaze Crash  encountered error: ', err.message, 'Closing socket');
                SocketBlazeCrash.close();
            };
            let ç = [];
            SocketBlazeCrash.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var i = e.data.split('42[');
                    if (i[1]) {
                        let data = JSON.parse('[' + i[1]);
                        let x = data[1];
                        if (!x) {
                            return;
                        }
                        let status = x.payload.status;
                        if (status === 'waiting' || status === 'graphing') {
                            ç = [];
                            if (status === 'graphing') {
                                Ws_2.default.io.emit('crashBlaze', {
                                    blazeCrashStatus: 'Vela subindo...'
                                });
                            }
                            return;
                        }
                        if (status === 'complete') {
                            if (ç.length === 0) {
                                ç.push('1');
                                crash(x, status);
                            }
                        }
                    }
                }
            };
        }
        async function crash(data, status) {
            if (data.id === 'crash.tick') {
                let crashPoint = data.payload.crash_point;
                if (crashPoint === undefined || crashPoint === null) {
                    return;
                }
                let crashValue = data.payload.crash_point;
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
                    const newSave = new BlazeCrash_1.default();
                    newSave.crash_point = crashValue2;
                    newSave.statuscrash = crashStatus;
                    newSave.crash_hora = crashHora;
                    newSave.useTransaction(trx);
                    await newSave.save();
                });
                setTimeout(() => {
                    Ws_2.default.io.emit('crashBlaze', {
                        CrashValue: crashValue2,
                        CrashStatus: crashStatus,
                        CrashHora: crashHora,
                    });
                    Ws_2.default.io.emit('crashBlaze', { blazeCrashStatus: 'Novo' });
                }, 2000);
            }
        }
        Ws_2.default.io.on('connection', (SocketBlazeCrash2) => {
            SocketBlazeCrash2.on('pingBC', (data) => {
                SocketBlazeCrash2.emit('pongBC', { data });
            });
            SocketBlazeCrash2.on('qtJogosCrashBlaze', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BlazeCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BlazeCrash_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashBlaze', {
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
            SocketBlazeCrash2.on('blazeCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBlazeCrash_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBlazeCrash2.on('blazeCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBlazeCrash_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashBlaze', { listPadrao2 });
                }
            });
            SocketBlazeCrash2.on('blazeCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBlazeCrash_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBlazeCrash2.on('PadroesShareBlazeCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BlazeCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BlazeCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBlazeCrash_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBlazeCrash2.emit('PadroesShareBlazeCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBlazeCrash2.emit('PadroesShareBlazeCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BlazeCrashController;
//# sourceMappingURL=BlazeCrashController.js.map