import React, {useState, useCallback} from 'react'
import {View, FlatList, Text, Clipboard, TouchableOpacity} from 'react-native'
import Header from '../../components/Header'
import ImageCustom from '../../components/ImageCustom'
import dataTest from './dataTest'
import utils from '../../utils'

const PeopleFavourite = (props) => {

    const renderItem = (item, index)=> {
        return(
            <TouchableOpacity onPress={()=> {
                utils.showToast('Đã copy', 1000, 'success')
                Clipboard.setString(item.name)
            }} style={{marginTop: 10, flexDirection: 'row'}}>
                <View style={{height: 100, width: 100, borderRadius: 100, marginLeft: 10}} >
                    <ImageCustom link={item.image} 
                        style={{height: 100, width: 100, borderRadius: 100}} 
                        ImageStyle={{borderRadius: 100, width: 100, height: 100}}
                        resizeMode="cover"
                    />
                </View>
                <View  style={{flex: 1, marginLeft: 10}}>
                    <Text style={{fontSize: 24, color: '#000', marginTop: 15}}>{item.name}</Text>
                    <Text style={{fontSize: 18, color: '#666', marginTop: 4}}>Popularity: <Text style={{color: '#ff0000'}}>{100 - index/5}</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }
    return(
        <View style={{flex: 1}}>
            <Header title="Favourite" />
            <FlatList 
                style={{flex: 1}}
                data={dataTest}
                renderItem={({item, index})=> renderItem(item, index)}
            />
        </View>
    )
}

export default PeopleFavourite