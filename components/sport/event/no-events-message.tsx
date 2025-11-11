import { Link } from "@/i18n/navigation";
import { getDisplayName } from "@/lib/sport/sport-helper";

export const NoEventsMessage: React.FC<{ type: 'live' | 'upcoming' }> = ({ type }) => {

    const displayName = getDisplayName(type);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-gray-400 text-lg font-medium">
                No {displayName.toLowerCase()} matches available
            </div>
            <Link
                href={'sport'}
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
            >
                Return to sports
            </Link>
        </div>
    );
};

