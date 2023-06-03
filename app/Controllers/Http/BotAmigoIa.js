"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewBotController_1 = __importDefault(require("../Ws/NewBotController"));
class BotAmigoIa {
    async botAmigoIaWebhook({ request, response }) {
        response.status(200).send('ok');
        const bootMyFriend = new NewBotController_1.default();
        bootMyFriend.bootMyFriends(request);
    }
}
exports.default = BotAmigoIa;
//# sourceMappingURL=BotAmigoIa.js.map