import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

// Set max instances
setGlobalOptions({ maxInstances: 10 });

// Sample function
export const helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.send("Hello from Firebase Functions!");
});
