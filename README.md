# 富程量化 · 2140  VIP 跟單收益儀表板（PWA）

一個專為 VIP 客戶設計的跟單戰報 App，可直接「加入主畫面」於 iPhone 桌面開啟。
深色科技風格、母帳號收益狀況一目了然，並自動計算年化報酬率（APR）。

---

## 📦 檔案內容

```
fucheng-pwa/
├─ index.html              ← 主程式
├─ manifest.webmanifest    ← PWA 設定
├─ sw.js                   ← Service Worker（離線支援）
├─ icon-192.png            ← 圖示
├─ icon-512.png
├─ icon-512-maskable.png
├─ icon-180.png            ← Apple touch icon
├─ icon-167.png            ← iPad
├─ icon-152.png            ← iPad mini
├─ favicon-32.png
├─ favicon-16.png
└─ README.md
```

所有資料儲存在 iPhone 本地（localStorage），**不上傳任何雲端**。

---

## 🚀 部署到 iPhone（三選一）

> 💡 **重要說明**：`index.html` 已內嵌 logo（base64），所以單獨上傳 `index.html` 即可看到完整介面、不會破圖。
> 但 **iPhone 桌面圖示** 仍需要 PNG 檔（PWA 規範要求），建議 **連同所有 PNG 一起上傳整個資料夾**才能拿到 logo 桌面圖示。

### 方案 A：GitHub Pages（最推薦，免費，3 分鐘完成）

1. 到 [github.com](https://github.com) 建立一個 **public** repo（例如 `fucheng-2140`）。
2. 把整個資料夾的檔案上傳到 repo（拖拉即可）。
3. 進入 repo → **Settings → Pages**，Source 選 `Deploy from a branch`，Branch 選 `main` / `(root)`，按 Save。
4. 約 1 分鐘後，網址為 `https://你的帳號.github.io/fucheng-2140/`。
5. 用 **iPhone Safari** 開啟該網址。
6. 點擊下方「分享」→ **加入主畫面（Add to Home Screen）**。
7. 完成 — 桌面就有富程量化 App 圖示了。

### 方案 B：Netlify Drop（最快，30 秒）

1. 到 [app.netlify.com/drop](https://app.netlify.com/drop)。
2. 把整個 `fucheng-pwa` 資料夾拖進去。
3. 取得網址（例如 `https://xxx.netlify.app`）。
4. 用 iPhone Safari 開啟 → 加入主畫面。

### 方案 C：自架伺服器 / Nginx

把整個資料夾放到任意 HTTPS 路徑下，確保 `index.html`、`manifest.webmanifest`、`sw.js`、所有 `*.png` 都在同一目錄即可。

> ⚠️ PWA 必須走 **HTTPS** 才能正常安裝。直接從 iCloud / 檔案 App 開啟 HTML 不會具備 PWA 全螢幕模式。

---

## 📱 iPhone 加入主畫面

1. iPhone Safari 開啟你的部署網址
2. 下方工具列點擊 **分享按鈕** （箭頭往上的方框）
3. 下滑找到 **「加入主畫面」**
4. 名稱已預設為「富程量化」，點 **加入**
5. 桌面圖示就是你的 2140 logo，全螢幕開啟

---

## 🧮 計算邏輯

| 項目 | 公式 |
|---|---|
| 月返佣金額 | `收益額 × 節點返佣%` |
| 累計返佣 | `Σ 月返佣金額` |
| 總資產淨值 | `初始本金 + 累計返佣` |
| 累計收益率 | `累計返佣 ÷ 初始本金` |
| **年化 APR** | `(累計返佣 ÷ 初始本金) × (365 ÷ 運行天數)` |

設計上**本金（單位數）**保留在交易帳戶不動，**返佣（配息）**累積在資金帳戶，與 OKX 跟單機制一致。

---

## ✨ 功能總覽

- ✅ 初始本金、起始日期一次設定
- ✅ 每月登錄：收益額 / 收益率% / 節點返佣%
- ✅ 自動計算月返佣金額並累計
- ✅ 雙帳戶顯示：交易帳戶（單位數）+ 資金帳戶（配息）
- ✅ 年化報酬率 APR 即時顯示
- ✅ 累計返佣走勢圖（SVG）
- ✅ 一鍵匯出 VIP 戰報（複製 / 下載 .txt）
- ✅ 資料備份 / 還原（JSON）
- ✅ 編輯 / 刪除月度紀錄
- ✅ 離線可用（Service Worker）
- ✅ 全 Traditional Chinese / 深色科技風格

---

## 🛡️ 資料安全

- 所有資料只存在 iPhone 本地（瀏覽器 localStorage）
- 不上傳、不追蹤、無分析腳本
- 建議**每月一次點選「設定 → 備份資料」**下載 JSON 檔，避免 iOS 清除瀏覽器資料時遺失

---

## 🛠️ 自訂

- 改色：在 `index.html` 開頭 `:root { ... }` 區塊調整 CSS 變數
- 改 Logo：替換 `icon-*.png` 與 `favicon-*.png` 即可
- 改名稱：編輯 `manifest.webmanifest` 的 `name` / `short_name`，以及 `index.html` 中的 `apple-mobile-web-app-title`

---

Built with ❤️ for 富程量化 · 2140
