const http = require("http");
const server = http.createServer((req: any, res: any) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running.");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("Client connected");

  // Send a message to the client when they connect
  socket.emit("serverMessage", "Welcome to the server!");

  // Handle messages from the client
  socket.on("clientMessage", (message: any) => {
    console.log("Received from client:", message);

    // Send a response to the client
    socket.emit("serverMessage", "You said: " + message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 8080;

server.listen(port, () => {
  console.log(`Socket.IO server is running on port ${port}`);
});
