import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type ProgressCardProps = {
  xp: number;
  level: number;
  progress: number;
};

export default function ProgressCard({
  xp,
  level,
  progress,
}: ProgressCardProps) {

  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        Your Progress
      </Text>

      <Text style={styles.xp}>
        ⭐ {xp} XP
      </Text>

      <Text style={styles.level}>
        Level {level}
      </Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {progress}% to next level
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 18,
    marginTop: 25,
  },

  title: {
    color: '#ffffff',
    fontSize: 16,
  },

  xp: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  level: {
    color: '#ffffff',
    fontSize: 15,
    marginTop: 5,
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#ffffff',
    opacity: 0.4,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },

  progressText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 13,
  },

});