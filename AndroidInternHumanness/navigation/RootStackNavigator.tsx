import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "./screenOptions";
import StartScreen from "@/screens/StartScreen";
import NoiseTestScreen from "@/screens/NoiseTestScreen";
import TaskSelectionScreen from "@/screens/TaskSelectionScreen";
import TextReadingScreen from "@/screens/TextReadingScreen";
import ImageDescriptionScreen from "@/screens/ImageDescriptionScreen";
import PhotoCaptureScreen from "@/screens/PhotoCaptureScreen";
import TaskHistoryScreen from "@/screens/TaskHistoryScreen";

export type RootStackParamList = {
  Start: undefined;
  NoiseTest: undefined;
  TaskSelection: undefined;
  TextReading: { productId: number };
  ImageDescription: { imageUrl: string };
  PhotoCapture: undefined;
  TaskHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={getCommonScreenOptions({ theme, isDark, transparent: false })}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NoiseTest"
        component={NoiseTestScreen}
        options={{ title: "Noise Test" }}
      />
      <Stack.Screen
        name="TaskSelection"
        component={TaskSelectionScreen}
        options={{ title: "Select Task Type" }}
      />
      <Stack.Screen
        name="TextReading"
        component={TextReadingScreen}
        options={{ title: "Text Reading Task" }}
      />
      <Stack.Screen
        name="ImageDescription"
        component={ImageDescriptionScreen}
        options={{ title: "Image Description Task" }}
      />
      <Stack.Screen
        name="PhotoCapture"
        component={PhotoCaptureScreen}
        options={{ title: "Photo Capture Task" }}
      />
      <Stack.Screen
        name="TaskHistory"
        component={TaskHistoryScreen}
        options={{ title: "Task History" }}
      />
    </Stack.Navigator>
  );
}
