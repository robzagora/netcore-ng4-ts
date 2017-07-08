import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppRoutes, AppRoute } from './../../modules/app-routing.module';

export enum RoutingState {
    Ongoing,
    Finished
}

@Injectable()
export class NavService {

    // Observable item source
    private stateSource = new BehaviorSubject<RoutingState>(RoutingState.Ongoing);

    // Observable item stream
    stateItem = this.stateSource.asObservable();

    // service command
    notifyRoutingState(state: RoutingState) {
        this.stateSource.next(state);
    }

    getUserRoutableRoutes(): string[] {
        return AppRoutes
            .filter(route => route.isUserRoutable())
            .map(route => route.getPath());
    }
}