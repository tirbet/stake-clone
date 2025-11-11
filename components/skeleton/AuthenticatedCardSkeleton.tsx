import { Star } from "lucide-react";

export default function AuthenticatedCardSkeleton() {
    return (
        <div className="w-full h-full mr-auto max-h-fit max-w-full sm:max-w-[390px] flex flex-col justify-center items-start self-center bg-gray-900 border-0.5 sm:border-1 md:border-2 border-solid border-[rgb(47,69,83)]">
            <div className="flex justify-center rounded-xl overflow-hidden relative w-full max-w-96 p-2 bg-gradient-to-b from-gray-700 to-gray-800 aspect-video">
                <div className="flex flex-col justify-center rounded-lg w-full">
                    <div className="flex flex-col justify-between px-6 py-5 z-10 h-full bg-[#0f212e] text-white">
                        {/* Skeleton for Header */}
                        <div className="flex justify-between mb-6 items-center">
                            <div className="h-5 bg-gray-700 rounded-md w-24 animate-pulse"></div>
                            <Star className="w-5 h-5 text-[#2F4553]" />
                        </div>

                        {/* Skeleton for Content Area */}
                        <div className="w-full animate-pulse" data-content>
                            <div className="w-full">
                                <div className="flex justify-between items-center gap-5">
                                    {/* Skeleton for "Your VIP Progress" button */}
                                    <div className="h-5 bg-gray-700 rounded-md w-36"></div>
                                    {/* Skeleton for percentage and info icon */}
                                    <div className="flex gap-2 items-center">
                                        <div className="h-5 bg-gray-700 rounded-md w-12"></div>
                                        <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                                    </div>
                                </div>
                                {/* Skeleton for Progress Bar */}
                                <div className="mt-2 h-2 bg-gray-700 rounded-full w-full"></div>
                                <div className="flex justify-between w-full mt-2">
                                     {/* Skeleton for "None" level */}
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                                        <div className="h-4 bg-gray-700 rounded-md w-10"></div>
                                    </div>
                                     {/* Skeleton for "Bronze" level */}
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                                        <div className="h-4 bg-gray-700 rounded-md w-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
