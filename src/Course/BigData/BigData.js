import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Utils from "../../Store/Utils";
import CourseComponent from '../../Component/CourseComponent/CourseComponent';
export default class BigData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount () {
    }
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.messageHeader}>
                    <TouchableOpacity activeOpacity={0.8}
                                      navigator={this.props.navigator}
                                      onPress={this.onBackButton.bind(this)}>
                        <View style={styles.headerLeft}>
                            <Image
                                style={styles.messageHeaderBack}
                                source={require('../../Image/Back.png')}
                            />
                        </View>
                    </TouchableOpacity>
                    <Animated.Text numberOfLines={1} style={[styles.messageHeaderTitle]}>{this.props.navigation.state.params.name}</Animated.Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.headerRight} >
                            <Text style={styles.headerRightText}>{}</Text>
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <CourseComponent catId={this.props.navigation.state.params.catId} navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
    // 返回
    onBackButton () {
        this.props.navigation.goBack()
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messageHeader: {
        height: (Utils.size.os === 'ios') ? 74 : 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: ( Utils.size.os === 'ios') ? 30 : 0,
        backgroundColor: '#fff',
    },
    messageHeaderTitle: {
        color: '#101010',
        fontWeight: 'bold',
        fontSize: Utils.setSpText(17),
    },
    messageHeaderBack: {
        width: 20,
        height: 20,
    },
    headerLeft: {
        width: 50,
    },
    headerRight: {
        width: 50,
        flexDirection:'row-reverse',
    },
    // 内容
    UserDetailsImg: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    UserDetailsImgActaver: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    UserDetailsActaverName: {
        paddingTop: 10,
        fontSize: Utils.setSpText(14),
        color: '#101010'
    }
});

