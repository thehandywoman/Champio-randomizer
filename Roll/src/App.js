import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [charactersData, setCharactersData] = useState([]);

  useEffect(() => {
    // Wczytaj dane z pliku JSON
    fetch("characters.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCharactersData(data.fields);
      })
      .catch(error => console.error("Błąd wczytywania danych:", error));
  }, []);

  function createBackgroundImage(column) {
    console.log("CREATE BACK IMG");
    if (column && column.backgroundImage) {
      console.log(column);
      return (
        <img
          src={column.backgroundImage}
          alt={`Background for Column ${column.id}`}
          className="background-image"
        />
      );
    }
    return null; // Brak obrazka tła
  }

  function toggleButton(column) {
    setSelectedButtons(prevButtons => {
      if (prevButtons.includes(column)) {
        return prevButtons.filter(c => c !== column);
      } else {
        return [...prevButtons, column];
      }
    });
  }

  function rollNames(columns) {
    console.log("SELECTED BUTTONS:");
    console.log(columns);
    columns.forEach(column => {
      const textFields = document.querySelectorAll(`.text-field[data-column="${column.id}"]`);
      textFields.forEach(textField => {
        const fieldCharacters = column.characters;
        const initialIndex = Math.floor(Math.random() * fieldCharacters.length);
        let currentIndex = initialIndex;
        const animationDuration = 2000; // 2 sekundy
        const animationInterval = 100; // Co 100 ms zmieniaj imię w polu tekstowym

        function animateRollingName() {
          textField.value = fieldCharacters[currentIndex];
          currentIndex = (currentIndex + 1) % fieldCharacters.length;
        }

        let animationTimer = setInterval(animateRollingName, animationInterval);

        setTimeout(() => {
          clearInterval(animationTimer);
          textField.value = fieldCharacters[initialIndex];
        }, animationDuration);
      });
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Losowanie Imion Postaci</h1>
      </header>
      <div className="button-group">
        {charactersData.map(column => (
          <button
            key={column.id}
            className={`button ${selectedButtons.includes(column.id) ? 'selected' : ''}`}
            data-column={column.id}
            onClick={() => toggleButton(column)}
          >
            {column.lineName}
          </button>
        ))}
      </div>
      <div className="text-fields-container">
        {selectedButtons.map(column => (
            <div key={column.id} className='field-container'>
              <input type="text" className="text-field" readOnly data-column={column.id} />
              {createBackgroundImage(column)}
            </div>
        ))}
      </div>
      <button id="losujButton" onClick={() => rollNames(selectedButtons)}>LOSUJ</button>
    </div>
  );
}

export default App;
