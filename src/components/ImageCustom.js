import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, ActivityIndicator, View, TouchableOpacity, Dimensions } from 'react-native'
// create a component


const ImageCustom = (props)=> {
    const [isLoading, setLoading] = useState(true)
    const [link, setLink] = useState(props.link)

    useEffect(() => {
        setLoading(true)
        setLink(props.link)
    }, [props.link])

    const { LoadingColor = "red", viewStyle, onPress, ImageStyle, resizeMode="contain" } = props
    return (
        <TouchableOpacity style={[styles.view1, props.style]} activeOpacity={1} onPress={()=> onPress && onPress()}>
                <Image
                onLoadEnd={() => setLoading(false)}
                source={link ? { uri: `${link}` } : {uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'}}
                style={[styles.images, ImageStyle]}
                resizeMode={resizeMode}
                onError={() => setLoading(false)}
            />
            {!isLoading ? null : <ActivityIndicator color={LoadingColor} size="small" style={{ position: 'absolute' }} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    view1: { justifyContent: 'center', alignItems: 'center', height: 100, width: 100 },
    images: { height: '95%', width: '95%', borderRadius: 100 },
})

export default ImageCustom;
