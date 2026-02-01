import React, {useState} from 'react';

function useInput() {
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    return [ value, handleChange ];
}

export default useInput;