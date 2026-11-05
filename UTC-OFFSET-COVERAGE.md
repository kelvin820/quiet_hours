# 整點 UTC 時差覆蓋 · 2026-11-05

使用者選擇先涵蓋每個整點 UTC 時差，不要求本輪補齊半小時、45 分鐘時區的專屬素材。既有非整點城市仍可正常搜尋使用。

## 搜尋與時鐘

搜尋清單擴充至 200 座城市／聚落。新增 Pago Pago、Rikitea、Adamstown、Bridgetown、Fernando de Noronha、Praia、Nouméa、Nukuʻalofa、Kiritimati 作為偏遠時區的可選代表；它們目前明確標示為通用光景，不宣稱已有專屬插畫。

`node scripts/audit-timezones.mjs 2026` 使用 IANA 時區資料，逐小時檢查 2026 全年。覆蓋目標為有人居住的整點時差 UTC−11 至 UTC+14，共26帶。UTC−12無常住城市，列為例外，不捏造城市。

不能只比較1月／7月：2026-10-25至29日，歐洲已結束夏令時間而開羅尚未結束，專屬城市短暫缺UTC+2；美國夏令時間切換當天，舊金山與安克拉治也不是同一絕對時刻換鐘，因此以 Adamstown 保留穩定UTC−8代表。

## 專屬插畫與3D：下一批建議

現有7城加使用者指定9城後，共16座專屬城市。下列17個時差帶在一年中的至少某些日期仍缺專屬城市；這不是說它們全年都缺，也不是最少城市數量的數學證明。建議用不實施夏令時間的固定代表補強，避免依賴不同城市輪流覆蓋。

| UTC | 建議城市／聚落 | IANA 時區 | 目前場景 |
|---|---|---|---|
| −11 | Pago Pago 帕果帕果 | Pacific/Pago_Pago | 通用 |
| −9 | Rikitea 里基泰阿／甘比爾群島 | Pacific/Gambier | 通用 |
| −8 | Adamstown 亞當斯敦／皮特肯島 | Pacific/Pitcairn | 通用；當地無機場，不指定IATA |
| −7 | Phoenix 鳳凰城 | America/Phoenix | 通用 |
| −5 | Bogotá 波哥大 | America/Bogota | 通用 |
| −4 | Bridgetown 橋鎮／巴貝多 | America/Barbados | 通用 |
| −2 | Fernando de Noronha 費爾南多迪諾羅尼亞 | America/Noronha | 通用 |
| −1 | Praia 普拉亞／維德角 | Atlantic/Cape_Verde | 通用 |
| 0 | Reykjavík 雷克雅維克 | Atlantic/Reykjavik | 通用 |
| +2 | Cape Town 開普敦 | Africa/Johannesburg | 通用 |
| +5 | Karachi 喀拉蚩 | Asia/Karachi | 通用 |
| +6 | Dhaka 達卡 | Asia/Dhaka | 通用 |
| +10 | Brisbane 布里斯本 | Australia/Brisbane | 通用 |
| +11 | Nouméa 努美阿 | Pacific/Noumea | 通用 |
| +12 | Nadi 楠迪／斐濟 | Pacific/Fiji | 通用 |
| +13 | Nukuʻalofa 努瓜婁發／東加 | Pacific/Tongatapu | 通用 |
| +14 | Kiritimati 基里蒂馬蒂島 | Pacific/Kiritimati | 通用 |

以上專屬素材城市選擇待使用者確認，本輪不自動擴大插畫製作範圍。Kiritimati主名稱不使用London，避免與英國倫敦搜尋衝突。

## 本輪新增九城

Sydney雪梨、Tokyo東京（接受Toky）、Dubai杜拜、Rio de Janeiro里約熱內盧、Cairo開羅、Riyadh利雅德、Bangkok曼谷、Honolulu檀香山（Hawaii）、Mexico City墨西哥城（Mexico）。九城各8幅獨立時段插畫，總專屬資產128幅。利雅德與墨西哥城使用乾地公園／廣場構圖，關閉水面位移，不虛構河流。

## 參考

- [IANA 太平洋／澳洲規則](https://data.iana.org/time-zones/tzdb/australasia)
- [IANA 非洲規則](https://data.iana.org/time-zones/tzdb/africa)
- [IANA 南美洲規則](https://data.iana.org/time-zones/tzdb/southamerica)
- [澳洲央行：夏令時間日期](https://www.rba.gov.au/schedules-events/daylight-saving.html)
- [美國魚類及野生動物署：Baker Island 無人居住](https://www.fws.gov/refuge/baker-island)

時區是民用時間規則，繼續使用 IANA 名稱計算，不把城市永久綁死在固定UTC標籤。
