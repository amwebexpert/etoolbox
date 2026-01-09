import type { HtmlEntity, HtmlEntityCategory, HtmlEntityFilterField } from "./html-entities.types";

// Helper to determine entity category based on character/description
const determineCategory = (entity: {
  character: string;
  entityName: string;
  description: string;
}): HtmlEntityCategory => {
  const desc = entity.description.toLowerCase();
  const char = entity.character;
  const charCode = char.charCodeAt(0);

  // Digits
  if (desc.includes("digit")) {
    return "numbers";
  }

  // Uppercase/lowercase letters (basic A-Z, a-z)
  if (desc.startsWith("uppercase") || desc.startsWith("lowercase")) {
    // Check if it's accented
    if (
      desc.includes("with") ||
      desc.includes("ae") ||
      desc.includes("hook") ||
      desc.includes("caron") ||
      desc.includes("diaer")
    ) {
      return "letters-accented";
    }
    return "letters";
  }

  // Capital/Lowercase with accents (before Greek detection)
  if (
    (desc.startsWith("capital") || desc.includes("lowercase")) &&
    (desc.includes("with") ||
      desc.includes("accent") ||
      desc.includes("umlaut") ||
      desc.includes("tilde") ||
      desc.includes("ring") ||
      desc.includes("cedilla") ||
      desc.includes("slash") ||
      desc.includes("caron") ||
      desc.includes("diaer"))
  ) {
    return "letters-accented";
  }

  // Ligatures
  if (
    desc.includes("ligature") ||
    desc.includes("eth") ||
    desc.includes("thorn") ||
    desc.includes("sharp s") ||
    desc.includes("capital ae") ||
    desc.includes("lowercase ae")
  ) {
    return "letters-accented";
  }

  // Greek letters - check entityName for Greek alphabet
  const greekNames = [
    "&Alpha;",
    "&Beta;",
    "&Gamma;",
    "&Delta;",
    "&Epsilon;",
    "&Zeta;",
    "&Eta;",
    "&Theta;",
    "&Iota;",
    "&Kappa;",
    "&Lambda;",
    "&Mu;",
    "&Nu;",
    "&Xi;",
    "&Omicron;",
    "&Pi;",
    "&Rho;",
    "&Sigma;",
    "&Tau;",
    "&Upsilon;",
    "&Phi;",
    "&Chi;",
    "&Psi;",
    "&Omega;",
    "&alpha;",
    "&beta;",
    "&gamma;",
    "&delta;",
    "&epsilon;",
    "&zeta;",
    "&eta;",
    "&theta;",
    "&iota;",
    "&kappa;",
    "&lambda;",
    "&mu;",
    "&nu;",
    "&xi;",
    "&omicron;",
    "&pi;",
    "&rho;",
    "&sigma;",
    "&tau;",
    "&upsilon;",
    "&phi;",
    "&chi;",
    "&psi;",
    "&omega;",
    "&sigmaf;",
    "&thetasym;",
    "&upsih;",
    "&piv;",
  ];
  if (greekNames.includes(entity.entityName)) {
    return "greek";
  }

  // Math symbols
  if (
    desc.includes("plus or minus") ||
    desc.includes("plus sign") ||
    desc.includes("minus") ||
    desc.includes("multiplication") ||
    desc.includes("divide") ||
    desc.includes("sum") ||
    desc.includes("product") ||
    desc.includes("integral") ||
    desc.includes("infinity") ||
    desc.includes("angle") ||
    desc.includes("perpendicular") ||
    desc.includes("subset") ||
    desc.includes("superset") ||
    desc.includes("square root") ||
    desc.includes("for all") ||
    desc.includes("exist") ||
    desc.includes("nabla") ||
    desc.includes("congruent") ||
    desc.includes("proportional") ||
    desc.includes("equivalent") ||
    desc === "cap" ||
    desc === "cup" ||
    desc.includes("therefore") ||
    desc.includes("similar") ||
    desc.includes("dot operator") ||
    desc.includes("lowast") ||
    desc.includes("circled") ||
    desc.includes("fraction") ||
    desc.includes("superscript") ||
    desc.includes("not equal") ||
    desc.includes("less or equal") ||
    desc.includes("greater or equal") ||
    desc.includes("almost equal") ||
    desc.includes("is in") ||
    desc.includes("not in") ||
    desc === "ni" ||
    desc === "and" ||
    desc === "or" ||
    desc === "empty" ||
    desc === "part"
  ) {
    return "math";
  }

  // Currency
  if (
    desc === "cent" ||
    desc === "pound" ||
    desc === "yen" ||
    desc === "euro" ||
    desc.includes("currency") ||
    desc.includes("dollar sign")
  ) {
    return "currency";
  }

  // Arrows
  if (desc.includes("arrow") || desc.includes("ceiling") || desc.includes("floor")) {
    return "arrows";
  }

  // Whitespace (more specific)
  if (
    desc.includes("space") ||
    desc.includes("joiner") ||
    desc.includes("left-to-right mark") ||
    desc.includes("right-to-left mark")
  ) {
    return "whitespace";
  }

  // Punctuation and quotes
  if (
    desc.includes("exclamation") ||
    desc.includes("question") ||
    desc.includes("quotation") ||
    desc.includes("quote") ||
    desc.includes("bracket") ||
    desc.includes("brace") ||
    desc.includes("parenthesis") ||
    desc.includes("comma") ||
    desc.includes("period") ||
    desc.includes("colon") ||
    desc.includes("semicolon") ||
    desc.includes("slash") ||
    desc.includes("hyphen") ||
    desc.includes("dash") ||
    desc.includes("apostrophe") ||
    desc.includes("bullet") ||
    desc.includes("ellipsis") ||
    desc.includes("dagger") ||
    desc.includes("per mille") ||
    desc.includes("overline") ||
    desc.includes("ampersand") ||
    desc.includes("minutes") ||
    desc.includes("seconds")
  ) {
    return "punctuation";
  }

  // Symbols (trademark, copyright, etc.)
  if (
    desc.includes("trademark") ||
    desc.includes("copyright") ||
    desc.includes("registered") ||
    desc.includes("degree") ||
    desc.includes("section") ||
    desc.includes("paragraph") ||
    desc.includes("micro") ||
    desc.includes("lozenge") ||
    desc.includes("spade") ||
    desc.includes("club") ||
    desc.includes("heart") ||
    desc.includes("diamond") ||
    desc.includes("ordinal") ||
    desc.includes("negation") ||
    desc.includes("broken") ||
    desc.includes("macron") ||
    desc.includes("cedilla") ||
    desc.includes("caret") ||
    desc.includes("tilde") ||
    desc.includes("underscore") ||
    desc.includes("vertical bar") ||
    desc.includes("at sign") ||
    desc.includes("asterisk") ||
    desc.includes("number sign") ||
    desc.includes("circumflex") ||
    desc.includes("percent") ||
    desc.includes("backslash") ||
    desc.includes("grave")
  ) {
    return "symbols";
  }

  // Default to symbols for remaining special characters
  if (charCode < 48 || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122) {
    return "symbols";
  }

  return "symbols";
};

const rawHtmlEntities: Omit<HtmlEntity, "category">[] = [
  { character: " ", entityName: "", entityNumber: "&#32;", description: "Space" },
  { character: "!", entityName: "", entityNumber: "&#33;", description: "Exclamation mark" },
  { character: '"', entityName: "", entityNumber: "&#34;", description: "Quotation mark" },
  { character: "#", entityName: "", entityNumber: "&#35;", description: "Number sign" },
  { character: "$", entityName: "", entityNumber: "&#36;", description: "Dollar sign" },
  { character: "%", entityName: "", entityNumber: "&#37;", description: "Percent sign" },
  { character: "&", entityName: "&amp;", entityNumber: "&#38;", description: "Ampersand" },
  { character: "'", entityName: "", entityNumber: "&#39;", description: "Apostrophe" },
  { character: "(", entityName: "", entityNumber: "&#40;", description: "Opening/Left Parenthesis" },
  { character: ")", entityName: "", entityNumber: "&#41;", description: "Closing/Right Parenthesis" },
  { character: "*", entityName: "", entityNumber: "&#42;", description: "Asterisk" },
  { character: "+", entityName: "", entityNumber: "&#43;", description: "Plus sign" },
  { character: ",", entityName: "", entityNumber: "&#44;", description: "Comma" },
  { character: "-", entityName: "", entityNumber: "&#45;", description: "Hyphen" },
  { character: ".", entityName: "", entityNumber: "&#46;", description: "Period" },
  { character: "/", entityName: "", entityNumber: "&#47;", description: "Slash" },
  { character: "0", entityName: "", entityNumber: "&#48;", description: "Digit 0" },
  { character: "1", entityName: "", entityNumber: "&#49;", description: "Digit 1" },
  { character: "2", entityName: "", entityNumber: "&#50;", description: "Digit 2" },
  { character: "3", entityName: "", entityNumber: "&#51;", description: "Digit 3" },
  { character: "4", entityName: "", entityNumber: "&#52;", description: "Digit 4" },
  { character: "5", entityName: "", entityNumber: "&#53;", description: "Digit 5" },
  { character: "6", entityName: "", entityNumber: "&#54;", description: "Digit 6" },
  { character: "7", entityName: "", entityNumber: "&#55;", description: "Digit 7" },
  { character: "8", entityName: "", entityNumber: "&#56;", description: "Digit 8" },
  { character: "9", entityName: "", entityNumber: "&#57;", description: "Digit 9" },
  { character: ":", entityName: "", entityNumber: "&#58;", description: "Colon" },
  { character: ";", entityName: "", entityNumber: "&#59;", description: "Semicolon" },
  { character: "<", entityName: "&lt;", entityNumber: "&#60;", description: "Less-than" },
  { character: "=", entityName: "", entityNumber: "&#61;", description: "Equals sign" },
  { character: ">", entityName: "&gt;", entityNumber: "&#62;", description: "Greater than" },
  { character: "?", entityName: "", entityNumber: "&#63;", description: "Question mark" },
  { character: "@", entityName: "", entityNumber: "&#64;", description: "At sign" },
  { character: "A", entityName: "", entityNumber: "&#65;", description: "Uppercase A" },
  { character: "B", entityName: "", entityNumber: "&#66;", description: "Uppercase B" },
  { character: "C", entityName: "", entityNumber: "&#67;", description: "Uppercase C" },
  { character: "D", entityName: "", entityNumber: "&#68;", description: "Uppercase D" },
  { character: "E", entityName: "", entityNumber: "&#69;", description: "Uppercase E" },
  { character: "F", entityName: "", entityNumber: "&#70;", description: "Uppercase F" },
  { character: "G", entityName: "", entityNumber: "&#71;", description: "Uppercase G" },
  { character: "H", entityName: "", entityNumber: "&#72;", description: "Uppercase H" },
  { character: "I", entityName: "", entityNumber: "&#73;", description: "Uppercase I" },
  { character: "J", entityName: "", entityNumber: "&#74;", description: "Uppercase J" },
  { character: "K", entityName: "", entityNumber: "&#75;", description: "Uppercase K" },
  { character: "L", entityName: "", entityNumber: "&#76;", description: "Uppercase L" },
  { character: "M", entityName: "", entityNumber: "&#77;", description: "Uppercase M" },
  { character: "N", entityName: "", entityNumber: "&#78;", description: "Uppercase N" },
  { character: "O", entityName: "", entityNumber: "&#79;", description: "Uppercase O" },
  { character: "P", entityName: "", entityNumber: "&#80;", description: "Uppercase P" },
  { character: "Q", entityName: "", entityNumber: "&#81;", description: "Uppercase Q" },
  { character: "R", entityName: "", entityNumber: "&#82;", description: "Uppercase R" },
  { character: "S", entityName: "", entityNumber: "&#83;", description: "Uppercase S" },
  { character: "T", entityName: "", entityNumber: "&#84;", description: "Uppercase T" },
  { character: "U", entityName: "", entityNumber: "&#85;", description: "Uppercase U" },
  { character: "V", entityName: "", entityNumber: "&#86;", description: "Uppercase V" },
  { character: "W", entityName: "", entityNumber: "&#87;", description: "Uppercase W" },
  { character: "X", entityName: "", entityNumber: "&#88;", description: "Uppercase X" },
  { character: "Y", entityName: "", entityNumber: "&#89;", description: "Uppercase Y" },
  { character: "Z", entityName: "", entityNumber: "&#90;", description: "Uppercase Z" },
  { character: "[", entityName: "", entityNumber: "&#91;", description: "Opening/Left square bracket" },
  { character: "\\", entityName: "", entityNumber: "&#92;", description: "Backslash" },
  { character: "]", entityName: "", entityNumber: "&#93;", description: "Closing/Right square bracket" },
  { character: "^", entityName: "", entityNumber: "&#94;", description: "Caret" },
  { character: "_", entityName: "", entityNumber: "&#95;", description: "Underscore" },
  { character: "`", entityName: "", entityNumber: "&#96;", description: "Grave accent" },
  { character: "a", entityName: "", entityNumber: "&#97;", description: "Lowercase a" },
  { character: "b", entityName: "", entityNumber: "&#98;", description: "Lowercase b" },
  { character: "c", entityName: "", entityNumber: "&#99;", description: "Lowercase c" },
  { character: "d", entityName: "", entityNumber: "&#100;", description: "Lowercase d" },
  { character: "e", entityName: "", entityNumber: "&#101;", description: "Lowercase e" },
  { character: "f", entityName: "", entityNumber: "&#102;", description: "Lowercase f" },
  { character: "g", entityName: "", entityNumber: "&#103;", description: "Lowercase g" },
  { character: "h", entityName: "", entityNumber: "&#104;", description: "Lowercase h" },
  { character: "i", entityName: "", entityNumber: "&#105;", description: "Lowercase i" },
  { character: "j", entityName: "", entityNumber: "&#106;", description: "Lowercase j" },
  { character: "k", entityName: "", entityNumber: "&#107;", description: "Lowercase k" },
  { character: "l", entityName: "", entityNumber: "&#108;", description: "Lowercase l" },
  { character: "m", entityName: "", entityNumber: "&#109;", description: "Lowercase m" },
  { character: "n", entityName: "", entityNumber: "&#110;", description: "Lowercase n" },
  { character: "o", entityName: "", entityNumber: "&#111;", description: "Lowercase o" },
  { character: "p", entityName: "", entityNumber: "&#112;", description: "Lowercase p" },
  { character: "q", entityName: "", entityNumber: "&#113;", description: "Lowercase q" },
  { character: "r", entityName: "", entityNumber: "&#114;", description: "Lowercase r" },
  { character: "s", entityName: "", entityNumber: "&#115;", description: "Lowercase s" },
  { character: "t", entityName: "", entityNumber: "&#116;", description: "Lowercase t" },
  { character: "u", entityName: "", entityNumber: "&#117;", description: "Lowercase u" },
  { character: "v", entityName: "", entityNumber: "&#118;", description: "Lowercase v" },
  { character: "w", entityName: "", entityNumber: "&#119;", description: "Lowercase w" },
  { character: "x", entityName: "", entityNumber: "&#120;", description: "Lowercase x" },
  { character: "y", entityName: "", entityNumber: "&#121;", description: "Lowercase y" },
  { character: "z", entityName: "", entityNumber: "&#122;", description: "Lowercase z" },
  { character: "{", entityName: "", entityNumber: "&#123;", description: "Opening/Left curly brace" },
  { character: "|", entityName: "", entityNumber: "&#124;", description: "Vertical bar" },
  { character: "}", entityName: "", entityNumber: "&#125;", description: "Closing/Right curly brace" },
  { character: "~", entityName: "", entityNumber: "&#126;", description: "Tilde" },
  { character: "À", entityName: "&Agrave;", entityNumber: "&#192;", description: "Capital a with grave accent" },
  { character: "Á", entityName: "&Aacute;", entityNumber: "&#193;", description: "Capital a with acute accent" },
  { character: "Â", entityName: "&Acirc;", entityNumber: "&#194;", description: "Capital a with circumflex accent" },
  { character: "Ã", entityName: "&Atilde;", entityNumber: "&#195;", description: "Capital a with tilde" },
  { character: "Ä", entityName: "&Auml;", entityNumber: "&#196;", description: "Capital a with umlaut" },
  { character: "Å", entityName: "&Aring;", entityNumber: "&#197;", description: "Capital a with ring" },
  { character: "Æ", entityName: "&AElig;", entityNumber: "&#198;", description: "Capital ae" },
  { character: "Ç", entityName: "&Ccedil;", entityNumber: "&#199;", description: "Capital c with cedilla" },
  { character: "È", entityName: "&Egrave;", entityNumber: "&#200;", description: "Capital e with grave accent" },
  { character: "É", entityName: "&Eacute;", entityNumber: "&#201;", description: "Capital e with acute accent" },
  { character: "Ê", entityName: "&Ecirc;", entityNumber: "&#202;", description: "Capital e with circumflex accent" },
  { character: "Ë", entityName: "&Euml;", entityNumber: "&#203;", description: "Capital e with umlaut" },
  { character: "Ì", entityName: "&Igrave;", entityNumber: "&#204;", description: "Capital i with grave accent" },
  { character: "Í", entityName: "&Iacute;", entityNumber: "&#205;", description: "Capital i with accute accent" },
  { character: "Î", entityName: "&Icirc;", entityNumber: "&#206;", description: "Capital i with circumflex accent" },
  { character: "Ï", entityName: "&Iuml;", entityNumber: "&#207;", description: "Capital i with umlaut" },
  { character: "Ð", entityName: "&ETH;", entityNumber: "&#208;", description: "Capital eth (Icelandic)" },
  { character: "Ñ", entityName: "&Ntilde;", entityNumber: "&#209;", description: "Capital n with tilde" },
  { character: "Ò", entityName: "&Ograve;", entityNumber: "&#210;", description: "Capital o with grave accent" },
  { character: "Ó", entityName: "&Oacute;", entityNumber: "&#211;", description: "Capital o with accute accent" },
  { character: "Ô", entityName: "&Ocirc;", entityNumber: "&#212;", description: "Capital o with circumflex accent" },
  { character: "Õ", entityName: "&Otilde;", entityNumber: "&#213;", description: "Capital o with tilde" },
  { character: "Ö", entityName: "&Ouml;", entityNumber: "&#214;", description: "Capital o with umlaut" },
  { character: "Ø", entityName: "&Oslash;", entityNumber: "&#216;", description: "Capital o with slash" },
  { character: "Ù", entityName: "&Ugrave;", entityNumber: "&#217;", description: "Capital u with grave accent" },
  { character: "Ú", entityName: "&Uacute;", entityNumber: "&#218;", description: "Capital u with acute accent" },
  { character: "Û", entityName: "&Ucirc;", entityNumber: "&#219;", description: "Capital u with circumflex accent" },
  { character: "Ü", entityName: "&Uuml;", entityNumber: "&#220;", description: "Capital u with umlaut" },
  { character: "Ý", entityName: "&Yacute;", entityNumber: "&#221;", description: "Capital y with acute accent" },
  { character: "Þ", entityName: "&THORN;", entityNumber: "&#222;", description: "Capital thorn (Icelandic)" },
  { character: "ß", entityName: "&szlig;", entityNumber: "&#223;", description: "Lowercase sharp s (German)" },
  { character: "à", entityName: "&agrave;", entityNumber: "&#224;", description: "Lowercase a with grave accent" },
  { character: "á", entityName: "&aacute;", entityNumber: "&#225;", description: "Lowercase a with acute accent" },
  { character: "â", entityName: "&acirc;", entityNumber: "&#226;", description: "Lowercase a with circumflex accent" },
  { character: "ã", entityName: "&atilde;", entityNumber: "&#227;", description: "Lowercase a with tilde" },
  { character: "ä", entityName: "&auml;", entityNumber: "&#228;", description: "Lowercase a with umlaut" },
  { character: "å", entityName: "&aring;", entityNumber: "&#229;", description: "Lowercase a with ring" },
  { character: "æ", entityName: "&aelig;", entityNumber: "&#230;", description: "Lowercase ae" },
  { character: "ç", entityName: "&ccedil;", entityNumber: "&#231;", description: "Lowercase c with cedilla" },
  { character: "è", entityName: "&egrave;", entityNumber: "&#232;", description: "Lowercase e with grave accent" },
  { character: "é", entityName: "&eacute;", entityNumber: "&#233;", description: "Lowercase e with acute accent" },
  { character: "ê", entityName: "&ecirc;", entityNumber: "&#234;", description: "Lowercase e with circumflex accent" },
  { character: "ë", entityName: "&euml;", entityNumber: "&#235;", description: "Lowercase e with umlaut" },
  { character: "ì", entityName: "&igrave;", entityNumber: "&#236;", description: "Lowercase i with grave accent" },
  { character: "í", entityName: "&iacute;", entityNumber: "&#237;", description: "Lowercase i with acute accent" },
  { character: "î", entityName: "&icirc;", entityNumber: "&#238;", description: "Lowercase i with circumflex accent" },
  { character: "ï", entityName: "&iuml;", entityNumber: "&#239;", description: "Lowercase i with umlaut" },
  { character: "ð", entityName: "&eth;", entityNumber: "&#240;", description: "Lowercase eth (Icelandic)" },
  { character: "ñ", entityName: "&ntilde;", entityNumber: "&#241;", description: "Lowercase n with tilde" },
  { character: "ò", entityName: "&ograve;", entityNumber: "&#242;", description: "Lowercase o with grave accent" },
  { character: "ó", entityName: "&oacute;", entityNumber: "&#243;", description: "Lowercase o with acute accent" },
  { character: "ô", entityName: "&ocirc;", entityNumber: "&#244;", description: "Lowercase o with circumflex accent" },
  { character: "õ", entityName: "&otilde;", entityNumber: "&#245;", description: "Lowercase o with tilde" },
  { character: "ö", entityName: "&ouml;", entityNumber: "&#246;", description: "Lowercase o with umlaut" },
  { character: "ø", entityName: "&oslash;", entityNumber: "&#248;", description: "Lowercase o with slash" },
  { character: "ù", entityName: "&ugrave;", entityNumber: "&#249;", description: "Lowercase u with grave accent" },
  { character: "ú", entityName: "&uacute;", entityNumber: "&#250;", description: "Lowercase u with acute accent" },
  { character: "û", entityName: "&ucirc;", entityNumber: "&#251;", description: "Lowercase u with circumflex accent" },
  { character: "ü", entityName: "&uuml;", entityNumber: "&#252;", description: "Lowercase u with umlaut" },
  { character: "ý", entityName: "&yacute;", entityNumber: "&#253;", description: "Lowercase y with acute accent" },
  { character: "þ", entityName: "&thorn;", entityNumber: "&#254;", description: "Lowercase thorn (Icelandic)" },
  { character: "ÿ", entityName: "&yuml;", entityNumber: "&#255;", description: "Lowercase y with umlaut" },
  { character: "", entityName: "&nbsp;", entityNumber: "&#160;", description: "Non-breaking space" },
  { character: "¡", entityName: "&iexcl;", entityNumber: "&#161;", description: "Inverted exclamation mark" },
  { character: "¢", entityName: "&cent;", entityNumber: "&#162;", description: "Cent" },
  { character: "£", entityName: "&pound;", entityNumber: "&#163;", description: "Pound" },
  { character: "¤", entityName: "&curren;", entityNumber: "&#164;", description: "Currency" },
  { character: "¥", entityName: "&yen;", entityNumber: "&#165;", description: "Yen" },
  { character: "¦", entityName: "&brvbar;", entityNumber: "&#166;", description: "Broken vertical bar" },
  { character: "§", entityName: "&sect;", entityNumber: "&#167;", description: "Section" },
  { character: "¨", entityName: "&uml;", entityNumber: "&#168;", description: "Spacing diaeresis" },
  { character: "©", entityName: "&copy;", entityNumber: "&#169;", description: "Copyright" },
  { character: "ª", entityName: "&ordf;", entityNumber: "&#170;", description: "Feminine ordinal indicator" },
  { character: "«", entityName: "&laquo;", entityNumber: "&#171;", description: "Opening/Left angle quotation mark" },
  { character: "¬", entityName: "&not;", entityNumber: "&#172;", description: "Negation" },
  { character: "\u00ad", entityName: "&shy;", entityNumber: "&#173;", description: "Soft hyphen" },
  { character: "®", entityName: "&reg;", entityNumber: "&#174;", description: "Registered trademark" },
  { character: "¯", entityName: "&macr;", entityNumber: "&#175;", description: "Spacing macron" },
  { character: "°", entityName: "&deg;", entityNumber: "&#176;", description: "Degree" },
  { character: "±", entityName: "&plusmn;", entityNumber: "&#177;", description: "Plus or minus" },
  { character: "²", entityName: "&sup2;", entityNumber: "&#178;", description: "Superscript 2" },
  { character: "³", entityName: "&sup3;", entityNumber: "&#179;", description: "Superscript 3" },
  { character: "´", entityName: "&acute;", entityNumber: "&#180;", description: "Spacing acute" },
  { character: "µ", entityName: "&micro;", entityNumber: "&#181;", description: "Micro" },
  { character: "¶", entityName: "&para;", entityNumber: "&#182;", description: "Paragraph" },
  { character: "¸", entityName: "&cedil;", entityNumber: "&#184;", description: "Spacing cedilla" },
  { character: "¹", entityName: "&sup1;", entityNumber: "&#185;", description: "Superscript 1" },
  { character: "º", entityName: "&ordm;", entityNumber: "&#186;", description: "Masculine ordinal indicator" },
  { character: "»", entityName: "&raquo;", entityNumber: "&#187;", description: "Closing/Right angle quotation mark" },
  { character: "¼", entityName: "&frac14;", entityNumber: "&#188;", description: "Fraction 1/4" },
  { character: "½", entityName: "&frac12;", entityNumber: "&#189;", description: "Fraction 1/2" },
  { character: "¾", entityName: "&frac34;", entityNumber: "&#190;", description: "Fraction 3/4" },
  { character: "¿", entityName: "&iquest;", entityNumber: "&#191;", description: "Inverted question mark" },
  { character: "×", entityName: "&times;", entityNumber: "&#215;", description: "Multiplication" },
  { character: "÷", entityName: "&divide;", entityNumber: "&#247;", description: "Divide" },
  { character: "∀", entityName: "&forall;", entityNumber: "&#8704;", description: "For all" },
  { character: "∂", entityName: "&part;", entityNumber: "&#8706;", description: "Part" },
  { character: "∃", entityName: "&exist;", entityNumber: "&#8707;", description: "Exist" },
  { character: "∅", entityName: "&empty;", entityNumber: "&#8709;", description: "Empty" },
  { character: "∇", entityName: "&nabla;", entityNumber: "&#8711;", description: "Nabla" },
  { character: "∈", entityName: "&isin;", entityNumber: "&#8712;", description: "Is in" },
  { character: "∉", entityName: "&notin;", entityNumber: "&#8713;", description: "Not in" },
  { character: "∋", entityName: "&ni;", entityNumber: "&#8715;", description: "Ni" },
  { character: "∏", entityName: "&prod;", entityNumber: "&#8719;", description: "Product" },
  { character: "∑", entityName: "&sum;", entityNumber: "&#8721;", description: "Sum" },
  { character: "−", entityName: "&minus;", entityNumber: "&#8722;", description: "Minus" },
  { character: "∗", entityName: "&lowast;", entityNumber: "&#8727;", description: "Asterisk (Lowast)" },
  { character: "√", entityName: "&radic;", entityNumber: "&#8730;", description: "Square root" },
  { character: "∝", entityName: "&prop;", entityNumber: "&#8733;", description: "Proportional to" },
  { character: "∞", entityName: "&infin;", entityNumber: "&#8734;", description: "Infinity" },
  { character: "∠", entityName: "&ang;", entityNumber: "&#8736;", description: "Angle" },
  { character: "∧", entityName: "&and;", entityNumber: "&#8743;", description: "And" },
  { character: "∨", entityName: "&or;", entityNumber: "&#8744;", description: "Or" },
  { character: "∩", entityName: "&cap;", entityNumber: "&#8745;", description: "Cap" },
  { character: "∪", entityName: "&cup;", entityNumber: "&#8746;", description: "Cup" },
  { character: "∫", entityName: "&int;", entityNumber: "&#8747;", description: "Integral" },
  { character: "∴", entityName: "&there4;", entityNumber: "&#8756;", description: "Therefore" },
  { character: "∼", entityName: "&sim;", entityNumber: "&#8764;", description: "Similar to" },
  { character: "≅", entityName: "&cong;", entityNumber: "&#8773;", description: "Congurent to" },
  { character: "≈", entityName: "&asymp;", entityNumber: "&#8776;", description: "Almost equal" },
  { character: "≠", entityName: "&ne;", entityNumber: "&#8800;", description: "Not equal" },
  { character: "≡", entityName: "&equiv;", entityNumber: "&#8801;", description: "Equivalent" },
  { character: "≤", entityName: "&le;", entityNumber: "&#8804;", description: "Less or equal" },
  { character: "≥", entityName: "&ge;", entityNumber: "&#8805;", description: "Greater or equal" },
  { character: "⊂", entityName: "&sub;", entityNumber: "&#8834;", description: "Subset of" },
  { character: "⊃", entityName: "&sup;", entityNumber: "&#8835;", description: "Superset of" },
  { character: "⊄", entityName: "&nsub;", entityNumber: "&#8836;", description: "Not subset of" },
  { character: "⊆", entityName: "&sube;", entityNumber: "&#8838;", description: "Subset or equal" },
  { character: "⊇", entityName: "&supe;", entityNumber: "&#8839;", description: "Superset or equal" },
  { character: "⊕", entityName: "&oplus;", entityNumber: "&#8853;", description: "Circled plus" },
  { character: "⊗", entityName: "&otimes;", entityNumber: "&#8855;", description: "Circled times" },
  { character: "⊥", entityName: "&perp;", entityNumber: "&#8869;", description: "Perpendicular" },
  { character: "⋅", entityName: "&sdot;", entityNumber: "&#8901;", description: "Dot operator" },
  { character: "Α", entityName: "&Alpha;", entityNumber: "&#913;", description: "Alpha" },
  { character: "Β", entityName: "&Beta;", entityNumber: "&#914;", description: "Beta" },
  { character: "Γ", entityName: "&Gamma;", entityNumber: "&#915;", description: "Gamma" },
  { character: "Δ", entityName: "&Delta;", entityNumber: "&#916;", description: "Delta" },
  { character: "Ε", entityName: "&Epsilon;", entityNumber: "&#917;", description: "Epsilon" },
  { character: "Ζ", entityName: "&Zeta;", entityNumber: "&#918;", description: "Zeta" },
  { character: "Η", entityName: "&Eta;", entityNumber: "&#919;", description: "Eta" },
  { character: "Θ", entityName: "&Theta;", entityNumber: "&#920;", description: "Theta" },
  { character: "Ι", entityName: "&Iota;", entityNumber: "&#921;", description: "Iota" },
  { character: "Κ", entityName: "&Kappa;", entityNumber: "&#922;", description: "Kappa" },
  { character: "Λ", entityName: "&Lambda;", entityNumber: "&#923;", description: "Lambda" },
  { character: "Μ", entityName: "&Mu;", entityNumber: "&#924;", description: "Mu" },
  { character: "Ν", entityName: "&Nu;", entityNumber: "&#925;", description: "Nu" },
  { character: "Ξ", entityName: "&Xi;", entityNumber: "&#926;", description: "Xi" },
  { character: "Ο", entityName: "&Omicron;", entityNumber: "&#927;", description: "Omicron" },
  { character: "Π", entityName: "&Pi;", entityNumber: "&#928;", description: "Pi" },
  { character: "Ρ", entityName: "&Rho;", entityNumber: "&#929;", description: "Rho" },
  { character: "Σ", entityName: "&Sigma;", entityNumber: "&#931;", description: "Sigma" },
  { character: "Τ", entityName: "&Tau;", entityNumber: "&#932;", description: "Tau" },
  { character: "Υ", entityName: "&Upsilon;", entityNumber: "&#933;", description: "Upsilon" },
  { character: "Φ", entityName: "&Phi;", entityNumber: "&#934;", description: "Phi" },
  { character: "Χ", entityName: "&Chi;", entityNumber: "&#935;", description: "Chi" },
  { character: "Ψ", entityName: "&Psi;", entityNumber: "&#936;", description: "Psi" },
  { character: "Ω", entityName: "&Omega;", entityNumber: "&#937;", description: "Omega" },
  { character: "α", entityName: "&alpha;", entityNumber: "&#945;", description: "alpha" },
  { character: "β", entityName: "&beta;", entityNumber: "&#946;", description: "beta" },
  { character: "γ", entityName: "&gamma;", entityNumber: "&#947;", description: "gamma" },
  { character: "δ", entityName: "&delta;", entityNumber: "&#948;", description: "delta" },
  { character: "ε", entityName: "&epsilon;", entityNumber: "&#949;", description: "epsilon" },
  { character: "ζ", entityName: "&zeta;", entityNumber: "&#950;", description: "zeta" },
  { character: "η", entityName: "&eta;", entityNumber: "&#951;", description: "eta" },
  { character: "θ", entityName: "&theta;", entityNumber: "&#952;", description: "theta" },
  { character: "ι", entityName: "&iota;", entityNumber: "&#953;", description: "iota" },
  { character: "κ", entityName: "&kappa;", entityNumber: "&#954;", description: "kappa" },
  { character: "λ", entityName: "&lambda;", entityNumber: "&#955;", description: "lambda" },
  { character: "μ", entityName: "&mu;", entityNumber: "&#956;", description: "mu" },
  { character: "ν", entityName: "&nu;", entityNumber: "&#957;", description: "nu" },
  { character: "ξ", entityName: "&xi;", entityNumber: "&#958;", description: "xi" },
  { character: "ο", entityName: "&omicron;", entityNumber: "&#959;", description: "omicron" },
  { character: "π", entityName: "&pi;", entityNumber: "&#960;", description: "pi" },
  { character: "ρ", entityName: "&rho;", entityNumber: "&#961;", description: "rho" },
  { character: "ς", entityName: "&sigmaf;", entityNumber: "&#962;", description: "sigmaf" },
  { character: "σ", entityName: "&sigma;", entityNumber: "&#963;", description: "sigma" },
  { character: "τ", entityName: "&tau;", entityNumber: "&#964;", description: "tau" },
  { character: "υ", entityName: "&upsilon;", entityNumber: "&#965;", description: "upsilon" },
  { character: "φ", entityName: "&phi;", entityNumber: "&#966;", description: "phi" },
  { character: "χ", entityName: "&chi;", entityNumber: "&#967;", description: "chi" },
  { character: "ψ", entityName: "&psi;", entityNumber: "&#968;", description: "psi" },
  { character: "ω", entityName: "&omega;", entityNumber: "&#969;", description: "omega" },
  { character: "ϑ", entityName: "&thetasym;", entityNumber: "&#977;", description: "Theta symbol" },
  { character: "ϒ", entityName: "&upsih;", entityNumber: "&#978;", description: "Upsilon symbol" },
  { character: "ϖ", entityName: "&piv;", entityNumber: "&#982;", description: "Pi symbol" },
  { character: "Œ", entityName: "&OElig;", entityNumber: "&#338;", description: "Uppercase ligature OE" },
  { character: "œ", entityName: "&oelig;", entityNumber: "&#339;", description: "Lowercase ligature OE" },
  { character: "Š", entityName: "&Scaron;", entityNumber: "&#352;", description: "Uppercase S with caron" },
  { character: "š", entityName: "&scaron;", entityNumber: "&#353;", description: "Lowercase S with caron" },
  { character: "Ÿ", entityName: "&Yuml;", entityNumber: "&#376;", description: "Capital Y with diaeres" },
  { character: "ƒ", entityName: "&fnof;", entityNumber: "&#402;", description: "Lowercase with hook" },
  { character: "ˆ", entityName: "&circ;", entityNumber: "&#710;", description: "Circumflex accent" },
  { character: "˜", entityName: "&tilde;", entityNumber: "&#732;", description: "Tilde" },
  { character: "", entityName: "&ensp;", entityNumber: "&#8194;", description: "En space" },
  { character: "", entityName: "&emsp;", entityNumber: "&#8195;", description: "Em space" },
  { character: "", entityName: "&thinsp;", entityNumber: "&#8201;", description: "Thin space" },
  { character: "\u200c", entityName: "&zwnj;", entityNumber: "&#8204;", description: "Zero width non-joiner" },
  { character: "\u200d", entityName: "&zwj;", entityNumber: "&#8205;", description: "Zero width joiner" },
  { character: "\u200e", entityName: "&lrm;", entityNumber: "&#8206;", description: "Left-to-right mark" },
  { character: "\u200f", entityName: "&rlm;", entityNumber: "&#8207;", description: "Right-to-left mark" },
  { character: "–", entityName: "&ndash;", entityNumber: "&#8211;", description: "En dash" },
  { character: "—", entityName: "&mdash;", entityNumber: "&#8212;", description: "Em dash" },
  { character: "\u2018", entityName: "&lsquo;", entityNumber: "&#8216;", description: "Left single quotation mark" },
  { character: "\u2019", entityName: "&rsquo;", entityNumber: "&#8217;", description: "Right single quotation mark" },
  { character: "\u201A", entityName: "&sbquo;", entityNumber: "&#8218;", description: "Single low-9 quotation mark" },
  { character: "\u201C", entityName: "&ldquo;", entityNumber: "&#8220;", description: "Left double quotation mark" },
  { character: "\u201D", entityName: "&rdquo;", entityNumber: "&#8221;", description: "Right double quotation mark" },
  { character: "\u201E", entityName: "&bdquo;", entityNumber: "&#8222;", description: "Double low-9 quotation mark" },
  { character: "†", entityName: "&dagger;", entityNumber: "&#8224;", description: "Dagger" },
  { character: "‡", entityName: "&Dagger;", entityNumber: "&#8225;", description: "Double dagger" },
  { character: "•", entityName: "&bull;", entityNumber: "&#8226;", description: "Bullet" },
  { character: "…", entityName: "&hellip;", entityNumber: "&#8230;", description: "Horizontal ellipsis" },
  { character: "‰", entityName: "&permil;", entityNumber: "&#8240;", description: "Per mille" },
  { character: "′", entityName: "&prime;", entityNumber: "&#8242;", description: "Minutes (Degrees)" },
  { character: "″", entityName: "&Prime;", entityNumber: "&#8243;", description: "Seconds (Degrees)" },
  { character: "‹", entityName: "&lsaquo;", entityNumber: "&#8249;", description: "Single left angle quotation" },
  { character: "›", entityName: "&rsaquo;", entityNumber: "&#8250;", description: "Single right angle quotation" },
  { character: "‾", entityName: "&oline;", entityNumber: "&#8254;", description: "Overline" },
  { character: "€", entityName: "&euro;", entityNumber: "&#8364;", description: "Euro" },
  { character: "™", entityName: "&trade;", entityNumber: "&#8482;", description: "Trademark" },
  { character: "←", entityName: "&larr;", entityNumber: "&#8592;", description: "Left arrow" },
  { character: "↑", entityName: "&uarr;", entityNumber: "&#8593;", description: "Up arrow" },
  { character: "→", entityName: "&rarr;", entityNumber: "&#8594;", description: "Right arrow" },
  { character: "↓", entityName: "&darr;", entityNumber: "&#8595;", description: "Down arrow" },
  { character: "↔", entityName: "&harr;", entityNumber: "&#8596;", description: "Left right arrow" },
  { character: "↵", entityName: "&crarr;", entityNumber: "&#8629;", description: "Carriage return arrow" },
  { character: "⌈", entityName: "&lceil;", entityNumber: "&#8968;", description: "Left ceiling" },
  { character: "⌉", entityName: "&rceil;", entityNumber: "&#8969;", description: "Right ceiling" },
  { character: "⌊", entityName: "&lfloor;", entityNumber: "&#8970;", description: "Left floor" },
  { character: "⌋", entityName: "&rfloor;", entityNumber: "&#8971;", description: "Right floor" },
  { character: "◊", entityName: "&loz;", entityNumber: "&#9674;", description: "Lozenge" },
  { character: "♠", entityName: "&spades;", entityNumber: "&#9824;", description: "Spade" },
  { character: "♣", entityName: "&clubs;", entityNumber: "&#9827;", description: "Club" },
  { character: "♥", entityName: "&hearts;", entityNumber: "&#9829;", description: "Heart" },
  { character: "♦", entityName: "&diams;", entityNumber: "&#9830;", description: "Diamond" },
];

// Build entities with categories
export const HTML_ENTITIES: HtmlEntity[] = rawHtmlEntities.map((entity) => ({
  ...entity,
  category: determineCategory(entity),
}));

// Extract unique categories for the filter dropdown
export const CATEGORY_LABELS: Record<HtmlEntityCategory, string> = {
  all: "All categories",
  letters: "Letters (A-Z)",
  "letters-accented": "Accented letters",
  numbers: "Numbers",
  punctuation: "Punctuation",
  math: "Math symbols",
  greek: "Greek letters",
  currency: "Currency",
  arrows: "Arrows",
  symbols: "Symbols",
  whitespace: "Whitespace",
};

export const CATEGORY_OPTIONS: { value: HtmlEntityCategory; label: string }[] = [
  { value: "all", label: CATEGORY_LABELS.all },
  { value: "letters", label: CATEGORY_LABELS.letters },
  { value: "letters-accented", label: CATEGORY_LABELS["letters-accented"] },
  { value: "numbers", label: CATEGORY_LABELS.numbers },
  { value: "punctuation", label: CATEGORY_LABELS.punctuation },
  { value: "math", label: CATEGORY_LABELS.math },
  { value: "greek", label: CATEGORY_LABELS.greek },
  { value: "currency", label: CATEGORY_LABELS.currency },
  { value: "arrows", label: CATEGORY_LABELS.arrows },
  { value: "symbols", label: CATEGORY_LABELS.symbols },
  { value: "whitespace", label: CATEGORY_LABELS.whitespace },
];

export const FILTER_FIELD_OPTIONS: { value: HtmlEntityFilterField; label: string }[] = [
  { value: "all", label: "All entities" },
  { value: "named-only", label: "Named only" },
];

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200];
