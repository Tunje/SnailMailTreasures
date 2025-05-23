const deals = [
  {
    id: 1,
    name: 'Ceramic Lemon Bowl',
    image: '/deal1.webp',
    originalPrice: 25.99,
    discountedPrice: 18.99,
    description:
      'Ceramic Lemon Bowl, Serving Bowl, Nut Bowl, Kitchen Utensils, Table Accessories, Decorative Vessels',
  },
  {
    id: 2,
    name: 'Tablecloth Green Floral Pattern',
    image: '/deal2.webp',
    originalPrice: 19.99,
    discountedPrice: 12.99,
    description:
      'Table Cloth Spring Summer Farmhouse French Style Table Cover Waterproof Fabric',
  },
  {
    id: 3,
    name: 'Ice Cream Cone and Popsicle Set',
    image: '/deal3.webp',
    originalPrice: 34.99,
    discountedPrice: 22.99,
    description:
      'Ice Cream Cone and Popsicle Set, Polymer Clay Cutter, Polymer Clay Stud, Cookie Cutter, Summer Clay Cutter, 3D Polymer Clay Cutter Set',
  },
];

export default function Deals() {
  return (
    <div className="min-h-screen bg-[#FDF4DF] px-8 py-12 pt-[80px]">
      <h1 className="text-4xl font-bold text-center text-[#7A7C56] mb-[60px]">
        Shop extraordinary items at special prices
      </h1>
      <div className=" grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {deals.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-6 text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="max-w-[200px] h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-[#CB8427]">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 my-2">{item.description}</p>
            <div className="mt-2">
              <span className="line-through text-gray-400 mr-2">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-green-600 font-bold text-lg">
                ${item.discountedPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
