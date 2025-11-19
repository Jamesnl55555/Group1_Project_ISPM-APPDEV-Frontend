import { Link } from 'react-router-dom';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#4b2e17] text-[#4b2e17] focus:border-[#4b2e17]'
                    : 'border-transparent text-gray-500 hover:text-[#4b2e17] hover:border-[#4b2e17] focus:text-[#4b2e17] focus:border-[#4b2e17]') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
