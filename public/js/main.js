const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

//get username and room from URL
const { username, room } = qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

const socket = io();

//Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message alert
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const msg = e.target.elements.msg.value;

  //Emit msg to server
  socket.emit("chatMessage", msg);

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//OutputMessage to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
