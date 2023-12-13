import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function Textarea({className = '', isFocused = false, ...props}, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                className + ' rounded-md shadow-sm border-gray-300 focus:border-indigo-200  focus:ring-indigo-200 '}
            ref={input}
        >
        </textarea>
    );
});
