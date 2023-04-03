import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import GameTitle from './components/gametitle';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Item from './components/item';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';


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
              <GameTitle title="משחק 1" />
              <GameTitle title="משחק 2" />
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
            <View style={styles.topLine}>

              <TextInput style={styles.sectionTitle} placeholder={'שם משחק'}></TextInput>
              <TouchableOpacity>

                <Text onPress={handlePressPlus} style={styles.home}>🏠</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.games}>
              {/* add games here */}
              <Item text="משחק 1" />
              <Item text="משחק 2" />
              {/* add new game button */}
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View style={styles.addGame}>
                  <Text>משימה חדשה</Text>
                  <TouchableOpacity >
                    <View>
                      <Text style={styles.plus}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
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
    fontWeight: "bold",
    width: "80%",
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
  },
  topLine: {
    display: 'flex',
    flexDirection: "row-reverse",
    justifyContent: "space-between"

  },
  home: {
    backgroundColor: '#fc3535',
    borderRadius: 30,
    fontSize: 18,
    width: 30,
    height: 30,
    textAlign: 'center',
  }
});
