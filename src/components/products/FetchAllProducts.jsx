import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProduct } from "../../store/slices/productsSlice";
import axios from "axios";

const FetchAllProducts = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.product);
  const fetchAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:3000/api/all-products",
      );
      dispatch(setProduct(response.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div>
        <input type="text" name="search" placeholder="Search products" />
        <select>
          <option>Electronics</option>
          <option>Sports</option>
        </select>
      </div>
      <div>
        <table className="text-center w-full">
          <thead>
            <tr className="p4">
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          {products?.products?.map((item, index) => {
            return (
              <tbody key={index}>
                <tr className="p-4">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.price}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default FetchAllProducts;