export interface WindowRect {
    x: number,
    y: number,
    width: number,
    height: number
}

export interface Entry {
    level: Level,
    message: string,
    optTimestamp: Date,
    optType: string,
}

export enum Level {
    'OFF' = Infinity,
    'SEVERE' = 1000,
    'WARNING' = 900,
    'INFO' = 800,
    'DEBUG' = 700,
    'FINE' = 500,
    'FINER' = 400,
    'FINEST' = 300,
    'ALL' = 0,
}

export interface Cookie {
    name: string,
    value: string,
    path: string,
    domain: string,
    secure: boolean,
    httpOnly: boolean,
    expiry: Date | number,
    sameSite: 'Lax' | 'Strict' | 'None'
}

export interface Timeout {
    script: number,
    pageLoad: number,
    implicit: number
}