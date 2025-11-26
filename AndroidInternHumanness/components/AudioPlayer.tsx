import { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Typography } from "@/constants/theme";

interface AudioPlayerProps {
  duration: number;
}

export function AudioPlayer({ duration }: AudioPlayerProps) {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePlayback} style={styles.playButton}>
        <Feather
          name={isPlaying ? "pause" : "play"}
          size={24}
          color={theme.primary}
        />
      </Pressable>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: theme.onSurfaceVariant + "30" },
          ]}
        >
          <View
            style={[
              styles.progress,
              {
                backgroundColor: theme.primary,
                width: "0%",
              },
            ]}
          />
        </View>
        <Text style={[styles.time, { color: theme.onSurfaceVariant }]}>
          {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  playButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  progress: {
    height: "100%",
    borderRadius: 2,
  },
  time: {
    ...Typography.caption,
    minWidth: 40,
  },
});
