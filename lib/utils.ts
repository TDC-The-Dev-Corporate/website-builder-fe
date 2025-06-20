import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import imageCompression from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logoutUser() {
  localStorage.removeItem("template");
  localStorage.removeItem("token");
  localStorage.removeItem("published");
  localStorage.removeItem("verified");
  localStorage.removeItem("email");
  localStorage.removeItem("user");
  window.location.href = "/AIWebsiteBuilders/auth/login";
}

export const cleanLocalStorage = () => {
  const preservedKeys = ["published", "token", "user"];
  Object.keys(localStorage).forEach((key) => {
    if (!preservedKeys.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};

export function getUserId(token: string): number | null {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.id ? decoded.id : null;
  } catch (error) {
    return null;
  }
}

export const getFontSize = (size: string) => {
  const sizes = {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  };
  return sizes[size] || "1rem";
};

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getRadianAngle = (degreeValue: number): number =>
  (degreeValue * Math.PI) / 180;

export const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (file) => {
        resolve(file as Blob);
      },
      "image/jpeg",
      0.95
    );
  });
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scale = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export const springs = {
  gentle: [0.34, 1.56, 0.64, 1],
  bounce: [0.22, 1.2, 0.36, 1],
  swift: [0.55, 0, 0.1, 1],
  smooth: [0.4, 0, 0.2, 1],
};

export const linearGradient = (
  direction: string,
  color1: string,
  position1: number,
  color2: string,
  position2: number
) =>
  `linear-gradient(${direction}, ${color1} ${position1}%, ${color2} ${position2}%)`;

export const formatTradeType = (tradeType: string): string => {
  return tradeType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const tradesmanQuotes = [
  "Build your online presence as solidly as you build your projects",
  "Your craftsmanship deserves to be showcased professionally",
  "Connect with clients who value quality as much as you do",
  "Turn your skilled hands into a thriving digital business",
  "Showcase your expertise to clients who need your skills",
  "Building trust online as you do on every job site",
  "Craft your online reputation with the same care as your trade",
  "Your trade skills deserve professional digital representation",
  "Your experience matters. Let's help the world see it",
];

export const getRandomQuote = (): string => {
  return tradesmanQuotes[Math.floor(Math.random() * tradesmanQuotes.length)];
};

export const uploadToCloudinary = async (files: File[]) => {
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const uploadedAssets: UploadedAsset[] = [];

  for (const file of files) {
    try {
      const isImage = file.type.startsWith("image/");
      const resourceType = isImage ? "image" : "raw";

      let fileToUpload = file;

      if (isImage) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
          fileType: "image/jpeg",
          initialQuality: 0.6,
        };

        try {
          fileToUpload = await imageCompression(file, options);
        } catch (compressionError) {
          console.warn(
            "Image compression failed, uploading original",
            compressionError
          );
          fileToUpload = file;
        }
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      if (isImage) {
        formData.append("quality", "auto:good");
        formData.append("fetch_format", "auto");
      }

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload to Cloudinary");

      const data = await res.json();

      uploadedAssets.push({
        id: data.public_id,
        src: data.secure_url,
        name: file.name,
        mimeType: file.type,
        size: fileToUpload.size,
        isImage,
        type: file.type,
      });
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      continue;
    }
  }

  return uploadedAssets;
};

export const isDefaultTemplate = (templateId: string): boolean => {
  const defaultIds = [
    "carpenter-template",
    "electrician-template",
    "hvac-template",
    "landscaper-template",
    "painter-template",
    "plumber-template",
  ];

  return defaultIds.includes(templateId);
};
