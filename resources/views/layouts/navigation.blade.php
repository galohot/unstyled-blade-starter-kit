<nav x-data="{ open: false }" class="bg-white border-b border-kemlu-blue-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="shrink-0 flex items-center">
                    <a x-navigate href="{{ route('dashboard') }}" class="flex items-center">
                        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-kemlu-blue-600 to-kemlu-green-600">
                            Logo
                        </span>
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:ml-10 sm:flex">
                    <a x-navigate
                       href="{{ route('dashboard') }}"
                       class="inline-flex items-center px-1 pt-1 border-b-2 {{ request()->routeIs('dashboard') ? 'border-kemlu-blue-600 text-kemlu-blue-800' : 'border-transparent text-kemlu-blue-600 hover:text-kemlu-blue-700 hover:border-kemlu-blue-300' }} text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:border-kemlu-blue-700">
                        {{ __('Dashboard') }}
                    </a>
                </div>
            </div>

            <!-- Settings Dropdown -->
            <div class="hidden sm:flex sm:items-center sm:ml-6">
                <div class="relative" x-data="{ open: false }">
                    <button @click="open = !open" class="flex items-center text-sm font-medium text-kemlu-blue-600 hover:text-kemlu-blue-700 hover:border-kemlu-blue-300 focus:outline-none transition duration-150 ease-in-out">
                        <span class="mr-2">{{ Auth::user()->name }}</span>
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>

                    <div x-show="open"
                         @click.away="open = false"
                         x-transition:enter="transition ease-out duration-200"
                         x-transition:enter-start="transform opacity-0 scale-95"
                         x-transition:enter-end="transform opacity-100 scale-100"
                         x-transition:leave="transition ease-in duration-75"
                         x-transition:leave-start="transform opacity-100 scale-100"
                         x-transition:leave-end="transform opacity-0 scale-95"
                         class="absolute right-0 z-50 mt-2 w-48 rounded-md shadow-lg origin-top-right">
                        <div class="rounded-md ring-1 ring-kemlu-blue-200 ring-opacity-5 py-1 bg-white">
                            <a x-navigate href="{{ route('profile.edit') }}" class="block px-4 py-2 text-sm text-kemlu-blue-700 hover:bg-kemlu-blue-50">
                                {{ __('Profile') }}
                            </a>

                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-kemlu-blue-700 hover:bg-kemlu-blue-50">
                                    {{ __('Log Out') }}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hamburger -->
            <div class="-mr-2 flex items-center sm:hidden">
                <button @click="open = !open" class="inline-flex items-center justify-center p-2 rounded-md text-kemlu-blue-500 hover:text-kemlu-blue-600 hover:bg-kemlu-blue-50 focus:outline-none focus:bg-kemlu-blue-50 focus:text-kemlu-blue-600 transition duration-150 ease-in-out">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div :class="{'block': open, 'hidden': !open}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <a x-navigate
               href="{{ route('dashboard') }}"
               class="block pl-3 pr-4 py-2 border-l-4 {{ request()->routeIs('dashboard') ? 'border-kemlu-blue-600 text-kemlu-blue-700 bg-kemlu-blue-50' : 'border-transparent text-kemlu-blue-600 hover:text-kemlu-blue-700 hover:bg-kemlu-blue-50 hover:border-kemlu-blue-300' }} text-base font-medium focus:outline-none focus:text-kemlu-blue-800 focus:bg-kemlu-blue-100 focus:border-kemlu-blue-600 transition duration-150 ease-in-out">
                {{ __('Dashboard') }}
            </a>
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-kemlu-blue-200">
            <div class="px-4">
                <div class="font-medium text-base text-kemlu-blue-800">{{ Auth::user()->name }}</div>
            </div>

            <div class="mt-3 space-y-1">
                <a x-navigate href="{{ route('profile.edit') }}" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-kemlu-blue-600 hover:text-kemlu-blue-700 hover:bg-kemlu-blue-50 hover:border-kemlu-blue-300 text-base font-medium focus:outline-none transition duration-150 ease-in-out">
                    {{ __('Profile') }}
                </a>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-kemlu-blue-600 hover:text-kemlu-blue-700 hover:bg-kemlu-blue-50 hover:border-kemlu-blue-300 text-base font-medium focus:outline-none transition duration-150 ease-in-out">
                        {{ __('Log Out') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</nav>
