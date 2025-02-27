import React, { useEffect } from 'react';
import { TextField, Button } from '@mui/material';

interface ScriptFormProps {
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  loading: boolean;
}

const ScriptForm: React.FC<ScriptFormProps> = ({ script, setScript, handleSubmit, loading }) => {
  
  // Debugging: Log whenever script changes to ensure it's updated properly
  useEffect(() => {
    console.log('Current script:', script);
  }, [script]);

  // Log when the form is submitted
  const handleClick = () => {
    console.log('Form submitted with script:', script);
    handleSubmit();
  };

  return (
    <div>
      <TextField
        label="Script"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={script}
        onChange={(e) => {
          setScript(e.target.value);
          console.log('Updated script value:', e.target.value); // Log every time script is updated
        }}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={loading || !script} // Disable button if loading or no script is provided
        sx={{ marginTop: '10px' }}
      >
        {loading ? 'Generating...' : 'Generate Intro'}
      </Button>
    </div>
  );
};

export default ScriptForm;
