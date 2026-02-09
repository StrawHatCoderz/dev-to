import { requestHandler } from "./request_handler.js";
export const main = () => {
  Deno.serve(requestHandler);
};

main();
