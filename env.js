"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
exports.default = Env_1.default.rules({
    HOST: Env_1.default.schema.string.optional({ format: 'host' }),
    PORT: Env_1.default.schema.number.optional(),
    APP_KEY: Env_1.default.schema.string(),
    APP_NAME: Env_1.default.schema.string(),
    CACHE_VIEWS: Env_1.default.schema.boolean(),
    SESSION_DRIVER: Env_1.default.schema.string(),
    DRIVE_DISK: Env_1.default.schema.enum(['local']),
    NODE_ENV: Env_1.default.schema.enum(['development', 'production', 'test']),
    MYSQL_HOST: Env_1.default.schema.string.optional({ format: 'host' }),
    MYSQL_PORT: Env_1.default.schema.number.optional(),
    MYSQL_USER: Env_1.default.schema.string.optional(),
    MYSQL_PASSWORD: Env_1.default.schema.string.optional(),
    MYSQL_DB_NAME: Env_1.default.schema.string.optional(),
    REDIS_CONNECTION: Env_1.default.schema.enum(['local']),
    REDIS_HOST: Env_1.default.schema.string({ format: 'host' }),
    REDIS_PORT: Env_1.default.schema.number(),
    REDIS_PASSWORD: Env_1.default.schema.string.optional(),
    GOOGLE_CLIENT_ID: Env_1.default.schema.string(),
    GOOGLE_CLIENT_SECRET: Env_1.default.schema.string(),
    FACEBOOK_CLIENT_ID: Env_1.default.schema.string(),
    FACEBOOK_CLIENT_SECRET: Env_1.default.schema.string(),
    DB_CONNECTION: Env_1.default.schema.string(),
    SMTP_HOST: Env_1.default.schema.string({ format: 'host' }),
    SMTP_PORT: Env_1.default.schema.number(),
    SMTP_USERNAME: Env_1.default.schema.string(),
    SMTP_PASSWORD: Env_1.default.schema.string(),
    S3_KEY: Env_1.default.schema.string(),
    S3_SECRET: Env_1.default.schema.string(),
    S3_BUCKET: Env_1.default.schema.string(),
    S3_REGION: Env_1.default.schema.string(),
    S3_ENDPOINT: Env_1.default.schema.string.optional(),
    RECAPTCHA_SITE_KEY: Env_1.default.schema.string(),
    RECAPTCHA_SECRET_KEY: Env_1.default.schema.string(),
});
//# sourceMappingURL=env.js.map