import test from 'node:test';
import assert from 'node:assert/strict';
import { QR_PLACARD_THEMES, buildQrPlacardFileName, buildSpaceBadge, buildSpaceCode, getQrPlacardTheme } from '../src/lib/qrPlacards.js';

test('HallOS supports two QR placard themes with a premium default', () => {
  assert.deepEqual(QR_PLACARD_THEMES.map((theme) => theme.id), ['classic', 'signature']);
  assert.equal(getQrPlacardTheme().id, 'signature');
  assert.equal(getQrPlacardTheme('missing').id, 'signature');
  assert.equal(getQrPlacardTheme('classic').label, 'Classic');
});

test('QR placard filenames are sanitized for export', () => {
  const fileName = buildQrPlacardFileName({
    hallName: 'Rawlings Hall',
    spaceName: 'Floor 2 Shower A',
    theme: 'signature',
    ext: 'pdf',
  });
  assert.equal(fileName, 'rawlings-hall-floor-2-shower-a-signature-qr-sign.pdf');
});

test('QR placard helpers create stable labels for signage', () => {
  const space = { floor: 2, space_type: 'Bathroom', name: 'Shower A' };
  assert.equal(buildSpaceBadge(space), 'Floor 2 • Bathroom');
  assert.equal(buildSpaceCode(space), 'HOS-2-SA');
});
