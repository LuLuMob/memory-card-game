
import React, { useState, useEffect } from "react";

const API_URL = "https://rickandmortyapi.com/api/character"; // URL de la API de Rick and Morty

type Character = {
  id: number;
  name: string;
  image: string;
};

const MemoryGame: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [clickedCharacters, setClickedCharacters] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener personajes");
      const data = await response.json();
      setCharacters(data.results); // Tomamos los personajes de la respuesta
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  const shuffleCharacters = () => {
    setCharacters([...characters].sort(() => Math.random() - 0.5));
  };

  const handleCharacterClick = (id: number) => {
    if (clickedCharacters.has(id)) {
      alert("¡Perdiste! Hiciste clic en el mismo personaje dos veces.");
      setScore(0);
      setClickedCharacters(new Set());
    } else {
      setClickedCharacters(new Set(clickedCharacters).add(id));
      setScore(score + 1);
      if (score + 1 > bestScore) setBestScore(score + 1);
      shuffleCharacters();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Juego de Memoria - Rick and Morty</h1>
      <h2>Puntuación: {score} | Mejor Puntuación: {bestScore}</h2>

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
