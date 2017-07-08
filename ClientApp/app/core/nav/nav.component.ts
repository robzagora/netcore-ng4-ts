import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NavService, RoutingState } from './nav.service';

@Component({
    selector: 'app-nav',
    styleUrls: ['./nav.component.css'],
    templateUrl: './nav.component.html'
}) 
export class NavComponent { 

    private subscription: Subscription;
    private links: string[] = [];
    private workInProgress: boolean;

    constructor(private navService: NavService) {
        this.links = this.navService.getUserRoutableRoutes();
        this.workInProgress = false;
    }

    ngOnInit() {
        this.subscription = this.navService.stateItem.subscribe(item => {
            this.workInProgress = item == RoutingState.Ongoing;
        });
    }
    
    capitalizeLink(link: string) {
        return link.toUpperCase();
    }
}