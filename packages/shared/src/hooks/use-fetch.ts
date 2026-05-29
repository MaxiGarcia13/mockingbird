import { useState } from 'react';

export function useFetch<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const dispatch = (callback: () => Promise<T>) => {
    setIsLoading(true);

    return callback()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    dispatch,
    isLoading,
    error,
    data,
  };
}
