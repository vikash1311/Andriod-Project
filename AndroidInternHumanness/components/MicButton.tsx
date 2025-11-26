import { useState, useRef } from "react";
import { View, Pressable, StyleSheet, Animated, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Elevation } from "@/constants/theme";

interface MicButtonProps {
  onRecordingComplete: (duration: number) => void;
  minDuration?: number;
  maxDuration?: number;
  onError?: (error: string) => void;
}

export function MicButton({
  onRecordingComplete,
  minDuration = 10,
  maxDuration = 20,
  onError,
}: MicButtonProps) {
  const { theme } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRecording(true);
    setDuration(0);
    startTimeRef.current = Date.now();

    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.7,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setDuration(elapsed);

      if (elapsed >= maxDuration) {
        stopRecording();
      }
    }, 100);
  };

  const stopRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);

    setIsRecording(false);

    if (finalDuration < minDuration) {
      onError?.(`Recording too short (min ${minDuration} s).`);
    } else if (finalDuration > maxDuration) {
      onError?.(`Recording too long (max ${maxDuration} s).`);
    } else {
      onRecordingComplete(finalDuration);
    }

    setDuration(0);
  };

  return (
    <View style={styles.container}>
      {isRecording && (
        <View
          style={[
            styles.durationBadge,
            { backgroundColor: theme.recordingRed },
          ]}
        >
          <Text style={styles.durationText}>
            {String(Math.floor(duration / 60)).padStart(2, "0")}:
            {String(duration % 60).padStart(2, "0")}
          </Text>
        </View>
      )}
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            opacity: pulseAnim,
          },
        ]}
      >
        <Pressable
          onPressIn={startRecording}
          onPressOut={stopRecording}
          style={[
            styles.button,
            {
              backgroundColor: isRecording
                ? theme.primary
                : theme.recordingRed,
            },
            Elevation.level4,
          ]}
        >
          <Feather
            name="mic"
            size={32}
            color={theme.buttonText}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: Spacing.micButtonSize,
    height: Spacing.micButtonSize,
    borderRadius: Spacing.micButtonSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  durationBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  durationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});
