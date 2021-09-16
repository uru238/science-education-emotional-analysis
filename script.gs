/**
 * 元データの情報を新規シートに複製する
 */
function getRawData(sh, col){
  //元データシートの情報を取得
  const orginalShName = '元データ'; //元データ
  const originalSh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(orginalShName);
  const orgLastRow = originalSh.getLastRow(); //最終行を取得
  const lectureName = originalSh.getRange(1,2).getValue();
  const contentName = originalSh.getRange(1,col).getValue();

  //新しいシートに項目を挿入
  const values = [lectureName, contentName, "subjective score",'sentiment score', 'magnitude', 'JSON'];
  sh.getRange('A1:F1').setValues([values]);

  console.log('元データを新しいシートにコピーしました');

  return {originalSh, orgLastRow};
}

/**
 * テキストをセンテンスに分解し新規シートに複製する
 */
function getSplitText(sh, col){
　//定数を定義
  const sheet = sh; 
  const checkPoint = col;
  const {originalSh, orgLastRow} = getRawData(sheet, checkPoint);

  //テキストをセンテンスに分解する
  for (let i = 2; i <= orgLastRow; i++){
    let text = originalSh.getRange(i, col).getValue(); //テキスト
    let subjectiveScore = originalSh.getRange(i, 5).getValue(); //テキスト
    let sentences = text.split('。') //テキストを「。」で分割しセンテンス配列を生成

    //センテンスごとにセルに出力する
    let shLastRow = sh.getLastRow();
    let lecutureNum = i-1;

    for (let k = 0; k < sentences.length-1; k++){ 
      sh.getRange(shLastRow + 1 + k, 1).setValue(lecutureNum);
      sh.getRange(shLastRow + 1 + k, 2).setValue(sentences[k]);
      sh.getRange(shLastRow + 1 + k, 3).setValue(subjectiveScore);
    }
  }
  console.log('テキストをセンテンスに分解しました');
}

/**
 * テキストをそのまま新規シートに複製する
 */
function getRewText(sh, col) {
  //定数を定義
  const sheet = sh; 
  const checkPoint = col;
  const {originalSh, orgLastRow} = getRawData(sheet, checkPoint);

  //テキストをセルに入れる
  for (let i = 2; i <= orgLastRow; i++){
    let lecutureNum = i - 1;
    let text = originalSh.getRange(i, col).getValue(); //テキスト
    let subjectiveScore = originalSh.getRange(i, 5).getValue(); //テキスト
    let shLastRow = sh.getLastRow();

    sh.getRange(shLastRow + 1 ,1).setValue(lecutureNum);
    sh.getRange(shLastRow + 1 ,2).setValue(text);
    sh.getRange(shLastRow + 1 ,3).setValue(subjectiveScore);
  }
  console.log('テキストを新規シートにコピーしました');
}

/**
 * テキストまたはセンテンスを取得する
 */
function retrieveSentiment(text) {
  const key = "【Natural Language API】"; //Natural Language API キー
  const url = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + key;

  //テキスト構造の作成
  const docDetails = {
    language : "JA",
    type: "PLAIN_TEXT",
    content: text
  };
  
  //フォーマット設定
  const nlDate = {
    document: docDetails,
    encodingType : "UTF8"
  };

  //オプション設定
  const nlOptions = {
    method: "post",
    contentType:"application/json",
    payload: JSON.stringify(nlDate)
  }

  //コール呼び出し
  let response = UrlFetchApp.fetch(url, nlOptions);

  return response;
}

/**
 * センテンスを感情分析にかける
 */
function getSentiment(sh){
  //シート呼び出し
  const sheet = sh;
  const lastRow = sheet.getLastRow();

  //最終行までループ
  for (let i = 2; i <= lastRow; i++){
    let text = sh.getRange(i,2).getValue();
    let response = retrieveSentiment(text);
    let json = JSON.parse(response);
    let score = json["documentSentiment"]["score"];
    let magnitude = json["documentSentiment"]["magnitude"];

    sh.getRange(i,4).setValue(score);
    sh.getRange(i,5).setValue(magnitude);
    sh.getRange(i,6).setValue(json);   
  }
  console.log("感情スコアを出力しました");
}
