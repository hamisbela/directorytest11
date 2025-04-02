import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching data with loading and error states
 */
export function useDataFetching<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await fetchFunction();
        
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ 
            data: null, 
            loading: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}