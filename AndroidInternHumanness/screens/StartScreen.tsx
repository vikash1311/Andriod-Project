import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;

export default function StartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={[styles.heading, { color: theme.onSurface }]}>
          Let's start with a Sample Task for practice.
        </ThemedText>
        <ThemedText
          style={[styles.subtitle, { color: theme.onSurfaceVariant }]}
        >
          Pehele hum ek sample task karte hain.
        </ThemedText>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Start Sample Task"
            onPress={() => navigation.navigate("NoiseTest")}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  content: {
    alignItems: "center",
  },
  heading: {
    ...Typography.h1,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.hindiSubtext,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  buttonContainer: {
    width: 280,
  },
});
