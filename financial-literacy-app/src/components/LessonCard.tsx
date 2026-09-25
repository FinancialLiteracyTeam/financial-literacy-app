import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

type LessonCardProps = {
  icon: string;
  title: string;
  description: string;
  progress: string;
  onPress: () => void;
};

export default function LessonCard({
  icon,
  title,
  description,
  progress,
  onPress,
}: LessonCardProps) {

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <Text style={styles.icon}>
        {icon}
      </Text>

      <View style={styles.content}>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>
          {description}
        </Text>

        <Text style={styles.progress}>
          Progress: {progress}
        </Text>

      </View>

      <Text style={styles.arrow}>
        ›
      </Text>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 35,
    marginRight: 15,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    color: '#666666',
    marginTop: 5,
  },

  progress: {
    color: '#2563eb',
    marginTop: 8,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 30,
    color: '#999999',
  },

});