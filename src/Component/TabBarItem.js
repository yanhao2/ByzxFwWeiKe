/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {StyleSheet,Image} from 'react-native';
type Props = {
    normalImage: any,
    selectedImage: any,
    focused: boolean,
    tintColor: any,
}
type State = {

}
export default class TabBarItem extends PureComponent<Props,State> {
    render() {
        let {normalImage, selectedImage, focused, tintColor} = this.props;
        return (
            <Image
                source={focused ? selectedImage : normalImage}
                style={{width: 20,height: 20, tintColor: tintColor}}
            />
        );
    }
}

const styles = StyleSheet.create({
});

