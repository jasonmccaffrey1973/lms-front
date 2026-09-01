import { useState } from "react";
import Select from "../../sharedComponents/select/Select";

const TestPage = () => {
  const options = [
    { value: "arial", label: <span style={{ fontFamily: "Arial" }}>Arial</span> },
    { value: "verdana", label: <span style={{ fontFamily: "Verdana" }}>Verdana</span> },
    { value: "georgia", label: <span style={{ fontFamily: "Georgia" }}>Georgia</span> },
    { value: "timesNewRoman", label: <span style={{ fontFamily: "Times New Roman" }}>Times New Roman</span> },
  ];

  const [selectValue, setSelectValue] = useState(options[0].value);

  // Receives the selected string value directly
  const handleSelectChange = (val: string) => {
    setSelectValue(val);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <Select
        options={options}
        value={selectValue}
        onChange={handleSelectChange}
      />
    </main>
  );
};

export default TestPage;