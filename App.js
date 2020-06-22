import React, { Component } from 'react';
import { Animated, YellowBox, View, StatusBar } from 'react-native';
import LoadingScreen from './src/components/LoadingScreen'
import AppContent from './src/navigation/stack'
import { Toast } from 'rn-simple-toast';
import utils from './src/utils'

class App extends React.Component{
  constructor(props){
    super(props)
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
    console.disableYellowBox = true;
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor:'#F4F4F4'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <AppContent />
      <LoadingScreen ref={_ref=> utils.setLoading(_ref)}/>
      <Toast ref={_ref => utils.setToast(_ref)} />
      </View>
    )
  }
}

export default App