

import { TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
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
        padding: theme.gap.small,
        backgroundColor: theme.colors.lightGray,
        borderRadius: 10,
        borderColor: theme.colors.borderGray,
        borderWidth: 1,
        marginTop: 20,
        boxShadow: '0px 0px 9px 7px rgba(219,219,219,1)'
    },
    gameText: {
        flexWrap: 'wrap-reverse',
        maxWidth: '100%',
        textAlign: 'right',
        color: theme.colors.primaryBlack,

    },
    deleteWrapper: {
        borderRadius: theme.sizes.small / 2,
        backgroundColor: theme.colors.buttonBackgroundColor,
        width: theme.sizes.small,
        height: theme.sizes.small,
        position: 'relative',
        bottom: 11,
        alignSelf: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.borderGray,
        justifyContent: 'center',
        alignItems: 'center',
    }


});
