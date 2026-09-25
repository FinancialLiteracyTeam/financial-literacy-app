import {
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

type ActionCardProps = {
  icon: string;
  title: string;
  onPress: () => void;
};

export default function ActionCard({
  icon,
  title,
  onPress,
}: ActionCardProps) {

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  icon: {
    fontSize: 30,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },

});