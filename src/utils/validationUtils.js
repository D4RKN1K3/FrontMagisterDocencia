export const isPasswordValid = (password) => {
    const minLength = 8; // Longitud mínima de la contraseña
    const hasUppercase = /[A-Z]/.test(password); // Verificar si contiene al menos una letra mayúscula
    const hasLowercase = /[a-z]/.test(password); // Verificar si contiene al menos una letra minúscula
    const hasNumber = /[0-9]/.test(password); // Verificar si contiene al menos un número
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password); // Verificar si contiene al menos un carácter especial
  
    if (password.length < minLength) {
      return "La contraseña debe tener al menos " + minLength + " caracteres.";
    }
  
    if (!hasUppercase) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
  
    if (!hasLowercase) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }
  
    if (!hasNumber) {
      return "La contraseña debe contener al menos un número.";
    }
  
    if (!hasSpecialChar) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
  
    // Si la contraseña pasa todas las validaciones, devuelve null o un mensaje de éxito
    return null;
  };
  