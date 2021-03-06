import { Router } from 'express';

import * as functions from './functions/newbie';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.post('/review', wrapTryCatch(functions.review));

export default router;
