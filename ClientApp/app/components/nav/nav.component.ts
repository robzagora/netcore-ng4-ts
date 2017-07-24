import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { LoginDialogComponent } from './../login/login-dialog.component';
import { AppRoute } from './../../library/routing/app.route';
import { ProgressService, ProgressState } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';
import { AuthService } from './../../services/auth.service';

import { easeInOutWithState } from './../../library/visualisation/animations';

@Component({
    selector: 'app-nav', 
    styleUrls: ['./nav.component.css'],
    templateUrl: './nav.component.html',
    animations: [easeInOutWithState]
}) 
export class NavComponent { 

    private state: string = 'inactive';
    private loggedIn: boolean = false;

    private progressSubscription: Subscription;
    private logginSubscription: Subscription;

    private routes: AppRoute[] = [];

    constructor(private navService: NavService, private progressService: ProgressService, private authService: AuthService, public dialog: MdDialog) {
        this.routes = this.navService.getAppRoutes();
    }

    ngOnInit() {
        this.progressSubscription = this.progressService.stateObservable.subscribe(item => {
            this.state = (item == ProgressState.Ongoing ? 'active' : 'inactive');
        });

        this.logginSubscription = this.authService.loggedInObservable.subscribe(login => {
            this.loggedIn = login;
        })
    }
    
    capitalizeLink(link: string) {
        return link.toUpperCase().trim();
    }

    toggleProgressBar() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    openLoginDialog() {
        this.dialog.open(LoginDialogComponent);
    }

    logout() {
        this.authService.logout();
    }
}