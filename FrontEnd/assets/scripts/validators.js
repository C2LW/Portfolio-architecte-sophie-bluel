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
