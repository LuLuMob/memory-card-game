import React, { useState } from "react";

const MemoryGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Juego de Memoria - Rick and Morty</h1>
      <h2>Puntuación: {score}</h2>
    </div>
  );
};

export default MemoryGame;
