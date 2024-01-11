import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AlreadyVerified = () => {
    const [start, setStart] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStart(prevStart => prevStart - 1);
        }, 1000);
        setTimeout(() => {
            clearInterval(intervalId);
            navigate('/');
        }, 5000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center">
            <p className='text-green-600 font-bold'>! Already verified !</p>

            <p>Redirecting to home page in {start} seconds</p>

            <p>Or <Link to="/" className='text-blue-500'>Click here</Link> to go back to Homepage</p>
        </div>
    );
}

export default AlreadyVerified;
