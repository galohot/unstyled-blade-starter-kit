<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif
    </head>
    <body class="font-sans antialiased min-h-screen bg-gradient-to-br from-kemlu-blue-50 to-kemlu-blue-100">
        <!-- Subtle top accent bar -->
        <div class="h-1 bg-gradient-to-r from-kemlu-blue-600 via-kemlu-yellow-500 to-kemlu-green-600"></div>

        <header class="bg-white/90 backdrop-blur-md shadow-sm border-b border-kemlu-blue-200 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center">
                        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kemlu-blue-600 to-kemlu-green-600">
                            Logo
                        </span>
                    </div>

                    <!-- Navigation -->
                    @if (Route::has('login'))
                        <nav class="flex space-x-4">
                            @auth
                                <a href="{{ url('/dashboard') }}" class="px-3 py-2 rounded-md text-sm font-medium text-kemlu-blue-700 hover:text-kemlu-blue-800 hover:bg-kemlu-blue-50 transition">
                                    Dashboard
                                </a>
                            @else
                                <a href="{{ route('login') }}" class="px-3 py-2 rounded-md text-sm font-medium text-kemlu-blue-700 hover:text-kemlu-blue-800 hover:bg-kemlu-blue-50 transition">
                                    Log in
                                </a>
                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-kemlu-blue-600 hover:bg-kemlu-blue-700 transition">
                                        Register
                                    </a>
                                @endif
                            @endauth
                        </nav>
                    @endif
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="text-center">
                <!-- Hero Section -->
                <div class="mt-8 mb-16">
                    <h1 class="text-4xl sm:text-5xl font-bold text-kemlu-blue-800 mb-6">
                        Welcome to <span class="bg-clip-text text-transparent bg-gradient-to-r from-kemlu-blue-600 to-kemlu-green-600">Laravel</span>
                    </h1>
                    <p class="text-xl text-kemlu-blue-700 max-w-3xl mx-auto mb-8">
                        Start building your application with our professionally styled template using custom KEMLU colors.
                    </p>
                    <div class="flex justify-center space-x-4">
                        <a href="#" class="px-6 py-3 text-white bg-kemlu-blue-600 hover:bg-kemlu-blue-700 rounded-lg font-medium shadow-sm transition">
                            Get Started
                        </a>
                        <a href="#" class="px-6 py-3 text-kemlu-blue-700 bg-white hover:bg-kemlu-blue-50 rounded-lg font-medium shadow-sm border border-kemlu-blue-200 transition">
                            Learn More
                        </a>
                    </div>
                </div>

                <!-- Features Section -->
                <div class="my-16">
                    <h2 class="text-2xl font-semibold text-kemlu-blue-800 mb-12">Key Features</h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Feature 1 -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-kemlu-blue-100">
                            <div class="rounded-full bg-kemlu-blue-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-kemlu-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-kemlu-blue-800 mb-2">Lightning Fast</h3>
                            <p class="text-kemlu-blue-600">Optimized for performance to provide the best user experience.</p>
                        </div>

                        <!-- Feature 2 -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-kemlu-blue-100">
                            <div class="rounded-full bg-kemlu-yellow-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-kemlu-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-kemlu-blue-800 mb-2">Secure by Default</h3>
                            <p class="text-kemlu-blue-600">Built with security best practices to protect your data.</p>
                        </div>

                        <!-- Feature 3 -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-kemlu-blue-100">
                            <div class="rounded-full bg-kemlu-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-kemlu-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-kemlu-blue-800 mb-2">Flexible & Modular</h3>
                            <p class="text-kemlu-blue-600">Easily customize components to match your specific needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-white border-t border-kemlu-blue-200 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-sm text-kemlu-blue-600">&copy; {{ date('Y') }} Laravel. All rights reserved.</p>
            </div>
        </footer>
    </body>
</html>
