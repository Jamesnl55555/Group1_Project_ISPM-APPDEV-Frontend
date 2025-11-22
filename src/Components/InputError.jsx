export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
             style={{ color: 'red', marginTop: '0.25rem' }}
            // className={'text-sm text-red-600 ' + className}
            className={className}
        >
            {message}
        </p>
    ) : null;
}
