# commusidewalk app

平安走路許願帳戶互動式地圖 Web App

👉[Demo](https://commusidewalk-app.vercel.app/)

- [主文件](https://docs.google.com/document/d/1b_00BjDMkuyZISHzfEKU9DDw32BqmQ95k-O-bshxBQ0/edit)
- [本程式文件](https://docs.google.com/document/d/1rU3uT3WfwCt3sVCViWHzoIisY5P64AMGAUk9i2fiSEM/edit#)

## Developing

本站以 nodejs 為底，網頁框架為 sveltekit，套件管理器是 yarn。

```sh
git clone https://github.com/FOBshippingpoint/commusidewalk-app.git # 克隆到你的電腦
cd commusidewalk-app # 切換至專案目錄

yarn        # 安裝必要套件
yarn dev    # 開啟開發伺服器(按o可以打開瀏覽器)

# 以下看時機執行
yarn format # format 所有檔案
yarn build  # 打包
```

## 更新資料

更新資料有手動或自動兩種方法。

### 手動

至 [commusidewalk/output](https://github.com/FOBshippingpoint/commusidewalk) 下載最新 village 結尾的 csv 檔。然後重新命名檔案為`data.csv`並放入`static/data/`底下。接著打開`.env`檔編輯`PUBLIC_UPDATE_DATE`成對應日期(如果`.env`檔案不存在請自行新增)。

```text
# .env 範例
PUBLIC_UPDATE_DATE = 2023/02/25
```

### 自動

1. 安裝 [Raku](https://raku.org/downloads) (aka Perl6)
2. run `raku update-data.raku`
