import { View, StyleSheet, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenFlatList } from "@/components/ScreenFlatList";
import { Task, useTasks } from "@/contexts/TaskContext";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Typography, Elevation } from "@/constants/theme";

export default function TaskHistoryScreen() {
  const { theme } = useTheme();
  const { tasks, getTotalDuration } = useTasks();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTaskIcon = (type: Task["task_type"]) => {
    switch (type) {
      case "text_reading":
        return "book-open";
      case "image_description":
        return "image";
      case "photo_capture":
        return "camera";
    }
  };

  const getTaskName = (type: Task["task_type"]) => {
    switch (type) {
      case "text_reading":
        return "Text Reading";
      case "image_description":
        return "Image Description";
      case "photo_capture":
        return "Photo Capture";
    }
  };

  const renderHeader = () => (
    <View
      style={[
        styles.statsHeader,
        { backgroundColor: theme.primaryVariant },
      ]}
    >
      <View style={styles.statColumn}>
        <Text style={styles.statLabel}>Total Tasks</Text>
        <Text style={styles.statValue}>{tasks.length}</Text>
      </View>
      <View style={styles.statColumn}>
        <Text style={styles.statLabel}>Total Duration</Text>
        <Text style={styles.statValue}>
          {formatDuration(getTotalDuration())}
        </Text>
      </View>
    </View>
  );

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={[
        styles.taskCard,
        { backgroundColor: theme.surface },
        Elevation.level1,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.primary + "20" },
        ]}
      >
        <Feather
          name={getTaskIcon(item.task_type)}
          size={20}
          color={theme.primary}
        />
      </View>

      <View style={styles.taskInfo}>
        <Text style={[styles.taskName, { color: theme.onSurface }]}>
          {getTaskName(item.task_type)}
        </Text>
        <Text style={[styles.taskMeta, { color: theme.caption }]}>
          {formatDuration(item.duration_sec)} • {formatTimestamp(item.timestamp)}
        </Text>
      </View>

      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}
      {item.image_path && (
        <Image
          source={{ uri: item.image_path }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      )}
      {item.text && !item.image_url && !item.image_path && (
        <View style={styles.textPreview}>
          <Text
            style={[styles.textSnippet, { color: theme.onSurfaceVariant }]}
            numberOfLines={2}
          >
            {item.text}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <ScreenFlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Feather
            name="inbox"
            size={64}
            color={theme.onSurfaceVariant}
          />
          <Text style={[styles.emptyText, { color: theme.onSurfaceVariant }]}>
            No tasks completed yet
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  statsHeader: {
    flexDirection: "row",
    height: 80,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  statColumn: {
    flex: 1,
    justifyContent: "center",
  },
  statLabel: {
    ...Typography.caption,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statValue: {
    ...Typography.h1,
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: Spacing.sm,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 96,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    marginHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  taskMeta: {
    ...Typography.caption,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xs,
  },
  textPreview: {
    width: 60,
    height: 60,
    justifyContent: "center",
  },
  textSnippet: {
    fontSize: 10,
    lineHeight: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
});
