import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import ProductCard from 'Components/ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function handleAddToCart(productId) {
  console.log('Add to cart:', productId);
}

function handleAddToWishlist(productId) {
  console.log('Add to wishlist:', productId);
}

function SearchPage() {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    fetch(`http://localhost:5000/api/product/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <MainLayout>
      <div className="flex flex-col w-full px-20 py-6 border-y-1 border-[#242627] gap-y-6">
        <h1 className="text-white font-[IniraBold] text-2xl">
          Search Results for: "{searchTerm}"
        </h1>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
        <div className="p-4 rounded-xl bg-[#242627] flex justify-start gap-4 flex-wrap">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex-grow basis-[200px] max-w-[200px]"   // m4 fahmha lsa
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              </div>
            ))
          ) : (
            <p className="text-white">No products found.</p>
          )}
        </div>
        )}
      </div>
    </MainLayout>
  );
}

export default SearchPage;
