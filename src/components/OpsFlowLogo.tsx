export function OpsFlowLogo({ className = "", size = 36 }: { className?: string; size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(241, 70%, 55%)" />
                    <stop offset="50%" stopColor="hsl(262, 83%, 58%)" />
                    <stop offset="100%" stopColor="hsl(280, 70%, 55%)" />
                </linearGradient>
                <linearGradient id="bolt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e8e0ff" />
                </linearGradient>
            </defs>
            {/* Rounded square background */}
            <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#logo-gradient)" />
            {/* Inner glow */}
            <rect x="2" y="2" width="36" height="36" rx="8" fill="white" fillOpacity="0.08" />
            {/* Lightning bolt / flow icon */}
            <path
                d="M22.5 8L13 22h7l-2.5 10L27 18h-7l2.5-10z"
                fill="url(#bolt-gradient)"
                stroke="white"
                strokeWidth="0.5"
                strokeLinejoin="round"
            />
            {/* Small sparkle dots */}
            <circle cx="10" cy="12" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="30" cy="28" r="1" fill="white" fillOpacity="0.4" />
            <circle cx="32" cy="10" r="0.8" fill="white" fillOpacity="0.3" />
        </svg>
    );
}
