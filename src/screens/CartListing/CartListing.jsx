/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import Counter from '../../components/Counter';
import TextRender from '../../components/TextRender';

const CartListing = () => {
  const {cartList} = useSelector(state => state);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let totalamount = 0;
    cartList?.map(item => {
      totalamount += item.price * item.count;
    });
    setAmount(totalamount);
  }, [cartList]);

  const renderItem = item => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: item.id === 1 ? item.img.replace('http', 'https') : item.img,
          }}
          style={styles.imgContainer}
          resizeMode="stretch"
        />
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>{item.name}</Text>
          <View style={styles.textRender}>
            <TextRender label="Color" value={item.colour} />
            <TextRender label="Price" value={`$${item.price}`} />
          </View>
          <View style={styles.countView}>
            <Text style={{fontWeight: 'bold'}}>
              Total: <Text>${item.count * item.price}</Text>
            </Text>
            <Counter item={item} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Cart List" isGoBack />

      <FlatList
        contentContainerStyle={{paddingHorizontal: 15, flex: 1}}
        data={cartList}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={styles.noItem}>
              <Text>No items in the cart!</Text>
            </View>
          );
        }}
      />

      <View style={styles.amountContainer}>
        <Text style={styles.boldText}>Total Amount</Text>
        <Text style={styles.boldText}>${amount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default CartListing;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
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
  },
  imgContainer: {
    width: 100,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginEnd: 5,
  },
  titleText: {
    flexWrap: 'wrap',
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop: 5,
    marginEnd: 3,
  },
  textRender: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 20,
  },
  countView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 20,
  },
  noItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'grey',
    paddingHorizontal: 5,
    marginHorizontal: 15,
  },
  boldText: {fontWeight: 'bold'},
});
