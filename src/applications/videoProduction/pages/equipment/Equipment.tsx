import { StyledEquipmentCard, StyledEquipmentGrid, StyledEquipmentPage } from './equipment.styles';
import useEquipment from './useEquipment';

const Equipment = () => {
    const { equipment, isLoading, error } = useEquipment();

    return (
        <StyledEquipmentPage>
            <h3>Equipment</h3>

            {isLoading ? <p>Loading equipment…</p> : null}
            {error ? <p role="alert">{error}</p> : null}

            {!isLoading && !error && equipment.length === 0 ? (
                <p>No equipment assets found.</p>
            ) : null}

            <StyledEquipmentGrid>
                {equipment.map((item) => (
                    <StyledEquipmentCard key={item.id}>
                        <strong>{item.name}</strong>
                        <div className="description">{item.description}</div>
                    </StyledEquipmentCard>
                ))}
            </StyledEquipmentGrid>
        </StyledEquipmentPage>
    );
};

export default Equipment