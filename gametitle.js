import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function GameTitle(props) {
    return (
        <>
            <View style={styles.game}>
                <TouchableOpacity onPress={() => props.onPress(props.id)}>

                    <Text style={styles.gameText}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
            </View>
            <View >
                {(props.id !== 1680865464903) && <TouchableOpacity style={styles.deleteWrapper}>
                    <Text style={styles.deleteButton} onPress={() => props.onDelete(props.id)}>X</Text>
                </TouchableOpacity>}
            </View>
        </>
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
