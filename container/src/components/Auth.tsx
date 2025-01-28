import { useEffect, useRef } from 'react';
import { mount } from 'remote3/AuthApp';

const Auth = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref} />;
};

export default Auth; 