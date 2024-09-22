export function generateInviteUrl(orgId: string, cipher: string) {
  const { port, protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}/invite?cipher=${cipher}&orgId=${orgId}`;
}

export function getUrlPrefix(suffix?: string) {
  const { port, protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}${suffix}`;
}

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
