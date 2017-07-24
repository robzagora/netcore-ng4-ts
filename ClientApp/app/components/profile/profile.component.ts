
import { Component } from '@angular/core';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';

import { easeIn } from './../../library/visualisation/animations';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css.min'],
    animations: [easeIn]
})
export class ProfileComponent extends Navigatable {

    constructor(progressService: ProgressService) {
        super(progressService); 
    }

    ngOnInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.workOngoing();
    }
}