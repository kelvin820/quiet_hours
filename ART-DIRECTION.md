# 第一輪美術小樣與批次規格

## 台北：紙上日常
原創水粉與色鉛筆、淡象牙紙感、低飽和綠與陶土色。河岸、低矮住宅、遠山及台北101。

工具：內建 image_gen；專案素材：dist/assets/taipei-day.png。

生成 prompt（完整）：
Use case: illustration-story. Asset type: original background plate for a calm Taipei city clock web app. Create a beautiful wide landscape editorial illustration of Taipei viewed across a quiet riverside: recognisable Taipei 101 in the right half at medium distance, layered low apartment blocks, small old tiled roofs, lush subtropical trees and distant mountains. Gentle handmade gouache and colored pencil on warm ivory paper, muted sage green, dusty blue, soft terracotta, fine subtle grain, sophisticated picture book for adults. Fixed eye-level wide composition, city occupies lower two thirds, spacious pale warm sky above with NO clouds (clouds will be separate animated layers). River along bottom reflecting the city. Quiet morning diffuse light. Entire artwork full bleed, no borders, NO lettering, NO typography, NO clock face, NO interface, NO watermarks, no people. Avoid photorealism, neon, glossy 3D. Landscape 1536x1024. Keep landmarks coherent and architectural silhouettes elegant.

本輪保留原創底圖，雲層、反光、夜色、窗光由程式疊加。正式動態版需進一步分離前景樹葉、建築與天空遮罩，再製作一致的夜間光源貼圖。

## 巴黎：立體光景
固定視角、霧面模型、石灰岩街屋、低飽和草地、塞納河與程序生成的艾菲爾鐵塔。使用真實太陽方位及高度驅動光影，不對應真實天氣。

## 七城批量流程（待選定主風格後）
1. 以本輪選定的風格母版鎖定相機、材質、色盤與畫面安全區。
2. 七城每城日景、夜景參考各一張，先校準 14 張概念；以參考圖編輯保持構圖，避免逐張獨立生圖漂移。
3. 逐城輸出天空、遠景、地標、近景、可動物件及夜燈遮罩；做透明邊緣、遮擋與手機裁切檢查。
4. 時鐘、城市名與文字由程式繪製；各城獨立時鐘造型，共用可讀性規格。
5. 用同一份素材清單登記城市、時區、座標、IATA 別名、焦點、安全區與資產來源。
6. 動態以雲、光、樹葉、水面為主，預設靜音，減少動態模式完全停止環境循環。
