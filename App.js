import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import GameTitle from './components/gametitle';
import Item from './components/item';

export default function App() {
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState();
  const [taskItems, setTaskItems] = useState([]);
  //temporary game list
  const [games, setGames] = useState([{ "id": 1680865464903, "tasks": ["t1", "t2"], "title": "g1" }, { "id": 1680865487384, "tasks": ["t11", "t22"], "title": "g2" }]);
  const [currentGame, setCurrentGame] = useState(null);
  const [title, setTitle] = useState();

  const handleGameTitleChange = (text) => {
    setCurrentGame({
      ...currentGame,
      title: text
    });
    //delets the currentGame from games
    // setGames(games.filter(g => g.id !== currentGame.id))

    //find the index of the game with this id
    let index = games.findIndex(g => g.id === currentGame.id)
    // console.log(index);

    //replaces this game in games array
    let newGames = [...games];
    newGames.splice(index, 1, currentGame);
    // console.log(newGames);
    setGames(newGames);

  };

  const handleChangeItemText = (text, index) => {
    // Keyboard.dismiss();
    // console.log('text is changing');
    // console.log(index, text);
    if (currentGame) {

      let newTasks = currentGame.tasks;
      // let newTasks = ['a', 'b', 'c'];
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


  }, [editing, games, currentGame,]);

  const handlePressPlus = () => {
    setCurrentGame({
      id: Date.now(),
      title: "",
      tasks: []
    });
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

    setCurrentGame(null);
    setEditing(false);
    setTitle("");
    setTaskItems([]);
  };


  const handlePressGame = (id) => {
    const game = games.find((game) => game.id === id);
    setCurrentGame(game);
    setTitle(game.title);
    setTaskItems(game.tasks);
    setEditing(true);
    // console.log(currentGame);
  };

  return (
    <>
      {!editing && (
        //Home screen - move to component?
        <View style={styles.container}>
          <View style={styles.gamesWrapper}>
            <Text style={styles.sectionTitle}>חבילה עוברת</Text>
            <View style={styles.games}>

              {games.map((game) => (
                <GameTitle
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  onPress={() => handlePressGame(game.id)}
                />
              ))}


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
        // editing game screen - move to component
        <View style={styles.container}>
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
                <Item key={index} text={task} index={index} onChangeText={handleChangeItemText} />
              ))}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.addGame}>
                  <TextInput
                    placeholder="משימה חדשה"
                    value={item}
                    onChangeText={text => setItem(text)}
                  />
                  <TouchableOpacity onPress={handleAddItem}>
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
    alignSelf: "flex-end",
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
