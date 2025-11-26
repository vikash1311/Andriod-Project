import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#6200EE",
    primaryVariant: "#3700B3",
    secondary: "#03DAC6",
    error: "#B00020",
    surface: "#FFFFFF",
    background: "#F5F5F5",
    onSurface: "#000000",
    onSurfaceVariant: "#757575",
    successGreen: "#4CAF50",
    warningAmber: "#FF9800",
    recordingRed: "#F44336",
    text: "#000000",
    buttonText: "#FFFFFF",
    caption: "#9E9E9E",
    disabled: "#E0E0E0",
    disabledText: "#9E9E9E",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F5F5F5",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
  },
  dark: {
    primary: "#BB86FC",
    primaryVariant: "#3700B3",
    secondary: "#03DAC6",
    error: "#CF6679",
    surface: "#121212",
    background: "#121212",
    onSurface: "#FFFFFF",
    onSurfaceVariant: "#B0B0B0",
    successGreen: "#81C784",
    warningAmber: "#FFB74D",
    recordingRed: "#E57373",
    text: "#FFFFFF",
    buttonText: "#000000",
    caption: "#757575",
    disabled: "#2C2C2C",
    disabledText: "#757575",
    backgroundRoot: "#121212",
    backgroundDefault: "#1E1E1E",
    backgroundSecondary: "#2C2C2C",
    backgroundTertiary: "#3A3A3A",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  inputHeight: 48,
  buttonHeight: 48,
  micButtonSize: 72,
  fabSize: 56,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: "500" as const,
  },
  h2: {
    fontSize: 20,
    fontWeight: "400" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "500" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
  button: {
    fontSize: 14,
    fontWeight: "500" as const,
    textTransform: "uppercase" as const,
  },
  hindiSubtext: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
};

export const Elevation = {
  level1: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  level2: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 2,
  },
  level4: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,
    elevation: 4,
  },
  level6: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6.0,
    elevation: 6,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
