"use strict";

import { defineConfig } from 'vite';

import { resolve } from 'path';

import handlebars from 'vite-plugin-handlebars';

import { createHtmlPlugin } from 'vite-plugin-html';

// HTMLの複数出力を自動化する
//./src配下のファイル一式を取得
import fs from 'fs';
const fileNameList = fs.readdirSync(resolve(__dirname, './src/'));

//htmlファイルのみ抽出
const htmlFileList = fileNameList.filter(file => /.html$/.test(file));

//build.rollupOptions.inputに渡すオブジェクトを生成
const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.slice(0,-5)] = resolve(__dirname, './src/' + file );
}


//HTML上で出し分けたい各ページごとの情報
const pageData = {
  '/index.html': {
    isHome: true,
    title: 'Main Page',
  },
  '/about.html': {
    title: 'About Page',
  },
};


export default defineConfig({
  server: {
    host: true //IPアドレスを有効化
  },
  base: './', //相対パスでビルドする
  root: './src', //開発ディレクトリ設定
  build: {
    outDir: '../dist', //出力場所の指定

    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,

    rollupOptions: { //ファイル出力設定
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          //Webフォントファイルの振り分け
          // if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
          //   extType = 'fonts';
          // }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          //ビルド時のCSS名を明記してコントロールする
          if(extType === 'css') {
            return `assets/css/style.[hash].css`;
          }
          return `assets/${extType}/[name].[hash][extname]`;
        },

        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
      },
      //生成オブジェクトを渡す
      input: inputFiles,
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      removeComments: true
    }),
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, './src/components'),
      //各ページ情報の読み込み
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
});