# 🌱 Plantify - Plant Nursery Management System

A modern, full-stack web application for managing and browsing plant nurseries. Built with Next.js 14, MongoDB, and Cloudinary for seamless plant catalog management.

![Plantify Banner](https://via.placeholder.com/800x400/22c55e/ffffff?text=🌱+Plantify+-+Plant+Nursery+System)

## ✨ Features

### 🏠 User Features
- **Beautiful Landing Page** - Animated background with floating particles and gradient effects
- **Plant Catalog** - Browse plants with advanced search and filtering
- **Real-time Search** - Case-insensitive search by plant name or categories
- **Category Filtering** - Filter plants by Indoor, Outdoor, Succulent, Air Purifying, and Home Decor
- **Pagination** - Efficient loading with customizable items per page
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Authentication** - Secure JWT-based login system with auto-registration

### 👨‍💼 Admin Features
- **Admin Dashboard** - Dedicated interface for plant management
- **Add Plants** - Upload plant images to Cloudinary with form validation
- **Role-based Access** - Admin-only routes and features
- **Image Upload** - Seamless integration with Cloudinary for image storage
- **Real-time Notifications** - Toast notifications for user feedback

### 🎨 UI/UX Features
- **Modern Design** - Glassmorphism effects with backdrop blur
- **Smooth Animations** - Floating elements and gradient animations
- **Loading States** - Professional loading indicators
- **Error Handling** - Comprehensive error messages and validation
- **Custom Components** - Reusable UI components with consistent styling

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant toast notifications
- **JWT Decode** - JWT token parsing

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

### Cloud Services
- **MongoDB Atlas** - Cloud database hosting
- **Cloudinary** - Image storage and optimization
- **Vercel** - Deployment and hosting (recommended)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard
│   │   └── page.js              # Admin plant management
│   ├── api/                      # API routes
│   │   ├── admin/               # Admin authentication
│   │   ├── image-upload/        # Cloudinary integration
│   │   ├── login/               # User authentication
│   │   ├── plants/              # Plant CRUD operations
│   │   ├── post-plant/          # Create new plants
│   │   ├── seed/                # Database seeding
│   │   └── test/                # Database connection test
│   ├── plants/                   # Plant catalog pages
│   │   ├── _component/          # Page-specific components
│   │   └── page.js              # Main plants listing
│   ├── layout.js                # Root layout with providers
│   └── page.js                  # Landing page with login
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── Background.jsx           # Animated background
│   ├── Footer.jsx               # Site footer
│   ├── Header.jsx               # Navigation header
│   ├── PlantCard.jsx            # Plant display card
│   └── SearchFilter.jsx         # Search and filter controls
├── lib/                         # Utility libraries
│   ├── cloudinary.js            # Cloudinary configuration
│   └── mongodb.js               # Database connection
├── models/                      # MongoDB schemas
│   ├── Plant.js                 # Plant data model
│   └── User.js                  # User authentication model
└── styles/                      # Custom CSS
    └── animations.css           # Keyframe animations
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/plantify.git
cd plantify
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=plantify

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Database Setup

#### MongoDB Atlas Configuration
1. Create a MongoDB Atlas cluster
2. Set up database user and network access
3. Get your connection string
4. Create text index for search functionality:
   ```javascript
   // In MongoDB Atlas > Collections > Indexes
   {
     "name": "text",
     "categories": "text"
   }
   ```

### 5. Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Create a folder called "plants" (optional)

### 6. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 7. Test Database Connection
Visit [http://localhost:3000/api/test](http://localhost:3000/api/test) to verify MongoDB connection.

## 📚 API Documentation

### Authentication

#### POST `/api/login`
User login with auto-registration
```javascript
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "message": "Login successful",
  "token": "jwt-token"
}
```

#### GET `/api/admin`
Get admin user profile (requires auth)
```javascript
// Headers
Authorization: Bearer <token>

// Response
{
  "id": "user-id",
  "email": "admin@example.com",
  "isAdmin": true
}
```

### Plants

#### GET `/api/plants`
Fetch plants with search, filter, and pagination
```javascript
// Query Parameters
?q=succulent                    // Search by name/category
&category=Indoor               // Filter by category
&inStock=true                  // Filter by stock status
&page=1                        // Page number
&limit=20                      // Items per page
&sort=price:desc              // Sort by field:order

// Response
{
  "total": 150,
  "page": 1,
  "limit": 20,
  "results": [
    {
      "_id": "plant-id",
      "name": "Snake Plant",
      "price": 25.99,
      "categories": ["Indoor", "Air Purifying"],
      "inStock": true,
      "imageUrl": "https://cloudinary.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/post-plant`
Create new plant (admin only)
```javascript
// Headers
Authorization: Bearer <admin-token>
Content-Type: application/json

// Request
{
  "name": "Monstera Deliciosa",
  "price": 45.99,
  "categories": ["Indoor", "Home Decor"],
  "inStock": true,
  "imageUrl": "https://cloudinary.com/uploaded-image.jpg"
}
```

### Image Upload

#### POST `/api/image-upload`
Upload image to Cloudinary
```javascript
// Request (FormData)
file: <image-file>

// Response
{
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v123/plants/image.jpg"
}
```

## 🎨 Styling Guide

### Color Palette
- **Primary Green**: `#16a34a` (green-600)
- **Light Green**: `#22c55e` (green-500)
- **Dark Green**: `#15803d` (green-700)
- **Background**: Gradient from `#dcfce7` to white
- **Text**: `#374151` (gray-700)

### Key Design Elements
- **Glassmorphism**: `bg-white/80 backdrop-blur-md`
- **Rounded Corners**: `rounded-2xl` for cards, `rounded-xl` for inputs
- **Shadows**: `shadow-2xl` for elevated elements
- **Animations**: Custom keyframes for floating elements

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with salt rounds
- **Input Validation** - Zod schema validation
- **Admin Protection** - Role-based route protection
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
MONGO_URI=your-production-mongodb-uri
DB_NAME=plantify
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Plant search and filtering
- [ ] Admin plant creation
- [ ] Image upload functionality
- [ ] Responsive design on mobile
- [ ] Database connection
- [ ] API endpoints

### Test API Connection
```bash
# Test MongoDB connection
curl http://localhost:3000/api/test

# Test plant fetching
curl http://localhost:3000/api/plants?limit=5
```

### Development Guidelines
- Follow Next.js 14 best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations
- Maintain responsive design principles

## 🐛 Common Issues & Solutions

### Search Not Working
- Ensure text index is created in MongoDB Atlas
- Check if `$text` search is properly implemented
- Verify database connection

### Image Upload Failing
- Check Cloudinary credentials
- Verify file size limits
- Ensure proper CORS settings

### Authentication Issues
- Verify JWT secret is set
- Check token expiration
- Ensure proper header format: `Bearer <token>`

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database solution
- Cloudinary for seamless image management
- Tailwind CSS for beautiful styling utilities

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: jitendrathakur2478@gmail.com
---

**Built with ❤️ and 🌱 by Jitendra Thakur**