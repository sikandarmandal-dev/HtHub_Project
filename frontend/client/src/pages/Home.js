import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => setMessage(res.data))
            .catch(err => console.log(err));
    }, []);

    return <h1>{message}</h1>;
}

export default Home;
