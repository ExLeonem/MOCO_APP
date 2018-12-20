import {StyleSheet} from 'react-native';



const withFooter = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    content: {
        flex: 1,
    },
    footer: {
        position: 'relative',
        flex: 0,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export {
    withFooter
}