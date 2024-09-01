export function generateInviteUrl(orgId: string, cipher: string) {
  const { port, protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}/invite?cipher=${cipher}&orgId=${orgId}`;
}
