import type { FormEvent } from 'react';
import { StyledFormItem } from '../videoProduction.styles';
import MiniEditor from '../../../sharedComponents/miniEditor/MiniEditor';

const FormItem = ({ label, name, required }: { label: string; name: string; required?: boolean }) => (
    <StyledFormItem>
        <label htmlFor={`form-item-${name}`}>
            {label}
        </label>
        <input id={`form-item-${name}`} type="text" name={name} required={required} />
    </StyledFormItem>
);

const AddSceneForm    = ({ handleSubmit }: { handleSubmit: (formData: FormData) => void }) => (
    <form id="video-production-item-form" onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
    }}>
        <FormItem label="Name" name="name" required />
        <MiniEditor
            value=""
            onChange={() => {}}
        />
    </form>
);

export default AddSceneForm;