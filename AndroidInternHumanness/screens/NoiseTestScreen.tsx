import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "NoiseTest">;

export default function NoiseTestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isTesting, setIsTesting] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [isGood, setIsGood] = useState(true);

  useEffect(() => {
    if (isTesting) {
      const interval = setInterval(() => {
        const randomDb = Math.floor(Math.random() * 60);
        setDecibels(randomDb);
        setIsGood(randomDb < 40);
      }, 500);

      setTimeout(() => {
        setIsTesting(false);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTesting]);

  const handleStartTest = () => {
    setIsTesting(true);
    setDecibels(0);
  };

  const handleProceed = () => {
    navigation.navigate("TaskSelection");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.content, { paddingTop: Spacing.xl }]}>
        <View
          style={[
            styles.meterContainer,
            {
              borderColor: isGood ? theme.successGreen : theme.warningAmber,
              borderWidth: 12,
            },
          ]}
        >
          <Text style={[styles.decibelValue, { color: theme.onSurface }]}>
            {decibels}
          </Text>
          <Text style={[styles.decibelUnit, { color: theme.onSurfaceVariant }]}>
            dB
          </Text>
        </View>

        {!isTesting && decibels > 0 && (
          <Text
            style={[
              styles.statusText,
              {
                color: isGood ? theme.successGreen : theme.warningAmber,
              },
            ]}
          >
            {isGood
              ? "Good to proceed"
              : "Please move to a quieter place"}
          </Text>
        )}
      </View>

      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom + Spacing.md },
        ]}
      >
        {!isTesting && decibels === 0 && (
          <PrimaryButton
            title="Start Test"
            onPress={handleStartTest}
            fullWidth
          />
        )}
        {!isTesting && decibels > 0 && isGood && (
          <PrimaryButton
            title="Proceed"
            onPress={handleProceed}
            fullWidth
          />
        )}
        {!isTesting && decibels > 0 && !isGood && (
          <PrimaryButton
            title="Test Again"
            onPress={handleStartTest}
            fullWidth
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  meterContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  decibelValue: {
    fontSize: 64,
    fontWeight: "500",
  },
  decibelUnit: {
    ...Typography.body,
  },
  statusText: {
    ...Typography.body,
    marginTop: Spacing.lg,
  },
  bottomContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
});
