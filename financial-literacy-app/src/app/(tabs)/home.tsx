import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';

import ProgressCard from '../../components/ProgressCard';
import LessonCard from '../../components/LessonCard';
import ActionCard from '../../components/ActionCard';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const {user} = useAuth();
  return (
    <ScrollView style={styles.container}>

      {/* Header */}

      <Text style={styles.greeting}>
        Hello 👋
      </Text>

      <Text style={styles.title}>
        {user?.name}
      </Text>

      <Text style={styles.subtitle}>
        Learn, practice and improve your financial knowledge.
      </Text>

      {/* Progress */}

      <ProgressCard
        xp={120}
        level={2}
        progress={70}
      />

      {/* Continue Learning */}

      <Text style={styles.sectionTitle}>
        Continue Learning
      </Text>

      <LessonCard
        icon="💰"
        title="Budgeting Basics"
        description="3 of 5 lessons completed"
        progress="3 / 5"
        onPress={() => router.push('/lesson/1')}
      />

      {/* Quick Actions */}

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actionRow}>

        <ActionCard
          icon="📚"
          title="Learn"
          onPress={() =>
            router.push('/(tabs)/learn')
          }
        />

        <ActionCard
          icon="🏆"
          title="Rankings"
          onPress={() =>
            router.push('/(tabs)/leaderboard')
          }
        />

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
  },

  greeting: {
    fontSize: 16,
    color: '#666666',
    marginTop: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    marginTop: 8,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },

});