import { useState, useMemo, useEffect, useRef, isValidElement } from "react";
import type { SelectProps } from "./Select.types";

/** --------------------------------------------------------------------------------
 * @param element The React element to check for a fontFamily style.
 * @description Type guard to safely extract style.fontFamily from JSX labels
 * @returns True if the element has a style with a fontFamily, false otherwise.
 ** -------------------------------------------------------------------------------- */
const hasFontFamilyStyle = (
  element: unknown
): element is React.ReactElement<{ style?: { fontFamily?: string } }> => {
  return (
    isValidElement(element) &&
    typeof element.props === "object" &&
    element.props !== null &&
    "style" in element.props
  );
};

/** --------------------------------------------------------------------------------
 * @param node The React node to extract text from.
 * @description Extracts plain text from string nodes or JSX children
 *              (e.g. <span>Times New Roman</span>).
 * @returns The extracted text if available, otherwise an empty string.
 ** -------------------------------------------------------------------------------- */
const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (
    isValidElement(node) &&
    typeof node.props === "object" &&
    node.props !== null &&
    "children" in node.props
  ) {
    const children = (node.props as { children?: React.ReactNode }).children;
    if (typeof children === "string" || typeof children === "number") {
      return String(children);
    }
  }
  return "";
};

/** ================================================================================
 * @param options The array of options for the select component.
 * @param value The currently selected value.
 * @param onChange Callback function to handle selection changes.
 * @description Custom hook to manage the state and behavior of a select component.
 *              It handles opening/closing the dropdown, filtering options based on
 *              search input, keyboard navigation, and selection of options.
 * @returns An object containing state and handler functions for the select component.  
 ** ================================================================================ */
export const useSelect = ({
  options,
  value,
  onChange,
}: Pick<SelectProps, "options" | "value" | "onChange">) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [navigatedIndex, setNavigatedIndex] = useState<number | null>(null);

  const listboxRef = useRef<HTMLUListElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Extract human-readable string for input placeholder/display
  const selectedLabelText = useMemo(() => {
    if (!selectedOption) return "";

    // 1. Explicit searchText prop
    if (selectedOption.searchText) {
      return selectedOption.searchText;
    }

    // 2. Extract inner text from string or JSX node (<span ...>Times New Roman</span>)
    const extractedText = extractTextFromNode(selectedOption.label);
    if (extractedText) {
      return extractedText;
    }

    // 3. Fallback to option value
    return selectedOption.value;
  }, [selectedOption]);

  // Extract inline fontFamily if provided via JSX label
  const selectedFontFamily = useMemo(() => {
    if (!selectedOption) return undefined;

    if (hasFontFamilyStyle(selectedOption.label)) {
      return selectedOption.label.props.style?.fontFamily;
    }

    return undefined;
  }, [selectedOption]);

  // Filter options based on explicit searchText, string labels, or values
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const query = searchTerm.toLowerCase();

    return options.filter((opt) => {
      if (opt.searchText) {
        return opt.searchText.toLowerCase().includes(query);
      }
      const labelText = extractTextFromNode(opt.label);
      if (labelText) {
        return labelText.toLowerCase().includes(query);
      }
      return opt.value.toLowerCase().includes(query);
    });
  }, [options, searchTerm]);

  // Derive active index dynamically during render
  const defaultIndex = useMemo(() => {
    const selectedIdx = filteredOptions.findIndex((opt) => opt.value === value);
    return selectedIdx >= 0 ? selectedIdx : 0;
  }, [filteredOptions, value]);

  const activeIndex = selectOpen
    ? navigatedIndex !== null && navigatedIndex < filteredOptions.length
      ? navigatedIndex
      : defaultIndex
    : -1;

  // Auto-scroll active option into view during keyboard navigation
  useEffect(() => {
    if (selectOpen && listboxRef.current && activeIndex >= 0) {
      const activeEl = listboxRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex, selectOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setNavigatedIndex(0);
    if (!selectOpen) setSelectOpen(true);
  };

  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setSearchTerm("");
    setNavigatedIndex(null);
    setSelectOpen(false);
  };

  const openSelect = () => {
    setSelectOpen(true);
  };

  const handleClick = () => {
    if (!selectOpen) {
      setSelectOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSelectOpen(false);
      setSearchTerm("");
      setNavigatedIndex(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (!selectOpen) {
          setSelectOpen(true);
        } else {
          const nextIndex =
            activeIndex < filteredOptions.length - 1 ? activeIndex + 1 : 0;
          setNavigatedIndex(nextIndex);
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (!selectOpen) {
          setSelectOpen(true);
        } else {
          const prevIndex =
            activeIndex > 0 ? activeIndex - 1 : filteredOptions.length - 1;
          setNavigatedIndex(prevIndex);
        }
        break;
      }
      case "Enter": {
        e.preventDefault();
        if (selectOpen && activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleSelectOption(filteredOptions[activeIndex].value);
        } else if (!selectOpen) {
          setSelectOpen(true);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setSelectOpen(false);
        setSearchTerm("");
        setNavigatedIndex(null);
        break;
      }
      case "Home": {
        if (selectOpen) {
          e.preventDefault();
          setNavigatedIndex(0);
        }
        break;
      }
      case "End": {
        if (selectOpen) {
          e.preventDefault();
          setNavigatedIndex(filteredOptions.length - 1);
        }
        break;
      }
    }
  };

  return {
    selectOpen,
    openSelect,
    handleClick,
    handleBlur,
    handleKeyDown,
    filteredOptions,
    handleSearchChange,
    handleSelectOption,
    searchTerm,
    selectedOption,
    selectedLabelText,
    selectedFontFamily,
    activeIndex,
    setActiveIndex: setNavigatedIndex,
    listboxRef,
  };
};

export default useSelect;