import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppRoutes, AppRoute } from './../../modules/app-routing.module';

@Injectable()
export class NavService {

    getUserRoutableRoutes(): string[] {
        return AppRoutes
            .filter(route => route.isUserRoutable())
            .map(route => route.getPath());
    }
}