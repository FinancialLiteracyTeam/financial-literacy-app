import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import LessonCard from '../../components/LessonCard';

type Lesson = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  category: string;
  order: number;
  isPublished: boolean;
};

export default function Learn() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const data = await api.getLessons();

      if (data.success) {
        setLessons(data.lessons);
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Learn
      </Text>

      <Text style={styles.subtitle}>
        Build your financial knowledge one lesson at a time.
      </Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            Loading lessons...
          </Text>
        </View>
      ) : (
        lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            icon={lesson.icon}
            title={lesson.title}
            description={lesson.description}
            progress="0%"
            onPress={() =>
              router.push({
                pathname: '/lesson/[id]',
                params: {
                  id: lesson._id,
                },
              })
            }
          />
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
    marginBottom: 25,
  },

  loading: {
    alignItems: 'center',
    marginTop: 40,
  },

  loadingText: {
    marginTop: 10,
    color: '#666666',
  },

});