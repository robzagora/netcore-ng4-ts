import { Component } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AppRoute } from './../../library/routing/app.route';
import { ProgressService, ProgressState } from './../../services/progress.service';
import { NavService } from './nav.service';

import { easeInOutWithState } from './../shared/animations';

@Component({
    selector: 'app-nav', 
    styleUrls: ['./nav.component.css'],
    templateUrl: './nav.component.html',
    animations: [easeInOutWithState]
}) 
export class NavComponent { 

    private state: string = 'inactive';
    private subscription: Subscription;
    private routes: AppRoute[] = [];

    constructor(private navService: NavService, private progressService: ProgressService) {
        this.routes = this.navService.getAppRoutes();
    }

    ngOnInit() {
        this.subscription = this.progressService.stateObservable.subscribe(item => {
            this.state = (item == ProgressState.Ongoing ? 'active' : 'inactive');
        });
    }
    
    capitalizeLink(link: string) {
        return link.toUpperCase();
    }

    toggleProgressBar() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    login() {
        console.log(this.login.toString() + ' - login');
    }
}