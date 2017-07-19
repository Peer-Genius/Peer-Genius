"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions = require("./functions/account");
const utils_1 = require("./misc/utils");
const router = express_1.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!
router.post('/verify', utils_1.wrapTryCatch(functions.verify));
router.post('/info', utils_1.wrapTryCatch(functions.info));
router.post('/refresh', utils_1.wrapTryCatch(functions.refresh));
exports.default = router;
//# sourceMappingURL=account.js.map