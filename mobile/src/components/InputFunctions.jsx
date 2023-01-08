import {useState} from 'react';

//toggle visibility for password
export const TogglePasswordVisibility = () => {
    //state variables
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-off');

    //onpress visibility function
    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    //return data and function
    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
    };
};

//toggle visibility for re-enter password
export const ToggleRePasswordVisibility = () => {
    //state variables
    const [rePasswordVisibility, setRePasswordVisibility] = useState(true);
    const [reRightIcon, setReRightIcon] = useState('eye-off');

    //onpress visibility function
    const handleRePasswordVisibility = () => {
        if (reRightIcon === 'eye') {
            setReRightIcon('eye-off');
            setRePasswordVisibility(!rePasswordVisibility);
        } else if (reRightIcon === 'eye-off') {
            setReRightIcon('eye');
            setRePasswordVisibility(!rePasswordVisibility);
        }
    };

    //return data and function
    return {
        rePasswordVisibility,
        reRightIcon,
        handleRePasswordVisibility,
    };
};
