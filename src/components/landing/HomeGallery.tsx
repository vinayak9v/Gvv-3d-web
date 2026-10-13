import Link from 'next/link';

export type GalleryItem = { id: number; title: string; image_url: string };

// Latest photos from the admin-managed gallery, linking to the full gallery page.
export default function HomeGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="w-full py-20 px-4 md:px-8 flex flex-col items-center font-sans">
      <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide mb-12 text-center">Gallery</h2>
      <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href="/about/gallery-media"
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
          >
            <img
              src={item.image_url}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
      <Link
        href="/about/gallery-media"
        className="mt-10 inline-block rounded-md border border-[#b89539] bg-gradient-to-b from-[#fae27c] to-[#d6ad44] px-10 py-3 text-sm font-bold tracking-wide text-black shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105"
      >
        View Full Gallery
      </Link>
    </section>
  );
}
