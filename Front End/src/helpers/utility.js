export const getToken = () => {
  return localStorage.getItem("userAuth");
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   email: "Invalid email address",
    // }));
    return {
      message: "Invalid email address",
      isValid: false,
    };
  }
  //   setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  return { message: "", isValid: true };
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     password: "Password must be at least 6 characters",
    // }));
    return {
      message: "Password must be at least 6 characters",
      isValid: false,
    };
  }
  // setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  return { message: "", isValid: true };
};

export const requiredValidation = (data, name) => {
  console.log("name", data, name);
  if (!data) {
    //     setErrors((prevErrors) => ({
    //         ...prevErrors,
    //         [name]: `${name} field is required`,
    // }));
    return { message: `${name} field is required`, isValid: false };
  }
  // setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  return { message: "", isValid: true };
};
