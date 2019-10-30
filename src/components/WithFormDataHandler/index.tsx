import { useCallback, useContext, useEffect, useState } from 'react';

import get from 'lodash.get';

import { FormData } from 'hooks/useFormData';
import { FormContext } from 'components/FormContextProvider';

type InputProps = {
  name: string;
  initialValue?: any;
  children: (value: any, handler: Function) => any;
};

const WithFormDataHandler = ({ name, initialValue = undefined, children }: InputProps) => {
  const { data$, update$ } = useContext(FormContext);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const sub = data$.subscribe((data: FormData) => setValue(get(data, name)));
    return () => sub.unsubscribe();
  }, [data$]);

  const handler = useCallback(val => update$.next([name, val]), [update$, name]);

  return children(value, handler);
};

export default WithFormDataHandler;
