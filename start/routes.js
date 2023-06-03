"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/robots.txt', async ({ view }) => {
    return view.render('robots.edge');
});
Route_1.default.get('/sitemap.xml', async ({ view }) => {
    return view.render('sitemap');
});
Route_1.default.group(() => {
    Route_1.default.get('/login', 'DashboardController.login');
    Route_1.default.post('/login', 'DashboardController.loginPost');
    Route_1.default.get('/main', 'DashboardController.main').middleware('auth');
    Route_1.default.get('/logout', 'DashboardController.logout');
}).prefix('/dashboard/admin/auth/');
Route_1.default.group(() => {
    Route_1.default.get('/login', 'RoutesController.login');
    Route_1.default.post('/login', 'RoutesController.loginPost');
    Route_1.default.get('/cadastro/:link?', 'RoutesController.cadastro');
    Route_1.default.post('/cadastro', 'RoutesController.registerPost');
    Route_1.default.post('/registro-telegram', 'RoutesController.registerPost');
    Route_1.default.get('/logout', 'RoutesController.logout');
    Route_1.default.get('/recuperar-senha', 'PasswordRecoveriesController.create');
    Route_1.default.post('/recuperar-senha', 'PasswordRecoveriesController.store');
    Route_1.default.get('/reset-password/:token', 'PasswordRecoveriesController.resetCreate');
    Route_1.default.post('/reset-password/save', 'PasswordRecoveriesController.resetStore');
    Route_1.default.get('/verification/new', 'EmailVerificationController.create');
    Route_1.default.post('/verification', 'EmailVerificationController.store');
    Route_1.default.get('/verification/:email', 'EmailVerificationController.verify').as('verification.verify');
}).prefix('/auth');
Route_1.default.get('/ap/:link?', 'RoutesController.apresentacao');
Route_1.default.get('/', 'RoutesController.apresentacao');
Route_1.default.get('/termos-de-uso', async ({ view }) => {
    return view.render('termosdeuso');
});
Route_1.default.get('/termos-de-privacidade', async ({ view }) => {
    return view.render('politicaprivacidade');
});
Route_1.default.group(() => {
    Route_1.default.get('/blaze', 'BlazesController.blaze');
    Route_1.default.get('/beyond', 'BeyondsController.beyond');
    Route_1.default.get('/betbry', 'BetbrysController.betbry');
    Route_1.default.get('/beette', 'BeettesController.beette');
    Route_1.default.get('/smash', 'SmashsController.smash');
    Route_1.default.get('/gluck', 'GlucksController.gluck');
    Route_1.default.get('/home', 'RoutesController.home');
    Route_1.default.get('/mines', 'RoutesController.mines');
    Route_1.default.get('/home/planovip', 'RoutesController.planovip');
    Route_1.default.get('/home/gerenciamento', 'RoutesController.gerenciamento');
    Route_1.default.get('/home/padroes', 'RoutesController.padroes');
}).middleware(['auth']);
Route_1.default.group(() => {
    Route_1.default.get('/user/', 'UserPerfilsController.userPerfils');
    Route_1.default.post('/user/:id', 'UserPerfilsController.update');
}).middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/gerenciamento/sobre-gerenciamento', 'TabelasController.sobreGerenciamento');
    Route_1.default.resource('/gerenciamento/tabela/', 'TabelasController');
    Route_1.default.get('/gerenciamento/tabelas-criadas', 'TabelasController.tabelasCriadas');
    Route_1.default.get('/gerenciamento/tabelas-criadas/delete/:id', 'TabelasController.tabeladestroy');
    Route_1.default.get('/gerenciamento/tabelas-criadas/update/:id', 'TabelasController.tabelaupdate');
}).prefix('/home').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'BlazesController.crash');
    Route_1.default.get('/double/:id?', 'BlazesController.double');
    Route_1.default.post('/crash/new-padrao', 'BlazeCrashController.BlazeCrashNewPadrao');
}).prefix('/blaze').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'BeyondsController.crash');
    Route_1.default.get('/double/:id?', 'BeyondsController.double');
    Route_1.default.post('/crash/new-padrao', 'BeyondCrashController.BeyondCrashNewPadrao');
}).prefix('/beyond').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'BetbrysController.crash');
    Route_1.default.get('/double/:id?', 'BetbrysController.double');
    Route_1.default.get('/fruit/:id?', 'BetbrysController.fruit');
    Route_1.default.post('/crash/new-padrao', 'BetbryCrashController.BetbryCrashNewPadrao');
}).prefix('/betbry').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'SmashsController.crash');
    Route_1.default.get('/double/:id?', 'SmashsController.double');
    Route_1.default.post('/crash/new-padrao', 'SmashCrashController.SmashCrashNewPadrao');
}).prefix('/smash').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'GlucksController.crash');
    Route_1.default.get('/double/:id?', 'GlucksController.double');
    Route_1.default.post('/crash/new-padrao', 'GluckCrashController.GluckCrashNewPadrao');
}).prefix('/gluck').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/crash/:id?', 'BeettesController.crash');
    Route_1.default.get('/double/:id?', 'BeettesController.double');
    Route_1.default.post('/crash/new-padrao', 'BeetteCrashController.BeetteCrashNewPadrao');
}).prefix('/beette').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.get('/wallet', 'WalletsController.wallet');
    Route_1.default.post('/wallet_____cont___wallet', 'WalletsController.wallet2');
    Route_1.default.post('/novo--afiliado', 'WalletsController.walletPost');
    Route_1.default.post('/withdrawMoney', 'WalletsController.withdrawMoney');
    Route_1.default.post('/_____geracao___saque__dash', 'WalletsController.withdrawMoneGety');
    Route_1.default.post('/_____confirm___saque__dash', 'WalletsController.withdrawMoneyPost');
}).middleware('auth');
Route_1.default.get('/pre-checkout/:link?', 'CheckoutController.precheckout');
Route_1.default.get('/checkout-card/:link?', 'CheckoutController.checkoutCardPlano').middleware('auth');
Route_1.default.post('/process_payment', 'CheckoutController.createPreference').middleware('auth');
Route_1.default.get('/checkout-pix/:link?', 'CheckoutController.checkoutPixPlano').middleware('auth');
Route_1.default.post('/process_payment-Pix', 'CheckoutController.createPreferencePix').middleware('auth');
Route_1.default.get('/feedback', 'CheckoutController.feedback').middleware('auth');
Route_1.default.post('/feedback-ipn/:link?', 'CheckoutController.feedbackIpn');
Route_1.default.post('/payment/webhook-amigoia', 'BotAmigoIa.botAmigoIaWebhook');
Route_1.default.get('/vendas/*', async ({ view }) => {
    return view.render('home-duvidas');
});
Route_1.default.get('/vendas', async ({ view }) => {
    return view.render('home-duvidas');
});
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
View_1.default.global('appUrl', (path) => {
    const appUrl = Env_1.default.get('APP_URL');
    if (!path || path === '/') {
        return appUrl;
    }
    return path.startsWith('/') ? `${appUrl}${path}` : `${appUrl}/${path}`;
});
//# sourceMappingURL=routes.js.map