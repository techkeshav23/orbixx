export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_TEL = `tel:+${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY || "";

// Social Media Links
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com";
export const YOUTUBE_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com";

export const carouselImages = [
  { src: "/transformations/priya.jpg", name: "Priya S.", result: "-15 kg" },
  { src: "/transformations/ananya.jpg", name: "Ananya R.", result: "-10 kg" },
  { src: "/transformations/meera.jpg", name: "Meera K.", result: "-8 kg" },
  { src: "/transformations/sneha.jpg", name: "Sneha D.", result: "-12 kg" },
  { src: "/transformations/kavita.jpg", name: "Kavita P.", result: "-18 kg" },
  { src: "/transformations/ritu.jpg", name: "Ritu M.", result: "-9 kg" },
  { src: "/transformations/deepika.jpg", name: "Deepika G.", result: "-14 kg" },
  { src: "/transformations/nisha.jpg", name: "Nisha T.", result: "-7 kg" },
];

export const wheelOffers = [
  { label: "10% OFF", color: "#FF6B4A", emoji: "🏷️" },
  { label: "FREE CLASS", color: "#14B8A6", emoji: "🎉" },
  { label: "FREE WEEK", color: "#EC4899", emoji: "🔥" },
  { label: "20% OFF", color: "#FF6B4A", emoji: "💰" },
  { label: "1 MONTH FREE", color: "#14B8A6", emoji: "🏆" },
  { label: "15% OFF", color: "#EC4899", emoji: "✨" },
];
