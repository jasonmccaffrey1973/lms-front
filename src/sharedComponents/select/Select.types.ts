import type { ReactNode } from "react";

export interface Option {
  value: string;
  label: ReactNode;
  searchText?: string; // Optional override for filtering JSX options
  style?: React.CSSProperties; // Optional inline styles for the option
}

export interface SelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
}