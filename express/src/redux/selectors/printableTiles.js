export default (tiles) => {
  const result = [];

  for (let row of tiles.toArray()) {
    const localVar = [];

    for (let tile of row.toArray()) {
      localVar.push(tile.toObject().type);
    }

    result.push(localVar);
  }

  return result;
};
