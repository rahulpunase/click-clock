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

export function colorIsDarkSimple(bgColor: string) {
  let color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  let r = parseInt(color.substring(0, 2), 16); // hexToR
  let g = parseInt(color.substring(2, 4), 16); // hexToG
  let b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 <= 186;
}
