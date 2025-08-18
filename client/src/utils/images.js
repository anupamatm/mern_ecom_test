

export function getImageUrl(image) {
  if (!image) return "/placeholder.png";
  if (image.startsWith("http")) return image; // Cloudinary or any full URL
  return `${process.env.REACT_APP_API_BASE || ""}${image}`; // fallback if relative
}

export function getAllImageUrls(images, fallback = "/placeholder.png") {
  if (!images || images.length === 0) return [fallback];

  return images.filter((url) => url.startsWith("http"));
}
