import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, ActivityIndicator, View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Feather'
// create a component
const arrImage = [
    {
        image: (isColor) =>  <Icon name="torsos-all-female" size={25} color={isColor? '#8FB755' : '#999'}/>
    },
    {
        image: (isColor) =>  <Icon1 name="calendar"  size={25} color={isColor? '#8FB755' : '#999'}/>
    },
    {
        image: (isColor) =>  <Icon2 name="map-marked-alt"  size={25} color={isColor? '#8FB755' : '#999'}/>
    },
    {
        image: (isColor) =>  <Icon3 name="phone"  size={25} color={isColor? '#8FB755' : '#999'}/>
    },
    {
        image: (isColor) =>  <Icon2 name="lock"  size={25} color={isColor? '#8FB755' : '#999'}/>
    },
];

const ListBottom = (props)=> {
    const [mIndex, setIndex] = useState(2)
    const [content, setContent] = useState('')

    const { dataUser } = props

    useEffect(()=>{
        setContent(dataUser&&dataUser.location ? dataUser.location.street: '')
    }, [dataUser])
    const onPress = (index) => {
        setIndex(index)
        let newContent = ''
        switch(index){
            case 0: {
                newContent = dataUser.gender
                break;
            }
            case 1: {
                newContent = dataUser.dob
                break;
            }
            case 2: {
                newContent = dataUser.location.street
                break;
            }
            case 3: {
                newContent = dataUser.phone
                break;
            }
            case 4: {
                newContent = dataUser.password
                break;
            }
            
        }
        setContent(newContent)
    }

    const renderTitle = () => {
        switch(mIndex){
            case 0: return 'My gender is';
            case 1: return 'My dob is';
            case 2: return 'My address is';
            case 3: return 'My phone is';
            case 4: return 'My password is';
        }
    }
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{color: '#999', fontSize: 18}}>{renderTitle()}</Text>
            <Text style={{color: '#000', fontSize: 24, marginBottom: 25}}>{content}</Text>

            <View style={{width: '80%', justifyContent: 'space-between', flexDirection: 'row'}}>
            {arrImage.map((it, index)=> {
                let isChecked = index==mIndex
                return(
                    <TouchableOpacity key={`${index}`} style={[{ padding: 10,}, isChecked&&{borderTopColor: '#8FB755', borderTopWidth: 1}]}
                        onPress={()=> onPress(index)}
                    >
                        {it.image(isChecked)}
                    </TouchableOpacity>
                )
            })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default ListBottom;
