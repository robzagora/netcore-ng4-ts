
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

import { Subscription } from 'rxjs/Subscription';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';

import { easeIn } from './../../library/visualisation/animations';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    animations: [easeIn]
})
export class AboutComponent extends Navigatable {

    private connection: SignalRConnection;
    private test: string;

    private message: string = '';

    private messageSubscription: Subscription;
    private userJoinedSubscription: Subscription;

    private chatMessages: string[] = [];

    constructor(progressService: ProgressService, private activatedRoute: ActivatedRoute) {
        super(progressService);

        this.test = 'ABout Test';
    }

    ngOnInit() {
        this.connection = this.activatedRoute.snapshot.data['connection'];

        this.connection.invoke('Join', 'test');

        this.userJoinedSubscription = this.connection.listenFor<string>('UserJoined').subscribe((newUserMessage) => {
            this.chatMessages.push(newUserMessage);
        });

        this.messageSubscription = this.connection.listenFor<string>('NewMessage').subscribe((chatMessage) => {

            if (chatMessage != null)
            {
                this.chatMessages.push(chatMessage);
            }
        });


        this.workFinished();
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
        this.connection.stop();

        this.workOngoing();
    }

    sendMessage() {
        // invoke a server side method, with parameters
        this.connection.invoke('SendMessage', 'test', this.message);

        this.message = '';
    }
}