import {useState} from 'react';

export const TogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export const ToggleRePasswordVisibility = () => {
  const [rePasswordVisibility, setRePasswordVisibility] = useState(true);
  const [reRightIcon, setReRightIcon] = useState('eye-off');
  const handleRePasswordVisibility = () => {
    if (reRightIcon === 'eye') {
      setReRightIcon('eye-off');
      setRePasswordVisibility(!rePasswordVisibility);
    } else if (reRightIcon === 'eye-off') {
      setReRightIcon('eye');
      setRePasswordVisibility(!rePasswordVisibility);
    }
  };
  return {
    rePasswordVisibility,
    reRightIcon,
    handleRePasswordVisibility,
  };
};
