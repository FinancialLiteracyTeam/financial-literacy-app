import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';

type Lesson = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  category: string;
};

type Quiz = {
  _id: string;
  title: string;
  questions: any[];
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, []);

  const loadLesson = async () => {
    try {
      const lessonData = await api.getLesson(
        id as string
      );

      if (!lessonData.success) {
        return;
      }

      setLesson(lessonData.lesson);

      const quizData = await api.getQuizByLesson(
        id as string
      );

      if (quizData.success) {
        setQuiz(quizData.quiz);
      }
    } catch (error) {
      console.error('Load lesson error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading lesson...
        </Text>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.loading}>
        <Text>Lesson not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.icon}>{lesson.icon}</Text>

      <Text style={styles.title}>
        {lesson.title}
      </Text>

      <Text style={styles.category}>
        {lesson.category}
      </Text>

      <Text style={styles.description}>
        {lesson.description}
      </Text>

      <View style={styles.contentCard}>
        <Text style={styles.contentTitle}>
          Learning Content
        </Text>

        <Text style={styles.content}>
          {lesson.content}
        </Text>
      </View>

      {quiz && (
        <View style={styles.quizCard}>
          <Text style={styles.quizTitle}>
            Ready to test your knowledge?
          </Text>

          <Text style={styles.quizInfo}>
            {quiz.questions.length} questions
          </Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/quiz/[id]',
                params: {
                  id: quiz._id,
                },
              })
            }
          >
            <Text style={styles.buttonText}>
              Start Quiz
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
  },

  icon: {
    fontSize: 50,
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  category: {
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 5,
  },

  description: {
    color: '#666',
    fontSize: 16,
    marginTop: 12,
    lineHeight: 24,
  },

  contentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginTop: 25,
  },

  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
  },

  quizCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 30,
  },

  quizTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },

  quizInfo: {
    marginTop: 8,
    color: '#666',
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});