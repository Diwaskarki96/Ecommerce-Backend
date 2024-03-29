# E-Commerce Backend with Node.js and Express.js

This repository contains the backend code for an E-Commerce application built using Node.js and Express.js. This project is for my personal learning purpose.

# E-commerce Backend Project Overview:

This project is about creating a simple, yet powerful, system for an online store. It uses Node.js and Express.js to handle tasks like managing users, keeping track of products, and dealing with shopping carts.

# User API:

**Registration**: Enables users to create new accounts with unique credentials. Validates user input and prevents duplicate registrations.

**Login**: Facilitates user authentication through secure login procedures. Generates JSON Web Tokens (JWT) for authenticated users, ensuring secure access to protected endpoints.

# Product API:

**Product Listing**: Retrieves and displays all available products from the database, providing essential details for buyers.

**Adding Products**: Allows sellers to add new products to the platform, validating input data to maintain data integrity.

**Product Details**: Retrieves specific product details based on the provided product ID, ensuring accurate information retrieval.
Product Deletion: Empowers sellers to remove their listed products from the platform, ensuring data consistency and user control.

**Product Editing**: Enables sellers to modify product details, ensuring accurate representation and updates within the system.
Product Listing by Buyer/Seller: Offers dedicated endpoints for buyers and sellers to view their respective product listings, streamlining the user experience.

# Cart API:

**Adding to Cart**: Allows buyers to add products to their carts, validating product availability and preventing duplicate additions.

**Cart Clearing**: Enables buyers to clear their entire cart, providing a streamlined user experience for cart management.

**Cart Item Deletion**: Allows buyers to remove specific items from their cart, ensuring flexibility and control over their shopping selections.

**Cart Item Quantity Adjustment**: Facilitates buyers in adjusting the quantity of items in their cart, ensuring a seamless shopping experience.

**Viewing Cart Contents**: Provides buyers with an overview of their cart contents, including product details and ordered quantities, facilitating informed purchasing decisions.
