
import { Component } from '@angular/core';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../../services/nav.service';

import { easeIn } from './../../library/visualisation/animations';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    animations: [easeIn]
})
export class AboutComponent extends Navigatable {

    private test: string;

    constructor(progressService: ProgressService) {
        super(progressService);

        this.test = 'ABout Test';
    }

    ngOnInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.workOngoing();
    }
}