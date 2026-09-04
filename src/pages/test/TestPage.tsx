import ButtonDropDown from "../../sharedComponents/buttonDropDown/ButtonDropDown";
import InsertTable from "../../sharedComponents/insertTable/InsertTable";
const TestPage = () => {
  

  return (

    <ButtonDropDown label="Text Color" icon="textcolor" value="#ff0000" isActive={true} onPrimaryAction={(val) => console.log(val)}>
      <InsertTable rows={3} columns={3} onInsert={(rows, columns) => console.log(`Inserted table with ${rows} rows and ${columns} columns`)} />
    </ButtonDropDown>

  );
};

export default TestPage;