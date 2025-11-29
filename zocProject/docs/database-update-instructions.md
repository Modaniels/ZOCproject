# Database Update Instructions

## Updated E-Commerce Categories

The e-commerce store has been updated to reflect the new 4 product categories:

1. **Organic Food Products** - Fresh organic produce, fruits, grains, and cereals
2. **Farm Inputs** - Seeds, fertilizers, compost, and organic pesticides
3. **Farm Tools & Machinery** - Hand tools, irrigation systems, sprayers, and tillers
4. **Farming Software & Technology** - IoT sensors, farm management software, weather stations, and drone services

## Files Updated

### 1. Category Seeder
- **File**: `database/seeders/CategorySeeder.php`
- **Changes**: Replaced old categories (Fresh Vegetables, Organic Fruits, etc.) with 4 new categories

### 2. Product Seeder
- **File**: `database/seeders/ProductSeeder.php`
- **Changes**: Created sample products for each of the 4 new categories:
  - 4 organic food products
  - 4 farm input products
  - 4 farm tools & machinery products
  - 4 farming software & technology products

### 3. Frontend Pages
- **File**: `resources/js/pages/products.tsx`
  - Updated hero section to say "Our Store"
  - Updated description to reflect all 4 categories
  
- **File**: `resources/js/pages/zoc-farm.tsx`
  - Updated products section title to "Our Store"
  - Updated description to include all 4 categories

## How to Apply These Changes

### Option 1: Fresh Database Setup (Recommended for Development)

If you want to start fresh with the new categories and products:

```bash
# Reset and migrate the database
php artisan migrate:fresh

# Seed with new categories and products
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=ProductSeeder
```

### Option 2: Update Existing Database

If you have existing data you want to keep:

1. **Backup your database first**:
```bash
php artisan backup:run
# Or manually backup using your database tool
```

2. **Manually update categories in your database**:
   - Update existing category records to match the new structure
   - Or delete old categories and run: `php artisan db:seed --class=CategorySeeder`

3. **Update or add new products**:
   - Either manually through the admin panel
   - Or run: `php artisan db:seed --class=ProductSeeder`

### Option 3: Keep Old Data, Add New Categories

If you want to keep existing products and add new categories:

1. Run only the category seeder:
```bash
php artisan db:seed --class=CategorySeeder
```

2. Add new products manually through the admin panel at `/admin/products`

## Admin Panel

The admin panel automatically uses categories from the database:

- **Add Product**: `/admin/products/create`
- **Edit Product**: `/admin/products/{id}/edit`
- **View Products**: `/admin/products`

The category dropdown in the product form will automatically show the 4 new categories.

## Important Notes

- The admin panel is already configured to work with any categories in the database
- No changes needed to admin forms - they dynamically load categories
- All frontend pages now reflect the new store focus
- Product images should be added through the admin panel after seeding

## Testing

After applying changes:

1. Visit the store page: `/products`
2. Check that categories show the 4 new options
3. Test filtering by each category
4. Verify admin panel shows correct categories when adding/editing products
5. Ensure homepage "Our Store" section has updated messaging
