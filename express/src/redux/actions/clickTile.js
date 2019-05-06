export const clickTile = (content) => ({
  type: 'CLICK_TILE',
  content,
  payload: {
    col: content.col,
    row: content.row,
    selected: content.selected
  }
});
