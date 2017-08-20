import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { SignalRConnection, BroadcastEventListener } from 'ng2-signalr';

import { AuthService } from './../../services/auth.service';
import { Message } from './../../library/chat/interfaces';
import { ChatMessage, ChatMessageType } from './../../library/chat/server-interfaces';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.min.css']
})
export class ChatComponent
{
    private static Join: string = "Join";
    private static Leave: string = "Leave";
    private static SendMessage: string = "SendMessage";
    private static NewChatMessage: string = "NewChatMessage";

    private connection: SignalRConnection;

    private message: string = '';

    private newChatMessageSubscription: Subscription;

    private chatMessages: Message[] = [];

    constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit() {
        this.connection = this.activatedRoute.snapshot.data['connection'];

        this.connection.invoke(ChatComponent.Join, this.authService.getLoggedInUser());

        this.newChatMessageSubscription = this.connection.listenFor<ChatMessage>(ChatComponent.NewChatMessage).subscribe(incoming => {
            if (incoming.type == ChatMessageType.UserJoined)
            {
                this.chatMessages.push({ user: incoming.username, value: 'Joined the room.' });
            }
            else if (incoming.type == ChatMessageType.UserLeft)
            {
                this.chatMessages.push({ user: incoming.username, value: 'Left the room.' });
            }
            else if (incoming.type == ChatMessageType.UserNewMessage)
            {
                this.chatMessages.push({ user: incoming.username, value: incoming.data });
            }
        });
    }

    ngOnDestroy() {

        try
        {
            this.connection.invoke(ChatComponent.Leave, this.authService.getLoggedInUser());

            this.newChatMessageSubscription.unsubscribe();
            this.connection.stop();
        }
        catch (error)
        {
        }
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