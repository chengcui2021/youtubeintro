'use client'; // Ensure the component is treated as client-side

import React, { useState } from 'react';
import axios from 'axios';
import ScriptForm from '../components/ScriptForm';
import IntroResult from '../components/IntroResult';
import { Box, CircularProgress } from '@mui/material';

const Home = () => {
  const [script, setScript] = useState('');
  const [intro, setIntro] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!script.trim()) {
      console.error('Script is empty');
      setIntro('Please provide a script.');
      return;
    }
  
    setLoading(true);
  
    // Prepare the payload as JSON
    const payload = {
      script: script,
    };
  
    // Debug log to inspect the payload
    console.log('Sending payload:', payload);
  
    try {
      const response = await axios.post('https://youtubeintroapi-a42457078809.herokuapp.com/api/generateIntro', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setIntro(response.data.intro);
    } catch (error) {
      console.error('Error generating intro:', error);
      setIntro('Error generating intro, please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box sx={{ padding: '20px' }}>
      <ScriptForm script={script} setScript={setScript} handleSubmit={handleSubmit} loading={loading} />
      {loading ? <CircularProgress /> : intro && <IntroResult intro={intro} />}
    </Box>
  );
};

export default Home;
