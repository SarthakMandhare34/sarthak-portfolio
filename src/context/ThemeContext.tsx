import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type ColorTheme = 'terracotta-sand';
export type DesignMode = 'timeless' | 'liquid-glass';
export type FontSizeScale = 'default' | 'medium' | 'large';

export interface ColorThemeDefinition {
  id: ColorTheme;
  name: string;
  tagline: string;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    bg: string;
  };
}

export const COLOR_THEMES: Record<ColorTheme, ColorThemeDefinition> = {
  'terracotta-sand': {
    id: 'terracotta-sand',
    name: 'Warm Terracotta & Sand',
    tagline: 'Warm Earthy Editorial',
    description: 'Rich terracotta, toasted amber, warm sand canvas, and espresso typography.',
    preview: {
      primary: '#B84E2A',
      secondary: '#4A6D3B',
      accent: '#D97736',
      surface: '#FFFFFF',
      bg: '#FAF8F5'
    }
  }
};

export interface AppSettings {
  theme: Theme;
  colorTheme: ColorTheme;
  designMode: DesignMode;
  fontSize: FontSizeScale;
  reducedMotion: boolean;
  glassMode: boolean; // synchronized with designMode === 'liquid-glass'
}

export interface SettingsContextType {
  settings: AppSettings;
  theme: Theme;
  colorTheme: ColorTheme;
  designMode: DesignMode;
  fontSize: FontSizeScale;
  reducedMotion: boolean;
  glassMode: boolean;
  isSettingsOpen: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  setDesignMode: (mode: DesignMode) => void;
  toggleDesignMode: () => void;
  setFontSize: (size: FontSizeScale) => void;
  setReducedMotion: (reduced: boolean) => void;
  setGlassMode: (glass: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
  resetSettings: () => void;
}

const SETTINGS_STORAGE_KEY = 'portfolio-settings-v5';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  colorTheme: 'terracotta-sand',
  designMode: 'timeless',
  fontSize: 'default',
  reducedMotion: false,
  glassMode: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;

    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validDesignMode: DesignMode =
          parsed.designMode === 'liquid-glass'
            ? 'liquid-glass'
            : 'timeless';
        const validTheme: Theme = parsed.theme === 'dark' ? 'dark' : 'light';
        const validFontSize: FontSizeScale = ['default', 'medium', 'large'].includes(
          parsed.fontSize
        )
          ? parsed.fontSize
          : 'default';

        return {
          theme: validTheme,
          colorTheme: 'terracotta-sand',
          designMode: validDesignMode,
          fontSize: validFontSize,
          reducedMotion: Boolean(parsed.reducedMotion),
          glassMode: validDesignMode === 'liquid-glass'
        };
      }
    } catch {
      // Fallback
    }

    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      ...DEFAULT_SETTINGS,
      theme: prefersDark ? 'dark' : 'light',
      reducedMotion: prefersReduced
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-color-theme', 'terracotta-sand');
    root.setAttribute('data-design-mode', settings.designMode);
    root.setAttribute('data-glass', settings.designMode === 'liquid-glass' ? 'true' : 'false');
    root.setAttribute('data-font-size', settings.fontSize);
    root.setAttribute('data-reduced-motion', settings.reducedMotion ? 'true' : 'false');

    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore quota errors
    }
  }, [settings]);

  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const setTheme = (theme: Theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const setColorTheme = (_colorTheme: ColorTheme) => {
    setSettings((prev) => ({ ...prev, colorTheme: 'terracotta-sand' }));
  };

  const setDesignMode = (designMode: DesignMode) => {
    setSettings((prev) => ({
      ...prev,
      designMode,
      glassMode: designMode === 'liquid-glass'
    }));
  };

  const toggleDesignMode = () => {
    setSettings((prev) => {
      const nextMode: DesignMode =
        prev.designMode === 'timeless' ? 'liquid-glass' : 'timeless';
      return {
        ...prev,
        designMode: nextMode,
        glassMode: nextMode === 'liquid-glass'
      };
    });
  };

  const setGlassMode = (glass: boolean) => {
    setDesignMode(glass ? 'liquid-glass' : 'timeless');
  };

  const setFontSize = (fontSize: FontSizeScale) => {
    setSettings((prev) => ({ ...prev, fontSize }));
  };

  const setReducedMotion = (reducedMotion: boolean) => {
    setSettings((prev) => ({ ...prev, reducedMotion }));
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        theme: settings.theme,
        colorTheme: settings.colorTheme,
        designMode: settings.designMode,
        fontSize: settings.fontSize,
        reducedMotion: settings.reducedMotion,
        glassMode: settings.designMode === 'liquid-glass',
        isSettingsOpen,
        toggleTheme,
        setTheme,
        setColorTheme,
        setDesignMode,
        toggleDesignMode,
        setFontSize,
        setReducedMotion,
        setGlassMode,
        openSettings,
        closeSettings,
        toggleSettings,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a ThemeProvider');
  }
  return context;
}

export function useTheme() {
  const context = useSettings();
  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
    setTheme: context.setTheme,
    colorTheme: context.colorTheme,
    setColorTheme: context.setColorTheme,
    designMode: context.designMode,
    setDesignMode: context.setDesignMode,
    toggleDesignMode: context.toggleDesignMode
  };
}
