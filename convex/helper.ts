import { ConvexError } from "convex/values";

export function makeRandomId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function AppConvexError(message: string, code: 429 | 401 | 403 = 429) {
  return new ConvexError({
    message,
    code,
  });
}
