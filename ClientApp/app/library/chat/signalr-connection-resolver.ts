import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignalR, SignalRConnection } from 'ng2-signalr';

@Injectable()
export class SignalrConnectionResolver implements Resolve<SignalRConnection> {

    constructor(private signalR: SignalR) {
    }

    resolve() {
        console.log('ConnectionResolver. Resolving...');
        return this.signalR.connect();
    }
}