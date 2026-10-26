import type { FormEvent } from 'react';

const AddEquipmentForm = ({ handleSubmit }: { handleSubmit: (formData: FormData) => void }) => (
    <form id="video-production-item-form" onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
    }}>

    </form>
);

export default AddEquipmentForm;