export const validateUsername = (username) => {
  if (!username) {
    return { errorCode: 1, errorMessage: "username is a required field" };
  }

  return "";
};


export const validateEmail = (email) => {
  if (!email) {
    return { errorCode: 2, errorMessage: "email is a required field" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { errorCode: 2, errorMessage: "Invalid email format" };
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return { errorCode: 3, errorMessage: "password is a required field" };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      errorCode: 3,
      errorMessage:
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.",
    };
  }

  return "";
};

export const validateLoginPassword = (password) =>{
    if (!password) {
        return { errorCode: 3, errorMessage: "password is a required field" };
    }
}