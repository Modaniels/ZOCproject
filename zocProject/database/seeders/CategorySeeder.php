<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Fresh Vegetables',
                'slug' => 'fresh-vegetables',
                'description' => 'Organic vegetables harvested at peak freshness, free from pesticides and chemicals.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Organic Fruits', 
                'slug' => 'organic-fruits',
                'description' => 'Sweet, nutritious fruits grown with natural farming methods for optimal flavor and nutrition.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Grains & Cereals',
                'slug' => 'grains-cereals',
                'description' => 'High-quality grains and cereals providing essential nutrients for healthy living.',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Leafy Greens',
                'slug' => 'leafy-greens',
                'description' => 'Fresh, nutrient-rich leafy vegetables perfect for salads and cooking.',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Root Vegetables',
                'slug' => 'root-vegetables',
                'description' => 'Fresh root vegetables grown in rich, organic soil.',
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
