import React, { useEffect, useState,useLayoutEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    ToastAndroid,
    Dimensions, FlatList
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import BaseURL from "../../BaseURL";
import SellerCard from "../../Components/SellerCard";
import ShopRoom from "../../Components/ShopRoom";
import Product from "../../Components/Product";

const CategoryPage = ({navigation,route}) => {
    const [isTitleShown,setIsTitleShown] = useState(true)
    const [searchresults,setSearchResults] = useState([])
    const [ProductCategories,setProductCategories] =useState([])
    const { category } = route.params
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:category ==='Shops' ? SearchBar: category,
            headerRight:category ==='Shops' && (() => {
            return (
                <TouchableOpacity style={{marginRight: 15}} onPress={() => setIsTitleShown(false)}>
                    <FontAwesome name='search' size={30}/>
                </TouchableOpacity>)
            })


        })
    },[])
    const SearchShops = (text) => {
        axios.get(`${BaseURL}/shop/search?query=${text}`)
            .then((res) => {
                setSearchResults(res.data.searchresults)
            })
            .catch((err) => {
                ToastAndroid.show('Something went wrong',ToastAndroid.SHORT)
            })

    }
    const SearchBar = () => {
        return(
            <View>
                <TextInput placeholder='Search Shops' style={{fontSize:18}}onChangeText={SearchShops}/>
            </View>
        )
    }

    useEffect(() => {
        axios.get(`${BaseURL}/product/category?category=${category}`)
            .then((res) => {

            })
    },[])
    useEffect(() => {
        if (category ==='Shops'){
            const FetchSellerData =  axios.get(`${BaseURL}/shop/search?query=`)
                .then((res) => {

                    setSearchResults(res.data.searchresults)
                })
            return FetchSellerData;
        }else {
            const FetchProductsCategory = axios.get(`${BaseURL}/shop/category?category=${category}`)
                .then((res) => {
                    setProductCategories(res.data.products)
                })
            return FetchProductsCategory
        }

    },[])
    const [Loader,setLoader] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView onPress={() => setIsTitleShown(true)}>
                {Loader &&(<ActivityIndicator size='large' animating={Loader} color="#0000ff"
                                              style={styles.loading}/>)}
                {
                    category ==='Shops'? (
                        <View>
                            {
                                searchresults.map((seller) => {
                                    return(<ShopRoom key={seller._id} businessName={seller.BusinessName} username={seller.username}
                                                     imageUrl={seller.ProfilePhoto}/>)
                                })
                            }
                        </View>

                    ):(
                        <View style={{ flex:1,flexWrap: 'wrap',flexDirection: 'row' }}>
                            {
                                ProductCategories.map((product) => {
                                    return(
                                        <Product key={product._id} imageUrl={product.imageUrl} name={product.name}
                                        price={product.price} seller={product.username}
                                        description={product.description}/>
                                    )
                                })
                            }
                        </View>
                    )
                }

            </ScrollView>
        </View>


    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default CategoryPage;
