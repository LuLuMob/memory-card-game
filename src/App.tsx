import React, { useState, useEffect } from "react";

const API_URL = "https://rickandmortyapi.com/api/character"; // URL de la API de Rick and Morty

type Character = {
  id: number;
  name: string;
  image: string;
};

const MemoryGame: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // Almacena los personajes
  const [clickedCharacters, setClickedCharacters] = useState<Set<number>>(new Set()); // Personajes ya clickeados
  const [score, setScore] = useState<number>(0); // Puntuación actual
  const [loading, setLoading] = useState<boolean>(true); // Cargando personajes

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Función para obtener personajes desde la API
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener personajes");
      const data = await response.json();
      setCharacters(data.results); // Guardar los personajes obtenidos
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función que maneja el clic en un personaje
  const handleCharacterClick = (id: number) => {
    if (clickedCharacters.has(id)) {
      alert("¡Perdiste! Hiciste clic en el mismo personaje dos veces.");
      setScore(0); // Reiniciar la puntuación
      setClickedCharacters(new Set()); // Reiniciar los personajes clickeados
    } else {
      setClickedCharacters(new Set(clickedCharacters).add(id)); // Agregar el personaje clickeado al set
      setScore(score + 1); // Incrementar la puntuación
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Juego de Memoria - Rick and Morty</h1>
      <h2>Puntuación: {score}</h2>

      {loading ? (
        <p>Cargando personajes...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {characters.map((character) => (
            <img
              key={character.id}
              src={character.image}
              alt={character.name}
              onClick={() => handleCharacterClick(character.id)}
              style={{
                width: "150px",
                cursor: "pointer",
                borderRadius: "10px",
                border: "2px solid #000",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
