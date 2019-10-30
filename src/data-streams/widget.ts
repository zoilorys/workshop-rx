import { BehaviorSubject } from 'rxjs';
import { WidgetConfig } from 'models/WidgetConfig';

const widget$ = new BehaviorSubject<WidgetConfig[]>([]);

export default widget$;
