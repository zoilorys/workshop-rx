import { combineLatest, Subject, of } from 'rxjs';
import { Filter } from 'models/Filter';
import { switchMap } from 'rxjs/operators';
import { DataSource } from 'models/DataSource';

export const makeHttpJsonSource = (id: number, name: string, url: string): DataSource => {
  const url$ = of(url);
  const input$ = new Subject<Filter>();

  const output$ = combineLatest([input$, url$]).pipe(
    switchMap(([{ startDate, endDate }, url]: [Filter, string]) =>
      fetch(
        `${url}?${startDate ? `start=${encodeURIComponent(startDate.toISOString())}&` : ''}${
          endDate ? `start=${encodeURIComponent(endDate.toISOString())}&` : ''
        }`,
      ).then(r => r.json()),
    ),
  );

  return {
    id,
    name,
    type: 'http-json',
    input$,
    output$,
  };
};

