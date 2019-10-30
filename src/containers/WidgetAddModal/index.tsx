import React, { useEffect, useState } from 'react';
import FormContextProvider from 'components/FormContextProvider';
import useFormData from 'hooks/useFormData';
import WithFormDataHandler from 'components/WithFormDataHandler';

import Input from 'antd/lib/input';

const WidgetAddModal = () => {
  const [valid, setValid] = useState(false);

  const [data$, update$, validation$] = useFormData(
    { name: 'Joe', email: 'text@example.com' },
    (formData: any) => {
      return !!(formData.name === 'john' && formData.email === 'john@example.com');
    },
  );

  useEffect(() => {
    const sub = data$.subscribe(d => console.log(d));
    return () => sub.unsubscribe();
  });

  useEffect(() => {
    const sub = validation$.subscribe(setValid);
    return () => sub.unsubscribe();
  }, [validation$]);

  return (
    <>
      <div>{String(valid)}</div>
      <FormContextProvider data$={data$} update$={update$}>
        <WithFormDataHandler name="name">
          {(value, onChange) => (
            <Input value={value} onChange={evt => onChange(evt.target.value)} />
          )}
        </WithFormDataHandler>
        <WithFormDataHandler name="email">
          {(value, onChange) => (
            <Input value={value} onChange={evt => onChange(evt.target.value)} />
          )}
        </WithFormDataHandler>
        <WithFormDataHandler name="phone">
          {(value, onChange) => (
            <Input value={value} onChange={evt => onChange(evt.target.value)} />
          )}
        </WithFormDataHandler>
        <WithFormDataHandler name="address">
          {(value, onChange) => (
            <Input value={value} onChange={evt => onChange(evt.target.value)} />
          )}
        </WithFormDataHandler>
      </FormContextProvider>
    </>
  );
};

export default WidgetAddModal;
