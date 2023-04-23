import React from "react";

const ProductForm = ({ formName, product, handleInputChange, handleImageChange, saveProduct }) => {
  return (
    <div className="py-16 sm:py-8">
      <div>
        {/* {isLoading && <Loader/>} */}
        <div className="flex justify-center">
          <div class="p-4 w-4/5 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3 bg-slate-700 rounded-xl">
            <form class="form-control flex justify" onSubmit={saveProduct}>
              <div className="flex justify-center">
                <h1 className="font-bold text-2xl mb-4 bg-orange-500 rounded-xl text-center pt-2 pb-1 text-white w-1/2 shadow-md shadow-orange-50">
                  {formName}
                </h1>
              </div>

              <label class="label">
                <span class="label-text text-white">Product Image</span>
              </label>
              <input
                type="file"
                className="file-input w-full max-w-xs"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              <label class="label">
                <span class="label-text text-white text-lg">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                required
                name="name"
                value={product?.name}
                class="input"
                onChange={handleInputChange}
              />

              <label class="label">
                <span class="label-text text-white text-lg">Product Category</span>
              </label>
              <input
                type="text"
                placeholder="Product Category"
                required
                name="category"
                value={product?.category}
                class="input"
                onChange={handleInputChange}
              />

              <label class="label">
                <span class="label-text text-white text-lg">Product Price</span>
              </label>
              <input
                type="number"
                placeholder="Product Price"
                required
                name="price"
                min="0"
                value={product?.price}
                class="input"
                onChange={handleInputChange}
              />

              <label class="label">
                <span class="label-text text-white text-lg">Product Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Product Quantity"
                required
                name="quantity"
                value={product?.quantity}
                min="0"
                class="input"
                onChange={handleInputChange}
              />

              <label class="label">
                <span class="label-text text-white text-lg">Product Description</span>
              </label>
              <textarea
                className="textarea"
                placeholder="Description"
                name="description"
                value={product?.description}
                onChange={handleInputChange}
              ></textarea>

              <div className="flex justify-center">
                <button
                  className="btn btn-sm text-2xl mt-4 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 border-none hover:text-black w-full h-12 shadow-md shadow-blue-300"
                  type="submit"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
