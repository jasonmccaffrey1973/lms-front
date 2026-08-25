import { UndoSVG, RedoSVG, CopySVG, PasteSVG, BoldSVG, ItalicSVG, TextColorSVG, HighlightSVG, UnderlineSVG, StrikeThroughSVG } from "../../../../sharedComponents/buttons/SVG";

const getRibbonIcon = (iconName?: string) => {
  if (!iconName) {
    return null;
  }

  switch (iconName.toLowerCase()) {
    case "undosvg":
      return <UndoSVG />;
    case "redosvg":
      return <RedoSVG />;
    case "copysvg":
      return <CopySVG />;
    case "pastesvg":
      return <PasteSVG />;
    case "boldsvg":
      return <BoldSVG />;
    case "italicsvg":
      return <ItalicSVG />;
    case "textcolorsvg":
      return <TextColorSVG />;
    case "highlightsvg":
      return <HighlightSVG />;
    case "underlinesvg":
      return <UnderlineSVG />;
      case "strikethroughsvg":
      return <StrikeThroughSVG />;
    default:
      return null;
  }
};

export { getRibbonIcon };