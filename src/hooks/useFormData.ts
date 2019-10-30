import { useEffect, useState } from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import set from 'lodash.set';
import cloneDeep from 'lodash.clonedeep';

const ONCE: any[] = [];

export type FormData = {
  [index: string]: any;
};

export type FormUpdate = [string, any];

const useFormData = (
  initialState: FormData = {},
  validator: (value: unknown, index: number) => boolean = () => true,
): [BehaviorSubject<FormData>, Subject<FormUpdate>, Observable<boolean>] => {
  const [data$] = useState(new BehaviorSubject(initialState));
  const [update$] = useState(new Subject<FormUpdate>());
  const [validation$] = useState(data$.pipe(map(validator)));

  useEffect(() => {
    const sub = update$
      .pipe(
        withLatestFrom(data$),
        map(([[path, value], formData]) => set(cloneDeep(formData), path, value)),
      )
      .subscribe(v => data$.next(v));
    return () => sub.unsubscribe();
  }, ONCE);

  return [data$, update$, validation$];
};

export default useFormData;
