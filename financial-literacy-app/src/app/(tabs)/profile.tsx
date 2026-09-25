import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

export default function Profile() {

  return (
    <View style={styles.container}>

      <Text style={styles.avatar}>
        👤
      </Text>

      <Text style={styles.name}>
        Sanket
      </Text>

      <Text style={styles.email}>
        sanket@example.com
      </Text>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Your Statistics
        </Text>

        <Text style={styles.stat}>
          ⭐ 120 XP
        </Text>

        <Text style={styles.stat}>
          🏆 Level 2
        </Text>

        <Text style={styles.stat}>
          🔥 3 Day Streak
        </Text>

      </View>

      <Pressable
        style={styles.logout}
        onPress={() =>
          router.replace('/login')
        }
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#f5f7fb',
  },

  avatar: {
    fontSize: 70,
    marginTop: 40,
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },

  email: {
    color: '#666666',
    marginTop: 5,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  stat: {
    fontSize: 16,
    marginTop: 12,
  },

  logout: {
    marginTop: 30,
  },

  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
  },

});