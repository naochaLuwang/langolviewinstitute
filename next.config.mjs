
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'source.unsplash.com',
            'lh3.googleusercontent.com',
            'res.cloudinary.com'
        ],
    },
    experimental: {
        turbopack: true
    },
};

export default nextConfig;
