

import { TextInput, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';


export default function Item(props) {

    return (
        <View>

            <View style={styles.game}>
                <TouchableOpacity >
                    <TextInput
                        style={styles.gameText}
                        value={props.text}
                        onChangeText={(text) => props.onChangeText(text, props.index)}
                        multiline={true}
                        returnKeyType='done'></TextInput>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={styles.deleteWrapper} onPress={() => props.onDelete(props.index)}>
                    <Ionicons name="close" size={16} color={theme.colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    game: {
        padding: 15,
        backgroundColor: theme.colors.lightGray,
        borderRadius: 10,
        borderColor: theme.colors.borderGray,
        borderWidth: 1,
        marginTop: 20,
    },
    gameText: {
        flexWrap: 'wrap-reverse',
        maxWidth: '100%',
        textAlign: 'right',

    },
    deleteWrapper: {
        borderRadius: 20,
        backgroundColor: theme.colors.buttonBackgroundColor,
        width: 20,
        height: 20,
        position: 'relative',
        bottom: 11,
        alignSelf: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.borderGray,
        justifyContent: 'center',
        alignItems: 'center',
    }


});
