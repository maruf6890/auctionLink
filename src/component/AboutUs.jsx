import React from 'react'

export default function AboutUs() {
    return (
        <div>
            <div className="bg-white -mt-10 min-h-screen p-10">
                <div className="container mx-auto px-4 py-12">
                    {/* Header Section */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#141B41] mb-4">About AuctionLink</h1>
                        <p className="text-gray-600 text-lg">
                            Empowering auctions with innovative management solutions.
                        </p>
                    </div>

                    {/* Our Story Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-semibold text-[#141B41] mb-4">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed">
                            AuctionLink was created to transform the way auctions are managed and executed.
                            We started with a mission to make the auction process seamless, transparent,
                            and efficient for both organizers and participants. Today, AuctionLink serves as
                            a trusted platform that bridges the gap between technology and auction management,
                            empowering users to achieve success.
                        </p>
                    </div>

                    {/* Mission and Values Section */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div>
                            <h2 className="text-3xl font-semibold text-[#141B41] mb-4">Our Mission</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our mission is to simplify and enhance the auction process by providing
                                cutting-edge tools and unparalleled support. At AuctionLink, we are committed
                                to creating a platform where trust, innovation, and efficiency come together
                                to deliver remarkable auction experiences.
                            </p>
                        </div>
                        {/* Values */}
                        <div>
                            <h2 className="text-3xl font-semibold text-[#141B41] mb-4">Our Values</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Transparency: Ensuring a fair and open auction process for all users.</li>
                                <li>Innovation: Constantly improving our platform with the latest technology.</li>
                                <li>Customer Success: Prioritizing the needs of our users and their growth.</li>
                                <li>Integrity: Building trust through ethical and responsible practices.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-semibold text-[#141B41] mb-6 text-center">Meet Our Team</h2>
                        <p className="text-gray-700 leading-relaxed text-center mb-8">
                            Our passionate team is the backbone of AuctionLink, combining expertise in auctions
                            and technology to deliver the best experience possible.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {/* Example Team Member */}
                            <div className="text-center">
                                <img
                                    src="https://avatars.githubusercontent.com/u/137112466?v=4"
                                    alt="Team Member"
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className="font-bold text-xl">Maruf</h3>
                                <p className="text-gray-600">CEO & Founder</p>
                            </div>
                            <div className="text-center">
                                <img
                                    src="https://scontent-sin6-4.xx.fbcdn.net/v/t39.30808-6/458307242_1061260585560078_3696274407084807179_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BlkOE0twxgMQ7kNvgGRgsuG&_nc_zt=23&_nc_ht=scontent-sin6-4.xx&_nc_gid=AYkRqVkifGUxfpl9f7yfnEb&oh=00_AYCz3TEX9UFjCFDbUmuY7t6u2be3K6yKPEpS7ZmmF_OH1Q&oe=6765C3F3"
                                    alt="Team Member"
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className="font-bold text-xl">Siyem</h3>
                                <p className="text-gray-600">Chief Technology Officer</p>
                            </div>
                            <div className="text-center">
                                <img
                                    src="https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/469557827_1129708468677571_765980449980806946_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=hjikRu3PS7sQ7kNvgHaqL3-&_nc_zt=23&_nc_ht=scontent-sin6-2.xx&_nc_gid=AUxQetqL97X0gqCsg76lphs&oh=00_AYCoFRZ3K4JCtUe2Ygbe5PajpazNu1drnL9PdXFamHhq7A&oe=6765F327"
                                    alt="Team Member"
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className="font-bold text-xl">Shanto Roy</h3>
                                <p className="text-gray-600">Product Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
