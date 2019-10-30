import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

function useDataSource<T>(stream$: BehaviorSubject<T>) {
  const [value, setValue] = useState<T>(stream$.getValue());

  useEffect(() => stream$.subscribe(setValue).unsubscribe, [stream$]);

  return value;
}

export default useDataSource;
