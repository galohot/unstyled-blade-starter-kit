<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased text-kemlu-blue-800">
        <!-- Subtle top accent bar -->
        <div class="h-1 bg-gradient-to-r from-kemlu-blue-600 via-kemlu-yellow-500 to-kemlu-green-600"></div>

        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-br from-kemlu-blue-50 to-kemlu-blue-100">
            <div class="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-lg overflow-hidden sm:rounded-xl border border-kemlu-blue-100">
                <div class="flex justify-center mb-8">
                    <a href="/" class="inline-flex items-center">
                        <span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kemlu-blue-600 to-kemlu-green-600">
                            Logo
                        </span>
                    </a>
                </div>

                <div class="w-full">
                    {{ $slot }}
                </div>
            </div>

            <div class="w-full sm:max-w-md mt-6 px-6 py-4 text-center text-sm text-kemlu-blue-600">
                &copy; {{ date('Y') }} {{ config('app.name', 'Laravel') }}. All rights reserved.
            </div>
        </div>
    </body>
</html>
