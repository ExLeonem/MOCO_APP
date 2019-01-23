import {StyleSheet} from 'react-native';
import {white} from '../colors';



const withFooter = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: white.hex()
    },
    content: {
        flex: 1,
    },
    footer: {
        position: 'relative',
        flex: 0,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginRight: 40
    }
});


export {
    withFooter
}