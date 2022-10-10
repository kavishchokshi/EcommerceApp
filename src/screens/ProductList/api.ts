import axios from "axios";

export const fetchProductList = async () => {
    
      const {data, status} = await axios.get(
        'https://my-json-server.typicode.com/benirvingplt/products/products',
      );
      if (status === 200) {
        return data;
      } else {
        throw new Error('something went wrong')
      }
    
  };