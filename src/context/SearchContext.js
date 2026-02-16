import { createContext, useEffect, useMemo, useState } from "react";

export const SearchContext = createContext();

const slugify = (name) =>
  name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const normalize = (items, category) =>
  items.map((p, index) => ({
    ...p,
    category,
    id: `${category}-${p.id ?? index}`,
    slug: p.slug ?? slugify(p.name),
  }));

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/assets/phones.json").then((r) => r.json()),
      fetch("/assets/laptops.json").then((r) => r.json()),
      fetch("/assets/gaming.json").then((r) => r.json()),
      fetch("/assets/tv.json").then((r) => r.json()),
      fetch("/assets/smartwatches.json").then((r) => r.json()),
    ])
      .then(([phones, laptops, gaming, tv, watches]) => {
        setAllProducts([
          ...normalize(phones, "phones"),
          ...normalize(laptops, "laptops"),
          ...normalize(gaming, "gaming"),
          ...normalize(tv, "tv"),
          ...normalize(watches, "smartwatches"),
        ]);
      })
      .catch(console.error);
  }, []);

  const results = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }, [searchTerm, allProducts]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, results,allProducts }}>
      {children}
    </SearchContext.Provider>
  );
}
