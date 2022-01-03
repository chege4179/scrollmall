import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ActivityIndicator,
    View,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    RefreshControl
} from 'react-native';
import Product from "../../Components/Product";
import BaseURL from "../../BaseURL";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import Category from "../../Components/Category";
import { Searchbar } from "react-native-paper";

const HomePage = ({ navigation }) => {

    const [searchTerm,setSearchTerm] = useState('')
    const [products,setProducts] = useState([])
    const [Loader,setLoader] = useState(false)

    useEffect(() => {
        const GetAllProducts = axios.get(`${BaseURL}/product/allProducts`)
                .then((res) => {
                    setProducts(res.data.products)

                })
                .catch((err) => {
                    console.log(err)
                    ToastAndroid.show('Please check your internet connection',ToastAndroid.SHORT)
                })
        return GetAllProducts
    },[])

    const categories = [
        {
            id:13,
            name:'Shops',
        },
        {
            id:6,
            name:'Fashion'
        },
        {
            id:1,
            name:'Health and Beauty'
        },
        {
            id:2,
            name:'Home and Office'
        },
        {
            id:3,
            name:'Phone and Tablets'
        },
        {
            id:4,
            name:'Computing'
        },
        {
            id:5,
            name:'Electronics'
        },

        {
            id:7,
            name:'Food'
        },
        {
            id:8,
            name:'Real Estate'
        },
        {
            id:9,
            name:'Gaming'
        },
        {
            id:10,
            name:'Customer Services'
        },
        {
            id:11,
            name:'Baby Products'
        },
        {
            id:12,
            name:'Sporting Goods'
        }
    ]
    const SearchProducts  =(text) => {
        axios.get(`${BaseURL}/product/search?query=${text}`)
            .then((res) => {
                setSearchTerm(text)
                setLoader(true)
                setProducts(res.data.searchresults)
                setLoader(false)
            })
            .catch((err) => {
                console.warn('ERROR MESSAGE FOR SEARCH QUERY : ',err)
                ToastAndroid.show('Check your Internet Connection',ToastAndroid.SHORT)
            })
    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refresh,setRefresh] = useState(false)
    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
            />
        }>
            {Loader &&(<ActivityIndicator size='large' animating={Loader} color="#0000ff"
                                          style={styles.loading}/>)}
            <Searchbar placeholder='Continue Shopping' onChangeText={SearchProducts}
            style={{ marginBottom:10,height: 60 }}/>

            <View style={{flexDirection:'row',marginLeft: 10}}>
                <FlatList
                    data={categories} horizontal={true}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item})=> {
                        return(<Category name={item.name} />)
                    }}/>
            </View>

            <View style={styles.container}>
                {products.length === 0 &&(<Text style={{ marginTop:100}}>No results found for {searchTerm}</Text>)}
                {
                    products.map((product) => {

                        return(
                            <Product key={product._id} name={product.name} seller={product.username} price={product.price}
                            imageUrl={product.imageUrl} description={product.description} id={product._id}/>)
                    })
                }

            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text:{
        fontWeight:'500',
        fontSize:20
    },
    search:{
        width:Dimensions.get('screen').width * 0.90,
        flexDirection:'row',
        marginTop:12,
        marginLeft:20,
        marginRight:20,
        marginBottom:15,
        borderRadius: 20,
        backgroundColor:'#cdcdcd',
    },
    input:{
        width:Dimensions.get('screen').width * 0.80,
        backgroundColor:'#cdcdcd',
        borderRadius:17,
        height:45,
    },
    icon:{
        alignItems:'center',
        justifyContent:'center',

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
        marginBottom: 790,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default HomePage;
