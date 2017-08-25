
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';
import { ProfileService } from './../../services/profile.service';

import { Profile } from './../../library/profile/interfaces';

import { easeIn } from './../../library/visualisation/animations';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.min.css'],
    animations: [easeIn]
})
export class ProfileComponent extends Navigatable {

    private profile: Profile;

    constructor(private profileService: ProfileService, progressService: ProgressService) {
        super(progressService); 
    }

    ngOnInit() {
        this.profileService
            .getProfile()
            .catch(this.handleError.bind(this))
            .map((response: Response) => {

                console.log(response);
            })
            .subscribe();

        this.workFinished();
    }

    ngOnDestroy() {
        this.finaliseComponent();

        this.workOngoing();
    }

    private handleError(error: Response) {

        console.log(error);

        return Observable.throw(error.text);
    }
}