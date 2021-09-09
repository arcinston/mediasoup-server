import * as mediasoup from "mediasoup";
import { Worker, Router } from "mediasoup/lib/types";
import { config } from "../config";

const worker: Array<{
  worker: Worker;
  router: Router;
}> = [];

let nextMediasoupWorkerIdx = 0;

const createWorker = async () => {
  const worker = await mediasoup.createWorker({
    logLevel: config.mediasoup.worker.logLevel,
    logTags: config.mediasoup.worker.logTags,
    rtcMinPort: config.mediasoup.worker.rtcMinPort,
    rtcMaxPort: config.mediasoup.worker.rtcMaxPort,
  });

  worker.on("died", () => {
    console.error(
      "mediasoup worker died (very sadge demise), exiting in 2 secs ..   [pid:&d]",
      worker.pid
    );
    setTimeout(() => {
      process.exit(1);
    }, 2000); // 2 seconds
  });
};

export { createWorker };
