import { useRef, useEffect } from 'react';

const Index = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default Index;
