import "./ListProductScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom';

// Components
import AdminProduct from "../components/AdminProduct";

// Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

function ListProductScreen() {

    const dispatch = useDispatch();

    const getProducts = useSelector((state) => state.getProducts);
    const { products, loading, error } = getProducts;
  
    useEffect(() => {
      dispatch(listProducts());
    }, [dispatch]);
    return (
        <div className="homescreen">
        <h2 className="homescreen_title">Your Product</h2>
  
        <div className="homescreen_products">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <AdminProduct
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            ))
          )}
          <Link to="/admin/product">Add Product</Link>
        </div>
      </div>
    )
}

export default ListProductScreen
