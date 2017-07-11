import { Component } from '@angular/core';

import { Navigatable } from './../shared/navigatable';
import { NavService } from './../nav/nav.service';
import { ProgressService } from './../../services/progress.service';
import { SnackbarService } from './../../services/snackbar.service';
import { NewsService, News } from './../../services/news.service';

import { } from './../shared/animations';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    animations: []
})
export class HomeComponent extends Navigatable {

    news: News[] = [];

    constructor(progressService: ProgressService, private newsService: NewsService, private snackbarService: SnackbarService) {
        super(progressService);

    }

    getNews() {

        // we need to use the 'takeUntil' 
        // because when we perform navigation in the middle of a service call
        // the request will be cancelled by angular 

        // not using it will result in data being transferred back
        // even though the component has been destroyed
        // making our sites inefficient

        this.workOngoing();

        this.newsService
            .getNews()
            .takeUntil(this.componentDestroying)
            .subscribe(news => {
                this.news = news;

                this.workFinished();
                this.snackbarService.showSnackbar('news loaded');
            });
    }

    ngAfterViewInit() {
        this.getNews();
    }

    ngOnDestroy() {
        this.finaliseComponent();

        this.news = [];

        this.workOngoing();
    }
}