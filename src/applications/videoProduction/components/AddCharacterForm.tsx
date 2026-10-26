import type { FormEvent } from 'react';

const AddCharacterForm = ({ handleSubmit }: { handleSubmit: (formData: FormData) => void }) => (
    <form id="video-production-item-form" onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
    }}>

    </form>
);

export default AddCharacterForm;