import { Router } from 'express';

import * as functions from './functions/account';
import { wrapTryCatch } from './misc/utils';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/verify', wrapTryCatch(functions.verify));
router.post('/info', wrapTryCatch(functions.info));
router.post('/refresh', wrapTryCatch(functions.refresh));

export default router;
