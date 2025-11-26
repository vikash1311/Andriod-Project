import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "filled" | "outlined" | "text";
  fullWidth?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = "filled",
  fullWidth = false,
}: PrimaryButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        fullWidth && styles.fullWidth,
        variant === "filled" && {
          backgroundColor: disabled ? theme.disabled : theme.primary,
        },
        variant === "outlined" && {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: disabled ? theme.disabled : theme.primary,
        },
        variant === "text" && {
          backgroundColor: "transparent",
        },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              variant === "filled"
                ? theme.buttonText
                : disabled
                ? theme.disabledText
                : theme.primary,
          },
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    ...Typography.button,
  },
  pressed: {
    opacity: 0.8,
  },
});
