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
        $organicFoodCategory = Category::where('slug', 'organic-food-products')->first();
        $farmInputsCategory = Category::where('slug', 'farm-inputs')->first();
        $farmToolsCategory = Category::where('slug', 'farm-tools-machinery')->first();
        $farmSoftwareCategory = Category::where('slug', 'farming-software-technology')->first();

        $products = [
            // Organic Food Products
            [
                'name' => 'Organic Tomatoes',
                'slug' => 'organic-tomatoes',
                'description' => 'Fresh, juicy tomatoes perfect for salads and cooking. Grown without pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
                'short_description' => 'Fresh, juicy tomatoes perfect for salads and cooking.',
                'sku' => 'ORG-TOM-001',
                'price' => 180.00,
                'compare_price' => 220.00,
                'quantity' => 50,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $organicFoodCategory->id,
            ],
            [
                'name' => 'Fresh Spinach',
                'slug' => 'fresh-spinach',
                'description' => 'Nutrient-rich leafy greens packed with vitamins, iron, and minerals. Perfect for salads, smoothies, and cooking.',
                'short_description' => 'Nutrient-rich leafy greens packed with vitamins.',
                'sku' => 'ORG-SPI-001',
                'price' => 120.00,
                'quantity' => 30,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1 bunch',
                'category_id' => $organicFoodCategory->id,
            ],
            [
                'name' => 'Organic Apples',
                'slug' => 'organic-apples',
                'description' => 'Crisp, sweet apples perfect for snacking. Grown organically without chemicals for pure, natural taste.',
                'short_description' => 'Crisp, sweet apples perfect for snacking.',
                'sku' => 'ORG-APP-001',
                'price' => 280.00,
                'compare_price' => 320.00,
                'quantity' => 25,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $organicFoodCategory->id,
            ],
            [
                'name' => 'Organic Rice',
                'slug' => 'organic-rice',
                'description' => 'Premium quality rice grown with organic methods. Rich in nutrients and perfect for daily meals.',
                'short_description' => 'Premium quality rice grown with organic methods.',
                'sku' => 'ORG-RIC-001',
                'price' => 140.00,
                'quantity' => 100,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1kg',
                'category_id' => $organicFoodCategory->id,
            ],
            
            // Farm Inputs
            [
                'name' => 'Organic Compost',
                'slug' => 'organic-compost',
                'description' => 'High-quality organic compost made from natural materials. Enriches soil health and promotes sustainable farming practices.',
                'short_description' => 'High-quality organic compost for healthy soil.',
                'sku' => 'INP-COM-001',
                'price' => 800.00,
                'quantity' => 200,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '25kg bag',
                'category_id' => $farmInputsCategory->id,
            ],
            [
                'name' => 'Organic Vegetable Seeds Pack',
                'slug' => 'organic-vegetable-seeds',
                'description' => 'Premium organic vegetable seeds including tomatoes, spinach, kale, and carrots. Non-GMO and certified organic.',
                'short_description' => 'Premium organic vegetable seeds pack.',
                'sku' => 'INP-SED-001',
                'price' => 450.00,
                'quantity' => 150,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '100g pack',
                'category_id' => $farmInputsCategory->id,
            ],
            [
                'name' => 'Bio-Fertilizer',
                'slug' => 'bio-fertilizer',
                'description' => 'Natural bio-fertilizer enriched with beneficial microorganisms. Improves soil fertility and crop yield organically.',
                'short_description' => 'Natural bio-fertilizer with beneficial microorganisms.',
                'sku' => 'INP-BIO-001',
                'price' => 1200.00,
                'quantity' => 80,
                'is_active' => true,
                'status' => 'active',
                'weight' => '5kg',
                'category_id' => $farmInputsCategory->id,
            ],
            [
                'name' => 'Organic Pesticide',
                'slug' => 'organic-pesticide',
                'description' => 'Plant-based organic pesticide safe for crops and environment. Effective pest control without harmful chemicals.',
                'short_description' => 'Safe organic pesticide for pest control.',
                'sku' => 'INP-PES-001',
                'price' => 950.00,
                'quantity' => 60,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1 liter',
                'category_id' => $farmInputsCategory->id,
            ],
            
            // Farm Tools & Machinery
            [
                'name' => 'Hand Cultivator Set',
                'slug' => 'hand-cultivator-set',
                'description' => 'Professional 5-piece hand cultivator set including rake, hoe, trowel, and weeding tools. Durable stainless steel construction.',
                'short_description' => 'Professional 5-piece hand cultivator set.',
                'sku' => 'TOL-CUL-001',
                'price' => 2500.00,
                'quantity' => 40,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '2kg',
                'category_id' => $farmToolsCategory->id,
            ],
            [
                'name' => 'Drip Irrigation Kit',
                'slug' => 'drip-irrigation-kit',
                'description' => 'Complete drip irrigation system for 0.5 acre farm. Water-efficient design with adjustable emitters and UV-resistant pipes.',
                'short_description' => 'Complete drip irrigation system for small farms.',
                'sku' => 'TOL-IRR-001',
                'price' => 15000.00,
                'compare_price' => 18000.00,
                'quantity' => 20,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '15kg',
                'category_id' => $farmToolsCategory->id,
            ],
            [
                'name' => 'Battery-Powered Sprayer',
                'slug' => 'battery-powered-sprayer',
                'description' => 'Professional 16-liter battery-powered backpack sprayer. Perfect for applying fertilizers and pesticides efficiently.',
                'short_description' => '16-liter battery-powered backpack sprayer.',
                'sku' => 'TOL-SPR-001',
                'price' => 8500.00,
                'quantity' => 25,
                'is_active' => true,
                'status' => 'active',
                'weight' => '5kg',
                'category_id' => $farmToolsCategory->id,
            ],
            [
                'name' => 'Mini Tiller Machine',
                'slug' => 'mini-tiller-machine',
                'description' => 'Compact petrol-powered mini tiller for small to medium farms. Easy to operate and maintain for soil preparation.',
                'short_description' => 'Compact petrol-powered mini tiller machine.',
                'sku' => 'TOL-TIL-001',
                'price' => 35000.00,
                'compare_price' => 40000.00,
                'quantity' => 10,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '45kg',
                'category_id' => $farmToolsCategory->id,
            ],
            
            // Farming Software & Technology
            [
                'name' => 'Farm Management Software - Basic',
                'slug' => 'farm-management-software-basic',
                'description' => 'Complete farm management solution with crop tracking, inventory management, and financial reporting. 1-year subscription for up to 2 acres.',
                'short_description' => 'Farm management software for small farms.',
                'sku' => 'SOFT-FMS-001',
                'price' => 12000.00,
                'quantity' => 999,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => 'Digital',
                'category_id' => $farmSoftwareCategory->id,
            ],
            [
                'name' => 'Soil Moisture Sensor System',
                'slug' => 'soil-moisture-sensor-system',
                'description' => 'IoT-enabled soil moisture monitoring system with mobile app. Real-time data for optimal irrigation scheduling.',
                'short_description' => 'IoT soil moisture monitoring with mobile app.',
                'sku' => 'SOFT-SMS-001',
                'price' => 18500.00,
                'quantity' => 30,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => '500g',
                'category_id' => $farmSoftwareCategory->id,
            ],
            [
                'name' => 'Weather Station with App',
                'slug' => 'weather-station-app',
                'description' => 'Smart weather station with temperature, humidity, rainfall, and wind monitoring. Connects to mobile app for weather forecasting.',
                'short_description' => 'Smart weather station with mobile app integration.',
                'sku' => 'SOFT-WEA-001',
                'price' => 25000.00,
                'quantity' => 15,
                'is_active' => true,
                'status' => 'active',
                'weight' => '1.5kg',
                'category_id' => $farmSoftwareCategory->id,
            ],
            [
                'name' => 'Agricultural Drone Mapping Service',
                'slug' => 'drone-mapping-service',
                'description' => 'Professional drone mapping service for crop health analysis, pest detection, and yield estimation. Package includes 3 flights and detailed reports.',
                'short_description' => 'Drone mapping service for crop analysis.',
                'sku' => 'SOFT-DRO-001',
                'price' => 45000.00,
                'compare_price' => 55000.00,
                'quantity' => 50,
                'is_active' => true,
                'is_featured' => true,
                'status' => 'active',
                'weight' => 'Service',
                'category_id' => $farmSoftwareCategory->id,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
