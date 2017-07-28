import { formatSanitizeSpecialChars } from '/imports/utils/formatting';

const Slug = (value) => {
  if(!value) return "";

  // 1) converti les caractères accentués en leurs équivalent alpha
  // 2) met en bas de casse
  // 3) remplace les espace par des tirets
  // 4) enleve tout les caratères non alphanumeriques
  // 5) enlève les doubles tirets
  // 6) enlève les tirets en fin de string
  return formatSanitizeSpecialChars(value)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/\-{2,}/g,'-')
    .replace(/\-$/g, '');
};

export default Slug;
