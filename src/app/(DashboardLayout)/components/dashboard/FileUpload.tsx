import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { api } from '@/services/api';

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid CSV file');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      await api.devices.uploadCSV(selectedFile);
      onUploadSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom>
        Upload CSV File
      </Typography>
      
      <Box sx={{ my: 2 }}>
        <input
          accept="*"
          style={{ display: 'none' }}
          id="csv-file-input"
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="csv-file-input">
          <Button
            size="large"
            variant="contained"
            component="span"
            disabled={uploading}
          >
            <Typography variant="h3">
              Select File
            </Typography>
          </Button>
        </label>
        {selectedFile && (
          <Typography sx={{ mt: 1 }}>
            Selected file: {selectedFile.name}
          </Typography>
        )}
      </Box>

      {error && (
        <Typography color="error" sx={{ my: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? <CircularProgress size={24} /> : <Typography variant="h5">Upload</Typography>}
      </Button>
    </Box>
  );
};

export default FileUpload; 