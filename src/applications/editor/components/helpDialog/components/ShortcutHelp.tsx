import HelpSearch from "./HelpSearch";

const ShortcutHelp = () => {
  return (
    <>
        <div className="help-section-header">
            <h3>Editor Shortcuts</h3>
            <HelpSearch />
        </div>
        <div className="help-section-body"></div>
        <div className="help-section-footer"></div>
    </>
  );
};

export default ShortcutHelp;