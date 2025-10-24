<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MpesaService;

class TestMpesa extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mpesa:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test M-Pesa configuration and connection';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing M-Pesa Configuration...');
        
        // Check config values
        $this->info('Environment: ' . config('mpesa.environment'));
        $this->info('Consumer Key: ' . (config('mpesa.mpesa_consumer_key') ? 'Set (' . strlen(config('mpesa.mpesa_consumer_key')) . ' chars)' : 'Not set'));
        $this->info('Consumer Secret: ' . (config('mpesa.mpesa_consumer_secret') ? 'Set (' . strlen(config('mpesa.mpesa_consumer_secret')) . ' chars)' : 'Not set'));
        $this->info('Shortcode: ' . config('mpesa.shortcode'));
        $this->info('Passkey: ' . (config('mpesa.passkey') ? 'Set (' . strlen(config('mpesa.passkey')) . ' chars)' : 'Not set'));
        
        // Show actual credentials for debugging (remove this in production!)
        $this->info('Actual Consumer Key: ' . config('mpesa.mpesa_consumer_key'));
        $this->info('Actual Consumer Secret: ' . config('mpesa.mpesa_consumer_secret'));
        
        // Test M-Pesa service
        $this->info("\nTesting M-Pesa STK Push...");
        try {
            $mpesaService = new MpesaService();
            
            // Test with sandbox test number
            $result = $mpesaService->stkPush('254700000000', 1, 'TEST123', 'Test transaction');
            
            if ($result['success']) {
                $this->info('✅ STK Push test successful!');
                $this->info('Message: ' . $result['message']);
                if (isset($result['checkout_request_id'])) {
                    $this->info('Checkout Request ID: ' . $result['checkout_request_id']);
                }
            } else {
                $this->error('❌ STK Push test failed!');
                $this->error('Error: ' . $result['message']);
                if (isset($result['response'])) {
                    $this->error('Response: ' . json_encode($result['response']));
                }
            }
        } catch (\Exception $e) {
            $this->error('❌ Exception occurred: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
        }
        
        return 0;
    }
}
