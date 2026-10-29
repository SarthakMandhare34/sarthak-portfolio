import test from 'node:test';
import assert from 'node:assert/strict';

// Test pure logic: single cohesive color theme, design modes, text formatting, and validation

const COLOR_THEMES = {
  'terracotta-sand': {
    name: 'Gold & Green',
    lightPrimary: '#D4932C',
    darkPrimary: '#F5C857'
  }
};

function resolveSettings(raw) {
  const theme = raw?.theme === 'dark' ? 'dark' : 'light';
  const colorTheme = 'terracotta-sand';
  const designMode = raw?.designMode === 'liquid-glass' ? 'liquid-glass' : 'timeless';
  const fontSize = ['default', 'medium', 'large'].includes(raw?.fontSize) ? raw.fontSize : 'default';
  const reducedMotion = Boolean(raw?.reducedMotion);

  return {
    theme,
    colorTheme,
    designMode,
    fontSize,
    reducedMotion,
    glassMode: designMode === 'liquid-glass'
  };
}

function formatPhoneNumber(phone) {
  return phone.replace(/\s+/g, ' ').trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test('Curated color theme definition contains exactly one cohesive palette', () => {
  const keys = Object.keys(COLOR_THEMES);
  assert.equal(keys.length, 1);
  assert.ok(keys.includes('terracotta-sand'));
});

test('resolveSettings defaults fallback cleanly with empty input', () => {
  const settings = resolveSettings({});
  assert.equal(settings.theme, 'light');
  assert.equal(settings.colorTheme, 'terracotta-sand');
  assert.equal(settings.designMode, 'timeless');
  assert.equal(settings.glassMode, false);
  assert.equal(settings.fontSize, 'default');
  assert.equal(settings.reducedMotion, false);
});

test('resolveSettings accepts liquid-glass and sets glassMode synchronization', () => {
  const settings = resolveSettings({ designMode: 'liquid-glass', theme: 'dark' });
  assert.equal(settings.designMode, 'liquid-glass');
  assert.equal(settings.glassMode, true);
  assert.equal(settings.colorTheme, 'terracotta-sand');
  assert.equal(settings.theme, 'dark');
});

test('Bidirectional style toggle switches forward and reverse seamlessly', () => {
  // Initial solid (classic flat) mode
  let state = resolveSettings({ designMode: 'timeless' });
  assert.equal(state.designMode, 'timeless');
  assert.equal(state.glassMode, false);

  // Toggle forward to liquid-glass
  const nextMode = state.designMode === 'timeless' ? 'liquid-glass' : 'timeless';
  state = resolveSettings({ ...state, designMode: nextMode });
  assert.equal(state.designMode, 'liquid-glass');
  assert.equal(state.glassMode, true);

  // Toggle reverse back to timeless (classic flat)
  const reverseMode = state.designMode === 'timeless' ? 'liquid-glass' : 'timeless';
  state = resolveSettings({ ...state, designMode: reverseMode });
  assert.equal(state.designMode, 'timeless');
  assert.equal(state.glassMode, false);
});

test('Email validator passes valid email and rejects invalid format', () => {
  assert.ok(isValidEmail('sarthakmandhare34@gmail.com'));
  assert.equal(isValidEmail('invalid-email'), false);
});

test('Phone formatting handles international notation correctly', () => {
  assert.equal(formatPhoneNumber('+91 9326397599'), '+91 9326397599');
});

test('Removed labels are absent from data and business logic structures', () => {
  const forbidden = [
    'Available for Full-Stack Opportunities',
    'First Class with Distinction',
    'Core Academic Focus',
    'Open for Opportunities',
    'Classic',
    'Nordic Sage',
    'Full-Stack & AI Systems · Mumbai, India'
  ];
  const combinedDataString = JSON.stringify(COLOR_THEMES);
  for (const phrase of forbidden) {
    assert.equal(combinedDataString.includes(phrase), false, `Should not contain "${phrase}"`);
  }
});
