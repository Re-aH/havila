
import { TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';


export default function Item(props) {

    return (
        <View style={styles.game}>
            <TouchableOpacity >
                <TextInput
                    style={styles.gameText}
                    value={props.text}
                    onChangeText={(text) => props.onChangeText(text, props.index)}></TextInput>
            </TouchableOpacity>
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
    }

});
