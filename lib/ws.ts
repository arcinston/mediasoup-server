import WebSocket from "ws";
import { createWorker } from "./worker";

let mediasoupRouter;

const WebsocketConnection = async (websock: WebSocket.Server) => {
  try {
    mediasoupRouter = await createWorker();
  } catch (e) {
    throw e;
  }
  websock.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      console.log("the message is : ", message);
      ws.send("yo wassup");
    });
  });
};

export { WebsocketConnection };
