// Some types that are used in many places will be placed here.

/**
 * A request with a verified JWT. The body.user.id field is automatically generated by the JWT verifier.
 */
export interface VerifiedRequest extends Request {
	body: {
		user: {
			id: string
		}
	}
}

export interface Store {
	account: {
		email: string,
		verified: boolean
	},
	user: {
		firstName: string,
		lastName: string,
		birthday: Date
	},
	sessionJWT: string
}