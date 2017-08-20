import { omit } from 'lodash';
import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';

import { Request, Response } from 'express';
import { VerifiedRequest } from '../../types';

export const getMethods = async (request: Request, response: Response) => {
	response.status(httpStatus.OK).json({
		methods: communicationMethods
	})
};

interface EditCommunicationRequest extends VerifiedRequest {
	body: {
		user: {
			id: string
		},
		whatsapp: string | null,
		hangouts: string | null,
		messenger: string | null,
		imessage: string | null,
		skype: string | null,
		viber: string | null,
		tango: string | null,
		aim: string | null,
		oovoo: string | null
	}
}

export const edit = async (request: EditCommunicationRequest, response: Response) => {
	let { user, ...communications } = request.body;
	
	let communication = await models.communication.find({
		where: {
			user: user.id
		}
	});
	
	await communication.update(omit(request.body, ['user']));
	await communication.save();
	
	response.status(httpStatus.OK).end();
};
