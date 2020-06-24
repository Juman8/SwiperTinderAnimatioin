import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, AsyncStorage } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import ImageCustom from '../../components/ImageCustom'
import ListBottom from './ListBottom'
import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler'
import utils from '../../utils'

import Animated from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Fontisto'

const {
  event,
  concat,
  interpolate,
  Extrapolate,
  Value,
  cond,
  set,
  startClock,
  spring,
  debug,
  stopClock,
  clockRunning,
  Clock,
  block,
  eq
} = Animated;

const {width} = Dimensions.get('screen')

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(value),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 150,
    mass: 5,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, 0),
      set(state.velocity, -2500),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class CardView extends React.Component{
  constructor(props){
    super(props)
    this.translationX = new Animated.Value(0);
    this.translationY = new Animated.Value(0);
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
      heightImage: 300
    }
    this._onHandlerStateChange = this._onHandlerStateChange.bind(this)
    this.swiper = this.swiper.bind(this)
  }

  _onHandlerStateChange = event => {
    if(this.props.disable) return null
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.swiper(event)
    }
  };

  swiper = (event) => {
    const {translationX} =  event.nativeEvent
    if(Math.abs(translationX)>width*0.4){
      this.translationX.setValue(-width*2)
      this.translationY.setValue(-width*2)
      let isLike = false
      if(translationX>0){
        isLike = true
        this.syncData()
      }
      this.props.swipped(isLike)

    }else{
      this.translationX.setValue(0)
      this.translationY.setValue(0)
    }
  }

  syncData = async() => {
    const {dataUser} = this.props
    const {first, last, title} = dataUser.name
    let newData = await AsyncStorage.getItem("DATABASE")
    newData = newData ? JSON.parse(newData) : []
    let tempUser = {
      name: `${first} ${last} ${title}`,
      phone: dataUser.phone,
      image: dataUser.picture
    }
    let temo = [tempUser].concat(newData)
    AsyncStorage.setItem("DATABASE", JSON.stringify(temo))
  }

  render(){
    const {dataUser={}} = this.props
    const {heightImage} = this.state
    const {picture} = dataUser

    const { translationX } = this
    const rotateZ = concat(
      interpolate(translationX, {
        inputRange: [-width/2, width/2],
        outputRange: [30, -30],
        extrapolate: Extrapolate.CLAMP,
      }),
      "deg",
    );

    const opacityLike = interpolate(translationX, {
      inputRange: [0, width / 2],
      outputRange: [0, 1],
    });

    const opacitySkip = interpolate(translationX, {
        inputRange: [-width/2, 0],
        outputRange: [1, 0],
    })


    return(
      <PanGestureHandler 
        onHandlerStateChange={this._onHandlerStateChange}
        onGestureEvent={!this.props.disable&&this.onGestureEvent}
      >
        <Animated.View style={[{height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#FFFFFF' }, {
          marginTop: getStatusBarHeight(),
          transform: [
                { translateX: this.translationX },
                { translateY: this.translationY },
                { rotateZ }
              ],
              zIndex: 900
        }]} >
        
          <View style={{height: '30%', width: '100%', borderBottomColor: '#666', borderBottomWidth: 1, backgroundColor: '#b8b8b8', justifyContent: 'space-between', flexDirection: 'row'}}>
            {this.props.disable ? null : 
              <>
              <Animated.View style={{opacity: opacityLike}}>
                <Icon name="like" size={28} style={styles.txtView}/>
              </Animated.View>
              <Animated.View style={{opacity: opacitySkip}}>
                <Icon name="dislike" size={28} style={[styles.txtView, {color: 'red'}]}/>
              </Animated.View>
              </>
            }
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <ListBottom dataUser={dataUser}/>
          </View>
          <ImageCustom 
              link={picture}
              style={{height: heightImage/2, width: heightImage/2, backgroundColor: '#f9f9f9', position: 'absolute', marginTop: getStatusBarHeight(), borderRadius: 100, borderColor: '#666', borderWidth: 1 }}
          />
        </Animated.View>
      </PanGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  txtView: {padding: 5,  color: '#03a82f', fontWeight: '700'}
})

export default CardView