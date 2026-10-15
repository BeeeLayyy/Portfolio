import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Notes (the blog, D20) are written as .mdx files in src/content/notes and
// imported by the notes pages; MDX is Markdown that can also hold components.
const withMDX = createMDX({});

export default withMDX(nextConfig);
