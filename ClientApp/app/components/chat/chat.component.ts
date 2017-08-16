import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.min.css']
})
export class ChatComponent
{
    private static Join: string = "Join";
    private static UserJoined: string = "UserJoined";
    private static NewMessage: string = "NewMessage";
    private static SendMessage: string = "SendMessage";

    private connection: SignalRConnection;

    private message: string = '';

    private messageSubscription: Subscription;
    private userJoinedSubscription: Subscription;

    private chatMessages: string[] = [];

    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        this.connection = this.activatedRoute.snapshot.data['connection'];

        this.connection.invoke(ChatComponent.Join, this.authService.getLoggedInUser());

        this.userJoinedSubscription = this.connection.listenFor<string>(ChatComponent.UserJoined).subscribe((newUserMessage) => {
            this.chatMessages.push(newUserMessage);
        });

        this.messageSubscription = this.connection.listenFor<string>(ChatComponent.NewMessage).subscribe((chatMessage) => {

            if (chatMessage != null) {
                this.chatMessages.push(chatMessage);
            }
        });
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
        this.connection.stop();
    }

    sendMessage() {

        if (this.message != null || this.message.length > 0) {
            this.chatMessages.push("Me: " + this.message);
            // invoke a server side method, with parameters
            this.connection.invoke(ChatComponent.SendMessage, this.authService.getLoggedInUser(), this.message);

            this.message = '';
        }
    }
}