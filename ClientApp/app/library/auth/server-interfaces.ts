export enum AuthState {
    Success = 0,
    Failed = 1,
    Forbidden = 2
}

export interface AuthResponse {
    state: AuthState,
    data: AuthData
}

export interface AuthData {
    requestTimestamp: Date,
    expirationTimespan: Date,
    tokenType: string,
    accessToken: string
}