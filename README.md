# 🛒 Sel3a – Modern Hybrid E-commerce Platform
![Sel3a Logo](https://i.postimg.cc/DfYSjXRd/Sel3a-Logo-copy.png)

Sel3a is a hybrid e-commerce platform developed as a university project in just one week.
It bridges the gap between online shopping and local retail by allowing sellers to manage inventory per branch,
enabling customers to choose between home delivery or in-store pickup. With dedicated roles for customers, sellers, and administrators,
Sel3a supports category and product management,
branch-specific stock tracking, and secure role-based access — delivering a flexible and localized shopping experience.

🚨 **IMPORTANT NOTICE** 🚨  
> This project was originally developed **in February 2025** and built in just **one week** due to a heavy academic workload.  
> It was rushed and **does NOT reflect my current coding skills, architectural design, or best practices.**  
> Since then, I’ve significantly improved my software engineering abilities, system design, and performance optimization.  
> Please consider this repository a **work in progress** or **a historical reference** only.

### 🖼️ Sel3a Screenshots – Interface Preview
<p align="center">
  <img src="https://github.com/user-attachments/assets/265b23d9-6c26-4534-8393-3c00d8eba7b1" width="33%" />
  <img src="https://github.com/user-attachments/assets/00ee65c2-158f-4028-a90a-937cdd764d53" width="33%" />
  <img src="https://github.com/user-attachments/assets/e77441d4-6cca-43f7-a6b0-bf854e405da5" width="33%" />
</p>

## 👥 Core Functionalities by User Type

### 🔐 Administrator

- Secure login
- Manage geographic entities such as governorates and districts  
- Approve pending store registrations
- Brand catalog management

### 🛍️ Seller

- User registration and login
- Product creation and management
- Branch management with individual stock control
- Inventory adjustments tied to orders and cancellations

### 🛒 Customer

- Account creation and login
- Browsing products by store and category
- Search and filter capabilities 
- Related product suggestions
- Address management (add/remove)  
- Wishlist functionality
- Full cart lifecycle (add/remove/list/count)  
- Place and cancel delivery or pickup orders

---

## 🛠️ Technical Stack and Highlights

- **Backend:** Node.js with Express, JWT authentication, PostgreSQL database using Sequelize (Database-First)
- **Frontend:** React + tailwindcss/
- **UI/UX Design:** Crafted in Figma  
> [View Figma Prototype](https://www.figma.com/design/bXK8WyeFd262h77U2pfT6p/Sel3a-Design?m=auto&t=UiH1olfwW95j20AH-1)
---

## ⚡ Quick Start Guide

## Backend
1. Clone the repository and navigate into it:
 ```bash
 git clone https://github.com/IbrahimElFitiany/Sel3a.git
 cd Sel3a
 ```
2. Set up the backend:
  ```bash
  #Navigate to the backend folder:
  cd Sel3a_BackEnd

  # Create a PostgreSQL database manually (via terminal or pgAdmin)::
  CREATE DATABASE Sel3a;

  #Run the provided SQL schema to create all tables:
  psql -U your_username -d Sel3a -f Sel3a.sql

  #Install Backend Dependencies
  npm install
```
3. Create a .env file in the Sel3a_BackEnd folder with the following content (update values as needed):
```
  DB_HOST= hostname
  DB_PORT= db_port
  DB_NAME= dbName
  DB_USER= db_user
  DB_PASSWORD= db_pass
  JWT_SECRET= Your_Secret_Key
  PORT= portnumber
```
4. Start The Server:
```bash
  #Start the backend server:
  node server.js
```

## FrontEnd
```bash
cd ../Sel3a_Frontend
npm install
npm run dev
```
