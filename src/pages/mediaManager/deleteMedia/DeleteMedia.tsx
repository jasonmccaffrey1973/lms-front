import Button from "../../../sharedComponents/Button/Button";
import Dialog from "../../../sharedComponents/dialog/Dialog";
import Render from "../../../sharedComponents/Render";
import StyledDeleteMediaModal from "./deleteMedia.styles";
import type { DeleteMediaProps, DeleteListItemProps } from "./deleteMedia.types";
import formatFileSize from "../../../helperFunctions/formatFileSize";
import useDeleteMedia from "./useDeleteMedia";
import SVGIcon from "../../../sharedComponents/SVG/SVGIcon";

const DeleteListItem = ({ item, removeFromDeleteList }: DeleteListItemProps) => {
  const {name, id, size = 0 } = item;
  return (
    <li key={id}>
      <Button color="success" onClick={() => removeFromDeleteList(id)}><SVGIcon icon="undo" />keep</Button>
      {name} <span className="filesize">({formatFileSize(size)})</span>
    </li>
  );
};

const DeleteMediaDialog = ({ dialogRef, controls, items, onDelete }: DeleteMediaProps) => {
  const { deleteButtonDisabled, handleDelete, deleteList, removeFromDeleteList } = useDeleteMedia({ items, onDelete, controls });
  const { closeDialog } = controls;

  return (
    <Dialog
      title={`Delete ${deleteList.length} item${deleteList.length === 1 ? "" : "s"}`}
      dialogRef={dialogRef}
      controls={controls}
      footerButtons={[
        { label: "Cancel", onClick: closeDialog, color: "primary" },
        { label: `Delete ${deleteList.length} item${deleteList.length === 1 ? "" : "s"}`, onClick: handleDelete, color: "danger", disabled: deleteButtonDisabled },
      ]}
    >
      <StyledDeleteMediaModal>
        <Render if={deleteList.length > 0}>
          <h2>Are you sure you want to delete the following items?</h2>
          <ul>
            {deleteList.map((item) => (
              <DeleteListItem key={item.id} item={item} removeFromDeleteList={removeFromDeleteList} />
            ))}
          </ul>
        </Render>
      </StyledDeleteMediaModal>
    </Dialog>
  );
};

const DeleteMedia = (props: DeleteMediaProps) => (
  <DeleteMediaDialog
    key={props.controls.isDialogOpen ? "open" : "closed"}
    {...props}
  />
);

export default DeleteMedia;
