import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import { create_Product,selectIsLoading } from "../../redux/features/product/productSlice";
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
}

const AddProduct = () => {

  useRedirectLoggedOutUser("/login");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");

    const isLoading = useSelector(selectIsLoading);

    const { name, category, price, quantity, description } = product;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value });
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        console.log(productImage);
    };

    const generateKSKU = (category) => {
        const letter = category.slice(0,3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",name);
        formData.append("sku", generateKSKU(category));
        formData.append("category", category);
        formData.append("quantity", Number(quantity));
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", productImage);

        console.log(...formData);

        await dispatch(create_Product(formData));
        navigate("/dashboard");
        
    }
  return (
    <div className='relative body'>
      <button className='btn btn-sm text-xl mt-2 pt-1 normal-case bg-slate-900 text-zinc-100
                        hover:bg-slate-400 hover:text-black absolute top-1 left-1 border-none'>
          <Link to="/dashboard" className='font-bold text-blue-500'>Back</Link>
     </button>
      {isLoading && <Loader/>}
      <ProductForm
      formName="Add New Product"
      product={product}
      productImage={productImage}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      saveProduct={saveProduct}
      />
    </div>
  )
}

export default AddProduct;
