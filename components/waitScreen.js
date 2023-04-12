

import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';


export default function WaitScreen(props) {
    //to be later passed in as props
    let starterT = 5
    const [timeLeft, setTimeLeft] = useState(starterT);
    const [indexToDisplay, setIndextoDisplay] = useState(0)
    const [dispFinalScreen, setDispFinalScreen] = useState(false)

    useEffect(() => {
        if (!timeLeft) return;
        // display task 
        const timer = setTimeout(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleNext = () => {

    };

    const handlePrev = () => {

    };

    const handleCont = () => {
        if (indexToDisplay !== props.tasks.length - 1) {
            setTimeLeft(starterT)
            setIndextoDisplay((indexToDisplay) => indexToDisplay + 1)
        }
        else {
            // display final screen
            setTimeLeft(starterT)
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
                    {/* add sound */}
                    {/* add animation */}
                    <Text style={styles.num}>{timeLeft}</Text>
                </View>
            </>)
            }
            {(timeLeft === 0) && (!dispFinalScreen) && (<>
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
                    <View style={styles.line2}>
                        {/* add picture or animation */}
                    </View>
                    <TouchableOpacity onPress={handleEnd}>
                        <Text style={styles.cont}>סיום</Text>
                    </TouchableOpacity>
                </View>
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

});
