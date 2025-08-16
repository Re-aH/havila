

import { TouchableOpacity, StyleSheet, View, Text, Image, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av'
import GiftIcon from './presanimation';
import openGift from '../assets/opengift.png'
import ConfettiCannon from 'react-native-confetti-cannon';
import AnimatedTextEntry from './animatedtextentry';
// import { useWindowSize } from 'react-use'
// import Confetti from 'react-confetti'

// import Confetti from 'react-native-simple-confetti';


export default function WaitScreen(props) {
    //to be later passed in as props
    let starterT = 7
    const [indexToDisplay, setIndextoDisplay] = useState(0);
    const [dispFinalScreen, setDispFinalScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 11));
    const [timeLeft, setTimeLeft] = useState(starterT + randomNumber);
    const { width, height } = useWindowSize()

    useEffect(() => {
        let soundObject = new Audio.Sound();

        const playSound = async () => {
            try {
                await soundObject.loadAsync(require('../assets/partyGroove.mp3'));
                // await soundObject.setIsLoopingAsync(true);
                await soundObject.playAsync();
                setIsPlaying(true);
            } catch (error) {
                // console.log('Error playing sound', error);
                console.log('music has ended');
            }
        };

        if (isPlaying) {
            playSound();
        } else {
            soundObject.stopAsync();
        }

        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        let soundTadaObject = new Audio.Sound();

        const playTada = async () => {
            try {
                await soundTadaObject.loadAsync(require('../assets/tada1.mp3'));
                // await soundTadaObject.setIsLoopingAsync(true);
                await soundTadaObject.playAsync();

            } catch (error) {
                // console.log('Error playing sound', error);
                console.log('music has ended');
            }
        };

        if ((timeLeft === 0) && (dispFinalScreen)) {
            playTada();
        } else {
            soundTadaObject.stopAsync();
        }

        return () => {
            if (soundTadaObject) {
                soundTadaObject.unloadAsync();
            }
        };
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
        <View>
            {(timeLeft > 0) && (<>
                <View style={styles.container4} >
                    <Text style={styles.pass}>העבירו את החבילה</Text>
                    <GiftIcon></GiftIcon>
                    {/* add animation */}
                    {/* <Text style={styles.num}>{timeLeft}</Text> */}
                </View>
            </>)
            }
            {(timeLeft === 0) && (!dispFinalScreen) && (<>

                <View style={styles.container3}>

                    <AnimatedTextEntry text={props.tasks[indexToDisplay]} />

                    {/* <Animated.View style={[
                    styles.taskContainer,
                    {
                        transform: [
                            {
                                translateX: animValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [500, 0],
                                }),
                            },
                        ],
                    },
                ]}> */}

                    {/* <Text multiline={true} style={styles.task}>{props.tasks[indexToDisplay]}</Text> */}
                    {/* </Animated.View> */}


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
            </>)}
            {(timeLeft === 0) && (dispFinalScreen) && (<>
                <View style={styles.containerWinMsg}>
                    <Text multiline={true} style={styles.win}>כל הכבוד, ניצחתם!!!</Text>
                    {/* <View style={height = 5}></View> */}

                    <Image source={openGift} style={styles.gift} />

                    <TouchableOpacity onPress={handleEnd}>
                        <Text style={styles.cont}>סיום</Text>
                    </TouchableOpacity>
                    <ConfettiCannon count={300} origin={{ x: 100, y: -200 }} explosionSpeed={200} fallSpeed={6000} />
                    {/* <Confetti
                        width={width}
                        height={height}
                        run={true}
                        numberOfPieces={300}
                        recycle={false}
                    /> */}
                    {/* <Confetti count={250} type="fall" /> */}
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
        // flex: 0.5,
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'space-around',


    },
    pass: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
    },
    // num: {
    //     textAlign: 'center',
    //     fontSize: 50,
    //     fontWeight: 600,
    // },

    container3: {
        // flex: 0.5,
        height: '89%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    containerWinMsg: {
        // flex: 0.5,
        height: '93%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginTop: -20,
        position: 'relative',
        // flex: 1,       // bottom: -10
    },
    task: {
        flex: 0.5,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,

    },
    win: {
        // flex: 0.5,
        position: 'relative',
        bottom: 20,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
        zIndex: 100,
        marginBottom: 10,
    },
    line2: {
        display: 'flex',
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    prevNext: {
        fontSize: 14,
        padding: 3,
        marginHorizontal: 10,
        backgroundColor: '#f5dcdc',
        borderRadius: 7,
        textAlign: 'center',
        width: 80,
        overflow: 'hidden',
        opacity: 0.6,
    },
    cont: {
        fontSize: 24,
        padding: 5,
        backgroundColor: '#fc3535',
        color: 'white',
        borderRadius: 7,
        textAlign: 'center',
        width: 100,
        overflow: 'hidden',
        alignSelf: 'center',

        // flex: 1,
    },
    gift: {

        marginTop: 0,
        marginBottom: 60,
        alignSelf: 'center',
        width: 180,
        height: 180,
        resizeMode: 'contain',
        zIndex: -10,
    },

});
