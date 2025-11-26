import { useState } from "react";
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { MicButton } from "@/components/MicButton";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhotoCapture">;

export default function PhotoCaptureScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { addTask } = useTasks();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCaptureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to capture photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRecordingComplete = (duration: number) => {
    setRecordedDuration(duration);
    setError(null);
  };

  const handleRecordingError = (errorMsg: string) => {
    setError(errorMsg);
    setRecordedDuration(null);
  };

  const handleRetake = () => {
    setImageUri(null);
    setRecordedDuration(null);
    setError(null);
  };

  const handleSubmit = () => {
    if (imageUri && recordedDuration) {
      addTask({
        id: Date.now().toString(),
        task_type: "photo_capture",
        image_path: imageUri,
        audio_path: `/local/path/photo_audio_${Date.now()}.mp3`,
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
          { paddingBottom: insets.bottom + (imageUri ? 100 : 20) },
        ]}
      >
        {!imageUri ? (
          <View style={styles.centerContent}>
            <PrimaryButton
              title="Capture Image"
              onPress={handleCaptureImage}
            />
          </View>
        ) : (
          <>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.instruction, { color: theme.onSurface }]}>
                Describe the photo in your language.
              </Text>
            </View>

            {error && (
              <Text style={[styles.error, { color: theme.error }]}>
                {error}
              </Text>
            )}

            {recordedDuration && <AudioPlayer duration={recordedDuration} />}

            <View style={styles.buttonRow}>
              <View style={styles.buttonHalf}>
                <PrimaryButton
                  title="Retake Photo"
                  onPress={handleRetake}
                  variant="outlined"
                  fullWidth
                />
              </View>
              <View style={styles.buttonHalf}>
                <PrimaryButton
                  title="Submit"
                  onPress={handleSubmit}
                  disabled={!recordedDuration}
                  fullWidth
                />
              </View>
            </View>
          </>
        )}
      </ScreenScrollView>

      {imageUri && (
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
      )}
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  instruction: {
    ...Typography.body,
  },
  error: {
    ...Typography.caption,
    marginBottom: Spacing.md,
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
