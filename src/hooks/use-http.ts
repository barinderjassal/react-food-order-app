import { useCallback, useState } from "react";

interface RequestConfig {
  url: string;
  method?: string;
  headers?: any;
  body?: any
}

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('' as any);

  const sendRequest = useCallback(async (requestConfig: RequestConfig, transformData?: any) => {
    setIsLoading(true);
    setIsError(null);
    try {
      // hit the api
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });
  
      if (response.status !== 200) {
        // set errors
        throw new Error('Something went wrong!');
      }
  
      const data: any = await response.json();
      if (transformData) {
        transformData(data);
      }

    } catch ({ message }) {
      setIsError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    isLoading,
    isError,
    sendRequest
  }
}