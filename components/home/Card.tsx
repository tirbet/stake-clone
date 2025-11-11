import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface CardProps {
    title: string;
    imageUrl: string;
    href: string;
    viewers: number;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    className?: string;
}

const fallbackImage =
    'https://placehold.co/600x338/0f1923/ffffff?text=Image+Error';

const Card: React.FC<CardProps> = ({
    title,
    imageUrl,
    href,
    viewers,
    icon: Icon,
    className,

}) => {
    return (
        <div className={cn('contents', className)}>
            <div className="transform transition-transform duration-300 ease-in-out p-[0.125rem]">
                <Link
                    href={href}
                    className="inline-flex relative items-center justify-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-offset-2 focus-visible:outline-none active:scale-95 bg-transparent text-white hover:bg-transparent hover:text-white text-sm leading-none overflow-hidden rounded-md [&_svg]:text-gray-200 [&:hover>svg]:text-white border border-transparent hover:scale-105 hover:-translate-y-0.5 hover:border-yellow-500/75"
                >
                    <div className="w-full overflow-hidden bg-[#213743]">
                        <div className="flex-1 overflow-hidden">
                            <img
                                src={imageUrl}
                                className="w-full max-w-[350px] max-h-[230px] object-cover [aspect-ratio:1.52174/1]"
                                loading='lazy'
                                decoding='async'
                                alt={title}
                                onError={(e) => {
                                    if (e.currentTarget.src !== fallbackImage) {
                                        e.currentTarget.src = fallbackImage;
                                    }
                                }}
                            />
                        </div>
                        <div className="py-3 px-4 text-left">
                            <div className="flex justify-between items-center gap-1.5 min-h-[18px]">
                                <span className="inline-flex gap-0.5 items-center text-white [leading:120%] text-left justify-start text-sm font-bold">
                                    <span className="hidden md:flex items-center">
                                        <Icon  className="w-4 h-4"  />
                                    </span>
                                    {title}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-slate-100 opacity-90">{viewers.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Card;
