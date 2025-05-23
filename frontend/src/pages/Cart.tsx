import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Handmade Vase',
      price: 25.99,
      quantity: 1,
      image: '/item1.jpg',
    },
    {
      id: '2',
      name: 'Custom Postcard',
      price: 4.99,
      quantity: 3,
      image: '/item2.jpg',
    },
  ]);

  const calculateTotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-[#FDF4DF] p-8 flex flex-col items-center ">
      <h1 className="text-4xl font-bold mb-8 text-[#7A7C56]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 mb-10">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center shadow  border border-[#7A7C56] hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className=" max-w-[200px] rounded-md  mr-6"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#7A7C56]">
                    {item.name}
                  </h2>
                  <p className="text-gray-700">Qty: {item.quantity}</p>
                  <p className="text-gray-700 font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-lg font-bold text-[#CB8427]">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xl font-semibold text-[#7A7C56] mb-6">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>

          <button className="bg-[#7A7C56] text-white py-3 px-6 rounded-full text-lg hover:bg-[#CB8427] transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
