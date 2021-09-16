function main(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  //分析対象テキストの選択
  const ui = SpreadsheetApp.getUi();
  const responseOfSelection = ui.prompt("振り返り(3列目)または感想(4列目)を分析します", "数値を入力してください", ui.ButtonSet.OK_CANCEL);
  const col = responseOfSelection.getResponseText();

  let target;
  if (col == 3) {
    target = "振り返り";
  } else {
    target = "感想";
  }

  //センテンス作成有無の確認
  const responseForMakingSentense = ui.alert("テキストの分解", "テキストをセンテンスに分解しますか？", ui.ButtonSet.YES_NO_CANCEL);

  switch (responseForMakingSentense) {
    case ui.Button.YES:
      const shYes = ss.insertSheet();
      shYes.setName(target + "_センテンス");
      getSplitText(shYes, col);
      break;

    case ui.Button.NO:
      const shNo = ss.insertSheet();
      shNo.setName(target + "_テキスト");
      getRewText(shNo, col);
      break;

    case ui.Button.CANCEL:
      break;
  }

  const confirmStartAnalysis = ui.alert("感情分析", "感情スコアを取得しますか？", ui.ButtonSet.YES_NO);
  
  if (confirmStartAnalysis){
    const sh = SpreadsheetApp.getActiveSheet();
    getSentiment(sh);
    ui.alert("分析が完了しました")
  }
}
