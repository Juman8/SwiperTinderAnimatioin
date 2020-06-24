import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import {getProfileUser} from './function'
import Card from './Card'
import utils from '../../utils'
import {Shadow} from '../../utils/colors'
import Icon from 'react-native-vector-icons/Feather'

import Animated from "react-native-reanimated";

const AnimaTouch = Animated.createAnimatedComponent(TouchableOpacity)

const {
  block,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  Value,
  spring,
  set,
  cond,
  debug
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(50),
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
      set(state.position, value),
      set(state.velocity, -2500),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
class Information extends React.Component{
  constructor(props){
    super(props)
    
    this.state={
      dataUser: []
    }
    this._trans = runSpring(new Clock(), 10, 50);
  }

  componentDidMount(){
    getProfileUser(this.getData)
  }

  getData = (data) => {
    if(data){
      this.setState({
        dataUser: [data]
      }, () => getProfileUser(this.getDataSecond))
    }
  }

  getDataSecond = (data) => {
    const {dataUser} = this.state
    utils.useLoading(false)

    if(data){
      this.setState({
        dataUser: dataUser.concat(data)
      })
    }
  }

  swipped = (isLike) => {
    const {dataUser} = this.state
    if(isLike){
      this._trans = runSpring(new Clock(), 50, 50);
    }
    utils.useLoading(true)
    
    let newData = dataUser.filter((el, index)=> index)
      this.setState({
        dataUser: newData
      }, () => {
        getProfileUser(this.getDataSecond)
    })
  }

  render(){
    const {dataUser} = this.state
    const mLength = dataUser.length<2
    return(
      <View style={{height: '100%', width: '100%', position: 'absolute', alignItems: 'center'}}>
        <View style={{height: '50%', width: '90%', minHeight: 320}}>
          <View style={{position: 'absolute', height: '100%', width: '100%'}}>
            <Card disable dataUser={mLength ? dataUser[0] : dataUser[1]} swipped={this.swipped}/>
          </View>
        {mLength? null :
          <Card dataUser={dataUser[0]} swipped={this.swipped}/>
        }
        </View>

        <AnimaTouch onPress={()=> {
          utils.getNavigation().navigate('PeopleFavourite')
        }} style={[styles.btn, {width: this._trans, height: this._trans}]}>
          <Icon name="list" size={25} style={{padding: 10}}/>
        </AnimaTouch>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute', bottom: 50, right: 15, height: 50, width: 50, backgroundColor: 'rgba(252, 3, 3, 0.5)', borderRadius: 100,
    ...Shadow, alignItems: 'center', justifyContent: 'center'
  }
})

export default Information