export default function Favorites() {
  return (
    <div className="min-h-screen bg-[#FDF4DF] pt-[80px]  px-8">
      <h1 className="text-4xl font-grover text-center text-[#7A7C56] pb-[10px] ">
        Home Favorites
      </h1>
      <div className="text-center">
        <h2 className="text-2xl font-grover text-[#7A7C56] mb-[80px]">
          Be our guest! Time to spruce up your living space with affordable
          statement pieces, essential finds, and decor to adore.
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-6 max-w-[1200px] mx-auto mb-12">
        <div className="text-center">
          <img
            src="/home1.avif"
            alt="Home Decor"
            className="rounded-full rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Home Decor</p>
        </div>
        <div className="text-center">
          <img
            src="/home2.avif"
            alt="Wall Art"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Wall Art</p>
        </div>
        <div className="text-center">
          <img
            src="/home3.avif"
            alt="Kitchen & Dining"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Kitchen & Dining</p>
        </div>
        <div className="text-center">
          <img
            src="/home4.avif"
            alt="Furniture"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Furniture</p>
        </div>
        <div className="text-center">
          <img
            src="/home5.webp"
            alt="Area Rugs"
            className="rounded-full max-w-[150px] h-auto cursor-pointer "
          />
          <p className="mt-2">Area Rugs</p>
        </div>
        <div className="text-center">
          <img
            src="/home6.avif"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Lighting</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6 max-w-[1200px] mx-auto mb-12">
        <div className="text-center">
          <img
            src="/home7.avif"
            alt="Bedding"
            className="rounded-full rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Bedding</p>
        </div>
        <div className="text-center">
          <img
            src="/home8.avif"
            alt="Storage & Organization"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Storage & Organization</p>
        </div>
        <div className="text-center">
          <img
            src="/home9.avif"
            alt="Home Improvement"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Home Improvement</p>
        </div>
        <div className="text-center">
          <img
            src="/home10.avif"
            alt="Bathroom"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Bathroom</p>
        </div>
        <div className="text-center">
          <img
            src="/home11.avif"
            alt="Curtains"
            className="rounded-full max-w-[150px] h-auto cursor-pointer "
          />
          <p className="mt-2">Curtains</p>
        </div>
        <div className="text-center">
          <img
            src="/home12.avif"
            alt="Outdoor & Garden"
            className="rounded-full max-w-[150px] h-auto cursor-pointer"
          />
          <p className="mt-2">Outdoor & Garden</p>
        </div>
      </div>
    </div>
  );
}
