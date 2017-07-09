import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum ProgressState {
    Ongoing,
    Finished
}

@Injectable()
export class ProgressService {

    // Observable item source
    private stateSource = new BehaviorSubject<ProgressState>(ProgressState.Ongoing);

    // Observable item stream
    stateObservable = this.stateSource.asObservable();

    // service command
    setProgressState(state: ProgressState) {
        this.stateSource.next(state);
    }
}