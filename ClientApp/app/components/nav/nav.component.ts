import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NavService, RoutingState } from './nav.service';

import { easeInOut } from './../shared/animations';

@Component({
    selector: 'app-nav', 
    styleUrls: ['./nav.component.css'],
    templateUrl: './nav.component.html',
    animations: [easeInOut]
}) 
export class NavComponent { 

    state: string = 'inactive';

    private subscription: Subscription;
    private links: string[] = [];

    constructor(private navService: NavService) {
        this.links = this.navService.getUserRoutableRoutes();
    }

    ngOnInit() {
        this.subscription = this.navService.stateItem.subscribe(item => {

            this.state = (item == RoutingState.Ongoing ? 'active' : 'inactive');
        });
    }
    
    capitalizeLink(link: string) {
        return link.toUpperCase();
    }

    toggleProgressBar() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }
}