import { useState } from 'react';

/**
 * SPA-compatible useForm hook to replace Inertia's useForm
 * Handles form state, validation errors, and submission loading
 */
export function useForm(initialValues = {}, onSubmit = null) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const setData_ = (key, value) => {
    if (typeof key === 'object') {
      setData(prev => ({ ...prev, ...key }));
    } else {
      setData(prev => ({ ...prev, [key]: value }));
    }
  };

  const post = async (url, options = {}) => {
    return submit('post', url, options);
  };

  const put = async (url, options = {}) => {
    return submit('put', url, options);
  };

  const patch = async (url, options = {}) => {
    return submit('patch', url, options);
  };

  const delete_ = async (url, options = {}) => {
    return submit('delete', url, options);
  };

  const submit = async (method, url, options = {}) => {
    setProcessing(true);
    setErrors({});
    setRecentlySuccessful(false);

    try {
      const axios = (await import('@/api/axios')).default;

      // Get CSRF cookie first
      await axios.get('/sanctum/csrf-cookie');

      // Determine data to send
      const submitData = options.data !== undefined ? options.data : data;
      const { data: _, ...axiosOptions } = options; // Remove data from options to avoid conflict

      // Make the request
      const response = await axios({
        method,
        url,
        data: method.toLowerCase() === 'get' ? undefined : submitData,
        params: method.toLowerCase() === 'get' ? data : undefined,
        ...axiosOptions,
      });

      setRecentlySuccessful(true);
      
      if (options.onSuccess) {
        await options.onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        console.error('Backend error:', err.response.data.message);
        setErrors({ general: err.response.data.message });
      } else {
        console.error('Network or client error:', err.message);
        setErrors({ general: err.message || 'Something went wrong' });
      }
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  const reset = (...fields) => {
    if (fields.length === 0) {
      setData(initialValues);
    } else {
      const newData = { ...data };
      fields.forEach(field => {
        newData[field] = initialValues[field];
      });
      setData(newData);
    }
  };

  const clearErrors = (...fields) => {
    if (fields.length === 0) {
      setErrors({});
    } else {
      const newErrors = { ...errors };
      fields.forEach(field => {
        delete newErrors[field];
      });
      setErrors(newErrors);
    }
  };

  return {
    data,
    setData: setData_,
    errors,
    setErrors,
    processing,
    recentlySuccessful,
    post,
    put,
    patch,
    delete: delete_,
    reset,
    clearErrors,
  };
}

export default useForm;