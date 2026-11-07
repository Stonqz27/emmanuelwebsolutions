/** QR payloads contain ONLY the opaque shared-space ID. Access is still authenticated. */
export function spacePath(spaceId) {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(String(spaceId ?? ''))) throw new Error('Invalid space ID');
  return `/space/${encodeURIComponent(spaceId)}`;
}
export function spaceUrl(spaceId, origin) {
  const base = new URL(origin);
  if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Invalid app origin');
  return new URL(`/rawlings/app${spacePath(spaceId)}`, base.origin).href;
}
export function reportUrl(spaceId) {
  return `/hallfix?space=${encodeURIComponent(String(spaceId))}`;
}
