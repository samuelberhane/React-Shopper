import React, { useEffect, useState } from "react";
import { Navbar, Footer, Title, Loader } from "../components";
import { BsArrowBarRight } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_PRODUCT,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  selectCartItems,
} from "../redux/slice/productSlice";

const Product = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      setProduct({ data: docSnap?.data(), id: docSnap?.id });
      setLoading(false);
    };
    fetchProduct();
  }, [id]);
  const currentItem = cartItems.find((item) => item.id === product?.id);

  if (loading) return <Loader />;

  return (
    <div>
      <Navbar />
      <div className="mt-[80px] md:mt-[90px] flex flex-col lg:flex-row px-4 lg:gap-4 mb-6">
        <div className="flex mb-4 gap-4 lg:w-[55%] lg:h-[calc(85vh)]">
          <div className="w-[40%] grid grid-rows-2 gap-4">
            <img
              src={product?.data?.imageUrls[1]}
              alt="product"
              className="w-full rounded h-full"
            />

            <img
              src={product?.data?.imageUrls[0]}
              alt="product"
              className="w-full rounded h-full"
            />
          </div>

          <div className="w-[60%]">
            <img
              src={product?.data?.imageUrls[1]}
              alt="product"
              className="w-full h-full rounded"
            />
          </div>
        </div>
        <div className="lg:w-[45%]">
          <Title title={product?.data?.type} />
          <h2 className="mb-2 flex items-center gap-1 text-[(6, 87, 26)]">
            Price:{" "}
            <span className="line-through">${product?.data?.oldPrice}</span>{" "}
            <BsArrowBarRight /> ${product?.data?.currentPrice}
          </h2>
          <p className="mb-2 text-[13px] md:text-[15px]">
            {product?.data?.description}
          </p>

          <div className="flex items-center mt-2 gap-1">
            <button
              className="px-1 text-blue-500 text-xl rounded-sm"
              onClick={() => dispatch(DECREASE_AMOUNT(product?.id))}
            >
              -
            </button>
            <p className="pt-1 text-lg">
              {currentItem?.amount > 0 ? currentItem?.amount : "1"}
            </p>
            <button
              className="px-1 text-blue-500 text-xl rounded-sm"
              onClick={() => dispatch(INCREASE_AMOUNT(product?.id))}
            >
              +
            </button>
          </div>
          <button
            className="mt-2 py-1 px-2 bg-blue-400 text-white font-bold rounded flex items-center gap-2 text-lg"
            onClick={() => {
              dispatch(ADD_PRODUCT({ ...product }));
            }}
          >
            <FaShoppingCart /> Add to Cart
          </button>

          <div className="mt-4 text-lg">
            <p>
              Vendor:{" "}
              <span className="font-light">{product?.data?.vendor}</span>
            </p>
            <p className="my-1">
              Product-Type:{" "}
              <span className="font-light">{product?.data?.type}</span>
            </p>
            <p>
              Tags:{" "}
              {product?.data?.category?.map((item, index) => (
                <span className="font-light" key={index}>
                  {item}{" "}
                </span>
              ))}
            </p>
          </div>
          <div className="mt-4 border-t-[3px] border-[#234354] pt-2">
            <button className="block mt-1 uppercase bg-transparent py-1 px-2 border-2">
              Additional Information
            </button>
            <button className="block mt-1 uppercase bg-transparent py-1 px-2 border-2">
              FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="flex item-center justify-between md:px-8 lg:px-12 py-5 md:py-7 px-2 bg-black uppercase text-white gap-4">
        <p className="text-[11px] md:text-lg whitespace-nowrap flex items-center">
          stay in touch
        </p>
        <div className="flex items-center md:flex-grow md:ml-12 md:justify-end">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="outline-none border-none py-1 px-2 md:w-[60%]"
          />
          <button className="text-[10px] h-full md:text-lg whitespace-nowrap bg-gray-500 px-4 uppercase">
            join us
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer content={true} />
    </div>
  );
};

export default Product;
