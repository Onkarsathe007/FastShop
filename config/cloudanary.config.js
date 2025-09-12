const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "uploads",
		allowed_formats: ["jpg", "png", "jpeg", "webp"],
		public_id: (_req, file) => {
			// Use original filename + timestamp for uniqueness
			return `${Date.now()}-${file.originalname.split(".")[0]}`;
		},
	},
});

module.exports = { cloudinary, storage };
