// Boxes are [x, y, width, height] in pixels of the full 6280 x 3533 panorama.
// Cues name only what the panorama shows at native pixels, so players can rely on every word.
const FLW = 'https://franklloydwright.org/site/';
window.GAME = {
  name: 'Frank Lloyd Wright',
  size: [6280, 3533],
  tiles: [
    ['tile-1', 3140, 1767],
    ['tile-2', 3140, 1767],
    ['tile-3', 3140, 1766],
    ['tile-4', 3140, 1766],
  ],
  targets: [
    {
      name: 'Frank Lloyd Wright', figure: 'figure.webp', box: [961, 3081, 14, 32],
      cue: 'An old man in a brown hat and brown coat, with a long rust scarf and a cane. He is the same size as everyone else.',
      about: 'Born in Wisconsin in 1867, Wright designed 1,114 works, and 532 of them were built. He called his approach organic architecture: buildings in harmony with their setting.',
      look: 'At this size the hat, the rust scarf and the cane give him away; his white hair is barely a pixel.',
      links: [['Frank Lloyd Wright Foundation', 'https://franklloydwright.org/frank-lloyd-wright/'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Frank_Lloyd_Wright']],
    },
    {
      name: 'Fallingwater', box: [544, 219, 585, 503],
      cue: 'Cantilevers: pale concrete terraces reach out over a waterfall, beside a tall stone chimney.',
      about: 'Designed in 1935 for the Kaufmann family, it is built over the waterfall rather than facing it. It is one of eight Wright buildings on the UNESCO World Heritage List.',
      look: 'The terraces have no posts beneath them; each one is held from one end and hangs over the stream.',
      links: [['Fallingwater', 'https://fallingwater.org/what-is-fallingwater/'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Fallingwater']],
    },
    {
      name: 'Guggenheim Museum', box: [4985, 948, 919, 774],
      cue: 'A white spiral that widens as it rises, crowned by a glass dome, with a smaller round building beside it.',
      about: 'Commissioned in 1943 and opened in 1959, the New York museum shows art along one ramp that spirals up to a skylight. It is credited with launching the great age of museum architecture.',
      look: 'Each white band is one turn of the ramp inside; the glass dome lights the open centre.',
      links: [['Frank Lloyd Wright Foundation', `${FLW}solomon-r-guggenheim-museum/`], ['Wikipedia', 'https://en.wikipedia.org/wiki/Solomon_R._Guggenheim_Museum']],
    },
    {
      name: 'Robie House', box: [1965, 1063, 814, 543],
      cue: 'Prairie style: a long, low brick house whose hipped roofs reach far past the walls, with bands of windows and one central chimney.',
      about: 'Completed in Chicago in 1910, it is called the consummate expression of Wright\'s Prairie style and a forerunner of modern architecture. It is on the UNESCO World Heritage List.',
      look: 'Everything runs sideways: deep eaves, long balconies and continuous rows of windows keep the house low to the ground.',
      links: [['Frank Lloyd Wright Trust', 'https://flwright.org/tour/robie-house'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Robie_House']],
    },
    {
      name: 'Unity Temple', box: [3465, 118, 886, 704],
      cue: 'No steeple: a tall flat-roofed concrete cube lit by high windows, joined by a low entrance to a lower hall.',
      about: 'Built from 1906 to 1908 for the Unitarian church in Oak Park, Illinois, in poured concrete, then a material for factories and warehouses. Many consider it the first modern building; it is on the UNESCO list.',
      look: 'The worship room takes its light from above: high windows under the roof slab instead of tall church windows.',
      links: [['Frank Lloyd Wright Foundation', `${FLW}unity-temple/`], ['Wikipedia', 'https://en.wikipedia.org/wiki/Unity_Temple']],
    },
    {
      name: 'Hollyhock House', box: [3509, 1945, 799, 506],
      cue: 'Buff walls turn inward around a garden courtyard, with a band of stylized ornament along the roof edges and a curved pool.',
      about: 'Built from 1918 to 1921 in Los Angeles for Aline Barnsdall, as the centrepiece of an arts complex that was only partly built. It is on the UNESCO World Heritage List.',
      look: 'The rooms wrap around the courtyard; follow the ornament band along the roof edges.',
      links: [['Hollyhock House', 'https://hollyhockhouse.org/'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Hollyhock_House']],
    },
    {
      name: 'Jacobs House', box: [574, 2071, 524, 255],
      cue: 'Usonian: a low L-shaped house with flat roofs, horizontal wood boards, a glass wall onto the garden and a carport.',
      about: 'Built in 1936 for Herbert and Katherine Jacobs in Madison, Wisconsin, it is widely considered Wright\'s first Usonian house, his simpler and more affordable way to build a home. It is on the UNESCO list.',
      look: 'The L wraps around the garden, with a wall of glass on the garden side.',
      links: [['Frank Lloyd Wright Foundation', `${FLW}herbert-jacobs-house/`], ['Wikipedia', 'https://en.wikipedia.org/wiki/Herbert_and_Katherine_Jacobs_First_House']],
    },
    {
      name: 'Emil Bach House', box: [5295, 2931, 297, 263],
      cue: 'Late Prairie box: two storeys of cream stucco and tan brick under flat brown roofs that overhang deeply.',
      about: 'Built in Chicago in 1915 for Emil Bach, co-owner of a brick company. It shows Wright\'s late Prairie style: compact cubic masses under flat slab roofs.',
      look: 'Two levels of flat roofs project well past the walls, with bands of windows tucked beneath them.',
      links: [['Frank Lloyd Wright Foundation', `${FLW}emil-bach-house/`], ['Wikipedia', 'https://en.wikipedia.org/wiki/Emil_Bach_House']],
    },
    {
      name: 'Seth Peterson Cottage', box: [5316, 2106, 256, 185],
      cue: 'A small cottage under one big sloping roof, with sandstone walls, a massive stone chimney and walls of glass.',
      about: 'Designed in 1958 for Seth Peterson on Mirror Lake, Wisconsin, it is Wright\'s last Wisconsin building; both men died before it was finished. Volunteers later brought the boarded-up cottage back to life.',
      look: 'Stone and glass under a single roof plane: the chimney is the solid anchor, the glass walls the open side.',
      links: [['Seth Peterson Cottage', 'https://sethpeterson.org/cottage_history.html'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Seth_Peterson_Cottage']],
    },
    {
      name: 'Pope-Leighey House', box: [2169, 2948, 406, 230],
      cue: 'Usonian: a small house of horizontal wood boards and glass under flat roofs at two heights.',
      about: 'Built in 1941 in Falls Church, Virginia, for journalist Loren Pope in Wright\'s Usonian style. In 1965 it was moved to Woodlawn to save it from demolition for Interstate 66.',
      look: 'Walls of horizontal wood boards meet walls of glass under flat roofs at two heights.',
      links: [['Woodlawn & Pope-Leighey', 'https://www.woodlawnpopeleighey.org/plh-historic-overview'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Pope%E2%80%93Leighey_House']],
    },
    {
      name: 'Pettit Memorial Chapel', box: [3732, 2932, 352, 261],
      cue: 'Prairie in miniature: a low hipped roof with broad eaves over a porch on square piers, and a wing set crosswise behind.',
      about: 'Completed in 1907 in Belvidere Cemetery, Illinois, as a memorial to Dr. William H. Pettit. It is the only cemetery memorial Wright designed, made as his Prairie style was taking shape.',
      look: 'The cross-shaped plan: the porch wing and the hall wing meet at right angles under the same low roof.',
      links: [['Belvidere Cemetery', 'https://belviderecemetery.com/our-chapel/'], ['Wikipedia', 'https://en.wikipedia.org/wiki/Pettit_Memorial_Chapel']],
    },
  ],
};
