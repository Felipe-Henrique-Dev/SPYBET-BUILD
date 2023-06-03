"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(require("../../Services/Ws"));
const Ws_2 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const PadroesCompartilhado_1 = __importDefault(require("../../Models/PadroesCompartilhado"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class StakeCrashController {
    async StakeCrash() {
        Ws_1.default.boot();
        const Websocket = require('ws');
        var SocketSubscribeString = '{"type":"connection_init","payload":{"language":"br","lockdownToken":"s5MNWtjTM5TvCMkAzxov"}}';
        var SocketAuthStringOne = '{"id":"13568344-aa5d-4932-baae-4237f8b1895a","type":"subscribe","payload":{"query":"subscription AvailableBalances {\n  availableBalances {\n    amount\n    identifier\n    balance {\n      amount\n      currency\n    }\n  }\n}\n"}}';
        var SocketAuthStringTwo = '{"id":"2d937c9b-2bb6-4312-aa4f-df26ef3c28e1","type":"subscribe","payload":{"query":"subscription VaultBalances {\n  vaultBalances {\n    amount\n    identifier\n    balance {\n      amount\n      currency\n    }\n  }\n}\n"}}';
        var SocketAuthStringTree = '{"id":"49f95e06-fe34-4bca-9741-6bad9476bf66","type":"subscribe","payload":{"query":"subscription Crash {\n  crash {\n    event {\n      ... on MultiplayerCrash {\n        ...MultiplayerCrash\n      }\n      ... on MultiplayerCrashBet {\n        ...MultiplayerCrashBet\n      }\n      __typename\n    }\n  }\n}\n\nfragment MultiplayerCrash on MultiplayerCrash {\n  id\n  status\n  multiplier\n  startTime\n  nextRoundIn\n  crashpoint\n  elapsed\n  timestamp\n  cashedIn {\n    id\n    user {\n      id\n      name\n    }\n    payoutMultiplier\n    gameId\n    amount\n    payout\n    currency\n    result\n    updatedAt\n    cashoutAt\n    btcAmount: amount(currency: btc)\n  }\n  cashedOut {\n    id\n    user {\n      id\n      name\n    }\n    payoutMultiplier\n    gameId\n    amount\n    payout\n    currency\n    result\n    updatedAt\n    cashoutAt\n    btcAmount: amount(currency: btc)\n  }\n}\n\nfragment MultiplayerCrashBet on MultiplayerCrashBet {\n  id\n  user {\n    id\n    name\n  }\n  payoutMultiplier\n  gameId\n  amount\n  payout\n  currency\n  result\n  updatedAt\n  cashoutAt\n  btcAmount: amount(currency: btc)\n}\n"}}';
        var SocketAuthStringFour = '{"id":"3c4f1c09-f17e-4177-a5e4-fc619ee95144","type":"subscribe","payload":{"query":"subscription HighrollerHouseBetsSubscription {\n  highrollerHouseBets {\n    ...RealtimeHouseBet\n  }\n}\n\nfragment RealtimeHouseBet on Bet {\n  id\n  iid\n  game {\n    name\n    icon\n  }\n  bet {\n    __typename\n    ... on CasinoBet {\n      id\n      active\n      payoutMultiplier\n      amountMultiplier\n      amount\n      payout\n      updatedAt\n      currency\n      user {\n        id\n        name\n      }\n    }\n    ... on EvolutionBet {\n      id\n      amount\n      currency\n      createdAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n      }\n    }\n    ... on MultiplayerCrashBet {\n      id\n      payoutMultiplier\n      amount\n      payout\n      currency\n      updatedAt\n      user {\n        id\n        name\n      }\n    }\n    ... on MultiplayerSlideBet {\n      id\n      payoutMultiplier\n      amount\n      payout\n      currency\n      updatedAt\n      createdAt\n      user {\n        id\n        name\n      }\n    }\n    ... on SoftswissBet {\n      id\n      amount\n      currency\n      updatedAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n      }\n    }\n    ... on ThirdPartyBet {\n      id\n      amount\n      currency\n      updatedAt\n      createdAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n      }\n    }\n  }\n}\n"}}';
        var SocketAuthStringFive = '{"id":"ab3576b4-4435-4aa8-b463-c6407790c8c7","type":"subscribe","payload":{"key":"1age5vl","query":"subscription Announcements {\n  announcements {\n    ...Announcement\n    __typename\n  }\n}\n\nfragment Announcement on Announcement {\n  id\n  name\n  message\n  colour\n  location\n  expired\n  startTime\n  endTime\n}\n","context":{"url":"https://stake.com/_api/graphql","preferGetMethod":false,"requestPolicy":"network-only","suspense":false}}}';
        var SocketAuthStringSix = '{"id":"3d0a405c-793f-4282-9823-42cdf105a411","type":"subscribe","payload":{"key":"zojnrc","query":"subscription RaceStatus {\n  raceStatus {\n    ...RaceFragment\n    __typename\n  }\n}\n\nfragment RaceFragment on Race {\n  id\n  name\n  description\n  currency\n  type\n  startTime\n  endTime\n  status\n  scope\n}\n","context":{"url":"https://stake.com/_api/graphql","preferGetMethod":false,"suspense":false,"requestPolicy":"cache-first"}}}';
        var SocketAuthStringSeven = '{"id":"7ae205ca-f82c-46bc-8bc7-42acec40957c","type":"subscribe","payload":{"key":"z5e7vd","query":"subscription Notifications {\n  notifications {\n    ...Notification\n    __typename\n  }\n}\n\nfragment Notification on Notification {\n  id\n  type\n  acknowledged\n  __typename\n  data {\n    __typename\n    ... on NotificationKyc {\n      kycStatus: status\n      __typename\n    }\n    ... on UserFlag {\n      createdAt\n      flag\n      __typename\n    }\n    ... on ChatTip {\n      createdAt\n      currency\n      amount\n      sendBy {\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on NotificationKycBanned {\n      kycBannedMessage: message\n      __typename\n    }\n    ... on ChatRainUser {\n      amount\n      currency\n      rain {\n        createdAt\n        sendBy {\n          name\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on CashAdvance {\n      id\n      advanceAmount\n      currency\n      createdAt\n      __typename\n    }\n    ... on UserBonus {\n      createdAt\n      currency\n      amount\n      credit\n      __typename\n    }\n    ... on SportBet {\n      id\n      amount\n      active\n      currency\n      status\n      payoutMultiplier\n      cashoutMultiplier\n      payout\n      createdAt\n      system\n      potentialMultiplier\n      adjustments {\n        id\n        payoutMultiplier\n        updatedAt\n        createdAt\n        __typename\n      }\n      user {\n        id\n        name\n        __typename\n      }\n      search {\n        iid\n        __typename\n      }\n      outcomes {\n        odds\n        status\n        outcome {\n          id\n          name\n          active\n          odds\n          __typename\n        }\n        market {\n          ...SportMarket\n          __typename\n        }\n        fixture {\n          id\n          slug\n          tournament {\n            ...TournamentTree\n            __typename\n          }\n          data {\n            ...SportFixtureDataMatch\n            ...SportFixtureDataOutright\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ... on PlayerPropBet {\n      ...PlayerPropBetFragment\n      __typename\n    }\n    ... on WalletDeposit {\n      createdAt\n      amount\n      currency\n      chain\n      walletStatus: status\n      tokensReceived {\n        currency\n        amount\n        __typename\n      }\n      __typename\n    }\n    ... on RacePosition {\n      position\n      payoutAmount\n      currency\n      race {\n        name\n        endTime\n        __typename\n      }\n      __typename\n    }\n    ... on CommunityMute {\n      active\n      message\n      expireAt\n      __typename\n    }\n    ... on ChallengeWin {\n      challenge {\n        ...Challenge\n        __typename\n      }\n      __typename\n    }\n    ... on Challenge {\n      ...Challenge\n      __typename\n    }\n    ... on NotificationFiatError {\n      code\n      limitType\n      fiatErrorAmount: amount\n      fiatErrorCurrency: currency\n      __typename\n    }\n    ... on VeriffUser {\n      veriffStatus: status\n      veriffReason: reason\n      __typename\n    }\n    ... on SportsbookPromotionBet {\n      id\n      bet {\n        id\n        __typename\n      }\n      betAmount\n      value\n      currency\n      payout\n      payoutValue\n      sportsbookPromotionBetStatus: status\n      sportsbookPromotionBetUser: user {\n        id\n        name\n        __typename\n      }\n      promotion {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n  }\n}\n\nfragment SportMarket on SportMarket {\n  id\n  name\n  status\n  extId\n  specifiers\n  customBetAvailable\n}\n\nfragment TournamentTree on SportTournament {\n  id\n  name\n  slug\n  category {\n    ...CategoryTree\n    __typename\n  }\n}\n\nfragment CategoryTree on SportCategory {\n  id\n  name\n  slug\n  sport {\n    id\n    name\n    slug\n    __typename\n  }\n}\n\nfragment SportFixtureDataMatch on SportFixtureDataMatch {\n  startTime\n  competitors {\n    ...SportFixtureCompetitor\n    __typename\n  }\n  __typename\n}\n\nfragment SportFixtureCompetitor on SportFixtureCompetitor {\n  name\n  extId\n  countryCode\n  abbreviation\n}\n\nfragment SportFixtureDataOutright on SportFixtureDataOutright {\n  name\n  startTime\n  endTime\n  __typename\n}\n\nfragment PlayerPropBetFragment on PlayerPropBet {\n  __typename\n  active\n  amount\n  cashoutMultiplier\n  createdAt\n  currency\n  customBet\n  id\n  odds\n  payout\n  payoutMultiplier\n  updatedAt\n  status\n  user {\n    id\n    name\n    __typename\n  }\n  playerProps {\n    id\n    odds\n    lineType\n    playerProp {\n      ...PlayerPropLineFragment\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PlayerPropLineFragment on PlayerPropLine {\n  id\n  line\n  over\n  under\n  suspended\n  balanced\n  name\n  player {\n    id\n    name\n    __typename\n  }\n  market {\n    id\n    stat {\n      name\n      value\n      __typename\n    }\n    game {\n      id\n      fixture {\n        id\n        name\n        status\n        eventStatus {\n          ...FixtureEventStatus\n          __typename\n        }\n        data {\n          ... on SportFixtureDataMatch {\n            __typename\n            startTime\n            competitors {\n              name\n              extId\n              countryCode\n              abbreviation\n              __typename\n            }\n          }\n          __typename\n        }\n        tournament {\n          id\n          category {\n            id\n            sport {\n              id\n              name\n              slug\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment FixtureEventStatus on SportFixtureEventStatus {\n  homeScore\n  awayScore\n  matchStatus\n  clock {\n    matchTime\n    remainingTime\n    __typename\n  }\n  periodScores {\n    homeScore\n    awayScore\n    matchStatus\n    __typename\n  }\n  currentServer {\n    extId\n    __typename\n  }\n  homeGameScore\n  awayGameScore\n  statistic {\n    yellowCards {\n      away\n      home\n      __typename\n    }\n    redCards {\n      away\n      home\n      __typename\n    }\n    corners {\n      home\n      away\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Challenge on Challenge {\n  id\n  type\n  active\n  adminCreated\n  completedAt\n  award\n  claimCount\n  claimMax\n  currency\n  isRefunded\n  minBetUsd\n  startAt\n  expireAt\n  updatedAt\n  createdAt\n  targetMultiplier\n  game {\n    id\n    name\n    slug\n    thumbnailUrl\n    __typename\n  }\n  creatorUser {\n    ...UserTags\n    __typename\n  }\n  affiliateUser {\n    ...UserTags\n    __typename\n  }\n  wins {\n    id\n    claimedBy {\n      ...UserTags\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment UserTags on User {\n  id\n  name\n  isMuted\n  isRainproof\n  isIgnored\n  isHighroller\n  isSportHighroller\n  leaderboardDailyProfitRank\n  leaderboardDailyWageredRank\n  leaderboardWeeklyProfitRank\n  leaderboardWeeklyWageredRank\n  flags {\n    flag\n    rank\n    createdAt\n    __typename\n  }\n  roles {\n    name\n    expireAt\n    message\n    __typename\n  }\n  createdAt\n}\n","context":{"url":"https://stake.com/_api/graphql","preferGetMethod":false,"requestPolicy":"network-only","suspense":false}}}';
        var SocketAuthStringEight = '{"id":"6aa76284-bf97-4c08-88ef-4eadffa284ff","type":"subscribe","payload":{"key":"1fm9flo","query":"subscription HouseBets {\n  houseBets {\n    ...RealtimeHouseBet\n    __typename\n  }\n}\n\nfragment RealtimeHouseBet on Bet {\n  id\n  iid\n  game {\n    name\n    icon\n    __typename\n  }\n  bet {\n    __typename\n    ... on CasinoBet {\n      id\n      active\n      payoutMultiplier\n      amountMultiplier\n      amount\n      payout\n      updatedAt\n      currency\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on EvolutionBet {\n      id\n      amount\n      currency\n      createdAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on MultiplayerCrashBet {\n      id\n      payoutMultiplier\n      amount\n      payout\n      currency\n      updatedAt\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on MultiplayerSlideBet {\n      id\n      payoutMultiplier\n      amount\n      payout\n      currency\n      updatedAt\n      createdAt\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on SoftswissBet {\n      id\n      amount\n      currency\n      updatedAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n    ... on ThirdPartyBet {\n      id\n      amount\n      currency\n      updatedAt\n      createdAt\n      payout\n      payoutMultiplier\n      user {\n        id\n        name\n        __typename\n      }\n      __typename\n    }\n  }\n}\n","context":{"url":"https://stake.com/_api/graphql","preferGetMethod":false,"suspense":false,"requestPolicy":"cache-first"}}}';
        var SocketAuthStringNine = '{"id":"5c6e4a86-22f6-43dd-b82c-796dc20c8614","type":"subscribe","payload":{"key":"1mlozo4","query":"subscription SportBets {\n  sportBets {\n    id\n    active\n    status\n    cashoutMultiplier\n    outcomes {\n      id\n      status\n      __typename\n    }\n    __typename\n  }\n}\n","context":{"url":"https://stake.com/_api/graphql","preferGetMethod":false,"suspense":false,"requestPolicy":"cache-first"}}}';
        open();
        function open() {
            var SocketStakeCrash = new Websocket('wss://stake.com/_api/websockets');
            SocketStakeCrash.onopen = () => {
                console.log('Conectado ao Stake Crash');
                SocketStakeCrash.send(JSON.stringify(SocketSubscribeString));
                SocketStakeCrash.onmessage = (e) => {
                    console.log(e);
                };
            };
            SocketStakeCrash.onclose = function (e) {
                console.log('Socket stake Crash is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function () {
                    open();
                }, 1000);
            };
            SocketStakeCrash.onerror = function (err) {
                console.error('Socket stake Crash  encountered error: ', err.message, 'Closing socket');
                SocketStakeCrash.close();
            };
            let ç = [];
            SocketStakeCrash.onmessage = (e) => {
                console.log(e);
                return;
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
                                Ws_2.default.io.emit('crashStake', {
                                    stakeCrashStatus: 'Vela subindo...'
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
                    const newSave = new StakeCrash();
                    newSave.crash_point = crashValue2;
                    newSave.statuscrash = crashStatus;
                    newSave.crash_hora = crashHora;
                    newSave.useTransaction(trx);
                    await newSave.save();
                });
                setTimeout(() => {
                    Ws_2.default.io.emit('crashStake', {
                        CrashValue: crashValue2,
                        CrashStatus: crashStatus,
                        CrashHora: crashHora,
                    });
                    Ws_2.default.io.emit('crashStake', { stakeCrashStatus: 'Novo' });
                }, 2000);
            }
        }
        Ws_2.default.io.on('connection', (SocketStakeCrash2) => {
            SocketStakeCrash2.on('pingBC', (data) => {
                SocketStakeCrash2.emit('pongBC', { data });
            });
            SocketStakeCrash2.on('qtJogosCrashStake', (data) => {
                getJogos(data);
                async function getJogos(data) {
                    let quantidadeJogos = data;
                    let list = await StakeCrash.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    if (quantidadeJogos !== 100) {
                        list = await StakeCrash.query().orderBy('id', 'desc').limit(quantidadeJogos);
                    }
                    const list2 = list.map(item => {
                        return {
                            id: item.id,
                            crash_point: item.crash_point,
                            statuscrash: item.statuscrash,
                            crash_hora: item.crash_hora
                        };
                    });
                    Ws_2.default.io.emit('crashStake', {
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
            SocketStakeCrash2.on('stakeCrashNewPadrao', (data) => {
                let padrao = data.padroes;
                let userId = data.userId;
                getNewPadrao(padrao, userId);
                async function getNewPadrao(padrao, userId) {
                    await PadroesStakeCrash.create({ padrao: padrao, user_id: userId });
                }
            });
            SocketStakeCrash2.on('stakeCrashGetPadraoList', (data) => {
                let userId = data.userId;
                putPadrao(userId);
                async function putPadrao(userId) {
                    let listPadrao = await PadroesStakeCrash.query().where('user_id', '=', userId);
                    let listPadrao2 = listPadrao.map(item => {
                        return {
                            idPadrao: item.id,
                            padrao: item.padrao,
                        };
                    });
                    Ws_2.default.io.emit('crashStake', { listPadrao2 });
                }
            });
            SocketStakeCrash2.on('stakeCrashDeletePadrao', (data) => {
                let idPadrao = data.idPadrao;
                deletePadrao(idPadrao);
                async function deletePadrao(idPadrao) {
                    await PadroesStakeCrash.query().where('id', '=', idPadrao).delete();
                }
            });
            SocketStakeCrash2.on('PadroesShareStakeCrash', (data) => {
                let idPadrao = data.idPadrao;
                let userId = data.userId;
                let name = data.nameUser;
                let casaDeAposta = data.casaDeAposta;
                let casaDeApostaTipo = data.casaDeApostaTipo;
                StakeCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo);
                async function StakeCrash(idPadrao, userId, name, casaDeAposta, casaDeApostaTipo) {
                    let idPadraoBusca = idPadrao - 122900000000;
                    let padraoBusca = await PadroesStakeCrash.query().where('id', idPadraoBusca).first();
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
                        SocketStakeCrash2.emit('PadroesShareStakeCrashMsg', { error: 'Padrão já compartilhado' });
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
                        SocketStakeCrash2.emit('PadroesShareStakeCrashMsg', { success: 'Padrão compartilhado com sucesso' });
                    }
                }
            });
        });
    }
}
exports.default = StakeCrashController;
//# sourceMappingURL=StakeCrashController.js.map