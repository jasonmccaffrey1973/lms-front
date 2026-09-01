import { useState } from "react";

const useButtonDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggleDropDown };
};

export default useButtonDropDown;