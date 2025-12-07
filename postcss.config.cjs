module.exports = {
  plugins: {
    //オートプレフィクサー
    autoprefixer: {},
    //メディアクエリをソートして1つにまとめる
    'postcss-sort-media-queries': {},
    //CSSプロパティの順番をソートする
    // 'css-declaration-sorter':{order:'smacss'},
    //使用していないスタイルを削除する
    // '@fullhuman/postcss-purgecss': {
    //   content: ['./**/*.html','./js/**/*.js'],
    //   //除外設定　https://purgecss.com/safelisting.html
    //   safelist: []
    // },
  },
}