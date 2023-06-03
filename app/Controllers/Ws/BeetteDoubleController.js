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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const iconv = require('iconv-lite');
const Estatistic_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Estatistic"));
class BeetteDoubleController {
    async BeetteDouble() {
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
                console.log('Socket beette Double is closed. Reconnect will be attempted in 1 second.', e.reason);
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
        async function whiteSugestion(doubleColor, doubleNumber) {
            if (doubleNumber === undefined) {
                return;
            }
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var date1 = day + '/' + month;
            if (estatics.length === 0) {
                let estatic = await Estatistic_1.default.query().where('plataforma', 'beette');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
            }
            if (estatics[0].data !== date1) {
                var i = await Estatistic_1.default.findByOrFail('plataforma', 'beette');
                var texts = String(i.resultado).replace(/,/g, ' ').replace(/"/g, '').replace(/'/g, '').replace(/}/g, '').replace(/{/g, '').replace(/ /g, '');
                enviarMsgSugestao(texts);
                let esstatic = await Estatistic_1.default.findByOrFail('plataforma', 'beette');
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
                let estatic = await Estatistic_1.default.query().where('plataforma', 'beette');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
            }
            const hr = new Date();
            const HoraAtual = hr.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualFormat = Number(String(HoraAtual).split(':')[1]);
            const HoraAtualFormat2 = Number(String(String(HoraAtual).split(':')[1]).split('')[1]);
            if (String(Sugestao[0]).split('-')[0] == 'time') {
                let sugestaoHorario = String(Sugestao[0]).split('-')[1];
                if (HoraAtual >= sugestaoHorario) {
                    Sugestao = [];
                    Sugestao.push(selectWhiteHR[4]);
                    let texts = `⚪⚪ Possível Branco ⚪⚪\n\n\n ◾️DE: ${String(selectWhiteHR[4]).split('-')[0]} 🕓\n ◾️Até: ${String(selectWhiteHR[4]).split('-')[1]} 🕓\n\n\n✅ Win: ${whiteWin[0]} \n❌ Loss: ${whiteLose[0]}`;
                    enviarMsgSugestao(texts);
                }
            }
            if (doubleColor == 'white' && String(HoraAtualFormat2) != '0' && Sugestao.length == 0) {
                whiteOpen = [];
                whiteOpen.push('open');
                return;
            }
            if (whiteOpen[0] == 'open' && doubleColor != 'white' && Sugestao.length == 0) {
                if (primeiroHr.length == 0) {
                    primeiroHr.push(doubleNumber);
                }
                else if (segundoHr.length == 0) {
                    segundoHr.push(doubleNumber);
                }
                else {
                    whiteOpen = [];
                    whiteOpen.push('true');
                }
            }
            if (String(HoraAtualFormat2) == '1') {
                primeiroHr = [];
                segundoHr = [];
                primeiroHr2 = [];
                segundoHr2 = [];
                whiteOpen = [];
            }
            if ((String(HoraAtualFormat2) == '0') && Sugestao.length == 0 && whiteOpen[0] == 'true') {
                if (doubleColor == 'white') {
                    primeiroHr = [];
                    segundoHr = [];
                    primeiroHr2 = [];
                    return;
                }
                else if (primeiroHr2.length == 0) {
                    primeiroHr2.push(doubleNumber);
                    return;
                }
                else {
                    newSugestao();
                }
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
            function newSugestao() {
                segundoHr2.push(doubleNumber);
                if (primeiroHr.length == 0 || segundoHr.length == 0 || primeiroHr2.length == 0 || segundoHr2.length == 0) {
                    primeiroHr = [];
                    segundoHr = [];
                    primeiroHr2 = [];
                    segundoHr2 = [];
                    return;
                }
                var soma1;
                var soma2;
                var soma;
                let segundoHrNumber = Number(segundoHr[0]);
                let primeiroHrNumber = Number(primeiroHr[0]);
                let primeiroHr2Number = Number(primeiroHr2[0]);
                let segundoHr2Number = Number(doubleNumber);
                if (segundoHrNumber > primeiroHrNumber) {
                    soma1 = segundoHrNumber - primeiroHrNumber;
                }
                else {
                    soma1 = primeiroHrNumber - segundoHrNumber;
                }
                if (segundoHr2Number > primeiroHr2Number) {
                    soma2 = (segundoHr2Number - primeiroHr2Number);
                }
                else {
                    soma2 = (primeiroHr2Number - segundoHr2Number);
                }
                if (soma1 > soma2) {
                    soma = soma1 + soma2;
                }
                else {
                    soma = soma2 + soma1;
                }
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
                Sugestao.push('time' + '-' + horario4minutosAntesSugestao);
                console.log('Sugestao Beette: ' + Sugestao);
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
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'beette');
                var texts = `🟡⚪⚪⚪ BRANCO ⚪⚪⚪🟡\n\n✅✅🤑🤑 ${HoraAtual} 🤑🤑✅✅\n\n◾️ Entrada : ${Sugestao[0]}`;
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
                var texts = `❌😭 Loss :  ${Sugestao[0]} 😭❌`;
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'beette');
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
                enviarMsgSugestao(texts);
            }
            async function enviarMsgSugestao(texts) {
                const TOKEN = '5957823988:AAGwS3dZZv43fznZI8gAXTUE7A86ckvdPNA';
                const chatId = -1001740298931;
                const text = texts;
                const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
                if (text.includes('⚪⚪ Possível Branco ⚪⚪')) {
                    bot.sendMessage(chatId, text + "\n", {
                        "reply_markup": {
                            "inline_keyboard": [
                                [{ "text": "Calcular Entradas ✏️", "url": "http://t.me/SuporteSpybetAdmin_bot" }],
                                [{ "text": "🔸 Acessar a Beette 🔸", "url": "https://beette.com/r/h8k8q4wn4g31vi0t" }]
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
exports.default = BeetteDoubleController;
//# sourceMappingURL=BeetteDoubleController.js.map