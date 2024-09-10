import React from "react";

function Footer() {
  return (
    <div className="py-6">
      <div className="flex justify-between px-20">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">Sign up to our new letter</h2>
          <p className="text-[15px] text-slate-500">
            Stay up to date with our latest news, announcements and articles.
          </p>
        </div>

        <form action="" className="flex gap-3 py-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your email"
            className="border rounded-lg px-3 focus:border-neutral-900 focus:ring-neutral-900 focus:ring-1 focus:outline-none"
          />
          <button className="tracking-wider border text-center text-sm text-white border-black p-2 rounded-md w-28 bg-neutral-900">
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex justify-between items-end px-20 pb-10 mt-20 list-none">
        {/* left */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">About</h3>
            <div className="flex flex-col gap-1 text-gray-500 text-sm">
              <li>Blog</li>
              <li>Meet the team</li>
              <li>Contact Us</li>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold">Support</h3>
            <div className="flex flex-col gap-1 text-gray-500 text-sm">
              <li>Contact Us</li>
              <li>Shopping</li>
              <li>Return</li>
              <li>FAQ</li>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-2">
          <li className="text-gray-500 text-sm">Social Media</li>
          <div className="flex justify-between gap-3">
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
            <div className="border p-2 rounded-full h-10 text-white w-10 text-center bg-black">X</div>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex px-20 text-[13px] text-slate-400 mt-5 justify-between list-none">
        <li>Copyright C 2024 Shamanth. All Rights Reserved</li>

        <div className="flex justify-between gap-2">
          <li>Terms of service</li>
          <li>Privacy Policy</li>
        </div>
      </div>
    </div>
  );
}

export default Footer;
