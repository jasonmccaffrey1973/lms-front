import MiniEditor from '../../../sharedComponents/miniEditor/MiniEditor';
import { useSceneForm } from '../hooks/useSceneForm';
import {
  StyledEditorWrapper,
  StyledField,
  StyledInput,
  StyledSceneForm,
} from './AddSceneForm.styles';

type AddSceneFormProps = {
  handleSubmit: (formData: FormData) => void;
};

const AddSceneForm = ({ handleSubmit }: AddSceneFormProps) => {
  const { values, updateField, onSubmit } = useSceneForm({ handleSubmit });

  return (
    <StyledSceneForm id="video-production-item-form" onSubmit={onSubmit}>
      <StyledField htmlFor="scene-name">
        <span>Name</span>
        <StyledInput
          id="scene-name"
          name="name"
          type="text"
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />
      </StyledField>

      <StyledEditorWrapper>
        <MiniEditor
          label="Description"
          labelPlacement="start"
          value={values.description}
          onChange={(html) => updateField('description', html)}
        />
      </StyledEditorWrapper>
    </StyledSceneForm>
  );
};

export default AddSceneForm;
