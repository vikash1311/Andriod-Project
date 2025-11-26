import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { MicButton } from "@/components/MicButton";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ImageDescription">;
type ScreenRouteProp = RouteProp<RootStackParamList, "ImageDescription">;

export default function ImageDescriptionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { addTask } = useTasks();

  const [recordedDuration, setRecordedDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRecordingComplete = (duration: number) => {
    setRecordedDuration(duration);
    setError(null);
  };

  const handleRecordingError = (errorMsg: string) => {
    setError(errorMsg);
    setRecordedDuration(null);
  };

  const handleSubmit = () => {
    if (recordedDuration) {
      addTask({
        id: Date.now().toString(),
        task_type: "image_description",
        image_url: route.params.imageUrl,
        audio_path: `/local/path/desc_audio_${Date.now()}.mp3`,
        duration_sec: recordedDuration,
        timestamp: new Date().toISOString(),
      });
      navigation.navigate("TaskSelection");
    }
  };

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
            Describe what you see in your native language.
          </Text>
        </View>

        <Image
          source={{ uri: route.params.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {error && (
          <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
        )}

        {recordedDuration && (
          <View>
            <AudioPlayer duration={recordedDuration} />
            <PrimaryButton
              title="Submit"
              onPress={handleSubmit}
              fullWidth
            />
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
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  error: {
    ...Typography.caption,
    marginBottom: Spacing.md,
  },
  micContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
