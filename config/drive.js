"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const config_1 = require("@adonisjs/core/build/config");
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
exports.default = (0, config_1.driveConfig)({
    disk: Env_1.default.get('DRIVE_DISK'),
    disks: {
        local: {
            driver: 'local',
            visibility: 'public',
            root: Application_1.default.tmpPath('uploads'),
            serveFiles: true,
            basePath: '/uploads',
        },
        s3: {
            driver: 's3',
            visibility: 'private',
            key: Env_1.default.get('AKIA4W26KO6OCWPOYGPU'),
            secret: Env_1.default.get('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'),
            region: Env_1.default.get('sa-east-1'),
            bucket: Env_1.default.get('spybet'),
            endpoint: Env_1.default.get('https://s3-sa-east-1.amazonaws.com'),
        },
    },
});
//# sourceMappingURL=drive.js.map