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
                'name' => 'Organic Food Products',
                'slug' => 'organic-food-products',
                'description' => 'Premium organic food products including fresh vegetables, fruits, grains, and cereals harvested at peak freshness, free from pesticides and chemicals.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Farm Inputs', 
                'slug' => 'farm-inputs',
                'description' => 'High-quality organic fertilizers, seeds, compost, and other essential farming inputs for sustainable agriculture.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Farm Tools & Machinery',
                'slug' => 'farm-tools-machinery',
                'description' => 'Modern farming equipment, tools, and machinery designed to increase productivity and efficiency in agricultural operations.',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Farming Software & Technology',
                'slug' => 'farming-software-technology',
                'description' => 'Innovative farming software solutions, IoT devices, and agricultural technology to help manage farms more effectively and increase yields.',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
