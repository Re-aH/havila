import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameTitle from './components/gametitle';
import Item from './components/item';
import WaitScreen from './components/waitScreen';
// import Scratch from './components/scratch';





export default function App() {
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState();
  const [taskItems, setTaskItems] = useState([]);
  //temporary game list
  const [games, setGames] = useState([{ "id": 1680865464903, "tasks": ["העבר למי שיושב מולך", "שיר \"היום יום הולדת\"' "], "title": "משחק לדוגמא" }]);
  const [currentGame, setCurrentGame] = useState(null);
  const [title, setTitle] = useState();
  const [gameOn, setGameOn] = useState(false)


  //Load games from local storage (if exists)
  useEffect(() => {
    const loadGames = async () => {
      try {
        const savedGames = await AsyncStorage.getItem('localGames');
        if (savedGames !== null) {
          setGames(JSON.parse(savedGames));
        }
      } catch (error) {
        console.log('no saved games', error);
      }
    };
    loadGames();

  }, []);

  // Save the games array to local storage
  const saveGamesToStorage = async (games) => {
    try {
      await AsyncStorage.setItem('localGames', JSON.stringify(games));
    } catch (error) {
      console.log('Error saving games to local storage:', error);
    }
  };

  const handleDeleteItem = (index) => {
    // console.log(index);
    if (currentGame) {

      let newTasks = currentGame.tasks;
      newTasks = newTasks.filter((item, i) => i !== index)
      setCurrentGame({ ...currentGame, tasks: newTasks });
      // console.log(newTasks, currentGame, index);
    }
  };

  const handleGameTitleChange = (text) => {
    setCurrentGame({
      ...currentGame,
      title: text
    });

    //find the index of the game with this id
    let index = games.findIndex(g => g.id === currentGame.id)
    // console.log(index);

    //replaces this game in games array
    let newGames = [...games];
    newGames.splice(index, 1, currentGame);
    // console.log(newGames);
    setGames(newGames);
    saveGamesToStorage(games);

  };

  const handleDeleteGame = (id) => {
    //delets the currentGame from games

    // console.log(id);
    if (games) {

      let newGames = games;
      newGames = newGames.filter((g) => g.id !== id)
      setGames(newGames)
      // console.log(newGames);
      saveGamesToStorage(games);
    }


  }

  const handleChangeItemText = (text, index) => {
    // Keyboard.dismiss();
    // console.log('text is changing');
    // console.log(index, text);
    if (currentGame) {

      let newTasks = currentGame.tasks;
      newTasks[index] = text;
      setCurrentGame({ ...currentGame, tasks: newTasks });
      // console.log(newTasks, currentGame);
    }
  }




  const handleAddItem = () => {
    Keyboard.dismiss();
    setCurrentGame({
      ...currentGame,
      tasks: [...currentGame.tasks, item]
    });
    setItem(null);
  };

  useEffect(() => {
    // { currentGame ? console.log(currentGame.tasks) : console.log('currentGame is NULL'); }
    // console.log(games);


  }, [editing, games, currentGame,]);

  const handleAddGame = () => {
    const newGame = {
      id: Date.now(),
      title: "",
      tasks: []
    }

    setCurrentGame(newGame);
    setGames([...games, newGame])
    saveGamesToStorage(games);
    setEditing(true);
  };

  const handlePressHome = () => {
    //find the index of the game with this id
    let index = games.findIndex(g => g.id === currentGame.id)
    // console.log(index);

    //replaces this game in games array
    let newGames = [...games];
    newGames.splice(index, 1, currentGame);
    // console.log(newGames);
    setGames(newGames);
    saveGamesToStorage(games);
    setCurrentGame(null);
    setEditing(false);
    setTitle("");
    setTaskItems([]);
    setGameOn(false);
    setTurnCount(0);
    setPassing(false);
  };


  const handlePressGame = (id) => {
    const game = games.find((game) => game.id === id);
    setCurrentGame(game);
    setTitle(game.title);
    setTaskItems(game.tasks);
    setEditing(true);
    // console.log(currentGame);
  };

  const handleGameOn = () => {
    //find the index of the game with this id
    let index = games.findIndex(g => g.id === currentGame.id)
    // console.log(index);

    //replaces this game in games array
    let newGames = [...games];
    newGames.splice(index, 1, currentGame);
    // console.log(newGames);
    setGames(newGames);
    saveGamesToStorage(games);
    setEditing(false);
    setGameOn(true)
  };

  const [passing, setPassing] = useState(false)

  const [turnCount, setTurnCount] = useState(0)

  const handleStartPlaying = () => {
    setPassing(!passing)
    setTurnCount((prevTurnCount) => prevTurnCount + 1)
  }


  return (
    <>
      {!editing && !gameOn && (
        //Home screen - move to component?
        <ScrollView style={styles.container}>

          {/* <Scratch /> */}

          <View style={styles.gamesWrapper}>
            <Text style={styles.sectionTitle}>חבילה עוברת</Text>

            <View style={styles.games}>

              {games.map((game) => (
                <GameTitle
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  onPress={() => handlePressGame(game.id)}
                  onDelete={handleDeleteGame}
                />
              ))}


              <View style={styles.addGame}>
                <Text>משחק חדש</Text>
                <TouchableOpacity onPress={handleAddGame}>
                  <View sytle={styles.plusWrapper}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      )}

      {editing && !gameOn && (
        // editing game screen - move to component
        <ScrollView style={styles.container}>
          <View style={styles.gamesWrapper}>
            <View style={styles.topLine}>
              <TextInput
                style={styles.sectionTitle}
                placeholder={'שם משחק'}
                value={currentGame.title}
                onChangeText={handleGameTitleChange}
              />
              <TouchableOpacity onPress={handlePressHome}>
                <Text style={styles.home}>🏠</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.games}>
              {/* add task items here */}
              {currentGame.tasks.map((task, index) => (
                <Item key={index} text={task} index={index} onChangeText={handleChangeItemText}
                  onDelete={handleDeleteItem} />
              ))}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.addGame}>
                  <TextInput
                    placeholder="משימה חדשה"
                    value={item}
                    onChangeText={text => setItem(text)}
                    multiline={true}
                    returnKeyType='done'
                  />
                  <TouchableOpacity onPress={handleAddItem}>
                    <View>
                      <Text style={styles.plus}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.playButton} onPress={handleGameOn}>
                <View style={styles.playButtonText}>
                  <Text style={styles.playButtonTextBox}>התחל</Text>
                  <Text style={styles.playButtonTextBox}>משחק</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      {gameOn && (
        <View style={styles.container2}>
          <View style={styles.gamesWrapper}>
            <View style={styles.topLine2}>
              <TouchableOpacity onPress={handlePressHome}>
                <Text style={styles.home2}>🏠</Text>
              </TouchableOpacity>
            </View>

            {!passing && (turnCount === 0) && (
              <>
                <Text style={styles.GameText}>המשחק:</Text>
                <Text style={styles.GameText}>"{currentGame.title}"</Text>
                <Text style={styles.GameText}>מוכן</Text>
                <TouchableOpacity style={styles.playButton2} onPress={handleStartPlaying}>
                  <View style={styles.playButtonText}>
                    <Text style={styles.playButtonTextBox}>התחל</Text>
                    <Text style={styles.playButtonTextBox}>משחק</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}

            {passing && (turnCount > 0) && (


              <WaitScreen tasks={currentGame.tasks} home={() => handlePressHome()} />


            )}
          </View>
        </View >




      )
      }
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
    alignSelf: "flex-end",
    textAlign: 'right',
  },
  games: {},

  plus: {
    backgroundColor: '#fc3535',
    color: 'white',
    borderRadius: 12,
    fontSize: 18,
    width: 24,
    height: 24,
    textAlign: 'center',
    overflow: 'hidden',
  },
  addGame: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginTop: 5,
  },
  topLine: {
    display: 'flex',
    flexDirection: "row-reverse",
    justifyContent: "space-between"

  },
  home: {
    backgroundColor: '#fc3535',
    borderRadius: 15,
    fontSize: 18,
    width: 30,
    height: 30,
    textAlign: 'center',
    overflow: 'hidden',
  },

  playButton: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#c50000',
    borderRadius: 40,
    width: 80,
    height: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#C0C0C0",
    marginTop: 50,
  },

  playButtonText: {
    paddingTop: 14,
  },

  playButtonTextBox: {
    fontSize: 20,
    color: 'white',
  },

  container2: {
    flex: 1,
    backgroundColor: '#fffdef',
    justifyContent: 'space-between',
    // rowGap: 20,

  },
  topLine2: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingBottom: 80,


  },
  home2: {
    backgroundColor: '#fc3535',
    borderRadius: 15,
    fontSize: 18,
    width: 30,
    height: 30,
    textAlign: 'center',
    overflow: 'hidden',

  },

  GameText: {
    fontSize: 30,
    padding: 10,
    textAlign: 'center'

  },

  playButton2: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#c50000',
    borderRadius: 40,
    width: 80,
    height: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#C0C0C0",
    marginTop: 120,
  },


});
