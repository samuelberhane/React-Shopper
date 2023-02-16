import React from "react";
import { Navbar, Title, Footer } from "../components";
import { data } from "../data";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[80px] flex flex-col md:flex-row min-h-[85vh] gap-4 px-2 md:px-8 lg:px-12">
        <div className="md:w-[70%]">
          <div className="flex items-end justify-between py-1 px-2">
            <h1 className="text-xl font-bold md:text-2xl">Your Cart</h1>
            <h2 className="">3 Items</h2>
          </div>
          <div className="">
            <div className="grid text-sm text-gray-400 grid-cols-4 uppercase text-center border-y-2">
              <p className="border-x-2">Product</p>
              <p className="border-r-2">Quantity</p>
              <p className="border-r-2">Price</p>
              <p className="border-r-2">Total</p>
            </div>
            <div className="mt-2">
              {data.slice(0, 4).map((item) => {
                return (
                  <div
                    className="mb-1 shadow grid grid-cols-4 text-center"
                    key={item.id}
                  >
                    <img
                      src={`${item.image[0]}`}
                      alt="item"
                      className="rounded w-full h-[120px] md:h-[150px] lg:h-[200px]"
                    />

                    <div className="flex justify-center mt-2">
                      <p className="px-2 text-blue-400 font-bold cursor-pointer">
                        -
                      </p>
                      <p>5</p>
                      <p className="px-2 text-blue-400 font-bold cursor-pointer">
                        +
                      </p>
                    </div>
                    <p className="pt-2 text-sm">${item.newPrice}</p>
                    <div className="flex flex-col justify-between pr-2">
                      <p className="pt-2 text-sm">$100</p>
                      <button className="rounded px-4 py-1 bg-red-500 text-sm mb-2 text-white font-bold">
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 mb-4">
            <Link
              to="/"
              className=" px-4 py-2 shadow-md text-lg flex w-[250px] items-center gap-2 rounded-md"
            >
              <BsArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
        <div className="md:w-[30%] h-[85vh] bg-gray-100 pt-2 px-8 mb-4">
          <Title title="Order History" />
          <div className="flex items-center justify-between py-2 mt-3 border-b-2">
            <h2>Items 3</h2>
            <h3 className="font-bold">$435.6</h3>
          </div>
          <div className="mt-1">
            <h3>Shipping</h3>
            <p className="my-2 bg-black text-white py-2 px-4 rounded-sm">
              Standard Delivery - $5.00
            </p>
          </div>
          <div className="py-6">
            <h3>Promo Code</h3>
            <input
              type="text"
              placeholder="Enter Your Code"
              className="my-2 px-4 py-2 outline-none shadow-md w-full"
            />
            <button className="py-2 px-6 block my-2 bg-[#c2ad34] rounded">
              APPLY
            </button>
          </div>
          <div className="flex items-center justify-between my-8 border-b-2 pb-2">
            <h3>Total Cost</h3>
            <p className="font-bold">$464.54</p>
          </div>
          <button className="w-full py-2 text-lg text-white rounded bg-blue-400">
            Checkout
          </button>
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
    </>
  );
};

export default Cart;
