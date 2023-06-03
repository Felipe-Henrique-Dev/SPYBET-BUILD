"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BeetteDouble_1 = __importDefault(require("../../Models/BeetteDouble"));
const PadroesBeetteDouble_1 = __importDefault(require("../../Models/PadroesBeetteDouble"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const iconv = require('iconv-lite');
const crypto = require('crypto');
class ArbettyDoubleController {
    async ArbettyDouble() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        open();
        function open() {
            var SocketBeetteDouble = new Websocket("wss://arbety.eway.dev:3001/socket.io/?EIO=4&transport=websocket&sid=TqJQCnDu0IUoRbAaAg08");
            SocketBeetteDouble.onopen = () => {
                console.log('pinng arbet double');
                SocketBeetteDouble.send('2probe');
            };
            SocketBeetteDouble.onclose = function (e) {
                console.log('Socket arbet Double is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBeetteDouble.onerror = function (err) {
                console.error('Socket arbet Double  encountered error: ', err.message, 'Closing socket');
                SocketBeetteDouble.close();
            };
            let ç = [];
            SocketBeetteDouble.onmessage = (e) => {
                console.log(e.data);
                return;
                let i1 = String(e.data.split('42["roulette",')[1]).split('{"type":"slider","slider":')[1];
                if (i1 == undefined) {
                    return;
                }
                let doubleColor = String(String(i1).split(',')[1].replace('"', '').replace('"', '')).split(':')[1].replace('"', '').replace('"', '');
                let doubleNumber = String(String(i1).split(',')[2].replace('"', '').replace('"', '')).split(':')[1].replace('"', '').replace('"', '');
                if (doubleColor == 'green') {
                    doubleColor = 'white';
                }
                double(doubleColor, doubleNumber);
                whiteSugestion(doubleColor, doubleNumber);
            };
        }
        async function double(doubleColor, doubleNumber) {
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (doubleNumber === 0) {
                doubleNumber = '<img src="/assets/images/beette.aa6dabc3.png">';
            }
            String(doubleHora);
            String(doubleNumber);
            if (doubleNumber === undefined) {
                return;
            }
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new BeetteDouble_1.default();
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
            setTimeout(() => {
                Ws_2.default.io.emit('DoubleBeette', {
                    double_point: doubleNumber,
                    double_cor: doubleColor,
                    double_hora: doubleHora,
                    selectionSugestao: Sugestao,
                });
            }, 2000);
        }
        var selectWhiteHR = [];
        var selectWhiteHRCancel = [];
        var LossSelectWhite = [];
        var CancelSelectWhite = [];
        var time1 = [];
        var time2 = [];
        var time3 = [];
        var time4 = [];
        var timeBlock = [];
        var whiteOpen = [];
        var primeiroHr = [];
        var segundoHr = [];
        var primeiroHr2 = [];
        var segundoHr2 = [];
        var primeiroWin = [];
        var Sugestao = [];
        var whiteWin = [];
        var whiteLose = [];
        var estatics = [];
        var resultado = [];
        var WhiteToday = [];
        var RedToday = [];
        var BlackToday = [];
        var DataEstatisticas = [];
        Ws_2.default.io.on('connection', (SocketBeetteDouble) => {
            SocketBeetteDouble.on('pingBD', (data) => {
                SocketBeetteDouble.emit('pongBD', data);
            });
            SocketBeetteDouble.on('qtJogosBeetteDouble', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BeetteDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BeetteDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (WhiteToday.length == 0 && RedToday.length == 0 && BlackToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        WhiteToday = [];
                        RedToday = [];
                        BlackToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var whiteToday = await BeetteDouble_1.default.query().where('double_cor', 'white').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var redToday = await BeetteDouble_1.default.query().where('double_cor', 'red').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var blackToday = await BeetteDouble_1.default.query().where('double_cor', 'black').where('created_at', '>=', dataHoje2 + ' 00:00:00');
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
                    Ws_2.default.io.emit('DoubleBeette', {
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
            SocketBeetteDouble.on('beetteDoubleNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBeetteDouble_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBeetteDouble.on('beetteDoubleGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBeetteDouble_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('DoubleBeette', { listPadrao2 });
                }
            });
            SocketBeetteDouble.once('beetteDoubleDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBeetteDouble_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBeetteDouble.on('PadroesShareBeetteDouble', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BeetteDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BeetteDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBeetteDouble_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBeetteDouble.emit('PadroesShareBeetteDoubleMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBeetteDouble.emit('PadroesShareBeetteDoubleMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = ArbettyDoubleController;
//# sourceMappingURL=ArbettyDoubleController.js.map