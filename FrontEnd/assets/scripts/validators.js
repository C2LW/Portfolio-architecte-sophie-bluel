/**
 * Validation de l'adresse e-mail
 * @param {string} email
 * @throws {Error}
 */
export function validerEmail(email) {
    // Regex simple + bornes + insensible à la casse
    const mailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/i;
    if (!mailRegex.test(String(email).trim())) {
        throw new Error("L'adresse e-mail n'est pas valide.");
    }
}



/**
 * Fonction validation du mot de passe
 * @param {string} password
 * @throws {error} ""
 */
export function validerPassword(password) {
    const pass = String(password);
    const hasMinLen = pass.length >= 6;
    const hasLetter = /[A-Za-z]/.test(pass);
    const hasDigit = /\d/.test(pass);

    if (!(hasMinLen && hasLetter && hasDigit)) {
        throw new Error("Mot de passe invalide (6+ caractères, 1 lettre et 1 chiffre).");
    }
};




/**
 * Function to valid file type
 * @param {File} file 
 * @returns BOOL
 */
export function validFileType(file) {
    let fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    console.log(file.type);

  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      console.log("Type de fichier valid")  
      return true;
    }
  }
  return false;
}

/**
 * 
 * @param {file} file 
 * @returns BOOL
 */
export function validFileSize(file) {
    const fileSize = 4000000;
    console.log(file.size);
    
    if(file.size < fileSize) {
        console.log("Size inférieure à 4mo")
        return true;
    } else {
        return false;
    }
}