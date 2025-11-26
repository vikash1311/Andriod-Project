import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  secondary?: boolean;
}

export function CheckboxItem({
  label,
  checked,
  onToggle,
  secondary = false,
}: CheckboxItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? theme.secondary : "transparent",
            borderColor: checked ? theme.secondary : theme.onSurfaceVariant,
          },
        ]}
      >
        {checked && <Feather name="check" size={16} color="#FFFFFF" />}
      </View>
      <Text
        style={[
          styles.label,
          {
            color: secondary ? theme.onSurfaceVariant : theme.onSurface,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.xs,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  label: {
    ...Typography.body,
    flex: 1,
  },
});
