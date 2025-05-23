export default function Shop() {
  return (
    <div className="min-h-screen bg-[#FDF4DF] pt-[80px]  px-8">
      <h1 className="text-4xl font-grover mb-8 text-center text-[#7A7C56] pb-[30px] ">
        Shop our most popular categories
      </h1>

      <div className="grid grid-cols-6 gap-6 max-w-[1200px] mx-auto mb-12">
        <div className="text-center">
          <img
            src="/item1.avif"
            alt="Pendant-necklaces"
            className="max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Pendant-necklaces</p>
        </div>
        <div className="text-center">
          <img
            src="/item2.webp"
            alt="Women's dresses"
            className="max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Women's dresses</p>
        </div>
        <div className="text-center">
          <img
            src="/item3.webp"
            alt="Home and living"
            className="max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Home and living</p>
        </div>
        <div className="text-center">
          <img
            src="/item4.webp"
            alt="Templates"
            className="max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Templates</p>
        </div>
        <div className="text-center">
          <img
            src="/item5.webp"
            alt="Woment's t-shirts"
            className="max-w-[150px] h-auto cursor-pointer "
          />
          <p className="mt-2">Woment's t-shirts</p>
        </div>
        <div className="text-center">
          <img
            src="/item6.webp"
            alt="Car Accessories"
            className="max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Car Accessories</p>
        </div>
      </div>
    </div>
  );
}
