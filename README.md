# 前提
Node.jsがインストールされている  
v16・18系で動作確認済み

HTMLはVSCodeの拡張機能でプレビュー

# ディレクトリ構成
動作確認時の構成、ここは自由に変更可能  
scss・cssファイルの名前・位置を変更する場合は、package.jsonのscriptsのパスを変更する
```
./
├── README.md
├── package.json
├── index.html ← HTMLファイル、コンパイル後のCSSファイルを読み込む
├── scss/
│   |── style.scss
│   |── 他のscssファイル
|── css/
|   └── style.css ← コンパイルされたファイル、最初は不要
|── js等その他ファイル
```

# 使い方
## 初期設定
### インストール
`npm i`

## コーディングする時
### 開発用コマンドを実行
`npm run dev:sass`  
scssファイルを編集すると自動でコンパイルされる

## サーバーにアップロード・納品する時
### 圧縮してコンパイルする
`npm run build:sass`