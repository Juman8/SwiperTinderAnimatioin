import React, { Component } from 'react';
import { View, Modal, StyleSheet, Text, ActivityIndicator } from 'react-native';
var Spinner = require('react-native-spinkit');
class LoadingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visiable: false
        }
    }

    showHideLoading(visiable) {
        this.setState({
            visiable: visiable
        })
    }

    render() {
        var { colorText, activityIndicator } = this.props;
        const {visiable} = this.state
        // if(!visiable){
        //     return null
        // }
        if(!visiable){
            return null
        }
        return (
                <View style={styles.view1}>
                    <Spinner
                        style={styles.spinner}
                        isVisible={visiable}
                        size={30}
                        type={"ThreeBounce"}
                        color={"rgba(25, 111, 243, 0.6)"} />
                    <Text style={[styles.text1, { color: (colorText) ? colorText : "rgba(150, 153, 155, 1)" }]}>Đang tải dữ liệu</Text>
                </View>
        )
    }
}
export default LoadingScreen;
const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    spinner: {

    },
    text1: {
        fontSize: 13,
        color: "rgba(150, 153, 155, 1)"
    }
});