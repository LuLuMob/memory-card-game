import React, { useState } from "react";

const MemoryGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);

  const scoreFunciona = () => {
    setScore(score + 1); // Incrementa el puntaje cada vez que se hace clic en una carta
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Juego de Memoria - Rick and Morty</h1>
      <h2>Puntuación: {score}</h2>
      <button onClick={scoreFunciona}>Haz clic en la carta</button> {/* Un botón para simular el clic */}
 
    </div>
  );
};

export default MemoryGame;
