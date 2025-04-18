<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold text-kemlu-blue-800">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="bg-white border border-kemlu-blue-100 rounded-xl p-6 shadow-sm">
        <div class="flex items-center space-x-3 mb-6">
            <div class="p-2 bg-kemlu-blue-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-kemlu-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-lg font-medium text-kemlu-blue-800">{{ __("Welcome to your dashboard") }}</h3>
        </div>

        <p class="text-kemlu-blue-600 mb-4">{{ __("You're logged in successfully!") }}</p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Quick Stats Card -->
            <div class="bg-kemlu-blue-50 rounded-lg p-4 border border-kemlu-blue-100">
                <h4 class="text-sm font-medium text-kemlu-blue-700 mb-2">Recent Activity</h4>
                <p class="text-2xl font-bold text-kemlu-blue-800">12</p>
                <div class="mt-2 text-xs text-kemlu-blue-600">
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-kemlu-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                        </svg>
                        24% increase
                    </span>
                </div>
            </div>

            <!-- Quick Stats Card -->
            <div class="bg-kemlu-blue-50 rounded-lg p-4 border border-kemlu-blue-100">
                <h4 class="text-sm font-medium text-kemlu-blue-700 mb-2">Upcoming Tasks</h4>
                <p class="text-2xl font-bold text-kemlu-blue-800">4</p>
                <div class="mt-2 text-xs text-kemlu-blue-600">
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-kemlu-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                        </svg>
                        No change
                    </span>
                </div>
            </div>

            <!-- Quick Stats Card -->
            <div class="bg-kemlu-blue-50 rounded-lg p-4 border border-kemlu-blue-100">
                <h4 class="text-sm font-medium text-kemlu-blue-700 mb-2">Notifications</h4>
                <p class="text-2xl font-bold text-kemlu-blue-800">3</p>
                <div class="mt-2 text-xs text-kemlu-blue-600">
                    <span class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-kemlu-red-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        2 new today
                    </span>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-sm font-semibold text-kemlu-blue-800">Recent Updates</h4>
                <a href="#" class="text-xs text-kemlu-blue-600 hover:text-kemlu-blue-800 font-medium">View All</a>
            </div>

            <div class="space-y-3">
                <div class="flex items-start border-b border-kemlu-blue-100 pb-3">
                    <div class="bg-kemlu-blue-100 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-kemlu-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-kemlu-blue-800">System update completed</p>
                        <p class="text-xs text-kemlu-blue-600">Yesterday at 11:42 PM</p>
                    </div>
                </div>

                <div class="flex items-start">
                    <div class="bg-kemlu-yellow-100 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-kemlu-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-kemlu-blue-800">Your subscription will expire soon</p>
                        <p class="text-xs text-kemlu-blue-600">2 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
