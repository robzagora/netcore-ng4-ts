import { Component } from '@angular/core';

import { NavService } from './../nav/nav.service';
import { NewsService } from './../../services/news.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NavService, NewsService]
})
export class AppComponent {
    // investigate whether navigation events are better 
    // https://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular2/35568924#35568924
}
