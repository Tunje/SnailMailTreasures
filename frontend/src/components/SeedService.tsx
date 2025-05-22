// src/components/DatabaseInitializer.tsx
import React, { useEffect } from 'react';
import seedService from '../services/seedService';

const DatabaseInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize the database when the component mounts
    seedService.initialize();
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default DatabaseInitializer;