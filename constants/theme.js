import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

// Paleta de cores baseada no Tailwind CSS
const tailwindColors = {
  // Gray scale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#f3f4f6',

  // Slate scale
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
};

// Configuração de fontes (opcional)
const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

// Tema claro personalizado
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Cores principais
    point: '#2e3852',
    primary: tailwindColors.gray800,       // Cor primária (botões, elementos ativos)
    onPrimary: tailwindColors.gray50,      // Cor sobre elementos primários (texto sobre botão)
    primaryContainer: tailwindColors.gray200, // Container de elementos primários
    onPrimaryContainer: tailwindColors.gray800, // Texto sobre container primário

    // Cores secundárias
    secondary: tailwindColors.gray600,
    onSecondary: tailwindColors.gray50,
    secondaryContainer: tailwindColors.gray100,
    onSecondaryContainer: tailwindColors.gray800,

    // Configurações específicas para TextInput
    onSurface: tailwindColors.gray800,      // COR DO TEXTO DIGITADO (gray400)
    surface: tailwindColors.gray900,       // Fundo dos inputs
    surfaceVariant: tailwindColors.gray800, // Variante de superfície
    onSurfaceVariant: tailwindColors.gray600, // Texto secundário

    // Configurações de ícones
    onBackground: tailwindColors.gray50,   // COR DOS ÍCONES (gray50)
    background: tailwindColors.gray900,    // Cor de fundo geral

    // Cores de erro
    error: '#d32f2f',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',

    // Bordas
    outline: tailwindColors.gray300,       // Cor da borda inativa

    // Elevação (sombras)
    elevation: {
      level0: 'transparent',
      level1: tailwindColors.gray800,
      level2: tailwindColors.gray700,
      level3: tailwindColors.gray600,
      level4: tailwindColors.gray500,
      level5: tailwindColors.gray400,
    },
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
  // roundness: 8, // Descomente se quiser bordas arredondadas
};

// Tema escuro personalizado
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    point: '#2e3852',
    primary: tailwindColors.slate400,
    onPrimary: tailwindColors.slate900,
    primaryContainer: tailwindColors.slate800,
    onPrimaryContainer: tailwindColors.slate100,
    secondary: tailwindColors.gray400,
    onSecondary: tailwindColors.gray900,
    secondaryContainer: tailwindColors.gray800,
    onSecondaryContainer: tailwindColors.gray100,
    tertiary: tailwindColors.slate300,
    onTertiary: tailwindColors.slate900,
    tertiaryContainer: tailwindColors.slate700,
    onTertiaryContainer: tailwindColors.slate100,
    surface: tailwindColors.gray900,
    onSurface: tailwindColors.gray100,
    surfaceVariant: tailwindColors.gray800,
    onSurfaceVariant: tailwindColors.gray200,
    background: tailwindColors.gray900,
    onBackground: tailwindColors.gray100,
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    outline: tailwindColors.gray600,
    elevation: {
      level0: 'transparent',
      level1: tailwindColors.gray800,
      level2: tailwindColors.gray700,
      level3: tailwindColors.gray600,
      level4: tailwindColors.gray500,
      level5: tailwindColors.gray400,
    },
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
  roundness: 8,
};
