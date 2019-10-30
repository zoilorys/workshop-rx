import React, { createContext } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormData, FormUpdate } from 'hooks/useFormData';

type FormContextValue = {
  data$: BehaviorSubject<FormData>;
  update$: Subject<FormUpdate>;
};

type InputProps = FormContextValue & {
  children: any;
};

export const FormContext = createContext(undefined as any);

const FormContextProvider = ({ data$, update$, children }: InputProps) => {
  return (
    <FormContext.Provider value={{ data$, update$ } as FormContextValue}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
