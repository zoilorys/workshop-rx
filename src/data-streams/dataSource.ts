import { BehaviorSubject } from 'rxjs';
import { DataSource } from 'models/DataSource';

const dataSource$ = new BehaviorSubject<Map<string,DataSource>>(new Map());

export default dataSource$;
