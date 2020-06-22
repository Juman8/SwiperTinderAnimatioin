import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler'
import Animated from "react-native-reanimated";
import {getProfileUser} from './function'
import Card from './Card'
import utils from '../../utils'
const {
    event,
    concat,
    interpolate,
    Extrapolate,
  } = Animated;

  const {width} = Dimensions.get('screen')


class Information extends React.Component{
  constructor(props){
    super(props)
    this.translationX = new Animated.Value(0);
    this.translationY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this.gestureState = new Animated.Value(State.UNDETERMINED);
    this._onHandlerStateChange = this._onHandlerStateChange.bind(this)
    this.onGestureEvent = event(
        [
          {
            nativeEvent: {
              translationX: this.translationX,
              translationY: this.translationY,
            },
          },
        ],
        { useNativeDriver: true }
    );
    this.state={
      dataUser: {}
    }
  }

  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.swipped(event)
      this.translationX.setValue(0)
      this.translationY.setValue(0)
    }
  };

  componentDidMount(){
    this.callApi()

    // const {translationX} = this
    // const clockX = new Clock();

    // this.translateX = cond(
    //   eq(this.gestureState, State.END),
    //   [
    //     cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
    //       call([translationX], this.swipped),
    //     ]),
    //     translationX,
    //   ],
    //   cond(eq(this.gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX),

    // );
  }

  callApi = () => {
    utils.useLoading(true)
    getProfileUser(this.getData)
  }

  getData = (data) => {
    console.log(data)
    utils.useLoading(false)

    if(data){
      return this.setState({
        dataUser: data
      })
    }

    alert('có lỗi xảy ra xin vui lòng thử lại!')
  }


  

  swipped = (event) => {
    const {translationX} =  event.nativeEvent
    if(Math.abs(translationX)>width*0.4){
      if(translationX>0){
        utils.getNavigation().navigate('PeopleFavourite')
      }else{
        this.callApi()

      }
    }
  }

  render(){
      const {onGestureEvent} = this
      const {dataUser} = this.state
      const rotateZ = concat(
        interpolate(this.translationX, {
          inputRange: [-width/2, width/2],
          outputRange: [30, -30],
          extrapolate: Extrapolate.CLAMP,
        }),
        "deg",
      );

    return(
      <View style={{height: '100%', width: '100%', position: 'absolute', alignItems: 'center'}}>
        <PanGestureHandler 
            onHandlerStateChange={this._onHandlerStateChange}
            {...{onGestureEvent}}
        >
            <Animated.View style={[{height: '50%', width: '90%', marginTop: getStatusBarHeight()}, {
                transform: [
                { translateX: this.translationX },
                { translateY: this.translationY },
                { rotateZ }
              ],
              zIndex: 900
            }]}>
            <Card dataUser={dataUser} />
            </Animated.View>
        </PanGestureHandler>
      </View>
    )
  }
}

export default Information