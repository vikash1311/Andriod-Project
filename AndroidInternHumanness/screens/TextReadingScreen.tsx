import { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { MicButton } from "@/components/MicButton";
import { CheckboxItem } from "@/components/CheckboxItem";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TextReading">;
type ScreenRouteProp = RouteProp<RootStackParamList, "TextReading">;

export default function TextReadingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { addTask } = useTasks();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [recordedDuration, setRecordedDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkboxes, setCheckboxes] = useState({
    noNoise: false,
    noMistakes: false,
    noGalti: false,
  });

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${route.params.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setText(data.description || "Sample text for reading task.");
        setLoading(false);
      })
      .catch(() => {
        setText("Sample text for reading task.");
        setLoading(false);
      });
  }, [route.params.productId]);

  const handleRecordingComplete = (duration: number) => {
    setRecordedDuration(duration);
    setError(null);
  };

  const handleRecordingError = (errorMsg: string) => {
    setError(errorMsg);
    setRecordedDuration(null);
  };

  const handleRecordAgain = () => {
    setRecordedDuration(null);
    setError(null);
    setCheckboxes({
      noNoise: false,
      noMistakes: false,
      noGalti: false,
    });
  };

  const handleSubmit = () => {
    if (recordedDuration) {
      addTask({
        id: Date.now().toString(),
        task_type: "text_reading",
        text,
        audio_path: `/local/path/audio_${Date.now()}.mp3`,
        duration_sec: recordedDuration,
        timestamp: new Date().toISOString(),
      });
      navigation.navigate("TaskSelection");
    }
  };

  const allCheckboxesChecked =
    checkboxes.noNoise && checkboxes.noMistakes && checkboxes.noGalti;

  return (
    <View style={styles.container}>
      <ScreenScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
      >
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <Text style={[styles.instruction, { color: theme.onSurface }]}>
            Read the passage aloud in your native language.
          </Text>
        </View>

        <View
          style={[
            styles.textCard,
            { backgroundColor: theme.backgroundDefault },
          ]}
        >
          {loading ? (
            <Text style={[styles.text, { color: theme.onSurfaceVariant }]}>
              Loading...
            </Text>
          ) : (
            <Text style={[styles.text, { color: theme.onSurface }]}>{text}</Text>
          )}
        </View>

        {error && (
          <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
        )}

        {recordedDuration && (
          <View>
            <AudioPlayer duration={recordedDuration} />

            <View style={styles.checkboxContainer}>
              <CheckboxItem
                label="No background noise"
                checked={checkboxes.noNoise}
                onToggle={() =>
                  setCheckboxes((prev) => ({ ...prev, noNoise: !prev.noNoise }))
                }
              />
              <CheckboxItem
                label="No mistakes while reading"
                checked={checkboxes.noMistakes}
                onToggle={() =>
                  setCheckboxes((prev) => ({
                    ...prev,
                    noMistakes: !prev.noMistakes,
                  }))
                }
              />
              <CheckboxItem
                label="Beech me koi galti nahi hai"
                checked={checkboxes.noGalti}
                onToggle={() =>
                  setCheckboxes((prev) => ({ ...prev, noGalti: !prev.noGalti }))
                }
                secondary
              />
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonHalf}>
                <PrimaryButton
                  title="Record again"
                  onPress={handleRecordAgain}
                  variant="text"
                  fullWidth
                />
              </View>
              <View style={styles.buttonHalf}>
                <PrimaryButton
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={!allCheckboxesChecked}
                  fullWidth
                />
              </View>
            </View>
          </View>
        )}
      </ScreenScrollView>

      <View
        style={[
          styles.micContainer,
          { bottom: insets.bottom + Spacing.lg },
        ]}
      >
        <MicButton
          onRecordingComplete={handleRecordingComplete}
          onError={handleRecordingError}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  instruction: {
    ...Typography.body,
  },
  textCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  text: {
    ...Typography.body,
  },
  error: {
    ...Typography.caption,
    marginBottom: Spacing.md,
  },
  checkboxContainer: {
    marginVertical: Spacing.md,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  buttonHalf: {
    flex: 1,
  },
  micContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
