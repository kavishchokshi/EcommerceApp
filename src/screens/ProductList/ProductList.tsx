/* eslint-disable react-native/no-inline-styles */
import {View, Image, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import Header from '../../components/Header';
import {screenNames} from '../../constants/navigationConstants';
import {StyleSheet} from 'react-native';
import TextRender from '../../components/TextRender';
import Counter from '../../components/Counter';

interface ProductListResponse {
  colour: string;
  id: number;
  img: string;
  name: string;
  price: number;
  count?: number;
}

const ProductList = ({navigation}: any) => {
  const [list, setList] = useState<ProductListResponse[]>([]);
  const [initalData, setInitialData] = useState<ProductListResponse[]>([]);
  const {cartList} = useSelector((state: any) => state);

  const fetchProductList = async () => {
    try {
      const {data, status} = await axios.get(
        'https://my-json-server.typicode.com/benirvingplt/products/products',
      );
      if (status === 200) {
        setList(data);
        setInitialData(data);
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      throw new Error('error');
    }
  };

  useEffect(() => {
    fetchProductList();
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

  const renderItem = (item: ProductListResponse) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.imgContainer}
          source={{
            uri: item.id === 1 ? item.img.replace('http', 'https') : item.img,
          }}
          resizeMode="stretch"
        />
        <View style={styles.subViewContainer}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <View style={styles.descriptionContainer}>
            <View style={{marginTop: 10}}>
              <TextRender label="Color" value={item.colour} />
              <TextRender label="Price" value={`$${item.price}`} />
            </View>
            <Counter item={item} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 8,
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 5,
    flex: 1,
    borderColor: 'lightgrey',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  imgContainer: {
    height: 250,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 5,
  },
  subViewContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 5,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: 5,
  },
});
