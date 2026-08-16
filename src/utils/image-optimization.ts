export interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
}

/**
 * Optimizes an image URL from Unsplash or Pexels using their dynamic API parameters.
 * Maintains existing appearance while reducing payload.
 */
export function getOptimizedImageUrl(url: string, options: ImageOptimizationOptions = {}): string {
  if (!url) return url;

  const { width, quality = 80, format = 'webp' } = options;

  try {
    const urlObj = new URL(url);

    // Unsplash Optimization
    if (urlObj.hostname.includes('unsplash.com')) {
      if (width) urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fm', format);
      // Ensure fit is preserved if already set, otherwise default to crop
      if (!urlObj.searchParams.has('fit')) {
        urlObj.searchParams.set('fit', 'crop');
      }
      return urlObj.toString();
    }

    // Pexels Optimization
    if (urlObj.hostname.includes('pexels.com')) {
      // Pexels uses 'w' for width and 'h' for height, and auto-compresses
      if (width) urlObj.searchParams.set('w', width.toString());
      // Pexels doesn't have a direct 'q' parameter like Unsplash in all URL types, 
      // but 'auto=compress' is common.
      urlObj.searchParams.set('auto', 'compress');
      urlObj.searchParams.set('cs', 'tinysrgb');
      // Format can be forced via &fm=
      urlObj.searchParams.set('fm', format);
      return urlObj.toString();
    }

    return url;
  } catch (e) {
    console.warn('Failed to optimize image URL:', url, e);
    return url;
  }
}

/**
 * Generates a srcSet string for responsive images
 */
export function getImageUrlSrcSet(url: string, widths: number[] = [400, 800, 1200, 1600]): string {
  return widths
    .map(w => `${getOptimizedImageUrl(url, { width: w })} ${w}w`)
    .join(', ');
}
