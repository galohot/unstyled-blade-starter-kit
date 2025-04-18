<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles
    </head>
    <body class="min-h-screen bg-kemlu-blue-50 font-sans antialiased">
        <!-- Subtle top accent bar -->
        <div class="h-1 bg-gradient-to-r from-kemlu-blue-600 via-kemlu-yellow-500 to-kemlu-green-600"></div>

        <div class="flex flex-col min-h-screen">
            <!-- Navigation with glass effect -->
            <nav class="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-kemlu-blue-200 shadow-sm">
                @include('layouts.navigation')
            </nav>

            <!-- Page Heading - if present -->
            @isset($header)
                <header class="bg-white shadow-sm">
                    <div class="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div class="text-kemlu-blue-700 font-medium">
                            {{ $header }}
                        </div>
                        <!-- Optional breadcrumbs area -->
                        <div class="hidden sm:flex text-sm text-kemlu-blue-500">
                            <!-- Breadcrumbs can be placed here if needed -->
                        </div>
                    </div>
                </header>
            @endisset

            <!-- Main Content Area with subtle patterns -->
            <main class="flex-grow w-full mx-auto py-8">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Optional page title card for content pages -->
                    <div class="bg-white rounded-xl shadow-sm p-6 mb-6 border border-kemlu-blue-100">
                        <!-- Card content can be placed here - you might want to check if this should be conditionally rendered -->
                    </div>

                    <!-- Main content container with subtle shadow -->
                    <div class="bg-white rounded-xl shadow-md border border-kemlu-blue-100 p-6">
                        {{ $slot }}
                    </div>
                </div>
            </main>

            <!-- Modern Footer -->
            <footer class="mt-auto bg-white border-t border-kemlu-blue-200">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Company Info -->
                        <div>
                            <h3 class="text-kemlu-blue-800 font-semibold mb-4">{{ config('app.name', 'Laravel') }}</h3>
                            <p class="text-kemlu-blue-600 text-sm">
                                Providing excellent services since {{ date('Y') }}.
                            </p>
                        </div>

                        <!-- Quick Links -->
                        <div>
                            <h3 class="text-kemlu-blue-800 font-semibold mb-4">Quick Links</h3>
                            <ul class="space-y-2 text-sm">
                                <li><a href="#" class="text-kemlu-blue-600 hover:text-kemlu-blue-800 transition">Home</a></li>
                                <li><a href="#" class="text-kemlu-blue-600 hover:text-kemlu-blue-800 transition">About</a></li>
                                <li><a href="#" class="text-kemlu-blue-600 hover:text-kemlu-blue-800 transition">Services</a></li>
                                <li><a href="#" class="text-kemlu-blue-600 hover:text-kemlu-blue-800 transition">Contact</a></li>
                            </ul>
                        </div>

                        <!-- Contact Info -->
                        <div>
                            <h3 class="text-kemlu-blue-800 font-semibold mb-4">Contact</h3>
                            <address class="text-kemlu-blue-600 text-sm not-italic">
                                <p>123 Business Street</p>
                                <p>Jakarta, Indonesia</p>
                                <p class="mt-2">Email: <a href="mailto:info@example.com" class="text-kemlu-yellow-600 hover:text-kemlu-yellow-700">info@example.com</a></p>
                                <p>Phone: +62 123 456 7890</p>
                            </address>
                        </div>
                    </div>

                    <!-- Copyright Bar with Accent -->
                    <div class="mt-8 pt-6 border-t border-kemlu-blue-100 flex flex-col sm:flex-row justify-between items-center">
                        <p class="text-sm text-kemlu-blue-600">
                            &copy; {{ date('Y') }} {{ config('app.name', 'Laravel') }}. All rights reserved.
                        </p>
                        <!-- Social Media Icons -->
                        <div class="flex space-x-4 mt-4 sm:mt-0">
                            <a href="#" class="text-kemlu-blue-500 hover:text-kemlu-blue-700">
                                <span class="sr-only">Facebook</span>
                                <!-- Icon placeholder - replace with actual icons -->
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                            </a>
                            <a href="#" class="text-kemlu-blue-500 hover:text-kemlu-blue-700">
                                <span class="sr-only">Twitter</span>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                            </a>
                            <a href="#" class="text-kemlu-blue-500 hover:text-kemlu-blue-700">
                                <span class="sr-only">Instagram</span>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="#" class="text-kemlu-blue-500 hover:text-kemlu-blue-700">
                                <span class="sr-only">LinkedIn</span>
                                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        @livewireScripts
        <script src="https://website-widgets.pages.dev/dist/sienna.min.js" defer></script>
    </body>
</html>
