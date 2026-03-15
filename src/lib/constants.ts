export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Feature flag: keep Results code in repo but disable access in UI/routes.
export const RESULTS_ENABLED = process.env.NEXT_PUBLIC_RESULTS_ENABLED === "true";

// Social Media Links
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";
export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/orbixx-fitness/";
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
  { src: "/transformations/nisha.jpeg", name: "Nisha T.", result: "-7 kg" },
  { src: "/transformations/1.jpeg", name: "Pooja V.", result: "-11 kg" },
  { src: "/transformations/2.jpeg", name: "Shalini A.", result: "-9 kg" },
  { src: "/transformations/3.jpeg", name: "Tanvi R.", result: "-16 kg" },
  { src: "/transformations/4.jpeg", name: "Ishita M.", result: "-8 kg" },
  { src: "/transformations/5.jpeg", name: "Aarti S.", result: "-13 kg" },
  { src: "/transformations/6.jpeg", name: "Diya K.", result: "-10 kg" },
  { src: "/transformations/7.jpeg", name: "Mansi P.", result: "-19 kg" },
  { src: "/transformations/8.jpeg", name: "Neha G.", result: "-6 kg" },
  { src: "/transformations/9.jpeg", name: "Shruti D.", result: "-12 kg" },
  { src: "/transformations/10.jpeg", name: "Swati N.", result: "-15 kg" },
  { src: "/transformations/11.jpeg", name: "Radhika J.", result: "-10 kg" },
  { src: "/transformations/12.jpeg", name: "Kriti B.", result: "-14 kg" },
  { src: "/transformations/13.jpeg", name: "Anjali T.", result: "-11 kg" },
  { src: "/transformations/14.jpeg", name: "Vidya R.", result: "-17 kg" },
];
