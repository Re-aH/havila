import React, { useRef, useEffect } from 'react';
import { Dimensions, View, Image, Animated, StyleSheet, Easing } from 'react-native';
import giftImage from '../assets/gift.png';

const GiftIcon = () => {
    const windowWidth = Dimensions.get('window').width;
    const stripe1 = useRef(new Animated.Value(0)).current;
    const stripe2 = useRef(new Animated.Value(0)).current;
    const stripe3 = useRef(new Animated.Value(0)).current;
    const stripe4 = useRef(new Animated.Value(0)).current;
    const stripe5 = useRef(new Animated.Value(0)).current;
    const stripe6 = useRef(new Animated.Value(0)).current;
    const stripe7 = useRef(new Animated.Value(0)).current;
    const stripe8 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([

                Animated.timing(stripe1, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(stripe2, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 175

                }),

                Animated.timing(stripe3, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 350,
                }),


                Animated.timing(stripe4, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 525
                }),
                Animated.timing(stripe5, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 700
                }),
                Animated.timing(stripe6, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 875

                }),

                Animated.timing(stripe7, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 1050,
                }),


                Animated.timing(stripe8, {
                    toValue: 2,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    delay: 1225
                }),
            ]),
        ).start();
    }, [stripe1, stripe2, stripe3, stripe4, stripe5, stripe6, stripe7, stripe8]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.stripe,

                    {
                        transform: [{
                            translateX: stripe1.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe2,
                    {
                        transform: [{
                            translateX: stripe2.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe3,
                    {
                        transform: [{
                            translateX: stripe3.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe4,
                    {
                        transform: [{
                            translateX: stripe4.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe,

                    {
                        transform: [{
                            translateX: stripe5.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe2,
                    {
                        transform: [{
                            translateX: stripe6.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe3,
                    {
                        transform: [{
                            translateX: stripe7.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.stripe4,
                    {
                        transform: [{
                            translateX: stripe8.interpolate({
                                inputRange: [0, 1, 2],
                                outputRange: [-windowWidth, 0, windowWidth],
                            }),
                        }],
                    },
                ]}
            />
            <Image source={giftImage} style={styles.gift} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 265,
        backgroundColor: 'transparent',
        marginTop: 20,
    },
    stripe: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 60,
        backgroundColor: '#f06868',
    },
    stripe2: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 60,
        backgroundColor: '#fab57a',
    },
    stripe3: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 60,
        backgroundColor: '#edf798',
    },
    stripe4: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 60,
        backgroundColor: '#80d6ff',
    },

    gift: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default GiftIcon;
