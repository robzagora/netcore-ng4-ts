import { NavService, RoutingState } from './../nav/nav.service';

export abstract class Navigatable {

    protected navService: NavService;
 
    constructor(navService: NavService) {
        this.navService = navService;
    }

    protected routingFinished() {
        this.navService.notifyRoutingState(RoutingState.Finished);
    }

    protected routingOngoing() {
        this.navService.notifyRoutingState(RoutingState.Ongoing);
    }
}