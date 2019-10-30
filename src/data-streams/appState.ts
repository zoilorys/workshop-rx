import { BehaviorSubject } from 'rxjs';

const appState$ = new BehaviorSubject<string>('init');

export default appState$;
