# API Documentation

The ZOC Project provides both web routes and API endpoints for various functionalities.

## Base URL

```
http://localhost:8000
```

## Authentication

The application uses Laravel Fortify for authentication, supporting:
- Session-based authentication for web routes
- Token-based authentication for API routes
- Two-factor authentication (2FA)

### Authentication Headers

For API requests:
```http
Authorization: Bearer {your-token}
Accept: application/json
Content-Type: application/json
```

## Products API

### Get All Products

```http
GET /products
```

**Parameters:**
- `category` (string, optional) - Filter by category slug
- `search` (string, optional) - Search in product name and description
- `min_price` (decimal, optional) - Minimum price filter
- `max_price` (decimal, optional) - Maximum price filter
- `sort` (string, optional) - Sort by: `price_low`, `price_high`, `name`, `featured`, `created_at`
- `order` (string, optional) - Sort order: `asc`, `desc`
- `page` (integer, optional) - Page number for pagination

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "slug": "product-name",
      "description": "Product description",
      "short_description": "Short description",
      "sku": "PROD-001",
      "price": "99.99",
      "compare_price": "129.99",
      "quantity": 10,
      "is_active": true,
      "is_featured": false,
      "category": {
        "id": 1,
        "name": "Category Name",
        "slug": "category-name"
      },
      "images": [
        {
          "id": 1,
          "url": "/storage/products/image.jpg",
          "alt_text": "Product image",
          "is_primary": true
        }
      ],
      "formatted_price": "$99.99",
      "formatted_compare_price": "$129.99",
      "stock_quantity": 10
    }
  ],
  "links": {
    "first": "http://localhost:8000/products?page=1",
    "last": "http://localhost:8000/products?page=5",
    "prev": null,
    "next": "http://localhost:8000/products?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 12,
    "to": 12,
    "total": 50
  }
}
```

### Get Single Product

```http
GET /products/{slug}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "slug": "product-name",
  "description": "Detailed product description",
  "short_description": "Short description",
  "sku": "PROD-001",
  "price": "99.99",
  "compare_price": "129.99",
  "quantity": 10,
  "attributes": {
    "color": "red",
    "size": "large"
  },
  "category": {
    "id": 1,
    "name": "Category Name",
    "slug": "category-name"
  },
  "images": [
    {
      "id": 1,
      "url": "/storage/products/image.jpg",
      "alt_text": "Product image",
      "is_primary": true
    }
  ]
}
```

### Get Featured Products

```http
GET /api/products/featured
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Featured Product",
      "slug": "featured-product",
      "price": "99.99",
      "formatted_price": "$99.99",
      "primary_image": {
        "url": "/storage/products/image.jpg",
        "alt_text": "Product image"
      }
    }
  ]
}
```

### Search Products

```http
GET /api/products/search?q={query}
```

**Parameters:**
- `q` (string, required) - Search query

## Cart API

### Get Cart

```http
GET /cart
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "session_id": "session123",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2,
      "price": "99.99",
      "total": "199.98",
      "product": {
        "id": 1,
        "name": "Product Name",
        "slug": "product-name",
        "primary_image": {
          "url": "/storage/products/image.jpg"
        }
      }
    }
  ],
  "total_amount": "199.98",
  "total_items": 2
}
```

### Add to Cart

```http
POST /cart/add
```

**Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Product added to cart",
  "cart": {
    "total_items": 3,
    "total_amount": "299.97"
  }
}
```

### Update Cart Item

```http
PUT /cart/update/{cartItemId}
```

**Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart

```http
DELETE /cart/remove/{cartItemId}
```

### Clear Cart

```http
DELETE /cart/clear
```

## Orders API

### Get User Orders

```http
GET /orders
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "order_number": "ORD-2025-001",
      "status": "pending",
      "total_amount": "199.98",
      "created_at": "2025-10-24T10:00:00Z",
      "items_count": 2
    }
  ]
}
```

### Get Single Order

```http
GET /orders/{orderId}
```

**Response:**
```json
{
  "id": 1,
  "order_number": "ORD-2025-001",
  "status": "pending",
  "total_amount": "199.98",
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "city": "City",
    "postal_code": "12345",
    "phone": "+254700000000"
  },
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "quantity": 2,
      "price": "99.99",
      "total": "199.98",
      "product": {
        "name": "Product Name",
        "slug": "product-name"
      }
    }
  ],
  "payment": {
    "method": "mpesa",
    "status": "pending",
    "amount": "199.98"
  }
}
```

## Checkout API

### Create Order

```http
POST /checkout
```

**Body:**
```json
{
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "city": "City",
    "postal_code": "12345",
    "phone": "+254700000000"
  },
  "payment_method": "mpesa"
}
```

**Response:**
```json
{
  "order": {
    "id": 1,
    "order_number": "ORD-2025-001",
    "total_amount": "199.98"
  },
  "payment_url": "https://mpesa.payment.url"
}
```

## M-Pesa API

### Initiate Payment

```http
POST /mpesa/payment
```

**Body:**
```json
{
  "amount": 100,
  "phone": "254700000000",
  "order_id": 1
}
```

**Response:**
```json
{
  "MerchantRequestID": "merchant123",
  "CheckoutRequestID": "checkout123",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. Request accepted for processing"
}
```

### Payment Callback

```http
POST /mpesa/callback
```

**Body:**
```json
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "merchant123",
      "CheckoutRequestID": "checkout123",
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      "CallbackMetadata": {
        "Item": [
          {
            "Name": "Amount",
            "Value": 100
          },
          {
            "Name": "MpesaReceiptNumber",
            "Value": "NLJ123456"
          },
          {
            "Name": "TransactionDate",
            "Value": 20251024100000
          },
          {
            "Name": "PhoneNumber",
            "Value": 254700000000
          }
        ]
      }
    }
  }
}
```

## Authentication API

### Login

```http
POST /login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Register

```http
POST /register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

### Logout

```http
POST /logout
```

### Two-Factor Authentication

#### Enable 2FA

```http
POST /user/two-factor-authentication
```

#### Get QR Code

```http
GET /user/two-factor-qr-code
```

#### Confirm 2FA

```http
POST /user/confirmed-two-factor-authentication
```

**Body:**
```json
{
  "code": "123456"
}
```

## Admin API

### Get Dashboard Stats

```http
GET /admin/dashboard
```

**Response:**
```json
{
  "total_orders": 150,
  "total_revenue": "15000.00",
  "total_products": 50,
  "total_customers": 100,
  "recent_orders": [],
  "top_products": []
}
```

### Manage Products

```http
POST /admin/products
PUT /admin/products/{productId}
DELETE /admin/products/{productId}
```

### Manage Orders

```http
GET /admin/orders
PUT /admin/orders/{orderId}/status
```

## Error Responses

### Validation Error (422)

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

### Unauthorized (401)

```json
{
  "message": "Unauthenticated."
}
```

### Not Found (404)

```json
{
  "message": "Resource not found."
}
```

### Server Error (500)

```json
{
  "message": "Server error occurred."
}
```

## Rate Limiting

API endpoints are rate limited:
- General API: 60 requests per minute
- Authentication: 6 requests per minute
- Password reset: 6 requests per minute

## Testing the API

You can test the API using:

### cURL Examples

```bash
# Get products
curl -X GET "http://localhost:8000/products" \
  -H "Accept: application/json"

# Add to cart
curl -X POST "http://localhost:8000/cart/add" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "quantity": 2}'
```

### Postman Collection

Import the provided Postman collection for easy testing:
- [Download Postman Collection](./postman/zoc-project.postman_collection.json)

### API Testing Tools

- **Postman**: For interactive API testing
- **Insomnia**: Alternative to Postman
- **HTTPie**: Command-line HTTP client
- **Pest**: For automated API testing (included in the project)