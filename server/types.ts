// Some types that are used in many places will be placed here.
import { Handler, NextFunction, Request, Response } from 'express';

/**
 * A request with a verified JWT. The body.user.id field is automatically generated by the JWT verifier.
 */
export interface VerifiedRequest extends Request {
	body: {
		user: {
			id: string;
		}
	};
}

export type AsyncHandler<RequestType extends Request> = (request: RequestType, response: Response, next: NextFunction) => Promise<any>;

export interface Store {
	account: {
		email: string;
		verified: boolean;
	};
	user: {
		firstName: string;
		lastName: string;
		birthday: Date;
	};
	communication: {
		[method: string]: string | null;
	};
	session: {
		jwt: string,
		expire: number
	};
}

export interface UserSocket extends SocketIO.Socket {
	user: string;
}
