import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Leaderboard() {

  const users = [
    {
      rank: 1,
      name: 'Alex',
      xp: 920,
    },
    {
      rank: 2,
      name: 'Rahul',
      xp: 850,
    },
    {
      rank: 3,
      name: 'Sanket',
      xp: 720,
    },
    {
      rank: 4,
      name: 'Priya',
      xp: 650,
    },
  ];

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Leaderboard
      </Text>

      <Text style={styles.subtitle}>
        See how you compare with other learners.
      </Text>

      {users.map((user) => (

        <View
          key={user.rank}
          style={styles.card}
        >

          <Text style={styles.rank}>
            #{user.rank}
          </Text>

          <View style={styles.userInfo}>

            <Text style={styles.name}>
              {user.name}
            </Text>

            <Text style={styles.xp}>
              ⭐ {user.xp} XP
            </Text>

          </View>

        </View>

      ))}

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
    color: '#666666',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 50,
  },

  userInfo: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  xp: {
    color: '#666666',
    marginTop: 5,
  },

});