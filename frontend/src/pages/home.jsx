import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    products: [
      { id: 1, name: "Smartphone", image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m33-1.jpg" },
      { id: 2, name: "Laptop", image: "https://imgs.search.brave.com/OEmn5HVFwJY_x3Pcp1_bmLei8KLdGwqex0W8wiO-DTI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxcHZrU3dRdnRM/LmpwZw" },
      { id: 3, name: "Smartwatch", image: "https://imgs.search.brave.com/62DPJ-ztr-spiUZbD02_rpO9b5muu6JUAhkVGDGfPow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL3Ft/SDFxSjN4VTcxaGtp/RXVPT0F2dXdCMXk4/OVFKU19Vc05QSUFw/V0xUYmx3aVJxb2NW/Y1JVbXFqeUdQRWVZ/RkV5YWtNZzV0NFI1/M21rQUJ5RHhJQXdK/dG5feHVLQWhjWTF4/RDBqQXlJWmx5Tng3/WlNYWFk" },
    ],
  },
  {
    name: "Fashion",
    products: [
      { id: 4, name: "T-Shirt", image: "https://imgs.search.brave.com/ls2Y3Ri1Nn6fa1MDG8vjfYa7rCdSj3r70Kp83G4Smbw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzA1LzU4LzU2/LzM2MF9GXzEwMDU1/ODU2MjhfVzdrb1VU/VTYwMXRJbHlaQUo2/OWNTeHByVWx2R3h6/azYuanBn" },
      { id: 5, name: "Jeans", image: "https://imgs.search.brave.com/cmVMgk7OKDYE1lRrE9eW0m8iiFDJKkERYrrGWLXq3Pg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjE1NDM3Ny9waG90/by9qZWFucy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VDNL/MV9QZGxaeFhJTEtG/dkdrVG1QaUlmNU0y/RWRJeGtxYTc5QUpU/X3cwWT0" },
      { id: 6, name: "Sneakers", image: "https://imgs.search.brave.com/u9WRHqhEtApbVptlvBxsRKUD4ByaP4Ou8iIWhLX7LGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/YXNoaW9uLXNob2Vz/LXNuZWFrZXJzXzEy/MDMtNzUyOS5qcGc_/c2VtdD1haXNfaHli/cmlk" },
    ],
  },
  {
    name: "Home & Kitchen",
    products: [
      { id: 7, name: "Blender", image: "https://imgs.search.brave.com/A84OGOAm-417Yr3pfwT3xLhy0QxLu7Fed5Ab4aWDXZ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcx/MTE0OTQ4L3Bob3Rv/L2JsZW5kZXIuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUtv/bldmdDJYQzJhZ2Rz/dkpDczNSd2I0LVNr/UGRJdGdlT3htczBO/bEI2NXc9" },
      { id: 8, name: "Microwave", image: "https://imgs.search.brave.com/UaxARJBLYiMaBpT02GSgXmIxRorfMH2fznHAGDGthdY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzU5LzczLzU4/LzM2MF9GXzU1OTcz/NTgyMF9YZ0xrNkNQ/RzR6c1B2TVdHSEdj/YWhSTjhScVVRdmlO/UC5qcGc" },
      { id: 9, name: "Dining Set", image: "https://via.placeholder.com/150" },
    ],
  },
];

function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Apple iPhone 14 Pro",
      price: "$999",
      image: "/products/iphone14.jpg",
    },
    {
      id: 2,
      name: "Nike Air Max Sneakers",
      price: "$150",
      image: "/products/nike-air-max.jpg",
    },
    {
      id: 3,
      name: "Sony WH-1000XM4 Headphones",
      price: "$299",
      image: "/products/sony-headphones.jpg",
    },
    {
      id: 4,
      name: "Samsung Galaxy Watch 5",
      price: "$249",
      image: "/products/samsung-watch.jpg",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative w-full h-96 flex items-center px-10 bg-cover bg-center text-white" 
        style={{ backgroundImage: "url('pixelcut-export.png')" }} // Replace with actual image
      >
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold">Best Collections of <span className="text-yellow-400">Brands</span> </h1>
          <p className="mt-2 text-lg text-gray-300">
            Find the best products at unbeatable prices!
          </p>
          <Link 
            to={'/shop'} 
            className="mt-5 inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>


      {/* Categories Section */}
      <div className="py-10 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Explore Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="bg-gray-100 p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                {category.products.map((product) => (
                  <div key={product.id} className="flex flex-col items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <p className="text-sm text-gray-700 mt-2">{product.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Featured Products</h2>
        <p className="text-gray-600 text-center mt-2">Discover our top picks for you</p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-yellow-600 font-bold">{product.price}</p>
              <button className="mt-3 w-full py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition">
                Add to Cart
              </button>
            </div>
          ))}
          </div>
        </div>
    </div>

    
  );
}

export default HomePage;
