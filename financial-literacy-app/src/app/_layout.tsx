import { AuthProvider } from '@/context/AuthContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
        <Stack>
        {/* Welcome screen */}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        {/* Authentication */}
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />

        {/* Main application */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        {/* Lesson */}
        <Stack.Screen
          name="lesson/[id]"
          options={{
            title: 'Lesson',
          }}
        />

        {/* Quiz */}
        <Stack.Screen
          name="quiz/[id]"
          options={{
            title: 'Quiz',
          }}
        />

        <Stack.Screen
          name="quiz/result"
          options={{
            title: 'Result',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}