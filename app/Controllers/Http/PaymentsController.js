"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Encryption_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Encryption"));
const ConfirmPayment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ConfirmPayment"));
class PaymentsController {
    async confirmPayment({ session, response }) {
        session.flash({ renovação: 'Pagamento sendo processado, envie o comprovante para que possamos liberar seu acesso.Click aqui para enviar o comprovante:',
            processando: "processando" });
        return response.redirect('/auth/login');
    }
    async checkoutPaymentPlanTrimestral({ response, auth }) {
        let Id = auth.user.id;
        let allcheckoutPaymentPlan = await ConfirmPayment_1.default.query().where('userId', Id);
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        if (allcheckoutPaymentPlan.length == 0) {
            await ConfirmPayment_1.default.create({
                userId: Id,
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'trimestral',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        else {
            await ConfirmPayment_1.default.query().where('userId', Id).update({
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'trimestral',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        return response.redirect('https://mpago.la/1uCHPLr');
    }
    async confirmPaymentPlanTrimestral({ response, session, auth }) {
        let Id = auth.user.id;
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        await ConfirmPayment_1.default.query().where('userId', Id).update({
            confirm_payment_token: gerarToken,
            confirm_payment_plan: 'trimestral'
        });
        session.flash({ renovação: 'Faça login para confirmar a renovação do seu plano' });
        return response.redirect('/auth/login');
    }
    async checkoutPaymentPlanBimestral({ response, auth }) {
        let Id = auth.user.id;
        let allcheckoutPaymentPlan = await ConfirmPayment_1.default.query().where('userId', Id);
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        if (allcheckoutPaymentPlan.length == 0) {
            await ConfirmPayment_1.default.create({
                userId: Id,
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'bimestral',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        else {
            await ConfirmPayment_1.default.query().where('userId', Id).update({
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'bimestral',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        return response.redirect('https://mpago.la/2ZzHuvf');
    }
    async confirmPaymentPlanBimestral({ response, session, auth }) {
        let Id = auth.user.id;
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        await ConfirmPayment_1.default.query().where('userId', Id).update({
            confirm_payment_token: gerarToken,
            confirm_payment_plan: 'bimestral'
        });
        session.flash({ renovação: 'Faça login para confirmar a renovação do seu plano' });
        return response.redirect('/auth/login');
    }
    async checkoutPaymentPlanMensal({ response, auth }) {
        let Id = auth.user.id;
        let allcheckoutPaymentPlan = await ConfirmPayment_1.default.query().where('userId', Id);
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        if (allcheckoutPaymentPlan.length == 0) {
            await ConfirmPayment_1.default.create({
                userId: Id,
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'mensal',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        else {
            await ConfirmPayment_1.default.query().where('userId', Id).update({
                checkout_payment_token: gerarToken,
                checkout_payment_plan: 'mensal',
                confirm_payment_token: '',
                confirm_payment_plan: ''
            });
        }
        return response.redirect('https://mpago.la/1xqJJVN');
    }
    async confirmPaymentPlanMensal({ response, session, auth }) {
        let Id = auth.user.id;
        let gerarToken = Encryption_1.default.encrypt(Helpers_1.string.generateRandom(32));
        await ConfirmPayment_1.default.query().where('userId', Id).update({
            confirm_payment_token: gerarToken,
            confirm_payment_plan: 'mensal'
        });
        session.flash({ renovação: 'Faça login para confirmar a renovação do seu plano' });
        return response.redirect('/auth/login');
    }
}
exports.default = PaymentsController;
//# sourceMappingURL=PaymentsController.js.map