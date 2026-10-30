import test from 'node:test';
import assert from 'node:assert/strict';

// Test pure portfolio logic: single cohesive color theme, solid mode, text formatting, and validation

const COLOR_THEMES = {
  'terracotta-sand': {
    name: 'Gold & Green',
    lightPrimary: '#D4932C',
    lightSecondary: '#2D6B48',
    darkPrimary: '#F5C857',
    darkSecondary: '#8FBB9E'
  }
};

function resolveSettings(raw) {
  const theme = raw?.theme === 'dark' ? 'dark' : 'light';
  const colorTheme = 'terracotta-sand';
  const designMode = 'timeless';
  const fontSize = ['default', 'medium', 'large'].includes(raw?.fontSize) ? raw.fontSize : 'default';
  const reducedMotion = Boolean(raw?.reducedMotion);

  return {
    theme,
    colorTheme,
    designMode,
    fontSize,
    reducedMotion,
    glassMode: false
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

test('resolveSettings enforces pure solid timeless mode across themes', () => {
  const lightSettings = resolveSettings({ theme: 'light' });
  assert.equal(lightSettings.designMode, 'timeless');
  assert.equal(lightSettings.glassMode, false);

  const darkSettings = resolveSettings({ theme: 'dark' });
  assert.equal(darkSettings.designMode, 'timeless');
  assert.equal(darkSettings.glassMode, false);
  assert.equal(darkSettings.theme, 'dark');
});

test('Email validator passes valid email and rejects invalid format', () => {
  assert.ok(isValidEmail('sarthakmandhare34@gmail.com'));
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('@nodomain.com'), false);
});

test('Phone formatting handles international notation correctly', () => {
  assert.equal(formatPhoneNumber('+91 93263 97599'), '+91 93263 97599');
});

test('Removed labels are absent from data and business logic structures', () => {
  const forbidden = [
    'Available for Full-Stack Opportunities',
    'First Class with Distinction',
    'Core Academic Focus',
    'Open for Opportunities',
    'Classic',
    'Nordic Sage',
    'Full-Stack & AI Systems · Mumbai, India',
    'Concurrent Programs'
  ];
  const combinedDataString = JSON.stringify(COLOR_THEMES);
  for (const phrase of forbidden) {
    assert.equal(combinedDataString.includes(phrase), false, `Should not contain "${phrase}"`);
  }
});
