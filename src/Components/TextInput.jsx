import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default forwardRef(function TextInput({ type = 'text', className = '', leftIcon = null, ...props }, ref) {
  const localRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        {...props}
        type={inputType}
        ref={localRef}
        style={{
          width: '100%',
          paddingRight: isPassword ? '2.5rem' : '0.5rem', // extra space for eye icon
          borderRadius: '6px',
          border: '1px solid #D1D5DB',
          padding: '0.5rem',
          transition: 'all 0.2s',
          color: '#111827',
          ...props.style,
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
          tabIndex={-1}
        >
          {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </button>
      )}
    </div>
  );
});
