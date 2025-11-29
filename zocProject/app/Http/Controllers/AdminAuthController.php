<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    /**
     * Show the admin login form.
     */
    public function showLoginForm()
    {
        // If already logged in as admin, redirect to admin dashboard
        if (session('admin_authenticated')) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('admin-login');
    }

    /**
     * Handle admin login.
     */
    public function login(Request $request)
    {
        // Log the attempt
        \Log::info('Admin login attempt', [
            'username' => $request->username,
            'ip' => $request->ip()
        ]);

        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Only allow login for the specific admin user
        $adminUsername = 'Zedjah@Admin';
        
        // Explicitly reject if username doesn't match
        if ($request->username !== $adminUsername) {
            \Log::warning('Admin login denied - username mismatch', [
                'provided' => $request->username,
                'expected' => $adminUsername
            ]);
            
            return back()->withErrors([
                'username' => 'Access denied. You are not authorized to access the admin panel.',
            ])->withInput($request->only('username'));
        }

        // Find the specific admin user
        $user = User::where('email', $adminUsername)->first();

        // If admin user doesn't exist in database
        if (!$user) {
            \Log::error('Admin user not found in database');
            
            return back()->withErrors([
                'username' => 'Admin account not found. Please contact system administrator.',
            ]);
        }

        // Verify password matches
        if (!Hash::check($request->password, $user->password)) {
            \Log::warning('Admin login denied - invalid password');
            
            return back()->withErrors([
                'username' => 'Invalid password for admin account.',
            ])->withInput($request->only('username'));
        }

        // All checks passed - grant admin access
        \Log::info('Admin login successful', ['user_id' => $user->id]);
        
        // Regenerate session to prevent fixation attacks
        $request->session()->regenerate();
        
        // Set admin session
        session([
            'admin_authenticated' => true, 
            'admin_user_id' => $user->id,
            'admin_username' => $adminUsername
        ]);
        
        return redirect()->route('admin.dashboard');
    }

    /**
     * Handle admin logout.
     */
    public function logout()
    {
        session()->forget(['admin_authenticated', 'admin_user_id']);
        return redirect()->route('admin.login');
    }
}
