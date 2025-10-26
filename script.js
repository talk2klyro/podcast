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
        <div class="buttons">
          <button class="voice-btn" data-voice="${tutor.voice}">🎧 Play Voice</button>
          <button class="profile-btn" data-profile="${tutor.profile}">👤 View Profile</button>
        </div>
      `;
      grid.appendChild(card);
    });

    // handle audio playback
    document.querySelectorAll(".voice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const audio = new Audio(btn.dataset.voice);
        audio.play();
      });
    });

    // handle profile redirect
    document.querySelectorAll(".profile-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.open(btn.dataset.profile, "_blank");
      });
    });
  })
  .catch(err => {
    console.error("Error loading tutors:", err);
    grid.innerHTML = `<p style="text-align:center; color:#c00;">Unable to load tutors. Please check your JSON path or URLs.</p>`;
  });
