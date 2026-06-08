// 球员合同选项数据 (来自Basketball Reference)
// 使用_nameToKey()格式的key进行匹配
// playerOption: 球员选项, teamOption: 球队选项

// 格式: key -> { type, year }
var _OPTION_LOOKUP = {};

function _optKey(name) {
  var s = name.toLowerCase();
  var m = {'à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e',
    'ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ð':'d','ñ':'n','ò':'o','ó':'o',
    'ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','þ':'th',
    'ÿ':'y','ā':'a','ă':'a','ą':'a','ć':'c','ĉ':'c','ċ':'c','č':'c','ď':'d','đ':'d',
    'ē':'e','ĕ':'e','ė':'e','ę':'e','ě':'e','ĝ':'g','ğ':'g','ġ':'g','ģ':'g','ĥ':'h',
    'ħ':'h','ĩ':'i','ī':'i','ĭ':'i','į':'i','ı':'i','ĳ':'ij','ĵ':'j','ķ':'k','ĺ':'l',
    'ļ':'l','ľ':'l','ŀ':'l','ł':'l','ń':'n','ņ':'n','ň':'n','ŉ':'n','ō':'o','ŏ':'o',
    'ő':'o','œ':'oe','ŕ':'r','ŗ':'r','ř':'r','ś':'s','ŝ':'s','ş':'s','š':'s','ţ':'t',
    'ť':'t','ŧ':'t','ũ':'u','ū':'u','ŭ':'u','ů':'u','ű':'u','ų':'u','ŵ':'w','ŷ':'y',
    'ź':'z','ż':'z','ž':'z'};
  var r = '';
  for (var i = 0; i < s.length; i++) r += m[s[i]] || s[i];
  return r.replace(/[^a-z0-9]/g, '').substring(0, 8);
}

var _OPTIONS_RAW = {
  "Joel Embiid": ["player","2028-29"],
  "Nikola Jokić": ["player","2027-28"],
  "Kevin Durant": ["player","2027-28"],
  "Jayson Tatum": ["player","2029-30"],
  "Anthony Davis": ["player","2027-28"],
  "Giannis Antetokounmpo": ["player","2027-28"],
  "Devin Booker": ["player","2029-30"],
  "Karl-Anthony Towns": ["player","2027-28"],
  "LeBron James": ["player","2025-26"],
  "Paul George": ["player","2027-28"],
  "Zach LaVine": ["player","2026-27"],
  "Donovan Mitchell": ["player","2027-28"],
  "Trae Young": ["player","2026-27"],
  "Luka Dončić": ["player","2028-29"],
  "OG Anunoby": ["player","2028-29"],
  "James Harden": ["player","2026-27"],
  "Shai Gilgeous-Alexander": ["player","2030-31"],
  "Brandon Ingram": ["player","2027-28"],
  "Bam Adebayo": ["player","2028-29"],
  "Kyrie Irving": ["player","2027-28"],
  "Jaren Jackson Jr.": ["player","2029-30"],
  "Rudy Gobert": ["player","2027-28"],
  "Jalen Brunson": ["player","2028-29"],
  "Alperen Şengün": ["player","2029-30"],
  "Jalen Green": ["player","2027-28"],
  "Khris Middleton": ["player","2025-26"],
  "Jrue Holiday": ["player","2027-28"],
  "Jerami Grant": ["player","2027-28"],
  "Julius Randle": ["player","2027-28"],
  "Dejounte Murray": ["player","2027-28"],
  "Andrew Wiggins": ["player","2026-27"],
  "Derrick White": ["player","2028-29"],
  "John Collins": ["player","2025-26"],
  "Draymond Green": ["player","2026-27"],
  "Deandre Ayton": ["player","2026-27"],
  "Myles Turner": ["player","2028-29"],
  "Fred VanVleet": ["player","2026-27"],
  "Mikal Bridges": ["player","2029-30"],
  "Aaron Gordon": ["player","2025-26"],
  "Damian Lillard": ["player","2027-28"],
  "Kentavious Caldwell-Pope": ["player","2026-27"],
  "Naz Reid": ["player","2029-30"],
  "Jakob Poeltl": ["player","2026-27"],
  "Bradley Beal": ["player","2026-27"],
  "Malik Monk": ["player","2027-28"],
  "Patrick Williams": ["player","2028-29"],
  "Grayson Allen": ["player","2027-28"],
  "Paolo Banchero": ["player","2030-31"],
  "Nickeil Alexander-Walker": ["player","2028-29"],
  "Marcus Smart": ["player","2026-27"],
  "Herbert Jones": ["player","2029-30"],
  "Austin Reaves": ["player","2026-27"],
  "Bobby Portis": ["player","2027-28"],
  "Dorian Finney-Smith": ["player","2028-29"],
  "Jarred Vanderbilt": ["player","2027-28"],
  "Matisse Thybulle": ["player","2025-26"],
  "Caleb Martin": ["player","2027-28"],
  "Pat Connaughton": ["player","2025-26"],
  "Buddy Hield": ["player","2027-28"],
  "Ty Jerome": ["player","2027-28"],
  "Kelly Oubre Jr.": ["player","2025-26"],
  "Zeke Nnaji": ["player","2027-28"],
  "Max Christie": ["player","2027-28"],
  "Jevon Carter": ["player","2025-26"],
  "D'Angelo Russell": ["player","2026-27"],
  "Al Horford": ["player","2026-27"],
  "Dario Šarić": ["player","2025-26"],
  "Kevin Porter Jr.": ["player","2026-27"],
  "Andre Drummond": ["player","2025-26"],
  "Jose Alvarado": ["player","2026-27"],
  "Ryan Rollins": ["player","2027-28"],
  "Dwight Powell": ["player","2025-26"],
  "Gary Trent Jr.": ["player","2026-27"],
  "Gary Harris": ["player","2026-27"],
  "Taurean Prince": ["player","2026-27"],
  "De'Anthony Melton": ["player","2026-27"],
  "Sandro Mamukelashvili": ["player","2026-27"],
  "Jericho Sims": ["player","2026-27"],
  "Gui Santos": ["player","2028-29"]
};

// Build lookup by name key
(function() {
  for (var name in _OPTIONS_RAW) {
    var key = _optKey(name);
    _OPTION_LOOKUP[key] = _OPTIONS_RAW[name];
  }
  // Aaron Gordon also has 2028-29 option
  // (single entry with second year)
})();

// Helper: get option for a player by their id (e.g. "lal-lebronja-0" -> key "lebronja")
function getPlayerOptionById(playerId) {
  if (!playerId) return null;
  var parts = playerId.split('-');
  if (parts.length < 2) return null;
  var nameKey = parts[1];
  var opt = _OPTION_LOOKUP[nameKey];
  return opt || null;
}
