# FastShop
A modern e-commerce web application built with Node.js, Express, and MongoDB.

## Features

- Product catalog with detailed product pages
- Responsive web design with EJS templating
- MongoDB database integration
- Product reviews and ratings
- Product search and categorization
- RESTful API endpoints

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: EJS with EJS-Mate
- **Environment**: dotenv for configuration
- **Package Manager**: pnpm

## Project Structure

```
FastShop/
├── Backend/
│   ├── conn/           # Database connection
│   ├── init/           # Data initialization
│   ├── models/         # Mongoose models
│   ├── views/          # EJS templates
│   │   ├── components/ # Reusable components
│   │   └── template/   # Base templates
│   ├── server.js       # Main server file
│   └── package.json    # Dependencies
├── .gitignore
├── LICENSE
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/onkarsathe007/FastShop 
cd FastShop
```

2. Navigate to the Backend directory:
```bash
cd Backend
```

3. Install dependencies:
```bash
pnpm install
```

4. Create a `.env` file in the Backend directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fastshop
```

5. Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

## API Routes

- `GET /` - Home page with product listings
- `GET /products/:id` - Individual product page

## Database Schema

The application uses a comprehensive product schema including:
- Product details (title, description, price, category)
- Inventory management (stock, SKU)
- Product reviews and ratings
- Product dimensions and specifications
- Product images and thumbnails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

0nkar 5a1h3
