

import { TouchableOpacity, StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
// import { Audio } from 'expo-av';
import { useAudioPlayer } from 'expo-audio';
import GiftIcon from './presanimation';
import openGift from '../assets/openboxnoback.png'
import ConfettiCannon from 'react-native-confetti-cannon';
import AnimatedTextEntry from './animatedtextentry';
import { theme } from './theme';

const partyGroove = require('../assets/partyGroove.mp3');
const tada = require('../assets/tada1.mp3');
const height = Dimensions.get('window').height;
export default function WaitScreen(props) {
    //to be later passed in as props
    let starterT = 7
    const [indexToDisplay, setIndextoDisplay] = useState(0);
    const [dispFinalScreen, setDispFinalScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 11));
    const [timeLeft, setTimeLeft] = useState(starterT + randomNumber);


    const player1 = useAudioPlayer(partyGroove);
    const player2 = useAudioPlayer(tada);
    useEffect(() => {

        if (isPlaying) {
            player1.seekTo(0);
            player1.play();
        } else {
            // soundObject.stopAsync();
            player1.pause();
        }


    }, [isPlaying]);

    useEffect(() => {
        // let soundTadaObject = new Audio.Sound();

        // const loadTada = async () => {
        //     try {
        //         await soundTadaObject.loadAsync(require('../assets/tada1.mp3'));
        //     } catch (error) {
        //         console.log('Error loading tada sound', error);
        //     }
        // };

        // loadTada();

        // const playTada = async () => {
        //     try {
        //         await soundTadaObject.playAsync();
        //     } catch (error) {
        //         console.log('Error playing tada sound', error);
        //     }
        // };



        if (timeLeft === 0 && dispFinalScreen) {
            // console.log('hihihi');
            player1.pause()
            player2.seekTo(0);
            player2.play();


            // playTada();
            // setIsPlaying(true); // Mark as playing to avoid re-triggering
        }


        // return () => {
        //     if (soundTadaObject) {
        //         soundTadaObject.unloadAsync();
        //     }
        // };
    }, [timeLeft, dispFinalScreen]);


    useEffect(() => {
        if (!timeLeft) {
            setIsPlaying(false);
            return;
        }
        // display task 
        setIsPlaying(true);
        const timer = setTimeout(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleNext = () => {
        if (indexToDisplay < props.tasks.length - 1) {
            setIndextoDisplay((indexToDisplay) => indexToDisplay + 1)
        } else {
            setDispFinalScreen(true)
        }
    };

    const handlePrev = () => {
        if (indexToDisplay > 0) {
            setIndextoDisplay((indexToDisplay) => indexToDisplay - 1)
        }
    };

    const handleCont = () => {
        setRandomNumber(Math.floor(Math.random() * 9))
        setTimeLeft(starterT + randomNumber)
        // console.log(timeLeft);
        if (indexToDisplay !== props.tasks.length - 1) {

            setIndextoDisplay((indexToDisplay) => indexToDisplay + 1)

        }
        else {
            // display final screen

            setDispFinalScreen(true)

        }
    };

    const handleEnd = () => {
        setDispFinalScreen(false)
        props.home()
    }







    return (
        <View style={styles.mainContainer}>
            {(timeLeft > 0) && (<>
                <View style={styles.container4} >
                    <Text style={styles.pass}>העבירו את החבילה</Text>
                    <GiftIcon></GiftIcon>

                </View>
            </>)
            }
            {(timeLeft === 0) && (!dispFinalScreen) && (<>

                <View style={styles.container3}>
                    <View style={{ flex: 3 }}>
                        <AnimatedTextEntry text={props.tasks[indexToDisplay]} />
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                        <View style={styles.line2}>
                            <TouchableOpacity onPress={handleNext}>
                                <Text style={styles.prevNext}>דלג</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePrev} >
                                <Text style={styles.prevNext}>חזור</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleCont}>
                            <Text style={styles.cont}>המשך</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>)}
            {(timeLeft === 0) && (dispFinalScreen) && (<>
                <View style={styles.containerWinMsg}>
                    <Text multiline={true} style={styles.win}>כל הכבוד, ניצחתם!!!</Text>


                    <Image source={openGift} style={styles.gift} />

                    <TouchableOpacity onPress={handleEnd}>
                        <Text style={styles.cont}>סיום</Text>
                    </TouchableOpacity>
                    <ConfettiCannon count={300} origin={{ x: 100, y: -200 }} explosionSpeed={200} fallSpeed={6000} />

                </View>
            </>)}
        </View>
    );
}

const styles = StyleSheet.create({

    taskContainer: {
        alignSelf: 'center'
    },
    container4: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        // marginBottom: 65,


    },
    pass: {
        textAlign: 'center',
        fontSize: theme.fontSizes.xlarge,
        fontWeight: 600,
        backgroundColor: 'rgba(255, 254, 202, 0.5)',
        marginBottom: theme.sizes.small,
    },


    container3: {

        height: height * 0.72,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    containerWinMsg: {
        // backgroundColor: 'red',
        maxHeight: height * 0.9, // never taller than screen
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        position: 'relative',

    },
    task: {
        flex: 0.5,
        textAlign: 'center',
        fontSize: theme.fontSizes.xlarge,
        fontWeight: 600,
        // backgroundColor: 'rgba(255, 254, 202, 0.5)',

    },
    win: {
        position: 'relative',
        bottom: 20,
        textAlign: 'center',
        fontSize: theme.fontSizes.xlarge,
        fontWeight: 600,
        zIndex: 100,
        marginBottom: theme.sizes.small,
        backgroundColor: 'rgba(255, 254, 202, 0.5)',
    },
    line2: {
        display: 'flex',
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: theme.sizes.small,
        marginRight: theme.sizes.small,
    },
    prevNext: {
        fontSize: theme.fontSizes.small,
        padding: 4,
        marginHorizontal: theme.sizes.small,
        backgroundColor: theme.colors.lightGray,
        borderRadius: 7,
        textAlign: 'center',
        width: 80,
        overflow: 'hidden',
        opacity: 0.6,
        lineHeight: theme.fontSizes.small * 1.4, // ensures text fits well
        minHeight: 36,                // guarantees enough height
    },
    cont: {
        fontSize: theme.fontSizes.header,
        padding: 5,
        backgroundColor: theme.colors.buttonBackgroundColor,
        color: theme.colors.white,
        borderRadius: 7,
        textAlign: 'center',
        width: 100,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    gift: {
        alignSelf: 'center',
        // width: 200,
        height: height * 0.33,
        resizeMode: 'contain',
        marginBottom: height * 0.15,
        marginTop: height * 0.02,
    },

});
