"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BeyondDouble_1 = __importDefault(require("../../Models/BeyondDouble"));
const PadroesBeyondDouble_1 = __importDefault(require("../../Models/PadroesBeyondDouble"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const Estatistic_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Estatistic"));
class BeyondDoubleController {
    async BeyondDouble() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketAuthStringOne = '42' + JSON.stringify(["init", { "lang": "en", "game": "roulette", "logged": false, "email": "", "username": "", "avatar": "", "token": "", "time": "1676508018" }]);
        var SocketAuthStringTwo = '420' + JSON.stringify(["cmd", { "id": "authenticate", "payload": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkyMjIwMywiYmxvY2tzIjpbXSwiaWF0IjoxNjY3ODMzNTM3LCJleHAiOjE2NzMwMTc1Mzd9.xE_gjOxaqVKeQ4DR9jj9X8obUGhNHxqLyiyOoanyggE" } }]);
        var SocketAuthStringFour = '423' + JSON.stringify(["cmd", { "id": "subscribe", "payload": { "room": "double_v2" } }]);
        open();
        function open() {
            var SocketBeyondDouble = new Websocket('wss://beyondoficial.com:8443/socket.io/?EIO=3&transport=websocket');
            SocketBeyondDouble.setMaxListeners(20);
            SocketBeyondDouble.onopen = () => {
                console.log('Conectado ao Beyond Double');
                SocketBeyondDouble.send(SocketAuthStringOne);
                setInterval(() => {
                    SocketBeyondDouble.send(SocketAuthStringOne);
                }, 20000);
            };
            SocketBeyondDouble.onclose = function (e) {
                console.log('Socket beyond Double is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBeyondDouble.onerror = function (err) {
                console.error('Socket beyond Double  encountered error: ', err.message, 'Closing socket');
                SocketBeyondDouble.close();
            };
            let ç = [];
            SocketBeyondDouble.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var i = e.data.split('42["roulette ends",');
                    if (i.length != 2) {
                        return;
                    }
                    var doubleColor;
                    var doubleNumber = String(String(String(i[1])).split(',')[1]).split(':')[1];
                    if (Number(doubleNumber) > 0 && Number(doubleNumber) < 8) {
                        doubleColor = 'red';
                    }
                    if (Number(doubleNumber) > 7 && Number(doubleNumber) < 15) {
                        doubleColor = 'black';
                    }
                    if (Number(doubleNumber) == 0) {
                        doubleColor = 'white';
                    }
                    double(doubleColor, doubleNumber);
                }
            };
        }
        async function double(doubleColor, doubleNumber) {
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (doubleNumber === 0) {
                doubleNumber = '<img src="/assets/images/beyond.06d0155e.png">';
            }
            String(doubleHora);
            String(doubleNumber);
            if (doubleNumber === undefined) {
                return;
            }
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new BeyondDouble_1.default();
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
                Ws_2.default.io.emit('DoubleBeyond', {
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
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var date1 = day + '/' + month;
            var estatisticLength = (await Estatistic_1.default.query().where('plataforma', 'beyond')).length;
            if (estatisticLength === 0) {
                var newEstatistic = new Estatistic_1.default();
                newEstatistic.resultado = '0';
                newEstatistic.plataforma = 'beyond';
                newEstatistic.data = date1;
                newEstatistic.win = 0;
                newEstatistic.lose = 0;
                newEstatistic.save();
            }
            if (estatics.length === 0) {
                let estatic = await Estatistic_1.default.query().where('plataforma', 'beyond');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
            }
            if (estatics[0].data !== date1) {
                var i = await Estatistic_1.default.findByOrFail('plataforma', 'beyond');
                var texts = String(i.resultado).replace(/,/g, ' ').replace(/"/g, '').replace(/'/g, '').replace(/}/g, '').replace(/{/g, '').replace(/ /g, '');
                enviarMsgSugestao(texts);
                let esstatic = await Estatistic_1.default.findByOrFail('plataforma', 'beyond');
                esstatic.win = Number(whiteWin[0]) + 1;
                esstatic.resultado = `Resultados do dia: ${date1} \n\n`;
                esstatic.data = date1;
                esstatic.win = 0;
                esstatic.lose = 0;
                esstatic.save();
                estatics = [];
                whiteLose = [];
                whiteWin = [];
                resultado = [];
                let estatic = await Estatistic_1.default.query().where('plataforma', 'beyond');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
            }
            const hr = new Date();
            const HoraAtual = hr.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualFormat = Number(String(HoraAtual).split(':')[1]);
            const HoraAtualFormat2 = Number(String(String(HoraAtual).split(':')[1]).split('')[1]);
            if ((HoraAtual >= '23:30' && HoraAtual <= '23:59') && Sugestao.length == 0) {
                console.log('entrou 23:30 beyond');
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                whiteOpen = [];
                return;
            }
            if (String(Sugestao[0]).split('-')[0] == 'time') {
                let sugestaoHorario = String(Sugestao[0]).split('-')[1];
                if (HoraAtual >= sugestaoHorario) {
                    Sugestao = [];
                    Sugestao.push(selectWhiteHR[4]);
                    let texts = `⚪⚪ Possível Branco ⚪⚪\n\n\n ◾️DE: ${String(selectWhiteHR[4]).split('-')[0]} 🕓\n ◾️Até: ${String(selectWhiteHR[4]).split('-')[1]} 🕓\n\n\n✅ Win: ${whiteWin[0]} \n❌ Loss: ${whiteLose[0]}`;
                    enviarMsgSugestao(texts);
                }
            }
            let horaNewWhite = new Date();
            horaNewWhite.setMinutes(horaNewWhite.getMinutes() - 10);
            let horaNewWhiteProximo = horaNewWhite.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const dataOntem = new Date();
            dataOntem.setDate(dataOntem.getDate());
            var dataOntemFormatada = dataOntem.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', });
            let dia = String(dataOntemFormatada.split('/')[1]);
            let mes = String(dataOntemFormatada.split('/')[0]);
            let ano = String(dataOntemFormatada.split('/')[2]);
            dataOntemFormatada = ano + '-' + mes + '-' + dia;
            if (doubleColor == 'white' && Sugestao.length == 0) {
                console.log('entrou beyond white');
                let cont = 6;
                newSugestao(cont);
            }
            if ((String(Sugestao[0]).split('-')[0] == 'time') == false && String(Sugestao[0]).split('-').length == 2) {
                if (HoraAtual >= LossSelectWhite[0] && primeiroWin[0] == 'win') {
                    Sugestao = [];
                    selectWhiteHR = [];
                    primeiroWin = [];
                    LossSelectWhite = [];
                    CancelSelectWhite = [];
                    return;
                }
                if (HoraAtual > String(selectWhiteHR[4]).split('-')[1] && primeiroWin[0] != 'win') {
                    sugestaoLose();
                    return;
                }
                if (doubleColor == 'white') {
                    if (HoraAtual == CancelSelectWhite[3]) {
                        sugestaoCancel();
                        return;
                    }
                    if (String(HoraAtual) >= String(selectWhiteHR[4]).split('-')[0] && String(HoraAtual) && String(selectWhiteHR[4]).split('-')[1]) {
                        sugestaoWin();
                        return;
                    }
                }
            }
            function timeEspera() {
                if (String(HoraAtualFormat2) == '6' || String(HoraAtualFormat2) == '7') {
                    time1 = [];
                    time2 = [];
                    time3 = [];
                    time1.push('stop');
                    time2.push('stop');
                    time3.push('stop');
                }
            }
            async function newSugestao(cont) {
                var soma;
                soma = cont;
                let horarioInicialSugestaoNew = new Date();
                horarioInicialSugestaoNew.setMinutes(horarioInicialSugestaoNew.getMinutes() + soma);
                let horarioInicialSugestao = horarioInicialSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horarioFinalSugestaoNew = new Date();
                horarioFinalSugestaoNew.setMinutes(horarioFinalSugestaoNew.getMinutes() + soma + 6);
                let horarioFinalSugestao = horarioFinalSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario4minutosAntesSugestaoNew = new Date();
                horario4minutosAntesSugestaoNew.setMinutes(horario4minutosAntesSugestaoNew.getMinutes() + soma - 4);
                let horario4minutosAntesSugestao = horario4minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario3minutosAntesSugestaoNew = new Date();
                horario3minutosAntesSugestaoNew.setMinutes(horario3minutosAntesSugestaoNew.getMinutes() + soma - 3);
                let horario3minutosAntesSugestao = horario3minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario2minutosAntesSugestaoNew = new Date();
                horario2minutosAntesSugestaoNew.setMinutes(horario2minutosAntesSugestaoNew.getMinutes() + soma - 2);
                let horario2minutosAntesSugestao = horario2minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario1minutoAntesSugestaoNew = new Date();
                horario1minutoAntesSugestaoNew.setMinutes(horario1minutoAntesSugestaoNew.getMinutes() + soma - 1);
                let horario1minutoAntesSugestao = horario1minutoAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario1minutoDepoisSugestaoNew = new Date();
                horario1minutoDepoisSugestaoNew.setMinutes(horario1minutoDepoisSugestaoNew.getMinutes() + soma + 1);
                let horario1minutoDepoisSugestao = horario1minutoDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario2minutosDepoisSugestaoNew = new Date();
                horario2minutosDepoisSugestaoNew.setMinutes(horario2minutosDepoisSugestaoNew.getMinutes() + soma + 2);
                let horario2minutosDepoisSugestao = horario2minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario3minutosDepoisSugestaoNew = new Date();
                horario3minutosDepoisSugestaoNew.setMinutes(horario3minutosDepoisSugestaoNew.getMinutes() + soma + 3);
                let horario3minutosDepoisSugestao = horario3minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario4minutosDepoisSugestaoNew = new Date();
                horario4minutosDepoisSugestaoNew.setMinutes(horario4minutosDepoisSugestaoNew.getMinutes() + soma + 4);
                let horario4minutosDepoisSugestao = horario4minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario5minutosDepoisSugestaoNew = new Date();
                horario5minutosDepoisSugestaoNew.setMinutes(horario5minutosDepoisSugestaoNew.getMinutes() + soma + 5);
                let horario5minutosDepoisSugestao = horario5minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario6minutosDepoisSugestaoNew = new Date();
                horario6minutosDepoisSugestaoNew.setMinutes(horario6minutosDepoisSugestaoNew.getMinutes() + soma + 7);
                let horario6minutosDepoisSugestao = horario6minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario7minutosDepoisSugestaoNew = new Date();
                horario6minutosDepoisSugestaoNew.setMinutes(horario7minutosDepoisSugestaoNew.getMinutes() + soma + 8);
                let horario7minutosDepoisSugestao = horario7minutosDepoisSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                CancelSelectWhite.push(horario4minutosAntesSugestao);
                CancelSelectWhite.push(horario3minutosAntesSugestao);
                CancelSelectWhite.push(horario2minutosAntesSugestao);
                CancelSelectWhite.push(horario1minutoAntesSugestao);
                selectWhiteHR.push(horario4minutosAntesSugestao);
                selectWhiteHR.push(horario3minutosAntesSugestao);
                selectWhiteHR.push(horario2minutosAntesSugestao);
                selectWhiteHR.push(horario1minutoAntesSugestao);
                selectWhiteHR.push(horarioInicialSugestao + '-' + horarioFinalSugestao);
                selectWhiteHR.push(horario1minutoDepoisSugestao);
                selectWhiteHR.push(horario2minutosDepoisSugestao);
                selectWhiteHR.push(horario3minutosDepoisSugestao);
                selectWhiteHR.push(horario4minutosDepoisSugestao);
                selectWhiteHR.push(horario5minutosDepoisSugestao);
                selectWhiteHR.push(horario6minutosDepoisSugestao);
                LossSelectWhite.push(horario6minutosDepoisSugestao);
                LossSelectWhite.push(horario7minutosDepoisSugestao);
                primeiroHr = [];
                segundoHr = [];
                primeiroHr2 = [];
                segundoHr2 = [];
                try {
                    const dataOntem = new Date();
                    dataOntem.setDate(dataOntem.getDate() - 1);
                    var dataOntemFormatada = dataOntem.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    });
                    let dia = String(dataOntemFormatada.split('/')[1]);
                    let mes = String(dataOntemFormatada.split('/')[0]);
                    let ano = String(dataOntemFormatada.split('/')[2]);
                    dataOntemFormatada = ano + '-' + mes + '-' + dia;
                    const numWhiteOntem = await BeyondDouble_1.default
                        .query()
                        .where('double_cor', 'white')
                        .where('double_hora', '>=', horarioInicialSugestao)
                        .where('double_hora', '<=', horarioFinalSugestao)
                        .where('created_at', '>=', dataOntemFormatada + ' 00:00:00')
                        .where('created_at', '<', dataOntemFormatada + ' 23:59:59');
                    console.log('numWhiteOntem: ' + numWhiteOntem.length + ' ' + 'Sugestao Beyond: ' + horarioInicialSugestao);
                    if (numWhiteOntem.length >= 0) {
                        console.log('Sugestao Beyond: SUGESTAO CRIADA');
                        Sugestao.push('time' + '-' + horario4minutosAntesSugestao);
                    }
                    else {
                        selectWhiteHR = [];
                        Sugestao = [];
                        primeiroWin = [];
                        LossSelectWhite = [];
                        CancelSelectWhite = [];
                    }
                }
                catch (err) {
                    console.log('numWhiteOntem betbry: errrororororororororororo');
                    selectWhiteHR = [];
                    Sugestao = [];
                    primeiroWin = [];
                    LossSelectWhite = [];
                    CancelSelectWhite = [];
                    console.log(err);
                }
            }
            async function sugestaoCancel() {
                var texts = `🚫🚫 Entrada Cancelada:  ${Sugestao[0]} 🚫🚫`;
                enviarMsgSugestao(texts);
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
            }
            async function sugestaoWin() {
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'beyond');
                var texts = `🛑⚪⚪⚪ BRANCO ⚪⚪⚪🛑\n\n✅✅🤑🤑 ${HoraAtual} 🤑🤑✅✅\n\n◾️ Entrada : ${Sugestao[0]}`;
                enviarMsgSugestao(texts);
                estatic.win = Number(whiteWin[0]) + 1;
                estatic.resultado = resultado[0] + ',' + `WIN :⚪${Sugestao[0]} ✅ \n\n`;
                estatic.save();
                resultado.push(resultado[0] + ',' + `WIN :⚪${Sugestao[0]} ✅ \n\n`);
                resultado.shift();
                whiteWin.push(whiteWin[0] + 1);
                whiteWin.shift();
                primeiroWin.push('win');
                return;
            }
            async function sugestaoLose() {
                var texts = `❌ Loss :  ${Sugestao[0]} ❌`;
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'beyond');
                estatic.lose = Number(whiteLose[0]) + 1;
                estatic.resultado = resultado[0] + ',' + `Loss :  ${Sugestao[0]} ❌ \n\n`;
                estatic.save();
                resultado.push(resultado[0] + ',' + `Loss :  ${Sugestao[0]} ❌ \n\n`);
                resultado.shift();
                whiteLose.push(whiteLose[0] + 1);
                whiteLose.shift();
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                whiteOpen = [];
                enviarMsgSugestao(texts);
            }
            async function enviarMsgSugestao(texts) {
                const TOKEN = '5851255272:AAFUBmqiu-WDGDiOF3S5v41M9w68DUt-xlE';
                const chatId = -1001832660443;
                const text = texts;
                const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
                if (text.includes('⚪⚪ Possível Branco ⚪⚪')) {
                    bot.sendMessage(chatId, text + "\n", {
                        "reply_markup": {
                            "inline_keyboard": [
                                [{ "text": "Calcular Entradas ✏️", "url": "http://t.me/SuporteSpybetAdmin_bot" }],
                                [{ "text": "🔺 Acessar a Beyond 🔺", "url": "beyond.com/r/Q6lNJr" }]
                            ]
                        }
                    });
                }
                else {
                    bot.sendMessage(chatId, text);
                }
                bot.stopPolling();
            }
        }
        var whiteTotal = [];
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
        Ws_2.default.io.on('connection', (SocketBeyondDouble) => {
            SocketBeyondDouble.on('pingBD', (data) => {
                SocketBeyondDouble.emit('pongBD', data);
            });
            SocketBeyondDouble.on('qtJogosBeyondDouble', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BeyondDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BeyondDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (WhiteToday.length == 0 && RedToday.length == 0 && BlackToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        WhiteToday = [];
                        RedToday = [];
                        BlackToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var whiteToday = await BeyondDouble_1.default.query().where('double_cor', 'white').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var redToday = await BeyondDouble_1.default.query().where('double_cor', 'red').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var blackToday = await BeyondDouble_1.default.query().where('double_cor', 'black').where('created_at', '>=', dataHoje2 + ' 00:00:00');
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
                    Ws_2.default.io.emit('DoubleBeyond', {
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
            SocketBeyondDouble.on('beyondDoubleNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBeyondDouble_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBeyondDouble.on('beyondDoubleGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBeyondDouble_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('DoubleBeyond', { listPadrao2 });
                }
            });
            SocketBeyondDouble.once('beyondDoubleDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBeyondDouble_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBeyondDouble.on('PadroesShareBeyondDouble', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BeyondDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BeyondDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBeyondDouble_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBeyondDouble.emit('PadroesShareBeyondDoubleMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBeyondDouble.emit('PadroesShareBeyondDoubleMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BeyondDoubleController;
//# sourceMappingURL=BeyondDoubleController.js.map