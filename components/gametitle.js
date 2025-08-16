import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

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
                {(props.id !== 1680865464903) && <TouchableOpacity style={styles.deleteWrapper} onPress={() => props.onDelete(props.id)}>
                    <Ionicons name="close" size={16} color={theme.colors.white} />
                </TouchableOpacity>}
            </View>
        </>
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
