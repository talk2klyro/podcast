const grid = document.getElementById("tutorGrid");

fetch("data/tutors.json")
  .then(response => response.json())
  .then(tutors => {
    tutors.forEach(tutor => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${tutor.photo}" alt="${tutor.name}">
        <h2>${tutor.name}</h2>
        <p>${tutor.tribe} Tribe</p>
        <button data-voice="${tutor.voice}">Play Voice</button>
      `;
      grid.appendChild(card);
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const audio = new Audio(btn.dataset.voice);
        audio.play();
      });
    });
  })
  .catch(err => console.error("Error loading tutors:", err));
