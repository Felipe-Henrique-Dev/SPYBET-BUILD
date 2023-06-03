"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const GluckDouble_1 = __importDefault(require("../../Models/GluckDouble"));
const PadroesGluckDouble_1 = __importDefault(require("../../Models/PadroesGluckDouble"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class GluckDoubleController {
    async GluckDouble() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketAuthStringOne = '42' + JSON.stringify(["join-in-room", "double-room"]);
        open();
        function open() {
            var SocketGluckDouble = new Websocket('wss://gluck-ws-games-mfgep5u4mq-rj.a.run.app/socket.io/?EIO=4&transport=websocket');
            SocketGluckDouble.onopen = () => {
                SocketGluckDouble.onmessage = (msg) => {
                    if (msg.data[0] == '0') {
                        SocketGluckDouble.send('40');
                    }
                    if ((msg.data[0] + msg.data[1] + msg.data[2]) == '40{') {
                        SocketGluckDouble.send(SocketAuthStringOne);
                        SocketGluckDouble.send(SocketAuthStringOne);
                    }
                    responseMSG(msg);
                };
            };
            SocketGluckDouble.onclose = function (e) {
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketGluckDouble.onerror = function (err) {
                SocketGluckDouble.close();
            };
            let ç = [];
            let ç2 = [];
            function responseMSG(e) {
                if (e.data[0] == '2') {
                    SocketGluckDouble.send('3');
                }
                if (!e) {
                    return;
                }
                else {
                    var I = e.data.split('42["tick",');
                    var i = (I[1] + '[').split(',');
                    if (i.length == 1) {
                        return;
                    }
                    if (i.length == 3) {
                        ç = [];
                        return;
                    }
                    if (ç.length == 20 && i.length == 6) {
                        let doubleColor = i[1].split(':')[1].replace(/\"/g, '');
                        let doubleNumber = i[2].split(':')[1];
                        ç.push(1);
                        double(doubleColor, doubleNumber);
                    }
                    if (i.length == 6) {
                        ç.push(1);
                    }
                }
            }
        }
        async function double(doubleColor, doubleNumber) {
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            if (doubleNumber === 0) {
                doubleNumber = '<img src="/assets/images/gluck.177bda35.svg">';
            }
            String(doubleHora);
            String(doubleNumber);
            if (doubleNumber === undefined) {
                return;
            }
            await Database_1.default.transaction(async (trx) => {
                const newdouble = new GluckDouble_1.default();
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
                Ws_2.default.io.emit('DoubleGluck', {
                    double_point: doubleNumber,
                    double_cor: doubleColor,
                    double_hora: doubleHora,
                    selectionSugestao: Sugestao,
                    cont: cont[0],
                });
            }, 5000);
        }
        var selection = [];
        async function sugestao(doubleColor) {
            if (doubleColor === undefined) {
                return;
            }
            let Point = String(doubleColor);
            if (DoubleWhiteHR.length === 0) {
                var double = await GluckDouble_1.default.query().where('double_cor', 'white').select('double_hora');
                for (let i = 0; i < double.length; i++) {
                    DoubleWhiteHR.push(double[i].double_hora);
                }
                return;
            }
            var nextFiveMinutes = new Date();
            var HoraAtual = nextFiveMinutes.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + (nextFiveMinutes.getMinutes() + 1).toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            var HoraAtualMaisUm = nextFiveMinutes.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + (nextFiveMinutes.getMinutes() + 1).toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            var HoraAtualMaisCincoMinutos = nextFiveMinutes.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + (nextFiveMinutes.getMinutes() + 7).toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            var qtdWhiteNextFiveMinutes = DoubleWhiteHR.filter(function (el) {
                return el >= HoraAtual && el <= HoraAtualMaisCincoMinutos;
            });
            console.log('glunk| Fora:' + HoraAtualMaisUm + '-' + HoraAtualMaisCincoMinutos + ' ' + qtdWhiteNextFiveMinutes.length);
            if (qtdWhiteNextFiveMinutes.length > 14 && selectDoubleWhiteHR.length === 0) {
                selectDoubleWhiteHR.push(HoraAtualMaisUm + '-' + HoraAtualMaisCincoMinutos);
                console.log('glunk| DENTRO:' + HoraAtualMaisUm + '-' + HoraAtualMaisCincoMinutos + ' ' + qtdWhiteNextFiveMinutes.length);
            }
            if (selectDoubleWhiteHR.length > 0) {
                let i = selectDoubleWhiteHR[0].split('-')[1];
                if (i < HoraAtual) {
                    selectDoubleWhiteHR = [];
                }
            }
            return;
            if (DoublePoint.length === 0) {
                var double = await GluckDouble_1.default.query().select('double_cor');
                for (let i = 0; i < double.length; i++) {
                    let j = double[i].double_cor;
                    if (j === '<img src="http://localhost:8080/assets/images/gluck.06d0155e.png">') {
                        j = 'white';
                    }
                    DoublePoint.push(j);
                }
                return;
            }
            if (positionBlack.length === 0) {
                for (let i = 0; i < DoublePoint.length; i++) {
                    if (DoublePoint[i] == 'red') {
                        positionRed.push(i);
                    }
                    if (DoublePoint[i] == 'black') {
                        positionBlack.push(i);
                    }
                    if (DoublePoint[i] == 'white') {
                        positionWhite.push(i);
                    }
                    else {
                        Sugestao.length = 0;
                        selection.length = 0;
                    }
                }
                return;
            }
            if (seq.length < 26) {
                seq.push(Point);
                return;
            }
            seq.push(Point);
            seq.shift();
            if (Sugestao[0] == 'RED' && Point == Sugestao[1]) {
                cont = [-1];
                porcentagemTotal.push(Number(porcentagemTotal[0]) + 1);
                porcentagemTotal.shift();
                acertos.push(Number(acertos[0]) + 1);
                acertos.shift();
                Sugestao.length = 0;
                return;
            }
            if (cont[0] == 3) {
                cont = [-1];
                porcentagemTotal.push(Number(porcentagemTotal[0]) + 1);
                porcentagemTotal.shift();
                Sugestao.length = 0;
                return;
            }
            selection.length = 0;
            Sugestao.length = 0;
            if (Point == 'white') {
                for (let i = 5; i < positionWhite.length; i++) {
                    if (seq[25] == DoublePoint[positionWhite[i]] && seq[24] == DoublePoint[positionWhite[i] - 1] && seq[23] == DoublePoint[positionWhite[i] - 2] && seq[22] == DoublePoint[positionWhite[i] - 3] && seq[21] == DoublePoint[positionWhite[i] - 4] && seq[20] == DoublePoint[positionWhite[i] - 5] && seq[19] == DoublePoint[positionWhite[i] - 6] && seq[18] == DoublePoint[positionWhite[i] - 7] && seq[17] == DoublePoint[positionWhite[i] - 8] && seq[16] == DoublePoint[positionWhite[i] - 9] && seq[15] == DoublePoint[positionWhite[i] - 10] && seq[14] == DoublePoint[positionWhite[i] - 11] && seq[13] == DoublePoint[positionWhite[i] - 12] && seq[12] == DoublePoint[positionWhite[i] - 13] && seq[11] == DoublePoint[positionWhite[i] - 14] && seq[10] == DoublePoint[positionWhite[i] - 15] && seq[9] == DoublePoint[positionWhite[i] - 16]) {
                        if (DoublePoint[positionWhite[i] + 1] == 'white') {
                            selection.push('white');
                        }
                        else if (DoublePoint[positionWhite[i + 1]] == 'red') {
                            selection.push('red');
                        }
                        else if (DoublePoint[positionWhite[i] + 1] == 'black') {
                            selection.push('black');
                        }
                        if (!(Sugestao[0] == 'RED')) {
                            Sugestao.push('RED');
                        }
                    }
                }
            }
            if (Point == 'red') {
                for (let i = 5; i < positionRed.length; i++) {
                    if (seq[25] == DoublePoint[positionRed[i]] && seq[24] == DoublePoint[positionRed[i] - 1] && seq[23] == DoublePoint[positionRed[i] - 2] && seq[22] == DoublePoint[positionRed[i] - 3] && seq[21] == DoublePoint[positionRed[i] - 4] && seq[20] == DoublePoint[positionRed[i] - 5] && seq[19] == DoublePoint[positionRed[i] - 6] && seq[18] == DoublePoint[positionRed[i] - 7] && seq[17] == DoublePoint[positionRed[i] - 8] && seq[16] == DoublePoint[positionRed[i] - 9] && seq[15] == DoublePoint[positionRed[i] - 10] && seq[14] == DoublePoint[positionRed[i] - 11] && seq[13] == DoublePoint[positionRed[i] - 12] && seq[12] == DoublePoint[positionRed[i] - 13] && seq[11] == DoublePoint[positionRed[i] - 14] && seq[10] == DoublePoint[positionRed[i] - 15] && seq[9] == DoublePoint[positionRed[i] - 16]) {
                        if (DoublePoint[positionRed[i] + 1] == 'white') {
                            selection.push('white');
                        }
                        else if (DoublePoint[positionRed[i + 1]] == 'red') {
                            selection.push('red');
                        }
                        else if (DoublePoint[positionRed[i] + 1] == 'black') {
                            selection.push('black');
                        }
                        if (!(Sugestao[0] == 'RED')) {
                            Sugestao.push('RED');
                        }
                    }
                }
            }
            if (Point == 'black') {
                for (let i = 5; i < positionBlack.length; i++) {
                    if (seq[25] == DoublePoint[positionBlack[i]] && seq[24] == DoublePoint[positionBlack[i] - 1] && seq[23] == DoublePoint[positionBlack[i] - 2] && seq[22] == DoublePoint[positionBlack[i] - 3] && seq[21] == DoublePoint[positionBlack[i] - 4] && seq[20] == DoublePoint[positionBlack[i] - 5] && seq[19] == DoublePoint[positionBlack[i] - 6] && seq[18] == DoublePoint[positionBlack[i] - 7] && seq[17] == DoublePoint[positionBlack[i] - 8] && seq[16] == DoublePoint[positionBlack[i] - 9] && seq[15] == DoublePoint[positionBlack[i] - 10] && seq[14] == DoublePoint[positionBlack[i] - 11] && seq[13] == DoublePoint[positionBlack[i] - 12] && seq[12] == DoublePoint[positionBlack[i - 13]] && seq[11] == DoublePoint[positionBlack[i] - 14] && seq[10] == DoublePoint[positionBlack[i] - 15] && seq[9] == DoublePoint[positionBlack[i] - 16]) {
                        if (DoublePoint[positionBlack[i] + 1] == 'white') {
                            selection.push('white');
                        }
                        else if (DoublePoint[positionBlack[i + 1]] == 'red') {
                            selection.push('red');
                        }
                        else if (DoublePoint[positionBlack[i] + 1] == 'black') {
                            selection.push('black');
                        }
                        if (!(Sugestao[0] == 'RED')) {
                            Sugestao.push('RED');
                        }
                    }
                }
            }
            let filerCorBlack = selection.filter((item) => item === 'black').length;
            let filerCorRed = selection.filter((item) => item === 'red').length;
            let filerCorWhite = selection.filter((item) => item === 'white').length;
            const updatedouble = new Date();
            let doubleHora = updatedouble.getHours().toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) + ':' + updatedouble.getMinutes().toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            let redHoraAgora = await GluckDouble_1.default.query().where('double_hora', doubleHora).where('double_cor', 'red');
            let blackHoraAgora = await GluckDouble_1.default.query().where('double_hora', doubleHora).where('double_cor', 'black');
            let whiteHoraAgora = await GluckDouble_1.default.query().where('double_hora', doubleHora).where('double_cor', 'white');
            if (Sugestao[0] == 'RED') {
                if (filerCorBlack > filerCorRed && blackHoraAgora.length > redHoraAgora.length) {
                    cont.push(cont[0] + 1);
                    cont.shift();
                    Sugestao.push('black');
                }
                else if (filerCorRed > filerCorBlack && redHoraAgora.length > blackHoraAgora.length) {
                    cont.push(cont[0] + 1);
                    cont.shift();
                    Sugestao.push('red');
                }
                else if (filerCorWhite > filerCorBlack && filerCorWhite > filerCorRed && whiteHoraAgora.length > blackHoraAgora.length && whiteHoraAgora.length > redHoraAgora.length) {
                    Sugestao.push('white');
                    cont.push[cont[0] + 1];
                    cont.shift();
                }
                else {
                    Sugestao.length = 0;
                    selection.length = 0;
                }
            }
            if (Sugestao[0] == 'RED') {
                let porcentagem1 = ((acertos[0] * 100) / porcentagemTotal[0]).toFixed(2);
                Sugestao.push(porcentagem1 + '%');
            }
            selection.length = 0;
        }
        var DoublePoint = [];
        var DoubleWhiteHR = [];
        var selectDoubleWhiteHR = [];
        var DoublePoint = [];
        var seq = [];
        var positionRed = [];
        var positionBlack = [];
        var positionWhite = [];
        var porcentagemTotal = [0];
        var acertos = [0];
        var Sugestao = [];
        var cont = [-1];
        var cores = [[0], [0], [0]];
        var WhiteToday = [];
        var RedToday = [];
        var BlackToday = [];
        var DataEstatisticas = [];
        Ws_2.default.io.on('connection', (SocketGluckDouble) => {
            SocketGluckDouble.on('pingBD', (data) => {
                SocketGluckDouble.emit('pongBD', data);
            });
            SocketGluckDouble.on('qtJogosGluckDouble', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await GluckDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await GluckDouble_1.default.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    var dataHoje = new Date();
                    var dataHoje2 = dataHoje.getFullYear() + '-' + (dataHoje.getMonth() + 1) + '-' + dataHoje.getDate();
                    if (WhiteToday.length == 0 && RedToday.length == 0 && BlackToday.length == 0 && DataEstatisticas[0] !== dataHoje2) {
                        DataEstatisticas = [];
                        WhiteToday = [];
                        RedToday = [];
                        BlackToday = [];
                        DataEstatisticas.push(dataHoje2);
                        var whiteToday = await GluckDouble_1.default.query().where('double_cor', 'white').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var redToday = await GluckDouble_1.default.query().where('double_cor', 'red').where('created_at', '>=', dataHoje2 + ' 00:00:00');
                        var blackToday = await GluckDouble_1.default.query().where('double_cor', 'black').where('created_at', '>=', dataHoje2 + ' 00:00:00');
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
                    Ws_2.default.io.emit('DoubleGluck', {
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
            SocketGluckDouble.on('gluckDoubleNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesGluckDouble_1.default.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketGluckDouble.on('gluckDoubleGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesGluckDouble_1.default.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('DoubleGluck', { listPadrao2 });
                }
            });
            SocketGluckDouble.once('gluckDoubleDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesGluckDouble_1.default.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketGluckDouble.on('PadroesShareGluckDouble', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                GluckDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function GluckDouble(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesGluckDouble_1.default.query().where('id', idPadraoBusca).first();
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
                        SocketGluckDouble.emit('PadroesShareGluckDoubleMsg', { error: 'Padrão já compartilhado' });
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
                        SocketGluckDouble.emit('PadroesShareGluckDoubleMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = GluckDoubleController;
//# sourceMappingURL=GluckDoubleController.js.map