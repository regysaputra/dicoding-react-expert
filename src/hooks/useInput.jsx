import React, {useState} from 'react';

function useInput() {
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function reset() {
        setValue('');
    }

    return [ value, handleChange, reset ];
}

export default useInput;