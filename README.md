# commusidewalk app

平安走路許願帳戶互動式地圖 Web App

👉[Demo](https://commusidewalk-app.vercel.app/)

- [主文件](https://docs.google.com/document/d/1b_00BjDMkuyZISHzfEKU9DDw32BqmQ95k-O-bshxBQ0/edit)
- [本程式文件](https://docs.google.com/document/d/1rU3uT3WfwCt3sVCViWHzoIisY5P64AMGAUk9i2fiSEM/edit#)

## Developing

本站是 nodejs 寫的，網頁框架為 sveltekit，套件管理器是 yarn。

Once you've cloned a project and installed dependencies with `yarn`, start a development server:

```bash
yarn # 安裝必要套件
yarn dev # 開啟開發伺服器(按o可以打開瀏覽器)
yarn format # format 所有檔案
yarn build # 打包
```

## 更新資料步驟

1. cd commusidewalk
2. run commusidewalk/main.R
3. cd commusidewalk-app
4. raku copy.raku # copy last modified file (should be YYYYmmdd_vill.csv) to static/data/data.csv
5. done :)
