"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const BetbryFruit_1 = __importDefault(require("../../Models/BetbryFruit"));
const PadroesBetbryFruit_1 = __importDefault(require("../../Models/PadroesBetbryFruit"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const Estatistic_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Estatistic"));
const puppeteer = require('puppeteer');
class BetbryFruitController {
    async BetbryFruit() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        open();
        function open() {
            var SocketBetbryFruit = new Websocket('wss://aws3.rescdns.com/gs2/listen?module=jU86x7bq');
            SocketBetbryFruit.setMaxListeners(20);
            SocketBetbryFruit.onopen = () => {
                console.log('Conectado ao Betbry Fruit');
                SocketBetbryFruit.send(JSON.stringify({ "data": "switch-module", "modules": ["jU86x7bq"] }));
                setTimeout(() => {
                    SocketBetbryFruit.send('{"data":"switch-module","modules":["jU86x7bq","fruitBoumb","global"]}');
                }, 500);
            };
            SocketBetbryFruit.onclose = function (e) {
                console.log('Socket betbry Fruit is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketBetbryFruit.onerror = function (err) {
                console.error('Socket betbry Fruit  encountered error: ', err.message, 'Closing socket');
                SocketBetbryFruit.close();
            };
            let ç = [];
            let refund = [];
            SocketBetbryFruit.onmessage = (e) => {
                if (!e) {
                    return;
                }
                else {
                    var i = String(e.data.split('{"modules":["fruitBoumb"],"data":')).replace('\\', '');
                    var i2 = i.split(':');
                    if (String(String(String(String(i2[14]).split(',')[0]).replace('\\', '').replace('"', '')).split('"')[0]).replace('\\', '') == 'FINISHED') {
                        var ft1 = String(String(i2[12]).split(',')[0]).replace('\\', '').replace('"', '')[0];
                        var ft2 = String(String(i2[12]).split(',')[0]).replace('\\', '').replace('"', '')[1];
                        var fruit = ft1 + ft2;
                        double(fruit);
                    }
                    return;
                }
            };
        }
        async function double(fruit) {
            let updatedouble = new Date();
            let Hora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new BetbryFruit_1.default();
                newdouble.betbry_fruit = fruit;
                newdouble.betbry_hora = Hora;
                newdouble.useTransaction(trx);
                await newdouble.save();
            });
            setTimeout(() => {
                Ws_2.default.io.emit('FruitBetbry', {
                    betbry_fruit: fruit,
                    betbry_hora: Hora
                });
            }, 2000);
        }
        async function whiteSugestion(doubleColor) {
            var today = new Date();
            var day = today.getDate();
            var month = today.getMonth() + 1;
            var date1 = day + '/' + month;
            var estatisticLength = (await Estatistic_1.default.query().where('plataforma', 'betbryFruit')).length;
            if (estatisticLength === 0) {
                console.log('entrou estatisticLength === 0');
                var newEstatistic = new Estatistic_1.default();
                newEstatistic.resultado = '0';
                newEstatistic.plataforma = 'betbryFruit';
                newEstatistic.data = date1;
                newEstatistic.win = 0;
                newEstatistic.lose = 0;
                newEstatistic.entradas = 0;
                newEstatistic.save();
                whiteTotal = [];
            }
            if (estatics.length === 0) {
                console.log('entrou estatics.length === 0');
                let estatic = await Estatistic_1.default.query().where('plataforma', 'betbryFruit');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
                whiteTotal = [];
            }
            if (estatics[0].data !== date1) {
                console.log('entrou estatic[0].data !== date1');
                var i = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                var texts = String(i.resultado).replace(/,/g, ' ').replace(/"/g, '').replace(/'/g, '').replace(/}/g, '').replace(/{/g, '').replace(/ /g, '');
                enviarMsgSugestao(texts);
                let esstatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                esstatic.win = Number(whiteWin[0]) + 1;
                esstatic.resultado = `Resultados do dia: ${date1} \n\n`;
                esstatic.data = date1;
                esstatic.win = 0;
                esstatic.lose = 0;
                esstatic.entradas = 0;
                esstatic.save();
                estatics = [];
                whiteLose = [];
                whiteWin = [];
                resultado = [];
                whiteTotal = [];
                let estatic = await Estatistic_1.default.query().where('plataforma', 'betbryFruit');
                whiteLose.push(Number(estatic[0].$attributes.lose));
                whiteWin.push(Number(estatic[0].$attributes.win));
                estatics.push(estatic[0].$attributes);
                resultado.push(estatic[0].$attributes.resultado);
            }
            const hr = new Date();
            const hr2 = new Date();
            const hr3 = new Date();
            hr2.setMinutes(hr2.getMinutes() + 5);
            hr3.setSeconds(hr3.getSeconds() + 13);
            const HoraAtual10min = hr2.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtual = hr.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtual2 = hr3.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const HoraAtualFormat = Number(String(HoraAtual).split(':')[1]);
            const HoraAtualFormat2 = Number(String(String(HoraAtual).split(':')[1]).split('')[1]);
            if ((HoraAtual >= '23:30' && HoraAtual <= '23:59') && Sugestao.length == 0) {
                console.log('entrou 23:30 betbryFruit');
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                whiteOpen = [];
                whiteTotal = [];
                return;
            }
            if (whiteTotal.length == 0) {
                whiteTotalZero();
            }
            if (String(Sugestao[0]).split('-')[0] == 'time') {
                let sugestaoHorario = String(Sugestao[0]).split('-')[1];
                if (HoraAtual >= sugestaoHorario) {
                    Sugestao = [];
                    Sugestao.push(String(selectWhiteHR[4]).split('-')[0]);
                    let texts = `🍉🍉  NOVA ENTRADA 🍉🍉 \n\n🍉x20 = 100% \n\n\n 💢HORA: ${String(selectWhiteHR[4]).split('-')[0]} 🕓💢   \n\n   💢PROXIMAS 22 PARTIDAS💢  \n\n✅ Win: ${whiteWin[0]} \n❌ Loss: ${whiteLose[0]}`;
                    enviarMsgSugestao(texts);
                }
            }
            while (whiteTotal[0] <= HoraAtual10min) {
                whiteTotal.shift();
            }
            if (time1 == 'block' && doubleColor == 'zs') {
                time1 = [];
            }
            if (Sugestao.length == 0 && whiteTotal[0] >= HoraAtual && time1 != 'block') {
                newSugestao();
            }
            if (String(HoraAtual) >= String(Sugestao[0]) && whiteOpen[0] != 'fim') {
                whiteOpen.shift();
                entrada.push(entrada[0] + 1);
                entrada.shift();
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                estatic.entradas = Number(estatic.entradas) + 1;
                estatic.save();
                if (doubleColor == 'zs' && whiteOpen[0] != 'fim') {
                    let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                    estatic.zs = Number(estatic.zs) + 1;
                    sugestaoWin();
                    entrada = [];
                    entrada.push(0);
                    Perdas = [];
                    Perdas.push(0);
                    Ganhos.push(Ganhos[0] + 20);
                    Ganhos.shift();
                    if (carteira[0] != 'ok') {
                        carteira.push(Number(carteira[0]) + 20);
                        carteira.shift();
                    }
                    if (Number(carteira[0]) >= 150) {
                        estatic.pt = Number(carteira[0]);
                        carteira = [];
                        carteira.push('ok');
                    }
                    estatic.save();
                    whiteOpen = [];
                    whiteOpen.push('fim');
                }
                if (doubleColor != 'zs' && whiteOpen[0] != 'fim') {
                    perdasCont();
                }
            }
            else if ((HoraAtual == CancelSelectWhite[2] || HoraAtual == CancelSelectWhite[3]) && doubleColor == 'zs') {
                sugestaoCancel();
                whiteLiberar = [];
            }
            else if (whiteOpen[0] == 'fim') {
                whiteOpen = [];
                if (primeiroWin[0] != 'win') {
                    sugestaoLose();
                    time1 = [];
                    time1.push('block');
                }
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                estatic.cm = Number(estatic.cm) + Number(Ganhos[0]);
                estatic.nm = Number(estatic.nm) + Number(Perdas[0]);
                entrada.push(0);
                entrada.shift();
                Ganhos.push(0);
                Ganhos.shift();
                if (carteira[0] != 'ok') {
                    carteira.push(carteira[0] - Number(Perdas[0]));
                    carteira.shift();
                }
                if (Number(carteira[0]) <= 0) {
                    estatic.pt = Number(carteira[0]);
                    carteira = [];
                    carteira.push('ok');
                }
                Perdas.push(0);
                Perdas.shift();
                estatic.save();
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                timeBlock = [];
                whiteOpen = [];
                contLoss = [];
            }
            async function whiteTotalZero() {
                let horaNewWhite2 = new Date();
                horaNewWhite2.setMinutes(horaNewWhite2.getMinutes() + 1);
                let horaNewWhiteProximo5min = horaNewWhite2.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const dataOntem = new Date();
                dataOntem.setDate(dataOntem.getDate());
                const oneMinuteFromNow = new Date();
                oneMinuteFromNow.setMinutes(oneMinuteFromNow.getMinutes() + 1);
                var data = new Date();
                data.setDate(data.getDate() - 1);
                var data2 = new Date();
                data2.setDate(data2.getDate() - 3);
                var ano = data.getFullYear();
                var mes = ("0" + (data.getMonth() + 1)).slice(-2);
                var dia = ("0" + data.getDate()).slice(-2);
                var ano2 = data2.getFullYear();
                var mes2 = ("0" + (data2.getMonth() + 1)).slice(-2);
                var dia2 = ("0" + data2.getDate()).slice(-2);
                var dataHoje2 = ano + "-" + mes + "-" + dia;
                var dataOntem2 = ano2 + "-" + mes2 + "-" + dia2;
                let hr1 = horaNewWhiteProximo5min.split(':');
                let hr2 = `${hr1[0]}:${hr1[1]}`;
                try {
                    var whites = await BetbryFruit_1.default.query().where('betbry_fruit', 'xg').where('created_at', '>=', `${dataOntem2} 00:00:00`).where('created_at', '<=', `${dataOntem2} 23:59:59`).orderBy('betbry_hora');
                    whites.forEach(function (el) {
                        whiteTotal.push(el.betbry_hora);
                    });
                    console.log('whiteTotal ultimo', whiteTotal[whiteTotal.length - 1]);
                }
                catch (err) {
                    console.log(err);
                }
            }
            async function perdasCont() {
                Perdas.push(Perdas[0] + ValoresEntrada[entrada[0]]);
                Perdas.shift();
            }
            function gain() {
                var texts = `📌 PRIMEIRO GAIN ‼️‼️:  ${String(Sugestao[0]).split('-')[0]} 📌`;
                enviarMsgSugestao(texts);
            }
            function liberarEntrada() {
                var texts = `💢 Entrada Liberada ‼️‼️:  ${String(Sugestao[0]).split('-')[0]} 💢`;
                enviarMsgSugestao(texts);
            }
            async function newSugestao() {
                let horario = new Date();
                let horarioString = String(whiteTotal[0]);
                let horarioSplit = horarioString.split(":");
                horario.setHours(horarioSplit[0]);
                horario.setMinutes(horarioSplit[1]);
                horario.setMinutes(horario.getMinutes() - 3);
                let horarioNovo = horario.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ":" + horario.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
                let diferencaMinuto = Number(diferencaMinutos(HoraAtual, horarioNovo));
                if (diferencaMinuto == 6) {
                    createSugestao(horarioNovo);
                }
                function diferencaMinutos(horario1, horario2) {
                    const [horas1, minutos1] = horario1.split(':');
                    const minutosTotais1 = parseInt(horas1) * 60 + parseInt(minutos1);
                    const [horas2, minutos2] = horario2.split(':');
                    const minutosTotais2 = parseInt(horas2) * 60 + parseInt(minutos2);
                    let diferencaMinutos;
                    if (minutosTotais2 < minutosTotais1) {
                        diferencaMinutos = (minutosTotais2 + 1440) - minutosTotais1;
                    }
                    else {
                        diferencaMinutos = minutosTotais2 - minutosTotais1;
                    }
                    return diferencaMinutos;
                }
            }
            function createSugestao(horarioNovo) {
                let soma = 0;
                let horarioInicialSugestaoNew = new Date();
                horarioInicialSugestaoNew.setMinutes(horarioInicialSugestaoNew.getMinutes() + soma);
                let horarioInicialSugestao = horarioInicialSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horarioFinalSugestaoNew = new Date();
                horarioFinalSugestaoNew.setMinutes(horarioFinalSugestaoNew.getMinutes() + soma + 6);
                let horarioFinalSugestao = horarioFinalSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario4minutosAntesSugestaoNew = new Date();
                horario4minutosAntesSugestaoNew.setMinutes(horario4minutosAntesSugestaoNew.getMinutes() + 2);
                let horario4minutosAntesSugestao = horario4minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario3minutosAntesSugestaoNew = new Date();
                horario3minutosAntesSugestaoNew.setMinutes(horario3minutosAntesSugestaoNew.getMinutes() + 3);
                let horario3minutosAntesSugestao = horario3minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario2minutosAntesSugestaoNew = new Date();
                horario2minutosAntesSugestaoNew.setMinutes(horario2minutosAntesSugestaoNew.getMinutes() + 4);
                let horario2minutosAntesSugestao = horario2minutosAntesSugestaoNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                let horario1minutoAntesSugestaoNew = new Date();
                horario1minutoAntesSugestaoNew.setMinutes(horario1minutoAntesSugestaoNew.getMinutes() + 5);
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
                whiteLiberar.push('ok');
                selectWhiteHR.push(horarioNovo + '-' + horarioNovo);
                selectWhiteHR.push(horario1minutoDepoisSugestao);
                selectWhiteHR.push(horario2minutosDepoisSugestao);
                selectWhiteHR.push(horario3minutosDepoisSugestao);
                selectWhiteHR.push(horario4minutosDepoisSugestao);
                selectWhiteHR.push(horario5minutosDepoisSugestao);
                selectWhiteHR.push(horario6minutosDepoisSugestao);
                LossSelectWhite.push(horario1minutoDepoisSugestao);
                LossSelectWhite.push(horario2minutosDepoisSugestao);
                primeiroHr = [];
                segundoHr = [];
                primeiroHr2 = [];
                segundoHr2 = [];
                whiteOpen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 'fim'];
                Sugestao.push('time' + '-' + horarioInicialSugestao);
            }
            async function sugestaoCancel() {
                var texts = `🚫🚫 Entrada Cancelada:  ${Sugestao[0]} 🚫🚫`;
                enviarMsgSugestao(texts);
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                whiteOpen = [];
            }
            async function sugestaoWin() {
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                let frut;
                let frut2;
                if (doubleColor == 'cm') {
                    frut = 'WIN :🍓';
                    frut2 = '🍓';
                }
                if (doubleColor == 'nm') {
                    frut = 'WIN :🍋';
                    frut2 = '🍋';
                }
                if (doubleColor == 'pt') {
                    frut = 'WIN :🍇';
                    frut2 = '🍇';
                }
                if (doubleColor == 'xg') {
                    frut = 'WIN :🍉';
                    frut2 = '🍉';
                }
                if (doubleColor == 'zs') {
                    frut = 'WIN :💎';
                    frut2 = '💎';
                }
                if (doubleColor == 'ld') {
                    frut = 'WIN :🛎';
                    frut2 = '🛎';
                }
                var texts = `🟥${frut2}${frut2}${frut2} GREEEEEENN ${frut2}${frut2}${frut2}🟥\n\n✅✅🤑🤑 ${HoraAtual} 🤑🤑✅✅`;
                enviarMsgSugestao(texts);
                estatic.win = Number(whiteWin[0]) + 1;
                estatic.resultado = resultado[0] + ',' + `WIN :${Sugestao[0]} ✅ \n\n`;
                estatic.save();
                resultado.push(resultado[0] + ',' + `WIN :${Sugestao[0]} ✅ \n\n`);
                resultado.shift();
                whiteWin.push(whiteWin[0] + 1);
                whiteWin.shift();
                primeiroWin.push('win');
                return;
            }
            async function sugestaoLose() {
                var texts = `❌ Loss :  ${Sugestao[0]} ❌`;
                let estatic = await Estatistic_1.default.findByOrFail('plataforma', 'betbryFruit');
                estatic.lose = Number(whiteLose[0]) + 1;
                estatic.resultado = resultado[0] + ',' + `Loss :  ${Sugestao[0]} ❌ \n\n`;
                estatic.save();
                resultado.push(resultado[0] + ',' + `Loss :  ${Sugestao[0]} ❌ \n\n`);
                resultado.shift();
                whiteLose.push(whiteLose[0] + 1);
                whiteLose.shift();
                timeBlock = [];
                timeBlock.push(HoraAtual10min);
                Sugestao = [];
                selectWhiteHR = [];
                primeiroWin = [];
                LossSelectWhite = [];
                CancelSelectWhite = [];
                enviarMsgSugestao(texts);
            }
            async function enviarMsgSugestao(texts) {
                const TOKEN = '5709615371:AAHzH-8oBatGKj27DcNsDeh0TSiSV8nzw2U';
                const chatId = -1001850625505;
                const text = texts;
                const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
                if (text.includes('🍉🍉🍉  NOVA ENTRADA 🍉🍉🍉')) {
                    bot.sendMessage(chatId, text + "\n", {
                        "reply_markup": {
                            "inline_keyboard": [
                                [{ "text": "Calcular Entradas ✏️", "url": "http://t.me/SuporteSpybetAdmin_bot" }],
                                [{ "text": "♦️ Acessar a Betbry ♦️", "url": "betbry.com/r/Q6lNJr" }],
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
        var whiteLiberar = [];
        var contLoss = [0];
        var primeiroWin = [];
        var Sugestao = [];
        var whiteWin = [];
        var whiteLose = [];
        var estatics = [];
        var resultado = [];
        var Ganhos = [0];
        var Perdas = [0];
        var ValoresEntrada = [0, 1, 1.1, 1.15, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.75, 2.9, 3, 3.2, 3.5];
        var ValorGanhoEntrada = [0, 14, 15.12, 16.10, 17.22, 18.90, 19.88, 21.42, 22.82, 24.5, 26.32, 28, 30.1, 32.62, 35, 36.96, 39.48, 43.4, 45.5, 49, 53.2];
        var entrada = [0];
        var primeiroHr = [];
        var segundoHr = [];
        var primeiroHr2 = [];
        var segundoHr2 = [];
        var carteira = [100];
        var pgToday = [];
        var nmToday = [];
        var ldToday = [];
        var xyToday = [];
        var ptToday = [];
        var cmToday = [];
        var zsToday = [];
        var xgToday = [];
        var DataEstatisticas = [];
        Ws_2.default.io.on('connection', (SocketBetbryFruit) => {
            SocketBetbryFruit.on('pingBD', (data) => {
                SocketBetbryFruit.emit('pongBD', data);
            });
            SocketBetbryFruit.on('qtJogosBetbryFruit', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await BetbryFruit_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await BetbryFruit_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (pgToday.length == 0 && nmToday.length == 0 && ldToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        pgToday = [];
                        nmToday = [];
                        ldToday = [];
                        xyToday = [];
                        ptToday = [];
                        cmToday = [];
                        zsToday = [];
                        xgToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var pgTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'pg').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var nmTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'nm').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var ldTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'ld').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var xyTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'xy').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var ptTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'pt').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var cmTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'cm').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var zsTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'zs').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var xgTodays = await BetbryFruit_1.default.query().where('betbry_fruit', 'xg').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        pgToday.push(pgTodays.length);
                        nmToday.push(nmTodays.length);
                        ldToday.push(ldTodays.length);
                        xyToday.push(xyTodays.length);
                        ptToday.push(ptTodays.length);
                        cmToday.push(cmTodays.length);
                        zsToday.push(zsTodays.length);
                        xgToday.push(xgTodays.length);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            betbry_fruit: item.betbry_fruit,
                            betbry_hora: item.betbry_hora
                        };
                    });
                    Ws_2.default.io.emit('FruitBetbry', {
                        DataEstatisticas: DataEstatisticas[0],
                        pgToday: pgToday[0],
                        nmToday: nmToday[0],
                        ldToday: ldToday[0],
                        xyToday: xyToday[0],
                        ptToday: ptToday[0],
                        cmToday: cmToday[0],
                        zsToday: zsToday[0],
                        xgToday: xgToday[0],
                        qtJogos: quantidadeJogos,
                        list: list2.map(item => {
                            return {
                                id: item.id,
                                betbry_fruit: item.betbry_fruit,
                                betbry_hora: item.betbry_hora
                            };
                        })
                    });
                }
            });
            SocketBetbryFruit.on('betbryFruitNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesBetbryFruit_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketBetbryFruit.on('betbryFruitGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesBetbryFruit_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('FruitBetbry', { listPadrao2 });
                }
            });
            SocketBetbryFruit.once('betbryFruitDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesBetbryFruit_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketBetbryFruit.on('PadroesShareBetbryFruit', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                BetbryFruit(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function BetbryFruit(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesBetbryFruit_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketBetbryFruit.emit('PadroesShareBetbryFruitMsg', { error: 'Padrão já compartilhado' });
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
                        SocketBetbryFruit.emit('PadroesShareBetbryFruitMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = BetbryFruitController;
//# sourceMappingURL=BetbryFruitController.js.map