import { useMemo, useState, useEffect } from "react";
import Dialog from "../../../../sharedComponents/dialog/Dialog";
import Button from "../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../sharedComponents/SVG/SVGIcon";
import Render from "../../../../sharedComponents/Render";
import friendlyDateTime from "../../../../helperFunctions/formatDateTime";
import { StyledTrackChangesDialog } from "./TrackChangesDialog.styles";
import type { TrackChangesDialogProps, TrackedChangeItem } from "./TrackChangesDialog.types";

const TrackChangesDialog = ({
  editor,
  dialogRef,
  controls,
  currentUser = { name: "Logged-in User" },
}: TrackChangesDialogProps) => {
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (controls.isDialogOpen) {
      (async () => {
        setRevision((prev) => prev + 1);
      })();
    }
  }, [controls.isDialogOpen]);

  // Scan document for all trackInsertion and trackDeletion marks
  const trackedChanges = useMemo<TrackedChangeItem[]>(() => {
    if (!editor) return [];

    // Force recalculation when revision changes
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    revision;

    const items: TrackedChangeItem[] = [];
    const doc = editor.state.doc;

    doc.descendants((node, pos) => {
      if (node.isText && node.text) {
        node.marks.forEach((mark) => {
          if (mark.type.name === "trackInsertion" || mark.type.name === "trackDeletion") {
            const type = mark.type.name === "trackInsertion" ? "insertion" : "deletion";
            const attrs = mark.attrs;
            items.push({
              id: attrs.id || `${type}-${pos}`,
              type,
              author: attrs.author || "Unknown",
              createdAt: attrs.createdAt || new Date().toISOString(),
              text: node.text ?? "",
              from: pos,
              to: pos + node.nodeSize,
            });
          }
        });
      }
    });

    return items;
  }, [editor, revision]);

  const handleSelectChange = (change: TrackedChangeItem) => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .setTextSelection({ from: change.from, to: change.to })
      .scrollIntoView()
      .run();
  };

  const handleAcceptChange = (change: TrackedChangeItem) => {
    if (!editor) return;

    if (change.type === "insertion") {
      // Keep content, remove insertion mark
      editor
        .chain()
        .focus()
        .setTextSelection({ from: change.from, to: change.to })
        .unsetMark("trackInsertion")
        .run();
    } else {
      // Deletion accepted -> remove deleted text
      editor
        .chain()
        .focus()
        .deleteRange({ from: change.from, to: change.to })
        .run();
    }

    setRevision((prev) => prev + 1);
  };

  const handleRejectChange = (change: TrackedChangeItem) => {
    if (!editor) return;

    if (change.type === "insertion") {
      // Insertion rejected -> remove inserted text
      editor
        .chain()
        .focus()
        .deleteRange({ from: change.from, to: change.to })
        .run();
    } else {
      // Deletion rejected -> keep text, remove deletion mark
      editor
        .chain()
        .focus()
        .setTextSelection({ from: change.from, to: change.to })
        .unsetMark("trackDeletion")
        .run();
    }

    setRevision((prev) => prev + 1);
  };

  const handleAcceptAll = () => {
    [...trackedChanges].forEach((change) => handleAcceptChange(change));
  };

  const handleRejectAll = () => {
    [...trackedChanges].forEach((change) => handleRejectChange(change));
  };

  const footerButtons = [
    {
      label: "Close",
      onClick: controls.closeDialog,
      color: "secondary",
    },
  ];

  return (
    <Dialog
      title="Track Changes Review"
      dialogRef={dialogRef}
      controls={controls}
      footerButtons={footerButtons}
    >
      <StyledTrackChangesDialog>
        {/* Controls Header */}
        <div className="controls-header">
          <div className="user-info">
            <span className="user-label">Logged-in Reviewer</span>
            <span className="user-name">{currentUser.name}</span>
          </div>
          <div className="bulk-actions">
            <Button
              color="success"
              type="button"
              onClick={handleAcceptAll}
              disabled={trackedChanges.length === 0}
            >
              Accept All
            </Button>
            <Button
              color="danger"
              type="button"
              onClick={handleRejectAll}
              disabled={trackedChanges.length === 0}
            >
              Reject All
            </Button>
          </div>
        </div>

        {/* Changes List Section */}
        <div className="changes-list-section">
          <div className="section-header">
            <h3 style={{ margin: 0, fontSize: "1rem" }}>Tracked Changes</h3>
            <span className="count-badge">
              {trackedChanges.length} {trackedChanges.length === 1 ? "change" : "changes"}
            </span>
          </div>

          <Render if={trackedChanges.length === 0}>
            <div className="no-changes">
              <SVGIcon icon="checkMark" />
              <div>No pending tracked changes in this document.</div>
            </div>
          </Render>

          <Render if={trackedChanges.length > 0}>
            {trackedChanges.map((change) => (
              <div
                key={change.id}
                className={`change-card ${change.type}`}
                onClick={() => handleSelectChange(change)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectChange(change);
                  }
                }}
              >
                <div className="change-header">
                  <span className="change-author">{change.author}</span>
                  <span className={`change-type ${change.type}`}>{change.type}</span>
                </div>

                <div className={`change-content ${change.type}`}>
                  &ldquo;{change.text}&rdquo;
                </div>

                <div className="change-footer">
                  <span className="change-time">{friendlyDateTime(change.createdAt)}</span>
                  <div className="change-actions">
                    <Button
                      color="success"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptChange(change);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRejectChange(change);
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Render>
        </div>
      </StyledTrackChangesDialog>
    </Dialog>
  );
};

export default TrackChangesDialog;

