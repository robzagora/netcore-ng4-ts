
import { Component } from '@angular/core';
import { Navigatable } from './../shared/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../nav/nav.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent extends Navigatable {

    private test: string;

    constructor(progressService: ProgressService) {
        super(progressService);

        this.test = 'ABout Test';
    }

    ngAfterViewInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.workOngoing();
    }
}