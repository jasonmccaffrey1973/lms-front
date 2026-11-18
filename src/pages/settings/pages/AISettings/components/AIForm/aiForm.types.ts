import type { ReactNode, FormEvent } from "react";

type aiFormSubmitEvent = FormEvent<HTMLFormElement>;

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'url' 
  | 'tel' 
  | 'number' 
  | 'search' 
  | 'date' 
  | 'time' 
  | 'select';

export interface FormFieldConfig {
  name: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: Array<{ value: string; label: ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
}

export interface FormConfig {
  fields: FormFieldConfig[];
}

export interface FormElementProps {
  field: FormFieldConfig;
}

export type { aiFormSubmitEvent };
