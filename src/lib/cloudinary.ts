import cloudinaryMap from "./cloudinary-map.json";

const map: Record<string, string> = cloudinaryMap;

/**
 * Returns the Cloudinary CDN optimized URL (f_auto, q_auto) for any local image path.
 * If the path is already a remote URL, or if not found in the map, returns the original path.
 */
export function getCloudinaryUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return map[path] || path;
}

export const cld = getCloudinaryUrl;
export default getCloudinaryUrl;
