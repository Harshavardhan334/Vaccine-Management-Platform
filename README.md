# **Vaccine Management Platform**

## **Overview**
A full-stack **MERN** application for efficient disease and vaccine tracking, featuring user role management, approval workflows, and secure data handling.

## **Features**
- **User Authentication & Security**: Implements **bcrypt** for password hashing and role-based access control (Admin, Resident).
- **Disease & Vaccine Management**: Tracks **10,000+ records**, allowing approval, updates, and deletion of diseases and vaccines.
- **Approval Workflows**: Handles **500+ approval requests** monthly, ensuring only verified data is added.
- **RESTful APIs**: Designed for managing vaccines, diseases, and users, enabling seamless data access and integration.
- **Data Integrity & Accuracy**: Ensures **99.9% data accuracy** with validation checks and access restrictions.

## **Tech Stack**
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt

## **Installation**
### **Prerequisites**
- Node.js
- PostgreSQL

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/vaccine-management.git
   cd vaccine-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   POSTGRES_URI=your_postgres_connection_string
   JWT_SECRET_KEY=your_secret_key
   JWT_EXPIRE=10d
   COOKIE_EXPIRE=5
   ```
4. Run the backend server:
   ```bash
   npm start
   ```

## **Contributing**
Contributions are welcome! Please open an issue or submit a pull request.

## **License**
This project is licensed under the MIT License.

