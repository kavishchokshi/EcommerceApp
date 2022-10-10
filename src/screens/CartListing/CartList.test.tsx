import { cleanup, render, screen } from "@testing-library/react-native";
import React from "react";
import { combineReducers, createStore } from "redux";
import CartListing from "./CartListing";
import { reducer } from "../../redux/reducer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import RenderCartItem from "../../components/RenderCartItem";
import { act } from "react-test-renderer";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

export function createTestStore() {
  const store = createStore(
    combineReducers({
      reducer,
    })
  );
  return store;
}

afterEach(cleanup);
const data = {
  id: 5,
  colour: "Red",
  name: "Red Pin Stripe Belt T Shirt Dress",
  price: 17,
  img: "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024",
  count: 1,
};

const initialState = { cartList: data, total: 0 };
const mockStore = configureStore();
let store: any = mockStore(initialState);

describe("Cart Testing", () => {
  beforeAll(() => {
    store = createTestStore();
  });
  it("render cart screen", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CartListing />
        <RenderCartItem item={initialState.cartList} />
      </Provider>
    );
    expect(getByTestId("cart-list"));
  });
});
