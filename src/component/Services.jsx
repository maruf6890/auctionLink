import React from 'react'

export default function Services() {
  return (
    <div>
        <div className="bg-gray-50 min-h-screen">
  <div className="container mx-auto px-4 py-12">
    {/* Header Section */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#141B41] mb-4">Our Services</h1>
      <p className="text-gray-600 text-lg">
        Empowering auctions with cutting-edge solutions tailored to your needs.
      </p>
    </div>

    {/* Services Section */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Service 1 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-gavel"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          Auction Management
        </h3>
        <p className="text-gray-600">
          Streamline your auctions with our comprehensive management platform that handles everything from listings to real-time bidding.
        </p>
      </div>

      {/* Service 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-chart-line"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          Data Analytics
        </h3>
        <p className="text-gray-600">
          Gain actionable insights with our analytics tools that track bidding trends, buyer behavior, and auction performance.
        </p>
      </div>

      {/* Service 3 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-users"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          User Management
        </h3>
        <p className="text-gray-600">
          Effortlessly manage auction participants, with secure profiles, roles, and permissions to ensure a smooth experience.
        </p>
      </div>

      {/* Service 4 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-lock"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          Secure Transactions
        </h3>
        <p className="text-gray-600">
          Enable secure payment processing and escrow services to build trust and ensure seamless transactions.
        </p>
      </div>

      {/* Service 5 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-cogs"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          Custom Integrations
        </h3>
        <p className="text-gray-600">
          Integrate with external platforms and APIs to extend functionality and adapt to your business needs.
        </p>
      </div>

      {/* Service 6 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-[#141B41] text-4xl mb-4">
          <i className="fas fa-mobile-alt"></i> {/* Replace with an appropriate icon */}
        </div>
        <h3 className="text-2xl font-semibold text-[#141B41] mb-2">
          Mobile Support
        </h3>
        <p className="text-gray-600">
          Enjoy fully responsive designs and mobile app compatibility to manage auctions on the go.
        </p>
      </div>
    </div>
  </div>
</div>
</div>
  )
}
