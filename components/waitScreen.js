

import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av'
import GiftIcon from './presanimation';
import openGift from '../assets/opengift.png'
import ConfettiCannon from 'react-native-confetti-cannon';



export default function WaitScreen(props) {
    //to be later passed in as props
    let starterT = 7
    const [indexToDisplay, setIndextoDisplay] = useState(0);
    const [dispFinalScreen, setDispFinalScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 11));
    const [timeLeft, setTimeLeft] = useState(starterT + randomNumber);


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
                {/* <SwipeEraser></SwipeEraser> */}
                <View style={styles.container3}>
                    <Text multiline={true} style={styles.task}>{props.tasks[indexToDisplay]}</Text>
                    <View style={styles.line2}>
                        <TouchableOpacity onPress={handleNext}>
                            <Text style={styles.prevNext}>הבא</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePrev} >
                            <Text style={styles.prevNext}>הקודם</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleCont}>
                        <Text style={styles.cont}>המשך</Text>
                    </TouchableOpacity>
                </View>
            </>)}
            {(timeLeft === 0) && (dispFinalScreen) && (<>
                <View style={styles.container3}>
                    <Text multiline={true} style={styles.task}>כל הכבוד, ניצחתם!!!</Text>
                    <Image source={openGift} style={styles.gift} />

                    <TouchableOpacity onPress={handleEnd}>
                        <Text style={styles.cont}>סיום</Text>
                    </TouchableOpacity>
                </View>
                <ConfettiCannon count={300} origin={{ x: 100, y: -200 }} explosionSpeed={200} fallSpeed={6000} />
            </>)}
        </View>
    );
}

const styles = StyleSheet.create({
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
    num: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 600,
    },

    container3: {
        // flex: 0.5,
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',


    },
    task: {
        flex: 0.5,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 600,
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

        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },

});
