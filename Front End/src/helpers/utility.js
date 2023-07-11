export const getToken = () => {
  return localStorage.getItem("userAuth");
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      message: "Invalid email address",
      isValid: false,
    };
  }
  return { message: "", isValid: true };
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      message: "Password must be at least 6 characters",
      isValid: false,
    };
  }
  return { message: "", isValid: true };
};

export const requiredValidation = (data, name) => {
  if (!data) {
    return { message: `${name} field is required`, isValid: false };
  }
  return { message: "", isValid: true };
};
