import React from 'react'

export default function Footer() {
  return (
    <div><footer className="bg-[#141B41] text-white py-8">
    <div className="container mx-auto px-4">
      {/* Footer Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-xl">Auction Link</h3>
          <p className="text-gray-300 mt-2">
            Empowering your vision with innovative solutions. 
          </p>
        </div>
        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <ul className="mt-2 space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold text-lg">Contact Us</h4>
          <p className="text-gray-300 mt-2">Email: info@company.com</p>
          <p className="text-gray-300">Phone: +123 456 789</p>
        </div>
      </div>
  
      {/* Divider */}
      <div className="border-t border-gray-500 my-6"></div>
  
      {/* Footer Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} AuctionLink. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
  </div>
  )
}

