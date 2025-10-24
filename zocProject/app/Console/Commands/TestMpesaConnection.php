<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TestMpesaConnection extends Command
{
    protected $signature = 'mpesa:test-connection';
    protected $description = 'Test basic M-Pesa API connection';

    public function handle()
    {
        $this->info('Testing basic M-Pesa API connection...');

        $consumerKey = config('mpesa.mpesa_consumer_key');
        $consumerSecret = config('mpesa.mpesa_consumer_secret');
        
        $this->info('Consumer Key: ' . substr($consumerKey, 0, 10) . '...');
        $this->info('Consumer Secret: ' . substr($consumerSecret, 0, 10) . '...');

        try {
            $response = Http::withOptions(['verify' => false])
                ->withBasicAuth($consumerKey, $consumerSecret)
                ->get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');

            $this->info('Response Status: ' . $response->status());
            $this->info('Response Body: ' . $response->body());

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['access_token'])) {
                    $this->info('✅ Successfully obtained access token!');
                    $this->info('Token: ' . substr($data['access_token'], 0, 20) . '...');
                } else {
                    $this->error('❌ No access token in response');
                }
            } else {
                $this->error('❌ Failed to get access token');
            }

        } catch (\Exception $e) {
            $this->error('❌ Exception: ' . $e->getMessage());
        }

        return 0;
    }
}