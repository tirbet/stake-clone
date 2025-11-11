import { Link } from "@/i18n/navigation";


const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.223 0-9.657-3.657-11.303-8H6.306C9.656 39.663 16.318 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const LineIcon = () => (
    <svg className="w-6 h-6" fill="#00C300" viewBox="0 0 24 24">
        <path d="M21.8,4.2C20.1,2.8,17.9,2,15.4,2c-4.6,0-8.4,3.1-8.4,7c0,2.3,1.3,4.4,3.4,5.8c-0.1,0.1-0.2,0.2-0.3,0.3c-1.8,1.8-3.6,3.6-5.4,5.4C4.5,20.7,4.3,21,4.5,21.3c0.2,0.3,0.5,0.3,0.8,0.1c2.1-1.3,4.1-2.6,6.2-3.9c0.7-0.4,1.4-0.8,2.1-1.2c0.3-0.2,0.6-0.3,0.9-0.5c1,0.3,2.1,0.5,3.2,0.5c4.6,0,8.4-3.1,8.4-7C23.9,7.4,23.2,5.6,21.8,4.2z M15.4,14.5c-0.8,0-1.6-0.1-2.3-0.4c-0.2-0.1-0.5-0.1-0.7,0.1c-0.6,0.4-1.2,0.8-1.8,1.2c-0.1,0.1-0.3,0.2-0.4,0.3c-1.5,1-3,2-4.5,2.9c1.3-1.3,2.6-2.6,3.9-3.9c0.2-0.2,0.2-0.5,0.1-0.7c-1.6-2-2.6-4.3-2.6-6.8c0-3,3-5.5,6.9-5.5c2,0,3.8,0.6,5.1,1.8c1.1,1,1.7,2.4,1.7,4.1C20.9,12,18.5,14.5,15.4,14.5z" />
        <path d="M10.3,10.1h-2V7.5h-1v3.8h3V10.1z" />
        <path d="M14.5,11.3h-3V7.5h3c0.6,0,1,0.4,1,1v1.8C15.5,10.9,15.1,11.3,14.5,11.3z M13.5,8.5h-1v1.8h1c0.3,0,0.5-0.2,0.5-0.5V9C14,8.7,13.8,8.5,13.5,8.5z" />
        <path d="M18.8,11.3h-3V7.5h3c0.6,0,1,0.4,1,1v1.8C19.8,10.9,19.4,11.3,18.8,11.3z M17.8,8.5h-1v1.8h1c0.3,0,0.5-0.2,0.5-0.5V9C18.3,8.7,18.1,8.5,17.8,8.5z" />
    </svg>
);

const TwitchIcon = () => (
    <svg className="w-6 h-6" fill="#9146FF" viewBox="0 0 24 24">
        <path d="M2.149 0L.521 4.117v16.226h5.783v3.657h3.654l3.656-3.657h5.26L23.479 14.7V0H2.149zm19.243 13.658l-3.656 3.656h-5.259l-3.655 3.656v-3.656H3.149V1.528h18.243v12.13z" />
        <path d="M15.826 5.645h-2.11v6.11h2.11v-6.11zM10.554 5.645H8.444v6.11h2.11v-6.11z" />
    </svg>
);

type WelcomeProps = {
    title: string;
    register: string;
    orText: string;
    socail: {
        facebook: boolean;
        google: boolean;
        line: boolean;
        twitch: boolean;
    }
}

export default function Welcome({ title, register, socail, orText }: WelcomeProps) {
    return (
        <div className="grid grid-flow-row grid-rows-[1fr_auto] gap-y-3 md:gap-y-8 lg:max-w-[478px] w-full items-center">
            <div>
                <div className="p-3 sm:px-24 md:px-0 lg:pr-20">
                    <h1 className="text-3xl sm:text-2xl md:text-4xl font-bold leading-tight items-center md:items-start">
                        {title}
                    </h1>
                </div>
                <Link
                    href={'register'}
                    className="mt-8 md:mt-4 py-3 px-4 w-full md:w-auto sm:max-w-80 mx-auto md:mx-0 block md:inline-flex justify-center items-center gap-2 rounded-md font-semibold text-sm leading-none whitespace-nowrap bg-blue-500 text-white hover:bg-blue-600 transition active:scale-[0.98] focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2 shadow-md ring-offset-background disabled:pointer-events-none disabled:opacity-50 text-center"
                >
                    {register}
                </Link>

            </div>
            <div className="h-full w-full flex flex-col justify-end items-center md:items-start">
                <div className="mb-2">
                    <p className="text-gray-400 text-sm">{orText}</p>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    {socail.facebook && (
                        <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition duration-300 ease-in-out">
                            <FacebookIcon />
                        </a>
                    )}
                    {socail.google && (
                        <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition duration-300 ease-in-out">
                            <GoogleIcon />
                        </a>
                    )}
                    {socail.line && (
                        <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition duration-300 ease-in-out">
                            <LineIcon />
                        </a>
                    )}
                    {socail.twitch && (
                        <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition duration-300 ease-in-out">
                            <TwitchIcon />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}