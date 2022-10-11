/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import RenderCartItem from '../../components/RenderCartItem';

const CartListing = () => {
  const {cartList} = useSelector((state: any) => state);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let totalamount = 0;
    cartList?.map((item: any) => {
      totalamount += item.price * item?.count;
    });
    setAmount(totalamount);
  }, [cartList]);

  

  return (
    <View style={{flex: 1}} testID='cart-view'>
      <Header title="Cart List" isGoBack />

      <FlatList
        contentContainerStyle={{paddingHorizontal: 15, flex: 1}}
        data={cartList}
        renderItem={({item}) => <RenderCartItem item = {item}/>}
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
