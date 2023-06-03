"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../Models/User"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const luxon_1 = require("luxon");
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));
const ConfirmPayment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ConfirmPayment"));
const Tabela_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Tabela"));
const querystring_1 = require("querystring");
const node_fetch_1 = __importDefault(require("node-fetch"));
const Af2l1p3eAso3a532x1nib_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Af2l1p3eAso3a532x1nib"));
class RoutesController {
    async logout({ auth, response }) {
        await auth.logout();
        return response.redirect('/auth/login');
    }
    async login({ view }, HttpContextContract) {
        return view.render('login');
    }
    async loginPost({ view, request, response, auth, session }, HttpContextContract) {
        var email = request.input('email');
        var password = request.input('password');
        var recaptchaToken = request.input('recaptchaToken');
        const data = await (0, node_fetch_1.default)('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: (0, querystring_1.stringify)({
                secret: '6Ld88TMjAAAAAKheRBw_9cEccc1FgcO4nJ1XyXem',
                response: recaptchaToken
            })
        }).then(res => res.json());
        if (!data.success == true || !data.score > 0.5 || !data.action == 'login') {
            session.flash('error', 'Recaptcha inválido');
            return response.redirect('back');
        }
        try {
            const user = await User_1.default.findByOrFail('email', email);
            if (user.nameToken === 'CONTADEMO') {
                await auth.use('web').attempt(email, password);
                if (user.nameToken == 'CONTADEMO') {
                    session.flash({ error: 'Bem vindo,seu plano é limitado, para ter acesso a todos os recursos, cadastra-se!' });
                }
                return response.redirect('/home/planovip/');
            }
            if (!user) {
                session.flash({ error: 'E-mail não encontrado' });
                return response.redirect('back');
            }
            if (!(await Hash_1.default.verify(user.password, password))) {
                session.flash({ error: 'Senha incorreta!' });
                return response.redirect('back');
            }
            if (user.rememberMeToken === null) {
                let token = await auth.use('api').attempt(email, password, {
                    expiresIn: '7 days',
                    name: 'Free session'
                });
                user.rememberMeToken = token.token;
                user.expires_at = token.expiresAt;
                user.nameToken = token.name;
                await user.save();
                session.flash({ success: 'Você tem 7 dias de acesso gratuito! Aproveite!' });
            }
            if (user.emailVerifiedAt == null) {
                session.flash({
                    alert: {
                        type: 'verifyEmail',
                        message: `Verifique seu e-mail para continuar, caso não tenha recebido o e-mail,`
                    }
                });
                session.flash({ verifyEmail: `Verifique seu e-mail para continuar, caso não tenha recebido o e-mail,` });
                return response.redirect('back');
            }
            let confirmPayment = await ConfirmPayment_1.default.query().where('userId', user.id).first();
            if (user.expires_at < new Date() && user.nameToken != 'Expirado') {
                session.flash({ error: 'Seu plano expirou' });
                let newToken = await auth.use('api').attempt(email, password, {
                    expiresIn: '1y',
                    name: 'Expirado'
                });
                user.rememberMeToken = newToken.token1;
                user.expires_at = newToken.expiresAt;
                user.nameToken = newToken.name;
                user.save();
                await auth.use('web').attempt(email, password);
                session.flash({ error: 'Seu plano expirou' });
                return response.redirect('/home/planovip/');
            }
            else if (user.expires_at < new Date() && user.nameToken == 'Expirado') {
                session.flash({ error: 'Seu plano expirou' });
                let newToken = await auth.use('api').attempt(email, password, {
                    expiresIn: '1y',
                    name: 'Expirado'
                });
                user.rememberMeToken = newToken.token1;
                user.expires_at = newToken.expiresAt;
                user.save();
                await auth.use('web').attempt(email, password);
                session.flash({ error: 'Seu plano expirou' });
                return response.redirect('/home/planovip/');
            }
            try {
                let diasRestantes = Math.round((user.expires_at - new Date()) / (1000 * 3600 * 24));
                await auth.use('web').attempt(email, password);
                if (user.nameToken == 'Expirado') {
                    session.flash({ error: 'Seu plano expirou, seu acesso é limitado' });
                }
                else {
                    session.flash({ success: `Bem vindo ${user.name}, você tem ${diasRestantes} dias de acesso` });
                }
                return response.redirect('/home/planovip/');
            }
            catch (error) {
                session.flash({ error: 'Usuário ou senha incorretos' });
                return response.redirect('back');
            }
        }
        catch (error) {
            session.flash({ error: 'Usuário não registrado' });
            return response.redirect('back');
        }
    }
    async cadastro({ view, request }, HttpContextContract) {
        let parametros = request.encryptedCookie('CP');
        if (parametros == undefined) {
            parametros = 'wIUXrK0a';
        }
        return view.render('cadastro', { parametros });
    }
    async registerPost({ request, response, session }) {
        const newUserSchema = Validator_1.schema.create({
            name: Validator_1.schema.string([
                Validator_1.rules.maxLength(255),
                Validator_1.rules.minLength(3),
            ]),
            sobrenome: Validator_1.schema.string([
                Validator_1.rules.maxLength(255),
                Validator_1.rules.minLength(3),
            ]),
            password: Validator_1.schema.string([
                Validator_1.rules.confirmed('password_confirmation'),
                Validator_1.rules.maxLength(12),
                Validator_1.rules.minLength(6),
            ]),
            cpf: Validator_1.schema.string([]),
            data_nascimento: Validator_1.schema.string([
                Validator_1.rules.maxLength(10),
                Validator_1.rules.minLength(10),
            ]),
            email: Validator_1.schema.string([
                Validator_1.rules.email(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.minLength(3),
                Validator_1.rules.unique({ table: 'users', column: 'email' }),
            ]),
            telefone: Validator_1.schema.string([
                Validator_1.rules.maxLength(15),
                Validator_1.rules.minLength(10),
            ]),
        });
        const payload = await request.validate({
            schema: newUserSchema,
            messages: {
                'name.required': 'O campo nome é obrigatório!',
                'name.maxLength': 'O campo nome deve ter no máximo 255 caracteres!',
                'name.minLength': 'O campo nome deve ter no mínimo 3 caracteres!',
                'name.regex': 'O campo nome deve conter apenas letras!',
                'sobrenome.required': 'O campo sobrenome é obrigatório!',
                'sobrenome.maxLength': 'O campo sobrenome deve ter no máximo 255 caracteres!',
                'sobrenome.minLength': 'O campo sobrenome deve ter no mínimo 3 caracteres!',
                'sobrenome.regex': 'O campo sobrenome deve conter apenas letras!',
                'password.required': 'O campo senha é obrigatório!',
                'password.maxLength': 'O campo senha deve ter no máximo 12 caracteres!',
                'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres!',
                'password_confirmation.required': 'O campo confirmação de senha é obrigatório!',
                'password_confirmation.maxLength': 'O campo confirmação de senha deve ter no máximo 12 caracteres!',
                'password_confirmation.minLength': 'O campo confirmação de senha deve ter no mínimo 6 caracteres!',
                'password_confirmation.confirmed': 'Senhas não conferem!',
                'data_nascimento.required': 'O campo data de nascimento é obrigatório!',
                'data_nascimento.before': 'Você precisa ser maior de 18 anos para se cadastrar!',
                'data_nascimento.after': 'Insira uma data válida!',
                'email.required': 'O campo email é obrigatório!',
                'email.email': 'O campo email deve ser um email válido!',
                'email.maxLength': 'O campo email deve ter no máximo 255 caracteres!',
                'email.minLength': 'O campo email deve ter no mínimo 3 caracteres!',
                'email.unique': 'O email informado já está cadastrado!',
                'telefone.required': 'O campo telefone é obrigatório!',
                'telefone.maxLength': 'O campo telefone deve ter no máximo 11 caracteres!',
                'telefone.minLength': 'O campo telefone deve ter no mínimo 10 caracteres!',
                'cpf.required': 'O campo cpf é obrigatório!',
                'cpf.unique': 'O CPF informado já está cadastrado!',
            }
        });
        try {
            const user = await User_1.default.create(payload);
            user.save();
            Event_1.default.emit('userRegistered', user);
            try {
                const afiliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('linkafiliado', `https://www.spybet.com.br/ap/${request.all().cpf}`).first();
                afiliado.afiliacaototal = Number(afiliado.afiliacaototal) + 1;
                await afiliado.save();
            }
            catch (error) {
                console.log('sem afiliado');
            }
            const transacao = session.flash({
                alert: {
                    type: 'successRegister',
                    message: `Foi enviado um email para ${payload.email}, para ativar sua conta!
                    Para enviar novamente o email, clique aqui em`
                }
            });
            return response.redirect('/auth/login');
        }
        catch (error) {
            session.flash({
                alert: {
                    type: 'error',
                    message: 'Erro ao cadastrar usuário!'
                }
            });
            return response.redirect('back');
        }
    }
    async home({ params, auth, session, response }, HttpContextContract) {
        if ((auth.user || params.id) == " " || (auth.user || params.id) == null || (auth.user || params.id) == undefined) {
            return response.redirect('/auth/login');
        }
        const id = params.id || auth.user.id;
        const user = await User_1.default.query().where('id', id).firstOrFail();
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        return response.redirect('/home/planovip/');
    }
    async planovip({ view, auth, response }) {
        const userId = auth.user?.id;
        const qualPlano = await User_1.default.query().where('id', userId).firstOrFail();
        const plano = qualPlano.nameToken;
        var newAfiliado;
        var afiliado;
        var nooQualificado;
        var link;
        if (plano == 'Expirado' || plano == 'Free session' || plano == 'CONTADEMO') {
            afiliado = 'not-afiliado';
            newAfiliado = 'not-afiliado';
            nooQualificado = 'free-plan';
        }
        else {
            const Afliliado = await Af2l1p3eAso3a532x1nib_1.default.query().where('user_id', userId).first();
            if (Afliliado == null || Afliliado == undefined) {
                afiliado = 'not-afiliado';
                newAfiliado = 'new-afiliado';
                nooQualificado = 'not-afiliado';
            }
            else {
                afiliado = 'afiliado';
                newAfiliado = 'not-afiliado';
                nooQualificado = 'not-afiliado';
                link = Afliliado.$attributes.linkafiliado;
            }
        }
        return view.render('home-planovip', { afiliado, newAfiliado, nooQualificado, link });
    }
    async gerenciamento({ view, auth, response, session }) {
        const userid = auth.user.id;
        const tabela = await (await Tabela_1.default.query().where('user_id', userid));
        var tabelaarray = tabela.map(function (tabela) {
            return tabela.toJSON();
        });
        var tabelaID = [...tabelaarray].map(function (tabela) {
            let id = tabela.id.toString().split(',');
            return id;
        });
        var nomeTabela = tabelaarray.map(function (tabela) {
            let nome = tabela.name.split(',');
            return nome;
        });
        var qtdTabela = nomeTabela.length;
        const user = await auth.user;
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        const userId = Number(auth.user.id) + 122930000000;
        response.redirect('/home/gerenciamento/sobre-gerenciamento');
        return view.render('home-gerenciamento-menu', { tabelaID, nomeTabela, qtdTabela });
    }
    async gerenciamentoDuvidas({ view, auth, response, session }) {
        const user = await auth.user;
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        return view.render('home-gerenciamento-duvidas');
    }
    async duvidas({ view, auth, response, session }) {
        const user = await auth.user;
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        const userId = Number(auth.user.id) + 122930000000;
        return view.render('home-duvidas');
    }
    async padroes({ view, auth, response, session }) {
        const user = await auth.user;
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        return view.render('home-padroes');
    }
    async apresentacao({ view, auth, request, response }) {
        let parametros = await request.params().link;
        response.encryptedCookie('CP', parametros);
        if (auth.user) {
            return response.redirect('/home');
        }
        return view.render('apresentacao');
    }
    async mines({ view, session, response, auth }) {
        const user = await auth.user;
        if (user.nameToken != 'Expirado' && user.expires_at < luxon_1.DateTime.now()) {
            session.flash({ error: 'Seu plano expirou,faça login para renovar' });
            return response.redirect('/auth/login');
        }
        return view.render('mines');
    }
}
exports.default = RoutesController;
//# sourceMappingURL=RoutesController.js.map