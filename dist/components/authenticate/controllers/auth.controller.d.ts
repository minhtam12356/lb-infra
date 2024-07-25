import { Getter } from '@loopback/core';
import { IdType } from '../../../common';
import { ChangePasswordRequest, IAuthenticateRestOptions, IAuthService, SignInRequest, SignUpRequest } from '../types';
export declare const defineAuthController: <SI_RQ extends SignInRequest = SignInRequest, SU_RQ extends SignUpRequest = SignUpRequest, CP_RQ extends ChangePasswordRequest = ChangePasswordRequest>(opts: IAuthenticateRestOptions) => {
    new (authService: IAuthService, getCurrentUser: Getter<{
        userId: IdType;
    }>): {
        service: IAuthService;
        getCurrentUser: Getter<{
            userId: IdType;
        }>;
        whoami(): Promise<{
            userId: IdType;
        }>;
        signIn(payload: SI_RQ): Promise<import("../../../common").AnyObject>;
        signUp(payload: SU_RQ): Promise<import("../../../common").AnyObject>;
        changePassword(payload: CP_RQ): Promise<unknown>;
        logger: import("../../..").ApplicationLogger;
        defaultLimit: number;
    };
};