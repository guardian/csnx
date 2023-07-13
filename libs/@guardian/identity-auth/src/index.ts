import type {
	IdentityAuthOptions,
	IdentityAuthState,
	IdentityAuthStateAuthenticated,
	IdentityAuthStateNotAuthenticated,
} from './@types/OAuth';
import type {
	AccessToken,
	AccessTokenClaims,
	CustomClaims,
	IDToken,
	IDTokenClaims,
	Tokens,
} from './@types/Token';
import { IdentityAuth } from './identityAuth';

export { IdentityAuth };
export type {
	IdentityAuthOptions,
	IdentityAuthState,
	IdentityAuthStateAuthenticated,
	IdentityAuthStateNotAuthenticated,
};
export type {
	AccessToken,
	AccessTokenClaims,
	CustomClaims,
	IDToken,
	IDTokenClaims,
	Tokens,
};
