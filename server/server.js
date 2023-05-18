import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { log } from "console";
// import { connectDB } from "./config/database.js";
// import Room from "./models/Room.js";
// import { isValidObjectId } from "mongoose";

const app = express();

// dotenv.config({ path: "./config/config.env" });

// connectDB();

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => res.send("<h1>Hello</h1>"));
// io.use((socket, next) => {
//   //   const token = socket.handshake.auth.token;
//   //   console.log(socket.handshake);
//   //   log({ socket });
//   //   log(socket.adapter);
//   //   rooms: Map(1) {
//   //     'Io0IllZIDzDNQArpAAAB' => Set(1) { 'Io0IllZIDzDNQArpAAAB' }
//   //   },
//   //   sids: Map(1) {
//   //     'Io0IllZIDzDNQArpAAAB' => Set(1) { 'Io0IllZIDzDNQArpAAAB' }
//   //   },
//   //   encoder: Encoder { replacer: undefined },
//   //   headers:
//   //     host: 'localhost:3001',
//   //     connection: 'keep-alive',
//   //     'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//   //     accept: '*/*',
//   //     'sec-ch-ua-mobile': '?0',
//   //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
//   //     'sec-ch-ua-platform': '"macOS"',
//   //     origin: 'http://127.0.0.1:5176',
//   //     'sec-fetch-site': 'cross-site',
//   //     'sec-fetch-mode': 'cors',
//   //     'sec-fetch-dest': 'empty',
//   //     referer: 'http://127.0.0.1:5176/',
//   //     'accept-encoding': 'gzip, deflate, br',
//   //     'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
//   //   },
//   //   time: 'Fri Apr 14 2023 17:02:02 GMT+0530 (India Standard Time)',
//   //   address: '::1',
//   //   xdomain: true,
//   //   secure: false,
//   //   issued: 1681471922803,
//   //   url: '/socket.io/?x=45&EIO=4&transport=polling&t=OT_YM97',
//   //   query: [Object: null prototype] {
//   //     x: '45',
//   //     EIO: '4',
//   //     transport: 'polling',
//   //     t: 'OT_YM97'
//   //   },
//   //   auth: { token: 'abc' }
//   //   console.log({ token });
//   next();
//   // ...
// });

io.on("connection", (socket) => {
  console.log(`Socket is connected to the id :${socket.id}}`);

  socket.on("createRoom", async (data) => {
    console.log(`Data recieved:${data}`);
    socket.emit(`server_msg`, `Data recieved from ${data}`);
    console.log("createRoom called");
    const player = {
      socketID: socket.id,
      nickname,
      playerType: "X",
    };
  });

  socket.on("connect_error", (err) => {
    console.log(err.message); // prints the message associated with the error
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });

  socket.on("disconnecting", () => {
    console.log(`User disconnecting with id : ${socket.id}`);
  });
  socket.on("disconnect", async (id) => {
    console.log(`User disconnected with id : ${socket.id}`);
    // await User.deleteOne({ _id: id });
  });
});
server.listen(8000, "0.0.0.0", () =>
  console.log("Server is listening on port 8000")
);
