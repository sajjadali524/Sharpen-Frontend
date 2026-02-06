import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProduct } from "../../store/slices/productsSlice";
import axios from "axios";

const FetchAllProducts = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.product);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({ totalPages: 1, totalItems: 0 }); // Make sure to handle both

  const fetchAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `http://localhost:3000/api/all-products?search=${search}&category=${category}&page=${page}&limit=${limit}`
      );
      dispatch(setProduct(response.data));
      setPagination({
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Debounce the search input
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(search, 1000); // 1 second debounce delay

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [debouncedSearch, category, page]); // Trigger the fetch when these change

  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Sports">Sports</option>
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
          <tbody>
            {products?.products?.map((item, index) => {
              return (
                <tr key={index} className="p-4">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={buttonStyle}
        >
          Prev
        </button>

        {/* Display Page Numbers with Ellipsis */}
        {page > 3 && <button onClick={() => handlePageChange(1)} style={buttonStyle}>1</button>}
        {page > 4 && <span style={{ margin: "0 10px" }}>...</span>}

        {Array.from({ length: pagination.totalPages }, (_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= page - 2 && pageNumber <= page + 2) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === page ? "active" : ""}
                style={buttonStyle}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        {page < pagination.totalPages - 3 && <span style={{ margin: "0 10px" }}>...</span>}
        {page < pagination.totalPages - 2 && <button onClick={() => handlePageChange(pagination.totalPages)} style={buttonStyle}>{pagination.totalPages}</button>}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          style={buttonStyle}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "0 5px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
};

export default FetchAllProducts;
