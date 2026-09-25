import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

type Question = {
  _id: string;
  question: string;
  options: string[];
};

type Quiz = {
  _id: string;
  title: string;
  questions: Question[];
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const data = await api.getQuiz(id as string);

      if (data.success) {
        setQuiz(data.quiz);

        setAnswers(
          new Array(data.quiz.questions.length).fill(-1)
        );
      }
    } catch (error) {
      console.error('Load quiz error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = answerIndex;

    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (!quiz) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    if (!quiz || !token) return;

    const unanswered = answers.some(
      (answer) => answer === -1
    );

    if (unanswered) {
      alert('Please answer all questions.');
      return;
    }

    try {
      setSubmitting(true);

      const data = await api.submitQuiz(
        quiz._id,
        answers,
        token
      );

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.replace({
        pathname: '/quiz/result',
        params: {
          result: JSON.stringify(data.result),
          quizId: quiz._id,
        },
      });
    } catch (error) {
      console.error('Submit quiz error:', error);
      alert('Unable to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Loading quiz...</Text>
      </View>
    );
  }

  if (!quiz) {
    return (
      <View style={styles.loading}>
        <Text>Quiz not found.</Text>
      </View>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {quiz.title}
      </Text>

      <Text style={styles.progress}>
        Question {currentQuestion + 1} of{' '}
        {quiz.questions.length}
      </Text>

      <View style={styles.card}>
        <Text style={styles.question}>
          {question.question}
        </Text>

        {question.options.map((option, index) => {
          const selected =
            answers[currentQuestion] === index;

          return (
            <Pressable
              key={index}
              style={[
                styles.option,
                selected && styles.selectedOption,
              ]}
              onPress={() => selectAnswer(index)}
            >
              <Text
                style={[
                  styles.optionText,
                  selected &&
                    styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.navigation}>
        {currentQuestion > 0 && (
          <Pressable
            style={styles.secondaryButton}
            onPress={previousQuestion}
          >
            <Text style={styles.secondaryText}>
              Previous
            </Text>
          </Pressable>
        )}

        {currentQuestion <
        quiz.questions.length - 1 ? (
          <Pressable
            style={styles.button}
            onPress={nextQuestion}
          >
            <Text style={styles.buttonText}>
              Next
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.button}
            onPress={submitQuiz}
            disabled={submitting}
          >
            <Text style={styles.buttonText}>
              {submitting
                ? 'Submitting...'
                : 'Submit Quiz'}
            </Text>
          </Pressable>
        )}
      </View>
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
    gap: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },

  progress: {
    color: '#666',
    marginTop: 8,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },

  question: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 20,
  },

  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  selectedOption: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },

  optionText: {
    fontSize: 16,
    color: '#333',
  },

  selectedOptionText: {
    color: '#2563eb',
    fontWeight: '600',
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginLeft: 'auto',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  secondaryText: {
    color: '#333',
    fontWeight: '600',
  },
});