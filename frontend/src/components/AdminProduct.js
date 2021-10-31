import "./AdminProduct.css";
import axios from "axios";

function AdminProduct({ productId, image, name, price, description }) {
  const deleteProduct = async () => {
    try {
      if (window.confirm("Are you sure you want to delete?")) {
        const deleted = await axios.delete(
          `http://127.0.0.1:5000/api/admin/products/${productId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authorization"),
            },
          }
        );
        window.location.reload(false);
        if (deleted) {
          alert("Product successfully deleted");
        }
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="product">
      <img src={image} alt={name} />

      <div className="product_info">
        <p className="info_name">{name}</p>
        <p className="info_description">{description.substring(0, 100)}...</p>

        <p className="info_price">{price}</p>
        <button type="button" onClick={deleteProduct}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminProduct;
