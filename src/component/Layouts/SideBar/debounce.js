import { useState, useEffect } from 'react';

function Debounce(value, delay) {
    const [debounce, setDeBounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDeBounce(value);
        }, delay);
        return () => clearTimeout(handler);
    });

    return debounce;
}

export default Debounce;