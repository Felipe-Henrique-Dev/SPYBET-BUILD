"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Af2l1p3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Af2l1p3eAso3a532x1nib"));
const T4ansp3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/T4ansp3eAso3a532x1nib"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class WalletsController {
    async wallet({ view, auth, session, response }) {
        const userid = auth.user.id;
        const user = await auth.user;
        const wallet = await Af2l1p3eAso3a532x1nib_1.default.query().where('userId', userid).first();
        console.log(user.nameToken);
        if (user.nameToken == 'Free Session' || user.nameToken == 'Expirado' || user?.nameToken == 'CONTADEMO') {
            session.flash('newAfiliado', 'Você ainda não é um afiliado, cadastre-se agora mesmo e ganhe ate 40% de comissão sobre cada pagamento de seus afiliados.');
            return response.redirect('/home/planovip');
        }
        if (wallet == null || wallet == undefined) {
            session.flash('newAfiliado', 'Você ainda não é um afiliado, cadastre-se agora mesmo e ganhe ate 40% de comissão sobre cada pagamento de seus afiliados.');
            const conteinernewafiliado = 'cont-not-afiliado';
            return view.render('wallet', { conteinernewafiliado });
        }
        var conteinernewafiliado = 'cont-exc-afiliado';
        const linkafiliado = wallet.linkafiliado;
        const carteira = 'R$' + ' ' + wallet.carteira.toFixed(2);
        const afiliacaototal = wallet.afiliacaototal;
        const afiliacaotrimestral = wallet.afiliacaotrimestral;
        const afiliacaobimestral = wallet.afiliacaobimestral;
        const afiliacaomensal = wallet.afiliacaomensal;
        return view.render('wallet', { conteinernewafiliado, linkafiliado, carteira, afiliacaototal, afiliacaotrimestral, afiliacaobimestral, afiliacaomensal });
    }
    async wallet2({ auth, response, request }) {
        const user = auth.user.id;
        const all = request.all().liberacao;
        const wallet = await Af2l1p3eAso3a532x1nib_1.default.query().where('userId', user).first();
        const transacoes = await T4ansp3eAso3a532x1nib_1.default.query().where('userId', user);
        if (!wallet) {
            return;
        }
        var conteinernewafiliado = 'cont-exc-afiliado';
        if (all != conteinernewafiliado) {
            return response.status(400).json({ conteinernewafiliado: 'Erro ao liberar o conteiner, tente novamente.' });
        }
        return response.status(200).json({ transacoes });
    }
    async walletPost({ request, response, auth, session }) {
        const user = auth.user.id;
        const all = request.all();
        var newAfiliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('cpf', all.cpf).first();
        if (newAfiliado != null || newAfiliado != undefined) {
            return response.status(400).json({ cpfInvalido: 'CPF já cadastrado, tente novamente.' });
        }
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        var link;
        function generatePassword(length = 10) {
            let chars = upper + lower + numbers;
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        }
        link = generatePassword(8);
        verificar(link);
        async function verificar(link) {
            const verifica = await Af2l1p3eAso3a532x1nib_1.default.query().where('linkafiliado', link).first();
            if (verifica != null || verifica != undefined) {
                link = generatePassword(8);
                verificar(link);
            }
        }
        const linkTotal = 'https://www.spybet.com.br/ap/' + link;
        try {
            const data = request.only(['cpf', 'tipochavepix', 'chavepix', 'banco', 'nometitular']);
            await Database_1.default.transaction(async (trx) => {
                const newSave = new Af2l1p3eAso3a532x1nib_1.default();
                newSave.userId = user;
                newSave.linkafiliado = linkTotal;
                newSave.cpf = data.cpf;
                newSave.carteira = 0;
                newSave.afiliacaotrimestral = 0;
                newSave.afiliacaobimestral = 0;
                newSave.afiliacaomensal = 0;
                newSave.afiliacaototal = 0;
                newSave.tipochavepix = data.tipochavepix;
                newSave.chavepix = data.chavepix;
                newSave.banco = data.banco;
                newSave.nometitular = data.nometitular;
                await newSave.useTransaction(trx).save();
            });
            return response.json({ status: 200 });
        }
        catch (error) {
            return response.status(400).json({ cpfInvalido: 'CPF já cadastrado, tente novamente.' });
        }
    }
    async withdrawMoney({ request, response, auth, }) {
        const user = auth.user.id;
        const wallet = await Af2l1p3eAso3a532x1nib_1.default.query().where('userId', user).first();
        const ultimoIdDeSaque = await T4ansp3eAso3a532x1nib_1.default.query().orderBy('id', 'desc').first();
        const solitacaoDeSaqueHoje = await T4ansp3eAso3a532x1nib_1.default.query().where('userId', user).where('status', 'pendente').where('created_at', '>=', new Date().setHours(0, 0, 0, 0)).first();
        const carteira = await wallet?.carteira;
        if (solitacaoDeSaqueHoje != null || solitacaoDeSaqueHoje != undefined) {
            return response.status(400).send({ error: 'Você já possui uma solicitação de saque pendente, aguarde até que seja processada.' });
        }
        if (wallet.carteira < 20) {
            return response.status(400).send({ error: 'Valor de saque deve ser maior ou igual a R$20,00' });
        }
        const idtransacao = ultimoIdDeSaque.id + 1000;
        const status = 'pendente';
        await Database_1.default.transaction(async (trx) => {
            const newSave = new T4ansp3eAso3a532x1nib_1.default();
            newSave.userId = user;
            newSave.idtransacao = idtransacao;
            newSave.valor = String('R$' + '  -' + carteira.toFixed(2));
            newSave.status = status;
            newSave.tipo = 'Saque';
            newSave.metodotransacao = 'PIX';
            await newSave.useTransaction(trx).save();
        });
        return response.status(200).send({ success: 'Sua solicitação de saque no valor de R$' + wallet.carteira + ' foi realizado com sucesso!' });
    }
    async withdrawMoneGety({ view, auth, session, response }) {
        const allTranscaoPendenteDeSaques = await T4ansp3eAso3a532x1nib_1.default.query().where('status', 'pendente').where('tipo', 'saque').orderBy('id', 'desc');
        const saques = [];
        for (let i = 0; i < allTranscaoPendenteDeSaques.length; i++) {
            const contaDoAfliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('userId', allTranscaoPendenteDeSaques[i].userId).first();
            saques.push({
                id: allTranscaoPendenteDeSaques[i].id,
                idtransacao: allTranscaoPendenteDeSaques[i].idtransacao,
                valor: allTranscaoPendenteDeSaques[i].valor,
                status: allTranscaoPendenteDeSaques[i].status,
                tipo: allTranscaoPendenteDeSaques[i].tipo,
                metodotransacao: allTranscaoPendenteDeSaques[i].metodotransacao,
                created_at: allTranscaoPendenteDeSaques[i].createdAt,
                nome: contaDoAfliado.nometitular,
                chavepix: contaDoAfliado.chavepix,
                banco: contaDoAfliado.banco,
                tipochavepix: contaDoAfliado.tipochavepix,
            });
        }
        return response.status(200).json(saques);
    }
    async withdrawMoneyPost({ request, response, auth, session }) {
        const idTransacao = request.all().idtransacao;
        console.log(idTransacao);
        const confirmarSaque = await T4ansp3eAso3a532x1nib_1.default.query().where('idtransacao', idTransacao).first();
        var id = confirmarSaque.userId;
        var valor = confirmarSaque.valor.replace('R$  -', '');
        const wallet = await Af2l1p3eAso3a532x1nib_1.default.query().where('userId', id).first();
        let vl = Number(valor).toFixed(2);
        await Database_1.default.transaction(async (trx) => {
            const newSave = new T4ansp3eAso3a532x1nib_1.default();
            newSave.userId = id;
            newSave.idtransacao = idTransacao;
            newSave.valor = String('R$' + vl + ' -');
            newSave.status = 'Saque realizado';
            newSave.tipo = 'Saque';
            newSave.metodotransacao = 'PIX';
            await newSave.useTransaction(trx).save();
        });
        await confirmarSaque?.delete();
        wallet.carteira = wallet.carteira - Number(valor);
        await wallet.save();
        return response.status(200).send({ success: 'Saque realizado com sucesso!' });
    }
}
exports.default = WalletsController;
//# sourceMappingURL=WalletsController.js.map