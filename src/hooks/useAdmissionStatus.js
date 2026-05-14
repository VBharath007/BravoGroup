import { useState, useEffect } from 'react';
import axios from 'axios';

const useAdmissionStatus = () => {
  const [status, setStatus] = useState({
    currentYear: '2026-2027',
    isClosed: false,
    loading: true,
  });

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://zenovagroupsbackend-production.up.railway.app';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/settings/admission-status`);
        if (response.data.success) {
          setStatus({
            currentYear: response.data.data.currentYear,
            isClosed: response.data.data.isClosed,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching admission status:', error);
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStatus();
  }, [API_BASE_URL]);

  return status;
};

export default useAdmissionStatus;
