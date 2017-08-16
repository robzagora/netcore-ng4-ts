import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

import { AuthService } from './../../services/auth.service';
import { Message } from './../../library/chat/interfaces';
import { NewMessage } from './../../library/chat/server-interfaces';

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

    private chatMessages: Message[] = [];

    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        this.connection = this.activatedRoute.snapshot.data['connection'];

        this.connection.invoke(ChatComponent.Join, this.authService.getLoggedInUser());

        this.userJoinedSubscription = this.connection.listenFor<string>(ChatComponent.UserJoined).subscribe(data => {
            this.chatMessages.push({ user: data, value: 'Joined' });
        });

        this.messageSubscription = this.connection.listenFor<NewMessage>(ChatComponent.NewMessage).subscribe(message => {
            this.chatMessages.push({ user: message.Username, value: message.Message });
        });
    }

    ngOnDestroy() {
        this.messageSubscription.unsubscribe();
        this.connection.stop();
    }

    sendMessage() {
        
        if (this.message != null && this.message.length > 0) {
            this.chatMessages.push({ user: 'Me', value: this.message });
            // invoke a server side method, with parameters
            this.connection.invoke(ChatComponent.SendMessage, this.authService.getLoggedInUser(), this.message);

            this.message = '';
            
        }
    }
}