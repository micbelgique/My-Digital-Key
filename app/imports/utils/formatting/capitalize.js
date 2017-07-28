export const formatCapitalize = sentence => sentence.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1));

export const formatCapitalizeAndLower = sentence => sentence.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
