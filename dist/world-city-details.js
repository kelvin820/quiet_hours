const source=(name,url,availability='unknown')=>({name,url,type:'external',availability,checkedOn:'2026-11-05'});
export const worldCityDetails={
 sydney:{foliageAsset:'eucalyptus-right-foliage.png',country:'AUSTRALIA · 澳洲',caption:'帆影與海風，留住一個午後。',foliageSide:'right',focus:.25,live:source('WebcamSydney · 雪梨港','https://webcamsydney.com/')},
 tokyo:{clockX:.78,foliageAsset:'cherry-left-foliage.png',country:'JAPAN · 日本',caption:'隅田川的光，慢慢經過東京。',foliageSide:'left',focus:.29,live:source('東京鐵塔官方 · 公開直播','https://www.youtube.com/@TOKYOTOWER333/streams')},
 dubai:{clockX:.78,foliageAsset:'palm-right-foliage.png',country:'UAE · 阿聯酋',caption:'沙漠的暖光，映在城市之間。',foliageSide:'right',focus:.30,live:source('SkylineWebcams · Princess Tower','https://www.skylinewebcams.com/webcam/united-arab-emirates/dubai/dubai/dubai.html','offline')},
 riodejaneiro:{foliageAsset:'tropical-left-foliage.png',country:'BRAZIL · 巴西',caption:'山與海，把里約的時間放慢。',foliageSide:'left',focus:.27,live:source('EarthCam · Copacabana 海灘','https://www.earthcam.com/world/brazil/riodejaneiro/index.php?cam=rio_copacabana')},
 cairo:{foliageAsset:'palm-right-foliage.png',country:'EGYPT · 埃及',caption:'尼羅河，靜靜流過千年的光。',foliageSide:'right',focus:.30,live:source('SkylineWebcams · 吉薩金字塔','https://www.skylinewebcams.com/en/webcam/egypt/cairo/cairo/le-piramidi-di-giza-il-cairo.html','offline')},
 riyadh:{clockX:.78,foliageAsset:'palm-right-foliage.png',country:'SAUDI ARABIA · 沙烏地阿拉伯',caption:'在棕櫚與沙色之間，停一會兒。',foliageSide:'right',focus:.29,dry:true,live:source('My EarthCam · 利雅德社群攝影機','https://myearthcam.com/saudi')},
 bangkok:{clockX:.78,foliageAsset:'tropical-left-foliage.png',country:'THAILAND · 泰國',caption:'湄南河畔，金色的光慢慢散開。',foliageSide:'left',focus:.28,live:source('SkylineWebcams · 曼谷街景','https://www.skylinewebcams.com/en/webcam/thailand/central-thailand/bangkok.html')},
 honolulu:{foliageAsset:'palm-right-foliage.png',country:'HAWAII, USA · 夏威夷',caption:'讓海風，替今天留一點空白。',foliageSide:'right',focus:.27,live:source('EarthCam × Hilton · Waikiki','https://www.earthcam.com/usa/hawaii/waikiki/?cam=windjammer')},
 mexicocity:{clockX:.78,foliageAsset:'jacaranda-left-foliage.png',country:'MEXICO · 墨西哥',caption:'藍花楹下，等一束溫柔的光。',foliageSide:'left',focus:.28,dry:true,live:source('Webcams de México · 墨西哥城','https://webcamsdemexico.com/webcams/cdmx/')}
};
