import { Component } from '@angular/core';
import { Navigatable } from './../shared/navigatable';
import { ProgressService } from './../../services/progress.service';
import { NavService } from './../nav/nav.service';

import { easeInOutVoid } from './../shared/animations';

@Component({
    selector: 'visualisation',
    templateUrl: './visualisation.component.html',
    styleUrls: ['./visualisation.component.min.css'],
    animations: [easeInOutVoid]
})
export class VisualisationComponent extends Navigatable {


    constructor(progressService: ProgressService) {
        super(progressService);
        
    }

    ngAfterViewInit() {
        this.workFinished();
    }

    ngOnDestroy() {
        this.workOngoing();
    }
}