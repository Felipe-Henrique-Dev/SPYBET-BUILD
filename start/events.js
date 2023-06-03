"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Event"));
const PasswordResetRequested_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/PasswordResetRequested"));
const VerifyEmail_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/VerifyEmail"));
const PasswordReset_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/PasswordReset"));
Event_1.default.on('userRegistered', async (user) => {
    await new VerifyEmail_1.default(user).send();
});
Event_1.default.on('passwordResetRequested', async ({ user, token }) => {
    await new PasswordResetRequested_1.default(user, token).send();
});
Event_1.default.on('passwordReset', async (user) => {
    await new PasswordReset_1.default(user).send();
});
//# sourceMappingURL=events.js.map