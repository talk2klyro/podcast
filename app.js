document.addEventListener("DOMContentLoaded", () => {
  fetch("data/topics.json")
    .then(response => response.json())
    .then(data => renderTopics(data))
    .catch(err => console.error("Error loading topics:", err));
});

function renderTopics(topics) {
  const container = document.getElementById("topicsContainer");

  topics.forEach(topic => {
    const topicBlock = document.createElement("section");
    topicBlock.classList.add("topic-block");

    const title = document.createElement("h2");
    title.classList.add("topic-title");
    title.textContent = topic.topic;
    topicBlock.appendChild(title);

    const grid = document.createElement("div");
    grid.classList.add("voice-grid");

    topic.voices.forEach(voice => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${voice.photo}" alt="${voice.name}">
        <h3>${voice.name}</h3>
        <p>${voice.tribe} Tribe</p>
        <div class="btn-group">
          <button onclick="playVoice('${voice.voice}')">🔊 Play Voice</button>
          <a class="profile-btn" href="${voice.profile}" target="_blank">View Profile</a>
        </div>
      `;

      grid.appendChild(card);
    });

    topicBlock.appendChild(grid);
    container.appendChild(topicBlock);
  });
}

function playVoice(url) {
  const audio = new Audio(url);
  audio.play();
}
