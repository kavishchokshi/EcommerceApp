import React from "react";
import { cleanup, render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import Counter from "../../components/Counter";
import { fetchProductList } from "./api";
import "@testing-library/jest-dom";
import Header from "../../components/Header";
import { combineReducers, createStore } from "redux";
import { reducer } from "../../redux/reducer";
import { act } from "react-test-renderer";
import TextRender from "../../components/TextRender";
import RenderProductItem from "../../components/RenderProductItem";

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
const initialState = { cartList: [], total: 0 };
const mockStore = configureStore();
let store: any = mockStore(initialState);

describe("With React Testing Library", () => {
  beforeAll(() => {
    store = createTestStore();
  });

  it("Open Product List", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ProductList />
        <Counter />
      </Provider>
    );

    expect(<Header title="Product List" />);
  });

  it("find counter", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const addButton = getByTestId("add-item");
    const minusButton = getByTestId("minus-item");
    expect(addButton).toBeTruthy();
    expect(minusButton).toBeTruthy();
    expect(getByTestId("counter-view"));
  });

  test("Product API Call", async (done) => {
    const response = await fetchProductList();
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <ProductList />
        <Counter />
        <TextRender />
        <RenderProductItem item={response[0]} />
      </Provider>
    );

    act(() => {
      expect(getAllByTestId("render-text"));
      expect(getByTestId("list")).toBeTruthy();
      expect(getByTestId("product-view"));
      expect(getByTestId("item-list"));
    });
    expect(response).toHaveLength(4);
    done();
  });
});
