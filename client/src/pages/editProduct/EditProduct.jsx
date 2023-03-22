import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';
import { 
    get_Product,
    get_Products,
    selectIsLoading,
    selectProduct,
    update_Product,
    } from "../../redux/features/product/productSlice";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';



const EditProduct = () => {
    const navigate = useNavigate();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(!isLoggedIn){
        navigate("/login");
    }

    const { id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("");

    useEffect(() => {
        dispatch(get_Product(id));
    },[dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);
    }, [productEdit]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value });
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", product?.name);

        formData.append("category", product?.category);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("description", product?.description);
        if (productImage) {
        formData.append("image", productImage);
        }
        
        await dispatch(update_Product({ id, formData }));
        await dispatch(get_Products());
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
      formName="Edit Product"
      product={product}
      productImage={productImage}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      saveProduct={saveProduct}
      />
    </div>
  )
}

export default EditProduct;
