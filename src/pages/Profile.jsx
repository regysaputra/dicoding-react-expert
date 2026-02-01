import React from 'react';

function ProfilePage() {
    const user = {
        id: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg"
    };

    return (
        <main
            className="flex-1 mx-auto max-w-5xl h-3/4 px-4 sm:px-6 lg:px-8 py-8 mt-16"
            data-id="element-171"
        >
            <div
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6"
                data-id="element-172"
            >
                <div
                    className="h-32 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600"
                    data-id="element-173"
                />
                <div className="px-6 pb-6" data-id="element-174">
                    <div
                        className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16 gap-4"
                        data-id="element-175"
                    >
                        <div
                            className="flex flex-col sm:flex-row items-center sm:items-end gap-4"
                            data-id="element-176"
                        >
                            <div
                                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold border-4 border-white shadow-lg"
                                data-id="element-177"
                            >
                                {(user.name)[0]}
                            </div>
                            <div className="text-center sm:text-left pb-2" data-id="element-178">
                                <h1
                                    className="text-2xl font-bold text-gray-900"
                                    data-id="element-179"
                                >
                                    {user.name}
                                </h1>
                                <p className="text-gray-500" data-id="element-180">
                                    @{user.id}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex gap-3 justify-center sm:justify-end"
                            data-id="element-181"
                        >
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                data-id="element-182"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-settings h-4 w-4"
                                    aria-hidden="true"
                                    data-id="element-183"
                                >
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                    <circle cx={12} cy={12} r={3} />
                                </svg>
                                Settings
                            </button>
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                data-id="element-184"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-pen h-4 w-4"
                                    aria-hidden="true"
                                    data-id="element-185"
                                >
                                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 max-w-2xl" data-id="element-186">
                        <p className="text-gray-600" data-id="element-187">
                            Full-stack developer passionate about React and TypeScript. Building
                            better developer experiences one component at a time.
                        </p>
                        <div
                            className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500"
                            data-id="element-188"
                        >
          <span className="flex items-center gap-1.5" data-id="element-189">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar h-4 w-4"
                aria-hidden="true"
                data-id="element-190"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width={18} height={18} x={3} y={4} rx={2} />
              <path d="M3 10h18" />
            </svg>
            Joined January 2024
          </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4" data-id="element-191">
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700"
            data-id="element-192"
        >
          <span data-id="element-193">🌟</span>Early Adopter
        </span>
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                            data-id="element-192"
                        >
          <span data-id="element-193">🤝</span>Helpful
        </span>
                        <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700"
                            data-id="element-192"
                        >
          <span data-id="element-193">🏆</span>Top Contributor
        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProfilePage;