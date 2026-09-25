import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';

export default function QuizResult() {
  const { result, quizId } = useLocalSearchParams();

  const quizResult = JSON.parse(result as string);

  const {
    score,
    totalQuestions,
    percentage,
    xpEarned,
    attemptNumber,
    isFirstAttempt,
  } = quizResult;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        🎉
      </Text>

      <Text style={styles.title}>
        Quiz Completed!
      </Text>

      <Text style={styles.score}>
        {score}/{totalQuestions}
      </Text>

      <Text style={styles.percentage}>
        {percentage}%
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Attempt
        </Text>

        <Text style={styles.value}>
          #{attemptNumber}
        </Text>

        <Text style={styles.label}>
          XP Earned
        </Text>

        <Text style={styles.xp}>
          +{xpEarned} XP
        </Text>

        {!isFirstAttempt && (
          <Text style={styles.retakeInfo}>
            No additional XP is awarded for retakes.
          </Text>
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.replace({
            pathname: '/quiz/[id]',
            params: {
              id: quizId as string,
            },
          })
        }
      >
        <Text style={styles.buttonText}>
          Retake Quiz
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() =>
          router.replace('/(tabs)/learn')
        }
      >
        <Text style={styles.secondaryText}>
          Back to Lessons
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    padding: 25,
  },

  emoji: {
    fontSize: 55,
    marginTop: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
  },

  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 25,
  },

  percentage: {
    fontSize: 20,
    color: '#666',
  },

  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 25,
    marginTop: 25,
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },

  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },

  xp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 5,
  },

  retakeInfo: {
    color: '#777',
    textAlign: 'center',
    marginTop: 15,
  },

  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  secondaryText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});