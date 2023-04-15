import React, { useState, useRef } from 'react';
import { StyleSheet, View, PanResponder, Text, Animated } from 'react-native';

export default function SwipeEraser() {
    const [isScratched, setIsScratched] = useState(false);

    const handlePanResponderMove = (evt, gestureState) => {
        const { x0, y0 } = gestureState;
        // Calculate the percentage of the view that has been scratched
        const percentage = (x0) / (SCRATCH_CARD_WIDTH) * 100;
        if (percentage >= 50) { // adjust the percentage threshold based on your needs
            setIsScratched(true);
        }
    };

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: handlePanResponderMove,
        })
    ).current;

    return (
        <View style={styles.container}>
            {!isScratched ? (
                <View style={styles.scratchCard} {...panResponder.panHandlers}>
                    <Text style={styles.scratchCardText}>Scratch to reveal</Text>
                </View>
            ) : (
                <View style={styles.revealed}>
                    <Text style={styles.revealedText}>Secret message</Text>
                </View>
            )}
        </View>
    );
}

const SCRATCH_CARD_WIDTH = 300;
const SCRATCH_CARD_HEIGHT = 150;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scratchCard: {
        width: SCRATCH_CARD_WIDTH,
        height: SCRATCH_CARD_HEIGHT,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scratchCardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    revealed: {
        width: SCRATCH_CARD_WIDTH,
        height: SCRATCH_CARD_HEIGHT,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    revealedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});