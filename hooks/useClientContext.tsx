import { useContext } from 'react';
import { ClientContext } from '@/providers/context-provider';

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientWrapper');
  }
  return context;
};

export default useClientContext;
