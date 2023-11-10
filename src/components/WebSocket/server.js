var http = require("http");
var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server is running.");
});
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", function (socket) {
  console.log("Client connected");
  // Send a message to the client when they connect
  socket.emit("serverMessage", "Welcome to the server!");
  // Handle messages from the client
  socket.on("clientMessage", function (message) {
    console.log("Received from client:", message);
    // Send a response to the client
    socket.emit("serverMessage", "You said: " + message);
  });
  // Handle disconnection
  socket.on("disconnect", function () {
    console.log("Client disconnected");
  });
});
var port = 8080;
server.listen(port, function () {
  console.log("Socket.IO server is running on port ".concat(port));
});
