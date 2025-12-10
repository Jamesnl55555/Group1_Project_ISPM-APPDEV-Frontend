import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={inputType}
                className={
                    'rounded-md border w-full pr-10 ' +
                    className
                }
                style={{
                    width: '95%',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: `1px solid ${props.hasError ? 'red' : '#D1D5DB'}`,
                    backgroundColor: props.hasError
                        ? '#ffe5e5'
                        : props.value
                        ? '#fff4e5ff'
                        : '#ffffff',
                    color: props.hasError ? 'red' : '#111827',
                    transition: '0.2s',
                }}
                ref={localRef}
            />

            {isPassword && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
            )}
        </div>
    );
});
