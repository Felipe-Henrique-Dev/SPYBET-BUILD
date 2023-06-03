"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class BetfairyDoubleController {
    async BetfairyDouble() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        open();
        function open() {
            var SocketBetfairyDouble = new Websocket(`wss://api.betfiery.com/socket.io/?EIO=4&transport=websocket&sid=Lgzg1Fi-9wKQwBrMAmfT`);
            var msg1 = '420' + JSON.stringify(["joinRoom", "game_double"]);
            SocketBetfairyDouble.setMaxListeners(20);
            SocketBetfairyDouble.onopen = () => {
                console.log('Conectado ao Betfairy Double');
                SocketBetfairyDouble.send('2probe');
                SocketBetfairyDouble.send('5');
                setTimeout(() => {
                    SocketBetfairyDouble.send(msg1);
                }, 1000);
            };
            SocketBetfairyDouble.onclose = function (e) {
                console.log('Socket betfairy Double is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBetfairyDouble.onerror = function (err) {
                console.error('Socket betfairy Double  encountered error: ', err.message, 'Closing socket');
                SocketBetfairyDouble.close();
            };
            let ç = [];
            SocketBetfairyDouble.onmessage = (e) => {
                console.log(e.data);
            };
        }
        async function double(doubleColor, doubleNumber) {
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (doubleNumber === 0) {
                doubleNumber = '<img src="/assets/images/betfairy.06d0155e.png">';
            }
            String(doubleHora);
            String(doubleNumber);
            if (doubleNumber === undefined) {
                return;
            }
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new BetfairyDouble();
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
                Ws_2.default.io.emit('DoubleBetfairy', {
                    double_point: doubleNumber,
                    double_cor: doubleColor,
                    double_hora: doubleHora,
                    selectionSugestao: Sugestao,
                });
            }, 2000);
        }
        async function sugestao(doubleColor) {
            if (doubleColor === undefined) {
                return;
            }
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var date1 = day + '/' + month;
            if (data.length === 0) {
                data.push(date1);
                data.shift();
            }
            if (data[0] !== date1) {
                data = [];
                data.push(date1);
                DoubleWhiteHR = [];
                whiteLose = [3];
                whiteWin = [12];
            }
            if (DoubleWhiteHR.length === 0) {
                var double = await BetfairyDouble.query().where('double_cor', 'white').select('double_hora');
                for (let i = 0; i < double.length; i++) {
                    DoubleWhiteHR.push(double[i].double_hora);
                }
            }
            const HoraRealNew = new Date();
            const HoraAtualMaisUmNew = new Date();
            HoraAtualMaisUmNew.setMinutes(HoraAtualMaisUmNew.getMinutes() + 1);
            const HoraAtualMaisDoisNew = new Date();
            HoraAtualMaisDoisNew.setMinutes(HoraAtualMaisDoisNew.getMinutes() + 2);
            const HoraAtualMaisTresNew = new Date();
            HoraAtualMaisTresNew.setMinutes(HoraAtualMaisTresNew.getMinutes() + 3);
            const HoraAtualMaisQuatroNew = new Date();
            HoraAtualMaisQuatroNew.setMinutes(HoraAtualMaisQuatroNew.getMinutes() + 4);
            const HoraAtualMaisCincoNew = new Date();
            HoraAtualMaisCincoNew.setMinutes(HoraAtualMaisCincoNew.getMinutes() + 5);
            const HoraAtualMaisSeisNew = new Date();
            HoraAtualMaisSeisNew.setMinutes(HoraAtualMaisSeisNew.getMinutes() + 6);
            const HoraAtualMaisSeteNew = new Date();
            HoraAtualMaisSeteNew.setMinutes(HoraAtualMaisSeteNew.getMinutes() + 7);
            const HoraAtualMaisOitoNew = new Date();
            HoraAtualMaisOitoNew.setMinutes(HoraAtualMaisOitoNew.getMinutes() + 8);
            const HoraAtualMaisNoveNew = new Date();
            HoraAtualMaisNoveNew.setMinutes(HoraAtualMaisNoveNew.getMinutes() + 9);
            const HoraAtualMaisDezNew = new Date();
            HoraAtualMaisDezNew.setMinutes(HoraAtualMaisDezNew.getMinutes() + 10);
            const HoraNextNew = new Date();
            HoraNextNew.setMinutes(HoraNextNew.getMinutes() + 11);
            const HoraReal = HoraRealNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisUm = HoraAtualMaisUmNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisDois = HoraAtualMaisDoisNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisTres = HoraAtualMaisTresNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisQuatro = HoraAtualMaisQuatroNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisCinco = HoraAtualMaisCincoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisSeis = HoraAtualMaisSeisNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisSete = HoraAtualMaisSeteNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisOito = HoraAtualMaisOitoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisNove = HoraAtualMaisNoveNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualMaisDez = HoraAtualMaisDezNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraNext = HoraNextNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const qtdWhiteNextFiveMinutes = DoubleWhiteHR.filter(function (el) {
                return el >= HoraReal && el <= HoraAtualMaisCinco;
            });
            if (selectDoubleWhiteHR.length > 4 || doubleColor === 'white') {
                if (doubleColor === 'white') {
                    if (selectDoubleWhiteHRCancel.length > 0) {
                        if (selectDoubleWhiteHRCancel[0] == HoraReal || selectDoubleWhiteHRCancel[1] == HoraReal || selectDoubleWhiteHRCancel[2] == HoraReal || selectDoubleWhiteHRCancel[3] == HoraReal || selectDoubleWhiteHRCancel[4] == HoraReal) {
                            selectDoubleWhiteHR = [];
                            selectDoubleWhiteHRCancel = [];
                            selectDoubleWhiteHR.push('white-' + HoraAtualMaisCinco);
                            var texts = `❗❗❗❌ Entrada BLAZE Cancelada:  ${Sugestao[0]} ❌❗❗❗`;
                            enviarMsgSugestao(texts);
                            Sugestao = [];
                        }
                        else {
                            if (HoraReal == selectDoubleWhiteHR[1] || HoraReal == selectDoubleWhiteHR[2] || HoraReal == selectDoubleWhiteHR[3] || HoraReal == selectDoubleWhiteHR[4] || HoraReal == selectDoubleWhiteHR[5] || HoraReal == selectDoubleWhiteHR[6] || HoraReal == selectDoubleWhiteHR[7]) {
                                whiteWin.push(whiteWin[0] + 1);
                                whiteWin.shift();
                                var texts = `🟥⚪⚪⚪ BRANCO ⚪⚪⚪🟥\n✅✅✅✅ Win : ${HoraReal} ✅✅✅✅\nEntrada : ${Sugestao[0]}`;
                                enviarMsgSugestao(texts);
                                selectDoubleWhiteHR.push('win');
                            }
                            else if (selectDoubleWhiteHR[8] === 'win' && doubleColor === 'white') {
                                whiteWin.push(whiteWin[0] + 1);
                                whiteWin.shift();
                                selectDoubleWhiteHR = [];
                                selectDoubleWhiteHRCancel = [];
                                Sugestao = [];
                                selectDoubleWhiteHR.push('white-' + HoraAtualMaisCinco);
                            }
                            else if (selectDoubleWhiteHR.length > 4 && selectDoubleWhiteHR[8] !== 'win') {
                                whiteLose.push(whiteLose[0] + 1);
                                whiteLose.shift();
                                selectDoubleWhiteHR = [];
                                selectDoubleWhiteHRCancel = [];
                                selectDoubleWhiteHR.push('white-' + HoraAtualMaisCinco);
                                var texts = `❌ ❌Loss BLAZE:  ${Sugestao[0]} ❌❌`;
                                Sugestao = [];
                                enviarMsgSugestao(texts);
                            }
                            else {
                                selectDoubleWhiteHR = [];
                                selectDoubleWhiteHRCancel = [];
                                selectDoubleWhiteHR.push('white-' + HoraAtualMaisCinco);
                                var texts = `❗❗❗❌ Entrada BLAZE Cancelada:  ${Sugestao[0]} ❌❗❗❗`;
                                enviarMsgSugestao(texts);
                                Sugestao = [];
                            }
                        }
                    }
                }
                if (HoraReal == selectDoubleWhiteHR[7]) {
                    if (selectDoubleWhiteHR[8] !== 'win') {
                        whiteLose.push(whiteLose[0] + 1);
                        whiteLose.shift();
                        var texts = `❌ Loss BLAZE:  ${Sugestao[0]} ❌`;
                        enviarMsgSugestao(texts);
                    }
                    selectDoubleWhiteHR = [];
                    selectDoubleWhiteHRCancel = [];
                    Sugestao = [];
                    selectDoubleWhiteHR.push('white-' + HoraAtualMaisCinco);
                }
            }
            if (qtdWhiteNextFiveMinutes.length > 79 && selectDoubleWhiteHR.length === 0) {
                selectDoubleWhiteHRCancel.push(HoraReal);
                selectDoubleWhiteHRCancel.push(HoraAtualMaisUm);
                selectDoubleWhiteHRCancel.push(HoraAtualMaisDois);
                selectDoubleWhiteHRCancel.push(HoraAtualMaisTres);
                selectDoubleWhiteHRCancel.push(HoraAtualMaisQuatro);
                selectDoubleWhiteHR.push(qtdWhiteNextFiveMinutes.length + '|' + HoraAtualMaisCinco + '-' + HoraAtualMaisDez);
                selectDoubleWhiteHR.push(HoraAtualMaisCinco);
                selectDoubleWhiteHR.push(HoraAtualMaisSeis);
                selectDoubleWhiteHR.push(HoraAtualMaisSete);
                selectDoubleWhiteHR.push(HoraAtualMaisOito);
                selectDoubleWhiteHR.push(HoraAtualMaisNove);
                selectDoubleWhiteHR.push(HoraAtualMaisDez);
                selectDoubleWhiteHR.push(HoraNext);
                Sugestao.push(HoraAtualMaisCinco + '-' + HoraAtualMaisDez);
                Sugestao.push(whiteWin[0]);
                Sugestao.push(whiteLose[0]);
                console.log('BLAZE| DENTRO:' + HoraAtualMaisCinco + '-' + HoraAtualMaisDez + ' ' + qtdWhiteNextFiveMinutes.length + ' || win:' + whiteWin[0] + '/ Loss:' + whiteLose[0] + ' || ' + data[0] + "/" + date1);
                console.log(selectDoubleWhiteHR + ' || ' + HoraReal + ' || ' + selectDoubleWhiteHRCancel);
                var texts = `🟥 Possível Branco - BLAZE 🟥\n🕓 DE: ${HoraAtualMaisCinco} Até: ${HoraAtualMaisDez} 🕓\n\n\n✅ Win: ${whiteWin[0]} \n\n❌ Loss: ${whiteLose[0]}`;
                enviarMsgSugestao(texts);
            }
            if (selectDoubleWhiteHR.length > 0) {
                let i = selectDoubleWhiteHR[0].split('-')[1];
                if (i < HoraReal) {
                    selectDoubleWhiteHR = [];
                    Sugestao = [];
                }
            }
            async function enviarMsgSugestao(texts) {
                const TOKEN = '5851255272:AAFUBmqiu-WDGDiOF3S5v41M9w68DUt-xlE';
                const chatId = -1001832660443;
                const text = texts;
                const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
                bot.sendMessage(chatId, text);
                bot.stopPolling();
            }
        }
        var DoubleWhiteHR = [];
        var selectDoubleWhiteHR = [];
        var selectDoubleWhiteHRCancel = [];
        var Sugestao = [];
        var whiteWin = [0];
        var whiteLose = [0];
        var data = [];
        var WhiteToday = [];
        var RedToday = [];
        var BlackToday = [];
        var DataEstatisticas = [];
        Ws_2.default.io.on('connection', (SocketBetfairyDouble) => {
            SocketBetfairyDouble.on('pingBD', (data) => {
                SocketBetfairyDouble.emit('pongBD', data);
            });
            SocketBetfairyDouble.on('qtJogosBetfairyDouble', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BetfairyDouble.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BetfairyDouble.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (WhiteToday.length == 0 && RedToday.length == 0 && BlackToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        WhiteToday = [];
                        RedToday = [];
                        BlackToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var whiteToday = await BetfairyDouble.query().where('double_cor', 'white').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var redToday = await BetfairyDouble.query().where('double_cor', 'red').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var blackToday = await BetfairyDouble.query().where('double_cor', 'black').where('created_at', '>=', dataHoje2 + ' 00:00:00');
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
                    Ws_2.default.io.emit('DoubleBetfairy', {
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
            SocketBetfairyDouble.on('betfairyDoubleNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBetfairyDouble.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBetfairyDouble.on('betfairyDoubleGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBetfairyDouble.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('DoubleBetfairy', { listPadrao2 });
                }
            });
            SocketBetfairyDouble.once('betfairyDoubleDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBetfairyDouble.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBetfairyDouble.on('PadroesShareBetfairyDouble', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BetfairyDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BetfairyDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBetfairyDouble.query().where('id', idPadraoBusca).first();
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
                        SocketBetfairyDouble.emit('PadroesShareBetfairyDoubleMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBetfairyDouble.emit('PadroesShareBetfairyDoubleMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BetfairyDoubleController;
//# sourceMappingURL=BetfairyDoubleController.js.map