import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  robots?: string;
}

export function useSEO({ title, description, keywords, robots }: SEOProps) {
  useEffect(() => {
    const originalTitle = document.title;
    
    // Set dynamic title with the premium brand suffix
    document.title = `${title} | Bloom & Box`;

    // Seek and update description meta tag
    const descMeta = document.querySelector('meta[name="description"]');
    let originalDesc = '';
    if (descMeta) {
      originalDesc = descMeta.getAttribute('content') || '';
      if (description) {
        descMeta.setAttribute('content', description);
      }
    }

    // Seek and update keywords meta tag
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    let originalKeywords = '';
    if (keywordsMeta) {
      originalKeywords = keywordsMeta.getAttribute('content') || '';
      if (keywords) {
        keywordsMeta.setAttribute('content', keywords);
      }
    }

    // Seek and update robots meta tag
    const robotsMeta = document.querySelector('meta[name="robots"]');
    let originalRobots = '';
    if (robotsMeta) {
      originalRobots = robotsMeta.getAttribute('content') || '';
      if (robots) {
        robotsMeta.setAttribute('content', robots);
      }
    }

    // Also update Open Graph Title dynamically for rich-link sharing inside SPAs
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    let originalOgTitle = '';
    if (ogTitleMeta) {
      originalOgTitle = ogTitleMeta.getAttribute('content') || '';
      ogTitleMeta.setAttribute('content', `${title} | Bloom & Box`);
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    let originalOgDesc = '';
    if (ogDescMeta && description) {
      originalOgDesc = ogDescMeta.getAttribute('content') || '';
      ogDescMeta.setAttribute('content', description);
    }

    // Cleanup and revert to master defaults when component unmounts
    return () => {
      document.title = originalTitle;
      if (descMeta && originalDesc) {
        descMeta.setAttribute('content', originalDesc);
      }
      if (keywordsMeta && originalKeywords) {
        keywordsMeta.setAttribute('content', originalKeywords);
      }
      if (robotsMeta && originalRobots) {
        robotsMeta.setAttribute('content', originalRobots);
      }
      if (ogTitleMeta && originalOgTitle) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }
      if (ogDescMeta && originalOgDesc) {
        ogDescMeta.setAttribute('content', originalOgDesc);
      }
    };
  }, [title, description, keywords, robots]);
}
