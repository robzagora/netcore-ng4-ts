
import { Component } from '@angular/core';
import { Navigatable } from './../shared/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../nav/nav.service';

import { easeInOutVoid } from './../shared/animations';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    animations: [easeInOutVoid]
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