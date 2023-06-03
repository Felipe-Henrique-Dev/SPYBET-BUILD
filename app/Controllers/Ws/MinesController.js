"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const Af2l1p3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Af2l1p3eAso3a532x1nib"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const { Telegraf } = require('telegraf');
class MinesController {
    async Mines() {
        Ws_1.default.boot();
        Ws_2.default.io.on('connection', (Mines) => {
            Mines.on('mines', async (data) => {
                var newJogo = [];
                var alljogos = ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5", "c1", "c2", "c3", "c4", "c5", "d1", "d2", "d3", "d4", "d5", "e1", "e2", "e3", "e4", "e5"];
                let jogo11 = data.jogo1;
                let jogo22 = data.jogo2;
                let jogo33 = data.jogo3;
                let jogo44 = data.jogo4;
                let jogo55 = data.jogo5;
                var jogoTotal = jogo11.concat(jogo22, jogo33, jogo44, jogo55);
                if (JSON.stringify(jogo11) == JSON.stringify(jogo22) && JSON.stringify(jogo22) == JSON.stringify(jogo33) && JSON.stringify(jogo33) == JSON.stringify(jogo44)) {
                    newJogo = [];
                    Mines.emit('minesNewJogo2', newJogo);
                    return;
                }
                var excluir = [];
                for (let i = 0; i < jogoTotal.length; i++) {
                    var jogoRestante = jogoTotal.filter((item) => item != jogoTotal[i]);
                    alljogos.splice(alljogos.indexOf(jogoTotal[i]), 1);
                }
                function generateNewJogo(length = 4) {
                    alljogos.sort(() => Math.random() - 0.5);
                    return alljogos.slice(0, length);
                }
                let generateJogo = [];
                generateJogo.push(generateNewJogo(4));
                newJogo = newJogo.concat(generateJogo[0]);
                if (newJogo.length < 4) {
                    newJogo = [];
                    Mines.emit('minesNewJogo2', newJogo);
                    return;
                }
                Mines.emit('minesNewJogo', newJogo);
            });
        });
    }
    async NewBots() {
        const TOKEN = '5915781853:AAE2NR8yeymDCGMyw6nsqSA_mNQt95zIXGI';
        const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: { interval: 1000 } });
        const UserStatus = {};
        const lastMessageTime = {};
        async function updateTelegram(chatId, email) {
            try {
                let userTelegram = await User_1.default.findByOrFail('email', email);
                const dia = new Date();
                dia.setHours(dia.getHours() + 24);
                const mes = (dia.getMonth() + 1).toString().padStart(2, '0');
                const diaMaisUm = dia.getDate() + '/' + mes + '/' + dia.getFullYear();
                const hora = new Date().getHours().toFixed() + ':' + new Date().getMinutes().toFixed();
                const diaHora = diaMaisUm + ' ' + hora;
                userTelegram.telegram = chatId;
                userTelegram.telegram_plan = diaHora;
                await userTelegram.save();
                delete UserStatus[chatId];
                UserStatus[chatId] = 0;
                bot.sendMessage(chatId, 'Email vinculado com sucesso. Para começar, digite o valor do seu Stop Loss:');
            }
            catch (err) {
                bot.sendMessage(chatId, 'Email não cadastrado em nosso site (www.spybet.com.br). Para utilizar o bot, cadastre-se:', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Cadastrar-se', url: 'http://t.me/SuporteSpybet_bot' }]
                        ]
                    }
                });
            }
        }
        let now = new Date();
        let HoraAtual = now.toISOString().slice(0, 19).replace('T', ' ');
        function removeInactiveUsers() {
            for (let i = 0; i < Object.keys(lastMessageTime).length; i++) {
                const lastMessageDate = lastMessageTime[Object.keys(lastMessageTime)[i]];
                const chatId = Object.keys(lastMessageTime)[i];
                if (String(HoraAtual) == String(lastMessageDate)) {
                    bot.sendMessage(chatId, 'Conversa encerrada devido à inatividade. Para reiniciar digite /start');
                    delete UserStatus[chatId];
                    delete lastMessageTime[chatId];
                }
            }
        }
        setInterval(removeInactiveUsers, 60 * 1000);
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            let now = new Date();
            let fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
            let HoraAtual = fifteenMinutesFromNow.toISOString().slice(0, 19).replace('T', ' ');
            lastMessageTime[chatId] = HoraAtual;
            if (msg.text == '/start') {
                getUser(chatId);
                async function getUser(chatId) {
                    try {
                        let user = await User_1.default.findByOrFail('telegram', chatId);
                        UserStatus[chatId] = 0;
                        bot.sendMessage(chatId, 'Olá, sou sua calculadora de apostas. Para começar, digite o valor do seu Stop Loss:');
                    }
                    catch (err) {
                        bot.sendMessage(chatId, 'Você ainda não está registrado em nosso site (www.spybet.com.br). O acesso a calculadora e ao site são gratuitos, cadastre-se para continuar.', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Cadastrar-se', url: 'http://t.me/SuporteSpybet_bot' }]
                                ]
                            }
                        });
                        bot.sendMessage(chatId, 'Se já estiver cadastrado, informe o email cadastrados no site para que possamos liberar o acesso ao bot:');
                        UserStatus[chatId] = { 'naovinculado': true };
                        return;
                    }
                }
            }
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (emailRegex.test(msg.text) && UserStatus[chatId].naovinculado == true) {
                let user = User_1.default.findBy('email', msg.text);
                if (user == null) {
                    bot.sendMessage(chatId, 'Email não cadastrado em nosso site (www.spybet.com.br). Para utilizar o bot, cadastre-se:', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Cadastrar-se', url: 'http://t.me/SuporteSpybet_bot' }]
                            ]
                        }
                    });
                    return;
                }
                else {
                    updateTelegram(chatId, msg.text);
                    return;
                }
            }
            else if (UserStatus[chatId].naovinculado == true) {
                bot.sendMessage(chatId, 'Email inválido. Digite novamente:');
                return;
            }
            if (UserStatus[chatId] == 0 && msg.text != '/start') {
                let i = Number(msg.text);
                let i2 = `${i}`;
                if (i2 == 'NaN') {
                    bot.sendMessage(chatId, 'Digite um valor válido');
                    return;
                }
                else {
                    UserStatus[chatId] = { valorSL: msg.text };
                    bot.sendMessage(chatId, 'O valor do seu Stop Loss é: R$' + UserStatus[chatId].valorSL + '\n\n', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '◾️ Sim ◾️', callback_data: 'simSL' }, { text: '▫️ Não ▫️', callback_data: 'naoSL' }]
                            ]
                        }
                    });
                }
            }
            bot.on('callback_query', (msg) => {
                if (msg.data != 'naoSL' && msg.data != 'simSL' && UserStatus[chatId].statusSL != 'sim') {
                    UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 0 };
                    bot.sendMessage(chatId, 'Escolha uma das opções abaixo: \n\n', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '◾️ Sim ◾️', callback_data: 'simSL' }, { text: '▫️ Não ▫️', callback_data: 'naoSL' }]
                            ]
                        }
                    });
                }
                else if (msg.data == 'naoSL' && (UserStatus[chatId].valorSL != undefined || UserStatus[chatId].statusSL == 0)) {
                    UserStatus[chatId] = 0;
                    bot.sendMessage(chatId, 'Digite novamente o valor do seu Stop Loss: \n\n');
                }
                else if (msg.data == 'simSL' && (UserStatus[chatId].statusSL == undefined || UserStatus[chatId].statusSL == 0)) {
                    UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim' };
                    if (UserStatus[chatId].valorSL < 102) {
                        bot.sendMessage(chatId, 'Valores abaixo de R$100,00 só podemos utilizar sem gale.\n\n Sem Gale: Quer dizer que você ira apostar um valor fixo, focando na quantidade de acertos \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Sem Gale', callback_data: 'semGale' }]
                                ],
                            }
                        });
                        return;
                    }
                    else {
                        bot.sendMessage(chatId, 'Com Gale ou sem Gale? \n\nCom Gale: Quer dizer que você ira dobrar o valor da primeira entrada para cobrir prejuizo e ter lucro\n\n Sem Gale: Quer dizer que você ira apostar um valor fixo, focando na quantidade de acertos \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Com Gale', callback_data: 'comGale' }, { text: 'Sem Gale', callback_data: 'semGale' }]
                                ],
                            }
                        });
                    }
                }
                else if (msg.data == 'comGale' && UserStatus[chatId].statusSL == 'sim' && (UserStatus[chatId].gale != 'comGale' || UserStatus[chatId].gale == undefined)) {
                    UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: 'comGale' };
                    bot.sendMessage(chatId, 'Quantos gale? \n\n', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '1 Gale', callback_data: '1Gale' }, { text: '2 Gale', callback_data: '2Gale' }],
                            ]
                        }
                    });
                }
                else if (UserStatus[chatId].gale == 'comGale' && ((msg.data == '1Gale' || msg.data == '2Gale') || (msg.data == 'crescente' || msg.data == 'decrecente' || msg.data == 'fixo')) && (UserStatus[chatId].galeQTD == undefined || UserStatus[chatId].galeLucro == undefined)) {
                    if ((msg.data == '1Gale' || msg.data == '2Gale') && UserStatus[chatId].galeQTD == undefined) {
                        UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: 'comGale', galeQTD: msg.data };
                        bot.sendMessage(chatId, 'Lucro crescente,decrecente ou fixo? \n\n Lucro Crescente: Ex- Primeira entrada R$10,00 de lucro ultima entrada R$20,00 de lucro \n\n Lucro Decrecente: Ex- Primeira entrada R$20,00 de lucro ultima entrada R$10,00 de lucro \n\n Lucro Fixo: Ex- Primeira entrada R$10,00 de lucro ultima entrada R$10,00 de lucro \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Crescente', callback_data: 'crescente' }, { text: 'Decrecente', callback_data: 'decrecente' }, { text: 'Fixo', callback_data: 'fixo' }]
                                ]
                            }
                        });
                    }
                    else if ((msg.data == 'crescente' || msg.data == 'decrecente' || msg.data == 'fixo') && (UserStatus[chatId].galeQTD == '1Gale' || UserStatus[chatId].galeQTD == '2Gale') && UserStatus[chatId].galeLucro == undefined) {
                        UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: UserStatus[chatId].gale, galeQTD: UserStatus[chatId].galeQTD, galeLucro: msg.data };
                        bot.sendMessage(chatId, 'Você deseja que os calculos sejam calculados com base no robô SPYBET?  (multiplicador 14X) \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '◾️ Sim ◾️', callback_data: 'simRobo' }, { text: '▫️ Não ▫️', callback_data: 'naoRobo' }]
                                ]
                            }
                        });
                    }
                }
                else if (msg.data == 'semGale' && UserStatus[chatId].statusSL == 'sim' && (UserStatus[chatId].gale != 'semGale' || UserStatus[chatId].gale == undefined)) {
                    UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: 'semGale' };
                    bot.sendMessage(chatId, 'Lucro crescente,decrecente ou fixo? \n\n Lucro Crescente: Ex- Primeira entrada R$10,00 de lucro ultima entrada R$20,00 de lucro \n\n Lucro Decrecente: Ex- Primeira entrada R$20,00 de lucro ultima entrada R$10,00 de lucro \n\n Lucro Fixo: Ex- Primeira entrada R$10,00 de lucro ultima entrada R$10,00 de lucro \n\n', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: 'Crescente', callback_data: 'crescente' }, { text: 'Decrecente', callback_data: 'decrecente' }, { text: 'Fixo', callback_data: 'fixo' }]
                            ]
                        }
                    });
                }
                else if (UserStatus[chatId].gale == 'semGale' && ((msg.data == 'crescente' || msg.data == 'decrecente' || msg.data == 'fixo') || (msg.data == '1ENT' || msg.data == '2ENT' || msg.data == '3ENT' || msg.data == '4ENT' || msg.data == '5ENT')) && (UserStatus[chatId].galeLucro == undefined || UserStatus[chatId].galeQTDEnt == undefined)) {
                    if ((msg.data == 'decrecente' || msg.data == 'fixo' || msg.data == 'crescente') && UserStatus[chatId].galeLucro == undefined) {
                        UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: 'semGale', galeLucro: msg.data };
                        bot.sendMessage(chatId, 'Em quantas entradas você deseja que divida o valor do seu Stop Loss? \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '1', callback_data: '1ENT' }, { text: '2', callback_data: '2ENT' }, { text: '3', callback_data: '3ENT' }, { text: '4', callback_data: '4ENT' }, { text: '5', callback_data: '5ENT' }]
                                ]
                            }
                        });
                    }
                    else if ((msg.data == '1ENT' || msg.data == '2ENT' || msg.data == '3ENT' || msg.data == '4ENT' || msg.data == '5ENT') && UserStatus[chatId].galeQTDEnt == undefined) {
                        UserStatus[chatId] = { valorSL: UserStatus[chatId].valorSL, statusSL: 'sim', gale: 'semGale', galeQTD: UserStatus[chatId].galeQTD, galeLucro: UserStatus[chatId].galeLucro, galeQTDEnt: msg.data };
                        bot.sendMessage(chatId, 'Você deseja que os calculos sejam calculados com base no robô SPYBET? (multiplicador 14X) \n\n', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '◾️ Sim ◾️', callback_data: 'simRobo' }, { text: '▫️ Não ▫️', callback_data: 'naoRobo' }]
                                ]
                            }
                        });
                    }
                }
                else if (msg.data == 'simRobo' && UserStatus[chatId].entradas == undefined) {
                    if (UserStatus[chatId].gale == 'comGale') {
                        if (UserStatus[chatId].galeLucro == 'crescente') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            valorSL.push(UserStatus[chatId].valorSL);
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTD == '1Gale') {
                                procentagem = 0.08;
                                multiplicador = 1.6;
                            }
                            else if (UserStatus[chatId].galeQTD == '2Gale') {
                                procentagem = 0.03;
                                multiplicador = 1.3;
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Primeiro Sinal do Robô:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                if (UserStatus[chatId].galeQTD == '2Gale') {
                                    Entrada3(valorEntradaAnterior);
                                }
                                else {
                                    bot.sendMessage(chatId, entradas.join(''));
                                    UserStatus[chatId].entradas = 'ok';
                                }
                            }
                            function Entrada3(valorEntradaAnterior) {
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                        if (UserStatus[chatId].galeLucro == 'decrecente') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            valorSL.push(UserStatus[chatId].valorSL);
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTD == '1Gale') {
                                procentagem = 0.17;
                                multiplicador = 0.95;
                            }
                            else if (UserStatus[chatId].galeQTD == '2Gale') {
                                procentagem = 0.05;
                                multiplicador = 1;
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Primeiro Sinal do Robô:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                if (UserStatus[chatId].galeQTD == '2Gale') {
                                    Entrada3(valorEntradaAnterior);
                                }
                                else {
                                    bot.sendMessage(chatId, entradas.join(''));
                                    UserStatus[chatId].entradas = 'ok';
                                }
                            }
                            function Entrada3(valorEntradaAnterior) {
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                        if (UserStatus[chatId].galeLucro == 'fixo') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            valorSL.push(UserStatus[chatId].valorSL);
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTD == '1Gale') {
                                procentagem = 0.15;
                                multiplicador = 1.077;
                            }
                            else if (UserStatus[chatId].galeQTD == '2Gale') {
                                procentagem = 0.05;
                                multiplicador = 1.077;
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Primeiro Sinal do Robô:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                if (UserStatus[chatId].galeQTD == '2Gale') {
                                    Entrada3(valorEntradaAnterior);
                                }
                                else {
                                    bot.sendMessage(chatId, entradas.join(''));
                                    UserStatus[chatId].entradas = 'ok';
                                }
                            }
                            function Entrada3(valorEntradaAnterior) {
                                entradas.push('\n\n----Segundo Sinal do Robô:----\n\n\n');
                                valorEntradaAnterior = Number(Number(valorEntradaAnterior) / 14 * multiplicador + Number(valorEntradaAnterior)).toFixed(2);
                                var total = valorTotal.push(valorEntradaAnterior);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaAnterior) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaAnterior + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + ' ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                entradas.push('\n\n\nTotal de Entradas: R$' + totalDeEntradas + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                    }
                    if (UserStatus[chatId].gale == 'semGale') {
                        if (UserStatus[chatId].galeLucro == 'crescente') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            let divisor;
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTDEnt == '1ENT') {
                                procentagem = 0.30;
                                multiplicador = 2.3;
                                divisor = 1;
                                valorSL.push(UserStatus[chatId].valorSL);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '2ENT') {
                                procentagem = 0.30;
                                multiplicador = 2.27;
                                divisor = 2;
                                let calc = (Number(UserStatus[chatId].valorSL) / 2);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '3ENT') {
                                procentagem = 0.30;
                                multiplicador = 2.27;
                                divisor = 3;
                                let calc = (Number(UserStatus[chatId].valorSL) / 3);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '4ENT') {
                                procentagem = 0.30;
                                multiplicador = 2.27;
                                divisor = 4;
                                let calc = (Number(UserStatus[chatId].valorSL) / 4);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '5ENT') {
                                procentagem = 0.30;
                                multiplicador = 2.27;
                                divisor = 5;
                                let calc = (Number(UserStatus[chatId].valorSL) / 5);
                                valorSL.push(calc);
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Suas entradas Fixas:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                let totalDoValorFinal = (Number(totalDeEntradas) * divisor).toFixed(2);
                                entradas.push('\n\n\nTotal das Entradas:  ' + divisor + 'x R$' + totalDeEntradas + '\n\n Total : R$' + totalDoValorFinal + '\n\n' + 'Stop Loss: R$' + Number(UserStatus[chatId].valorSL).toFixed(2) + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                        if (UserStatus[chatId].galeLucro == 'decrecente') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            let divisor;
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTDEnt == '1ENT') {
                                procentagem = 0.60;
                                multiplicador = 0.95;
                                divisor = 1;
                                valorSL.push(UserStatus[chatId].valorSL);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '2ENT') {
                                procentagem = 0.60;
                                multiplicador = 0.95;
                                divisor = 2;
                                let calc = (Number(UserStatus[chatId].valorSL) / 2);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '3ENT') {
                                procentagem = 0.60;
                                multiplicador = 0.95;
                                divisor = 3;
                                let calc = (Number(UserStatus[chatId].valorSL) / 3);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '4ENT') {
                                procentagem = 0.60;
                                multiplicador = 0.95;
                                divisor = 4;
                                let calc = (Number(UserStatus[chatId].valorSL) / 4);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '5ENT') {
                                procentagem = 0.60;
                                multiplicador = 0.95;
                                divisor = 5;
                                let calc = (Number(UserStatus[chatId].valorSL) / 5);
                                valorSL.push(calc);
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Suas entradas Fixas:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                let totalDoValorFinal = (Number(totalDeEntradas) * divisor).toFixed(2);
                                entradas.push('\n\n\nTotal das Entradas:  ' + divisor + 'x R$' + totalDeEntradas + '\n\n Total : R$' + totalDoValorFinal + '\n\n' + 'Stop Loss: R$' + Number(UserStatus[chatId].valorSL).toFixed(2) + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                        if (UserStatus[chatId].galeLucro == 'fixo') {
                            let valorSL = [];
                            let entradas = [];
                            let valorTotal = [];
                            let divisor;
                            var procentagem;
                            var multiplicador;
                            if (UserStatus[chatId].galeQTDEnt == '1ENT') {
                                procentagem = 0.58;
                                multiplicador = 1.077;
                                divisor = 1;
                                valorSL.push(UserStatus[chatId].valorSL);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '2ENT') {
                                procentagem = 0.58;
                                multiplicador = 1.077;
                                divisor = 2;
                                let calc = (Number(UserStatus[chatId].valorSL) / 2);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '3ENT') {
                                procentagem = 0.58;
                                multiplicador = 1.077;
                                divisor = 3;
                                let calc = (Number(UserStatus[chatId].valorSL) / 3);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '4ENT') {
                                procentagem = 0.58;
                                multiplicador = 1.077;
                                divisor = 4;
                                let calc = (Number(UserStatus[chatId].valorSL) / 4);
                                valorSL.push(calc);
                            }
                            else if (UserStatus[chatId].galeQTDEnt == '5ENT') {
                                procentagem = 0.58;
                                multiplicador = 1.077;
                                divisor = 5;
                                let calc = (Number(UserStatus[chatId].valorSL) / 5);
                                valorSL.push(calc);
                            }
                            var valorSL5 = (Number(valorSL.join('')) * procentagem).toFixed(2);
                            Entrada();
                            function Entrada() {
                                let valorEntradaFixa = (valorSL5 / 14).toFixed(2);
                                entradas.push('----Suas entradas Fixas:----\n\n\n');
                                var total = valorTotal.push(valorEntradaFixa);
                                var tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                var lucro = ((Number(valorEntradaFixa) * 14) - Number(tl)).toFixed(2);
                                entradas.push('1° Entrada: R$' + valorEntradaFixa + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                var valorEntradaAnterior = valorEntradaFixa;
                                for (let i = 0; i < 13; i++) {
                                    var n1 = Number(Number(valorEntradaAnterior) / 14 * multiplicador).toFixed(2);
                                    var n2 = Number(valorEntradaAnterior);
                                    var valorEntrada = (Number(n1) + Number(n2));
                                    var novaEntrada = Number(valorEntrada).toFixed(2);
                                    total = valorTotal.push(novaEntrada);
                                    tl = valorTotal.reduce((tl, valor) => Number(tl) + Number(valor));
                                    lucro = ((Number(novaEntrada) * 14) - Number(tl)).toFixed(2);
                                    entradas.push((i + 2) + '° Entrada: R$' + novaEntrada + '        ' + 'Lucro: R$' + lucro + '\n\n');
                                    valorEntradaAnterior = novaEntrada;
                                }
                                var totalDeEntradas = valorTotal.reduce((totalDeEntradas, valor) => Number(totalDeEntradas) + Number(valor)).toFixed(2);
                                let totalDoValorFinal = (Number(totalDeEntradas) * divisor).toFixed(2);
                                entradas.push('\n\n\nTotal das Entradas:  ' + divisor + 'x R$' + totalDeEntradas + '\n\n Total : R$' + totalDoValorFinal + '\n\n' + 'Stop Loss: R$' + Number(UserStatus[chatId].valorSL).toFixed(2) + '\n\n');
                                bot.sendMessage(chatId, entradas.join(''));
                                UserStatus[chatId].entradas = 'ok';
                            }
                        }
                    }
                }
                else if (msg.data == 'naoRobo') {
                    bot.sendMessage(chatId, 'Lamento mas ainda não tenho essa função');
                    delete UserStatus[chatId];
                }
                else if (UserStatus[chatId].entradas == 'ok') {
                    bot.sendMessage(chatId, '\n\n\nPara calcular novamente digite /start');
                    delete UserStatus[chatId];
                }
            });
        });
    }
    async suporteBot(ConfirmPayment, msg) {
        const TOKEN = '5956455102:AAGay0lAVSw8rPyxFGah0879iurTQBDpi7Y';
        var bot = new Telegraf(TOKEN, { polling: true });
        if (ConfirmPayment == 'confirmPayment') {
            confirmPayment();
            return;
        }
        bot.launch();
        const UserStatus = {};
        const lastMessageTime = {};
        const indicacoes = {};
        let now = new Date();
        let HoraAtual = now.toISOString().slice(0, 19).replace('T', ' ');
        function removeInactiveUsers() {
            for (let i = 0; i < Object.keys(lastMessageTime).length; i++) {
                const lastMessageDate = lastMessageTime[Object.keys(lastMessageTime)[i]];
                const chatId = Object.keys(lastMessageTime)[i];
                if (String(HoraAtual) == String(lastMessageDate)) {
                    bot.sendMessage(chatId, 'Conversa encerrada devido à inatividade. Para reiniciar digite /start');
                    delete UserStatus[chatId];
                    delete lastMessageTime[chatId];
                }
            }
        }
        setInterval(removeInactiveUsers, 60 * 1000);
        bot.start(async (ctx) => {
            var vincUserLength = String(ctx.update.message.text).split(' ');
            const chatId = ctx.chat.id;
            let now = new Date();
            let fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
            let HoraAtual = fifteenMinutesFromNow.toISOString().slice(0, 19).replace('T', ' ');
            lastMessageTime[chatId] = HoraAtual;
            console.log(chatId);
            if (vincUserLength.length == 2) {
                if (String(vincUserLength[1]).split('_')[0] == 'id') {
                    var vincUser = String(vincUserLength[1]).split('_')[1];
                    let currentDateTime = new Date();
                    let futureDateTime = new Date(currentDateTime.getTime() + (24 * 60 * 60 * 1000));
                    const diaHora = futureDateTime.toLocaleString();
                    let userTelegram = await User_1.default.findByOrFail('id', vincUser);
                    userTelegram.telegram = chatId;
                    userTelegram.telegram_plan = 'free-plan';
                    userTelegram.telegram_plan_data = diaHora;
                    await userTelegram.save();
                    bot.telegram.sendMessage(chatId, "Sua conta foi vinculada com sucesso! Seu acesso aos grupos foram liberados com sucesso, agora você pode acessar os grupos e começar seu teste grátis de 24 horas.\n\nRecomendamos acessar as 3 plataformas.", {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                                [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                                [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                            ]
                        }
                    });
                    return;
                }
                if (String(vincUserLength[1]).split('_')[0] == 'afiliado') {
                    delete indicacoes[chatId];
                    indicacoes[chatId] = { 'codigo': String(vincUserLength[1]).split('_')[1] };
                }
            }
            try {
                var user = await User_1.default.findByOrFail('telegram', chatId);
                if (user.$attributes.telegram_plan == 'free-plan' || user.$attributes.telegram_plan == 'Expirado') {
                    bot.telegram.sendMessage(chatId, `Olá verificamos que você já conhece nossos serviços, mas ainda não tem mais acesso aos grupos, para ter acesso aos grupos você precisa adquirir um plano, para isso basta clicar no botão abaixo e escolher o plano que deseja.`, {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '🔥 Planos 🔥', callback_data: '/planos' }],
                                [{ text: '🔷 Acessar o site 🔷', url: 'https://www.spybet.com.br/auth/login' }],
                                [{ text: '📞 Suporte 📞', url: 'https://t.me/SPYBETSUPORTE' }],
                            ]
                        }
                    });
                }
                else {
                    let plan = String(user.$attributes.telegram_plan).split(' - ');
                    if (plan[0] == 'Plano 1' || plan[0] == 'Plano 2') {
                        bot.telegram.sendMessage(chatId, `Olá, vimos que você já possui nossos serviços, escolha uma das opções abaixo:\n\n`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                                    [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                                    [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                                    [{ text: '🔷 Acessar o site 🔷', url: 'https://www.spybet.com.br/auth/login' }],
                                    [{ text: '🔖 Afiliação 🔖', callback_data: '/afiliado' }],
                                    [{ text: '📞 Suporte 📞', url: 'https://t.me/SPYBETSUPORTE' }],
                                ]
                            }
                        });
                    }
                    else if (plan[0] == 'Plano 3') {
                        bot.telegram.sendMessage(chatId, `Olá, vimos que você já possui nossos serviços, escolha uma das opções abaixo:\n\n`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                                    [{ text: '🔷 Acessar o site 🔷', url: 'https://www.spybet.com.br/auth/login' }],
                                    [{ text: '🔖 Afiliação 🔖', callback_data: '/afiliado' }],
                                    [{ text: '📞 Suporte 📞', url: 'https://t.me/SPYBETSUPORTE' }],
                                ]
                            }
                        });
                    }
                    else if (plan[0] == 'Plano 4') {
                        bot.telegram.sendMessage(chatId, `Olá, vimos que você já possui nossos serviços, escolha uma das opções abaixo:\n\n`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                                    [{ text: '🔷 Acessar o site 🔷', url: 'https://www.spybet.com.br/auth/login' }],
                                    [{ text: '🔖 Afiliação 🔖', callback_data: '/afiliado' }],
                                    [{ text: '📞 Suporte 📞', url: 'https://t.me/SPYBETSUPORTE' }],
                                ]
                            }
                        });
                    }
                    else if (plan[0] == 'Plano 5') {
                        bot.telegram.sendMessage(chatId, `Olá, vimos que você já possui nossos serviços, escolha uma das opções abaixo:\n\n`, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                                    [{ text: '🔷 Acessar o site 🔷', url: 'https://www.spybet.com.br/auth/login' }],
                                    [{ text: '🔖 Afiliação 🔖', callback_data: '/afiliado' }],
                                    [{ text: '📞 Suporte 📞', url: 'https://t.me/SPYBETSUPORTE' }],
                                ]
                            }
                        });
                    }
                }
            }
            catch {
                bot.telegram.sendMessage(chatId, `Olá, sou o Suporte da equipe SPYBET, antes de mais nada gostaria de apresentar tudo que disponibilizamos para você:\n\n⭕️ No site você pode:\n ▫️ Ver resultados das plataformas em tempo real\n  ◾️ Ou até 5000 partidas anteriores\n ▫️ Criar sua própria estratégia de investimento\n ▫️ Criar sua tabela de gerenciamento\n ▫️ Criar seu proprio robô\n ▫️ Criação de jogadas para o mines\n ▫️ Tudo isso acima pode ser feito nas plaformas: \n  ◾️ Blaze\n  ◾️ Smash\n  ◾️ Glunk\n  ◾️ Betbry\n  ◾️ Beette\n ▫️ Tornar-se nosso afiliado\n⭕️ Temos robôs para:\n ▫️ Blaze (Double - Branco)\n ▫️ Smash (Double - Branco)\n ▫️ Betbry (Double - Branco)\n ▫️ Calculadora inteligente\n 💭A calculadora te auxiliará a calcular o valor da aposta de acordo com o valor que você deseja investir\n\n
                    ➖Disponibilizamos acesso a todas ferramentas do nosso site por 7 dias gratuitamente, e 1 dia de acesso a todos grupos VIPs do telegram, após esse período você poderá escolher se deseja continuar com o acesso ou não.\n  ❇️Após o periodo de teste o acesso ao site continuará gratuito, porém com acesso limitado.\n\n
                    ➖Caso queria aproveitar o periodo de teste gratuito, logo abaixo dessa mensagem tem o botão para registra-se e preencher os dados solicitados, após isso você receberá um e-mail de confirmação.\n\n
                    ➖Caso queira conhecer o site antes de se registrar, logo abaixo dessa mensagem tem o botão para conhecer o site.\n\n
                    ♦️Desde já agradecemos a preferência e desejamos um ótimo dia!♦️\n\n
                    Equipe SPYBET,`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔳 Registra-se Agora 🔳', callback_data: 'bot' }],
                            [{ text: '🔷 Conheça o site 🔷', url: 'https://www.spybet.com.br/' }],
                            [{ text: '🔶 Conhecer Planos 🔶', callback_data: '/planos' }],
                            [{ text: '💵💎 Como se afiliar 💎💵', callback_data: '/afiliado' }],
                        ]
                    }
                });
                UserStatus[chatId] = { 'inicio': 'ok' };
                return;
            }
        });
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const grupoBetbry = -1001615549819;
            const grupoSmash = -1001836625641;
            const grupoBlaze = -1001832660443;
            if (msg.message.chat.id == grupoBetbry || msg.message.chat.id == grupoSmash || msg.message.chat.id == grupoBlaze) {
                if (msg.message.left_chat_member != undefined) {
                    return;
                }
                let idnewmenbro = msg.message.new_chat_member.id;
                revogarLink(idnewmenbro, msg.message.chat.id);
                return;
            }
            let now = new Date();
            let fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);
            let HoraAtual = fifteenMinutesFromNow.toISOString().slice(0, 19).replace('T', ' ');
            lastMessageTime[chatId] = HoraAtual;
            if (UserStatus[chatId].nome && UserStatus[chatId].nome == 'ok') {
                UserStatus[chatId].nome = msg.update.message.text;
                if (!UserStatus[chatId].nome || UserStatus[chatId].nome.trim().length === 0) {
                    UserStatus[chatId].nome = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Nome inválido, digite novamente');
                }
                else if (!/^[a-zA-Z\s]*$/.test(UserStatus[chatId].nome)) {
                    UserStatus[chatId].nome = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Nome inválido, digite novamente');
                }
                else {
                    bot.telegram.sendMessage(chatId, 'Seu primeiro nome é: ' + UserStatus[chatId].nome, {
                        reply_markup: {
                            inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simName' }, { text: '▫️ Não ▫️', callback_data: 'naoName' }]]
                        }
                    });
                    return;
                }
            }
            if (UserStatus[chatId].sobrenome && UserStatus[chatId].sobrenome == 'ok') {
                UserStatus[chatId].sobrenome = msg.update.message.text;
                if (!UserStatus[chatId].sobrenome || UserStatus[chatId].sobrenome.trim().length === 0) {
                    UserStatus[chatId].sobrenome = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Nome inválido, digite novamente');
                }
                else if (!/^[a-zA-Z\s]*$/.test(UserStatus[chatId].sobrenome)) {
                    UserStatus[chatId].sobrenome = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Nome inválido, digite novamente');
                }
                else {
                    bot.telegram.sendMessage(chatId, 'Seu sobrenome é: ' + UserStatus[chatId].sobrenome, {
                        reply_markup: {
                            inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simSobrenome' }, { text: '▫️ Não ▫️', callback_data: 'naoSobrenome' }]]
                        }
                    });
                    return;
                }
            }
            if (UserStatus[chatId].email && UserStatus[chatId].email == 'ok') {
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                main();
                async function main() {
                    if (!emailRegex.test(msg.text)) {
                        try {
                            let i = await User_1.default.findOrFail('email', msg.update.message.text);
                            bot.telegram.sendMessage(chatId, 'E-mail já cadastrado, digite outro e-mail');
                        }
                        catch (err) {
                            UserStatus[chatId].email = msg.update.message.text;
                            bot.telegram.sendMessage(chatId, 'Seu e-mail é: ' + UserStatus[chatId].email, {
                                reply_markup: {
                                    inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simEmail' }, { text: '▫️ Não ▫️', callback_data: 'naoEmail' }]]
                                }
                            });
                        }
                    }
                    else {
                        bot.telegram.sendMessage(chatId, 'E-mail inválido, digite novamente');
                        return;
                    }
                }
            }
            if (UserStatus[chatId].senha && UserStatus[chatId].senha == 'ok') {
                UserStatus[chatId].senha = msg.update.message.text;
                UserStatus[chatId].confirmaSenha = msg.update.message.text;
                bot.telegram.sendMessage(chatId, 'Sua senha é: ' + UserStatus[chatId].senha, {
                    reply_markup: {
                        inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simSenha' }, { text: '▫️ Não ▫️', callback_data: 'naoSenha' }]]
                    }
                });
                return;
            }
            if (UserStatus[chatId].dataNascimento && UserStatus[chatId].dataNascimento == 'ok') {
                const data = new Date(msg.text);
                const dataAtual = new Date();
                UserStatus[chatId].dataNascimento = msg.update.message.text;
                if (!UserStatus[chatId].dataNascimento) {
                    UserStatus[chatId].dataNascimento = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Data inválida, digite novamente');
                }
                else {
                    bot.telegram.sendMessage(chatId, 'Sua data de nascimento é: ' + UserStatus[chatId].dataNascimento, {
                        reply_markup: {
                            inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simDataNascimento' }, { text: '▫️ Não ▫️', callback_data: 'naoDataNascimento' }]]
                        }
                    });
                    return;
                }
            }
            if (UserStatus[chatId].whatsapp && UserStatus[chatId].whatsapp == 'ok') {
                UserStatus[chatId].whatsapp = msg.update.message.text;
                if (!UserStatus[chatId].whatsapp) {
                    UserStatus[chatId].whatsapp = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Número de telefone inválido, Ex: DD + Número do telefone, digite novamente');
                }
                else if (!/^[\d\s()+-]+$/.test(UserStatus[chatId].whatsapp)) {
                    UserStatus[chatId].whatsapp = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Número de telefone inválido, Ex: DD + Número do telefone, digite novamente');
                }
                else if (UserStatus[chatId].whatsapp.replace(/\D/g, "").length < 10 || UserStatus[chatId].whatsapp.replace(/\D/g, "").length > 15) {
                    UserStatus[chatId].whatsapp = 'ok';
                    return bot.telegram.sendMessage(chatId, 'Número de telefone inválido, Ex: DD + Número do telefone, digite novamente');
                }
                else {
                    bot.telegram.sendMessage(chatId, 'Seu whatsapp é: ' + UserStatus[chatId].whatsapp, {
                        reply_markup: {
                            inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simWhatsapp' }, { text: '▫️ Não ▫️', callback_data: 'naoWhatsapp' }]]
                        }
                    });
                    return;
                }
            }
        });
        bot.action('bot', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            main();
            async function main() {
                try {
                    let i = await User_1.default.findByOrFail('telegram', chatId);
                    bot.telegram.sendMessage(chatId, 'Você já está registrado(a) no sistema');
                }
                catch (err) {
                    delete UserStatus[chatId];
                    bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
                    UserStatus[chatId] = { 'nome': 'ok' };
                }
            }
        });
        bot.action('simName', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Digite seu Sobrenome: ');
            UserStatus[chatId].sobrenome = 'ok';
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('naoName', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].nome = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite seu primeiro nome novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('simSobrenome', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Digite seu e-mail: ');
            UserStatus[chatId].email = 'ok';
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('naoSobrenome', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].sobrenome = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite seu sobrenome novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('simEmail', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Digite sua senha: ');
            UserStatus[chatId].senha = 'ok';
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('naoEmail', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].email = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite seu e-mail novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('simSenha', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Digite sua data de nascimento: DD/MM/AAAA');
            UserStatus[chatId].dataNascimento = 'ok';
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('naoSenha', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].senha = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite sua senha novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
        });
        bot.action('simDataNascimento', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Digite seu Whatsapp: DD + Número');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
            UserStatus[chatId].whatsapp = 'ok';
            return;
        });
        bot.action('naoDataNascimento', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].dataNascimento = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite sua data de nascimento novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
            return;
        });
        bot.action('simWhatsapp', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Você confirma os dados abaixo?\n\nNome: ' + UserStatus[chatId].nome + '\nSobrenome: ' + UserStatus[chatId].sobrenome + '\nE-mail: ' + UserStatus[chatId].email + '\nSenha: ' + UserStatus[chatId].senha + '\nData de nascimento: ' + UserStatus[chatId].dataNascimento + '\nWhatsapp: ' + UserStatus[chatId].whatsapp, {
                reply_markup: {
                    inline_keyboard: [[{ text: '◾️ Sim ◾️', callback_data: 'simDados' }, { text: '▫️ Não ▫️', callback_data: 'naoDados' }]]
                }
            });
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
            return;
        });
        bot.action('naoWhatsapp', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            UserStatus[chatId].whatsapp = 'ok';
            bot.telegram.sendMessage(chatId, 'Digite seu Whatsapp novamente: ');
            bot.telegram.deleteMessage(chatId, ctx.update.callback_query.message.message_id);
            return;
        });
        bot.action('simDados', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Ao clicar em "Confirmar" você concorda com os termos de uso e política de privacidade do site, e confirma o resgistro.', {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Confirmar', callback_data: 'confirmarDados' }],
                        [{ text: 'Política de privacidade', url: 'https://www.spybet.com.br/termos-de-privacidade' },
                            { text: 'Termos de uso', url: 'https://www.spybet.com.br/termos-de-uso' }]
                    ]
                }
            });
            UserStatus[chatId].enviado = 'ok';
            return;
        });
        bot.action('naoDados', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            bot.telegram.sendMessage(chatId, 'Reiniciando o processo de cadastro...');
            delete UserStatus[chatId];
            bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
            UserStatus[chatId] = { 'nome': 'ok' };
            return;
        });
        bot.action('confirmarDados', (ctx) => {
            const chatId = ctx.update.callback_query.message.chat.id;
            if (UserStatus[chatId].enviado == 'ok') {
                UserStatus[chatId].enviado = 'okok';
                let now = new Date();
                let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                let diaHora24 = tomorrow.toISOString().slice(0, 19).replace('T', ' ');
                let name = UserStatus[chatId].nome;
                let sobrenome = UserStatus[chatId].sobrenome;
                let email = UserStatus[chatId].email;
                let senha = UserStatus[chatId].senha;
                let dataNascimento = UserStatus[chatId].dataNascimento;
                let whatsapp = UserStatus[chatId].whatsapp;
                let telegram = chatId;
                let diaHoraCadastro = diaHora24;
                var cpf;
                if (indicacoes[chatId] != undefined) {
                    cpf = indicacoes[chatId].codigo;
                }
                else {
                    cpf = 'wIUXrK0a';
                }
                (0, node_fetch_1.default)('https://www.spybet.com.br/auth/registro-telegram', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        sobrenome: sobrenome,
                        email: email,
                        password: senha,
                        password_confirmation: senha,
                        cpf: cpf,
                        data_nascimento: dataNascimento,
                        telefone: whatsapp,
                        telegram: telegram,
                        telegram_plan: diaHoraCadastro
                    })
                }).then(function (response) {
                    return response.text();
                }).catch(function (err) {
                    console.log(err);
                }).then(function (data) {
                    const options = {};
                    var newUserGroup = {};
                    if (data.errors && data.errors.field == 'email') {
                        bot.telegram.sendMessage(chatId, data.errors.message);
                        bot.telegram.sendMessage(chatId, 'Comece novamente...');
                        bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
                        delete UserStatus[chatId];
                        UserStatus[chatId] = { 'nome': 'ok' };
                        return;
                    }
                    else if (data.errors && data.errors.field == 'password') {
                        bot.telegram.sendMessage(chatId, data.errors.message);
                        bot.telegram.sendMessage(chatId, 'Comece novamente...');
                        bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
                        delete UserStatus[chatId];
                        UserStatus[chatId] = { 'nome': 'ok' };
                        return;
                    }
                    else if (data.errors && data.errors.field == 'data_nascimento') {
                        bot.telegram.sendMessage(chatId, data.errors.message);
                        bot.telegram.sendMessage(chatId, 'Comece novamente...');
                        bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
                        delete UserStatus[chatId];
                        UserStatus[chatId] = { 'nome': 'ok' };
                        return;
                    }
                    else if (data.errors && data.errors.field == 'telefone') {
                        bot.telegram.sendMessage(chatId, data.errors.message);
                        bot.telegram.sendMessage(chatId, 'Comece novamente...');
                        bot.telegram.sendMessage(chatId, 'Primeiro nome: ');
                        delete UserStatus[chatId];
                        UserStatus[chatId] = { 'nome': 'ok' };
                        return;
                    }
                    mains();
                    async function mains() {
                        const grupoBetbry = -1001615549819;
                        const grupoSmash = -1001836625641;
                        const grupoBlaze = -1001832660443;
                        const grupoBeette = -1001740298931;
                        let userTelegram = await User_1.default.findByOrFail('email', UserStatus[chatId].email);
                        userTelegram.telegram = chatId;
                        userTelegram.telegram_plan = 'free-plan';
                        userTelegram.telegram_plan_data = String(diaHoraCadastro);
                        await userTelegram.save();
                        bot.telegram.unbanChatMember(grupoBetbry, chatId)
                            .catch((err) => {
                            console.log(err);
                        });
                        bot.telegram.unbanChatMember(grupoSmash, chatId)
                            .catch((err) => {
                            console.log(err);
                        });
                        bot.telegram.unbanChatMember(grupoBlaze, chatId)
                            .catch((err) => {
                            console.log(err);
                        });
                        delete indicacoes[chatId];
                        bot.telegram.sendMessage(chatId, "Seu acesso aos grupos foram liberados com sucesso, agora você pode acessar os grupos e começar seu teste grátis de 24 horas.\n\nRecomendamos acessar as 3 plataformas.", {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                                    [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                                    [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                                ]
                            }
                        });
                        delete UserStatus[chatId];
                    }
                });
                return;
            }
        });
        async function revogarLink(chatId, group) {
            const grupoBetbry = -1001615549819;
            const grupoSmash = -1001836625641;
            const grupoBlaze = -1001832660443;
            const grupoBeette = -1001740298931;
            try {
                var newUserEstatic = await User_1.default.query().where('telegram', chatId).first();
                if (newUserEstatic == null || newUserEstatic == undefined) {
                    if (group == grupoBetbry) {
                        bot.telegram.kickChatMember(grupoBetbry, chatId).catch((err) => {
                            console.error(err);
                        });
                    }
                    else if (group == grupoSmash) {
                        bot.telegram.kickChatMember(grupoSmash, chatId).catch((err) => {
                            console.error(err);
                        });
                    }
                    else if (group == grupoBlaze) {
                        bot.telegram.kickChatMember(grupoBlaze, chatId).catch((err) => {
                            console.error(err);
                        });
                    }
                    bot.telegram.sendMessage(chatId, 'Você não possui acesso aos grupos, para ter acesso, pode utilizar por 24 horas gratuitamente', {
                        reply_markup: {
                            inline_keyboard: [[{ text: '🔳 Registra-se Agora 🔳', callback_data: 'bot' }], [{ text: '🔷 Conheça o site 🔷', url: 'https://www.spybet.com.br/' }], [{ text: '🔶 Conhecer Planos 🔶', url: 'http://t.me/marketing_spybet_bot' }]]
                        }
                    });
                }
                else {
                    let telegramPlan = newUserEstatic.telegram_plan;
                    if (telegramPlan == 'Expirado') {
                        if (group == grupoBetbry) {
                            bot.telegram.kickChatMember(grupoBetbry, chatId);
                        }
                        else if (group == grupoSmash) {
                            bot.telegram.kickChatMember(grupoSmash, chatId);
                        }
                        else if (group == grupoBlaze) {
                            bot.telegram.kickChatMember(grupoBlaze, chatId);
                        }
                        bot.telegram.sendMessage(chatId, 'Seu acesso aos grupos expirou, para ter acesso novamente, basta se adquirir um novo plano', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: '🔶 Conhecer Planos 🔶', url: 'http://t.me/marketing_spybet_bot' }],
                                ]
                            }
                        });
                    }
                }
            }
            catch (err) {
                return;
            }
        }
        bot.action('/planos', (ctx) => {
            callPlan(ctx);
        });
        bot.action('/afiliado', async (ctx) => {
            const user = await User_1.default.query().where('telegram', ctx.chat.id).first();
            if (user == null || user == undefined) {
                ctx.reply(`Abaixo tem as regras para se tornar um afiliado\n\n
                🔖 Para se tornar um afiliado, é necessário ter um plano ativo no site, caso não tenha, basta clicar em "🔶 Conhecer Planos 🔶" e adquirir um plano\n\n
                🔖 Após adquirir um plano, basta entrar no site e se increver como afiliado\n\n

                📝Todos valores recebidos vão para sua carteira virtual, que fica disponível para saque no site\n
                📝O valor mínimo para saque é de R$ 20,00\n
                📝Pode ser realizado uma solicitação de saque por dia\n
                📝A sua comissão é de 40% sobre o valor pago no plano do seu indicado\n
                📝A comissão é paga em até 24 horas após a solicitação de saque\n
                📝Todas transações ficam disponíveis para consulta no site\n
                📝Após a aquisição de um plano, você terá acesso a um link de indicação:\n
                    🔗 Link para indicações através do site\n
                    🔗 Link para indicações através do Telegram\n
                📝Você pode indicar quantas pessoas quiser, a comissão é paga sempre que seu indicado adquirir ou renovar o plano\n\n

                🔖 Para mais informações,clique em 🔧Suporte🔧 para falar com um atendente.
                🔖 Caso ainda não tenha se registrado no site, clique em 🔳 Registra-se Agora 🔳
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔳 Registra-se Agora 🔳', callback_data: 'bot' }],
                            [{ text: '🔶 Conhecer Planos 🔶', callback_data: '/planos' }],
                            [{ text: '🔧 Suporte 🔧', url: 'https://t.me/SPYBETSUPORTE' }],
                        ]
                    }
                });
            }
            else {
                const afiliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('user_id', user.id).first();
                if (afiliado == null || afiliado == undefined) {
                    ctx.reply(`Você ainda não se tornou um afiliado, para se tornar um afiliado, basta se registrar como afiliado no site\n\n 
                    Clique em 🔶 Ir para o site 🔶\n
                    Depois vá até a 'Carteira' e lá estará a opção de se registrar como afiliado\n
                    `, {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '🔶 Ir para o site 🔶', url: 'https://www.spybet.com.br/' }],
                            ]
                        }
                    });
                }
                else {
                    var linkSite = afiliado.linkafiliado.replace('https://www.spybet.com.br/ap/', '');
                    ctx.reply(`Aqui estão seus links:\n\n🔗 Link para indicações através do site\n\n   💎https://www.spybet.com.br/ap/${linkSite}\n\n\n🔗 Link para indicações através do Telegram\n\n  💎http://t.me/SuporteSpybet_bot?start=afiliado_${linkSite}\n\n\n`);
                }
            }
        });
        function confirmPayment() {
            const chatId = msg.split('|')[0].split('&')[1];
            const namePlano = msg.split('|')[2].split('&')[1];
            const plan = namePlano.split(' ')[1];
            const diaHora = msg.split('|')[3].split('&')[1];
            bot.telegram.sendMessage(chatId, `Olá! Seu pagamento foi aprovado com sucesso!\n\n 📍 Seu plano é: ${namePlano} \n 🔓 Seu acesso está liberado até: ${diaHora} 🔓 \n\n ⬇️ Acesso aos grupos ⬇️`);
            if (plan == '1') {
                return plan1();
            }
            if (plan == '2') {
                return plan1();
            }
            if (plan == '3') {
                return plan3();
            }
            if (plan == '4') {
                return plan4();
            }
            if (plan == '5') {
                return plan5();
            }
            function plan1() {
                bot.telegram.sendMessage(chatId, `Olá! Seu pagamento foi aprovado com sucesso!\n\n 📍 Seu plano é: ${namePlano} \n 🔓 Seu acesso está liberado até: ${diaHora} 🔓 \n\n ⬇️ Acesso aos grupos ⬇️`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                            [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                            [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                        ]
                    }
                });
            }
            function plan3() {
                bot.telegram.sendMessage(chatId, `Olá! Seu pagamento foi aprovado com sucesso!\n\n 📍 Seu plano é: ${namePlano} \n 🔓 Seu acesso está liberado até: ${diaHora} 🔓 \n\n ⬇️ Acesso aos grupos ⬇️`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🗝 Entrar no grupo Betbry 🗝', url: 'https://t.me/+_epbi78F0Oo2MGEx' }],
                        ]
                    }
                });
            }
            function plan4() {
                bot.telegram.sendMessage(chatId, `Olá! Seu pagamento foi aprovado com sucesso!\n\n 📍 Seu plano é: ${namePlano} \n 🔓 Seu acesso está liberado até: ${diaHora} 🔓 \n\n ⬇️ Acesso aos grupos ⬇️`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🗝 Entrar no grupo Smash 🗝', url: 'https://t.me/+y6a6gN9v8-9iNWUx' }],
                        ]
                    }
                });
            }
            function plan5() {
                bot.telegram.sendMessage(chatId, `Olá! Seu pagamento foi aprovado com sucesso!\n\n 📍 Seu plano é: ${namePlano} \n 🔓 Seu acesso está liberado até: ${diaHora} 🔓 \n\n ⬇️ Acesso aos grupos ⬇️`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🗝 Entrar no grupo Blaze 🗝', url: 'https://t.me/+Sj2v2A5PDzIxOGIx' }],
                        ]
                    }
                });
            }
        }
        async function callPlan(ctx) {
            const grupoBetbry = -1001615549819;
            const grupoSmash = -1001836625641;
            const grupoBlaze = -1001832660443;
            const chatId = ctx.chat.id;
            const user = await User_1.default.query().where('telegram', chatId).first();
            if (user == null) {
                bot.telegram.sendMessage(chatId, 'Você ainda não aproveitou seu período de teste grátis, recomendamos conhecer nossos serviços antes de adquirir um plano.', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔘 Quero minhas 24 hrs grátis 🔘', url: 'http://t.me/SuporteSpybet_bot' }],
                        ]
                    }
                });
            }
            else {
                bot.telegram.sendMessage(chatId, 'Você já aproveitou seu período de teste grátis, abaixo estão os planos disponíveis para você!');
            }
            planos(chatId);
            return;
        }
        async function planos(chatId) {
            const urll = 'https://www.spybet.com.br/pre-checkout/';
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔹 Plano 1 🔹\n\n\n🔲 Acesso a todo conteudo do site \n🔲 Acesso a todos os grupos \n\n 🔸 Planos disponiveis: \n
                 ⚫️ Mensal 👇🏼\n 🔸R$ 79,90 | Sem desconto \n\n
                🟡 Bimestral 👇🏼\n  🔸❌De:R$ 159,00\n  🔸✅Por:R$ 127.00 | 2️⃣0️⃣% de desconto \n\n
                🟢 Trimestral 👇🏼\n  🔸❌De:R$ 239,00 \n  🔸✅Por:R$ 190,00 | 2️⃣0️⃣% de desconto \n\n
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⚫️ Quero o plano 1 - Mensal  ⚫️', url: `${urll}chatId:${chatId}&p1m` }],
                            [{ text: '🟡 Quero o plano 1 - Bimestral 🟡', url: `${urll}chatId:${chatId}&p1b` }],
                            [{ text: '🟢 Quero o plano 1 - Trimestral 🟢', url: `${urll}chatId:${chatId}&p1t` }],
                        ]
                    }
                });
            }, 1000);
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔹 Plano 2 🔹\n\n\n🔲 Acesso a todos os grupos \n\n 🔸 Planos disponiveis: \n
                 Mensal 👇🏼\n  🔸R$ 49,90 | Sem desconto \n\n
                🟡 Bimestral 👇🏼\n  🔸❌De:R$ 99,00\n  🔸✅Por:R$ 79,00 | 2️⃣0️⃣% de desconto \n\n
                🟢 Trimestral 👇🏼\n  🔸❌De:R$ 149,00 \n  🔸✅Por:R$ 119,00 | 2️⃣0️⃣% de desconto \n\n
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⚫️ Quero o plano 2 - Mensal  ⚫️', url: `${urll}chatId:${chatId}&p2m` }],
                            [{ text: '🟡 Quero o plano 2 - Bimestral 🟡', url: `${urll}chatId:${chatId}&p2b` }],
                            [{ text: '🟢 Quero o plano 2 - Trimestral 🟢', url: `${urll}chatId:${chatId}&p2t` }],
                        ]
                    }
                });
            }, 2000);
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔹 Plano 3 🔹\n\n\n🔲 Acesso a grupo Betbry \n\n 🔸 Planos disponiveis: \n
                ⚫️ Mensal 👇🏼\n  🔸R$ 29,90 | Sem desconto \n\n
                🟡 Bimestral 👇🏼\n  🔸❌De:R$ 59,00\n  🔸✅Por:R$ 47,00 | 2️⃣0️⃣% de desconto \n\n
                🟢 Trimestral 👇🏼\n  🔸❌De:R$ 89,00 \n  🔸✅Por:R$ 71,00 | 2️⃣0️⃣% de desconto \n\n
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⚫️ Quero o plano 3 - Mensal  ⚫️', url: `${urll}chatId:${chatId}&p3m` }],
                            [{ text: '🟡 Quero o plano 3 - Bimestral 🟡', url: `${urll}chatId:${chatId}&p3b` }],
                            [{ text: '🟢 Quero o plano 3 - Trimestral 🟢', url: `${urll}chatId:${chatId}&p3t` }],
                        ]
                    }
                });
            }, 3000);
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔹 Plano 4 🔹\n\n\n🔲 Acesso a grupo Smash \n\n 🔸 Planos disponiveis: \n
                ⚫️ Mensal 👇🏼\n  🔸R$ 29,90 | Sem desconto \n\n
                🟡 Bimestral 👇🏼\n  🔸❌De:R$ 59,00\n  🔸✅Por:R$ 47,00 | 2️⃣0️⃣% de desconto \n\n
                🟢 Trimestral 👇🏼\n  🔸❌De:R$ 89,00 \n  🔸✅Por:R$ 71,00 | 2️⃣0️⃣% de desconto \n\n
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⚫️ Quero o plano 4 - Mensal  ⚫️', url: `${urll}chatId:${chatId}&p4m` }],
                            [{ text: '🟡 Quero o plano 4 - Bimestral 🟡', url: `${urll}chatId:${chatId}&p4b` }],
                            [{ text: '🟢 Quero o plano 4 - Trimestral 🟢', url: `${urll}chatId:${chatId}&p4t` }],
                        ]
                    }
                });
            }, 4000);
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔹 Plano 5 🔹\n\n\n🔲 Acesso a grupo Blaze \n\n 🔸 Planos disponiveis: \n
                ⚫️ Mensal 👇🏼\n  🔸R$ 29,90 | Sem desconto \n\n
                🟡 Bimestral 👇🏼\n  🔸❌De:R$ 59,00\n  🔸✅Por:R$ 47,00 | 2️⃣0️⃣% de desconto \n\n
                🟢 Trimestral 👇🏼\n  🔸❌De:R$ 89,00 \n  🔸✅Por:R$ 71,00 | 2️⃣0️⃣% de desconto \n\n
                `, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '⚫️ Quero o plano 5 - Mensal  ⚫️', url: `${urll}chatId:${chatId}&p5m` }],
                            [{ text: '🟡 Quero o plano 5 - Bimestral 🟡', url: `${urll}chatId:${chatId}&p5b` }],
                            [{ text: '🟢 Quero o plano 5 - Trimestral 🟢', url: `${urll}chatId:${chatId}&p5t` }],
                        ]
                    }
                });
            }, 5000);
            setTimeout(async () => {
                bot.telegram.sendMessage(chatId, `🔉 Para todos planos citados acima você terá acesso a nossa calculadora 🔉\n\n ♦️ Todos os pagamento são processados pelo Mercado Pago ♦️\n\n ♦️ A aquisição é feita através do nosso site com confirmação em até 10 min para pix e 24 hrs para cartão de crédito♦️\n\n 🔸 Formas de pagamento disponiveis: \n  🟢 Pix \n  🟢 Cartão de Crédito \n\n🔸 Para mais informações entre em contato com nosso suporte, um atendente falará com você. \n`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '🔸 Suporte 🔸', url: 'https://t.me/SPYBETSUPORTE' }],
                        ]
                    }
                });
            }, 6000);
        }
        setInterval(() => {
            let currentDateTime = new Date();
            const diaHora1 = currentDateTime.toLocaleString();
            kick(diaHora1);
        }, 600000);
        async function kick(diaHora1) {
            const all = await User_1.default.all();
            const allTelegram2 = all.map(item => item.$attributes.telegram);
            const allTelegram3 = allTelegram2.filter(item => item !== null);
            for (let ii = 0; ii < allTelegram3.length; ii++) {
                const allTelegram = await User_1.default.findByOrFail('telegram', allTelegram3[ii]);
                const chatId = allTelegram.$attributes.telegram;
                const nomaplano = allTelegram.$attributes.telegram_plan;
                const grupoBetbry = -1001615549819;
                const grupoSmash = -1001836625641;
                const grupoBlaze = -1001832660443;
                const grupoBeette = -1001740298931;
                const plano = allTelegram.$attributes.telegram_plan;
                const dataFormatadaUser = String(allTelegram.$attributes.telegram_plan_data).split(' ')[0];
                let dataUser = dataFormatadaUser.split("/").map(item => item.padStart(2, "0")).join("/");
                const horaUser = String(allTelegram.$attributes.telegram_plan_data).split(' ')[1];
                const dataFormatada = String(diaHora1).split(' ')[0];
                let dataAtual = dataFormatada.split("/").map(item => item.padStart(2, "0")).join("/");
                const horaAtual = String(diaHora1).split(' ')[1];
                const diaAtual = String(dataAtual).split(' ')[0].split('/')[0];
                const mesAtual = String(dataAtual).split(' ')[0].split('/')[1];
                const anoAtual = String(dataAtual).split(' ')[0].split('/')[2];
                const hrAtual = String(horaAtual).split(':')[0];
                const minAtual = String(horaAtual).split(':')[1];
                const diaUser = String(dataUser).split(' ')[0].split('/')[0];
                const mesUser = String(dataUser).split(' ')[0].split('/')[1];
                const anoUser = String(dataUser).split(' ')[0].split('/')[2];
                const hrUser = String(horaUser).split(':')[0];
                const minUser = String(horaUser).split(':')[1];
                let now = new Date();
                let horaAtual2 = now.toISOString().slice(0, 19).replace('T', ' ');
                console.log('hora atual: ', horaAtual2 + ' plano: ', String(allTelegram.$attributes.telegram_plan_data));
                if (horaAtual2 > String(allTelegram.$attributes.telegram_plan_data)) {
                    kicks();
                }
                else if (plano != 'Expirado' && anoAtual > anoUser) {
                    kicks();
                }
                else if (plano != 'Expirado' && anoAtual >= anoUser && mesAtual > mesUser) {
                    kicks();
                }
                else if (plano != 'Expirado' && anoAtual == anoUser && mesAtual == mesUser && diaAtual > diaUser) {
                    kicks();
                }
                else if (plano != 'Expirado' && anoAtual == anoUser && mesAtual == mesUser && diaAtual == diaUser && hrAtual > hrUser) {
                    kicks();
                }
                else if (plano != 'Expirado' && anoAtual == anoUser && mesAtual == mesUser && diaAtual == diaUser && hrAtual == hrUser && minAtual > minUser) {
                    kicks();
                }
                async function kicks() {
                    bot.telegram.kickChatMember(grupoBetbry, chatId);
                    bot.telegram.kickChatMember(grupoSmash, chatId);
                    bot.telegram.kickChatMember(grupoBlaze, chatId);
                    let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                    UserAtt.telegram_plan = 'Expirado';
                    UserAtt.telegram_plan_data = 'Expirado';
                    UserAtt.save();
                    if (nomaplano == 'free-plan') {
                        bot.telegram.sendMessage(chatId, 'Seu teste grátis de 24 horas expirou, para continuar usando os grupos VIPs do Telegram, você precisa adquirir um de nossos planos.Gostaria de adquirir um plano?', {
                            "reply_markup": {
                                "inline_keyboard": [[{ "text": "Sim", "callback_data": "simPlan" }, { "text": "Não", "callback_data": "naoPlan" }]]
                            }
                        });
                    }
                    else {
                        bot.telegram.sendMessage(chatId, 'Seu plano expirou, para continuar usando os grupos VIPs do Telegram, você precisa adquirir um de nossos planos.Gostaria de adquirir um plano?', {
                            "reply_markup": {
                                "inline_keyboard": [[{ "text": "Sim", "callback_data": "simPlan" }, { "text": "Não", "callback_data": "naoPlan" }]]
                            }
                        });
                    }
                }
            }
        }
        bot.action('naoPlan', async (ctx) => {
            ctx.deleteMessage();
            ctx.reply('Poxa, que pena, caso mude de ideia, estaremos aqui para te ajudar!');
        });
        bot.action('simPlan', async (ctx) => {
            planos(ctx.chat.id);
        });
    }
}
exports.default = MinesController;
//# sourceMappingURL=MinesController.js.map