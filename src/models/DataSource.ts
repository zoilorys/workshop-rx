import { Observable, Subject } from 'rxjs';
import { Filter } from 'models/Filter';

export interface DataSource {
  id: number;
  name: string;
  type: string;
  input$: Subject<Filter>;
  output$: Observable<any>;
}
