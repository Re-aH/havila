import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameTitle from './components/gametitle';
import Item from './components/item';
import WaitScreen from './components/waitScreen';
import { theme } from './components/theme';
import openBox from './assets/10a11053-01f8-4b89-a579-d445a9114243.jpg';
import openBox2 from './assets/c4a625f4-d5c8-4d4f-b482-773eb7af0e6b.jpg';
import openBox3 from './assets/imageredback.jpg';






export default function App() {
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState();
  //temporary game list
  const [games, setGames] = useState([{ "id": 1680865464903, "tasks": ["העבר למי שיושב מולך", "שיר \"היום יום הולדת\"' ", "קפצו 10 פעמים על רגל אחת", "צלמו תמונה של כל המשתתפים ביחד", "עשו פרצוף מצחיק", "עשו חיקויי של חיה - והעבירו למי שניחש ראשון", "ריקדו ריקוד קטן"], "title": "משחק לדוגמא" }]);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameOn, setGameOn] = useState(false)

  // openBox3.filter()
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
      const updatedCurrentGame = { ...currentGame, tasks: newTasks };
      setCurrentGame(updatedCurrentGame);

      // Update games array and save to storage
      let newGames = [...games];
      const gameIndex = newGames.findIndex(g => g.id === currentGame.id);
      if (gameIndex !== -1) {
        newGames[gameIndex] = updatedCurrentGame;
        setGames(newGames);
        saveGamesToStorage(newGames);
      }
      // console.log(newTasks, currentGame, index);
    }
  };

  const handleGameTitleChange = (text) => {
    const updatedCurrentGame = {
      ...currentGame,
      title: text
    };
    setCurrentGame(updatedCurrentGame);

    //find the index of the game with this id
    let index = games.findIndex(g => g.id === currentGame.id)
    // console.log(index);

    //replaces this game in games array
    let newGames = [...games];
    newGames.splice(index, 1, updatedCurrentGame);
    // console.log(newGames);
    setGames(newGames);
    saveGamesToStorage(newGames);

  };

  const handleDeleteGame = (id) => {
    //delets the currentGame from games

    // console.log(id);
    if (games) {

      let newGames = games.filter((g) => g.id !== id);
      setGames(newGames)
      // console.log(newGames);
      saveGamesToStorage(newGames);
    }


  }

  const handleChangeItemText = (text, index) => {
    // Keyboard.dismiss();
    // console.log('text is changing');
    // console.log(index, text);
    if (currentGame) {

      let newTasks = currentGame.tasks;
      newTasks[index] = text;
      const updatedCurrentGame = { ...currentGame, tasks: newTasks };
      setCurrentGame(updatedCurrentGame);

      // Update games array and save to storage
      let newGames = [...games];
      const gameIndex = newGames.findIndex(g => g.id === currentGame.id);
      if (gameIndex !== -1) {
        newGames[gameIndex] = updatedCurrentGame;
        setGames(newGames);
        saveGamesToStorage(newGames);
      }
      // console.log(newTasks, currentGame);
    }
  }




  const handleAddItem = () => {
    Keyboard.dismiss();
    const updatedCurrentGame = {
      ...currentGame,
      tasks: [...currentGame.tasks, item]
    };
    setCurrentGame(updatedCurrentGame);

    // Update games array and save to storage
    let newGames = [...games];
    const gameIndex = newGames.findIndex(g => g.id === currentGame.id);
    if (gameIndex !== -1) {
      newGames[gameIndex] = updatedCurrentGame;
      setGames(newGames);
      saveGamesToStorage(newGames);
    }
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
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    saveGamesToStorage(updatedGames);
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
    saveGamesToStorage(newGames);
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
    saveGamesToStorage(newGames);
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

        <ImageBackground source={openBox} style={styles.background} resizeMode="cover">
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
                        <Ionicons name="add-circle" size={theme.sizes.medium} color={theme.colors.buttonBackgroundColor} />
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>

      )}

      {editing && !gameOn && (
        // editing game screen - move to component
        <ImageBackground source={openBox2} style={styles.background} resizeMode="cover">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <ScrollView style={styles.scrollContent}>
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
                      <Ionicons name="home" size={theme.sizes.small} color={theme.colors.white} />
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
                          <Ionicons name="add-circle" size={theme.sizes.medium} color={theme.colors.buttonBackgroundColor} />
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
        </ImageBackground>
      )}
      {gameOn && (
        <ImageBackground source={openBox3} style={styles.background} resizeMode="cover">
          <View style={styles.container2}>
            <View style={styles.gamesWrapper}>
              <View style={styles.topLine2}>
                <TouchableOpacity onPress={handlePressHome}>
                  <View style={styles.home2}>
                    <Ionicons name="home" size={theme.sizes.small} color={theme.colors.white} />
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
        </ImageBackground>




      )
      }
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    tintColor: '#fffdefCC',
    // backgroundColor: theme.colors.backgroundColor,
    zIndex: -1,
    // opacity: 0.5

  },
  container: {
    flex: 1,
    // backgroundColor: theme.colors.backgroundColor,
    opacity: 1,
    backgroundColor: 'transparent',

  },
  scrollContent: {
    flexGrow: 1,
  },
  gamesWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    width: "80%",
    alignSelf: "flex-end",
    textAlign: 'right',
    color: theme.colors.primaryBlack,
    textShadowColor: "rgba(255, 255, 200, 0.89)", // glow color
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // blur amount
    // boxShadow: '0px 0px 9px 7px rgba(219,219,219,1)'


  },
  games: {
    // boxShadow: '0px 0px 9px 7px rgba(219,219,219,1)'
  },

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
    boxShadow: '0px 0px 9px 7px rgba(219,219,219,1)'
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
    backgroundColor: 'transparent',
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
