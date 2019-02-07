const tileColors = [
  [255, 128, 128],
  [128, 255, 128],
  [128, 128, 255],
  [255, 255, 128],
  [255, 128, 255],
  [128, 255, 255],
  [255, 255, 255]
]

export const getMyColor = (x,y,tiles) => {
  const type = tiles[x][y].type;
   //Empty one (black)
    if (type === -1) return [0,0,0];
    const color = tileColors[type];
    return color;
}
