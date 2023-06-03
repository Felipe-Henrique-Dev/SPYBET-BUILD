"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Af2l1p3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Af2l1p3eAso3a532x1nib"));
const T4ansp3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/T4ansp3eAso3a532x1nib"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(require("../../Models/User"));
const { Telegraf } = require('telegraf');
const MinesController_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Ws/MinesController"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
var mercadopago = require('mercadopago');
class CheckoutController {
    async precheckout({ view, response, request, auth, session }) {
        var parametros = await request.params().link;
        var indentificador = parametros.split(':')[0];
        var urlCard = 'https://www.spybet.com.br/checkout-card/';
        var urlPix = 'https://www.spybet.com.br/checkout-pix/';
        var indentificadorPlano = String(parametros.split('&')[1]).split('')[0] + String(parametros.split('&')[1]).split('')[1];
        var id;
        var chatId;
        var plano;
        var namePlan;
        var valorInicial;
        var valorDesconto;
        var divididoCArtao;
        var desconto;
        var urlPlanPix;
        var urlPlanCard;
        var actdescrition1;
        var actdescrition2;
        var actdescrition3;
        var actdescrition4;
        var actdescrition5;
        var actdescrition6;
        var actdescrition7;
        var actdescrition8;
        var actdescrition9;
        var actdescrition10;
        var actdescrition11;
        var actdescrition12;
        var actdescrition13;
        var actdescrition14;
        var actdescrition15;
        var diasplan;
        if (indentificador == 'chatId') {
            chatId = parametros.split(':')[1].split('&')[0];
            var user = await User_1.default.query().where('telegram', chatId).first();
            id = user?.id;
        }
        if (indentificador == 'id') {
            id = parametros.split(':')[1].split('&')[0];
        }
        console.log(id);
        try {
            await auth.use('web').loginViaId(id);
        }
        catch (error) {
            session.flash('error', 'Você precisa registrar-se para adquirir um plano');
            return response.redirect('/auth/login');
        }
        if (indentificadorPlano == 'p1') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                plano = 'Plano 1 - Mensal';
                namePlan = 'Plano 1 - Mensal';
                diasplan = '30 dias';
                valorInicial = 'R$ 79,00';
                valorDesconto = 'R$ 79,00';
                divididoCArtao = 'ou 3x de R$ 28,76';
                desconto = 'Sem desconto';
                urlPlanPix = `${urlPix}id:${id}&p1m`;
                urlPlanCard = `${urlCard}id:${id}&p1m`;
            }
            else if (plan == 'b') {
                plano = 'Plano 1 - Bimestral';
                namePlan = 'Plano 1 - Bimestral';
                diasplan = '60 dias';
                valorInicial = 'R$ 159,00';
                valorDesconto = 'R$ 127,00';
                divididoCArtao = '3x de R$ 46,24';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p1b`;
                urlPlanCard = `${urlCard}id:${id}&p1b`;
            }
            else if (plan == 't') {
                plano = 'Plano 1 - Trimestral';
                namePlan = 'Plano 1 - Trimestral';
                diasplan = '90 dias';
                valorInicial = 'R$ 239,00';
                valorDesconto = 'R$ 190,00';
                divididoCArtao = '3x de R$ 56,44';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p1t`;
                urlPlanCard = `${urlCard}id:${id}&p1t`;
            }
            actdescrition1 = 'Sem anúncios';
            actdescrition2 = 'Afiliação';
            actdescrition3 = 'Tabela de gerenciamento';
            actdescrition4 = 'Compartilhar Padrões';
            actdescrition5 = 'SalPadrões';
            actdescrition6 = 'Criar Padrões';
            actdescrition7 = 'Selecionar 5000 jogos';
            actdescrition8 = 'Robô Mines';
            actdescrition9 = 'Robô Double Blaze';
            actdescrition10 = 'Robô Double Smash';
            actdescrition11 = 'Suporte WhatsApp';
            actdescrition12 = 'Telegram Vip Blaze';
            actdescrition13 = 'Telegram Vip Smash';
            actdescrition14 = 'Telegram Vip Betbry';
            actdescrition15 = 'Telegram Vip Calculadora';
        }
        if (indentificadorPlano == 'p2') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                plano = 'Plano 2 - Mensal';
                namePlan = 'Plano 2 - Mensal';
                diasplan = '30 dias';
                valorInicial = 'R$ 49,00';
                valorDesconto = 'R$ 49,00';
                divididoCArtao = 'ou 3x de R$ 17,84';
                desconto = 'Sem desconto';
                urlPlanPix = `${urlPix}id:${id}&p2m`;
                urlPlanCard = `${urlCard}id:${id}&p2m`;
            }
            else if (plan == 'b') {
                plano = 'Plano 2 - Bimestral';
                namePlan = 'Plano 2 - Bimestral';
                diasplan = '60 dias';
                valorInicial = 'R$ 99,00';
                valorDesconto = 'R$ 79,00';
                divididoCArtao = '3x de R$ 28,76';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p2b`;
                urlPlanCard = `${urlCard}id:${id}&p2b`;
            }
            else if (plan == 't') {
                plano = 'Plano 2 - Trimestral';
                namePlan = 'Plano 2 - Trimestral';
                diasplan = '90 dias';
                valorInicial = 'R$ 149,00';
                valorDesconto = 'R$ 119,00';
                divididoCArtao = '3x de R$ 43,32';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p2t`;
                urlPlanCard = `${urlCard}id:${id}&p2t`;
            }
            actdescrition1 = 'actdescrition';
            actdescrition2 = 'actdescrition';
            actdescrition3 = 'Tabela de gerenciamento';
            actdescrition4 = 'actdescrition';
            actdescrition5 = 'actdescrition';
            actdescrition6 = 'actdescrition';
            actdescrition7 = 'Selecionar 2000 jogos';
            actdescrition8 = 'actdescrition';
            actdescrition9 = 'actdescrition';
            actdescrition10 = 'actdescrition';
            actdescrition11 = 'Suporte WhatsApp';
            actdescrition12 = 'Telegram Vip Blaze';
            actdescrition13 = 'Telegram Vip Smash';
            actdescrition14 = 'Telegram Vip Betbry';
            actdescrition15 = 'Telegram Vip Calculadora';
        }
        if (indentificadorPlano == 'p3') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                plano = 'Plano 3 - Mensal';
                namePlan = 'Plano 3 - Mensal';
                diasplan = '30 dias';
                valorInicial = 'R$ 29,90';
                valorDesconto = 'R$ 29,90';
                divididoCArtao = 'ou 3x de R$ 10,56';
                desconto = 'Sem desconto';
                urlPlanPix = `${urlPix}id:${id}&p3m`;
                urlPlanCard = `${urlCard}id:${id}&p3m`;
            }
            else if (plan == 'b') {
                plano = 'Plano 3 - Bimestral';
                namePlan = 'Plano 3 - Bimestral';
                diasplan = '60 dias';
                valorInicial = 'R$ 59,00';
                valorDesconto = 'R$ 47,00';
                divididoCArtao = 'ou 3x de R$ 17,11';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p3b`;
                urlPlanCard = `${urlCard}id:${id}&p3b`;
            }
            else if (plan == 't') {
                plano = 'Plano 3 - Trimestral';
                namePlan = 'Plano 3 - Trimestral';
                diasplan = '90 dias';
                valorInicial = 'R$ 89,00';
                valorDesconto = 'R$ 71,00';
                divididoCArtao = '3x de R$ 25,85';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p3t`;
                urlPlanCard = `${urlCard}id:${id}&p3t`;
            }
            actdescrition1 = 'actdescrition';
            actdescrition2 = 'actdescrition';
            actdescrition3 = 'Tabela de gerenciamento';
            actdescrition4 = 'actdescrition';
            actdescrition5 = 'actdescrition';
            actdescrition6 = 'actdescrition';
            actdescrition7 = 'Selecionar 2000 jogos';
            actdescrition8 = 'actdescrition';
            actdescrition9 = 'actdescrition';
            actdescrition10 = 'actdescrition';
            actdescrition11 = 'Suporte WhatsApp';
            actdescrition12 = 'actdescrition';
            actdescrition13 = 'actdescrition';
            actdescrition14 = 'Telegram Vip Betbry';
            actdescrition15 = 'Telegram Vip Calculadora';
        }
        if (indentificadorPlano == 'p4') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                plano = 'Plano 4 - Mensal';
                namePlan = 'Plano 4 - Mensal';
                diasplan = '30 dias';
                valorInicial = 'R$ 29,90';
                valorDesconto = 'R$ 29,90';
                divididoCArtao = 'ou 3x de R$ 10,56';
                desconto = 'Sem desconto';
                urlPlanPix = `${urlPix}id:${id}&p4m`;
                urlPlanCard = `${urlCard}id:${id}&p4m`;
            }
            else if (plan == 'b') {
                plano = 'Plano 4 - Bimestral';
                namePlan = 'Plano 4 - Bimestral';
                diasplan = '60 dias';
                valorInicial = 'R$ 59,00';
                valorDesconto = 'R$ 47,00';
                divididoCArtao = 'ou 3x de R$ 17,11';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p4b`;
                urlPlanCard = `${urlCard}id:${id}&p4b`;
            }
            else if (plan == 't') {
                plano = 'Plano 4 - Trimestral';
                namePlan = 'Plano 4 - Trimestral';
                diasplan = '90 dias';
                valorInicial = 'R$ 89,00';
                valorDesconto = 'R$ 71,00';
                divididoCArtao = '3x de R$ 25,85';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p4t`;
                urlPlanCard = `${urlCard}id:${id}&p4t`;
            }
            actdescrition1 = 'actdescrition';
            actdescrition2 = 'actdescrition';
            actdescrition3 = 'Tabela de gerenciamento';
            actdescrition4 = 'actdescrition';
            actdescrition5 = 'actdescrition';
            actdescrition6 = 'actdescrition';
            actdescrition7 = 'Selecionar 2000 jogos';
            actdescrition8 = 'actdescrition';
            actdescrition9 = 'actdescrition';
            actdescrition10 = 'actdescrition';
            actdescrition11 = 'Suporte WhatsApp';
            actdescrition12 = 'actdescrition';
            actdescrition13 = 'actdescrition';
            actdescrition14 = 'Telegram Vip Smash';
            actdescrition15 = 'Telegram Vip Calculadora';
        }
        if (indentificadorPlano == 'p5') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                plano = 'Plano 5 - Mensal';
                namePlan = 'Plano 5 - Mensal';
                diasplan = '30 dias';
                valorInicial = 'R$ 29,90';
                valorDesconto = 'R$ 29,90';
                divididoCArtao = 'ou 3x de R$ 10,56';
                desconto = 'Sem desconto';
                urlPlanPix = `${urlPix}id:${id}&p5m`;
                urlPlanCard = `${urlCard}id:${id}&p5m`;
            }
            else if (plan == 'b') {
                plano = 'Plano 5 - Bimestral';
                namePlan = 'Plano 5 - Bimestral';
                diasplan = '60 dias';
                valorInicial = 'R$ 59,00';
                valorDesconto = 'R$ 47,00';
                divididoCArtao = 'ou 3x de R$ 17,11';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p5b`;
                urlPlanCard = `${urlCard}id:${id}&p5b`;
            }
            else if (plan == 't') {
                plano = 'Plano 5 - Trimestral';
                namePlan = 'Plano 5 - Trimestral';
                diasplan = '90 dias';
                valorInicial = 'R$ 89,00';
                valorDesconto = 'R$ 71,00';
                divididoCArtao = '3x de R$ 25,85';
                desconto = 'DESCONTO DE 20%';
                urlPlanPix = `${urlPix}id:${id}&p5t`;
                urlPlanCard = `${urlCard}id:${id}&p5t`;
            }
            actdescrition1 = 'actdescrition';
            actdescrition2 = 'actdescrition';
            actdescrition3 = 'Tabela de gerenciamento';
            actdescrition4 = 'actdescrition';
            actdescrition5 = 'actdescrition';
            actdescrition6 = 'actdescrition';
            actdescrition7 = 'Selecionar 2000 jogos';
            actdescrition8 = 'actdescrition';
            actdescrition9 = 'actdescrition';
            actdescrition10 = 'actdescrition';
            actdescrition11 = 'Suporte WhatsApp';
            actdescrition12 = 'actdescrition';
            actdescrition13 = 'actdescrition';
            actdescrition14 = 'Telegram Vip Blaze';
            actdescrition15 = 'Telegram Vip Calculadora';
        }
        return view.render('pre-checkout', {
            parametros,
            namePlan,
            valorInicial,
            valorDesconto,
            divididoCArtao,
            urlPlanPix,
            urlPlanCard,
            desconto,
            actdescrition1,
            actdescrition2,
            actdescrition3,
            actdescrition4,
            actdescrition5,
            actdescrition6,
            actdescrition7,
            actdescrition8,
            actdescrition9,
            actdescrition10,
            actdescrition11,
            actdescrition12,
            actdescrition13,
            actdescrition14,
            actdescrition15,
            diasplan,
        });
    }
    async checkoutCardPlano({ view, response, request, auth }) {
        response.status(200);
        var parametros = await request.params().link;
        var indentificadorPlano = String(parametros.split('&')[1]).split('')[0] + String(parametros.split('&')[1]).split('')[1];
        var id = auth.user?.id;
        console.log(auth.user?.id);
        console.log(parametros);
        var namePlano;
        var desconto;
        var valorDe;
        var valorPlano;
        var diasplan;
        if (indentificadorPlano == 'p1') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 1 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 79,00';
                valorPlano = 'R$ 79,00';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 1 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 159,00';
                valorPlano = 'R$ 127,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 1 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 239,00';
                valorPlano = 'R$ 190,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p2') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 2 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 49,00';
                valorPlano = 'R$ 49,00';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 2 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 99,00';
                valorPlano = 'R$ 79,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 2 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 149,00';
                valorPlano = 'R$ 119,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p3') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 3 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 3 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 3 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p4') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 4 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 4 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 4 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p5') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 5 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 5 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 5 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        var descricaoPlano = `${namePlano}: Você terá ${diasplan} de acesso a tudo disponivel no plano selecionado.`;
        var valorPlano = valorPlano.replace('R$ ', '');
        const mercadoPagoPublicKey = Env_1.default.get('mercadoPagoPublicKey');
        return view.render('checkout', { mercadoPagoPublicKey, namePlano, desconto, valorDe, valorPlano, descricaoPlano });
    }
    async createPreference({ request, response, session, auth }) {
        const mercadoPagoAccessToken = Env_1.default.get('mercadoPagoAccessToken');
        mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);
        const userId = auth.user.id;
        const body = request.all();
        const nameplan = String(body.description).split(':')[0];
        const payer = body.payer;
        const paymentData = {
            transaction_amount: Number(body.transactionAmount),
            token: body.token,
            description: body.description,
            installments: Number(body.installments),
            payment_method_id: body.paymentMethodId,
            issuer_id: body.issuerId,
            payer: {
                email: body.payer.email,
                identification: {
                    type: payer.identification.type,
                    number: payer.identification.number
                }
            }
        };
        var detail;
        var status;
        var paymentId;
        var valorPago;
        var numeroDeParcelas;
        await mercadopago.payment.save(paymentData)
            .then(function (res) {
            detail = res.response.status_detail;
            status = res.response.status;
            paymentId = res.body.id;
            valorPago = res.response.transaction_amount;
            numeroDeParcelas = res.response.installments;
        })
            .catch(function (error) {
            console.log(error);
            const { errorMessage, errorStatus } = validateError(error);
            response.status(errorStatus).json({ error_message: errorMessage });
        });
        if (status == 'approved') {
            status = 'Pagamento aprovado com sucesso!';
            detail = 'Seu pagamento foi aprovado com sucesso, o seu plano será ativado!.';
            session.flash('status', 'Pagamento aprovado com sucesso!');
            session.flash('detail', 'Seu pagamento foi aprovado com sucesso, o seu plano será ativado!.');
        }
        else if (status == 'in_process') {
            status = 'Pagamento em processamento!';
            detail = 'Seu pagamento está em processamento,envie comprovante de pagamento pelo whatsapp ou aguarde a confirmação para ativação do seu plano!.';
            session.flash('status', 'Pagamento em processamento!');
            session.flash('detail', 'Seu pagamento está em processamento,envie comprovante de pagamento pelo whatsapp ou aguarde a confirmação para ativação do seu plano!.');
        }
        else if (status == 'rejected') {
            status = 'Pagamento rejeitado!';
            detail = 'Seu pagamento foi rejeitado, verifique os dados do seu cartão e tente novamente!.';
            session.flash('status', 'Pagamento rejeitado!');
            session.flash('detail', 'Seu pagamento foi rejeitado, verifique os dados do seu cartão e tente novamente!.');
        }
        else if (status == 'pending') {
            status = 'Pagamento pendente!';
            detail = 'Seu pagamento está pendente, envie comprovante de pagamento pelo whatsapp para ativação do seu plano!.';
            session.flash('status', 'Pagamento pendente!');
            session.flash('detail', 'Seu pagamento está pendente, envie comprovante de pagamento pelo whatsapp para ativação do seu plano!.');
        }
        if (nameplan == 'Plano 1 - Mensal') {
            valorPago = 'R$ 79,00';
        }
        else if (nameplan == 'Plano 1 - Bimestral') {
            valorPago = 'R$ 127,00';
        }
        else if (nameplan == 'Plano 1 - Trimestral') {
            valorPago = 'R$ 190,00';
        }
        else if (nameplan == 'Plano 2 - Mensal') {
            valorPago = 'R$ 49,00';
        }
        else if (nameplan == 'Plano 2 - Bimestral') {
            valorPago = 'R$ 79,00';
        }
        else if (nameplan == 'Plano 2 - Trimestral') {
            valorPago = 'R$ 119,00';
        }
        else if (nameplan == 'Plano 3 - Mensal' || nameplan == 'Plano 4 - Mensal' || nameplan == 'Plano 5 - Mensal') {
            valorPago = 'R$ 29,00';
        }
        else if (nameplan == 'Plano 3 - Bimestral' || nameplan == 'Plano 4 - Bimestral' || nameplan == 'Plano 5 - Bimestral') {
            valorPago = 'R$ 47,00';
        }
        else if (nameplan == 'Plano 3 - Trimestral' || nameplan == 'Plano 4 - Trimestral' || nameplan == 'Plano 5 - Trimestral') {
            valorPago = 'R$ 71,00';
        }
        if (paymentId != undefined) {
            await Database_1.default.transaction(async (trx) => {
                const order = new T4ansp3eAso3a532x1nib_1.default();
                order.idtransacao = paymentId;
                order.valor = valorPago;
                order.status = status;
                order.tipo = 'Pagamento';
                order.metodotransacao = 'Cartão de crédito';
                order.userId = userId;
                order.nameplan = nameplan;
                order.useTransaction(trx);
                await order.save();
            });
        }
        session.flash('paymentId', paymentId);
        response.status(200).json({ paymentId, status, detail });
        function validateError(error) {
            let errorMessage = 'Ocorreu um erro ao processar o pagamento, tente novamente.';
            let errorStatus = 400;
            if (error.cause) {
                const sdkErrorMessage = error.cause[0].description;
                errorMessage = sdkErrorMessage || errorMessage;
                const sdkErrorStatus = error.status;
                errorStatus = sdkErrorStatus || errorStatus;
            }
            return { errorMessage, errorStatus };
        }
    }
    async checkoutPixPlano({ view, response, auth, request }) {
        var parametros = await request.params().link;
        var indentificadorPlano = String(parametros.split('&')[1]).split('')[0] + String(parametros.split('&')[1]).split('')[1];
        var id = auth.user?.id;
        console.log(auth.user?.id);
        console.log(parametros);
        var namePlano;
        var desconto;
        var valorDe;
        var valorPlano;
        var diasplan;
        if (indentificadorPlano == 'p1') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 1 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 79,00';
                valorPlano = 'R$ 79,00';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 1 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 159,00';
                valorPlano = 'R$ 127,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 1 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 239,00';
                valorPlano = 'R$ 190,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p2') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 2 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 49,00';
                valorPlano = 'R$ 49,00';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 2 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 99,00';
                valorPlano = 'R$ 79,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 2 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 149,00';
                valorPlano = 'R$ 119,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p3') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 3 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 3 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 3 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p4') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 4 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 4 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 4 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        if (indentificadorPlano == 'p5') {
            let plan = parametros.split('&')[1].split('')[2];
            if (plan == 'm') {
                namePlano = 'Plano 5 - Mensal';
                diasplan = '30 dias';
                valorDe = 'R$ 29,90';
                valorPlano = 'R$ 29,90';
                desconto = 'Sem desconto';
            }
            else if (plan == 'b') {
                namePlano = 'Plano 5 - Bimestral';
                diasplan = '60 dias';
                valorDe = 'R$ 59,00';
                valorPlano = 'R$ 47,00';
                desconto = 'DESCONTO DE 20%';
            }
            else if (plan == 't') {
                namePlano = 'Plano 5 - Trimestral';
                diasplan = '90 dias';
                valorDe = 'R$ 89,00';
                valorPlano = 'R$ 71,00';
                desconto = 'DESCONTO DE 20%';
            }
        }
        var descricaoPlano = `${namePlano}: Você terá ${diasplan} de acesso a tudo disponivel no plano selecionado.`;
        var valorPlano = valorPlano.replace('R$ ', '');
        const mercadoPagoPublicKey = Env_1.default.get('mercadoPagoPublicKey');
        return view.render('checkoutPix', { mercadoPagoPublicKey, namePlano, desconto, valorDe, valorPlano, descricaoPlano });
    }
    async createPreferencePix({ request, response, session, auth }) {
        const mercadoPagoAccessToken = Env_1.default.get('mercadoPagoAccessToken');
        mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);
        const requestBody = request.all();
        const payer = requestBody.payer;
        const data = {
            payment_method_id: "pix",
            description: requestBody.description,
            transaction_amount: Number(requestBody.transactionAmount),
            payer: {
                email: requestBody.payer.email,
                first_name: requestBody.payer.firstName,
                last_name: requestBody.payer.lastName,
                identification: {
                    type: requestBody.payer.identification.type,
                    number: requestBody.payer.identification.number,
                }
            }
        };
        var detail;
        var status;
        var id;
        var qrCode;
        var qrCodeBase64;
        await mercadopago.payment.save(data)
            .then(function (res) {
            id = res.body.id;
            status = res.body.status;
            detail = res.body.status_detail;
            qrCode = res.body.point_of_interaction.transaction_data.qr_code;
            qrCodeBase64 = res.body.point_of_interaction.transaction_data.qr_code_base64;
        }).catch(function (error) {
            console.log(error);
            const { errorMessage, errorStatus } = validateError(error);
            response.status(errorStatus).json({ error_message: errorMessage });
        });
        if (status == 'approved') {
            status = 'Pagamento aprovado com sucesso!';
            detail = 'Seu pagamento foi aprovado com sucesso, o seu plano será ativado!.';
            session.flash('status', 'Pagamento aprovado com sucesso!');
            session.flash('detail', 'Seu pagamento foi aprovado com sucesso, o seu plano será ativado!.');
        }
        else if (status == 'in_process') {
            status = 'Pagamento em processamento!';
            detail = 'Seu pagamento está em processamento,envie comprovante de pagamento pelo whatsapp ou aguarde a confirmação para ativação do seu plano!.';
            session.flash('status', 'Pagamento em processamento!');
            session.flash('detail', 'Seu pagamento está em processamento,envie comprovante de pagamento pelo whatsapp ou aguarde a confirmação para ativação do seu plano!.');
        }
        else if (status == 'rejected') {
            status = 'Pagamento rejeitado!';
            detail = 'Seu pagamento foi rejeitado, verifique os dados do seu cartão e tente novamente!.';
            session.flash('status', 'Pagamento rejeitado!');
            session.flash('detail', 'Seu pagamento foi rejeitado, verifique os dados do seu cartão e tente novamente!.');
        }
        else if (status == 'pending') {
            status = 'Pagamento pendente!';
            detail = 'Seu pagamento está pendente, leia o qr-Code e efetue o pagamento, caso o plano nao seja ativado automaticamente entre em contato com o suporte.';
            session.flash('status', 'Pagamento pendente!');
            session.flash('detail', 'Seu pagamento está pendente, leia o qr-Code e efetue o pagamento, caso o plano nao seja ativado automaticamente entre em contato com o suporte.');
        }
        response.status(200).json({ id, status, detail, qrCode, qrCodeBase64 });
        function validateError(error) {
            let errorMessage = 'Ocorreu um erro ao processar o pagamento, tente novamente.';
            ;
            let errorStatus = 400;
            if (error.cause) {
                const sdkErrorMessage = error.cause[0].description;
                errorMessage = sdkErrorMessage || errorMessage;
                const sdkErrorStatus = error.status;
                errorStatus = sdkErrorStatus || errorStatus;
            }
            return { errorMessage, errorStatus };
        }
    }
    async feedback({ view, request }) {
        return view.render('feedback');
    }
    async feedbackIpn({ request, response, auth }) {
        response.status(200).json({ status: 'ok' });
        const feedbackBody = request.all();
        console.log(feedbackBody);
        const feedbackParams = await request.params().link;
        var feedback;
        var idtransacao;
        var status;
        var IDN = JSON.stringify(feedbackBody).split(',')[0].split(':')[0].replace(/"/g, '').replace('}', '').replace('{', '');
        if (IDN == 'topic') {
            idtransacao = JSON.stringify(feedbackBody).split(',')[1].split(':')[1].replace(/"/g, '').replace('}', '');
            status = 'Pagamento aprovado com sucesso!';
            response.status(200).json({ message: 'ok' });
        }
        else {
            idtransacao = feedbackBody.result.paymentId;
            status = feedbackBody.result.status;
        }
        const order = await T4ansp3eAso3a532x1nib_1.default.query().where('idtransacao', idtransacao).first();
        if (order == null || order == undefined) {
            return;
        }
        if (order?.$original.status == 'Pagamento em processamento!' || order?.$original.status == 'Pagamento pendente!') {
            if (status == 'Pagamento aprovado com sucesso!') {
                order?.merge({ status: status });
                await order?.save();
            }
            if (status == 'Pagamento rejeitado!') {
                order?.merge({ status: status });
                await order?.save();
            }
        }
        if (status !== 'Pagamento aprovado com sucesso!') {
            return;
        }
        var valor;
        const idUser = await order.$original.userId;
        const user = await User_1.default.findByOrFail('id', idUser);
        const TOKEN = Env_1.default.get('BOT_feedback');
        const bot = new Telegraf(TOKEN, { polling: { interval: 1000 } });
        bot.startPolling();
        const grupoBetbry = -1001615549819;
        const grupoSmash = -1001836625641;
        const grupoBlaze = -1001832660443;
        var IngrupoBetbry;
        var IngrupoSmash;
        var IngrupoBlaze;
        try {
            IngrupoBetbry = await bot.telegram.getChatMember(grupoBetbry, user?.telegram);
        }
        catch {
            IngrupoBetbry = null;
        }
        try {
            IngrupoSmash = await bot.telegram.getChatMember(grupoSmash, user?.telegram);
        }
        catch {
            IngrupoSmash = null;
        }
        try {
            IngrupoBlaze = await bot.telegram.getChatMember(grupoBlaze, user?.telegram);
        }
        catch {
            IngrupoBlaze = null;
        }
        const kick = new MinesController_1.default();
        const chatId = user?.telegram;
        const email = user?.email;
        const password = user?.password;
        const codigoAfiliado = user?.cpf;
        var plano;
        var namePlano = order?.$original.nameplan;
        var dias;
        let now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        let diaHora30 = thirtyDaysFromNow.toISOString().slice(0, 19).replace('T', ' ');
        const sixtyDaysFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
        let diaHora60 = sixtyDaysFromNow.toISOString().slice(0, 19).replace('T', ' ');
        const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
        let diaHora90 = ninetyDaysFromNow.toISOString().slice(0, 19).replace('T', ' ');
        if (chatId != null || chatId != undefined) {
            if (namePlano == 'Plano 1 - Mensal') {
                let diaHora = diaHora30;
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 1 - Mensal';
                UserAtt.telegram_plan_data = diaHora30;
                UserAtt.save();
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 1 - Bimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 1 - Bimestral';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora60;
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 1 - Trimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 1 - Trimestral';
                UserAtt.telegram_plan_data = diaHora90;
                UserAtt.save();
                let diaHora = diaHora90;
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 2 - Mensal') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 2 - Mensal';
                UserAtt.telegram_plan_data = diaHora30;
                UserAtt.save();
                let diaHora = diaHora30;
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 2 - Bimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 2 - Bimestral';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora60;
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 2 - Trimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 2 - Trimestral';
                UserAtt.telegram_plan_data = diaHora90;
                UserAtt.save();
                let diaHora = diaHora90;
                plan1(diaHora);
            }
            else if (namePlano == 'Plano 3 - Mensal') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 3 - Mensal';
                UserAtt.telegram_plan_data = diaHora30;
                UserAtt.save();
                let diaHora = diaHora30;
                plan3(diaHora);
            }
            else if (namePlano == 'Plano 3 - Bimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 3 - Bimestral';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora60;
                plan3(diaHora);
            }
            else if (namePlano == 'Plano 3 - Trimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 3 - Trimestral';
                UserAtt.telegram_plan_data = diaHora90;
                UserAtt.save();
                let diaHora = diaHora90;
                plan3(diaHora);
            }
            else if (namePlano == 'Plano 4 - Mensal') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 4 - Mensal';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora30;
                plan4(diaHora);
            }
            else if (namePlano == 'Plano 4 - Bimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 4 - Bimestral';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora60;
                plan4(diaHora);
            }
            else if (namePlano == 'Plano 4 - Trimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 4 - Trimestral';
                UserAtt.telegram_plan_data = diaHora90;
                UserAtt.save();
                let diaHora = diaHora90;
                plan4(diaHora);
            }
            else if (namePlano == 'Plano 5 - Mensal') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 5 - Mensal';
                UserAtt.telegram_plan_data = diaHora30;
                UserAtt.save();
                let diaHora = diaHora30;
                plan5(diaHora);
            }
            else if (namePlano == 'Plano 5 - Bimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 5 - Bimestral';
                UserAtt.telegram_plan_data = diaHora60;
                UserAtt.save();
                let diaHora = diaHora60;
                plan5(diaHora);
            }
            else if (namePlano == 'Plano 5 - Trimestral') {
                let UserAtt = await User_1.default.findByOrFail('Telegram', chatId);
                UserAtt.telegram_plan = 'Plano 5 - Trimestral';
                UserAtt.telegram_plan_data = diaHora90;
                UserAtt.save();
                let diaHora = diaHora90;
                plan5(diaHora);
            }
            function plan1(diaHora) {
                bot.telegram.unbanChatMember(grupoBetbry, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoBetbry com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                bot.telegram.unbanChatMember(grupoSmash, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoSmash com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                bot.telegram.unbanChatMember(grupoBlaze, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoBlaze com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                kick.suporteBot('confirmPayment', `ID&${chatId}| Pagamento&Seu pagamento foi aprovado com sucesso| Plano&${namePlano}| Liberado& ${diaHora}`);
            }
            function plan3(diaHora) {
                if (IngrupoSmash != null) {
                    bot.telegram.kickChatMember(grupoSmash, chatId);
                }
                if (IngrupoBlaze != null) {
                    bot.telegram.kickChatMember(grupoBlaze, chatId);
                }
                bot.telegram.unbanChatMember(grupoBetbry, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoBetbry com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                kick.suporteBot('confirmPayment', `ID&${chatId}| Pagamento&Seu pagamento foi aprovado com sucesso| Plano&${namePlano}| Liberado& ${diaHora}`);
            }
            function plan4(diaHora) {
                if (IngrupoBetbry != null) {
                    bot.telegram.kickChatMember(grupoBetbry, chatId);
                }
                if (IngrupoBlaze != null) {
                    bot.telegram.kickChatMember(grupoBlaze, chatId);
                }
                bot.telegram.unbanChatMember(grupoSmash, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoSmash com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                kick.suporteBot('confirmPayment', `ID&${chatId}| Pagamento&Seu pagamento foi aprovado com sucesso| Plano&${namePlano}| Liberado& ${diaHora}`);
            }
            function plan5(diaHora) {
                if (IngrupoBetbry != null) {
                    bot.telegram.kickChatMember(grupoBetbry, chatId);
                }
                if (IngrupoSmash != null) {
                    bot.telegram.kickChatMember(grupoSmash, chatId);
                }
                bot.telegram.unbanChatMember(grupoBlaze, chatId)
                    .then(() => {
                    console.log(`Usuário desbanido grupoBlaze com sucesso`);
                })
                    .catch((err) => {
                    console.log(err);
                });
                kick.suporteBot('confirmPayment', `ID&${chatId}| Pagamento&Seu pagamento foi aprovado com sucesso| Plano&${namePlano}| Liberado& ${diaHora}`);
            }
        }
        bot.stop();
        if (order?.$original.valor == '90 dias' || namePlano == 'Plano 1 - Trimestral') {
            valor = Number(190);
            plano = 'Plano 1 - Trimestral';
            namePlano = 'trimestral';
            dias = 90;
        }
        else if (order?.$original.valor == '60 dias' || namePlano == 'Plano 1 - Bimestral') {
            valor = Number(127);
            plano = 'Plano 1 - Bimestral';
            namePlano = 'bimestral';
            dias = 60;
            tl(plano, namePlano, valor, dias, email, password, codigoAfiliado, user);
        }
        else if (order?.$original.valor == '30 dias' || namePlano == 'Plano 1 - Mensal') {
            valor = Number(79);
            plano = 'Plano 1 - Mensal';
            namePlano = 'mensal';
            dias = 30;
            tl(plano, namePlano, valor, dias, email, password, codigoAfiliado, user);
        }
        else if (namePlano == 'Plano 2 - Mensal') {
            valor = Number(49);
            plano = 'Plano 2 - Mensal';
            namePlano = 'mensal';
            dias = 30;
            afiliado();
        }
        else if (namePlano == 'Plano 2 - Bimestral') {
            valor = Number(79);
            plano = 'Plano 2 - Bimestral';
            namePlano = 'bimestral';
            dias = 60;
            afiliado();
        }
        else if (namePlano == 'Plano 2 - Trimestral') {
            valor = Number(119);
            plano = 'Plano 2 - Trimestral';
            namePlano = 'trimestral';
            dias = 90;
            afiliado();
        }
        else if (namePlano == 'Plano 3 - Mensal') {
            valor = Number(29);
            plano = 'Plano 3 - Mensal';
            namePlano = 'mensal';
            dias = 30;
            afiliado();
        }
        else if (namePlano == 'Plano 3 - Bimestral') {
            valor = Number(47);
            plano = 'Plano 3 - Bimestral';
            namePlano = 'bimestral';
            dias = 60;
            afiliado();
        }
        else if (namePlano == 'Plano 3 - Trimestral') {
            valor = Number(71);
            plano = 'Plano 3 - Trimestral';
            namePlano = 'trimestral';
            dias = 90;
            afiliado();
        }
        else if (namePlano == 'Plano 4 - Mensal') {
            valor = Number(29);
            plano = 'Plano 4 - Mensal';
            namePlano = 'mensal';
            dias = 30;
            afiliado();
        }
        else if (namePlano == 'Plano 4 - Bimestral') {
            valor = Number(47);
            plano = 'Plano 4 - Bimestral';
            namePlano = 'bimestral';
            dias = 60;
            afiliado();
        }
        else if (namePlano == 'Plano 4 - Trimestral') {
            valor = Number(71);
            plano = 'Plano 4 - Trimestral';
            namePlano = 'trimestral';
            dias = 90;
            afiliado();
        }
        else if (namePlano == 'Plano 5 - Mensal') {
            valor = Number(29);
            plano = 'Plano 5 - Mensal';
            namePlano = 'mensal';
            dias = 30;
            afiliado();
        }
        else if (namePlano == 'Plano 5 - Bimestral') {
            valor = Number(47);
            plano = 'Plano 5 - Bimestral';
            namePlano = 'bimestral';
            dias = 60;
            afiliado();
        }
        else if (namePlano == 'Plano 5 - Trimestral') {
            valor = Number(71);
            plano = 'Plano 5 - Trimestral';
            namePlano = 'trimestral';
            dias = 90;
            afiliado();
        }
        async function tl(plano, namePlano, valor, dias, email, password, codigoAfiliado, user) {
            let userExpiresPlus = new Date(user.expires_at);
            let contExpiration = new Date();
            let expiresIn = Math.abs(userExpiresPlus.getTime() - contExpiration.getTime());
            let days = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
            if (user.nameToken == 'Expirado') {
                days = 0;
            }
            days = days + dias;
            await Database_1.default.from('api_tokens').where('user_id', user.id).delete();
            const newToken = await auth.use('api').generate(user, {
                expiresIn: `${days}d`,
                name: namePlano
            });
            user.rememberMeToken = newToken.token;
            user.expires_at = newToken.expiresAt;
            user.nameToken = newToken.name;
            user.save();
            afiliado();
        }
        async function afiliado() {
            const afiliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('linkafiliado', `https://www.spybet.com.br/ap/${codigoAfiliado}`).first();
            if (afiliado == null) {
                return response.status(200).json({ status: 'ok' });
            }
            if (plano == 'Plano 1 - Trimestral') {
                afiliado.afiliacaotrimestral = Number(afiliado.afiliacaotrimestral) + 1;
                valor = Number(190) - Number(133);
            }
            else if (plano == 'Plano 1 - Bimestral') {
                afiliado.afiliacaobimestral = Number(afiliado.afiliacaobimestral) + 1;
                valor = Number(127) - Number(88);
            }
            else if (plano == 'Plano 1 - Mensal') {
                afiliado.afiliacaomensal = Number(afiliado.afiliacaomensal) + 1;
                valor = Number(79) - Number(47);
            }
            else if (plano == 'Plano 2 - Trimestral') {
                afiliado.afiliacaotrimestral = Number(afiliado.afiliacaotrimestral) + 1;
                valor = Number(119) - Number(79);
            }
            else if (plano == 'Plano 2 - Bimestral') {
                afiliado.afiliacaobimestral = Number(afiliado.afiliacaobimestral) + 1;
                valor = Number(79) - Number(47);
            }
            else if (plano == 'Plano 2 - Mensal') {
                afiliado.afiliacaomensal = Number(afiliado.afiliacaomensal) + 1;
                valor = Number(47) - Number(29);
            }
            else if (plano == 'Plano 3 - Trimestral') {
                afiliado.afiliacaotrimestral = Number(afiliado.afiliacaotrimestral) + 1;
                valor = Number(71) - Number(47);
            }
            else if (plano == 'Plano 3 - Bimestral') {
                afiliado.afiliacaobimestral = Number(afiliado.afiliacaobimestral) + 1;
                valor = Number(47) - Number(29);
            }
            else if (plano == 'Plano 3 - Mensal') {
                afiliado.afiliacaomensal = Number(afiliado.afiliacaomensal) + 1;
                valor = Number(29) - Number(19);
            }
            else if (plano == 'Plano 4 - Trimestral') {
                afiliado.afiliacaotrimestral = Number(afiliado.afiliacaotrimestral) + 1;
                valor = Number(71) - Number(47);
            }
            else if (plano == 'Plano 4 - Bimestral') {
                afiliado.afiliacaobimestral = Number(afiliado.afiliacaobimestral) + 1;
                valor = Number(47) - Number(29);
            }
            else if (plano == 'Plano 4 - Mensal') {
                afiliado.afiliacaomensal = Number(afiliado.afiliacaomensal) + 1;
                valor = Number(29) - Number(19);
            }
            else if (plano == 'Plano 5 - Trimestral') {
                afiliado.afiliacaotrimestral = Number(afiliado.afiliacaotrimestral) + 1;
                valor = Number(71) - Number(47);
            }
            else if (plano == 'Plano 5 - Bimestral') {
                afiliado.afiliacaobimestral = Number(afiliado.afiliacaobimestral) + 1;
                valor = Number(47) - Number(29);
            }
            else if (plano == 'Plano 5 - Mensal') {
                afiliado.afiliacaomensal = Number(afiliado.afiliacaomensal) + 1;
                valor = Number(29) - Number(19);
            }
            afiliado.carteira = Number(afiliado.carteira) + Number(valor);
            await afiliado.save();
            var ultimaTransacao = await T4ansp3eAso3a532x1nib_1.default.query().orderBy('id', 'desc').first();
            var id = ultimaTransacao.id + 1 + 1000;
            let vl = Number(valor).toFixed(2);
            await Database_1.default.transaction(async (trx) => {
                const newSave = new T4ansp3eAso3a532x1nib_1.default();
                newSave.userId = afiliado.userId;
                newSave.idtransacao = id;
                newSave.valor = String('R$' + vl + ' +');
                newSave.status = 'Comissão recebida';
                newSave.tipo = 'Comissão';
                newSave.metodotransacao = 'Carteira';
                await newSave.useTransaction(trx).save();
            });
        }
    }
}
exports.default = CheckoutController;
//# sourceMappingURL=CheckoutController.js.map