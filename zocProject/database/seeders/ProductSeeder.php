<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vegetablesCategory = Category::where('slug', 'fresh-vegetables')->first();
        $fruitsCategory = Category::where('slug', 'organic-fruits')->first();
        $grainsCategory = Category::where('slug', 'grains-cereals')->first();
        $leafyCategory = Category::where('slug', 'leafy-greens')->first();
        $rootCategory = Category::where('slug', 'root-vegetables')->first();

        $products = [
            // Vegetables
            [
                'name' => 'Organic Tomatoes',
                'slug' => 'organic-tomatoes',
                'description' => 'Fresh, juicy tomatoes perfect for salads and cooking. Grown without pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
                'short_description' => 'Fresh, juicy tomatoes perfect for salads and cooking.',
                'sku' => 'VEG-TOM-001',
                'price' => 180.00,
                'compare_price' => 220.00,
                'quantity' => 50,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $vegetablesCategory->id,
            ],
            [
                'name' => 'Fresh Spinach',
                'slug' => 'fresh-spinach',
                'description' => 'Nutrient-rich leafy greens packed with vitamins, iron, and minerals. Perfect for salads, smoothies, and cooking.',
                'short_description' => 'Nutrient-rich leafy greens packed with vitamins.',
                'sku' => 'LEF-SPI-001',
                'price' => 120.00,
                'quantity' => 30,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1 bunch',
                'category_id' => $leafyCategory->id,
            ],
            [
                'name' => 'Organic Carrots',
                'slug' => 'organic-carrots',
                'description' => 'Sweet, crunchy carrots rich in beta-carotene and vitamins. Perfect for snacking, cooking, and juicing.',
                'short_description' => 'Sweet, crunchy carrots rich in beta-carotene.',
                'sku' => 'ROO-CAR-001',
                'price' => 160.00,
                'quantity' => 40,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $rootCategory->id,
            ],
            [
                'name' => 'Organic Apples',
                'slug' => 'organic-apples',
                'description' => 'Crisp, sweet apples perfect for snacking. Grown organically without chemicals for pure, natural taste.',
                'short_description' => 'Crisp, sweet apples perfect for snacking.',
                'sku' => 'FRU-APP-001',
                'price' => 280.00,
                'compare_price' => 320.00,
                'quantity' => 25,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $fruitsCategory->id,
            ],
            [
                'name' => 'Organic Rice',
                'slug' => 'organic-rice',
                'description' => 'Premium quality rice grown with organic methods. Rich in nutrients and perfect for daily meals.',
                'short_description' => 'Premium quality rice grown with organic methods.',
                'sku' => 'GRA-RIC-001',
                'price' => 140.00,
                'quantity' => 100,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $grainsCategory->id,
            ],
            [
                'name' => 'Fresh Bananas',
                'slug' => 'fresh-bananas',
                'description' => 'Sweet, ripe bananas perfect for breakfast, smoothies, and snacking. Rich in potassium and natural energy.',
                'short_description' => 'Sweet, ripe bananas perfect for breakfast and snacking.',
                'sku' => 'FRU-BAN-001',
                'price' => 150.00,
                'quantity' => 60,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $fruitsCategory->id,
            ],
            [
                'name' => 'Organic Lettuce',
                'slug' => 'organic-lettuce',
                'description' => 'Fresh, crispy lettuce perfect for salads and sandwiches. Grown organically for maximum freshness.',
                'short_description' => 'Fresh, crispy lettuce perfect for salads.',
                'sku' => 'LEF-LET-001',
                'price' => 100.00,
                'quantity' => 20,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1 head',
                'category_id' => $leafyCategory->id,
            ],
            [
                'name' => 'Sweet Potatoes',
                'slug' => 'sweet-potatoes',
                'description' => 'Nutritious sweet potatoes rich in vitamins and fiber. Perfect for roasting, baking, and making healthy meals.',
                'short_description' => 'Nutritious sweet potatoes rich in vitamins and fiber.',
                'sku' => 'ROO-SWP-001',
                'price' => 200.00,
                'quantity' => 35,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $rootCategory->id,
            ],
            [
                'name' => 'Organic Oranges',
                'slug' => 'organic-oranges',
                'description' => 'Juicy, vitamin C-rich oranges perfect for fresh juice and snacking. Grown without chemicals.',
                'short_description' => 'Juicy, vitamin C-rich oranges perfect for fresh juice.',
                'sku' => 'FRU-ORA-001',
                'price' => 220.00,
                'quantity' => 45,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $fruitsCategory->id,
            ],
            [
                'name' => 'Organic Quinoa',
                'slug' => 'organic-quinoa',
                'description' => 'Superfood quinoa packed with protein and essential amino acids. Perfect for healthy, nutritious meals.',
                'short_description' => 'Superfood quinoa packed with protein.',
                'sku' => 'GRA-QUI-001',
                'price' => 450.00,
                'compare_price' => 500.00,
                'quantity' => 15,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '500g',
                'category_id' => $grainsCategory->id,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
