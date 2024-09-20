import React from "react";

function Footer() {
  return (
    <div className="py-6 mt-20">
      <div className="flex justify-start md:justify-between px-5 md:px-16 flex-wrap">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">Sign up to our new letter</h2>
          <p className="text-[15px] text-slate-500">
            Stay up to date with our latest news, announcements and articles.
          </p>
        </div>

        <form action="" className="flex gap-3 py-3 flex-wrap">
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email"
            className="border rounded-lg p-1 md:p-2 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
          />
          <button className="tracking-wider border text-center text-sm text-white border-black p-1 md:p-2 rounded-md w-28 bg-neutral-900">
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex justify-between flex-wrap gap-3 md:gap-0 items-end px-5 md:px-16 pb-10 mt-5 md:mt-20 list-none">
        {/* left */}
        <div className="flex gap-16 md:gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">About</h3>
            <div className="flex flex-col gap-1 text-gray-500 text-xs">
              <li>Blog</li>
              <li>Meet the team</li>
              <li>Contact Us</li>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">Support</h3>
            <div className="flex flex-col gap-1 text-gray-500 text-xs">
              <li>Contact Us</li>
              <li>Shopping</li>
              <li>Return</li>
              <li>FAQ</li>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-2">
          <li className="text-gray-500 text-xs">Social Media</li>
          <div className="flex justify-between gap-3">
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex flex-wrap justify-center px-5 md:px-16 text-[13px] text-slate-400 mt-5 md:justify-between list-none">
        <li>Copyright &copy; 2024 Shamanth. All Rights Reserved</li>

        <div className="flex justify-between gap-2">
          <li>Terms of service</li>
          <li>Privacy Policy</li>
        </div>
      </div>
    </div>
  );
}

export default Footer;
