import { createContext, ReactChild, useContext, useRef, useState } from 'react';
import Toast, { ToastProps } from '../../components/molecules/Toast/Toast';

type ShowToastFn = (message: ToastProps['children'], variant?: ToastProps['variant']) => void;

interface ToastContextState {
  showToast: ShowToastFn;
}

const ToastContext = createContext({} as ToastContextState);

interface ToastProviderProps {
  children: ReactChild;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const timeoutRef = useRef<number | null>(null);
  const [{ children: message, isShowed, variant }, setData] = useState<ToastProps>({
    children: '',
    isShowed: false,
    variant: 'warning',
  });

  const closeToast = () => setData((prevData) => ({ ...prevData, isShowed: false }));

  const showToast: ShowToastFn = (message, variant = 'warning') => {
    setData({ children: message, variant, isShowed: true });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(closeToast, 5000) as unknown as number;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast variant={variant} isShowed={isShowed} onClose={closeToast}>
        {message}
      </Toast>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToastContext = () => useContext(ToastContext);
