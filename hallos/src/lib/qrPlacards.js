export const QR_PLACARD_THEMES = [
  {
    id: 'classic',
    label: 'Classic',
    eyebrow: 'Clean placard',
    accentClass: 'text-brand-orange',
    description: 'Simple, clean, and easy to print for bathrooms, laundry rooms, and lounges.',
  },
  {
    id: 'signature',
    label: 'Signature',
    eyebrow: 'Premium placard',
    accentClass: 'text-brand-navy',
    description: 'A premium HallOS sign with a luxe header, subtle details, and a stronger judge-demo presence.',
  },
];

export function getQrPlacardTheme(themeId = 'signature') {
  return QR_PLACARD_THEMES.find((theme) => theme.id === themeId) ?? QR_PLACARD_THEMES[1];
}

export function sanitizeForFileName(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'hallos';
}

export function buildQrPlacardFileName({ hallName = 'hallos', spaceName = 'shared-space', theme = 'signature', ext = 'png' } = {}) {
  const parts = [sanitizeForFileName(hallName), sanitizeForFileName(spaceName), sanitizeForFileName(theme), 'qr-sign']
    .filter(Boolean)
    .join('-');
  return `${parts}.${sanitizeForFileName(ext) || 'png'}`;
}

export function buildSpaceBadge(space = {}) {
  const floor = space?.floor ? `Floor ${space.floor}` : 'Shared space';
  const type = space?.space_type ? String(space.space_type) : 'Resident area';
  return `${floor} • ${type}`;
}

export function buildSpaceCode(space = {}) {
  const floor = String(space?.floor || 'X');
  const letters = String(space?.name || 'HallOS')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'HOS';
  return `HOS-${floor}-${letters}`;
}
