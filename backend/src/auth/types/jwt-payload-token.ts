import {JwtPayload} from './jwt-payload';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };