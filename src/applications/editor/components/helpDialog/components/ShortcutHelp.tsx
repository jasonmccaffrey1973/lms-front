import HelpSearch from "./HelpSearch";

const ShortcutHelp = () => {
  return (
    <>
        <div className="help-section-header">
            <h3>Editor Shortcuts</h3>
            <HelpSearch />
        </div>
        <div className="help-section-body">
            <table>
                <caption>Keyboard shortcuts</caption>
                <tbody>
                    <tr>
                        <th scope="row">Save current lesson</th>
                        <td><kbd>Ctrl</kbd> + <kbd>S</kbd> (Windows/Linux) or <kbd>⌘</kbd> + <kbd>S</kbd> (Mac)</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="help-section-footer"></div>
    </>
  );
};

export default ShortcutHelp;
