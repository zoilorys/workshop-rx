import { BehaviorSubject } from 'rxjs';
import { Filter } from 'models/Filter';

const globalFilter$ = new BehaviorSubject<Filter>({ startDate: null, endDate: null });

export default globalFilter$;
