import { View, StyleSheet, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { TaskCard } from "@/components/TaskCard";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Elevation } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TaskSelection">;

export default function TaskSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <ScreenScrollView contentContainerStyle={styles.container}>
        <TaskCard
          icon="book-open"
          title="Text Reading Task"
          description="Read a passage aloud in your native language"
          onPress={() => navigation.navigate("TextReading", { productId: 1 })}
        />
        <TaskCard
          icon="image"
          title="Image Description Task"
          description="Describe what you see in the image"
          onPress={() =>
            navigation.navigate("ImageDescription", {
              imageUrl: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
            })
          }
        />
        <TaskCard
          icon="camera"
          title="Photo Capture Task"
          description="Capture and describe a photo"
          onPress={() => navigation.navigate("PhotoCapture")}
        />
      </ScreenScrollView>

      <Pressable
        onPress={() => navigation.navigate("TaskHistory")}
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary,
            bottom: insets.bottom + Spacing.md,
          },
          Elevation.level6,
        ]}
      >
        <Feather name="list" size={24} color={theme.buttonText} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
  },
  fab: {
    position: "absolute",
    right: Spacing.md,
    width: Spacing.fabSize,
    height: Spacing.fabSize,
    borderRadius: Spacing.fabSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
