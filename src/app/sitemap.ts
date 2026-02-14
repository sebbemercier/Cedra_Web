import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cedra-shop.be';
  const locales = ['fr', 'en', 'nl'];
  const paths = ['', '/products', '/about', '/contact', '/help', '/login', '/register-pro'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    paths.forEach((path) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
