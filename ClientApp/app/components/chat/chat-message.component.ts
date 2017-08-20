import { Component, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Message } from './../../library/chat/interfaces';

@Component({
    selector: 'chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.min.css']
})
export class ChatMessageComponent {

    @Input()
    message: Message;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}