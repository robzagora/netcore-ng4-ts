import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { LoginDialogComponent } from './../login/login-dialog.component';
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

    constructor(private navService: NavService, private progressService: ProgressService, public dialog: MdDialog) {
        this.routes = this.navService.getAppRoutes();
    }

    ngOnInit() {
        this.subscription = this.progressService.stateObservable.subscribe(item => {
            this.state = (item == ProgressState.Ongoing ? 'active' : 'inactive');
        });
    }
    
    capitalizeLink(link: string) {
        return link.toUpperCase().trim();
    }

    toggleProgressBar() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    openLoginDialog() {

        let dialogRef = this.dialog.open(LoginDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            // handle auth result
        });
    }
}