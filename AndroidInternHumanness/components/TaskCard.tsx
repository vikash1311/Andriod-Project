import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography, Elevation } from "@/constants/theme";

interface TaskCardProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
}

export function TaskCard({ icon, title, description, onPress }: TaskCardProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface },
        Elevation.level2,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.primary + "20" },
        ]}
      >
        <Feather name={icon} size={24} color={theme.primary} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.onSurface }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.onSurfaceVariant }]}>
          {description}
        </Text>
      </View>
      <Feather name="chevron-right" size={24} color={theme.onSurfaceVariant} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h2,
    marginBottom: 4,
  },
  description: {
    ...Typography.body,
  },
  pressed: {
    opacity: 0.7,
  },
});
