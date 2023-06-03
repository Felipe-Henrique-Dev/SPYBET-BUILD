"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BlazeDouble_1 = __importDefault(require("../../Models/BlazeDouble"));
const PadroesBlazeDouble_1 = __importDefault(require("../../Models/PadroesBlazeDouble"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const Estatistic_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Estatistic"));
class BlazeDoubleController {
    async BlazeDouble() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketAuthStringFour = '421' + JSON.stringify(["cmd", { "id": "subscribe", "payload": { "room": "double_v2" } }]);
        var SocketAuthStringOne = '420' + JSON.stringify(["cmd", { "id": "authenticate", "payload": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkyMjIwMywiYmxvY2tzIjpbXSwiaWF0IjoxNjc1NzI0MTEyLCJleHAiOjE2ODA5MDgxMTJ9.X1UNgRNiDFaTyzJJHKW15VDYHGJgQGiUWqjZ2QrfQ-4" } }]);
        var SocketAuthStringTwo = '423' + JSON.stringify(["cmd", { "id": "authenticate", "payload": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkyMjIwMywiYmxvY2tzIjpbXSwiaWF0IjoxNjc1NzI0MTEyLCJleHAiOjE2ODA5MDgxMTJ9.X1UNgRNiDFaTyzJJHKW15VDYHGJgQGiUWqjZ2QrfQ-4" } }]);
        open();
        function open() {
            var SocketBlazeDouble = new Websocket('wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket');
            SocketBlazeDouble.setMaxListeners(20);
            SocketBlazeDouble.onopen = () => {
                console.log('Conectado ao Blaze Double');
                SocketBlazeDouble.send(SocketAuthStringFour);
                setInterval(() => {
                    SocketBlazeDouble.send(SocketAuthStringFour);
                }, 20000);
            };
            SocketBlazeDouble.onclose = function (e) {
                console.log('Socket blaze Double is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBlazeDouble.onerror = function (err) {
                console.error('Socket blaze Double  encountered error: ', err.message, 'Closing socket');
                SocketBlazeDouble.close();
            };
            let ç = [];
            SocketBlazeDouble.onmessage = (e) => {
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
                        let doubleColor = x.payload.color;
                        let doubleNumber = x.payload.roll;
                        let doubleStatus = x.payload.status;
                        if (doubleColor === 1) {
                            doubleColor = 'red';
                        }
                        else if (doubleColor === 2) {
                            doubleColor = 'black';
                        }
                        else if (doubleColor === 0) {
                            doubleColor = 'white';
                        }
                        if (doubleStatus === 'waiting' || doubleStatus === 'complete') {
                            doubleStatus = 'waiting';
                            ç = [];
                            return;
                        }
                        if (ç.length === 0 && doubleStatus === 'rolling') {
                            ç.push('1');
                            double(doubleColor, doubleNumber, doubleStatus);
                        }
                    }
                }
            };
        }
        async function double(doubleColor, doubleNumber, doubleStatus) {
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (doubleNumber === 0) {
                doubleNumber = '<img src="/assets/images/blaze.06d0155e.png">';
            }
            String(doubleStatus);
            String(doubleHora);
            String(doubleNumber);
            if (doubleNumber === undefined) {
                return;
            }
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new BlazeDouble_1.default();
                newdouble.double_point = doubleNumber;
                newdouble.double_cor = doubleColor;
                newdouble.double_hora = doubleHora;
                newdouble.useTransaction(trx);
                await newdouble.save();
            });
            if (doubleColor == 'red') {
                RedToday.push(RedToday[0] + 1);
                RedToday.shift();
            }
            if (doubleColor == 'black') {
                BlackToday.push(BlackToday[0] + 1);
                BlackToday.shift();
            }
            if (doubleColor == 'white') {
                WhiteToday.push(WhiteToday[0] + 1);
                WhiteToday.shift();
            }
            var Sugestao = [];
            setTimeout(() => {
                Ws_2.default.io.emit('DoubleBlaze', {
                    double_point: doubleNumber,
                    double_cor: doubleColor,
                    double_hora: doubleHora,
                    selectionSugestao: Sugestao,
                });
            }, 2000);
        }
        async function whiteSugestion(doubleColor, doubleNumber) {
            if (doubleNumber === undefined) {
                return;
            }
            if (sequencia.length !== 4) {
                return sequencia.push(doubleColor);
            }
            if (sequencia.length == 4) {
                if (sequencia[0] == 'black' && sequencia[1] == 'black' && sequencia[2] == 'black' && sequencia[3] == 'black') {
                    ultimoSeqBlack.push(doubleColor);
                    let contrario;
                    if (ultimoSeqBlack.length <= 2) {
                        return;
                    }
                    if (ultimoSeqBlack[0] == 'red' && ultimoSeqBlack[1] == 'red') {
                        contrario = 'black';
                    }
                    else if (ultimoSeqBlack[0] == 'black' && ultimoSeqBlack[1] == 'black') {
                        contrario = 'red';
                    }
                    else {
                        sequencia = [];
                        ultimoSeqBlack = [];
                        return;
                    }
                    if (doubleColor == contrario) {
                        let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'blaze');
                        estatic.pg = estatic.pg + 1;
                        estatic.save();
                        sequencia = [];
                        derrotaBlack = [];
                        ultimoSeqBlack = [];
                        const text = `◾️ BLACK ◾️\n\n Vitorias: ${estatic.pg}\n Derrotas: ${estatic.cm}\n\n`;
                        enviarMsgSugestao(text);
                        return;
                    }
                    else {
                        derrotaBlack.push('loss');
                        if (derrotaBlack.length == 3) {
                            let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'blaze');
                            estatic.cm = estatic.cm + 1;
                            estatic.save();
                            derrotaBlack = [];
                            const text = `◾️ BLACK ◾️\n\n Vitorias: ${estatic.pg}\n Derrotas: ${estatic.cm}\n\n`;
                            enviarMsgSugestao(text);
                        }
                        sequencia = [];
                        ultimoSeqBlack = [];
                        return;
                    }
                }
                if (sequencia[0] == 'red' && sequencia[1] == 'red' && sequencia[2] == 'red' && sequencia[3] == 'red') {
                    ultimoSeqRed.push(doubleColor);
                    let contrario;
                    if (ultimoSeqRed.length <= 2) {
                        return;
                    }
                    if (ultimoSeqRed[0] == 'red' && ultimoSeqRed[1] == 'red') {
                        contrario = 'black';
                    }
                    else if (ultimoSeqRed[0] == 'black' && ultimoSeqRed[1] == 'black') {
                        contrario = 'red';
                    }
                    else {
                        sequencia = [];
                        ultimoSeqRed = [];
                        return;
                    }
                    if (doubleColor == contrario) {
                        let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'blaze');
                        estatic.zs = estatic.zs + 1;
                        estatic.save();
                        sequencia = [];
                        ultimoSeqRed = [];
                        derrotaRed = [];
                        const text = `🛑 RED 🛑\n\n Vitorias: ${estatic.zs}\n Derrotas: ${estatic.xg}\n\n`;
                        enviarMsgSugestao(text);
                        return;
                    }
                    else {
                        derrotaRed.push('loss');
                        if (derrotaRed.length == 3) {
                            let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'blaze');
                            estatic.xg = estatic.xg + 1;
                            estatic.save();
                            derrotaRed = [];
                            const text = `🛑 RED 🛑\n\n Vitorias: ${estatic.zs}\n Derrotas: ${estatic.xg}\n\n`;
                            enviarMsgSugestao(text);
                        }
                        sequencia = [];
                        ultimoSeqRed = [];
                        return;
                    }
                }
                sequencia.shift();
                sequencia.push(doubleColor);
            }
        }
        var ultimoSeqBlack = [];
        var ultimoSeqRed = [];
        var sequencia = [];
        var derrotaBlack = [];
        var derrotaRed = [];
        async function enviarMsgSugestao(texts) {
            const TOKEN = '5851255272:AAFUBmqiu-WDGDiOF3S5v41M9w68DUt-xlE';
            const chatId = -1001832660443;
            const text = texts;
            const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
            bot.sendMessage(chatId, text);
            bot.stopPolling();
        }
        var WhiteToday = [];
        var RedToday = [];
        var BlackToday = [];
        var DataEstatisticas = [];
        Ws_2.default.io.on('connection', (SocketBlazeDouble) => {
            SocketBlazeDouble.on('pingBD', (data) => {
                SocketBlazeDouble.emit('pongBD', data);
            });
            SocketBlazeDouble.on('qtJogosBlazeDouble', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BlazeDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BlazeDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (WhiteToday.length == 0 && RedToday.length == 0 && BlackToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        WhiteToday = [];
                        RedToday = [];
                        BlackToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var whiteToday = await BlazeDouble_1.default.query().where('double_cor', 'white').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var redToday = await BlazeDouble_1.default.query().where('double_cor', 'red').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var blackToday = await BlazeDouble_1.default.query().where('double_cor', 'black').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        WhiteToday.push(whiteToday.length);
                        RedToday.push(redToday.length);
                        BlackToday.push(blackToday.length);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            double_point: item.double_point,
                            double_cor: item.double_cor,
                            double_hora: item.double_hora
                        };
                    });
                    Ws_2.default.io.emit('DoubleBlaze', {
                        DataEstatisticas: DataEstatisticas[0],
                        WhiteToday: WhiteToday[0],
                        RedToday: RedToday[0],
                        BlackToday: BlackToday[0],
                        qtJogos: quantidadeJogos,
                        list: list2.map(item => {
                            return {
                                id: item.id,
                                double_point: item.double_point,
                                double_cor: item.double_cor,
                                double_hora: item.double_hora
                            };
                        })
                    });
                }
            });
            SocketBlazeDouble.on('blazeDoubleNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBlazeDouble_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBlazeDouble.on('blazeDoubleGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBlazeDouble_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('DoubleBlaze', { listPadrao2 });
                }
            });
            SocketBlazeDouble.once('blazeDoubleDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBlazeDouble_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBlazeDouble.on('PadroesShareBlazeDouble', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BlazeDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BlazeDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBlazeDouble_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBlazeDouble.emit('PadroesShareBlazeDoubleMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBlazeDouble.emit('PadroesShareBlazeDoubleMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BlazeDoubleController;
//# sourceMappingURL=BlazeDoubleController.js.map