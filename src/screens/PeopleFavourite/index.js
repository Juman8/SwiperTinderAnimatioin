import React, {useState, useEffect} from 'react'
import {View, FlatList, Text, Clipboard, TouchableOpacity, AsyncStorage} from 'react-native'
import Header from '../../components/Header'
import ImageCustom from '../../components/ImageCustom'
import dataTest from './dataTest'
import utils from '../../utils'

const PeopleFavourite = (props) => {
    const [dataBase, setData] = useState(dataTest)
    useEffect(() => {
        fetchComment()
    }, [])

    async function fetchComment() {
        utils.useLoading(true)
        let newData = await AsyncStorage.getItem("DATABASE")
        utils.useLoading(false)
        if(newData){
            console.log(newTemp)

            let tempData = JSON.parse(newData)
            let newTemp = tempData.concat(dataTest)
            console.log(newTemp)
            setData(newTemp)
        }
    }

    const renderItem = ({item, index})=> {
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
                    <Text style={{fontSize: 18, color: '#666', marginTop: 4}}>Phone: <Text style={{color: '#555'}}>{item.phone}</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }
    console.log(dataBase)
    return(
        <View style={{flex: 1}}>
            <Header title="My Favourite" />
            <FlatList 
                style={{flex: 1}}
                data={dataBase}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    )
}

export default PeopleFavourite