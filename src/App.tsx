import  { useState, useEffect } from 'react';
import MainLayout from "./components/layout/MainLayout";
import Loader from './components/pages/Loader';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading process, like fetching data or initial setup
    const timer = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
