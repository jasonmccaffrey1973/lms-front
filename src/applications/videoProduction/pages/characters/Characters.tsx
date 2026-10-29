import { StyledCharacterCard, StyledCharactersGrid, StyledCharactersPage } from './characters.styles';
import useCharacters from './useCharacters';

const Characters = () => {
    const { characters, isLoading, error } = useCharacters();

    return (
        <StyledCharactersPage>
            <h3>People</h3>

            {isLoading ? <p>Loading people…</p> : null}
            {error ? <p role="alert">{error}</p> : null}

            {!isLoading && !error && characters.length === 0 ? (
                <p>No character assets found.</p>
            ) : null}

            <StyledCharactersGrid>
                {characters.map((person) => (
                    <StyledCharacterCard key={person.id}>
                        <strong>{person.name}</strong>
                        <div className="role">{person.role}</div>
                    </StyledCharacterCard>
                ))}
            </StyledCharactersGrid>
        </StyledCharactersPage>
    );
};

export default Characters