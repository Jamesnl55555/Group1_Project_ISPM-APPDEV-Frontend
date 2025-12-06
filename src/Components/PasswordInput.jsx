import { useState, useEffect } from 'react';

export default function PasswordInput({ form }) {
    const [password, setPassword] = useState(form.data.password || '');
    const [passwordConfirmation, setPasswordConfirmation] = useState(form.data.password_confirmation || '');
    const [passwordError, setPasswordError] = useState('');

    // live validation message
    const [requirements, setRequirements] = useState({
        length: true,
        uppercase: true,
        lowercase: true,
        number: true,
        symbol: false, // false = no invalid symbols
    });

    useEffect(() => {
        form.setData('password', password);
        form.setData('password_confirmation', passwordConfirmation);

        const length = password.length >= 8;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const symbol = /[^A-Za-z0-9]/.test(password); // true if forbidden symbol exists

        setRequirements({
            length: length,
            uppercase: uppercase,
            lowercase: lowercase,
            number: number,
            symbol: symbol,
        });

        // show error only if invalid symbols
        if (symbol) {
            setPasswordError('Password cannot contain symbols.');
        } else {
            setPasswordError('');
        }
    }, [password, passwordConfirmation]);

    const inputStyle = (fieldValue) => ({
        width: '100%',
        padding: '0.5rem',
        marginTop: '0.25rem',
        borderRadius: '6px',
        border: `1px solid ${fieldValue ? '#563d28' : '#D1D5DB'}`,
        backgroundColor: fieldValue ? '#fff4e5ff' : '#ffffff',
        color: '#111827',
        transition: 'all 0.2s',
    });

    return (
        <>
            {/* Password */}
            <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                <label htmlFor="password" style={{ fontWeight: '550', color: '#3b3b3bff' }}>
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    style={inputStyle(password)}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>{passwordError}</div>}
                {!passwordError && (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {!requirements.length && 'At least 8 characters. '}
                        {!requirements.uppercase && 'One uppercase letter. '}
                        {!requirements.lowercase && 'One lowercase letter. '}
                        {!requirements.number && 'One number. '}
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                <label htmlFor="password_confirmation" style={{ fontWeight: '550', color: '#3b3b3bff' }}>
                    Confirm Password
                </label>
                <input
                    id="password_confirmation"
                    type="password"
                    value={passwordConfirmation}
                    placeholder="Confirm Password"
                    style={inputStyle(passwordConfirmation)}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {passwordConfirmation && password !== passwordConfirmation && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                        Passwords do not match.
                    </div>
                )}
            </div>
        </>
    );
}
