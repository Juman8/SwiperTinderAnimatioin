import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import ImageCustom from '../../components/ImageCustom'
import ListBottom from './ListBottom'
class CardView extends React.Component{
    state={
        heightImage: 300
    }
  render(){
    const {dataUser} = this.props
    const {heightImage} = this.state
    const {picture} = dataUser
    return(
      <View style={{height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#FFFFFF' }}
        onLayout={ev=> this.setState({heightImage: ev.nativeEvent.layout.width})} >
      
        <View style={{height: '30%', width: '100%', borderBottomColor: '#666', borderBottomWidth: 1, backgroundColor: '#b8b8b8'}}>

        </View>
        

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <ListBottom dataUser={dataUser}/>
        </View>
        <ImageCustom 
            link={picture}
            style={{height: heightImage/2, width: heightImage/2, backgroundColor: '#f9f9f9', position: 'absolute', marginTop: getStatusBarHeight(), borderRadius: 100, borderColor: '#666', borderWidth: 1 }}
        />
      </View>
    )
  }
}

export default CardView