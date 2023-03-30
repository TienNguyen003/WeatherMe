export const SearchIcon = ({
    width = '2.3rem',
    height = '2.3rem',
    className,
}) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill="currentColor"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        ></path>
        <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="16.511"
            x2="22"
            y1="16.511"
            y2="22"
        ></line>
    </svg>
);

export const SunIcon = ({ width = '2.3rem', height = '2.3rem', className }) => (
    <svg
        className={className}
        width={width}
        height={height}
        fill="currentColor"
        role="img"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g fill="none">
            <path
                fill="#F05514"
                d="M13.438 22.771c-5.14 0-9.338-4.196-9.338-9.336 0-5.14 4.197-9.304 9.338-9.304 5.141 0 9.306 4.197 9.306 9.304 0 5.172-4.165 9.336-9.306 9.336zm13.438-9.369-3.058-2.765 1.236-3.936-4.035-.878-.878-4.034-3.937 1.269L13.406 0 10.64 3.058 6.703 1.822l-.879 4.033-4.034.879 1.269 3.936L0 13.467l3.059 2.766-1.237 3.936 4.035.878.878 4.034 3.937-1.269 2.799 3.058 2.765-3.058 3.937 1.236.879-4.034 4.035-.91-1.27-3.937 3.06-2.765z"
            ></path>
            <path
                fill="#F05514"
                d="M7.549 7.58a8.328 8.328 0 0 1 11.779 0 8.323 8.323 0 0 1 0 11.775 8.328 8.328 0 0 1-11.78 0c-3.253-3.253-3.253-8.555 0-11.775"
            ></path>
        </g>
    </svg>
);

export const Ratio = ({
    className,
    classChildren,
    classPercent,
    classText,
    percent,
    text,
}) => (
    <svg viewBox="0 0 36 36" className={className} fill="currentColor">
        <path
            className={classChildren}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
            className={classPercent}
            strokeDasharray={percent + ', 100'}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20" className={classText}>
            {text}
        </text>
    </svg>
);
