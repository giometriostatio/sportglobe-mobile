// Team → [lat, lng] direct coordinate mappings
// Synced from sportglobe-v2 public/index.html

export const TEAM_CITY: Record<string, [number, number]> = {
  // NBA
  'Atlanta Hawks': [33.757, -84.396], 'Boston Celtics': [42.366, -71.062], 'Brooklyn Nets': [40.683, -73.975],
  'Charlotte Hornets': [35.225, -80.839], 'Chicago Bulls': [41.881, -87.674], 'Cleveland Cavaliers': [41.496, -81.688],
  'Dallas Mavericks': [32.790, -96.810], 'Denver Nuggets': [39.749, -104.999], 'Detroit Pistons': [42.341, -83.055],
  'Golden State Warriors': [37.770, -122.387], 'Houston Rockets': [29.685, -95.411], 'Indiana Pacers': [39.764, -86.156],
  'Los Angeles Clippers': [34.043, -118.267], 'Los Angeles Lakers': [34.043, -118.267],
  'LA Clippers': [34.043, -118.267], 'LA Lakers': [34.043, -118.267],
  'Memphis Grizzlies': [35.138, -90.051], 'Miami Heat': [25.781, -80.187], 'Milwaukee Bucks': [43.044, -87.917],
  'Minnesota Timberwolves': [44.980, -93.276], 'New Orleans Pelicans': [29.949, -90.082],
  'New York Knicks': [40.751, -73.994], 'Oklahoma City Thunder': [35.463, -97.515], 'Orlando Magic': [28.539, -81.384],
  'Philadelphia 76ers': [39.901, -75.172], 'Phoenix Suns': [33.446, -112.071], 'Portland Trail Blazers': [45.532, -122.667],
  'Sacramento Kings': [38.580, -121.500], 'San Antonio Spurs': [29.427, -98.438], 'Toronto Raptors': [43.644, -79.379],
  'Utah Jazz': [40.768, -111.901], 'Washington Wizards': [38.898, -77.021],
  // NHL
  'Anaheim Ducks': [33.808, -117.877], 'Boston Bruins': [42.366, -71.062], 'Buffalo Sabres': [42.875, -78.876],
  'Calgary Flames': [51.037, -114.052], 'Carolina Hurricanes': [35.803, -78.722], 'Chicago Blackhawks': [41.881, -87.674],
  'Colorado Avalanche': [39.749, -104.999], 'Columbus Blue Jackets': [39.969, -82.999], 'Dallas Stars': [32.790, -96.810],
  'Detroit Red Wings': [42.341, -83.055], 'Edmonton Oilers': [53.547, -113.498], 'Florida Panthers': [26.158, -80.326],
  'Los Angeles Kings': [34.043, -118.267], 'Minnesota Wild': [44.945, -93.101], 'Montreal Canadiens': [45.496, -73.570],
  'Nashville Predators': [36.159, -86.779], 'New Jersey Devils': [40.734, -74.171], 'New York Islanders': [40.683, -73.975],
  'New York Rangers': [40.751, -73.994], 'Ottawa Senators': [45.297, -75.928], 'Philadelphia Flyers': [39.901, -75.172],
  'Pittsburgh Penguins': [40.439, -79.989], 'San Jose Sharks': [37.333, -121.901], 'Seattle Kraken': [47.622, -122.354],
  'St. Louis Blues': [38.627, -90.200], 'Tampa Bay Lightning': [27.943, -82.452], 'Toronto Maple Leafs': [43.644, -79.379],
  'Utah Hockey Club': [40.768, -111.901], 'Vancouver Canucks': [49.278, -123.109], 'Vegas Golden Knights': [36.170, -115.140],
  'Washington Capitals': [38.898, -77.021], 'Winnipeg Jets': [49.893, -97.143],
  // MLB
  'Arizona Diamondbacks': [33.446, -112.071], 'Atlanta Braves': [33.891, -84.468], 'Baltimore Orioles': [39.284, -76.622],
  'Boston Red Sox': [42.346, -71.097], 'Chicago Cubs': [41.948, -87.656], 'Chicago White Sox': [41.830, -87.634],
  'Cincinnati Reds': [39.097, -84.516], 'Cleveland Guardians': [41.496, -81.685], 'Colorado Rockies': [39.756, -104.994],
  'Detroit Tigers': [42.339, -83.049], 'Houston Astros': [29.757, -95.355], 'Kansas City Royals': [39.051, -94.481],
  'Los Angeles Angels': [33.800, -117.883], 'Los Angeles Dodgers': [34.074, -118.240], 'Miami Marlins': [25.778, -80.220],
  'Milwaukee Brewers': [43.028, -87.971], 'Minnesota Twins': [44.982, -93.278], 'New York Mets': [40.757, -73.846],
  'New York Yankees': [40.829, -73.927], 'Oakland Athletics': [37.751, -122.203], 'Philadelphia Phillies': [39.906, -75.167],
  'Pittsburgh Pirates': [40.447, -80.006], 'San Diego Padres': [32.707, -117.157], 'San Francisco Giants': [37.778, -122.389],
  'Seattle Mariners': [47.591, -122.333], 'St. Louis Cardinals': [38.623, -90.193], 'Tampa Bay Rays': [27.768, -82.653],
  'Texas Rangers': [32.751, -97.083], 'Toronto Blue Jays': [43.641, -79.389], 'Washington Nationals': [38.873, -77.007],
  // Euroleague Basketball
  'Real Madrid': [40.453, -3.688], 'Fenerbahce': [41.009, 28.951], 'Anadolu Efes': [41.009, 28.951],
  'Olympiacos': [37.942, 23.666], 'Panathinaikos': [37.976, 23.736], 'Maccabi Tel Aviv': [32.065, 34.764],
  'Bayern München': [48.219, 11.625], 'Zalgiris': [54.687, 25.280], 'Virtus Bologna': [44.493, 11.343],
  'Partizan': [44.789, 20.473], 'Crvena Zvezda': [44.789, 20.473], 'AS Monaco': [43.727, 7.416],
  'Baskonia': [42.850, -2.683], 'Valencia Basket': [39.475, -0.358], 'ALBA Berlin': [52.514, 13.239],
  // G-League
  'Grand Rapids Gold': [42.963, -85.668], 'Osceola Magic': [28.291, -81.408], 'Noblesville Boom': [40.048, -86.013],
  'Capital City Go-Go': [38.898, -77.021], 'Windy City Bulls': [41.881, -87.674], 'Raptors 905': [43.589, -79.644],
  'Wisconsin Herd': [43.749, -88.447], 'Greensboro Swarm': [36.072, -79.792], 'Texas Legends': [32.925, -96.972],
  'South Bay Lakers': [33.832, -118.340], 'Motor City Cruise': [42.341, -83.055], 'College Park Skyhawks': [33.652, -84.449],
  'Sioux Falls Skyforce': [43.546, -96.731], 'Valley Suns': [33.446, -112.071], 'Iowa Wolves': [41.587, -93.625],
  'Rio Grande Valley Vipers': [26.146, -97.990], 'Austin Toros Spurs': [30.267, -97.743], 'Memphis Hustle': [35.138, -90.051],
  'Mexico City Capitanes': [19.303, -99.150], 'Salt Lake City Stars': [40.768, -111.901],
  'Rip City Remix': [45.532, -122.667], 'Santa Cruz Warriors': [36.974, -122.030], 'Stockton Kings': [37.958, -121.291],
  'Oklahoma City Blue': [35.463, -97.515],
  // NCAA Basketball (major programs by name)
  'Auburn': [32.599, -85.488], 'Kentucky': [38.043, -84.503], 'Alabama': [33.209, -87.569],
  'Duke': [36.002, -78.939], 'North Carolina': [35.905, -79.047], 'Gonzaga': [47.667, -117.402],
  'Houston': [29.720, -95.339], 'Kansas': [38.954, -95.253], 'Michigan State': [42.731, -84.482],
  'Iowa State': [42.026, -93.649], 'Tennessee': [35.955, -83.930], 'Purdue': [40.424, -86.911],
  'Florida': [29.650, -82.349], 'Texas': [30.282, -97.732], 'Arizona': [32.229, -110.949],
  'UCLA': [34.071, -118.445], 'Connecticut': [41.808, -72.253], 'Baylor': [31.549, -97.114],
  'Oklahoma': [35.206, -97.445], 'Oregon': [44.045, -123.073], 'Wisconsin': [43.076, -89.412],
  'Illinois': [40.102, -88.227], 'Michigan': [42.281, -83.743], 'Indiana': [39.168, -86.523],
  'Marquette': [43.038, -87.930], 'Creighton': [41.259, -95.938], 'St. Johns': [40.724, -73.795],
  'Villanova': [40.038, -75.345], 'Xavier': [39.150, -84.473], 'Providence': [41.838, -71.402],
  'Georgetown': [38.908, -77.072], 'Seton Hall': [40.742, -74.250], 'DePaul': [41.924, -87.656],
  'Butler': [39.839, -86.169], 'Memphis': [35.149, -90.049], 'Cincinnati': [39.131, -84.515],
  'Colorado': [40.007, -105.266], 'Stanford': [37.432, -122.170], 'USC': [34.024, -118.287],
  'Oregon State': [44.563, -123.282], 'Washington State': [46.732, -117.178], 'Iowa': [41.661, -91.550],
  'Minnesota': [44.974, -93.232], 'Nebraska': [40.820, -96.705], 'Northwestern': [42.060, -87.675],
  'Penn State': [40.798, -77.860], 'Rutgers': [40.522, -74.461], 'Maryland': [38.986, -76.944],
  'Ohio State': [39.998, -83.018], 'Virginia': [38.031, -78.510], 'Louisville': [38.217, -85.758],
  'Wake Forest': [36.135, -80.278], 'Pittsburgh': [40.444, -79.953], 'Syracuse': [43.037, -76.136],
  'Boston College': [42.335, -71.170], 'Notre Dame': [41.699, -86.234], 'Georgia Tech': [33.781, -84.393],
  'Clemson': [34.683, -82.837], 'NC State': [35.787, -78.664], 'Miami': [25.781, -80.187],
  'TCU': [32.710, -97.363], 'Texas Tech': [33.586, -101.846], 'West Virginia': [39.650, -79.956],
  'Kansas State': [39.202, -96.594], 'Oklahoma State': [36.126, -97.068], 'Arkansas': [36.068, -94.175],
  'Mississippi State': [33.456, -88.790], 'LSU': [30.413, -91.184], 'Ole Miss': [34.365, -89.539],
  'Missouri': [38.940, -92.328], 'South Carolina': [34.000, -81.028], 'Vanderbilt': [36.145, -86.803],
  'Georgia': [33.948, -83.375], 'San Diego State': [32.775, -117.072], 'BYU': [40.254, -111.655],
  'Brigham Young': [40.254, -111.655], 'SMU': [32.842, -96.783], 'UCF': [28.600, -81.200],
  'UCF Knights': [28.600, -81.200],
  'Pepperdine': [34.035, -118.712], 'Pacific': [37.981, -121.311], 'St. Marys (CA)': [37.843, -122.262],
  'Santa Clara': [37.349, -121.939], 'San Francisco': [37.778, -122.418], 'Portland': [45.532, -122.667],
  'Loyola Marymount': [33.970, -118.418], 'San Diego': [32.771, -117.189],
  'Lehigh': [40.607, -75.378], 'Boston University': [42.351, -71.106], 'Lafayette': [40.698, -75.213],
  'American University': [38.937, -77.088], 'Bucknell': [40.955, -76.884], 'Holy Cross': [42.237, -71.811],
  'Rider': [40.282, -74.740], 'Niagara': [43.138, -79.043], 'Marist': [41.728, -73.931],
  'Sacred Heart': [41.203, -73.239], 'Fairfield': [41.163, -73.225], 'Quinnipiac': [41.419, -72.893],
  'Siena': [42.719, -73.752], 'St. Peters': [40.737, -74.063], 'Manhattan': [40.858, -73.901],
  'Canisius': [42.937, -78.858], 'Mount St. Mary\'s': [39.697, -77.375],
  'Fairleigh Dickinson': [40.936, -74.129], 'NJIT': [40.742, -74.179], 'New Haven Chargers': [41.299, -72.928],
  'Vermont': [44.478, -73.196], 'Wofford': [34.948, -81.930], 'Furman': [34.925, -82.438],
  'Elon': [36.103, -79.503], 'N. Carolina A&T': [36.076, -79.773], 'Lamar': [30.081, -94.102],
  'New Orleans': [29.949, -90.082], 'Jacksonville Dolphins': [30.349, -81.608], 'Austin Peay': [36.534, -87.359],
  'Bellarmine': [38.218, -85.770], 'Eastern Kentucky': [37.747, -84.295],
  'Northern Colorado': [40.407, -104.696], 'Northern Arizona': [35.189, -111.655],
  'Oral Roberts': [36.055, -95.943], 'South Dakota Coyotes': [42.891, -96.929],
  'Bradley': [40.698, -89.614], 'Illinois State': [40.511, -88.990],
  'McNeese State': [30.214, -93.217], 'McNeese': [30.214, -93.217],
  'Louisiana Tech': [32.523, -92.638], 'Louisiana Tech Lady Techsters': [32.523, -92.638],
  'Louisiana': [30.214, -92.019], 'UL Lafayette': [30.214, -92.019], 'Louisiana-Lafayette': [30.214, -92.019],
  'Louisiana Ragin Cajuns': [30.214, -92.019], 'Louisiana Ragin\' Cajuns': [30.214, -92.019],
  'UL Monroe': [32.529, -92.076], 'Louisiana-Monroe': [32.529, -92.076],
  'Southeastern Louisiana': [30.514, -90.462], 'SE Louisiana': [30.514, -90.462],
  'Nicholls State': [29.786, -90.823], 'Nicholls': [29.786, -90.823],
  'Southern': [30.528, -91.191], 'Southern University': [30.528, -91.191], 'Southern Jaguars': [30.528, -91.191],
  'Northwestern State': [31.770, -93.100], 'Northwestern St': [31.770, -93.100],
  'Grambling State': [32.527, -92.714], 'Grambling': [32.527, -92.714],
  'Texas A&M-CC': [27.714, -97.326],
  'Grand Canyon': [33.508, -112.097], 'Wyoming': [41.315, -105.573],
  'Fresno State': [36.813, -119.748], 'New Mexico': [35.084, -106.619],
  'Belmont': [36.131, -86.796], 'Indiana State': [39.464, -87.399],
  'New Mexico State': [32.282, -106.748], 'UTEP': [31.770, -106.505],
  'Long Beach State': [33.784, -118.113], 'CS Northridge': [34.240, -118.529],
  'Utah Utes': [40.765, -111.843], 'Weber State': [41.189, -111.948], 'Montana': [46.862, -113.985],
  'CSU Bakersfield': [35.350, -119.103], 'CS Fullerton': [33.883, -117.886],
  'UC Irvine': [33.642, -117.842], 'UC San Diego': [32.880, -117.234],
  'UC Santa Barbara': [34.414, -119.849], 'Sacramento State': [38.561, -121.424], 'Idaho': [46.726, -117.015],
  'Nevada': [39.545, -119.816], 'Utah State': [41.745, -111.810], 'Hawaii': [21.297, -157.817],
  'Seattle': [47.609, -122.317], 'Detroit': [42.341, -83.055],
  'Wisc. Green Bay': [44.527, -88.066], 'Merrimack Warriors': [42.768, -71.114], 'Iona': [41.002, -73.838],
  'Drexel': [39.957, -75.189], 'Towson': [39.394, -76.609], 'Cleveland State': [41.502, -81.675],
  'IPFW': [41.118, -85.111], 'Oakland': [42.674, -83.219], 'Wisc. Milwaukee': [43.076, -87.882],
  'Tulane': [29.939, -90.121], 'Rice': [29.716, -95.402], 'Tulsa': [36.151, -95.946],
  'UTSA Roadrunners': [29.583, -98.619], 'North Texas': [33.208, -97.153], 'Florida Atlantic': [26.370, -80.101],
  'Wright State': [39.781, -84.062], 'Robert Morris': [40.518, -80.183],
  'Youngstown State': [41.104, -80.646], 'Northern Kentucky': [39.032, -84.463],
  'Texas A&M': [30.604, -96.340], 'South Carolina W': [34.000, -81.028], 'UConn W': [41.808, -72.253],
  // European leagues (team name partial matches)
  'Alba Berlin': [52.514, 13.239], 'Bamberg': [49.892, 10.887], 'Olimpia Milano': [45.478, 9.124],
  'Tortona': [44.895, 8.861], 'FC Porto': [41.161, -8.583], 'Sporting CP': [38.761, -9.161],
  'Trefl Sopot': [54.441, 18.567], 'Zielona Gora': [51.938, 15.506], 'Zalgiris Kaunas': [54.897, 23.912],
  'Rytas': [54.687, 25.280], 'Monaco': [43.727, 7.416], 'Le Mans': [47.996, 0.192],
  'Szolnoki Olaj': [47.175, 20.196], 'Szombathely': [47.231, 16.622],
  'Atomeromu Paks': [46.623, 18.855], 'Budapesti Honved Se': [47.483, 19.087],
  'Besiktas': [41.039, 29.007],
  'Galatasaray W': [41.063, 28.977], 'CSKA Moscow': [55.816, 37.555],
  'Lokomotiv Kuban': [45.040, 38.976], 'Zenit Petersburg': [59.935, 30.316],
  'Parma Perm': [58.010, 56.249], 'Uralmash Ekaterinburg': [56.835, 60.603],
  'MBA Moscow': [55.755, 37.617], 'Maccabi Ironi Ramat Gan': [32.068, 34.824],
  'Hapoel Jerusalem': [31.782, 35.218], 'Bnei Herzliya': [32.162, 34.839],
  'Neptunas': [55.710, 21.136], 'Lietkabelis': [55.918, 24.403],
  'London Lions': [51.544, -0.016], 'Manchester Basketball': [53.462, -2.244],
  'Sheffield Sharks': [53.381, -1.470], 'Bristol Flyers': [51.454, -2.602],
  'Cheshire Phoenix': [53.191, -2.893], 'Surrey 89ers': [51.246, -0.772],
  'Newcastle Eagles W': [54.978, -1.617], 'Caledonia Gladiators W': [55.862, -4.270],
};

export const CITY_COORDS: Record<string, [number, number]> = {
  'london': [51.505, -0.09], 'manchester': [53.483, -2.244], 'liverpool': [53.408, -2.991], 'birmingham': [52.486, -1.890],
  'leeds': [53.801, -1.548], 'newcastle': [54.978, -1.617], 'sheffield': [53.381, -1.470], 'nottingham': [52.950, -1.150],
  'leicester': [52.634, -1.131], 'brighton': [50.861, -0.083], 'wolverhampton': [52.590, -2.130],
  'southampton': [50.906, -1.404], 'bournemouth': [50.735, -1.838], 'madrid': [40.453, -3.688],
  'barcelona': [41.381, 2.123], 'seville': [37.384, -5.970], 'valencia': [39.475, -0.358], 'bilbao': [43.264, -2.949],
  'vigo': [42.212, -8.739], 'milan': [45.478, 9.124], 'rome': [41.934, 12.455], 'turin': [45.109, 7.641],
  'naples': [40.828, 14.193], 'florence': [43.781, 11.282], 'genoa': [44.416, 8.952], 'bergamo': [45.709, 9.681],
  'munich': [48.219, 11.625], 'dortmund': [51.493, 7.452], 'berlin': [52.514, 13.239], 'frankfurt': [50.069, 8.645],
  'leipzig': [51.346, 12.348], 'leverkusen': [51.038, 7.002], 'stuttgart': [48.792, 9.232], 'hamburg': [53.554, 9.967],
  'paris': [48.841, 2.253], 'marseille': [43.270, 5.396], 'lyon': [45.765, 4.982], 'lille': [50.612, 3.130],
  'nice': [43.705, 7.192], 'monaco': [43.727, 7.416], 'bordeaux': [44.850, -0.561], 'strasbourg': [48.560, 7.620],
  'nantes': [47.256, -1.525], 'angers': [47.473, -0.555], 'new york': [40.751, -73.994], 'brooklyn': [40.683, -73.975],
  'los angeles': [34.043, -118.267], 'chicago': [41.881, -87.674], 'boston': [42.366, -71.062],
  'philadelphia': [39.901, -75.172], 'houston': [29.685, -95.411], 'dallas': [32.790, -96.810],
  'san francisco': [37.770, -122.387], 'denver': [39.749, -104.999], 'miami': [25.781, -80.187],
  'atlanta': [33.757, -84.396], 'phoenix': [33.446, -112.071], 'detroit': [42.341, -83.055],
  'minneapolis': [44.980, -93.276], 'seattle': [47.622, -122.354], 'milwaukee': [43.044, -87.917],
  'cleveland': [41.496, -81.688], 'indianapolis': [39.764, -86.156], 'orlando': [28.539, -81.384],
  'charlotte': [35.225, -80.839], 'sacramento': [38.580, -121.500], 'san antonio': [29.427, -98.438],
  'memphis': [35.138, -90.051], 'portland': [45.532, -122.667], 'oklahoma city': [35.463, -97.515],
  'washington': [38.898, -77.021], 'new orleans': [29.949, -90.082], 'salt lake city': [40.768, -111.901],
  'las vegas': [36.170, -115.140], 'tampa': [27.943, -82.452], 'pittsburgh': [40.439, -79.989],
  'st. louis': [38.627, -90.200], 'kansas city': [39.049, -94.584], 'cincinnati': [39.097, -84.516],
  'raleigh': [35.803, -78.722], 'nashville': [36.159, -86.779], 'columbus': [39.969, -82.999],
  'buffalo': [42.875, -78.876], 'anaheim': [33.808, -117.877], 'san jose': [37.333, -121.901],
  'arlington': [32.751, -97.083], 'baltimore': [39.284, -76.622], 'san diego': [32.707, -117.157],
  'toronto': [43.644, -79.379], 'montreal': [45.496, -73.570], 'vancouver': [49.278, -123.109],
  'ottawa': [45.297, -75.928], 'calgary': [51.037, -114.052], 'edmonton': [53.547, -113.498],
  'winnipeg': [49.893, -97.143], 'rio de janeiro': [-22.912, -43.230], 'sao paulo': [-23.547, -46.635],
  'belo horizonte': [-19.924, -43.945], 'buenos aires': [-34.614, -58.410],
  'mexico city': [19.303, -99.150], 'guadalajara': [20.702, -103.389], 'monterrey': [25.670, -100.315],
  'tokyo': [35.690, 139.692], 'osaka': [34.669, 135.432], 'seoul': [37.568, 126.978], 'beijing': [39.907, 116.391],
  'shanghai': [31.224, 121.469], 'dubai': [25.228, 55.280], 'abu dhabi': [24.453, 54.654],
  'melbourne': [-37.814, 144.963], 'sydney': [-33.870, 151.207],
  'amsterdam': [52.314, 4.942], 'lisbon': [38.753, -9.185], 'porto': [41.161, -8.583], 'brussels': [50.835, 4.298],
  'vienna': [48.209, 16.363], 'zurich': [47.383, 8.533], 'istanbul': [41.009, 28.951], 'moscow': [55.816, 37.555],
  'stockholm': [59.345, 18.075], 'copenhagen': [55.604, 12.452], 'oslo': [59.913, 10.752], 'helsinki': [60.188, 24.952],
  'warsaw': [52.221, 20.976], 'prague': [50.083, 14.421], 'budapest': [47.503, 19.074], 'athens': [37.976, 23.736],
  'bucharest': [44.437, 26.089], 'belgrade': [44.789, 20.473], 'zagreb': [45.808, 15.979], 'split': [43.509, 16.440],
  'thessaloniki': [40.640, 22.944], 'larissa': [39.637, 22.420], 'plzen': [49.748, 13.378],
  'kosice': [48.716, 21.261], 'aarhus': [56.150, 10.210], 'larnaca': [34.922, 33.624],
  'essen': [51.455, 7.012], 'kielce': [50.866, 20.629], 'waregem': [50.876, 3.413],
  'santander': [43.463, -3.805], 'murcia': [37.987, -1.130], 'barakaldo': [43.296, -2.990],
  'reggio emilia': [44.698, 10.630], 'brescia': [45.539, 10.220], 'potenza': [40.642, 15.799],
  'crotone': [39.084, 17.122], 'carpi': [44.784, 10.886], 'arzignano': [45.522, 11.333],
  'paks': [46.623, 18.855], 'bamako': [12.640, -8.003], 'tarma': [-11.419, -75.690],
  'cartago': [9.864, -83.920], 'tijuana': [32.525, -117.038], 'malmo': [55.605, 13.000],
  'dakar': [14.716, -17.467], 'dar es salaam': [-6.792, 39.208], 'badalona': [41.450, 2.247],
  'logrono': [42.466, -2.450], 'ourense': [42.340, -7.864], 'terrassa': [41.566, 2.009],
  'palencia': [42.010, -4.528], 'motril': [36.748, -3.518],
};

export const COUNTRY_COORDS: Record<string, [number, number]> = {
  'england': [51.505, -0.09], 'spain': [40.453, -3.688], 'italy': [41.934, 12.455], 'germany': [50.069, 8.645],
  'france': [48.841, 2.253], 'portugal': [38.753, -9.185], 'netherlands': [52.314, 4.942], 'belgium': [50.835, 4.298],
  'turkey': [41.009, 28.951], 'scotland': [55.953, -3.188], 'usa': [39.8, -98.6], 'canada': [45.4, -75.7],
  'brazil': [-15.793, -47.883], 'argentina': [-34.614, -58.410], 'mexico': [19.432, -99.133],
  'japan': [35.690, 139.692], 'south-korea': [37.568, 126.978], 'china': [39.907, 116.391],
  'australia': [-33.870, 151.207], 'india': [28.613, 77.230], 'russia': [55.816, 37.555],
  'croatia': [45.808, 15.979], 'serbia': [44.789, 20.473], 'greece': [37.976, 23.736],
  'poland': [52.221, 20.976], 'hungary': [47.503, 19.074], 'czech-republic': [50.083, 14.421],
  'slovakia': [48.716, 21.261], 'denmark': [55.604, 12.452], 'sweden': [59.345, 18.075],
  'switzerland': [47.383, 8.533], 'cyprus': [34.922, 33.624], 'united-arab-emirates': [25.228, 55.280],
  'costa-rica': [9.934, -84.088], 'guatemala': [14.634, -90.549], 'peru': [-12.046, -77.043],
  'tanzania': [-6.792, 39.208], 'mali': [12.640, -8.003], 'senegal': [14.716, -17.467],
  'finland': [60.188, 24.952], 'norway': [59.913, 10.752], 'ireland': [53.350, -6.260],
  'ukraine': [50.450, 30.524], 'united-kingdom': [51.505, -0.09], 'gb': [51.505, -0.09],
  'indonesia': [-6.175, 106.827], 'bahrain': [26.223, 50.588], 'kosovo': [42.663, 21.166],
  'luxembourg': [49.612, 6.132], 'bosnia-and-herzegovina': [43.856, 18.413], 'estonia': [59.437, 24.745],
  'latvia': [56.946, 24.106], 'lithuania': [54.687, 25.280], 'europe': [48.8, 10.0],
  'kazakhstan': [51.169, 71.449], 'israel': [31.782, 35.218], 'belarus': [53.900, 27.567],
  'bulgaria': [42.698, 23.322], 'romania': [44.437, 26.089],
  'iceland': [64.135, -21.895], 'slovenia': [46.056, 14.508], 'austria': [48.209, 16.363],
  'south korea': [37.568, 126.978], 'czech republic': [50.083, 14.421],
};

// US state center coordinates — fallback for ESPN venue geocoding
export const US_STATE_CENTERS: Record<string, [number, number]> = {
  'AL': [32.81, -86.68], 'AK': [64.00, -153.00], 'AZ': [34.17, -111.58], 'AR': [34.80, -92.20],
  'CA': [37.27, -119.27], 'CO': [39.00, -105.55], 'CT': [41.60, -72.70], 'DE': [39.00, -75.50],
  'FL': [28.63, -82.45], 'GA': [33.25, -83.44], 'HI': [20.75, -156.50], 'ID': [44.39, -114.61],
  'IL': [40.00, -89.25], 'IN': [39.85, -86.26], 'IA': [42.03, -93.58], 'KS': [38.50, -98.75],
  'KY': [37.53, -85.30], 'LA': [31.07, -92.00], 'ME': [45.37, -69.24], 'MD': [39.05, -76.64],
  'MA': [42.27, -71.81], 'MI': [43.33, -84.54], 'MN': [46.28, -94.31], 'MS': [32.74, -89.68],
  'MO': [38.46, -92.30], 'MT': [47.05, -109.63], 'NE': [41.50, -99.68], 'NV': [39.88, -117.22],
  'NH': [43.68, -71.58], 'NJ': [40.19, -74.67], 'NM': [34.41, -106.11], 'NY': [42.95, -75.53],
  'NC': [35.78, -78.64], 'ND': [47.53, -99.78], 'OH': [40.15, -82.40], 'OK': [35.59, -97.49],
  'OR': [43.94, -120.56], 'PA': [40.88, -77.80], 'RI': [41.68, -71.51], 'SC': [33.86, -80.95],
  'SD': [44.44, -100.23], 'TN': [35.86, -86.35], 'TX': [31.00, -97.50], 'UT': [39.32, -111.67],
  'VT': [44.07, -72.67], 'VA': [37.52, -78.85], 'WA': [47.38, -120.45], 'WV': [38.64, -80.62],
  'WI': [44.63, -89.71], 'WY': [43.00, -107.55], 'DC': [38.90, -77.04],
};

/**
 * Geocode using city name + US state abbreviation.
 * Checks CITY_COORDS first (lowercase city match), then falls back to state center.
 */
export function geocodeCityState(city: string, state: string): [number, number] | null {
  if (!city && !state) return null;

  // Try city name in CITY_COORDS
  if (city) {
    const cityLower = city.toLowerCase().trim();
    if (CITY_COORDS[cityLower]) return CITY_COORDS[cityLower];
  }

  // Fallback to state center
  if (state) {
    const stateUpper = state.toUpperCase().trim();
    if (US_STATE_CENTERS[stateUpper]) return US_STATE_CENTERS[stateUpper];
  }

  return null;
}

// US spread locations - 80 points across the country for unknown US teams
export const US_REGIONS: [number, number][] = [
  // Northeast
  [42.36, -71.06], [40.75, -73.99], [39.95, -75.17], [38.90, -77.02], [41.76, -72.68],
  [42.44, -76.50], [43.05, -76.15], [40.44, -79.95], [41.50, -81.69], [40.80, -77.86],
  [44.48, -73.21], [43.07, -70.77], [42.27, -71.80], [41.82, -71.41], [40.73, -74.17],
  // Southeast
  [33.75, -84.40], [36.16, -86.78], [35.23, -80.84], [35.80, -78.64], [32.78, -79.93],
  [30.33, -81.66], [28.54, -81.38], [25.78, -80.19], [27.95, -82.45], [30.45, -84.28],
  [33.52, -86.80], [32.37, -86.30], [34.73, -86.59], [36.85, -75.98], [37.54, -77.44],
  [38.05, -78.51], [36.07, -79.79], [34.00, -81.03], [35.96, -83.92], [36.15, -80.28],
  // Midwest
  [41.88, -87.67], [44.98, -93.27], [43.04, -87.92], [42.33, -83.05], [39.76, -86.16],
  [39.96, -82.99], [38.63, -90.20], [39.10, -94.58], [41.59, -93.62], [43.01, -87.97],
  [42.96, -85.67], [40.42, -86.91], [40.11, -88.23], [44.94, -93.10], [42.73, -84.48],
  [41.66, -91.53], [43.07, -89.40], [38.97, -92.33], [40.81, -96.70], [44.57, -89.77],
  // South/Southwest
  [30.27, -97.74], [29.76, -95.36], [32.78, -96.80], [35.47, -97.52], [29.43, -98.49],
  [31.76, -106.49], [35.08, -106.65], [33.45, -112.07], [32.22, -110.93], [36.17, -115.14],
  [36.10, -95.94], [35.15, -90.05], [32.30, -90.18], [30.41, -91.18], [34.75, -92.29],
  [33.58, -101.85], [31.95, -102.08], [33.42, -94.04], [36.37, -94.20], [29.95, -90.08],
  // West
  [47.61, -122.35], [45.52, -122.67], [37.77, -122.39], [34.04, -118.27], [32.72, -117.16],
  [38.58, -121.50], [39.74, -105.00], [40.77, -111.90], [43.62, -116.20], [46.87, -114.00],
  [47.66, -117.43], [44.06, -123.09], [36.75, -119.77], [33.83, -118.39], [37.34, -121.89],
  [40.02, -105.27], [38.80, -104.82], [41.14, -104.82], [46.88, -96.79], [44.08, -103.23],
];

// Deterministic hash: string → number [0, 1)
export function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h % 10000) / 10000;
}

/**
 * Geocode a game to lat/lng coordinates.
 * Follows the same fallback chain as sportglobe-v2:
 * 1. Exact team name match
 * 2. Partial team match
 * 3. City name extraction from team
 * 4. City lookup
 * 5. Venue lookup
 * 6. Country fallback with deterministic scatter
 */
// Pre-sorted entries by key length (descending) for partial matching.
// Longer/more-specific names are checked first so "Southeastern Louisiana"
// matches before "Louisiana", "Oklahoma State" before "Oklahoma", etc.
const TEAM_CITY_BY_LENGTH = Object.entries(TEAM_CITY)
  .sort((a, b) => b[0].length - a[0].length);

export function geocode(
  venue: string | null,
  city: string | null,
  country: string | null,
  homeTeam: string | null,
): [number, number] | null {
  const countryNorm = country?.toLowerCase().replace(/ /g, '-').trim() ?? null;
  const isNonNorthAmerican = countryNorm && !['usa', 'us', 'canada'].includes(countryNorm);

  // 1. Exact team name match (handles known international + domestic teams)
  if (homeTeam) {
    const cleanName = homeTeam.replace(/ W$/, '');
    if (TEAM_CITY[homeTeam]) return TEAM_CITY[homeTeam];
    if (TEAM_CITY[cleanName]) return TEAM_CITY[cleanName];
  }

  // 2. For non-North-American games, resolve via city/venue/country FIRST
  //    to prevent partial team name matching from hitting US entries
  //    (e.g., "Moscow" Russia → Moscow, NJ via partial match)
  if (isNonNorthAmerican) {
    if (city) {
      const c = city.toLowerCase().trim();
      if (CITY_COORDS[c]) return CITY_COORDS[c];
      for (const [k, v] of Object.entries(CITY_COORDS)) {
        if (c.includes(k) || k.includes(c)) return v;
      }
    }
    if (venue) {
      const v = venue.toLowerCase();
      for (const [k, coords] of Object.entries(CITY_COORDS)) {
        if (v.includes(k)) return coords;
      }
    }
    if (countryNorm) {
      let base = COUNTRY_COORDS[countryNorm];
      if (!base) {
        for (const [k, v] of Object.entries(COUNTRY_COORDS)) {
          if (countryNorm.includes(k) || k.includes(countryNorm)) { base = v; break; }
        }
      }
      if (base) {
        const h = homeTeam ? hashStr(homeTeam) : Math.random();
        const h2 = homeTeam ? hashStr(homeTeam + 'y') : Math.random();
        return [base[0] + (h - 0.5) * 3, base[1] + (h2 - 0.5) * 3];
      }
    }
  }

  // 3. Partial team match + word extraction (primarily for US/Canada teams)
  if (homeTeam) {
    const cleanName = homeTeam.replace(/ W$/, '');
    for (const [t, c] of TEAM_CITY_BY_LENGTH) {
      if (homeTeam.includes(t) || t.includes(homeTeam)) return c;
      if (cleanName.includes(t) || t.includes(cleanName)) return c;
    }
    const words = cleanName.toLowerCase().split(/\s+/);
    for (let i = words.length; i > 0; i--) {
      const k = words.slice(0, i).join(' ');
      if (CITY_COORDS[k]) return CITY_COORDS[k];
    }
    for (const w of words) {
      if (w.length > 3 && CITY_COORDS[w]) return CITY_COORDS[w];
    }
  }

  // 4. City name
  if (city) {
    const c = city.toLowerCase().trim();
    if (CITY_COORDS[c]) return CITY_COORDS[c];
    for (const [k, v] of Object.entries(CITY_COORDS)) {
      if (c.includes(k) || k.includes(c)) return v;
    }
  }

  // 5. Venue name
  if (venue) {
    const v = venue.toLowerCase();
    for (const [k, coords] of Object.entries(CITY_COORDS)) {
      if (v.includes(k)) return coords;
    }
  }

  // 6. Country fallback with deterministic scatter
  if (countryNorm) {
    let base = COUNTRY_COORDS[countryNorm];
    if (!base) {
      for (const [k, v] of Object.entries(COUNTRY_COORDS)) {
        if (countryNorm.includes(k) || k.includes(countryNorm)) { base = v; break; }
      }
    }
    if (base) {
      if ((countryNorm === 'usa' || countryNorm === 'us') && homeTeam) {
        const idx = Math.floor(hashStr(homeTeam) * US_REGIONS.length);
        const base2 = US_REGIONS[idx];
        const h3 = hashStr(homeTeam + 'salt');
        return [base2[0] + (h3 - 0.5) * 1.5, base2[1] + (hashStr(homeTeam + 'pepper') - 0.5) * 1.5];
      }
      const h = homeTeam ? hashStr(homeTeam) : Math.random();
      const h2 = homeTeam ? hashStr(homeTeam + 'y') : Math.random();
      return [base[0] + (h - 0.5) * 3, base[1] + (h2 - 0.5) * 3];
    }
  }
  return null;
}
