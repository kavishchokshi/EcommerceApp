/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  isCart?: boolean;
  onPress?: () => void;
  isGoBack?: boolean;
}

const Header = ({title, isCart, onPress, isGoBack}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {isGoBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={[styles.titleStyle, {marginStart: isCart ? '18%' : 0}]}>
        {title}
      </Text>
      {isCart ? (
        <TouchableOpacity onPress={onPress} style={styles.cartView}>
          <Text>View Cart</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cartView: {borderWidth: 1, padding: 5, borderRadius: 5},
});
