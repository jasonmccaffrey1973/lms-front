import { useMemo, useState, useEffect } from "react";
import Dialog from "../../../../sharedComponents/dialog/Dialog";
import Button from "../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../sharedComponents/SVG/SVGIcon";
import Render from "../../../../sharedComponents/Render";
import { analyzeText, type SpellingGrammarIssue } from "../../utils/spellingGrammar";
import { StyledSpellingGrammarDialog } from "./SpellingGrammarDialog.styles";
import type { SpellingGrammarDialogProps } from "./SpellingGrammarDialog.types";

const SpellingGrammarDialog = ({
  editor,
  dialogRef,
  controls,
}: SpellingGrammarDialogProps) => {
  const [ignoredIssueIds, setIgnoredIssueIds] = useState<string[]>([]);
  const [analysisRevision, setAnalysisRevision] = useState(0);

  // Trigger analysis when dialog is opened
  useEffect(() => {
    if (controls.isDialogOpen) {
      (async () => {
        setIgnoredIssueIds([]);
        setAnalysisRevision((prev) => prev + 1);
      })();
    }
  }, [controls.isDialogOpen]);

  const docText = editor?.state.doc.textContent ?? "";

  const analysis = useMemo(() => {
    // Re-run analysis on text content change or dialog re-open
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    analysisRevision;
    return analyzeText(docText);
  }, [docText, analysisRevision]);

  const activeIssues = useMemo(() => {
    return analysis.issues.filter((issue) => !ignoredIssueIds.includes(issue.id));
  }, [analysis.issues, ignoredIssueIds]);

  const handleIgnore = (issueId: string) => {
    setIgnoredIssueIds((prev) => [...prev, issueId]);
  };

  const handleSelectIssue = (issue: SpellingGrammarIssue) => {
    if (!editor) return;

    // Locate the text node and select/scroll to it
    const content = editor.getText();
    const index = content.indexOf(issue.originalText);

    if (index !== -1) {
      const from = index + 1;
      const to = from + issue.originalText.length;
      editor.chain().focus().setTextSelection({ from, to }).scrollIntoView().run();
    }
  };

  const handleApplySuggestion = (issue: SpellingGrammarIssue, suggestion: string) => {
    if (!editor) return;

    // Search and replace original text instance in document
    const content = editor.getText();
    const index = content.indexOf(issue.originalText);

    if (index !== -1) {
      // Create transaction to replace
      const from = index + 1; // 1-indexed document positions
      const to = from + issue.originalText.length;
      editor.chain().focus().insertContentAt({ from, to }, suggestion).run();
    }

    setIgnoredIssueIds((prev) => [...prev, issue.id]);
    setAnalysisRevision((prev) => prev + 1);
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
      title="Spelling, Grammar & Readability"
      dialogRef={dialogRef}
      controls={controls}
      footerButtons={footerButtons}
    >
      <StyledSpellingGrammarDialog>
        {/* Metrics Section */}
        <div className="metrics-section">
          <div className="section-title">Readability Metrics (Flesch-Kincaid)</div>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="value">{analysis.metrics.words}</div>
              <div className="label">Words</div>
            </div>
            <div className="metric-card">
              <div className="value">{analysis.metrics.sentences}</div>
              <div className="label">Sentences</div>
            </div>
            <div className="metric-card">
              <div className="value">{analysis.metrics.syllables}</div>
              <div className="label">Syllables</div>
            </div>
            <div className="metric-card">
              <div className="value">{analysis.metrics.fleschKincaidGradeLevel}</div>
              <div className="label">Grade Level</div>
            </div>
          </div>
          <div className="readability-summary">
            <span>
              Reading Ease:{" "}
              <span className="ease-score">{analysis.metrics.fleschReadingEase} / 100</span>
            </span>
            <span className="ease-desc">{analysis.metrics.readingEaseDescription}</span>
          </div>
        </div>

        {/* Issues Section */}
        <div className="issues-section">
          <div className="section-header">
            <h3 style={{ margin: 0, fontSize: "1rem" }}>Spelling & Grammar Issues</h3>
            <span className="count-badge">
              {activeIssues.length} {activeIssues.length === 1 ? "issue" : "issues"}
            </span>
          </div>

          <Render if={activeIssues.length === 0}>
            <div className="no-issues">
              <SVGIcon icon="checkMark" />
              <div>No spelling or grammar issues found!</div>
            </div>
          </Render>

          <Render if={activeIssues.length > 0}>
            {activeIssues.map((issue) => (
              <div
                key={issue.id}
                className={`issue-card ${issue.type}`}
                onClick={() => handleSelectIssue(issue)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectIssue(issue);
                  }
                }}
              >
                <div className="issue-header">
                  <span className="issue-title">{issue.message}</span>
                  <span className={`issue-type ${issue.type}`}>{issue.type}</span>
                </div>

                <Render if={issue.suggestions.length > 0}>
                  <div style={{ fontSize: "0.8rem", color: "var(--editor-text-muted, #666)" }}>
                    Suggestions:
                  </div>
                  <div className="suggestions-list">
                    {issue.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplySuggestion(issue, suggestion)}
                      >
                        Change to &ldquo;{suggestion}&rdquo;
                      </button>
                    ))}
                  </div>
                </Render>

                <div className="issue-actions">
                  <Button
                    color="transparent"
                    type="button"
                    onClick={() => handleIgnore(issue.id)}
                  >
                    Ignore
                  </Button>
                </div>
              </div>
            ))}
          </Render>
        </div>
      </StyledSpellingGrammarDialog>
    </Dialog>
  );
};

export default SpellingGrammarDialog;
