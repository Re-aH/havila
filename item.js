

import { TextInput, TouchableOpacity, StyleSheet, View, Text } from 'react-native';


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
                <TouchableOpacity style={styles.deleteWrapper}>
                    <Text style={styles.deleteButton} onPress={() => props.onDelete(props.index)}>X</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    game: {
        padding: 15,
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        marginTop: 20,
    },
    gameText: {
        flexWrap: 'wrap-reverse',
        maxWidth: '100%',
    },
    deleteWrapper: {
        borderRadius: 20,
        backgroundColor: '#fc3535',

        width: 20,
        height: 20,

        position: 'relative',
        bottom: 11,
        alignSelf: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#C0C0C0",
    },
    deleteButton: {
        paddingTop: 1,
        color: 'white',
        textAlign: 'center',
    }


});
