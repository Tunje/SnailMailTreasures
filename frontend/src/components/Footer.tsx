import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-[#000000] mx-auto ">
      <div className="container mx-auto px-26 flex flex-row md:flex-row justify-around items-center text-sm">
        {/* Left: Logo */}
        <div className="mb-4 md:mb-0  ">
          <img
            src="/snailmail-logo.png"
            alt="SnailMail Logo"
            className="w-[80px] h-[80px] rounded-full cursor-pointer hover:scale-105 transition duration-300 bg-[#FDF4DF] p-20"
          />
        </div>

        {/* Center: Copyright */}
        <div className="text-center mb-4 md:mb-0 text-[#FFFFFF]">
          <h2 className="  font-bold">SnailMail Treasures</h2>
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>

        {/* Right: Social Links */}
        <div className="text-center mb-4 md:mb-0">
          <h2 className="text-[#FFFFFF] font-bold ">Follow Us</h2>
          {/* Social Media Icons */}
          <div className="flex justify-around space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 "
              aria-label="Facebook"
            >
              <FaFacebook className="text-[#FFFFFF] w-5 h-5 cursor-pointer hover:bg-[#7A7C56] transition rounded-full" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" p-2 rounded-full"
              aria-label="Twitter"
            >
              <BsTwitterX className="text-[#FFFFFF] w-5 h-5 cursor-pointer hover:bg-[#7A7C56] transition rounded-full" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[#FFFFFF] w-5 h-5 cursor-pointer hover:bg-[#7A7C56] transition rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
