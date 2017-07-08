import { Component, Injector } from '@angular/core';

import { Navigatable } from './../shared/navigatable';
import { NavService, RoutingState } from './../nav/nav.service';
import { NewsService, News } from './../../services/news.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent extends Navigatable {

    private newsServices: NewsService;

    news: News[] = [];

    constructor(injector: Injector) {
        super(injector.get(NavService));

        this.newsServices = injector.get(NewsService);
    }

    ngAfterViewInit() {
        this.newsServices
            .getNews()
            .subscribe(news =>
            {
                this.news = news;

                this.routingFinished();
            });
    }

    ngOnDestroy() {
        this.news = [];

        this.routingOngoing();
    }
}