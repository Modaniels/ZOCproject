# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the ZOC Project.

## Common Issues and Solutions

### Installation Issues

#### PHP Extension Missing

**Error:**
```
Fatal error: Class 'PDO' not found
```

**Solution:**
```bash
# Ubuntu/Debian
sudo apt-get install php8.2-pdo php8.2-mysql

# CentOS/RHEL
sudo yum install php-pdo php-mysql

# Windows (XAMPP)
# Uncomment in php.ini:
extension=pdo_mysql
```

#### Composer Memory Limit

**Error:**
```
Fatal error: Allowed memory size exhausted
```

**Solution:**
```bash
# Temporary fix
php -d memory_limit=-1 /usr/local/bin/composer install

# Permanent fix in php.ini
memory_limit = 2048M
```

#### Node.js Version Mismatch

**Error:**
```
error vite@4.0.0: The engine "node" is incompatible
```

**Solution:**
```bash
# Check Node.js version
node --version

# Install correct version using nvm
nvm install 18
nvm use 18

# Or update Node.js
sudo apt update
sudo apt install nodejs npm
```

### Database Issues

#### Connection Refused

**Error:**
```
SQLSTATE[HY000] [2002] Connection refused
```

**Solution:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if stopped
sudo systemctl start mysql

# Check MySQL configuration
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Verify credentials in .env file
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Migration Errors

**Error:**
```
SQLSTATE[42S01]: Base table or view already exists
```

**Solution:**
```bash
# Check migration status
php artisan migrate:status

# Rollback problematic migration
php artisan migrate:rollback --step=1

# Fresh migration (WARNING: destroys data)
php artisan migrate:fresh
```

#### Database Lock Issues

**Error:**
```
SQLSTATE[HY000]: General error: 1205 Lock wait timeout exceeded
```

**Solution:**
```bash
# Check for long-running queries
SHOW PROCESSLIST;

# Kill problematic queries
KILL QUERY [process_id];

# Optimize problematic queries
EXPLAIN SELECT * FROM products WHERE ...;
```

### Permission Issues

#### Storage Directory Not Writable

**Error:**
```
file_put_contents(): failed to open stream: Permission denied
```

**Solution:**
```bash
# Set correct permissions
sudo chown -R www-data:www-data storage/
sudo chown -R www-data:www-data bootstrap/cache/
sudo chmod -R 775 storage/
sudo chmod -R 775 bootstrap/cache/

# For development (less secure)
sudo chmod -R 777 storage/
sudo chmod -R 777 bootstrap/cache/
```

#### Symlink Creation Failed

**Error:**
```
symlink(): No such file or directory
```

**Solution:**
```bash
# Manual symlink creation
ln -s ../storage/app/public public/storage

# Check if symlink exists
ls -la public/storage

# Remove existing symlink if corrupted
rm public/storage
php artisan storage:link
```

### Environment Configuration

#### Application Key Missing

**Error:**
```
No application encryption key has been specified
```

**Solution:**
```bash
# Generate application key
php artisan key:generate

# Manually set in .env if needed
APP_KEY=base64:your-generated-key-here
```

#### Environment File Issues

**Error:**
```
Configuration file does not exist
```

**Solution:**
```bash
# Copy environment file
cp .env.example .env

# Verify file exists and has correct permissions
ls -la .env
chmod 644 .env

# Clear configuration cache
php artisan config:clear
```

### Frontend Issues

#### Vite Build Errors

**Error:**
```
Failed to resolve entry for package "react"
```

**Solution:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npx vite --force

# Check Node.js version compatibility
node --version
npm --version
```

#### Asset Not Loading

**Error:**
```
GET /build/assets/app.js 404 (Not Found)
```

**Solution:**
```bash
# Build assets for production
npm run build

# For development
npm run dev

# Check vite.config.ts configuration
# Verify APP_URL in .env matches your domain
```

#### TypeScript Errors

**Error:**
```
Property 'id' does not exist on type 'Product'
```

**Solution:**
```bash
# Update type definitions
npm run types

# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> TypeScript: Restart TS Server
```

### Performance Issues

#### Slow Page Load

**Symptoms:**
- Pages take more than 3 seconds to load
- High server resource usage

**Solutions:**
```bash
# Enable caching
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Check slow queries
# Add to .env
LOG_LEVEL=debug
DB_LOG_QUERIES=true

# Optimize database
php artisan db:seed --class=DatabaseOptimizationSeeder

# Enable Redis caching
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

#### High Memory Usage

**Symptoms:**
- Server runs out of memory
- 500 errors under load

**Solutions:**
```bash
# Increase PHP memory limit
# In php.ini:
memory_limit = 512M

# Optimize Composer autoloader
composer dump-autoload --optimize

# Use chunking for large datasets
// In your code:
Product::chunk(100, function ($products) {
    foreach ($products as $product) {
        // Process product
    }
});
```

### Inertia.js Issues

#### Inertia Version Mismatch

**Error:**
```
The page expired, please refresh and try again
```

**Solution:**
```bash
# Clear all caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Force reload page
Ctrl+F5 (hard refresh)

# Check version consistency
composer show inertiajs/inertia-laravel
npm list @inertiajs/react
```

#### Props Not Passed to Component

**Error:**
```
Cannot read property 'products' of undefined
```

**Solution:**
```php
// In controller, ensure data is passed correctly
return Inertia::render('Products/Index', [
    'products' => $products,
    'categories' => $categories,
]);

// Check component props interface
interface Props {
    products: PaginatedData<Product>
    categories: Category[]
}
```

### Authentication Issues

#### Two-Factor Authentication Locked Out

**Problem:** User can't access account due to 2FA issues

**Solution:**
```bash
# Disable 2FA for specific user
php artisan tinker

# In Tinker:
$user = User::where('email', 'user@example.com')->first();
$user->two_factor_secret = null;
$user->two_factor_recovery_codes = null;
$user->two_factor_confirmed_at = null;
$user->save();
```

#### Session Issues

**Error:**
```
419 | Page Expired
```

**Solution:**
```bash
# Clear sessions
php artisan session:clear

# Check session configuration
# In .env:
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Verify CSRF token in forms
// In Blade/React:
<meta name="csrf-token" content="{{ csrf_token() }}">
```

### Payment Integration Issues

#### M-Pesa Connection Failed

**Error:**
```
cURL error 6: Could not resolve host: sandbox.safaricom.co.ke
```

**Solution:**
```bash
# Check internet connectivity
ping sandbox.safaricom.co.ke

# Verify M-Pesa credentials in .env
MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret

# Check SSL certificates
curl -I https://sandbox.safaricom.co.ke

# Update cURL if needed
sudo apt-get update && sudo apt-get install curl
```

#### Callback URL Not Reachable

**Problem:** M-Pesa callbacks fail to reach your application

**Solution:**
```bash
# Use ngrok for local development
npm install -g ngrok
ngrok http 8000

# Update callback URL in .env
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/mpesa/callback

# For production, ensure:
# 1. Domain is publicly accessible
# 2. SSL certificate is valid
# 3. Firewall allows incoming connections
```

### Production Deployment Issues

#### 500 Internal Server Error

**Common Causes and Solutions:**

1. **File Permissions:**
```bash
sudo chown -R www-data:www-data /var/www/your-app
sudo chmod -R 755 /var/www/your-app
sudo chmod -R 775 storage bootstrap/cache
```

2. **Missing Environment File:**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Database Connection:**
```bash
# Test database connection
php artisan tinker
DB::connection()->getPdo();
```

4. **Composer Dependencies:**
```bash
composer install --no-dev --optimize-autoloader
```

#### Asset Files Not Found

**Problem:** CSS/JS files return 404 errors

**Solution:**
```bash
# Build assets for production
npm run build

# Check public directory structure
ls -la public/build/

# Verify Vite configuration
# In vite.config.ts:
export default defineConfig({
    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            input: 'resources/js/app.tsx',
        },
    },
});
```

### Email Issues

#### Mail Not Sending

**Error:**
```
Connection could not be established with host smtp.gmail.com
```

**Solution:**
```bash
# Test mail configuration
php artisan tinker

# In Tinker:
Mail::raw('Test email', function ($message) {
    $message->to('test@example.com')->subject('Test');
});

# Check mail configuration in .env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls

# For Gmail, use App Passwords instead of regular password
```

### Cache Issues

#### Stale Configuration Cache

**Problem:** Changes to configuration files not reflected

**Solution:**
```bash
# Clear all caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# For complete reset
php artisan optimize:clear
```

#### Redis Connection Issues

**Error:**
```
Connection refused [tcp://127.0.0.1:6379]
```

**Solution:**
```bash
# Check if Redis is running
sudo systemctl status redis

# Start Redis if stopped
sudo systemctl start redis

# Test Redis connection
redis-cli ping

# Check Redis configuration
sudo nano /etc/redis/redis.conf
```

## Debugging Tools and Techniques

### Laravel Debug Tools

#### Enable Debug Mode

```env
# In .env for development only
APP_DEBUG=true
LOG_LEVEL=debug
```

#### Laravel Debugbar

```bash
# Install Laravel Debugbar
composer require barryvdh/laravel-debugbar --dev

# Publish config
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
```

#### Query Debugging

```php
// Enable query logging
DB::enableQueryLog();

// Your database operations here

// Get executed queries
$queries = DB::getQueryLog();
dd($queries);
```

### Log Analysis

#### Check Laravel Logs

```bash
# View latest log entries
tail -f storage/logs/laravel.log

# Search for specific errors
grep "ERROR" storage/logs/laravel.log

# View logs by date
tail -f storage/logs/laravel-$(date +%Y-%m-%d).log
```

#### Enable Detailed Error Logging

```php
// In app/Exceptions/Handler.php
public function report(Throwable $exception)
{
    \Log::error('Exception occurred', [
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine(),
        'trace' => $exception->getTraceAsString(),
        'user' => auth()->user()?->id,
        'url' => request()->fullUrl(),
        'ip' => request()->ip(),
    ]);

    parent::report($exception);
}
```

### Browser Developer Tools

#### Network Tab Issues

1. **Check failed requests** - Look for 4xx/5xx status codes
2. **Verify request headers** - Ensure CSRF tokens are present
3. **Check response times** - Identify slow endpoints

#### Console Errors

1. **JavaScript errors** - Check for React/TypeScript errors
2. **Network errors** - CORS, CSP violations
3. **Resource loading errors** - Missing CSS/JS files

### Performance Profiling

#### Laravel Telescope

```bash
# Install Telescope (development only)
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

#### Database Query Analysis

```php
// Log slow queries
// In config/database.php
'mysql' => [
    'options' => [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET sql_mode="STRICT_TRANS_TABLES"',
    ],
    'slow_query_log' => true,
    'log_queries_slower_than' => 1000, // milliseconds
],
```

### Getting Help

#### Community Resources

- **Laravel Documentation**: https://laravel.com/docs
- **Laravel Forums**: https://laracasts.com/discuss
- **Stack Overflow**: Tag questions with `laravel`, `react`, `inertiajs`
- **GitHub Issues**: Check project repository for known issues

#### Professional Support

- **Laravel Forge**: Managed hosting with expert support
- **Laravel Vapor**: Serverless platform with technical support
- **Consulting Services**: Hire Laravel/React developers

### Preventive Measures

#### Regular Maintenance

```bash
# Weekly maintenance script
#!/bin/bash

# Update dependencies
composer update --no-dev
npm update

# Clear caches
php artisan optimize:clear

# Check for security vulnerabilities
composer audit
npm audit

# Run tests
./vendor/bin/pest
npm test

# Check disk space
df -h

# Monitor log file sizes
du -sh storage/logs/
```

#### Monitoring Setup

```php
// Add to app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Health check
    $schedule->call(function () {
        $status = app(HealthChecker::class)->check();
        if (!$status['healthy']) {
            \Log::error('Health check failed', $status);
        }
    })->everyMinute();

    // Clean up old logs
    $schedule->command('log:clear')->weekly();
}
```

This troubleshooting guide should help you quickly identify and resolve most common issues with the ZOC Project. Remember to always check the logs first and test changes in a development environment before applying them to production.