import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native'; 
import {green, blue, red} from '../colors';
import {AddIcon, RemoveIcon, CheckIcon, BackIcon, ForwardIcon} from './icons';


// color prop of CircleButton must be of type Colors
export default class CircleButton extends React.Component {

    constructor(props) {
        super(props)
        if(!this.props.type) {
            // throw mandatory exception
        } else {
            this.props.type = this.props.type.toLowerCase();
        }
    }

    renderIcon(type, color, size) {
        switch(type) {
            case "remove": return <RemoveIcon scaleBy={size} color={color}/>
            case "back": return <BackIcon scaleBy={size} color={color}/>
            case "check": return <CheckIcon scaleBy={size} color={color}/>
            case "forward": return <ForwardIcon scaleBy={size} color={color}/>
            default: return <AddIcon scaleBy={size} color={color}/>
        }
    }

    __getIconColor(type) {
        switch(type) {
            case "remove": return red
            case "check": return green
            default: return blue
        }
    }

    __genStyles(color, size = 60) {
        return StyleSheet.create({
            iconContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
                minHeight: size,
                minWidth: size,
                maxHeight: size,
                maxWidth: size,
                borderWidth: 4,
                borderColor: color.hex(),
                borderRadius: Math.round(size/2),
            }
        });
    }

    __iconCircleRatio() {
        let size = this.props.size || 70;
        let defaultSize = 70;
        let borderWidth = 4;
        let scaleImage = 8;
    
        if(size != defaultSize) {
            borderWidth = (borderWidth * size)/defaultSize;
            scaleImage = (scaleImage * size)/defaultSize;
        }
    }

    render() {
        let {type, size, onPress, style} = this.props;
        let color = this.__getIconColor(type);
        let buttonStyle = this.__genStyles(color, size);
        return(
            <View style={style}>
                <TouchableHighlight style={buttonStyle.iconContainer} onPress={onPress} underlayColor={color.lighten(0.8).hex()} activeOpacity={0.3}>
                    {this.renderIcon(type, color.hex(), 8)}
                </TouchableHighlight>
            </View>
        );
    }

}


