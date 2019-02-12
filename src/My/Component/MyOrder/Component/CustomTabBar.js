import React,{Component} from 'react'
import {StyleSheet,
    Text,
    View,
    Animated,
    TouchableNativeFeedback,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native'


export default class CustomTabBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDefaultColor: '#08086b',
            inactiveDefaultColor: '#fff'
        }
    }

    _renderTab(name, page, isTabActive, onPressHandler) {
        const { textStyle } = this.props;
        const containerWidth = this.props.containerWidth;
        const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor;

        const fontWeight = isTabActive ? 'bold' : 'normal';
        const fontSize = isTabActive ? 17 : 15;
        const Button = Platform.OS === 'ios' ? ButtonIos : ButtonAndroid;
        return (<Button
            style={{flex: 1}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            // accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab]}>
                <Text style={{ fontWeight :  fontWeight, fontSize: fontSize}}>
                    {name}
                </Text>
            </View>
        </Button>);
    }

    _renderUnderline() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const underlineWidth = this.props.tabUnderlineDefaultWidth ? this.props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2);
        const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;


        const deLen = (this.props.style.width ) / 2 - (underlineWidth  *  2) - 5;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: underlineWidth,
            height: 2,
            borderRadius: 2,
            backgroundColor: this.props.activeColor,
            bottom: 0,
            left: deLen
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  this.props.style.width / numberOfTabs],
        });

        const scaleValue = (defaultScale) => {
            let number = 4
            let arr = new Array(number * 2)
            return arr.fill(0).reduce(function(pre, cur, idx){
                idx === 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx-1] + 0.5);
                idx%2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
                return pre
            }, {inputRange: [], outputRange: []})
        }

        const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));

        return(
            <Animated.View
                style={[
                    tabUnderlineStyle,
                    {
                        transform: [
                            { translateX },
                            { scaleX }
                        ],
                    },
                    this.props.underlineStyle,
                ]}
            />
        )
    }

    render() {
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor}, this.props.style]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return this._renderTab(name, page, isTabActive, this.props.goToPage)
                })}
                {
                    this._renderUnderline()
                }
            </View>
        );
    };
}



const ButtonAndroid = (props) => (
    <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()}
        {...props}
    >
        {props.children}
    </TouchableNativeFeedback>);

const ButtonIos = (props) => (<TouchableOpacity {...props}>
    {props.children}
</TouchableOpacity>);


const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        // borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        // borderColor: '#E6E6E6',
    },
    tabWidth: {
        width: 100,
        backgroundColor: '#fff',
    }
});
