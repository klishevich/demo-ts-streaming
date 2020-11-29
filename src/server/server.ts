import * as express from "express";
import * as chalk from "chalk";
import * as http from "http";
import * as socketIo from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "localhost";
const targetDir = "build";

const app = express();

// Server static assets
app.use(
  express.static(targetDir, {
    etag: true,
    maxAge: 0,
  })
);

// socketIO
const server = http.createServer(app);
const io = new socketIo.Server(server, { serveClient: false });
let users: string[] = [];

//listen on every connection
io.on("connection", (socket) => {
    console.log("New user connected, socket.id", socket.id);
    users.push(socket.id);
    console.log("connection, users", users);

    // get online user list
    socket.emit("server_connected", "Web Socket Connected");

    socket.on("client_some_message", (message: string) => {
        console.log( "client_some_action", message);
    });

    //Disconnect
    socket.on("disconnect", () => {
        console.log("disconnect, socket.id", socket.id);
        users = users.filter(el => el !== socket.id)
        console.log("disconnect, users", users);
    });

    // send test message from the server
    setTimeout(() => {
        socket.emit("server_some_message", "Some Message from the Server after 2 seconds");
    }, 2000);
});

server.listen(port, () => {
  console.log(
    `Serving at http://${host}:${port} ${chalk.green("✓")}. ${chalk.red(
      "To run in dev mode: npm run dev"
    )}`
  );
});
