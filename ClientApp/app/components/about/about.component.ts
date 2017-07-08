
import { Component, Injector } from '@angular/core';
import { Navigatable } from './../shared/navigatable';
import { NavService, RoutingState } from './../nav/nav.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent extends Navigatable {

    private test: string;

    constructor(injector: Injector) {
        super(injector.get(NavService));

        this.test = 'ABout Test';
    }

    ngAfterViewInit() {

        this.routingFinished();
    }

    ngOnDestroy() {
        this.routingOngoing();
    }
} 