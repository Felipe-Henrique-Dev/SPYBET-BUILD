"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Telegraf } = require('telegraf');
const axios = require('axios');
const AmigoIa_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AmigoIa"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const puppeteer = require('puppeteer');
const dotenv_1 = require("dotenv");
const fs = require('fs');
const openai_1 = require("openai");
const AmigoiaMensagen_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AmigoiaMensagen"));
const path = require('path');
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class NewBotController {
    async NewBotROBOS() {
        const TelegramBot = require('node-telegram-bot-api');
        const TOKEN_DO_BOT = '6162071424:AAEPtkkSOnorV-4dcXiZp5wbRvhAQhSFwgk';
        const bot = new TelegramBot(TOKEN_DO_BOT, { polling: true });
        bot.on('message', (message) => {
            if (message.text == 'Ativar') {
                roboPuppertterFruit(message.chat.id);
            }
        });
        var chatID = [];
        async function roboPuppertterFruit(chatid) {
            chatID = [];
            chatID.push(chatid);
            const browser = await puppeteer.connect({
                browserURL: 'http://localhost:9222',
                defaultViewport: null
            });
            clickMines();
            async function clickMines() {
                const targetUrl = 'https://stake.com/casino/games/mines';
                const pages = await browser.pages();
                let targetPage;
                for (let i = 0; i < pages.length; i++) {
                    const url = await pages[i].url();
                    if (url === targetUrl) {
                        targetPage = pages[i];
                        break;
                    }
                }
                if (targetPage) {
                    var jogoPlay = [];
                    var reload = [0];
                    async function retsetarJogo() {
                        await targetPage.waitForTimeout(2000);
                        clickSacar();
                        console.log('sacar');
                        jogoPlay = [];
                        setTimeout(async () => {
                            const gameResultContent = await targetPage.$eval('.game-result-content', element => element.textContent.trim());
                            console.log(gameResultContent);
                            let winStats = await targetPage.$('span[data-testid="bets-stats-losses"]');
                            let winStatsText = await targetPage.evaluate(winStats => winStats.textContent, winStats);
                            bot.sendMessage(chatID[0], 'Win:' + winStatsText + ' - ' + gameResultContent);
                        }, 2000);
                        setTimeout(async () => {
                            return clickButton();
                        }, 3000);
                    }
                    async function clickSacar() {
                        await targetPage.waitForSelector('button[data-test="cashout-button"]');
                        const betButton = await targetPage.$('button[data-test="cashout-button"]');
                        await betButton.click();
                    }
                    async function clickButtoM() {
                        console.log('clickButtoM');
                        await targetPage.waitForSelector('button[data-test="bet-button"]');
                        const betButton = await targetPage.$('button[data-test="bet-button"]');
                        await betButton.click();
                    }
                    clickButton();
                    async function clickButton() {
                        await targetPage.waitForTimeout(1000);
                        clickButtoM();
                        console.log('clickButton');
                        await targetPage.waitForSelector('button[data-test="bet-button"]');
                        const betButton = await targetPage.$('button[data-test="bet-button"]');
                        await betButton.click();
                        setTimeout(async () => {
                            const minesTiles = await targetPage.$$('button[data-test="mines-tile"]');
                            const numClicks = 20;
                            if (jogoPlay.length == 0) {
                                meuLoop();
                            }
                            else {
                                meuLoopNormal();
                            }
                            async function meuLoopNormal() {
                                for (let i = 0; i < jogoPlay.length; i++) {
                                    const tile = minesTiles[jogoPlay[i]];
                                    await tile.click();
                                }
                            }
                            async function meuLoop() {
                                const jogos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                                const tilesClicked = [];
                                for (let i = 0; i < numClicks && i < minesTiles.length; i++) {
                                    const randomIndex = Math.floor(Math.random() * jogos.length);
                                    const tileIndex = jogos[randomIndex];
                                    jogoPlay.push(tileIndex);
                                    const tile = minesTiles[tileIndex];
                                    await tile.click();
                                    tilesClicked.push(tileIndex);
                                    jogos.splice(randomIndex, 1);
                                }
                            }
                            await targetPage.waitForSelector('button[data-test="cashout-button"]');
                            const cashoutButton = await targetPage.$('button[data-test="cashout-button"]');
                            setTimeout(async () => {
                                clicarBotao2(cashoutButton);
                            }, 5000);
                        }, 3000);
                        async function clicarBotao2(cashoutButton) {
                            try {
                                const winStats = await targetPage.$('span[data-testid="bets-stats-wins"]');
                                const winStatsText = await targetPage.evaluate(winStats => winStats.textContent, winStats);
                                await targetPage.waitForTimeout(2000);
                                await cashoutButton.click().then(async () => {
                                    retsetarJogo();
                                }).catch((error) => {
                                    console.log('perdeu');
                                    clickButton();
                                });
                            }
                            catch (error) {
                                console.log('win');
                            }
                        }
                    }
                }
                else {
                    console.log('A página não foi encontrada.');
                }
            }
            async function clickDragon() {
                const targetUrl = 'https://stake.com/casino/games/dragon-tower';
                const pages = await browser.pages();
                let targetPage;
                for (let i = 0; i < pages.length; i++) {
                    const url = await pages[i].url();
                    if (url === targetUrl) {
                        targetPage = pages[i];
                        break;
                    }
                }
                if (targetPage) {
                    var jogoPlay = [];
                    var reload = [0];
                    async function retsetarJogo() {
                        clickSacar();
                        console.log('sacar');
                        jogoPlay = [];
                        setTimeout(async () => {
                            const gameResultContent = await targetPage.$eval('.game-result-content', element => element.textContent.trim());
                            console.log(gameResultContent);
                            let winStats = await targetPage.$('span[data-testid="bets-stats-losses"]');
                            let winStatsText = await targetPage.evaluate(winStats => winStats.textContent, winStats);
                            bot.sendMessage(chatID[0], 'Win:' + winStatsText + ' - ' + gameResultContent);
                        }, 2000);
                        setTimeout(async () => {
                            return clickButton();
                        }, 3000);
                    }
                    async function clickSacar() {
                        await targetPage.waitForSelector('button[data-test="cashout-button"]');
                        const betButton = await targetPage.$('button[data-test="cashout-button"]');
                        await betButton.click();
                    }
                    async function clickButtoM() {
                        console.log('clickButtoM');
                        await targetPage.waitForSelector('button[data-test="bet-button"]');
                        const betButton = await targetPage.$('button[data-test="bet-button"]');
                        await betButton.click();
                    }
                    clickButton();
                    async function clickButton() {
                        await targetPage.waitForTimeout(3000);
                        clickButtoM();
                        await targetPage.waitForSelector('button[data-test="bet-button"]');
                        const betButton = await targetPage.$('button[data-test="bet-button"]');
                        await betButton.click();
                        setTimeout(async () => {
                            const numClicks = 4;
                            meuLoop();
                            async function meuLoop() {
                                if (jogoPlay.length == 0) {
                                    for (let i = 0; i < numClicks; i++) {
                                        const buttons = await targetPage.$$(`div[data-test-dragon-tower-tile-row="0-true"] button`);
                                        const randomIndex = Math.floor(Math.random() * buttons.length);
                                        jogoPlay.push(randomIndex);
                                        jogoPlay.push(randomIndex);
                                    }
                                }
                                meuLoopFixo();
                                async function meuLoopFixo() {
                                    console.log('meuLoopFixo');
                                    for (let i = 0; i < numClicks; i++) {
                                        try {
                                            const buttons = await targetPage.$$(`div[data-test-dragon-tower-tile-row="${i}-true"] button`);
                                            const targetButton = buttons[jogoPlay[i]];
                                            await targetButton.click();
                                            await targetPage.waitForTimeout(3000);
                                        }
                                        catch (error) {
                                            console.log('erro no loop');
                                            console.log('perdeu');
                                            clickButton();
                                            break;
                                        }
                                        if (i == numClicks - 1) {
                                            console.log('win');
                                            await targetPage.waitForTimeout(2000);
                                            clicarBotao2(cashoutButton);
                                        }
                                    }
                                }
                                async function meuLoopAleatorio() {
                                    for (let i = 0; i < numClicks; i++) {
                                        try {
                                            const buttons = await targetPage.$$(`div[data-test-dragon-tower-tile-row="0-true"] button`);
                                            const randomIndex = Math.floor(Math.random() * buttons.length);
                                            const targetButton = buttons[randomIndex];
                                            await targetButton.click();
                                            await targetPage.waitForTimeout(3000);
                                        }
                                        catch (error) {
                                            console.log('erro no loop');
                                            console.log('perdeu');
                                            clickButton();
                                            break;
                                        }
                                    }
                                }
                            }
                            await targetPage.waitForSelector('button[data-test="cashout-button"]');
                            const cashoutButton = await targetPage.$('button[data-test="cashout-button"]');
                        }, 3000);
                        async function clicarBotao2(cashoutButton) {
                            try {
                                const winStats = await targetPage.$('span[data-testid="bets-stats-wins"]');
                                const winStatsText = await targetPage.evaluate(winStats => winStats.textContent, winStats);
                                console.log(winStatsText);
                                await cashoutButton.click().then(async () => {
                                    retsetarJogo();
                                }).catch((error) => {
                                    console.log('perdeu');
                                    clickButton();
                                });
                            }
                            catch (error) {
                                console.log('win');
                            }
                        }
                    }
                }
                else {
                    console.log('A página não foi encontrada.');
                }
            }
        }
    }
    async bootMyFriends(request) {
        (0, dotenv_1.config)();
        if (request) {
            console.log(request);
            return;
        }
        const stopMessage = {};
        const TOKEN = Env_1.default.get('BOT_bootMyFriends');
        const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: { interval: 1000 } });
        const api_key = Env_1.default.get('BOT_bootMyFriends_api_key');
        const configuration = new openai_1.Configuration({
            apiKey: api_key,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        bot.on('pre_checkout_query', async (ctx) => {
            console.log('pre_checkout_query' + ctx.total_amount);
            const acceptPayment = true;
            var token;
            var Letras;
            if (ctx.total_amount == 4299) {
                token = 50;
                Letras = 1500000;
            }
            else if (ctx.total_amount == 3699) {
                token = 40;
                Letras = 1200000;
            }
            else if (ctx.total_amount == 2797) {
                token = 30;
                Letras = 900000;
            }
            else if (ctx.total_amount == 1817) {
                token = 20;
                Letras = 600000;
            }
            else if (ctx.total_amount == 939) {
                token = 10;
                Letras = 300000;
            }
            bot.answerPreCheckoutQuery(ctx.id, acceptPayment)
                .then(async (response) => {
                if (acceptPayment) {
                    var user = await AmigoIa_1.default.findByOrFail('chatid', ctx.from.id);
                    console.log(user.token);
                    user.token = String(Number(user.token) + Number(Letras));
                    user.tokensqueimados = 0;
                    user.save();
                    bot.sendMessage(ctx.from.id, `Obrigado pelo pagamento💰! \nForam adicionados:\n\n 💢${token} Tokens💢\n\n 💢${Letras} Letras de respsota💢`).catch(async (err) => {
                        if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                            console.log('bot bloqueado');
                            await AmigoIa_1.default.query().where('chatid', ctx.from.id).delete();
                            await AmigoiaMensagen_1.default.query().where('chatid', ctx.from.id).delete();
                            return;
                        }
                    });
                }
            })
                .catch((error) => {
                console.error('Erro ao responder a consulta de pagamento:');
            });
        });
        var clearHistory = {};
        var clearUser = [];
        setInterval(() => {
            clearUser.forEach(async (user) => {
                var HoraRealNew = new Date();
                var HoraReal = HoraRealNew.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                if (String(HoraReal) > String(clearHistory[user].hora)) {
                    bot.sendMessage(user, 'Seu histórico de conversa foi apagado por segurança!\n\n Seu AMIGO IA está pronto para uma nova conversa!').catch(async (err) => {
                        if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                            console.log('bot bloqueado');
                            await AmigoIa_1.default.query().where('chatid', user).delete();
                            await AmigoiaMensagen_1.default.query().where('chatid', user).delete();
                            return;
                        }
                    });
                    await AmigoiaMensagen_1.default.query().where('chatid', user).delete();
                    delete clearHistory[user];
                    clearUser.splice(clearUser.indexOf(user), 1);
                }
            });
        }, 60000);
        bot.on('message', async (ctx) => {
            var HoraAtual30min = new Date();
            HoraAtual30min.setMinutes(HoraAtual30min.getMinutes() + 10);
            var Hora30 = HoraAtual30min.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            var chatId = Number(ctx.chat.id);
            const mensagemId = ctx.message_id;
            var user;
            console.log(user);
            try {
                user = await AmigoIa_1.default.query().where('chatid', chatId).first();
            }
            catch (err) {
                console.log('erro ao buscar usuario');
            }
            console.log(chatId);
            if (stopMessage[chatId] == true) {
                bot.sendMessage(chatId, 'Já estou respondendo a sua mensagem, aguarde um pouco!').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            async function createSecureServer() {
                console.log('criando usuario:', chatId);
                await Database_1.default.transaction(async (trx) => {
                    const Amigo = new AmigoIa_1.default();
                    Amigo.chatid = String(chatId);
                    Amigo.token = String(5000);
                    Amigo.tokensqueimados = 0;
                    Amigo.useTransaction(trx);
                    await Amigo.save();
                });
            }
            if (user == null || user == undefined || user == '') {
                createSecureServer();
                bot.sendMessage(chatId, `Olá 👋, eu sou o Amigo IA, estou aqui para te ajudar, para mais comandos, clique em "🟰menu" e veja a lista de comandos. \n\n📍Você recebeu 5000 letras de resposta para começar!📍`).catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            var prompt = String(ctx.text);
            if (prompt == '/start') {
                setTimeout(() => {
                    bot.sendMessage(chatId, 'Olá 👋, eu sou o Amigo IA, estou aqui para te ajudar, para mais comandos, clique em "🟰menu" e veja a lista de comandos').catch(async (err) => {
                        if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                            console.log('bot bloqueado');
                            await AmigoIa_1.default.query().where('chatid', chatId).delete();
                            await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                            return;
                        }
                    });
                    return;
                }, 2000);
            }
            if (prompt == '/sair') {
                console.log('sair');
                bot.sendMessage(chatId, 'Até mais, volte sempre!').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            if (prompt == '/ajuda') {
                console.log('ajuda');
                bot.sendMessage(chatId, 'Para ter melhor resultado, faça uma pergunta o mais especifica possível, quanto mais especifica for a pergunta, melhor será a resposta, converse comigo como se estivesse conversando com uma pessoa, lemre-se que eu sou um robô, não sou perfeito, mas estou sempre aprendendo!').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            if (prompt == '/sobre') {
                console.log('sobre');
                bot.sendMessage(chatId, 'Olá! Sou seu AMIGO IA, um assistente virtual capaz de fornecer informações e responder perguntas sobre diversos assuntos, desde notícias até receitas de cozinha. Meu objetivo é ajudá-lo a encontrar as informações de que precisa de maneira rápida e eficiente. Além disso, estou sempre aprendendo e me aprimorando, para poder oferecer cada vez mais recursos e funcionalidades úteis para você. Espero poder ser seu amigo virtual por muito tempo, caso queira sair, digite "/sair"').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            if (prompt == '/meustokens') {
                console.log('meustokens');
                const tokens = await AmigoIa_1.default.query().where('chatid', chatId).first();
                var qtd = tokens?.token;
                bot.sendMessage(chatId, `📝 TOTAL DISPONIVEL 📝\n\n ⭕️${qtd} Letras de resposta⭕️ `).catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            if (prompt == '/sobre_token') {
                console.log('Sobre-Token');
                bot.sendMessage(chatId, 'Os tokens são a moeda do Amigo IA, cada token equivale a 30.000 letras de resposta.\n\nVocê pode comprar tokens para ter mais letras de resposta, para comprar tokens, clique em "🟰menu" e clique em "comprar tokens", os tokens também são usados nos audios.\n\n📍AUDIO: 1 segundo = 5 letras de resposta📍').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            chatId = Number(chatId);
            if (prompt == '/comprartokens') {
                console.log('comprartokens233332');
                const stripe = require('stripe')(process.env.AMIGOIA_STRIPE_SECRET_KEY);
                var title;
                var description;
                var payload = String(chatId);
                const providerToken = '350862534:LIVE:MjIzZGNlOTJlM2Zh';
                const currency = 'BRL';
                var prices;
                var photoUrl;
                const startParameter = 'PagamentoAmigoIA';
                bot.setWebHook(`www.spybet.com.br/payment/webhook-amigoia`).then(() => {
                    console.log('webhook setado');
                }).catch(error => {
                    console.log('erro ao setar webhook');
                });
                await token30();
                async function token30() {
                    title = '30 TOKENS AMIGO IA';
                    description = 'Com este plano será acrecentado 30 tokens para utilizar até que os tokens acabem, sem tempo de expiração. Esses tokens equivalem a 900 Mil letras. Exemplo: Um livro de 80 paginas tem em média 150 Mil letras.';
                    prices = [{ label: '30 TOKENS AMIGO IA', amount: 1297 }];
                    photoUrl = 'https://i.imgur.com/QXs9gab.png';
                    await criarInvoice();
                    setTimeout(async () => {
                        await token40();
                    }, 2000);
                }
                async function token40() {
                    title = '40 TOKENS AMIGO IA';
                    description = 'Com este plano será acrecentado 40 tokens para utilizar até que os tokens acabem, sem tempo de expiração. Esses tokens equivalem a 1.2 Milhões letras. Exemplo: Um livro de 80 paginas tem em média 150 Mil letras.';
                    prices = [{ label: '40 TOKENS AMIGO IA', amount: 1899 }];
                    photoUrl = 'https://i.imgur.com/G086lnq.png';
                    await criarInvoice();
                    setTimeout(async () => {
                        await token50();
                    }, 2000);
                }
                async function token50() {
                    title = '50 TOKENS AMIGO IA';
                    description = 'Com este plano será acrecentado 50 tokens para utilizar até que os tokens acabem, sem tempo de expiração. Esses tokens equivalem a 1.5 Milhões letras. Exemplo: Um livro de 80 paginas tem em média 150 Mil letras.';
                    prices = [{ label: '50 TOKENS AMIGO IA', amount: 2499 }];
                    photoUrl = 'https://i.imgur.com/kRnJ0HF.png';
                    await criarInvoice();
                }
                async function criarInvoice() {
                    bot.sendInvoice(chatId, title, description, payload, providerToken, currency, prices, { start_parameter: startParameter, photo_url: photoUrl })
                        .then(sent => 'invoice sent')
                        .catch(error => console.log('deu ruim no invoice'));
                }
                return;
            }
            var resposta;
            if (Number(user.token) <= 0) {
                bot.sendMessage(chatId, `Você não tem tokens suficientes para fazer uma pergunta, para comprar tokens, clique em "🟰 menu" e clique em "comprar tokens"`).catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                return;
            }
            if (prompt == '/start' || prompt == '/sair' || prompt == '/ajuda ' || prompt == '/sobre' || prompt == '/meustokens' || prompt == '/sobre_token' || prompt == '/comprartokens') {
                return;
            }
            const historico = await allMensagens(chatId);
            if (ctx.voice != undefined) {
                console.log('audio');
                bot.sendMessage(chatId, 'Estou ouvindo, aguarde um momento...').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                stopMessage[chatId] = true;
                const audioFileId = ctx.voice.file_id;
                const audioFile = await bot.getFile(audioFileId);
                const audioFilePath = audioFile.file_path;
                const rootDir = path.join(__dirname, '/../../../');
                const voicePath = path.join(rootDir, 'voice');
                const fileName = String(audioFileId).split('/')[0];
                const fileName2 = String(audioFilePath).split('/')[1];
                var time = ctx.voice.duration * 5;
                let amigoIa = await AmigoIa_1.default.findByOrFail('chatid', chatId);
                amigoIa.token = String(amigoIa.token - time);
                amigoIa.tokensqueimados = amigoIa.tokensqueimados + time;
                amigoIa.save();
                if (!fs.existsSync(voicePath)) {
                    fs.mkdirSync(voicePath);
                }
                bot.downloadFile(audioFileId, voicePath).then(() => {
                    setTimeout(() => {
                        convertFile(fileName2, chatId, mensagemId);
                    }, 2000);
                    setTimeout(() => {
                        const filePath2 = path.join(rootDir, 'voice', fileName2);
                        const filePath3 = path.join(rootDir, 'voice', String(fileName2).split('.')[0] + '.wav');
                        try {
                            fs.unlinkSync(filePath2);
                            fs.unlinkSync(filePath3);
                        }
                        catch (err) {
                            console.error(`Erro ao excluir o arquivo ${filePath2}: ${err}`);
                        }
                    }, 15000);
                }).catch((err) => {
                    console.error(err);
                });
                return;
            }
            if (ctx.photo != undefined) {
                console.log('imagem');
                bot.sendMessage(chatId, 'Ainda não sei ver imagens, mas em breve vou aprender!, por enquanto, digite sua mensagem').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
            }
            if (ctx.text != undefined) {
                console.log('texto');
                if (prompt.length > 500) {
                    bot.sendMessage(chatId, 'A mensagem não pode ter mais de 500 caracteres').catch(async (err) => {
                        if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                            await AmigoIa_1.default.query().where('chatid', chatId).delete();
                            await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                            return;
                        }
                    });
                    return;
                }
                await Database_1.default.transaction(async (trx) => {
                    const mensagemUser = new AmigoiaMensagen_1.default();
                    mensagemUser.chatid = chatId;
                    mensagemUser.texto = prompt;
                    mensagemUser.tipo = 'mensagem-user:';
                    mensagemUser.mensagemid = mensagemId;
                    await mensagemUser.useTransaction(trx);
                    await mensagemUser.save();
                });
                historico != undefined ? prompt = '[' + historico + '] < Historico anterior | Rssponda de forma objetiva essa mensagem >' + prompt : prompt = prompt;
                let prompt2 = historico + prompt;
                resposta = await chatGpt3(prompt2);
                let amigoIa = await AmigoIa_1.default.findByOrFail('chatid', chatId);
                amigoIa.token = String(Number(amigoIa.token) - (resposta.length + prompt.length));
                amigoIa.tokensqueimados = amigoIa.tokensqueimados + resposta.length;
                amigoIa.save();
                bot.sendMessage(chatId, resposta).catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                        return;
                    }
                });
                if (clearHistory[chatId] == undefined) {
                    clearUser.push(chatId);
                    clearHistory[chatId] = {
                        hora: Hora30
                    };
                    console.log('criou:' + clearHistory[chatId].hora);
                }
                else {
                    clearHistory[chatId].hora = Hora30;
                    console.log('deletou e criou novamente:' + clearHistory[chatId].hora);
                }
                delete stopMessage[chatId];
                await Database_1.default.transaction(async (trx) => {
                    const mensagemBot = new AmigoiaMensagen_1.default();
                    mensagemBot.chatid = Number(chatId);
                    mensagemBot.texto = resposta?.replace(/OpenAI/g, "Amigo IA").replace(/openai/g, "Amigo IA").replace(/OPENAI/g, "Amigo IA").replace(/chatgpt/g, "Amigo IA").replace(/chat gpt/g, "Amigo IA");
                    mensagemBot.tipo = 'mensagem-resposta:';
                    mensagemBot.mensagemid = mensagemId;
                    await mensagemBot.useTransaction(trx);
                    await mensagemBot.save();
                });
            }
        });
        async function chatGpt3(prompt) {
            console.log('iniciando chat');
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 500,
                temperature: 0.1,
                top_p: 1,
                n: 1,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });
            var response2 = response.data.choices[0].message?.content;
            response2 = response2?.replace(/OpenAI/g, "Amigo IA").replace(/openai/g, "Amigo IA").replace(/OPENAI/g, "Amigo IA").replace(/chatgpt/g, "Amigo IA").replace(/chat gpt/g, "Amigo IA");
            return response2;
        }
        function convertFile(filePath, chatId, mensagemId) {
            console.log('convertendo arquivo');
            const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
            const ffmpeg = require('fluent-ffmpeg');
            ffmpeg.setFfmpegPath(ffmpegPath);
            var command = ffmpeg();
            const rootDir = path.join(__dirname, '/../../../');
            const inputPath = path.join(rootDir, 'voice', filePath);
            const outputPath = path.join(rootDir, 'voice', `${String(filePath).split('.')[0]}.wav`);
            command.input(inputPath)
                .output(outputPath)
                .on('end', function () {
                console.log('Arquivo convertido com sucesso!');
                transcribeAudio(outputPath, chatId, mensagemId);
            })
                .on('error', function (err) {
                console.log('Erro: ' + err.message);
            })
                .run();
        }
        async function transcribeAudio(audioFilePath, chatId, mensagemId, historico) {
            const resp = await openai.createTranscription(fs.createReadStream(audioFilePath), "whisper-1");
            await Database_1.default.transaction(async (trx) => {
                const mensagemUser = new AmigoiaMensagen_1.default();
                mensagemUser.chatid = chatId;
                mensagemUser.texto = resp.data.text;
                mensagemUser.tipo = 'mensagem-user:';
                mensagemUser.mensagemid = mensagemId;
                await mensagemUser.useTransaction(trx);
                await mensagemUser.save();
            });
            let prompt;
            if (resp.data.text.length > 1000) {
                bot.sendMessage(chatId, 'Desculpa o esta muito grande, por favor, diminua o tamanho do audio e tente novamente').catch(async (err) => {
                    if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                        console.log('bot bloqueado');
                        await AmigoIa_1.default.query().where('chatid', chatId).delete();
                        await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                    }
                });
                return;
            }
            historico != undefined ? prompt = '[' + historico + '] < Historico anterior |  Rssponda de forma objetiva essa mensagem  >' + resp.data.text : prompt = resp.data.text;
            let prompt2 = historico + prompt;
            let resposta = await chatGpt3(prompt2);
            resposta = resposta?.replace(/OpenAI/g, "Amigo IA").replace(/openai/g, "Amigo IA").replace(/OPENAI/g, "Amigo IA").replace(/chatgpt/g, "Amigo IA").replace(/chat gpt/g, "Amigo IA");
            let amigoIa = await AmigoIa_1.default.findByOrFail('chatid', chatId);
            amigoIa.token = String(Number(amigoIa.token) - (Number(resposta.length) + Number(prompt.length)));
            amigoIa.tokensqueimados = amigoIa.tokensqueimados + resposta.length;
            amigoIa.save();
            bot.sendMessage(chatId, resposta).catch(async (err) => {
                if (err.code.includes('ETELEGRAM: 403 Forbidden: bot was blocked by the user')) {
                    console.log('bot bloqueado');
                    await AmigoIa_1.default.query().where('chatid', chatId).delete();
                    await AmigoiaMensagen_1.default.query().where('chatid', chatId).delete();
                }
                return;
            });
            delete stopMessage[chatId];
            console.log(clearHistory[chatId]);
            if (clearHistory[chatId] == undefined) {
                clearUser.push(chatId);
                clearHistory[chatId] = {
                    hora: Hora30
                };
            }
            else {
                clearHistory[chatId].hora = Hora30;
            }
            await Database_1.default.transaction(async (trx) => {
                const mensagemBot = new AmigoiaMensagen_1.default();
                mensagemBot.chatid = Number(chatId);
                mensagemBot.texto = resposta?.replace(/OpenAI/g, "Amigo IA").replace(/openai/g, "Amigo IA").replace(/OPENAI/g, "Amigo IA").replace(/chatgpt/g, "Amigo IA").replace(/chat gpt/g, "Amigo IA");
                mensagemBot.tipo = 'mensagem-resposta:';
                mensagemBot.mensagemid = mensagemId;
                await mensagemBot.useTransaction(trx);
                await mensagemBot.save();
            });
        }
        async function allMensagens(chatId) {
            try {
                const messages = await AmigoiaMensagen_1.default.query().where('chatid', chatId).limit(6);
                var messages2 = [];
                messages.forEach(element => {
                    messages2.push(element.tipo + element.texto);
                });
                return messages2;
            }
            catch (err) {
                console.log('nenhuma mensagem');
            }
        }
    }
    async botBlackJack() {
        const TOKEN = '6127527742:AAHJP6zVjgRTzSjnBdA3e4fWkHlqI_BTvmU';
        const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: { interval: 1000 } });
        let users = {};
        function saveUserScore(chatId, score) {
            if (!users[chatId]) {
                users[chatId] = {
                    'hora': 0,
                    'valores': {
                        'cartaAlta': {
                            'valor': 160,
                            'probabilidade': 0,
                        },
                        'cartaNeutra': {
                            'valor': 96,
                            'probabilidade': 0,
                        },
                        'cartaBaixa': {
                            'valor': 160,
                            'probabilidade': 0,
                        },
                        'cartasTotais': 8 * 52,
                    }
                };
            }
            users[chatId].hora = new Date().toISOString();
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log("Informações do usuário salvas com sucesso!");
                }
            });
        }
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const mensagemId = msg.message_id;
            const texto = msg.text;
            console.log(users[chatId]);
            if (users[chatId] == undefined) {
                saveUserScore(chatId, {
                    'cartaAlta': {
                        'valor': 160,
                        'probabilidade': 0,
                    },
                    'cartaNeutra': {
                        'valor': 96,
                        'probabilidade': 0,
                    },
                    'cartaBaixa': {
                        'valor': 160,
                        'probabilidade': 0,
                    },
                    'cartasTotais': 8 * 52,
                });
            }
            else {
                users[chatId].hora = new Date().toISOString();
                if (texto == '-1') {
                    users[chatId].valores.cartaAlta.valor = users[chatId].valores.cartaAlta.valor - 1;
                    users[chatId].valores.cartasTotais = users[chatId].valores.cartasTotais - 1;
                    users[chatId].valores.cartaAlta.probabilidade = (users[chatId].valores.cartaAlta.valor / users[chatId].valores.cartasTotais) * 100;
                }
                else if (texto == '0') {
                    users[chatId].valores.cartaNeutra.valor = users[chatId].valores.cartaNeutra.valor - 1;
                    users[chatId].valores.cartasTotais = users[chatId].valores.cartasTotais - 1;
                    users[chatId].valores.cartaNeutra.probabilidade = (users[chatId].valores.cartaNeutra.valor / users[chatId].valores.cartasTotais) * 100;
                }
                else if (texto == '1') {
                    users[chatId].valores.cartaBaixa.valor = users[chatId].valores.cartaBaixa.valor - 1;
                    users[chatId].valores.cartasTotais = users[chatId].valores.cartasTotais - 1;
                    users[chatId].valores.cartaBaixa.probabilidade = (users[chatId].valores.cartaBaixa.valor / users[chatId].valores.cartasTotais) * 100;
                }
                else if (texto == 'Reset') {
                    users[chatId].valores.cartaAlta.valor = 160;
                    users[chatId].valores.cartaNeutra.valor = 96;
                    users[chatId].valores.cartaBaixa.valor = 160;
                    users[chatId].valores.cartasTotais = 8 * 52;
                    users[chatId].valores.cartaAlta.probabilidade = 0;
                    users[chatId].valores.cartaNeutra.probabilidade = 0;
                    users[chatId].valores.cartaBaixa.probabilidade = 0;
                }
                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("Informações do usuário salvas com sucesso!");
                    }
                });
            }
            bot.sendMessage(chatId, `Porcentagem de acerto para carta alta: ${users[chatId].valores.cartaAlta.probabilidade.toFixed(2)}%\nCartas Alta: ${users[chatId].valores.cartaAlta.valor}\nPorcentagem de acerto para carta neutra: ${users[chatId].valores.cartaNeutra.probabilidade.toFixed(2)}%\nCartas Neutra: ${users[chatId].valores.cartaNeutra.valor}\nPorcentagem de acerto para carta baixa: ${users[chatId].valores.cartaBaixa.probabilidade.toFixed(2)}%\nCartas Baixa: ${users[chatId].valores.cartaBaixa.valor}`, {
                reply_markup: {
                    keyboard: [
                        [{ text: '-1' }, { text: '0' }, { text: '1' }],
                        [{ text: 'Reset' }]
                    ]
                }
            });
        });
    }
}
exports.default = NewBotController;
//# sourceMappingURL=NewBotController.js.map