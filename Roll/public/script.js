document.addEventListener("DOMContentLoaded", () => {
    const textFieldsContainer = document.querySelector('.text-fields-container');
    const losujButton = document.getElementById("losujButton");
    const charactersData = {}; // Obiekt przechowujący dane o pulach imion

    function createBackgroundImage() {
        const backgroundImage = document.createElement("img");
        backgroundImage.src = "bc1.png"; // Ścieżka do obrazka
        backgroundImage.className = "background-image";
        return backgroundImage;
    }

    function updateTextFields() {
        textFieldsContainer.innerHTML = ''; // Wyczyść kontener z poprzednimi polami tekstowymi

        const buttons = document.querySelectorAll(".button");
        buttons.forEach((button) => {
            if (button.classList.contains("selected")) {
                const column = button.getAttribute("data-column");
                const textField = document.createElement("input");
                textField.type = "text";
                textField.className = "text-field";
                textField.readOnly = true;
                textField.setAttribute("data-column", column);
                const container = document.createElement("div");
                container.className = "field-container";
                container.appendChild(textField); // Dodaj pole do kontenera
                container.appendChild(createBackgroundImage()); // Dodaj obrazek za polem
                textFieldsContainer.appendChild(container); // Dodaj kontener do głównego kontenera
            }
        });
    }

    function toggleButton(button) {
        button.classList.toggle("selected");
        updateTextFields();
    }

    function rollNames(textFields) {
        textFields.forEach((textField, index) => {
            const column = textField.getAttribute("data-column");
            if (charactersData[column]) {
                const fieldCharacters = charactersData[column];
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
            } else {
                textField.value = '';
            }
        });
    }

    // Obsługa kliknięcia przycisku "LOSUJ"
    losujButton.addEventListener("click", () => {
        const selectedButtons = document.querySelectorAll(".button.selected");
        const selectedTextFields = Array.from(selectedButtons).map((button) => {
            return textFieldsContainer.querySelector(`[data-column="${button.getAttribute("data-column")}"]`);
        });
        rollNames(selectedTextFields);
    });

    // Obsługa kliknięcia przycisków
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            toggleButton(button);
        });
    });

    // Wczytaj dane z pliku JSON (zakładam, że plik JSON nazywa się "characters.json")
    fetch("characters.json")
        .then(response => response.json())
        .then(data => {
            // Przetwórz dane z pliku JSON i zapisz je w obiekcie charactersData
            data.fields.forEach(field => {
                charactersData[field.id] = field.characters;
            });

            updateTextFields();
        })
        .catch(error => console.error("Błąd wczytywania danych:", error));
});
