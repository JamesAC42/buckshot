/** @type {WebSocket | null} */
let socket = null;

/**
 * Connects to the WebSocket server with the given user ID.
 * @param {string} userId - The ID of the user to connect with.
 */
export function connectWebSocket(userId) {
  if (socket) {
    // Disconnect existing WebSocket connection
    socket.close();
  }
  // Establish a new WebSocket connection
  socket = new WebSocket(`ws://localhost:8080/ws/${userId}`);

  socket.addEventListener('open', () => {
    console.log('WebSocket connected');
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    // Handle incoming WebSocket messages
    console.log('Received message:', message);
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket disconnected');
  });
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}