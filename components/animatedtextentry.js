import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';
import { useAudioPlayer } from 'expo-audio';
import { theme } from './theme';

const audioSource = require('../assets/ring.mp3');
const AnimatedTextEntry = ({ text }) => {
    const translateX = useRef(new Animated.Value(300)).current;
    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const entryAnimation = Animated.timing(translateX, {
            toValue: 0,
            duration: 100, // Adjust the duration as needed
            useNativeDriver: true,
        });

        const tiltAnimation = Animated.timing(rotate, {
            toValue: 1,
            duration: 100, // Adjust the duration as needed
            useNativeDriver: true,
        });

        const repeatedTiltAnimation = Animated.loop(tiltAnimation, {
            iterations: 4,
        });

        const sequenceAnimation = Animated.sequence([
            entryAnimation,
            Animated.delay(150), // Wait for 500 milliseconds before starting the tilt animation
            repeatedTiltAnimation,
        ]);

        sequenceAnimation.start();
    }, []);

    const player = useAudioPlayer(audioSource);
    useEffect(() => {
        // let soundTextObject = new Audio.Sound();

        const playSoundForText = async () => {
            try {
                player.seekTo(0);
                player.play();
            } catch (error) {
                // console.log('Error playing sound', error);
                console.log('could not play ring', error);
            }
        };


        playSoundForText();


        // return () => {
        //     if (soundTextObject) {
        //         soundTextObject.unloadAsync();
        //     }
        // };
    }, []);

    const tiltInterpolate = rotate.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ['0deg', '5deg', '0deg', '-5deg', '0deg'], // Adjust the tilt angle as needed
    });

    const animatedStyle = {
        transform: [
            { translateX },
            { rotate: tiltInterpolate },
        ],
    };

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Text multiline={true} style={styles.text}>
                {text}
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '65%',
    },
    text: {
        // flex: 1,
        flexWrap: 'wrap',
        fontSize: theme.fontSizes.xlarge,
        fontWeight: 600,
        textAlign: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 254, 202, 0.5)',

    },
});

export default AnimatedTextEntry;
