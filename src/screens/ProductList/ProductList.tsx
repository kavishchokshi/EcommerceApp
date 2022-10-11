/* eslint-disable react-native/no-inline-styles */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import Header from '../../components/Header';
import {screenNames} from '../../constants/navigationConstants';
import { fetchProductList } from './api';
import RenderProductItem from '../../components/RenderProductItem';

export interface ProductListResponse {
  colour: string;
  id: number;
  img: string;
  name: string;
  price: number;
  count?: number | undefined;
}

const ProductList = ({navigation}: any) => {
  const [list, setList] = useState<ProductListResponse[]>([]);
  const [initalData, setInitialData] = useState<ProductListResponse[]>([]);
  const {cartList} = useSelector((state: any) => state);

  
  const fetchList = async() => {
     try {
      const response = await fetchProductList();
      if(response){
        setInitialData(response);
        setList(response)
      }
     } catch (error) {
      throw new Error('Something went wrong');
     }
  }

  useEffect(() => {
   fetchList();
  }, []);

  useEffect(() => {
    const temp = [...initalData];
    temp.map(item => {
      if (cartList.some((element: {id: number}) => element.id === item.id)) {
        const dataIndex = cartList?.findIndex(
          (value: {id: number}) => value.id === item.id,
        );
        item.count = cartList[dataIndex].count;
      } else {
        item.count = 0;
      }
    });
    setList(temp);
  }, [cartList, initalData]);

  

  return (
    <View style={{flex: 1}} testID='product-view'>
      <Header
        title="Product List"
        isCart
        onPress={() => {
          navigation.navigate(screenNames.cartListing);
        }}
      />

      <FlatList
        style={{marginTop: 10}}
        contentContainerStyle={{paddingTop: 5}}
        data={list}
        numColumns={2}
        testID='list'
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RenderProductItem item={item}/>}
      />
    </View>
  );
};

export default ProductList;


