# science-education-emotional-analysis
科学教育感情分析プログラムリポジトリ

## 科学教育感情分析プログラム
このリポジトリはGoogleスプレッドシートとGoogle Apps Scripit、Google Cloud Nautural Languageを用いて学習者の記述内容を感情分析するプログラムを格納しています。

## DEMO
### Googleスプレッドシート
- GoogleスプレッドシートのDEMOは[こちら](https://docs.google.com/spreadsheets/d/1L6uRzO8dPmhyi0P4NI7Pt5mkSj76aMoiizgFPo4HlKE/edit?usp=sharing)。
- 元データは下記の表（例）で構成しています。このシートに直接学習者1名が学習履歴を記載し、教員とコミュニケーションを取れるよう設計されています。

|日時|場所|今日学んだことはなんですか？|今日の感想|今の自信は？|コメント（講師記入欄）|
|:-:|:-:|:--|:--|:-:|:--|
|4/1|1|（振り返り）理科教育の評価について深く学ぶことができた|（感想）新しい気づきがあった|3|確認しました|

- 元データのうち、分析に使用するのは次の4つです。それ以外は記述がなくても分析が可能です。
	- 場所（講義No.）
	- 今日学んだことはなんですか？（振り返り）
	- 今日の感想（感想）
	- 今の自信は？（運勢ラインの上昇／下降） 
- 今の自信（subjective score）は運勢ラインの上昇／下降に該当し、便宜的に-3〜+3の7段階としていますが、範囲を変更しても分析には影響しません。
- **DEMOではNatural Language APIが指定されていない点にご注意ください。**

### Google Apps Scripit(GAS)
- 上記DEMOのメニューバーから[ツール]-[スクリプトエディタ]を開くと3つの.gsファイルを確認できます。
	- main.gs
		- メニューバーの[感情分析]-[感情スコアを取得]により開始する処理。
	- script.gs
		- 感情分析に必要なセンテンス作成およびデータ処理を記載。
		- **使用する際には76行目 `const key = "【Natural Language API】"`の【　】をNatural Language APIに置き換える必要があります。**
	- onOpen.gs
		- メニューバーの[感情分析]-[感情スコアを取得]ボタンのUIを指定。
- Github上で表示される「appsscript.json」はscripit.gs内に記載されています。

## Features
- 科学教育感情分析プログラムは後述する3つの必要物さえ取得・入力すれば、3つのGASをスプリクトエディタにコピー&ペーストするだけでセンテンスの分解から感情分析まで、オンライン上で簡単に処理することが可能です。
- DEMOのGoogleスプレッドシートは学習者1名ずつ直接入力することを想定していますが、Googleフォームと連動させ入力を促すことも可能です。

## Requirement
### 必要なもの
- Googleアカウント
- Google Cloudアカウント
- Google Cloud Natural Language API

### プログラムを使用する際の留意点
- このプログラムを使用するためには、Googleアカウント取得後に、別途Google Google Cloudのアカウントを作成し、Cloud Natural Language APIを取得する必要があります。
- Natural Language APIはGoogle Cloud Platformが提供する機械学習系サービスの一つです。APIを使用するためには　Google Cloudのアカウントを作成したのち、プロジェクトセレクタにてプロジェクトを作成し、AutoML Natural Language APIを有効にする必要があります。詳細は[チュートリアル](https://cloud.google.com/natural-language/automl/docs/tutorial?hl=ja)を参照してください。
- 感情分析の詳細は[Google Cloudのガイド](https://cloud.google.com/natural-language/docs/analyzing-sentiment?hl=ja)を参照してください。


## Installation
Cloud Natural Language APIを入力すれば、DEMOの実行に特別な準備は必要ありません。

## Usage
シートに必要事項を入力後、メニューバーより[感情分析]-[感情スコアを取得]を選択すると、新規シートを作成し、自動的に分析されます。


## Note
不明な点や気になる点、改善要望、感想等は下記の連絡先より気軽にご連絡ください。

## Author
- 作成者: 漆畑文哉
- 所属: 静岡大学創造科学技術大学院
- Email: fumiya.urushibata@gmail.com

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />この 作品 は <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">クリエイティブ・コモンズ 表示 - 非営利 4.0 国際 ライセンス</a>の下に提供されています。

内容は2021年9月16日時点のものです。
