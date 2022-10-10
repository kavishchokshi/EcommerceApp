/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../redux/actions";

const Counter = ({ item }: any) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer} testID="counter-view">
      <TouchableOpacity
        testID="add-item"
        activeOpacity={item?.count > 0 ? 0.2 : 1}
        onPress={() =>
          item.count > 0 ? dispatch(removeItemFromCart(item)) : {}
        }
        style={styles.counterContainer}
      >
        <Text style={styles.bottom}>-</Text>
      </TouchableOpacity>

      <Text style={{ marginHorizontal: 5 }}>{item?.count}</Text>

      <TouchableOpacity
        testID="minus-item"
        onPress={() => dispatch(addItemToCart(item))}
        style={styles.counterContainer}
      >
        <Text style={{ marginBottom: 2.5 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  mainContainer: { flexDirection: "row", alignItems: "center" },
  counterContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  bottom: { marginBottom: 1 },
});
