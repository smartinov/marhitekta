// Boxes are [x, y, width, height] in pixels of the full 6280 x 3533 panorama.
// Cues name only what the panorama shows at native pixels, so players can rely on every word.
const UN = 'https://whc.unesco.org/en/list/1321';
const FLC = 'https://www.fondationlecorbusier.fr/';
const WP = 'https://en.wikipedia.org/wiki/';
window.GAME = {
  name: 'Le Corbusier',
  size: [6280, 3533],
  tiles: [
    ['tile-1', 3140, 1767],
    ['tile-2', 3140, 1767],
    ['tile-3', 3140, 1766],
    ['tile-4', 3140, 1766],
  ],
  targets: [
    {
      name: 'Le Corbusier', figure: 'figure.webp', box: [1531, 2148, 5, 17],
      cue: 'The architect himself: a man in a dark suit and white shirt, one of the pedestrians on the pavement of a street, just west of the big flat-roofed grey museum block. He is the same size as everyone else.',
      about: 'Born Charles-Édouard Jeanneret in Switzerland in 1887, he took the name Le Corbusier in the 1920s. He worked in France, India, Japan and Argentina, and designed the master plan of Chandigarh.',
      look: 'At this size you only see a dark suit and a white shirt front; his round black glasses and bow tie are far too small to read.',
      links: [['Fondation Le Corbusier', FLC], ['Wikipedia', `${WP}Le_Corbusier`]],
    },
    {
      name: 'Villa Savoye', box: [1928, 617, 422, 331],
      cue: 'A white box raised on slender columns, with a long ribbon of windows and curved screen walls on the roof terrace.',
      about: 'Built in Poissy near Paris between 1928 and 1931 as a weekend house for the Savoye family, it is the clearest statement of Le Corbusier\'s "five points of architecture". It is part of his UNESCO World Heritage listing.',
      look: 'The living floor floats above the ground on thin columns, and the roof is a garden with sculpted white walls.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Villa_Savoye`]],
    },
    {
      name: 'Notre-Dame du Haut, Ronchamp', box: [4790, 981, 357, 365],
      cue: 'A pilgrimage chapel with thick white curving walls, round white towers and one heavy curved roof like a hull.',
      about: 'Consecrated in 1955 on a hilltop in eastern France, it replaced a chapel destroyed in the war. Its sculpted concrete shell broke with the strict boxes of his earlier work.',
      look: 'The roof does not rest on the walls: it sweeps up at one corner like a wing, over curved white walls.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Notre_Dame_du_Haut`]],
    },
    {
      name: 'Unité d\'Habitation, Marseille', box: [4525, 2003, 574, 575],
      cue: 'A very long slab of flats on stout concrete legs, with red, yellow and blue side walls in the balconies and a roof terrace with a chimney and a vault.',
      about: 'Completed in Marseille in 1952, it holds 337 apartments, with shops and a rooftop terrace, as a vertical village. It was the model for later "unités" and a landmark of Brutalism.',
      look: 'Every flat has its own double-height balcony; the coloured side walls make a chequerboard of loggias.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Unit%C3%A9_d%27Habitation`]],
    },
    {
      name: 'Palace of Assembly, Chandigarh', box: [369, 716, 539, 396],
      cue: 'A long concrete block with a deep grid of openings, a tall curved tower like a cooling tower and a slanted pyramid shape on the roof.',
      about: 'The legislature of Punjab and Haryana, built in the new city of Chandigarh in the 1950s and early 1960s. The tower over the main chamber lets in light from above.',
      look: 'Two shapes rise from the flat roof: a round hyperboloid tower and a sloping block like a cut pyramid.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Palace_of_Assembly`]],
    },
    {
      name: 'High Court, Chandigarh', box: [1781, 2568, 543, 358],
      cue: 'One huge arched roof like a parasol over a grid of concrete sun-breakers, with three tall coloured piers at the entrance and a pool in front.',
      about: 'Finished in the mid-1950s, the court is shaped around Chandigarh\'s hot climate: the big roof throws shade and lets air pass. The tall coloured piers mark the entrance.',
      look: 'The roof curves upward at both ends and floats over the building like a lid.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Punjab_and_Haryana_High_Court`]],
    },
    {
      name: 'Sainte Marie de La Tourette', box: [3407, 2634, 914, 684],
      cue: 'A monastery of raw grey concrete: long blocks with rows of narrow balconies around a courtyard, and a small pyramid and round shapes on the roof.',
      about: 'A Dominican priory near Lyon, designed with Iannis Xenakis and built from 1953 to 1960. The monks\' cells face outward, while the shared spaces look into the courtyard.',
      look: 'The long blocks are pierced by rows of small loggias, one per monk\'s cell.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Sainte_Marie_de_La_Tourette`]],
    },
    {
      name: 'Curutchet House', box: [3443, 1568, 301, 288],
      cue: 'A narrow white house of open terraces and glass, with a blank taller white block beside it, squeezed in among its neighbours.',
      about: 'Built in La Plata, Argentina, in the early 1950s for the surgeon Pedro Curutchet, it is the only Le Corbusier building in the Americas. A ramp leads up through the house and around a tree.',
      look: 'The front is a light frame of terraces and sun-breakers, set next to a plain solid wall.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Curutchet_House`]],
    },
    {
      name: 'National Museum of Western Art, Tokyo', box: [1695, 1670, 779, 571],
      cue: 'A large square block of rough grey concrete with a flat roof, raised on pilotis, with a plain grid facade.',
      about: 'Opened in Tokyo in 1959 to house a collection of European art. Its plan is a square that can grow outward in a spiral, so the museum can be extended without a new front.',
      look: 'Nothing ornaments the walls: the concrete is textured, the roof is flat, and the ground floor is open between columns.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}National_Museum_of_Western_Art`]],
    },
    {
      name: 'Philips Pavilion', box: [2726, 1692, 534, 783],
      cue: 'Three tall pale peaked shapes with spires, like tent cones made of thin shell concrete, joined at the base.',
      about: 'Built for the 1958 Brussels World\'s Fair with Iannis Xenakis as a showcase for Philips, it held a sound-and-light show with music by Edgard Varèse. It was taken down not long after the fair.',
      look: 'The curved surfaces meet in sharp peaks, a tent made of concrete rather than a wall and a roof.',
      links: [['Fondation Le Corbusier', FLC], ['Wikipedia', `${WP}Philips_Pavilion`]],
    },
    {
      name: 'Mill Owners\' Association Building', box: [264, 1978, 518, 509],
      cue: 'A sand-coloured block with a deep concrete grid of balconies and planting on the front, and a sloped ramp on the flat roof.',
      about: 'Finished in Ahmedabad in 1954 as the headquarters of the textile mill owners. Open balconies and a long ramp make it a building for the hot climate.',
      look: 'The front is a deep frame that shades the rooms, and a ramp rises across the roof.',
      links: [['UNESCO World Heritage', UN], ['Wikipedia', `${WP}Mill_Owners%27_Association_Building`]],
    },
  ],
};
