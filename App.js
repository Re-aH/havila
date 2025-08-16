import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameTitle from './components/gametitle';
import Item from './components/item';
import WaitScreen from './components/waitScreen';
import { theme } from './components/theme';






export default function App() {
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState();
  //temporary game list
  const [games, setGames] = useState([{ "id": 1680865464903, "tasks": ["העבר למי שיושב מולך", "שיר \"היום יום הולדת\"' ", "קפצו 10 פעמים על רגל אחת", "צלמו תמונה של כל המשתתפים ביחד", "עשו פרצוף מצחיק", "עשו חיקויי של חיה - והעבירו למי שניחש ראשון", "ריקדו ריקוד קטן"], "title": "משחק לדוגמא" }]);
  const [currentGame, setCurrentGame] = useState(null);
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


    setGameOn(false);
    setTurnCount(0);
    setPassing(false);
  };


  const handlePressGame = (id) => {
    const game = games.find((game) => game.id === id);
    setCurrentGame(game);


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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView style={styles.container}>
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
                    <View style={styles.plusWrapper}>
                      <Ionicons name="add-circle" size={24} color="#fc3535" />
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {editing && !gameOn && (
        // editing game screen - move to component
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
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
                  <View style={styles.home}>
                    <Ionicons name="home" size={18} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={styles.games}>
                  {/* add task items here */}
                  {currentGame.tasks.map((task, index) => (
                    <Item key={index} text={task} index={index} onChangeText={handleChangeItemText}
                      onDelete={handleDeleteItem} />
                  ))}
                  <View style={styles.addGame}>
                    <TextInput
                      placeholder="משימה חדשה"
                      value={item}
                      onChangeText={text => setItem(text)}
                      multiline={true}
                      returnKeyType='done'
                    />
                    <TouchableOpacity onPress={handleAddItem}>
                      <View style={styles.addIconWrapper}>
                        <Ionicons name="add-circle" size={24} color={theme.colors.buttonBackgroundColor} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.playButton} onPress={handleGameOn}>
                    <View style={styles.playButtonText}>
                      <Text style={styles.playButtonTextBox}>התחל</Text>
                      <Text style={styles.playButtonTextBox}>משחק</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>


            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      {gameOn && (
        <View style={styles.container2}>
          <View style={styles.gamesWrapper}>
            <View style={styles.topLine2}>
              <TouchableOpacity onPress={handlePressHome}>
                <View style={styles.home2}>
                  <Ionicons name="home" size={18} color="white" />
                </View>
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
    backgroundColor: theme.colors.backgroundColor,

  },
  gamesWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.header,
    fontWeight: "bold",
    width: "80%",
    alignSelf: "flex-end",
    textAlign: 'right',
    color: theme.colors.primaryBlack,
  },
  games: {},

  plus: {
    backgroundColor: theme.colors.buttonBackgroundColor,
    color: theme.colors.white,
    borderRadius: theme.sizes.medium / 2,
    // fontSize: 18,
    width: theme.sizes.medium,
    height: theme.sizes.medium,
    textAlign: 'center',
    overflow: 'hidden',
  },
  addGame: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 10,
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
    marginTop: 10,
  },
  addIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  topLine: {
    display: 'flex',
    flexDirection: "row-reverse",
    justifyContent: "space-between"

  },
  home: {
    backgroundColor: theme.colors.buttonBackgroundColor,
    borderRadius: theme.sizes.large / 2,
    width: theme.sizes.large,
    height: theme.sizes.large,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  playButton: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.buttonBackgroundColor,
    borderRadius: theme.sizes.xlarge / 2,
    width: theme.sizes.xlarge,
    height: theme.sizes.xlarge,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
    marginTop: 50,
  },

  playButtonText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  playButtonTextBox: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.white,
  },

  container2: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    justifyContent: 'space-between',
    // rowGap: 20,

  },
  topLine2: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingBottom: 50,


  },
  home2: {
    backgroundColor: theme.colors.buttonBackgroundColor,
    borderRadius: theme.sizes.large / 2,
    width: theme.sizes.large,
    height: theme.sizes.large,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  GameText: {
    fontSize: theme.fontSizes.xlarge,
    padding: 10,
    textAlign: 'center'

  },

  playButton2: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryRed,
    borderRadius: theme.sizes.xlarge / 2,
    width: theme.sizes.xlarge,
    height: theme.sizes.xlarge,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
    marginTop: 120,
  },


});
