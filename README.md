# 🛍️ FastShop Backend

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

A robust and scalable e-commerce backend API built with Node.js, Express.js, and MongoDB. FastShop provides a complete backend solution for modern e-commerce applications with user authentication, product management, file uploads, and more.

## ✨ Features
- **User Authentication** - Secure user registration and login with Passport.js
- **Product Management** - CRUD operations for products with detailed schemas
- **Image Upload** - Cloudinary integration for efficient image storage
- **Review System** - User reviews and ratings for products
- **Security** - Built-in authentication middleware and session management
- **Template Engine** - EJS templates for server-side rendering
- **RESTful API** - Clean and organized API endpoints
-
**Data Validation** - Joi schema validation for request data
## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime Environment | Latest |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | 5.1.0 |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Database | 8.18.0 |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ODM | 8.18.0 |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Image Storage | 1.41.3 |
| ![Passport](https://img.shields.io/badge/-Passport-34E27A?style=flat&logo=passport&logoColor=white) | Authentication | 0.7.0 |
| ![EJS](https://img.shields.io/badge/-EJS-B4CA65?style=flat&logo=ejs&logoColor=white) | Template Engine | 3.1.10 |

## 📁 Project Structure

```
FastShop/Backend/
├── 📁 api/
│   ├── 📁 middleware/          # Custom middleware functions
│   │   ├── auth.middleware.js  # Authentication middleware
│   │   └── index.middleware.js # Middleware setup
│   └── 📁 routes/              # API route definitions
│       ├── home.routes.js      # Home page routes
│       └── product.routes.js   # Product CRUD routes
├── 📁 config/
│   ├── 📁 conn/
│   │   └── db.js              # Database connection
│   └── cloudinary.config.js   # Cloudinary configuration
├── 📁 init/                   # Database initialization
│   ├── data.js               # Sample data
│   └── initData.js           # Data seeding script
├── 📁 models/                 # MongoDB schemas
│   ├── product.model.js      # Product data model
│   └── user.model.js         # User data model
├── 📁 utils/                 # Utility functions
├── 📁 views/                 # EJS templates
│   ├── 📁 components/        # Reusable components
│   └── 📁 template/          # Page templates
├── 📄 server.js              # Application entry point
└── 📄 package.json           # Dependencies and scripts
```

## 🛠️ Installation

### Prerequisites

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white) Node.js (v14 or higher)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) MongoDB instance
- ![pnpm](https://img.shields.io/badge/-pnpm-F69220?style=flat&logo=pnpm&logoColor=white) pnpm package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FastShop/Backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/fastshop
   
   # Session Secret
   SESSION_SECRET=your-super-secret-session-key
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the application**
   ```bash
   # Development mode
   pnpm run dev
   
   # Production mode
   pnpm start
   ```

## 📚 API Documentation

### 🏠 Home Routes
- `GET /` - Homepage
- `GET /signup` - User registration page
- `GET /login` - User login page
- `POST /signup` - Register new user
- `POST /login` - Authenticate user

### 📦 Product Routes
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (Auth required)
- `PUT /products/:id` - Update product (Auth required)
- `DELETE /products/:id` - Delete product (Auth required)
- `POST /products/:id/reviews` - Add product review (Auth required)

### 📄 Response Format

```json
{
  "success": true,
  "data": {
    "product": {
      "id": "507f1f77bcf86cd799439011",
      "title": "Sample Product",
      "description": "Product description",
      "price": 299.99,
      "category": "Electronics",
      "images": ["image1.jpg", "image2.jpg"],
      "reviews": [],
      "rating": 4.5,
      "stock": 50
    }
  },
  "message": "Product retrieved successfully"
}
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String, // Hashed
  createdAt: Date,
  isAdmin: Boolean
}
```

### Product Model
```javascript
{
  title: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  stock: Number,
  images: [{ url: String, public_id: String }],
  reviews: [ReviewSchema],
  rating: Number,
  dimensions: { width: Number, height: Number, depth: Number },
  owner: ObjectId // Reference to User
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-reload
pnpm run dev

# Start production server
pnpm start

# Run tests (when available)
pnpm test
```

### Code Style Guidelines

- Use ES6+ features
- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for asynchronous operations
- Validate all inputs with Joi
- Maintain consistent naming conventions

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fastshop
SESSION_SECRET=your-production-session-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Deployment Platforms

- ![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat&logo=heroku&logoColor=white) Heroku
- ![Railway](https://img.shields.io/badge/-Railway-0B0D0E?style=flat&logo=railway&logoColor=white) Railway
- ![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat&logo=vercel&logoColor=white) Vercel
- ![DigitalOcean](https://img.shields.io/badge/-DigitalOcean-0080FF?style=flat&logo=digitalocean&logoColor=white) DigitalOcean

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

### Development Guidelines

- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all tests pass

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the flexible database
- Cloudinary for seamless image management
- Passport.js for authentication solutions
- All open source contributors

<div align="center">
  <p>⭐ Star this repository if you find it helpful!</p>
  <p>Made with ❤️ by the Onkar sathe</p>
</div>
