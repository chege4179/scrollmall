import React from 'react';

import {Text, View,TouchableOpacity,Image,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from "react-native-elements";


const ChatRoom = ({ receiver,imageUrl,unread,messages,lastText,time }) => {
    const navigation = useNavigation()
    const NavigateToChatRoom = () => {
        navigation.navigate('ChatPage',{ receiver,messages, })

    }
    return (
        <ListItem onPress={NavigateToChatRoom} bottomDivider>

            <View style={styles.container}>
                <Image style={{width:55,height:55,borderRadius:27.5,marginRight:20,marginLeft:10}}
                source={{uri:imageUrl}}/>
                <View style={{flex:1}}>
                    <View style={{ justifyContent:'space-between',flexDirection: 'row',flex:1,
                        marginTop:10,
                        }}>
                        <ListItem.Title style={{ fontSize:18,color:'black' }}>{receiver}</ListItem.Title>
                        {unread !== 0 && (
                            <View style={styles.unread}>

                                <Text style={{color:'white'}}>{unread}</Text>
                            </View>
                        )}


                    </View>
                    <View style={{ justifyContent:'space-between',flexDirection: 'row' ,flex:1}}>
                        <ListItem.Subtitle style={{paddingRight:30,fontSize:12,color:'black'}}>{lastText}</ListItem.Subtitle>
                        <Text style={{paddingRight:30}}>{time}</Text>
                    </View>
                </View>
            </View>
        </ListItem>
    );
};
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:65,
        flexDirection:'row',
        alignItems:'center'

    },
    unread:{
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'black',
        width:30,
        height: 30,
        marginRight:20,
        borderRadius:15,
        alignItems: 'center',
        justifyContent:'center'
    }
})
export default ChatRoom;
