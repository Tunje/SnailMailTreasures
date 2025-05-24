import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#FDF4DF] border-t border-gray-300 text-gray-800 px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-center md:text-left">
        {/* Left: Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src="/snailmail-logo.png"
            alt="Snailmail Treasures Logo"
            className="w-[152px] h-[140px] cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Center: Info + Links */}
        <div>
          <h2 className="font-grover text-3xl mb-2">Snail Mail</h2>
          <p className="text-base mb-4">Faster than a snail!</p>
          <p className="text-xl font-grover mb-2">Our Links:</p>
          <div className="flex flex-col gap-1">
            {["shop", "home", "deals", "profiles"].map((label) => (
              <div
                key={label}
                onClick={() => navigate(`/${label}`)}
                className="cursor-pointer hover:underline text-lg font-grover hover:text-blue-700 transition"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="font-grover text-2xl mb-2">Follow Us!</h2>
          <div className="flex gap-8 text-7xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-700 hover:text-pink-500 transition" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="text-gray-700 hover:text-black transition" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-gray-700 hover:text-blue-700 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} Snailmail Treasures. All rights
        reserved.
      </div>
    </footer>
  );
}
