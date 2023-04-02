import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Game from './components/game';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';


export default function App() {
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    console.log(editing);
  }, [editing]);

  const handlePressPlus = () => {
    setEditing(!editing)
    // console.log(editing);
  }

  return (
    <>
      {!editing && (
        //Home screen - move to component?
        <View style={styles.container}>
          <View style={styles.gamesWrapper}>
            <Text style={styles.sectionTitle}>חבילה עוברת</Text>
            <View style={styles.games}>
              {/* add games here */}
              <Game title="משחק 1" />
              <Game title="משחק 2" />
              {/* add new game button */}

              <View style={styles.addGame}>
                <Text>משחק חדש</Text>
                <TouchableOpacity onPress={handlePressPlus}>
                  <View>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {editing && (
        //editing game screen - move to component
        <View style={styles.container}>
          <View style={styles.gamesWrapper}>
            <TextInput style={styles.sectionTitle}>שם משחק</TextInput>
            <View style={styles.games}>
              {/* add games here */}
              <Game title="משחק 1" />
              <Game title="משחק 2" />
              {/* add new game button */}

              <View style={styles.addGame}>
                <Text>משימה חדשה</Text>
                <TouchableOpacity onPress={handlePressPlus}>
                  <View>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      )}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdef',

  },
  gamesWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  games: {},
  plus: {
    backgroundColor: '#fc3535',
    color: 'white',
    borderRadius: 24,
    fontSize: 18,
    width: 24,
    height: 24,
    textAlign: 'center'
  },
  addGame: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginTop: 20,
  }
});
