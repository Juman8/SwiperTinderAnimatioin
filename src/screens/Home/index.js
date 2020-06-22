import React, { Component } from 'react';
import { Animated, StyleSheet, View, StatusBar } from 'react-native';
import Information from '../Information'
import LoadingScreen from '../../components/LoadingScreen'
import utils from '../../utils'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor:'#F4F4F4'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={{height: 90, backgroundColor: '#999'}} />
      <Information />
      <LoadingScreen ref={_ref=> utils.setLoading(_ref)}/>
      </View>
    )
  }
}

export default App