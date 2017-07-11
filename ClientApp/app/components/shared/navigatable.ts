import { ProgressService, ProgressState } from './../../services/progress.service';
import { Subject } from "rxjs/Subject";

export abstract class Navigatable {

    // Very important to define a Subject in the base class for use of any components implementing this base class
    // This is in the case that there are http services 
    // which may require canellation should our component get destroyed
    protected componentDestroying: Subject<boolean>; 
    protected progressService: ProgressService;
 
    constructor(progressService: ProgressService) {
        this.progressService = progressService;
        this.componentDestroying = new Subject();
    }

    protected workOngoing() {
        this.progressService.setProgressState(ProgressState.Ongoing);
    }

    protected workFinished() {
        this.progressService.setProgressState(ProgressState.Finished);
    }
    
    protected finaliseComponent() {
        this.componentDestroying.next();
        this.componentDestroying.complete();
    }
}