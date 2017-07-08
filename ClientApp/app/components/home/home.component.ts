import { Component, Injectable } from '@angular/core';

import { NavService, RoutingState } from '../../core/nav/nav.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    
    constructor(private test: NavService)
    {
        
    }

    ngAfterViewInit() { 
        
    }

    ngOnDestroy() {
       
    }
}