function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu("感情分析")
  .addItem("感情スコアを取得", "main")

  .addToUi();
}
