import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';

import type { SceneFormValues } from '../types';

type UseSceneFormOptions = {
  handleSubmit: (formData: FormData) => void;
};

export const useSceneForm = ({ handleSubmit }: UseSceneFormOptions) => {
  const [values, setValues] = useState<SceneFormValues>({
    name: '',
    description: '',
  });

  const updateField = useCallback((field: keyof SceneFormValues, nextValue: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: nextValue,
    }));
  }, []);

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('description', values.description);

    handleSubmit(formData);
  }, [handleSubmit, values.description, values.name]);

  return {
    values,
    updateField,
    onSubmit,
  };
};
