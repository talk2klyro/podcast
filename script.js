const container = document.getElementById("topicsContainer");

fetch("data/topics.json")
  .then(response => response.json())
  .then(topics => {
    topics.forEach(topic => {
      // Create a section for each topic
      const section = document.createElement("section");
      section.className = "topic-section";
      section.innerHTML = `<h2>${topic.topic}</h2><div class="bento-grid"></div>`;
      const grid = section.querySelector(".bento-grid");

      // Add tutors under each topic
      topic.voices.forEach(tutor => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${tutor.photo}" alt="${tutor.name}">
          <h3>${tutor.name}</h3>
          <p>${tutor.tribe} Tribe</p>
          <div class="buttons">
            <button class="voice-btn" data-voice="${tutor.voice}">🎙 Play</button>
            <button class="profile-btn" data-profile="${tutor.profile}">👤 Profile</button>
          </div>
        `;
        grid.appendChild(card);
      });

      container.appendChild(section);
    });

    // Handle audio playback
    document.querySelectorAll(".voice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        new Audio(btn.dataset.voice).play();
      });
    });

    // Handle profile redirection
    document.querySelectorAll(".profile-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.open(btn.dataset.profile, "_blank");
      });
    });
  })
  .catch(err => {
    console.error("Error loading topics:", err);
    container.innerHTML = `<p style="text-align:center;color:#c00;">Error loading topics data.</p>`;
  });
