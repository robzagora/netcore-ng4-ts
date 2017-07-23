import { Component } from '@angular/core';

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';

import * as $ from "jquery";

@Component({
    selector: 'not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.min.css']
})
export class NotFoundComponent extends Navigatable {
    constructor(progressService: ProgressService) {
        super(progressService);

        // app-nav
        let height = $('#app-nav').height();

    }

    ngOnInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.finaliseComponent();

        this.workOngoing();
    }
}