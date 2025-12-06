const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiErrors({});
    setStatus('');

    // Check rules before submitting
    const rulesPassed = Object.values(passwordRules).every((r) => r === true);
    if (!rulesPassed) {
        setLoading(false);
        return;
    }

    try {
        const payload = {
            ...form.data,
            token: urlData.token,
            email: urlData.email,
        };

        await axios.post('/api/reset-password', payload);
        setStatus('Password successfully reset!');
        navigate('/login');
    } catch (err) {
        console.error('Reset password error:', err);

        if (err.response?.status === 422) {
            // Laravel puts token errors under `email` field
            if (err.response.data?.errors?.email) {
                const tokenError = err.response.data.errors.email[0];
                setApiErrors({ email: [tokenError] }); // display it under email
            } else if (err.response.data?.message) {
                setStatus(err.response.data.message); // fallback for other messages
            }
        } else {
            setStatus('Something went wrong. Please try again.');
        }
    } finally {
        setLoading(false);
    }
};
