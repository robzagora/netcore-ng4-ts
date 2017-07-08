
import { Component } from '@angular/core';
import { Navigatable } from './../shared/navigatable';
import { NavService, RoutingState } from '../../core/nav/nav.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent extends Navigatable {

    private test: string;

    constructor(navService: NavService) {

        super(navService);

        this.test = 'ABout Test';
    }

    ngAfterViewInit() {
        this.routingFinished();
    }

    ngOnDestroy() {
        this.routingOngoing();
    }
}