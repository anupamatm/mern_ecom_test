// In client/src/utils/images.js
export function getImageUrl(image) {
  if (!image) return "/placeholder.png";
  // If it's already a full URL (http or https), return as is
  if (image.startsWith("http")) return image;
  // If it's a local path (starts with /uploads/), remove the leading slash
  if (image.startsWith("/uploads/")) {
    return image.substring(1); // Remove the leading slash
  }
  // For any other case, return as is
  return image;
}

export function getAllImageUrls(images, fallback = "/placeholder.png") {
  if (!images || images.length === 0) return [fallback];
  return images.map(url => getImageUrl(url));
}