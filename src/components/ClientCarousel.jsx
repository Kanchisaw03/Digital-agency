import { useEffect, useRef } from 'react';

const clients = [
  'Airtel',
  'Aptech',
  'Axis Bank',
  'JM Financial',
];

export default function ClientCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;
    const scroll = () => {
      if (carousel) {
        scrollAmount += 1;
        if (scrollAmount >= carousel.scrollWidth / 2) scrollAmount = 0;
        carousel.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(scroll);
  }, []);

  return (
    <div className="py-12 bg-dark">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-300">Trusted by Leading Brands</h3>
      <div className="overflow-x-hidden">
        <div
          ref={carouselRef}
          className="flex gap-12 whitespace-nowrap px-4 py-4 border-y border-gradient-to-r from-primary-blue via-primary-green to-primary-violet animate-scroll"
          style={{ scrollBehavior: 'smooth' }}
        >
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="inline-block text-lg font-bold text-gray-100 px-6 py-2 rounded bg-neutral-900 border border-neutral-800 shadow hover:scale-105 transition-transform">
              {client}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 