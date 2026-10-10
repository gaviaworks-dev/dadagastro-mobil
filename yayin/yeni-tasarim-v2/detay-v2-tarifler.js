/* Ek tarif verisi (yalnız detay-v2): canlı https://dadagastro.com/tarif/{slug} sayfasından salt okuma ile çıkarıldı
   (docs/detay-v2-extract.mjs). Şema ld-source.js DATA.recipes + PARITY.recipes ile aynıdır. Ortak veri dosyası değişmez:
   kayıtlar kaynak runtime'ın ilk "tarif" parametresi okumasından hemen önce belleğe eklenir. */
// Gelen #adimlar/#yorumlar: tarayıcının yükleme sonrası (smooth) çapa kaydırması engellenir; sekme detay-v2.js'te anında açılır.
if(/^#(adimlar|yorumlar)$/.test(location.hash)){window.DV2_INITIAL_HASH=location.hash;history.replaceState(history.state,'',location.pathname+location.search);}
window.DV2_EXTRA=[
 {
  "recipe": {
   "title": "Mısır Koçanı Jölesi | Tanesi Alınmış Koçan Suyundan Bal Renkli Jöle",
   "url": "https://dadagastro.com/tarif/misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp",
   "category": "Reçel",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
   "description": "Tanesi alınmış mısır koçanı atılır mı? Koçanların kaynatma suyunu limon ve pektinle bal renkli bir jöleye bağlayan, buzdolabında saklanan çiftlik kavanozu.",
   "author": "Tarık Kaptan",
   "servings": 60,
   "unit": "kişilik",
   "minutes": 105,
   "ratingCount": 4,
   "ingredients": [
    {
     "name": "tanesi alınmış taze mısır koçanı",
     "amount": 8,
     "unit": "adet"
    },
    {
     "name": "su",
     "amount": 2000,
     "unit": "ml"
    },
    {
     "name": "limon suyu",
     "amount": 60,
     "unit": "ml"
    },
    {
     "name": "toz pektin",
     "amount": 12,
     "unit": "g"
    },
    {
     "name": "toz şeker",
     "amount": 750,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Koçanları hazırla",
     "body": "Mısırların tanelerini başka bir yemek için bıçakla koçandan kesin ve koçanları aynı gün kullanın. Koçanları soğuk suda fırçayla yıkayın, uçlardaki kurumuş ya da kararmış kısmı kesip atın ve her koçanı üç parçaya bölün.",
     "time": "15 dk"
    },
    {
     "title": "Kaynat",
     "body": "Koçanları 2 litre suyla geniş bir tencereye alın, kaynatın ve kapak aralık orta ateşte 40 dakika kaynatın. Su bal rengine döner ve hafifçe koyulaşır.",
     "time": "45 dk"
    },
    {
     "title": "Süz",
     "body": "Koçanları çıkarın, suyu tülbent serili süzgeçten geçirin ve 750 ml ölçün; fazlaysa kaynatarak azaltın, eksikse su ekleyin.",
     "time": "10 dk"
    },
    {
     "title": "Pektinle kaynat",
     "body": "Pektini 50 g şekerle bir kapta iyice karıştırın; şekerle harmanlanmayan pektin topaklanır. Koçan suyunu ve limon suyunu geniş bir tencereye alın, pektinli şekeri çırparak serpin ve sürekli karıştırarak yüksek ateşte kaynatın.",
     "time": "10 dk"
    },
    {
     "title": "Şekeri ekle, jöle noktasını yakala",
     "body": "Karıştırsanız da bastırılamayan fokurtuyla kaynamaya başlayınca kalan şekeri bir seferde ekleyin. Yeniden aynı kaynamaya gelince 2 dakika pişirin. Soğuk tabağa damlatılan jöle 1 dakika sonra itildiğinde kırışıyorsa ya da termometre 104–105 °C gösteriyorsa ocaktan alın ve köpüğünü süzün.",
     "time": "10 dk"
    },
    {
     "title": "Kavanozla",
     "body": "Kavanozları ve kapaklarını kaynar suda 10 dakika kaynatarak sterilize edin. Jöleyi sıcakken doldurun, 0,5–1 cm ağız payı bırakın, ağız kenarını temiz ıslak bezle silip kapatın. Soğuyunca buzdolabına kaldırın.",
     "time": "10 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 2,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Mısır düşük asitli bir sebzedir: bu jöle kaynar su banyosuyla kilere kaldırılmaz, buzdolabında saklanır ve 4 hafta içinde tüketilir; limon suyunu azaltmayın. Jöle kavanozda tam donmak için 24 saat ister, bu bekleme süreye sayılmaz."
     }
    ],
    "tags": [],
    "features": [
     "Reçel",
     "Vegan",
     "Vejetaryen",
     "Glutensiz",
     "Süt İçermez",
     "Az Yağlı",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon60 kişilik",
     "Hazırlık + Pişirme 25 dk + 80 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Koçan suyu için"
    },
    {
     "name": "tanesi alınmış taze mısır koçanı",
     "note": "",
     "quantity": "8 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "2000 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Jöle için"
    },
    {
     "name": "limon suyu",
     "note": "",
     "quantity": "60 ml",
     "unit": "ml",
     "substitutes": [
      "sitrik asit — 60 ml limon suyu yerine 4 g, 1 yemek kaşığı suda eritilerek; asitlik aynı kalır ama limon kokusu gelmez"
     ],
     "sponsor": ""
    },
    {
     "name": "toz pektin",
     "note": "",
     "quantity": "12 g",
     "unit": "gram",
     "substitutes": [
      "elma kabuğu ve çekirdek evi — 8 ekşi elmanınki (yaklaşık 400 g) tülbente bağlanıp sıvıyla birlikte 30 dakika kaynatılır ve çıkarılır; ek pektin gerekmez ama pişirme uzar ve hafif elma tadı geçer"
     ],
     "sponsor": ""
    },
    {
     "name": "toz şeker",
     "note": "",
     "quantity": "750 g",
     "unit": "gram",
     "substitutes": [
      "esmer şeker — jöle bal renginden koyu kehribara döner ve karamel tadı koçan kokusunu örter"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "1",
   "chef": {
    "info": "Tarık Kaptan\nMutfak Meraklısı\n2026'dan beri üye",
    "meta": [
     "Tarif3",
     "Takipçi13"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Reçel",
     "href": "https://dadagastro.com/tarifler/kategori/recel"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Az Yağlı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "52 kcal",
      "label": "Kalori"
     },
     {
      "value": "0 g",
      "label": "Protein"
     },
     {
      "value": "12.9 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "0 g",
      "label": "Yağ"
     },
     {
      "value": "0 g",
      "label": "Lif"
     },
     {
      "value": "12.6 g",
      "label": "Şeker"
     },
     {
      "value": "1 mg",
      "label": "Sodyum"
     },
     {
      "value": "0 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %0",
     "Karbonhidrat %100",
     "Yağ %0"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Şadok Kabuğu Reçeli | Kalın Kabuklu Pomelodan Şerbetli Kabuk Reçeli",
     "url": "https://dadagastro.com/tarif/sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Mürver Çiçeği Jölesi | Limonlu Çiçek Demlemesinden Berrak Bahar Jölesi",
     "url": "https://dadagastro.com/tarif/murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Japon Ayvası Jölesi | Süs Ayvasının Sert Meyvesinden Kendi Pektiniyle Donan Jöle",
     "url": "https://dadagastro.com/tarif/japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Jamaika Usulü Ananas Zencefil Reçeli | Dondurucuya Ayrılan Kavanoz",
     "url": "https://dadagastro.com/tarif/jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
     "image": "https://dadagastro.com/varliklar/media/8499.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "4"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Nadir Cebeci",
     "rating": null,
     "body": "Pektini şekerden önce kaynatmak sırası önemli, tersini yapınca jöle tutmadı. İkinci kavanozda sıraya uydum ve aynı koçan suyuyla düzgün bir jöle çıktı, yani mesele koçanda değil sıradaymış.",
     "date": "3 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Merve Öcal",
     "rating": null,
     "body": "Limon suyunu ölçüsünde koydum, tatlılığı kesmiş ama ekşi de değil.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Ferhat Yenice",
     "rating": null,
     "body": "Tanesi alınmış koçanı çöpe atmamak fikri hoşuma gitti, iki mısırdan bir kavanoz çıktı. Koçanları hemen kaynatmak gerekiyor, buzdolabında bir gün beklettiğim koçanlardan çıkan su daha zayıf ve renksizdi.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Şeyma Balcı",
     "rating": 5,
     "body": "Süzerken tülbenti sıkmayın, bulanık jöle oluyor. Kendi ağırlığıyla damlasın, bende bir saat sürdü. Acele edip sıktığım ilk partide jöle donunca içinde asılı kalan parçacıklar göründü, tadı aynıydı ama kavanoz çamurlu duruyordu.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Nurgül Ocakçı",
     "rating": null,
     "body": "Bende jöle noktası 15 dakikada gelmedi, 22 dakika sürdü. Koçanlar tazeydi, suyu boldu herhâlde. Süreyi uzatırken ateşi yükseltmedim, yüksek ateşte şeker kenarlarda karamelleşip jölenin rengini koyulaştırıyor.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Tarık",
       "body": "Süre koçanın suyuna göre değişiyor, saat yerine soğuk tabak deneyine bakın: bir damla şurup tabakta buruşuyorsa nokta gelmiştir.",
       "date": "1 ay önce"
      }
     ]
    },
    {
     "author": "Perihan Ulusoy",
     "rating": null,
     "body": "Koçanları kaynatmadan önce ikiye kırdım, daha çok yüzey suya değdi ve renk bal rengine yaklaştı. Bıçakla kesmek yerine elle kırmak daha iyi, kesilen yüzden koçan tozu çıkıp suyu bulandırıyor.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-adim1.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-adim5.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vegan",
     "vejetaryen",
     "glutensiz",
     "sut-icermez",
     "az-yagli"
    ],
    "mutfak": [],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Mısır koçanı jölesi, taneleri bıçakla kesilerek alınmış taze koçanların kaynatılıp bu suyun pektin ve şekerle jöleye bağlanmasıyla yapılan eski bir çiftlik kavanozudur. Koçan suyu bal renginde çıkar ve jöleye balı andıran, hafif tahıl kokulu bir tat verir; kırmızı ya da mor koçan kullanılırsa jöle pembeye çalar. Taneler yemeğe, koçan kavanoza gider; çoğu mutfakta çöpe atılan bir parça değerlendirilir."
  },
  "captured": "2026-10-09"
 },
 {
  "recipe": {
   "title": "Şadok Kabuğu Reçeli | Kalın Kabuklu Pomelodan Şerbetli Kabuk Reçeli",
   "url": "https://dadagastro.com/tarif/sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp",
   "category": "Reçel",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
   "description": "Şadoğun atılan kalın kabuğu reçele nasıl dönüşür? Dört suda haşlanıp sıkılarak acısı alınan ve şerbeti sünger gibi çeken pomelo kabuğu reçeli.",
   "author": "Ömer Polat",
   "servings": 41,
   "unit": "kişilik",
   "minutes": 135,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "şadok (yaklaşık 1,5 kg, yalnız kabuğu)",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "toz şeker",
     "amount": 500,
     "unit": "g"
    },
    {
     "name": "su",
     "amount": 400,
     "unit": "ml"
    },
    {
     "name": "limon suyu",
     "amount": 30,
     "unit": "ml"
    }
   ],
   "steps": [
    {
     "title": "Kabuğu ayır ve şerit kes",
     "body": "Şadoğu yıkayıp dış yüzünü rendenin ince yüzüyle hafifçe rendeleyin, yeşil-sarı yağlı katmanı alın. Kabuğu dilimler hâlinde meyveden ayırın, eti ayrıca yenmek üzere kaldırın. Kabuğun iç yüzüne yapışık kalan dilim zarlarını sıyırın, beyaz kabuğu 1 cm eninde şeritler hâlinde kesip tartın; yaklaşık 500 g çıkmalı.",
     "time": "15 dk"
    },
    {
     "title": "Acısını al",
     "body": "Şeritleri tencereye alıp üzerini geçecek kadar suyla kaynatın ve 10 dakika haşlayın. Süzün, kevgirde avucunuzla bastırarak suyunu sıkın; sünger gibi kabuk acı suyu ancak böyle bırakır. Temiz suyla aynı işlemi toplam dört kez yapın; dördüncüden sonra şeridin tadı yalnız hafif acımsı kalmalı.",
     "time": "55 dk"
    },
    {
     "title": "Şerbette pişir",
     "body": "Şekerle 400 ml suyu kaynatın ve sıkılmış şeritleri ekleyin. Kısık ateşte, tencereyi arada sallayarak 40 dakika pişirin; şeritler şerbeti çektikçe yarı saydamlaşır. Limon suyunu ekleyin, şerbet 104–105 °C'ye gelince ya da soğuk tabakta yerinde durunca ocaktan alın.",
     "time": "45 dk"
    },
    {
     "title": "Kavanozla",
     "body": "Pişirme sürerken kavanozları ve kapaklarını sıcak sabunlu suyla yıkayıp kaynar suda 10 dakika kaynatın, doldurana kadar sıcak suda bekletin. Reçeli sıcakken sıcak kavanozlara doldurun, 0,5–1 cm ağız payı bırakın ve ağız kenarını temiz ıslak bezle silip kapatın. Kilerde saklanacak kavanozları kapakları kapalı olarak kaynar su banyosunda 10 dakika tutun.",
     "time": "15 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Haşlanan kabuğu sıkarken avucunuzla bastırın, bükmeyin; bükülen şerit dağılır ve reçelde lapaya döner. Kavanozların soğuyup kapaklarının içe çökmesi birkaç saat sürer; bu bekleme süreye sayılmaz."
     }
    ],
    "tags": [],
    "features": [
     "Reçel",
     "Vegan",
     "Vejetaryen",
     "Glutensiz",
     "Süt İçermez",
     "Az Yağlı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon41 kişilik",
     "Hazırlık + Pişirme 30 dk + 105 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Reçel için"
    },
    {
     "name": "şadok (yaklaşık 1,5 kg, yalnız kabuğu)",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "toz şeker",
     "note": "",
     "quantity": "500 g",
     "unit": "gram",
     "substitutes": [
      "esmer şeker — rengi koyulaşır ve hafif karamel tadı gelir"
     ],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "400 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "limon suyu",
     "note": "",
     "quantity": "30 ml",
     "unit": "ml",
     "substitutes": [
      "sitrik asit — 30 ml limon suyu yerine 2 g, 1 yemek kaşığı suda eritilerek; asitlik aynı kalır ama limon kokusu gelmez"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "1",
   "chef": {
    "info": "Ömer Polat\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif36",
     "Takipçi11"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Reçel",
     "href": "https://dadagastro.com/tarifler/kategori/recel"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Az Yağlı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "56 kcal",
      "label": "Kalori"
     },
     {
      "value": "0.1 g",
      "label": "Protein"
     },
     {
      "value": "14 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "0 g",
      "label": "Yağ"
     },
     {
      "value": "1 g",
      "label": "Lif"
     },
     {
      "value": "12.6 g",
      "label": "Şeker"
     },
     {
      "value": "0 mg",
      "label": "Sodyum"
     },
     {
      "value": "0 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %1",
     "Karbonhidrat %99",
     "Yağ %0"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Mısır Koçanı Jölesi | Tanesi Alınmış Koçan Suyundan Bal Renkli Jöle",
     "url": "https://dadagastro.com/tarif/misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Mürver Çiçeği Jölesi | Limonlu Çiçek Demlemesinden Berrak Bahar Jölesi",
     "url": "https://dadagastro.com/tarif/murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Japon Ayvası Jölesi | Süs Ayvasının Sert Meyvesinden Kendi Pektiniyle Donan Jöle",
     "url": "https://dadagastro.com/tarif/japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Jamaika Usulü Ananas Zencefil Reçeli | Dondurucuya Ayrılan Kavanoz",
     "url": "https://dadagastro.com/tarif/jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
     "image": "https://dadagastro.com/varliklar/media/8499.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Rıza Cebeci",
     "rating": null,
     "body": "Pomelonun beyaz kısmını çok bırakmışım, reçel süngerimsi oldu. Bir dahakine pembe ete yakın yeri kazıyacağım.",
     "date": "3 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Ömer",
       "body": "Beyaz kısım şerbeti emdiği için bir miktarı iyi, ama 5 mm'yi geçmesin. Geçerse dediğiniz gibi sünger kıvamı oluyor.",
       "date": "3 hafta önce"
      }
     ]
    },
    {
     "author": "Kerem Yıldıztaş",
     "rating": null,
     "body": "Kabuğun acısını almak için üç su değiştirdim, yine de hafif acı kaldı. Dördüncü suda bir gece bekletince gitti. Suyu her seferinde iyice kaynatıp döktüm; ılık suda bekletmek acılığı almıyor, kabuk sadece şişiyor ve şerbeti sonra emmiyor.",
     "date": "4 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Gamze Sökmen",
     "rating": null,
     "body": "Limon suyunu sona bırakmak doğru yazılmış, başta koyunca şerbet zor koyulaşıyor. Kavanozlarken de şeritleri sıkıştırmayın, aralarına şerbet girmesi gerekiyor; sıkıştırdığım ilk kavanozun ortasındaki kabuklar iki hafta sonra bile sert kaldı.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-adim1.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-adim3.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vegan",
     "vejetaryen",
     "glutensiz",
     "sut-icermez",
     "az-yagli"
    ],
    "mutfak": [],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Şadok, greyfurta benzeyen ama ondan çok daha iri, kabuğu iki parmak kalınlığında bir turunçgildir; eti ayrıca yenir, kabuğu çoğu evde atılır. Bu reçelde o kalın beyaz kabuk şeritler hâlinde kesilip dört suda haşlanarak acısından arındırılır, sonra sünger gibi şerbeti içine çekene kadar pişirilir. Ortaya ısırınca şerbet bırakan, yumuşak ve hafif acımsı kabuk şeritleri çıkar."
  },
  "captured": "2026-10-09"
 },
 {
  "recipe": {
   "title": "Mürver Çiçeği Jölesi | Limonlu Çiçek Demlemesinden Berrak Bahar Jölesi",
   "url": "https://dadagastro.com/tarif/murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp",
   "category": "Reçel",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
   "description": "Mürverin hangi kısmından jöle yapılır? Yalnız kara mürverin açmış çiçeklerinin limonla demlenip pektinle bağlandığı soluk altın renkli bahar jölesi.",
   "author": "Ayşe Şahinkaya",
   "servings": 60,
   "unit": "kişilik",
   "minutes": 80,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "kara mürver çiçeği şemsiyesi (Sambucus nigra, tam açmış)",
     "amount": 20,
     "unit": "adet"
    },
    {
     "name": "su",
     "amount": 750,
     "unit": "ml"
    },
    {
     "name": "limon (dilimlenmiş)",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "limon suyu",
     "amount": 45,
     "unit": "ml"
    },
    {
     "name": "toz pektin",
     "amount": 12,
     "unit": "g"
    },
    {
     "name": "toz şeker",
     "amount": 750,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Çiçekleri ayıkla",
     "body": "Şemsiyeleri silkeleyerek böceklerden arındırın, yıkamayın; kokuyu taşıyan polen suyla gider. Her şemsiyeyi sapından tutup çatalla tarayarak minik çiçekleri bir kaba dökün. Yeşil sapları olabildiğince ayıklayın; sap yenmez ve deme acılık verir.",
     "time": "25 dk"
    },
    {
     "title": "Demle",
     "body": "Suyu kaynatıp ocaktan alın. Çiçekleri ve limon dilimlerini cam ya da çelik bir kaba koyun, sıcak suyu üzerine dökün, kapağını kapatıp soğuyunca buzdolabına ya da serin bir yere kaldırın.",
     "time": "10 dk"
    },
    {
     "title": "Süz",
     "body": "Demi çift kat tülbentten süzün, çiçekleri sıkmayın ki jöle bulanıklaşmasın. 650 ml ölçün; eksikse su tamamlayın.",
     "time": "10 dk"
    },
    {
     "title": "Pektinle kaynat",
     "body": "Pektini 50 g şekerle bir kapta iyice karıştırın; şekerle harmanlanmayan pektin topaklanır. Demi ve limon suyunu geniş bir tencereye alın, pektinli şekeri çırparak serpin ve sürekli karıştırarak yüksek ateşte kaynatın.",
     "time": "10 dk"
    },
    {
     "title": "Şekeri ekle, jöle noktasını yakala",
     "body": "Karıştırsanız da bastırılamayan fokurtuyla kaynamaya başlayınca kalan şekeri bir seferde ekleyin. Yeniden aynı kaynamaya gelince 2 dakika pişirin. Soğuk tabağa damlatılan jöle 1 dakika sonra itildiğinde kırışıyorsa ya da termometre 104–105 °C gösteriyorsa ocaktan alın ve köpüğünü süzün.",
     "time": "10 dk"
    },
    {
     "title": "Kavanozla",
     "body": "Pişirme sürerken kavanozları ve kapaklarını sıcak sabunlu suyla yıkayıp kaynar suda 10 dakika kaynatın, doldurana kadar sıcak suda bekletin. Jöleyi sıcakken sıcak kavanozlara doldurun, 0,5–1 cm ağız payı bırakın ve ağız kenarını temiz ıslak bezle silip kapatın. Kilerde saklanacak kavanozları kapakları kapalı olarak kaynar su banyosunda 10 dakika tutun.",
     "time": "15 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Çiçekler kapalı kapta buzdolabında ya da serin bir yerde 24 saat demlenir; jöle de kavanozda tam donmak için 24 saat ister. İki bekleme de süreye sayılmaz. Kara mürver odunsu dallı bir çalı ya da küçük ağaçtır; otsu gövdeli bodur mürverle (Sambucus ebulus) ve baldıran gibi şemsiye çiçekli otlarla karıştırılmaz, tanımadığınız bitkiyi toplamayın."
     }
    ],
    "tags": [],
    "features": [
     "Reçel",
     "Vegan",
     "Vejetaryen",
     "Glutensiz",
     "Süt İçermez",
     "Az Yağlı",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon60 kişilik",
     "Hazırlık + Pişirme 50 dk + 30 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Demleme için"
    },
    {
     "name": "kara mürver çiçeği şemsiyesi (Sambucus nigra, tam açmış)",
     "note": "",
     "quantity": "20 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "750 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "limon (dilimlenmiş)",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [
      "misket limonu — 3 adet dilimlenerek; jöle daha keskin ve yeşil bir koku alır"
     ],
     "sponsor": ""
    },
    {
     "group": "Jöle için"
    },
    {
     "name": "limon suyu",
     "note": "",
     "quantity": "45 ml",
     "unit": "ml",
     "substitutes": [
      "sitrik asit — 45 ml limon suyu yerine 3 g, 1 yemek kaşığı suda eritilerek; asitlik aynı kalır ama limon kokusu gelmez"
     ],
     "sponsor": ""
    },
    {
     "name": "toz pektin",
     "note": "",
     "quantity": "12 g",
     "unit": "gram",
     "substitutes": [
      "elma kabuğu ve çekirdek evi — 8 ekşi elmanınki (yaklaşık 400 g) tülbente bağlanıp sıvıyla birlikte 30 dakika kaynatılır ve çıkarılır; ek pektin gerekmez ama pişirme uzar ve hafif elma tadı geçer"
     ],
     "sponsor": ""
    },
    {
     "name": "toz şeker",
     "note": "",
     "quantity": "750 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "3",
   "chef": {
    "info": "Ayşe Şahinkaya\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif15",
     "Takipçi1"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Reçel",
     "href": "https://dadagastro.com/tarifler/kategori/recel"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Az Yağlı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "52 kcal",
      "label": "Kalori"
     },
     {
      "value": "0 g",
      "label": "Protein"
     },
     {
      "value": "12.9 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "0 g",
      "label": "Yağ"
     },
     {
      "value": "0 g",
      "label": "Lif"
     },
     {
      "value": "12.6 g",
      "label": "Şeker"
     },
     {
      "value": "1 mg",
      "label": "Sodyum"
     },
     {
      "value": "0 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %0",
     "Karbonhidrat %100",
     "Yağ %0"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Mısır Koçanı Jölesi | Tanesi Alınmış Koçan Suyundan Bal Renkli Jöle",
     "url": "https://dadagastro.com/tarif/misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Şadok Kabuğu Reçeli | Kalın Kabuklu Pomelodan Şerbetli Kabuk Reçeli",
     "url": "https://dadagastro.com/tarif/sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Japon Ayvası Jölesi | Süs Ayvasının Sert Meyvesinden Kendi Pektiniyle Donan Jöle",
     "url": "https://dadagastro.com/tarif/japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Jamaika Usulü Ananas Zencefil Reçeli | Dondurucuya Ayrılan Kavanoz",
     "url": "https://dadagastro.com/tarif/jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
     "image": "https://dadagastro.com/varliklar/media/8499.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-adim1.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-adim5.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vegan",
     "vejetaryen",
     "glutensiz",
     "sut-icermez",
     "az-yagli"
    ],
    "mutfak": [],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Mürver çiçeği jölesi, mayıs-haziranda açan kara mürverin krem rengi çiçek şemsiyelerinin limonla demlenip süzülmesi ve bu demin pektinle soluk altın renkli, berrak bir jöleye bağlanmasıyla yapılır. Kokusu misket üzümünü ve limon çiçeğini andırır; tereyağlı ekmeğe ya da yoğurda yakışır. Yalnız ağaç ya da çalı hâlinde büyüyen kara mürverin (Sambucus nigra) açmış çiçekleri kullanılır; bitkinin yaprağı, sapı, kabuğu ve çiğ meyvesi yenmez."
  },
  "captured": "2026-10-09"
 },
 {
  "recipe": {
   "title": "Japon Ayvası Jölesi | Süs Ayvasının Sert Meyvesinden Kendi Pektiniyle Donan Jöle",
   "url": "https://dadagastro.com/tarif/japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp",
   "category": "Reçel",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
   "description": "Bahçedeki süs ayvasının sert meyvesi ne işe yarar? Kabuğu ve çekirdek eviyle haşlanıp kendi pektiniyle, limonsuz donan kehribar renkli Japon ayvası jölesi.",
   "author": "İrem Pektemek",
   "servings": 55,
   "unit": "kişilik",
   "minutes": 125,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "Japon ayvası (Chaenomeles)",
     "amount": 1000,
     "unit": "g"
    },
    {
     "name": "su",
     "amount": 1500,
     "unit": "ml"
    },
    {
     "name": "toz şeker",
     "amount": 700,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Doğra",
     "body": "Meyveleri yıkayıp kurulayın. Çok sert olduklarından sağlam bir bıçakla önce dörde, sonra ince dilimlere kesin. Kabuğu ve çekirdek evini ayırmayın, pektinin çoğu oradadır; çekirdekleri kırmayın, bütün kalsınlar.",
     "time": "20 dk"
    },
    {
     "title": "Haşla",
     "body": "Dilimleri 1,5 litre suyla tencereye alın, kaynatın ve kapak aralık kısık ateşte 45 dakika pişirin. Dilimler dağılacak kadar yumuşayınca kaşığın arkasıyla tencerede ezin.",
     "time": "50 dk"
    },
    {
     "title": "Süzmeye as",
     "body": "Karışımı ıslatılıp sıkılmış çift kat tülbent serili bir süzgece ya da askıya asılmış tülbent keseye dökün, altına geniş bir kap koyun ve kendi kendine süzülmeye bırakın. Tülbenti sıkmayın; sıkılan su jöleyi bulandırır. Sabah suyu ölçün, yaklaşık 900 ml çıkmalı.",
     "time": "10 dk"
    },
    {
     "title": "Suyu şekerle kaynat",
     "body": "Suyu geniş bir tencerede kaynatın; her 1 litre su için 780 g şeker hesaplayın, 900 ml için 700 g. Şekeri ekleyip eriyene kadar karıştırın ve köpüğünü alarak yüksek ateşte kaynatın. Pektini yüksek bu su genellikle 10–15 dakikada 104–105 °C'ye gelir; soğuk tabağa damlatılan jöle itildiğinde kırışınca ocaktan alın.",
     "time": "25 dk"
    },
    {
     "title": "Kavanozla",
     "body": "Pişirme sürerken kavanozları ve kapaklarını sıcak sabunlu suyla yıkayıp kaynar suda 10 dakika kaynatın, doldurana kadar sıcak suda bekletin. Jöleyi sıcakken sıcak kavanozlara doldurun, 0,5–1 cm ağız payı bırakın ve ağız kenarını temiz ıslak bezle silip kapatın. Kilerde saklanacak kavanozları kapakları kapalı olarak kaynar su banyosunda 10 dakika tutun.",
     "time": "15 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 1,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Tülbentteki meyvenin suyu kendi kendine süzülürken 8–12 saat bekler; bu bekleme süreye sayılmaz ve tülbent sıkılmaz. Japon ayvası zaten çok ekşidir, jöleye limon gerekmez."
     }
    ],
    "tags": [],
    "features": [
     "Reçel",
     "Vegan",
     "Vejetaryen",
     "Glutensiz",
     "Süt İçermez",
     "Az Yağlı",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon55 kişilik",
     "Hazırlık + Pişirme 30 dk + 95 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Jöle için"
    },
    {
     "name": "Japon ayvası (Chaenomeles)",
     "note": "",
     "quantity": "1000 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "1500 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "toz şeker",
     "note": "",
     "quantity": "700 g",
     "unit": "gram",
     "substitutes": [
      "esmer şeker — jöle kehribardan koyu kahveye döner, berraklığı korunur ama meyve kokusu geri planda kalır"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "2",
   "chef": {
    "info": "İrem Pektemek\nAşçı Yamağı\n2026'dan beri üye",
    "meta": [
     "Tarif18",
     "Takipçi7"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "30 Ağustos 2026",
    "Son güncelleme: 30 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Reçel",
     "href": "https://dadagastro.com/tarifler/kategori/recel"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Az Yağlı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=az-yagli"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "53 kcal",
      "label": "Kalori"
     },
     {
      "value": "0 g",
      "label": "Protein"
     },
     {
      "value": "13.2 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "0 g",
      "label": "Yağ"
     },
     {
      "value": "0.1 g",
      "label": "Lif"
     },
     {
      "value": "13 g",
      "label": "Şeker"
     },
     {
      "value": "0 mg",
      "label": "Sodyum"
     },
     {
      "value": "0 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %0",
     "Karbonhidrat %100",
     "Yağ %0"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Mısır Koçanı Jölesi | Tanesi Alınmış Koçan Suyundan Bal Renkli Jöle",
     "url": "https://dadagastro.com/tarif/misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Şadok Kabuğu Reçeli | Kalın Kabuklu Pomelodan Şerbetli Kabuk Reçeli",
     "url": "https://dadagastro.com/tarif/sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Mürver Çiçeği Jölesi | Limonlu Çiçek Demlemesinden Berrak Bahar Jölesi",
     "url": "https://dadagastro.com/tarif/murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Jamaika Usulü Ananas Zencefil Reçeli | Dondurucuya Ayrılan Kavanoz",
     "url": "https://dadagastro.com/tarif/jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
     "image": "https://dadagastro.com/varliklar/media/8499.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Nadir Cebeci",
     "rating": null,
     "body": "Süzmeye asarken torbayı sıkmayın, sıktım ve jöle bulanık oldu. Bu meyvenin pektini bol, ayrıca pektin gerekmedi. Meyveyi çekirdekleriyle birlikte haşlamak gerekiyor, pektinin çoğu çekirdek ve kabukta; ayıklayıp attığım ilk partide jöle hiç donmadı.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "İrem",
       "body": "Torbayı sıkmamak doğru, bulanıklık oradan geliyor. Bu meyvenin pektini gerçekten yüksek, çekirdek ve kabukla haşlamak da o pektini serbest bırakıyor.",
       "date": "4 hafta önce"
      }
     ]
    }
   ],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-adim1.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-adim4.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vegan",
     "vejetaryen",
     "glutensiz",
     "sut-icermez",
     "az-yagli"
    ],
    "mutfak": [],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Japon ayvası (Chaenomeles), bahçelerde erken baharda açan kırmızı çiçekleri için yetiştirilen süs ayvasının sonbaharda sararan, taş gibi sert ve limondan ekşi meyvesidir. Çiğ yenecek kadar yumuşak ya da tatlı değildir ama pişince ayvayı ve ananası andıran yoğun bir koku verir ve pektince çok zengindir. Meyve kabuğu ve çekirdek eviyle haşlanır, suyu tülbentten kendiliğinden süzülür ve bu su ek pektin ya da limon istemeden kehribar renkli bir jöleye bağlanır."
  },
  "captured": "2026-10-09"
 },
 {
  "recipe": {
   "title": "Jamaika Usulü Ananas Zencefil Reçeli | Dondurucuya Ayrılan Kavanoz",
   "url": "https://dadagastro.com/tarif/jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
   "image": "https://dadagastro.com/varliklar/media/8499.webp",
   "category": "Reçel",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz",
   "description": "Ananas zencefil reçeli nasıl yapılır? Ananasın hazırlanması, şekerle bekletilmesi, kaynatılması ve kavanozlanması aşamalarıyla Jamaika usulü dondurucuya uygun…",
   "author": "Emine Demirtaş",
   "servings": 8,
   "unit": "kişilik",
   "minutes": 45,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Ananas soyulmuş, doğranmış",
     "amount": 1,
     "unit": "kg"
    },
    {
     "name": "taze zencefil rendelenmiş",
     "amount": 25,
     "unit": "g"
    },
    {
     "name": "Toz şeker",
     "amount": 1.5,
     "unit": "su bardağı"
    },
    {
     "name": "Limon suyu",
     "amount": 2,
     "unit": "yemek kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Ananası hazırlayın",
     "body": "Ananası soyup küp küp doğrayıp şeker ve limon suyuyla karıştırın.",
     "time": "10 dk"
    },
    {
     "title": "Şekerle bekletin",
     "body": "Karışımı örtüp 10 dakika kendi hâline bırakın, ananas suyunu bırakmaya başlasın.",
     "time": "10 dk"
    },
    {
     "title": "Kaynatın",
     "body": "Karışımı rendelenmiş zencefille bir tencereye alıp kaynatın, kaynamaya başlayınca ateşi kısarak 20 dakika, koyulaşana kadar arada karıştırarak pişirin.",
     "time": "20 dk"
    },
    {
     "title": "Kavanozlayın",
     "body": "Karışımı sıcakken temiz kavanozlara doldurup kapaklarını kapatın, bir kısmını dondurucuya kaldırabilirsiniz.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 84,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Dondurucuya kaldıracağınız kavanozlarda üstte 1-2 santim boşluk bırakın, aksi halde donarken genişleyen karışım kapağı iter. Çözdürdükten sonra buzdolabında bir hafta içinde tüketin."
     }
    ],
    "tags": [],
    "features": [
     "Reçel",
     "Jamaika Mutfağı",
     "Vegan",
     "Vejetaryen",
     "Glutensiz",
     "Laktozsuz",
     "Süt İçermez",
     "Yumurta İçermez",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon8 kişilik",
     "Hazırlık + Pişirme 15 dk + 30 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Ananas soyulmuş, doğranmış",
     "note": "soyulmuş, doğranmış",
     "quantity": "1 kg",
     "unit": "kg",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "taze zencefil rendelenmiş",
     "note": "rendelenmiş",
     "quantity": "25 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Toz şeker",
     "note": "",
     "quantity": "1½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Limon suyu",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8499.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "4",
   "chef": {
    "info": "Emine Demirtaş\nHat Aşçısı\n2026'dan beri üye",
    "meta": [
     "Tarif53",
     "Takipçi11"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "29 Temmuz 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Reçel",
     "href": "https://dadagastro.com/tarifler/kategori/recel"
    },
    {
     "label": "Jamaika Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=jamaika-mutfagi"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Mısır Koçanı Jölesi | Tanesi Alınmış Koçan Suyundan Bal Renkli Jöle",
     "url": "https://dadagastro.com/tarif/misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Şadok Kabuğu Reçeli | Kalın Kabuklu Pomelodan Şerbetli Kabuk Reçeli",
     "url": "https://dadagastro.com/tarif/sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Mürver Çiçeği Jölesi | Limonlu Çiçek Demlemesinden Berrak Bahar Jölesi",
     "url": "https://dadagastro.com/tarif/murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Japon Ayvası Jölesi | Süs Ayvasının Sert Meyvesinden Kendi Pektiniyle Donan Jöle",
     "url": "https://dadagastro.com/tarif/japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vegan",
     "vejetaryen",
     "glutensiz",
     "laktozsuz",
     "sut-icermez",
     "yumurta-icermez",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "jamaika-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Ananasın taze zencefille birlikte kaynatılmasıyla hazırlanan bu karışım, Jamaika mutfağının tropik baharat geleneğinden gelir. Kavanozlara paylaştırılan miktarın bir kısmı dondurucuda aylarca saklanabilir."
  },
  "captured": "2026-10-09"
 },
 {
  "recipe": {
   "title": "Shami Kebap | Pakistan Usulü Nohutlu Yumurtaya Bulanmış Tavada Köfte",
   "url": "https://dadagastro.com/tarif/shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp",
   "category": "Köfte ve Kebap",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
   "description": "Unsuz köfte neyle bağlanır? Etin chana dal ile haşlanıp ezildiği, yumurtaya bulanarak kızartılan Pakistan usulü shami kebap tarifi ve ölçüleri.",
   "author": "Toprak Ekşioğlu",
   "servings": 6,
   "unit": "kişilik",
   "minutes": 120,
   "ratingCount": 4,
   "ingredients": [
    {
     "name": "yağsız dana kuşbaşı",
     "amount": 600,
     "unit": "g"
    },
    {
     "name": "chana dal (kabuğu ayrılmış sarı nohut)",
     "amount": 200,
     "unit": "g"
    },
    {
     "name": "kuru soğan",
     "amount": 150,
     "unit": "g"
    },
    {
     "name": "sarımsak",
     "amount": 6,
     "unit": "diş"
    },
    {
     "name": "taze zencefil",
     "amount": 20,
     "unit": "g"
    },
    {
     "name": "kuru kırmızı biber",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "kimyon tohumu",
     "amount": 2,
     "unit": "çay kaşığı"
    },
    {
     "name": "kişniş tohumu",
     "amount": 2,
     "unit": "çay kaşığı"
    },
    {
     "name": "karabiber tanesi",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "kakule",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "karanfil",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "tarçın çubuğu",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "tuz",
     "amount": 2,
     "unit": "çay kaşığı"
    },
    {
     "name": "su",
     "amount": 700,
     "unit": "ml"
    },
    {
     "name": "yumurta",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "taze kişniş",
     "amount": 20,
     "unit": "g"
    },
    {
     "name": "yeşil acı biber",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "ayçiçek yağı",
     "amount": 150,
     "unit": "ml"
    }
   ],
   "steps": [
    {
     "title": "Bakliyatı süz",
     "body": "Gece boyunca suda bekleyen chana dal'ı süzün, bekleme suyunu dökün ve bol suyla durulayın. Kırık ya da rengi koyulaşmış taneleri ayıklayın; onlar erken dağılıp harcı yapışkan yapar.",
     "time": "6 dk"
    },
    {
     "title": "Eti ve bakliyatı birlikte haşla",
     "body": "Eti, süzülmüş bakliyatı, iri doğranmış soğanı, ezilmiş sarımsağı, dilimlenmiş zencefili, bütün baharatları, tuzu ve suyu bir tencereye alın. Kaynadıktan sonra ateşi kısıp kapağı aralık bırakarak 60 dakika pişirin. Et bir çatalla bastırıldığında lif lif ayrılıyorsa, chana dal da parmak arasında hiç direnmeden eziliyorsa pişmiştir.",
     "time": "60 dk"
    },
    {
     "title": "Suyunu tamamen uçur",
     "body": "Kapağı tamamen açıp ateşi yükseltin ve sık sık karıştırarak tencerenin dibinde hiç sıvı kalmayana kadar 10 dakika pişirin. Tencereyi eğdiğinizde yana akan su görünmemeli. Bu adım shami'nin tavada dağılıp dağılmayacağını tek başına belirler.",
     "time": "10 dk"
    },
    {
     "title": "Ez ve harcı kur",
     "body": "Tarçın çubuğunu ve karanfilleri ayıklayın. Karışımı ılıyınca mutfak robotundan kısa aralıklarla geçirin ya da havanda dövün; hedef pürüzsüz bir püre değil, hamur gibi tutan ama tanesi hissedilen bir harçtır. İnce doğranmış taze kişnişi ve acı biberi ekleyip elle yoğurun, streçleyip buzdolabına kaldırın.",
     "time": "15 dk"
    },
    {
     "title": "Köfteleri şekillendir",
     "body": "Soğuyan harçtan mandalina büyüklüğünde parçalar alıp avuç içinde yuvarlayın ve bir santim kalınlığında yassıltın. Kenarlarda çatlak varsa parmakla düzeltin; çatlaklardan tavada yağ girer ve köfte açılır.",
     "time": "12 dk"
    },
    {
     "title": "Yumurtaya bulayıp kızart",
     "body": "Yumurtaları bir tabakta çırpın. Yağı geniş bir tavada orta ateşte ısıtın, köfteleri tek tek yumurtaya batırıp fazlasını süzdürerek tavaya alın. Her yüzü 3 dakika, yumurta tabakası altın rengi bir kabuk bağlayana kadar kızartın; köfteleri erken çevirmeyin, kabuk oturmadan çevrilen köfte tavaya yapışır.",
     "time": "15 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 1,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Chana dal bir gece önceden suda bekletilir ve bu süre pişirmeye dahil değildir. Ezilen harç şekillendirilmeden önce en az 30 dakika buzdolabında dinlenir; soğuyan harç tavada tutunur, ılık harç yayılıp dağılır. Alerjen: Malzeme listesine göre yumurta içerir. Paketli ürünlerin diğer alerjenleri için ürün etiketini kontrol edin."
     }
    ],
    "tags": [],
    "features": [
     "Köfte ve Kebap",
     "Pakistan Mutfağı",
     "Protein Ağırlıklı",
     "Glutensiz",
     "Acılı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon6 kişilik",
     "Hazırlık + Pişirme 35 dk + 85 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Harç için"
    },
    {
     "name": "yağsız dana kuşbaşı",
     "note": "",
     "quantity": "600 g",
     "unit": "gram",
     "substitutes": [
      "kuzu kuşbaşı — daha yağlı ve daha yoğun bir tat verir, haşlama süresi 10 dakika uzar"
     ],
     "sponsor": ""
    },
    {
     "name": "chana dal (kabuğu ayrılmış sarı nohut)",
     "note": "",
     "quantity": "200 g",
     "unit": "gram",
     "substitutes": [
      "sarı mercimek — 15 dakika daha kısa pişer ve harcı biraz daha yumuşak bağlar"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "150 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sarımsak",
     "note": "",
     "quantity": "6 diş",
     "unit": "dis",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "taze zencefil",
     "note": "",
     "quantity": "20 g",
     "unit": "gram",
     "substitutes": [
      "hazır zencefil-sarımsak ezmesi — 2 yemek kaşığı kullanılır ve sarımsak ayrıca eklenmez"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru kırmızı biber",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [
      "pul biber — 2 çay kaşığı kullanılır, acılığı daha keskin ve daha az meyvemsi olur"
     ],
     "sponsor": ""
    },
    {
     "name": "kimyon tohumu",
     "note": "",
     "quantity": "2 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kişniş tohumu",
     "note": "",
     "quantity": "2 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber tanesi",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kakule",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karanfil",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tarçın çubuğu",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "2 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "700 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Şekillendirmek ve kızartmak için"
    },
    {
     "name": "yumurta",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "taze kişniş",
     "note": "",
     "quantity": "20 g",
     "unit": "gram",
     "substitutes": [
      "maydanoz — kişnişin sabunsu kokusunu sevmeyenler için, tadı daha nötrdür"
     ],
     "sponsor": ""
    },
    {
     "name": "yeşil acı biber",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "ayçiçek yağı",
     "note": "",
     "quantity": "150 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "4",
   "chef": {
    "info": "Toprak Ekşioğlu\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif7",
     "Takipçi15"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "08 Eylül 2026",
    "Son güncelleme: 08 Eylül 2026"
   ],
   "features": [
    {
     "label": "Köfte ve Kebap",
     "href": "https://dadagastro.com/tarifler/kategori/kofte-ve-kebap"
    },
    {
     "label": "Pakistan Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=pakistan-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Acılı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=acili"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "391 kcal",
      "label": "Kalori"
     },
     {
      "value": "31 g",
      "label": "Protein"
     },
     {
      "value": "25 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "19 g",
      "label": "Yağ"
     },
     {
      "value": "5 g",
      "label": "Lif"
     },
     {
      "value": "5 g",
      "label": "Şeker"
     },
     {
      "value": "722 mg",
      "label": "Sodyum"
     },
     {
      "value": "4 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %31",
     "Karbonhidrat %25",
     "Yağ %43"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Tire Köfte | İzmir Usulü Şişte Közlenip Pide Üstüne Yatırılan Köfte",
     "url": "https://dadagastro.com/tarif/tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pırasa Köftesi | Ege Usulü Limonlu Kıymalı Pırasa Köftesi",
     "url": "https://dadagastro.com/tarif/pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Yeni Dünya Kebabı | Gaziantep Usulü Malta Erikli Köfte Şişi",
     "url": "https://dadagastro.com/tarif/yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kağıtta Köfte | Yağlı Kağıtta Sebzeyle Kendi Buharında Pişen Köfte",
     "url": "https://dadagastro.com/tarif/kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "4"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli",
     "glutensiz",
     "acili"
    ],
    "mutfak": [
     "pakistan-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Shami kebap, Pakistan mutfağının içinde un ya da ekmek içi bulunmayan köftesidir: harcı bağlayan şey, etle birlikte haşlanıp ezilen chana dal'dır. Et ve bakliyat bütün baharatlarla aynı tencerede, suyunu tamamen çekene kadar pişer; ıslak kalan harç tavada dağılır. Ezilen harç yassı köfteler hâlinde şekillendirilip yumurtaya bulanır ve az yağda kızartılır. Aynı mutfağın seekh, çapli ve boti kebaplarının hiçbirinde bakliyat yoktur, shami'yi ayıran da budur."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Tire Köfte | İzmir Usulü Şişte Közlenip Pide Üstüne Yatırılan Köfte",
   "url": "https://dadagastro.com/tarif/tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp",
   "category": "Köfte ve Kebap",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
   "description": "Tire köftesi şişten neden düşmez, köz ne zaman hazırdır? Şişte közlenip pide üstüne yatırılan, domates soslu ve tereyağlı Tire köftesinin tarifi.",
   "author": "Ceren Tosun",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 55,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "kuzu ve dana karışık kıyma (%20 yağlı)",
     "amount": 500,
     "unit": "g"
    },
    {
     "name": "kuru soğan (suyu için)",
     "amount": 100,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 6,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "pul biber",
     "amount": 3,
     "unit": "g"
    },
    {
     "name": "domates (rendelenmiş)",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "domates salçası",
     "amount": 15,
     "unit": "g"
    },
    {
     "name": "tereyağı",
     "amount": 15,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "ince pide",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "süzme yoğurt",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "tereyağı (üstüne)",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "sivri biber",
     "amount": 4,
     "unit": "adet"
    }
   ],
   "steps": [
    {
     "title": "Harcı yoğur",
     "body": "Soğanı rendeleyip tülbentte sıkın ve yalnız suyunu kıymaya katın; posa harcı sulandırıp şişten düşürür. Tuzu, karabiberi ve pul biberi ekleyip 8–10 dakika yoğurun. Harç kabın kenarına yapışıp parmak izini tuttuğunda hazırdır.",
     "time": "12 dk"
    },
    {
     "title": "Şişe sar",
     "body": "Harcı 6 eşit parçaya bölün. Elinizi ıslatıp her parçayı 2 santim genişliğindeki yassı şişe 15 santim boyunca bastırarak sarın. Parmaklarınızla üstüne sık aralıklı çukurlar açın; bu çukurlar harcın pişerken çekip kalınlaşmasını önler.",
     "time": "10 dk"
    },
    {
     "title": "Domates sosunu pişir",
     "body": "Tereyağında salçayı 1 dakika kavurun, rendelenmiş domatesi ve tuzu ekleyin. Kısık ateşte 10 dakika, sos koyulaşıp yüzeyinde yağ parlayana kadar pişirin.",
     "time": "12 dk"
    },
    {
     "title": "Közde pişir",
     "body": "Şişleri korun 10–12 santim üstüne dizin ve 2 dakikada bir çevirerek 10–12 dakika pişirin; biberleri de yanlarında közleyin. Köftenin dışı her yanda kahverengi ve kabuklu olmalı, en kalın yerinde ortası 71 °C'yi göstermelidir.",
     "time": "12 dk"
    },
    {
     "title": "Pideye yatır ve tereyağını dök",
     "body": "Pideyi köftelerin yağının damladığı ızgarada 30 saniye ısıtıp dilimleyin ve tabağa serin. Köfteleri çatalla şişten sıyırıp pidenin üstüne yatırın, sosu gezdirin. Tereyağını köpürene kadar kızdırıp üstüne dökün; yoğurdu ve biberleri yanına koyun.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Şişe sarılan köfteleri köze vermeden önce buzdolabında 30 dakika bekletin ve mangalda alevin sönüp korun külle örtülmesini bekleyin; ılık harç ve alevli ateş köfteyi şişten düşürür."
     }
    ],
    "tags": [],
    "features": [
     "Köfte ve Kebap",
     "Türk Mutfağı",
     "Protein Ağırlıklı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 25 dk + 30 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Köfte için"
    },
    {
     "name": "kuzu ve dana karışık kıyma (%20 yağlı)",
     "note": "",
     "quantity": "500 g",
     "unit": "gram",
     "substitutes": [
      "yalnız dana kıyma (yağlı) — daha sade tat verir; yağ oranı %15'in altına düşerse harç şişte tutunmaz ve kayar"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan (suyu için)",
     "note": "",
     "quantity": "100 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "6 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "pul biber",
     "note": "",
     "quantity": "3 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Sos için"
    },
    {
     "name": "domates (rendelenmiş)",
     "note": "",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [
      "konserve küp domates — kışın daha dolgun renk verir, aynı miktar"
     ],
     "sponsor": ""
    },
    {
     "name": "domates salçası",
     "note": "",
     "quantity": "15 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tereyağı",
     "note": "",
     "quantity": "15 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Servis için"
    },
    {
     "name": "ince pide",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [
      "lavaş — daha ince olduğu için sosu hemen çeker, tabak kurulur kurulmaz sofraya gider"
     ],
     "sponsor": ""
    },
    {
     "name": "süzme yoğurt",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [
      "tam yağlı yoğurt — daha sulu ve ekşimsidir, tabağa değil ayrı kâseye konur"
     ],
     "sponsor": ""
    },
    {
     "name": "tereyağı (üstüne)",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sivri biber",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "0",
   "chef": {
    "info": "Ceren Tosun\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif35",
     "Takipçi8"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Köfte ve Kebap",
     "href": "https://dadagastro.com/tarifler/kategori/kofte-ve-kebap"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "691 kcal",
      "label": "Kalori"
     },
     {
      "value": "34 g",
      "label": "Protein"
     },
     {
      "value": "42 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "43 g",
      "label": "Yağ"
     },
     {
      "value": "3.7 g",
      "label": "Lif"
     },
     {
      "value": "8.2 g",
      "label": "Şeker"
     },
     {
      "value": "1210 mg",
      "label": "Sodyum"
     },
     {
      "value": "20 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %20",
     "Karbonhidrat %24",
     "Yağ %56"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Shami Kebap | Pakistan Usulü Nohutlu Yumurtaya Bulanmış Tavada Köfte",
     "url": "https://dadagastro.com/tarif/shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pırasa Köftesi | Ege Usulü Limonlu Kıymalı Pırasa Köftesi",
     "url": "https://dadagastro.com/tarif/pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Yeni Dünya Kebabı | Gaziantep Usulü Malta Erikli Köfte Şişi",
     "url": "https://dadagastro.com/tarif/yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kağıtta Köfte | Yağlı Kağıtta Sebzeyle Kendi Buharında Pişen Köfte",
     "url": "https://dadagastro.com/tarif/kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Volkan Kaptan",
     "rating": null,
     "body": "Soğanın yalnız suyunu kullanmak tarifin can alıcı yeri. Rendeyi doğrudan harca katınca köfte şişte durmuyor, tülbentten geçirip suyunu aldım, şişe sarılan harç dağılmadı.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-adim4.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-adim5.webp"
     ]
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Tire köftesi şişte pişer: harç yassı şişlere ince uzun sarılır ve közde, dönerek pişer. Sonra şişten sıyrılıp ince pidenin üstüne yatırılır, üzerine domates sosu ve kızgın tereyağı gelir, yanında yoğurt ve közlenmiş biber durur. Harcın sade tutulması bilinçlidir; kıymanın yağı ve közün dumanı tadın asıl kaynağıdır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Pırasa Köftesi | Ege Usulü Limonlu Kıymalı Pırasa Köftesi",
   "url": "https://dadagastro.com/tarif/pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp",
   "category": "Köfte ve Kebap",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
   "description": "Pırasa köftesi yağda neden dağılır, pırasa ne kadar sıkılmalı? Ege usulü kıymalı, limonla servis edilen tavada pırasa köftesinin tam tarifi.",
   "author": "Esma Çevik",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 75,
   "ratingCount": 3,
   "ingredients": [
    {
     "name": "pırasa",
     "amount": 1,
     "unit": "kg"
    },
    {
     "name": "dana kıyma (orta yağlı)",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "bayat ekmek içi",
     "amount": 80,
     "unit": "g"
    },
    {
     "name": "yumurta",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "tuz",
     "amount": 6,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "un (bulamak için)",
     "amount": 60,
     "unit": "g"
    },
    {
     "name": "ayçiçek yağı",
     "amount": 250,
     "unit": "ml"
    },
    {
     "name": "limon",
     "amount": 1,
     "unit": "adet"
    }
   ],
   "steps": [
    {
     "title": "Pırasayı temizle ve doğra",
     "body": "Kök ucunu ve koyu yeşil yapraklarını kesin, beyaz ve açık yeşil kısmı boyuna ikiye yarın. Katmanların arasındaki kumu akan suyun altında yaprakları aralayarak yıkayın ve 1 santimlik parçalar hâlinde doğrayın.",
     "time": "12 dk"
    },
    {
     "title": "Haşla",
     "body": "Pırasayı kaynayan bol suya atıp 12–15 dakika, parçalar parmakla ezilecek kadar yumuşayana kadar haşlayın ve süzgece alın.",
     "time": "15 dk"
    },
    {
     "title": "Sık ve kıy",
     "body": "Ilınan pırasayı avuç avuç ya da tülbende sararak suyu damlamayana kadar sıkın. Tahtaya alıp bıçakla ince kıyın; rondoya çekilen pırasa macunlaşır.",
     "time": "8 dk"
    },
    {
     "title": "Harcı yoğur",
     "body": "Pırasayı kıyma, ufalanmış ekmek içi, yumurta, tuz ve karabiberle birleştirip 4–5 dakika yoğurun. Harç yumuşak ama avucunuzda şeklini tutuyorsa hazırdır; yayılıyorsa bir avuç daha ekmek içi ekleyin.",
     "time": "6 dk"
    },
    {
     "title": "Şekillendir ve una bula",
     "body": "Harcı 16 parçaya bölüp 1,5 santim kalınlığında yassı köfteler yapın ve una hafifçe bulayıp fazlasını silkeleyin.",
     "time": "8 dk"
    },
    {
     "title": "Kızart",
     "body": "Tavaya 1 santim yağ koyup orta ateşte ısıtın. Köfteleri parti parti her yüzü 4 dakika, kabuk koyu altın rengi olana kadar kızartın. Kıymalı köftenin ortası 71 °C olmalıdır; kâğıt havluya alın.",
     "time": "16 dk"
    },
    {
     "title": "Limonla servis et",
     "body": "Köfteleri sıcakken tabağa dizip üstlerine limon sıkın.",
     "time": "2 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Haşlanan pırasayı elinizi yakmayacak kadar soğumaya bırakın ve sıkarken acımayın; suyu alınmamış pırasa köfteyi yağda dağıtır."
     }
    ],
    "tags": [],
    "features": [
     "Köfte ve Kebap",
     "Türk Mutfağı",
     "Laktozsuz",
     "Süt İçermez",
     "Şeker İlavesiz",
     "Kuruyemiş İçermez",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 45 dk + 30 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Köfte için"
    },
    {
     "name": "pırasa",
     "note": "",
     "quantity": "1 kg",
     "unit": "kg",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "dana kıyma (orta yağlı)",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [
      "kuzu kıyma — daha yağlı ve kokulu olur",
      "haşlanmış patates — kıymanın yerine 300 g ezilip konunca köfte etsiz olur, harç biraz daha yumuşak kalır"
     ],
     "sponsor": ""
    },
    {
     "name": "bayat ekmek içi",
     "note": "",
     "quantity": "80 g",
     "unit": "gram",
     "substitutes": [
      "galeta unu — daha az nem tutar, 60 g yeter"
     ],
     "sponsor": ""
    },
    {
     "name": "yumurta",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "6 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Kızartmak ve servis için"
    },
    {
     "name": "un (bulamak için)",
     "note": "",
     "quantity": "60 g",
     "unit": "gram",
     "substitutes": [
      "mısır unu — daha çıtır bir kabuk verir, aynı miktar"
     ],
     "sponsor": ""
    },
    {
     "name": "ayçiçek yağı",
     "note": "",
     "quantity": "250 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "limon",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "2",
   "chef": {
    "info": "Esma Çevik\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif14",
     "Takipçi17"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Köfte ve Kebap",
     "href": "https://dadagastro.com/tarifler/kategori/kofte-ve-kebap"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "451 kcal",
      "label": "Kalori"
     },
     {
      "value": "20 g",
      "label": "Protein"
     },
     {
      "value": "41 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "23 g",
      "label": "Yağ"
     },
     {
      "value": "4.1 g",
      "label": "Lif"
     },
     {
      "value": "8.2 g",
      "label": "Şeker"
     },
     {
      "value": "790 mg",
      "label": "Sodyum"
     },
     {
      "value": "5.6 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %18",
     "Karbonhidrat %36",
     "Yağ %46"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Shami Kebap | Pakistan Usulü Nohutlu Yumurtaya Bulanmış Tavada Köfte",
     "url": "https://dadagastro.com/tarif/shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Tire Köfte | İzmir Usulü Şişte Közlenip Pide Üstüne Yatırılan Köfte",
     "url": "https://dadagastro.com/tarif/tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Yeni Dünya Kebabı | Gaziantep Usulü Malta Erikli Köfte Şişi",
     "url": "https://dadagastro.com/tarif/yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kağıtta Köfte | Yağlı Kağıtta Sebzeyle Kendi Buharında Pişen Köfte",
     "url": "https://dadagastro.com/tarif/kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "3"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Dimitar Stoyanov",
     "rating": null,
     "body": "Pırasayı haşladıktan sonra sıkma adımını hafife almışım, harç cıvık kaldı ve una bulanınca bile dağıldı. İkinci turda tülbentle avuç avuç sıktım, köfteler tavada durdu.",
     "date": "4 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    },
    {
     "author": "Yaprak Mengü",
     "rating": null,
     "body": "Bayat ekmek içi yerine galeta unu koydum, biraz sert oldu. Ekmek içi doğru tercihmiş; ıslatıp sıkarak kattığımda köfte içeriden yumuşak kaldı. Limonu da tabakta sıktım, harca kattığım denemede pırasanın tatlımsı tadını bastırıyordu.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-adim6.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "laktozsuz",
     "sut-icermez",
     "seker-ilavesiz",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Pırasa köftesinde harcın asıl malzemesi kıyma değil pırasadır; kıyma yalnız bağlar ve tat verir. Pırasa önce haşlanır, sonra acımadan sıkılır ve bıçakla kıyılır; içinde kalan her kaşık su köfteyi yağda dağıtır. Ege'de sıcakken üstüne limon sıkılarak yenir, etsiz hâli de aynı teknikle yapılır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Yeni Dünya Kebabı | Gaziantep Usulü Malta Erikli Köfte Şişi",
   "url": "https://dadagastro.com/tarif/yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp",
   "category": "Köfte ve Kebap",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
   "description": "Yeni dünya kebabında meyve neden soyulmaz, köfteyle nasıl dizilir? Mayısta yapılan Gaziantep usulü malta erikli köfte şişinin közde tarifi.",
   "author": "Radostina Ivanova",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 55,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "kuzu kıyma (yağlı)",
     "amount": 500,
     "unit": "g"
    },
    {
     "name": "kuru soğan",
     "amount": 80,
     "unit": "g"
    },
    {
     "name": "isot",
     "amount": 5,
     "unit": "g"
    },
    {
     "name": "pul biber",
     "amount": 5,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 7,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "yeni dünya (malta eriği)",
     "amount": 600,
     "unit": "g"
    },
    {
     "name": "lavaş",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "sivri biber",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "kuru soğan (piyazlık)",
     "amount": 150,
     "unit": "g"
    },
    {
     "name": "sumak",
     "amount": 5,
     "unit": "g"
    },
    {
     "name": "maydanoz",
     "amount": 0.5,
     "unit": "demet"
    }
   ],
   "steps": [
    {
     "title": "Kebap harcını yoğur",
     "body": "Soğanı rendeleyip suyunu sıkın ve posasını kıymaya katın. İsotu, pul biberi, tuzu ve karabiberi ekleyip 6–8 dakika yoğurun. Harç ele yapışıp bir arada duruyorsa hazırdır.",
     "time": "10 dk"
    },
    {
     "title": "Yeni dünyaları hazırla",
     "body": "Yeni dünyaları yıkayıp kurulayın. Kabuklarını soymadan ortadan ikiye kesin ve çekirdekleri ile çekirdeği saran ince zarı kaşık ucuyla çıkarın.",
     "time": "10 dk"
    },
    {
     "title": "Şişe diz",
     "body": "Harçtan 25 g'lık parçalar alıp avucunuzda yassı köfteler yapın. Köfte ve yarım yeni dünyayı sırayla şişe dizin; meyvenin kesik yüzü köfteye bakmalı ki suyu köfteye aksın. 8 şiş çıkar.",
     "time": "15 dk"
    },
    {
     "title": "Sumaklı soğanı hazırla",
     "body": "Piyazlık soğanı ince ay dilimleri hâlinde doğrayın, sumak ve kıyılmış maydanozla ovun.",
     "time": "5 dk"
    },
    {
     "title": "Közde pişir",
     "body": "Şişleri korun 10 santim üstüne dizip 2–3 dakikada bir çevirerek 10–12 dakika pişirin, biberleri de yanlarında közleyin. Yeni dünyaların kabuğu yer yer kararıp meyve yumuşadığında ve köftelerin ortası 71 °C'yi gösterdiğinde kebap hazırdır.",
     "time": "12 dk"
    },
    {
     "title": "Lavaşla şişten al",
     "body": "Lavaşı şişlerin üstüne kapatıp birkaç saniye ısıtın, lavaşla kavrayarak köfteleri ve meyveleri şişten sıyırın. Sumaklı soğan ve biberle sıcak servis edin.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yeni dünyanın sert ve hafif ekşi olanını seçin, fazla olgun meyve közde dağılır; közü de alevi sönüp korları külle örtülene kadar bekletin."
     }
    ],
    "tags": [],
    "features": [
     "Köfte ve Kebap",
     "Türk Mutfağı",
     "Protein Ağırlıklı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 40 dk + 15 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Kebap için"
    },
    {
     "name": "kuzu kıyma (yağlı)",
     "note": "",
     "quantity": "500 g",
     "unit": "gram",
     "substitutes": [
      "dana kıyma (yağlı) — daha az kokulu ve daha az yağlıdır; yağ oranı %20'nin altındaysa köfte şişte kurur"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "80 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "isot",
     "note": "",
     "quantity": "5 g",
     "unit": "gram",
     "substitutes": [
      "pul biber ve tatlı toz biber (yarı yarıya) — rengi tutar ama isotun is kokusunu vermez"
     ],
     "sponsor": ""
    },
    {
     "name": "pul biber",
     "note": "",
     "quantity": "5 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "7 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "yeni dünya (malta eriği)",
     "note": "",
     "quantity": "600 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Servis için"
    },
    {
     "name": "lavaş",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sivri biber",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kuru soğan (piyazlık)",
     "note": "",
     "quantity": "150 g",
     "unit": "gram",
     "substitutes": [
      "mor soğan — daha tatlı ve daha az keskindir"
     ],
     "sponsor": ""
    },
    {
     "name": "sumak",
     "note": "",
     "quantity": "5 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "maydanoz",
     "note": "",
     "quantity": "½ demet",
     "unit": "demet",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "5",
   "clapCount": "2",
   "chef": {
    "info": "Radostina Ivanova\nMutfak Meraklısı\n2026'dan beri üye",
    "meta": [
     "Tarif3",
     "Takipçi8"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "31 Ağustos 2026",
    "Son güncelleme: 31 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Köfte ve Kebap",
     "href": "https://dadagastro.com/tarifler/kategori/kofte-ve-kebap"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "607 kcal",
      "label": "Kalori"
     },
     {
      "value": "27 g",
      "label": "Protein"
     },
     {
      "value": "55 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "31 g",
      "label": "Yağ"
     },
     {
      "value": "6.3 g",
      "label": "Lif"
     },
     {
      "value": "17 g",
      "label": "Şeker"
     },
     {
      "value": "1010 mg",
      "label": "Sodyum"
     },
     {
      "value": "13 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %18",
     "Karbonhidrat %36",
     "Yağ %46"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Shami Kebap | Pakistan Usulü Nohutlu Yumurtaya Bulanmış Tavada Köfte",
     "url": "https://dadagastro.com/tarif/shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Tire Köfte | İzmir Usulü Şişte Közlenip Pide Üstüne Yatırılan Köfte",
     "url": "https://dadagastro.com/tarif/tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pırasa Köftesi | Ege Usulü Limonlu Kıymalı Pırasa Köftesi",
     "url": "https://dadagastro.com/tarif/pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kağıtta Köfte | Yağlı Kağıtta Sebzeyle Kendi Buharında Pişen Köfte",
     "url": "https://dadagastro.com/tarif/kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Cem Yağcı",
     "rating": null,
     "body": "İsotu yarıya indirdim, çocuklar da yedi. Sumaklı soğanı lavaşın altına serpmek de iyi oluyor, etin suyu soğana iniyor ve lavaş kuru kalmıyor. Yeni dünyaların ikisini de şişin uçlarına koymayın, uçtakiler ateşe en yakın yer olduğu için çabuk kararıyor.",
     "date": "3 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Radostina",
       "body": "İsot yakmaz, koyu bir tat verir; yine de azaltmak tarifi bozmaz. Yalnız kıymanın yağ oranını düşürmeyin, isot azalınca yağ da azalırsa harç kuru kalıyor.",
       "date": "3 hafta önce"
      }
     ]
    },
    {
     "author": "Defne Ölmez",
     "rating": null,
     "body": "Yeni dünyayı şişe dizmeden önce çekirdeğini çıkarıp yarım bıraktım, közde dağılmadı. Tam olgununu alırsanız sıcakta suyunu bırakıp kebabın yağıyla karışıyor, mayhoşluk oradan geliyor.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-adim3.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-adim5.webp"
     ]
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Antep'te yeni dünyaya malta eriği denir ve mayısın birkaç haftasında pazara çıkar; o haftaların kebabı budur. Kıyma köfteleriyle ortadan ikiye kesilmiş yeni dünyalar aynı şişe sırayla dizilir ve közde pişer. Meyvenin ekşimsi suyu köfteye akar, köftenin yağı meyvenin kabuğunu kızartır; bu yüzden meyve soyulmaz, kabuk közde onu bir arada tutan kılıftır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Kağıtta Köfte | Yağlı Kağıtta Sebzeyle Kendi Buharında Pişen Köfte",
   "url": "https://dadagastro.com/tarif/kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp",
   "category": "Köfte ve Kebap",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte",
   "description": "Kağıtta köfte neden kurumaz, sebzeler pakete hangi sırayla konur? Yağlı kâğıtta patates ve sebzeyle kendi buharında pişen fırın köftesinin tarifi.",
   "author": "Ceren Tosun",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 85,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "dana kıyma (orta yağlı)",
     "amount": 500,
     "unit": "g"
    },
    {
     "name": "kuru soğan",
     "amount": 80,
     "unit": "g"
    },
    {
     "name": "bayat ekmek içi",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 6,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "kimyon",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "patates",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "kuru soğan",
     "amount": 100,
     "unit": "g"
    },
    {
     "name": "sivri biber",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "domates",
     "amount": 300,
     "unit": "g"
    },
    {
     "name": "sarımsak",
     "amount": 2,
     "unit": "diş"
    },
    {
     "name": "zeytinyağı",
     "amount": 30,
     "unit": "ml"
    },
    {
     "name": "tuz",
     "amount": 4,
     "unit": "g"
    },
    {
     "name": "kekik",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "pişirme kâğıdı (40×40 santim)",
     "amount": 4,
     "unit": "adet"
    }
   ],
   "steps": [
    {
     "title": "Harcı yoğur",
     "body": "Soğanı rendeleyip suyunu sıkın. Kıymayı soğan, ufalanmış ekmek içi, tuz ve baharatlarla 5 dakika, harç ele yapışana kadar yoğurun.",
     "time": "8 dk"
    },
    {
     "title": "Köfteleri şekillendir",
     "body": "Harcı 16 parçaya bölüp avucunuzda 1,5 santim kalınlığında yassı köfteler yapın.",
     "time": "8 dk"
    },
    {
     "title": "Sebzeyi doğra ve harmanla",
     "body": "Patatesi 3 milimetrelik yuvarlak dilimler, soğanı yarım ay, biberi halka, domatesi kalın dilim doğrayın. Patates, soğan ve biberi zeytinyağı, ezilmiş sarımsak, tuz ve kekikle harmanlayın.",
     "time": "12 dk"
    },
    {
     "title": "Paketle",
     "body": "Her kâğıdın ortasına patatesleri üst üste gelecek şekilde yayın, üstüne soğan ve biberi, onun üstüne dört köfteyi, en üste domatesi koyun. Kâğıdın iki ucunu üstte birleştirip birkaç kez kıvırın, yanlarını da şeker ambalajı gibi büküp kapatın.",
     "time": "10 dk"
    },
    {
     "title": "Fırınla",
     "body": "Paketleri tepsiye dizip 200 °C'ye ısınmış fırının orta rafında 40 dakika pişirin. Bir paketi aralayıp patatese bıçak batırın; bıçak direnmeden giriyor ve köftenin ortası 71 °C'yi gösteriyorsa hazırdır.",
     "time": "40 dk"
    },
    {
     "title": "Sofrada aç",
     "body": "Paketleri tabağa alıp sofrada makasla üstten açın ve buharın çıkmasını bekleyerek servis edin.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Fırını 200 °C'ye önceden ısıtın ve paketi sofrada açarken yüzünüzü uzak tutun; içeride biriken buhar kâğıt yırtılınca bir anda çıkar."
     }
    ],
    "tags": [],
    "features": [
     "Köfte ve Kebap",
     "Türk Mutfağı",
     "Protein Ağırlıklı",
     "Laktozsuz",
     "Süt İçermez",
     "Yumurta İçermez",
     "Şeker İlavesiz",
     "Kuruyemiş İçermez",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 40 dk + 45 dk",
     "ZorlukKolay",
     "Pişirme Derecesi200°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Köfte için"
    },
    {
     "name": "dana kıyma (orta yağlı)",
     "note": "",
     "quantity": "500 g",
     "unit": "gram",
     "substitutes": [
      "kuzu kıyma — daha yağlı ve kokuludur, patatese daha çok yağ işler"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "80 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "bayat ekmek içi",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [
      "galeta unu — daha az nem tutar, 30 g yeter"
     ],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "6 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kimyon",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Sebze için"
    },
    {
     "name": "patates",
     "note": "",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [
      "tatlı patates — daha tatlı olur ve aynı sürede daha yumuşak pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "100 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sivri biber",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "domates",
     "note": "",
     "quantity": "300 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sarımsak",
     "note": "",
     "quantity": "2 diş",
     "unit": "dis",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "zeytinyağı",
     "note": "",
     "quantity": "30 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "4 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kekik",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Paket için"
    },
    {
     "name": "pişirme kâğıdı (40×40 santim)",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [
      "alüminyum folyo — buharı daha sıkı tutar; domatesin asidi folyoya değmesin diye içine bir kat pişirme kâğıdı serin"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "3",
   "chef": {
    "info": "Ceren Tosun\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif35",
     "Takipçi8"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "30 Ağustos 2026",
    "Son güncelleme: 30 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Köfte ve Kebap",
     "href": "https://dadagastro.com/tarifler/kategori/kofte-ve-kebap"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "470 kcal",
      "label": "Kalori"
     },
     {
      "value": "28 g",
      "label": "Protein"
     },
     {
      "value": "31 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "26 g",
      "label": "Yağ"
     },
     {
      "value": "4.9 g",
      "label": "Lif"
     },
     {
      "value": "5.5 g",
      "label": "Şeker"
     },
     {
      "value": "1110 mg",
      "label": "Sodyum"
     },
     {
      "value": "8.4 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %24",
     "Karbonhidrat %26",
     "Yağ %50"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Shami Kebap | Pakistan Usulü Nohutlu Yumurtaya Bulanmış Tavada Köfte",
     "url": "https://dadagastro.com/tarif/shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Tire Köfte | İzmir Usulü Şişte Közlenip Pide Üstüne Yatırılan Köfte",
     "url": "https://dadagastro.com/tarif/tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pırasa Köftesi | Ege Usulü Limonlu Kıymalı Pırasa Köftesi",
     "url": "https://dadagastro.com/tarif/pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Yeni Dünya Kebabı | Gaziantep Usulü Malta Erikli Köfte Şişi",
     "url": "https://dadagastro.com/tarif/yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-adim4.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte-adim6.webp"
     ]
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli",
     "laktozsuz",
     "sut-icermez",
     "yumurta-icermez",
     "seker-ilavesiz",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Kağıtta köftede fırın bir tencere gibi çalışır: köfte, patates ve sebze yağlı kâğıda kapatılır ve paketin içinde biriken buharda pişer. Köftenin salıverdiği yağ ve domatesin suyu paketin içinde kalıp patatese işler, bu yüzden ayrıca sos gerekmez. En uzun pişen patates en alta, en çabuk pişen domates en üste konur."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Hühnerfrikassee | Alman Usulü Kuşkonmazlı Mantarlı Kremalı Tavuk Yahnisi",
   "url": "https://dadagastro.com/tarif/huhnerfrikassee-alman-usulu-kuskonmazli-mantarli-kremali-tavuk-yahnisi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-huhnerfrikassee-alman-usulu-kuskonmazli-mantarli-kremali-tavuk-yahnisi-kapak.webp",
   "category": "Tavuk ve Hindi",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "huhnerfrikassee-alman-usulu-kuskonmazli-mantarli-kremali-tavuk-yahnisi",
   "description": "Tavuk frikasesi sosunu nereden alır? Tavuğun kendi suyuyla, kuşkonmaz, mantar, kapari ve limonla yapılan Alman usulü kremalı tavuk yahnisi tarifi.",
   "author": "Fatma Aktürk",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 125,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "bütün piliç (1,2–1,4 kg)",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "su",
     "amount": 2,
     "unit": "l"
    },
    {
     "name": "havuç",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "kuru soğan",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "defne yaprağı",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "tane karabiber",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "tuz",
     "amount": 2,
     "unit": "çay kaşığı"
    },
    {
     "name": "beyaz kuşkonmaz",
     "amount": 300,
     "unit": "g"
    },
    {
     "name": "kültür mantarı",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "tereyağı",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "un",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "tavuk suyu (haşlamadan)",
     "amount": 600,
     "unit": "ml"
    },
    {
     "name": "krema",
     "amount": 150,
     "unit": "ml"
    },
    {
     "name": "yumurta sarısı",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "limon suyu",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "kapari",
     "amount": 1,
     "unit": "yemek kaşığı"
    },
    {
     "name": "muskat",
     "amount": 1,
     "unit": "tutam"
    },
    {
     "name": "pirinç",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "su (pilav için)",
     "amount": 375,
     "unit": "ml"
    },
    {
     "name": "tuz (pilav için)",
     "amount": 1,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Tavuğu haşla",
     "body": "Pilici 2 litre soğuk suya koyup kaynatın ve köpüğü tamamen alın. İri doğranmış havucu, soğanı, defneyi, karabiberi ve tuzu ekleyip kısık ateşte 50 dakika pişirin. Termometreyi budun en kalın yerine, kemiğe değdirmeden batırın: iç sıcaklık 74 °C olmalıdır.",
     "time": "55 dk"
    },
    {
     "title": "Didikle ve suyu süz",
     "body": "Pilici sudan alıp derisini ve kemiklerini ayırın, eti lokma büyüklüğünde didikleyin. Suyu ince süzgeçten geçirip 600 ml ayırın.",
     "time": "12 dk"
    },
    {
     "title": "Kuşkonmazı haşla",
     "body": "Beyaz kuşkonmazı soyup odunsu alt kısmını kesin ve 3 cm'lik parçalara bölün. Ayırdığınız tavuk suyunda 8 dakika haşlayıp kevgirle alın; su sosa gidecek.",
     "time": "10 dk"
    },
    {
     "title": "Pilavı pişir",
     "body": "Yıkanmış pirinci tuzla birlikte 375 ml kaynar suya ekleyip kapağı kapalı ve kısık ateşte 15 dakika pişirin, ocaktan alıp 5 dakika demlendirin.",
     "time": "20 dk"
    },
    {
     "title": "Mantarı sotele",
     "body": "Tereyağının 10 g'ını tavada eritip dörde bölünmüş mantarları 5 dakika, suyunu salıp çekene kadar soteleyin.",
     "time": "6 dk"
    },
    {
     "title": "Sosu kur",
     "body": "Kalan tereyağını geniş bir tencerede eritip unu 2 dakika, renk vermeden kavurun. Sıcak tavuk suyunu çırparak yavaş yavaş ekleyin ve 8 dakika, sos kaşığın arkasını kaplayana kadar pişirin; kremayı katın. Sarıyı bir kasede iki kaşık sıcak sosla çırpıp ocaktan alınmış sosa ekleyin, sonra limon suyunu, kapariyi ve muskatı karıştırın.",
     "time": "12 dk"
    },
    {
     "title": "Birleştir",
     "body": "Tavuğu, kuşkonmazı ve mantarı sosa ekleyip kısık ateşte, kaynatmadan 3 dakika ısıtın. Tadına bakıp tuzunu ayarlayın ve pilavın yanında servis edin.",
     "time": "4 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yumurta sarısını sosa ocaktan aldıktan sonra ekleyin ve bir daha kaynatmayın; kaynayan sosta sarı pişip topaklanır."
     }
    ],
    "tags": [],
    "features": [
     "Tavuk ve Hindi",
     "Alman Mutfağı",
     "Protein Ağırlıklı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 25 dk + 100 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Tavuk için"
    },
    {
     "name": "bütün piliç (1,2–1,4 kg)",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [
      "kemiksiz tavuk but — 700 g kullanılır, suyu daha zayıf olur, hazır tavuk suyuyla destekleyin"
     ],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "2 l",
     "unit": "l",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "havuç",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "defne yaprağı",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tane karabiber",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "2 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Sos için"
    },
    {
     "name": "beyaz kuşkonmaz",
     "note": "",
     "quantity": "300 g",
     "unit": "gram",
     "substitutes": [
      "yeşil kuşkonmaz — soyulmaz ve 4 dakikada pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "kültür mantarı",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tereyağı",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "un",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tavuk suyu (haşlamadan)",
     "note": "",
     "quantity": "600 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "krema",
     "note": "",
     "quantity": "150 ml",
     "unit": "ml",
     "substitutes": [
      "süt — sos daha hafif ve açık olur, koyulaşması için 1 yemek kaşığı daha un gerekir"
     ],
     "sponsor": ""
    },
    {
     "name": "yumurta sarısı",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "limon suyu",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kapari",
     "note": "",
     "quantity": "1 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "muskat",
     "note": "",
     "quantity": "1 tutam",
     "unit": "tutam",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Sofra için"
    },
    {
     "name": "pirinç",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [
      "basmati pirinci — daha taneli ve kokulu olur, suyu 50 ml azaltın"
     ],
     "sponsor": ""
    },
    {
     "name": "su (pilav için)",
     "note": "",
     "quantity": "375 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz (pilav için)",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-huhnerfrikassee-alman-usulu-kuskonmazli-mantarli-kremali-tavuk-yahnisi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "0",
   "chef": {
    "info": "Fatma Aktürk\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif34",
     "Takipçi3"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "01 Eylül 2026",
    "Son güncelleme: 01 Eylül 2026"
   ],
   "features": [
    {
     "label": "Tavuk ve Hindi",
     "href": "https://dadagastro.com/tarifler/kategori/tavuk-ve-hindi"
    },
    {
     "label": "Alman Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=alman-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "734 kcal",
      "label": "Kalori"
     },
     {
      "value": "43 g",
      "label": "Protein"
     },
     {
      "value": "66 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "33 g",
      "label": "Yağ"
     },
     {
      "value": "4 g",
      "label": "Lif"
     },
     {
      "value": "5 g",
      "label": "Şeker"
     },
     {
      "value": "1220 mg",
      "label": "Sodyum"
     },
     {
      "value": "17 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %23",
     "Karbonhidrat %36",
     "Yağ %41"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Güveçte Ayvalı Tavuk | Mayhoş Ayvayla Kış Güveci",
     "url": "https://dadagastro.com/tarif/guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Ördek Dolması | Fırında İç Pilavlı Bütün Ördek",
     "url": "https://dadagastro.com/tarif/ordek-dolmasi-firinda-ic-pilavli-butun-ordek",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-ordek-dolmasi-firinda-ic-pilavli-butun-ordek-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
     "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
     "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli"
    ],
    "mutfak": [
     "alman-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Hühnerfrikassee, Alman ev mutfağının pazar yemeğidir: bütün tavuk sebzelerle haşlanır, eti didiklenir ve kendi suyuyla yapılan tereyağlı un sosuna kuşkonmaz, mantar ve kapariyle birlikte girer. Sosun ekşiliğini limon suyu, kıvamını krema ve bir yumurta sarısı verir. Pilavla yenir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Arpa Şehriyeli Sebze Çorbası | 10 Ay ve Üzeri Bebekler İçin Tuzsuz Çorba",
   "url": "https://dadagastro.com/tarif/arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba-kapak.webp",
   "category": "Bebek Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba",
   "description": "Bebek çorbasına arpa şehriye ne zaman atılır? Sebzeler piştikten sonra eklenen, tuzsuz ve bulyonsuz ilk taneli çorba tarifi ve kıvam ölçüsü.",
   "author": "Ece Örge",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 42,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "arpa şehriye",
     "amount": 50,
     "unit": "g"
    },
    {
     "name": "havuç",
     "amount": 100,
     "unit": "g"
    },
    {
     "name": "patates",
     "amount": 120,
     "unit": "g"
    },
    {
     "name": "kabak",
     "amount": 80,
     "unit": "g"
    },
    {
     "name": "içme suyu",
     "amount": 900,
     "unit": "ml"
    },
    {
     "name": "zeytinyağı",
     "amount": 8,
     "unit": "ml"
    }
   ],
   "steps": [
    {
     "title": "Sebzeleri doğra",
     "body": "Havuç ve patatesi 1 santim, kabağı 1,5 santim küpler hâlinde doğrayın. Kabağı biraz iri tutmanın nedeni çok çabuk dağılması; aynı boyda doğranırsa çorbada kabaktan eser kalmaz.",
     "time": "8 dk"
    },
    {
     "title": "Sebzeleri haşla",
     "body": "Havuç ve patatesi 900 mililitre suyla tencereye alıp on sekiz dakika kısık ateşte pişirin. Çatal havuca direnç görmeden batıyorsa hazırdır; havuç en geç pişendir, ölçüyü ondan alın.",
     "time": "18 dk"
    },
    {
     "title": "Şehriyeyi ve kabağı ekle",
     "body": "Arpa şehriyeyi ve kabağı ekleyip on dakika daha pişirin, ilk iki dakika sürekli karıştırın ki şehriye dibe oturup yapışmasın. Şehriye şişip iki katına çıkar; bir tanesini parmaklarınız arasında ezin, hiç direnç göstermemeli.",
     "time": "10 dk"
    },
    {
     "title": "Kıvam ver ve servis et",
     "body": "Zeytinyağını ekleyip karıştırın. Kaşıkta duran ama kâseye döndüğünde akan bir kıvam arayın. Daha küçük bir bebeğe veriyorsanız şehriyeyi kâsede çatalın sırtıyla ezin; bu çorbayı taneli vermek zorunlu değil.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Çorba soğudukça şehriye suyu çekip belirgin biçimde koyulaşır; ısıtırken bir çay bardağı sıcak su ekleyip karıştırın, yoksa kaşıkta duran bir lapa bulursunuz."
     }
    ],
    "tags": [],
    "features": [
     "Bebek Tarifleri",
     "Çorba",
     "Türk Mutfağı",
     "Şeker İlavesiz",
     "Vegan",
     "Süt İçermez",
     "Yumurta İçermez",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 12 dk + 30 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Çorba için"
    },
    {
     "name": "arpa şehriye",
     "note": "",
     "quantity": "50 g",
     "unit": "gram",
     "substitutes": [
      "tel şehriye — daha ince olduğu için beş dakikada pişer ve çorbaya tane dokusu vermez",
      "ince bulgur — aynı sürede pişer, belirgin biçimde daha dolgun bir tat verir"
     ],
     "sponsor": ""
    },
    {
     "name": "havuç",
     "note": "",
     "quantity": "100 g",
     "unit": "gram",
     "substitutes": [
      "balkabağı — daha tatlı ve daha çabuk dağılır, son on dakikada eklenir"
     ],
     "sponsor": ""
    },
    {
     "name": "patates",
     "note": "",
     "quantity": "120 g",
     "unit": "gram",
     "substitutes": [
      "tatlı patates — çorbayı turuncu ve daha tatlı yapar, aynı sürede pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "kabak",
     "note": "",
     "quantity": "80 g",
     "unit": "gram",
     "substitutes": [
      "taze fasulye — daha belirgin bir tat verir, beş dakika daha uzun pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "içme suyu",
     "note": "",
     "quantity": "900 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "zeytinyağı",
     "note": "",
     "quantity": "8 ml",
     "unit": "ml",
     "substitutes": [
      "tereyağı — daha dolgun bir tat verir, aynı miktarda kullanılır"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "0",
   "clapCount": "0",
   "chef": {
    "info": "Ece Örge\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif40",
     "Takipçi21"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "07 Eylül 2026",
    "Son güncelleme: 07 Eylül 2026"
   ],
   "features": [
    {
     "label": "Bebek Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/bebek-tarifleri"
    },
    {
     "label": "Çorba",
     "href": "https://dadagastro.com/tarifler/kategori/corba"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Vegan",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vegan"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "98 kcal",
      "label": "Kalori"
     },
     {
      "value": "2.7 g",
      "label": "Protein"
     },
     {
      "value": "17.4 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "2 g",
      "label": "Yağ"
     },
     {
      "value": "2 g",
      "label": "Lif"
     },
     {
      "value": "1.8 g",
      "label": "Şeker"
     },
     {
      "value": "20 mg",
      "label": "Sodyum"
     },
     {
      "value": "1.1 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %11",
     "Karbonhidrat %71",
     "Yağ %18"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
     "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Köz Patlıcan ve Yoğurt Ezmesi | Balkan Usulü Yumuşak Kıvamlı Mama",
     "url": "https://dadagastro.com/tarif/koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama",
     "image": "https://dadagastro.com/varliklar/media/9278.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Firik Lapası | Irak Usulü Kavrulmuş Buğday Bebek Maması",
     "url": "https://dadagastro.com/tarif/firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/8033.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Izgara Mısır Püresi | Arjantin Usulü Bebek Maması",
     "url": "https://dadagastro.com/tarif/izgara-misir-puresi-arjantin-usulu-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/6949.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "seker-ilavesiz",
     "vegan",
     "sut-icermez",
     "yumurta-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Bebeğin ilk taneli çorbası genellikle püreden kaşığa geçişte verilir; arpa şehriye bu iş için uygundur çünkü haşlandığında hiç direnç bırakmaz. Sebzeler önce, şehriye sonra girer: baştan atılan şehriye dağılıp çorbayı bulamaç yapar. Tuz, bulyon ve hazır çorba tozu kullanılmaz."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Köz Patlıcan ve Yoğurt Ezmesi | Balkan Usulü Yumuşak Kıvamlı Mama",
   "url": "https://dadagastro.com/tarif/koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama",
   "image": "https://dadagastro.com/varliklar/media/9278.webp",
   "category": "Bebek Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama",
   "description": "Köz patlıcan ve yoğurt ezmesi nasıl yapılır? Sebzelerin közlenmesi, kabuklarının ayıklanması ve avokado-yoğurtla pürüzsüz kıvama getirilmesiyle adım adım…",
   "author": "Belgin Aksoy",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 50,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Patlıcan orta boy",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Kabak",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Avokado",
     "amount": 0.5,
     "unit": "adet"
    },
    {
     "name": "Süzme yoğurt",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Zeytinyağı",
     "amount": 1,
     "unit": "tatlı kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Sebzeleri közleyin",
     "body": "Patlıcan ve kabak közlenene kadar mangal ızgarasında ya da ocak alevinde çevirerek pişirin; kabukları kabarıp içleri yumuşamalı.",
     "time": "20 dk"
    },
    {
     "title": "Soğutup kabuklarını soyun",
     "body": "Köz sebzeleri 10 dakika kadar soğumaya bırakın, ardından patlıcan ve kabağın kabuklarını soyup etli kısımlarını ayırın.",
     "time": "10 dk"
    },
    {
     "title": "Püre haline getirin",
     "body": "Ayıklanmış patlıcan ve kabağı avokado ile birlikte çatalla ya da blenderle pürüzsüz oluncaya kadar ezin.",
     "time": "5 dk"
    },
    {
     "title": "Yoğurtla karıştırıp servis edin",
     "body": "Püreye süzme yoğurt ve zeytinyağını ekleyip iyice karıştırın; bebeğinizin alıştığı kıvama göre gerekirse birkaç damla kaynamış ılık su ile inceltin.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 94,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Közlenen sebzelerin kabuklarını mutlaka ayıklayın, küçük kabuk parçaları bebeğin boğazına takılabilir. Kıvamı bebeğinizin yaşına göre suyla inceltebilir ya da daha koyu bırakabilirsiniz. Alerjen: süt ve süt ürünleri (yoğurt) içerir."
     }
    ],
    "tags": [],
    "features": [
     "Bebek Tarifleri",
     "Balkan Mutfağı",
     "Vejetaryen",
     "Glutensiz",
     "Yumurta İçermez",
     "Şeker İlavesiz",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 15 dk + 35 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Patlıcan orta boy",
     "note": "orta boy",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Kabak",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Avokado",
     "note": "",
     "quantity": "½ adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Süzme yoğurt",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/9278.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "2",
   "chef": {
    "info": "Belgin Aksoy\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif43",
     "Takipçi12"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "23 Haziran 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Bebek Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/bebek-tarifleri"
    },
    {
     "label": "Balkan Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=balkan-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
     "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Sebze Çorbası | 10 Ay ve Üzeri Bebekler İçin Tuzsuz Çorba",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Firik Lapası | Irak Usulü Kavrulmuş Buğday Bebek Maması",
     "url": "https://dadagastro.com/tarif/firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/8033.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Izgara Mısır Püresi | Arjantin Usulü Bebek Maması",
     "url": "https://dadagastro.com/tarif/izgara-misir-puresi-arjantin-usulu-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/6949.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "glutensiz",
     "yumurta-icermez",
     "seker-ilavesiz",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "balkan-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Köz patlıcan ve yoğurt ezmesi, mangalda ya da ocak alevinde közlenen patlıcan ve kabağın avokado ve süzme yoğurtla pürüzsüz bir kıvama getirilmesiyle hazırlanan Balkan esintili bir bebek mamasıdır. Közleme, sebzelere hafif dumanlı bir tat katarken kıvamı bebekler için yumuşacık kalır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Firik Lapası | Irak Usulü Kavrulmuş Buğday Bebek Maması",
   "url": "https://dadagastro.com/tarif/firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi",
   "image": "https://dadagastro.com/varliklar/media/8033.webp",
   "category": "Bebek Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi",
   "description": "Irak usulü firik lapası nasıl yapılır? Firiği durulama, haşlama ve pürüzsüzleştirme aşamalarıyla adım adım tam tahıllı bebek maması tarifi.",
   "author": "Aysun Aydın",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 35,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "firik durulanmış",
     "amount": 0.5,
     "unit": "su bardağı"
    },
    {
     "name": "Su",
     "amount": 3,
     "unit": "su bardağı"
    },
    {
     "name": "Havuç rendelenmiş",
     "amount": 0.5,
     "unit": "adet"
    },
    {
     "name": "Zeytinyağı",
     "amount": 1,
     "unit": "tatlı kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Firiği Durulayın",
     "body": "Firiği bol suyla durulayıp süzün, yüzen kabuk parçacıklarını ayıklayın.",
     "time": "3 dk"
    },
    {
     "title": "Haşlayın",
     "body": "Firiği su ve rendelenmiş havuçla bir tencereye alıp kısık ateşte sürekli karıştırarak taneler yumuşayana kadar 25 dakika kaynatın.",
     "time": "25 dk"
    },
    {
     "title": "Pürüzsüzleştirin",
     "body": "Karışımı zeytinyağıyla birlikte blenderdan geçirip bebeğinizin yaşına uygun pürüzsüz bir kıvama getirin.",
     "time": "3 dk"
    },
    {
     "title": "Soğutup Servis Edin",
     "body": "Lapayı ılık hâle gelene kadar soğutup servis edin.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 94,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Firiği bebeğinize vermeden önce mutlaka pürüzsüz bir kıvama getirin, tam pürüzsüzleşmeyen taneler boğulma riski taşır. Tuz ve şeker 1 yaşından önce eklenmez."
     }
    ],
    "tags": [],
    "features": [
     "Bebek Tarifleri",
     "Irak Mutfağı",
     "Tam Tahıllı",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 10 dk + 25 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "firik durulanmış",
     "note": "durulanmış",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Su",
     "note": "",
     "quantity": "3 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Havuç rendelenmiş",
     "note": "rendelenmiş",
     "quantity": "½ adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8033.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "0",
   "chef": {
    "info": "Aysun Aydın\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif14",
     "Takipçi3"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "23 Temmuz 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Bebek Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/bebek-tarifleri"
    },
    {
     "label": "Irak Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=irak-mutfagi"
    },
    {
     "label": "Tam Tahıllı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=tam-tahilli"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
     "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Sebze Çorbası | 10 Ay ve Üzeri Bebekler İçin Tuzsuz Çorba",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Köz Patlıcan ve Yoğurt Ezmesi | Balkan Usulü Yumuşak Kıvamlı Mama",
     "url": "https://dadagastro.com/tarif/koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama",
     "image": "https://dadagastro.com/varliklar/media/9278.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Izgara Mısır Püresi | Arjantin Usulü Bebek Maması",
     "url": "https://dadagastro.com/tarif/izgara-misir-puresi-arjantin-usulu-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/6949.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "tam-tahilli"
    ],
    "mutfak": [
     "irak-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Irak mutfağının tam tahıllı bebek maması firik lapası, kavrulmuş yeşil buğdayın bol suda tane tane erimesine kadar uzun uzun haşlanıp pürüzsüz bir kıvama getirilmesiyle hazırlanır. Firikteki lif, pirince göre daha yavaş sindirilen doyurucu bir öğün sunar."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Izgara Mısır Püresi | Arjantin Usulü Bebek Maması",
   "url": "https://dadagastro.com/tarif/izgara-misir-puresi-arjantin-usulu-bebek-mamasi",
   "image": "https://dadagastro.com/varliklar/media/6949.webp",
   "category": "Bebek Tarifleri",
   "difficulty": "Zor",
   "rating": "5.0",
   "slug": "izgara-misir-puresi-arjantin-usulu-bebek-mamasi",
   "description": "Arjantin usulü ızgara mısır püresi nasıl yapılır? Közleme, tane ayırma, haşlama ve iki kez süzme aşamalarıyla adım adım bebek maması tarifi.",
   "author": "Fatma Aktürk",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 25,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "taze mısır kabuklu",
     "amount": 3,
     "unit": "adet"
    },
    {
     "name": "Havuç buharda haşlanmış",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Su",
     "amount": 1,
     "unit": "su bardağı"
    },
    {
     "name": "Zeytinyağı",
     "amount": 1,
     "unit": "tatlı kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Mısırı ve havucu közleyin",
     "body": "Kabuklu mısırı ve soyulmuş havucu ızgara korlarının üzerinde ara ara çevirerek dış yapraklar simsiyah kömürleşene kadar 10 dakika közleyin.",
     "time": "10 dk"
    },
    {
     "title": "Taneleri ayırın",
     "body": "Mısırın kömürleşmiş yapraklarını soyup taneleri bıçakla koçandan sıyırın, havucu küçük parçalara doğrayın.",
     "time": "5 dk"
    },
    {
     "title": "Haşlayıp pürelestirin",
     "body": "Mısır tanelerini ve havuç parçalarını bir su bardağı suyla birlikte 5 dakika haşlayıp yumuşatın, ardından zeytinyağıyla birlikte blenderdan geçirin.",
     "time": "5 dk"
    },
    {
     "title": "İki kez süzün",
     "body": "Elde ettiğiniz püreyi ince bir süzgeçten iki kez geçirip kabuk ve lif kalıntısı kalmadığından emin olun.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 116,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Püreyi bebeğinize vermeden önce mutlaka ince süzgeçten geçirin; en ufak bir kabuk parçası boğulma riski taşır. Tuz ve şeker ilavesi 1 yaşından önce eklenmez."
     }
    ],
    "tags": [],
    "features": [
     "Bebek Tarifleri",
     "Sebze",
     "Arjantin Mutfağı",
     "Glutensiz",
     "Şeker İlavesiz",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 10 dk + 15 dk",
     "ZorlukZor"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "taze mısır kabuklu",
     "note": "kabuklu",
     "quantity": "3 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Havuç buharda haşlanmış",
     "note": "buharda haşlanmış",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Su",
     "note": "",
     "quantity": "1 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/6949.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "2",
   "chef": {
    "info": "Fatma Aktürk\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif34",
     "Takipçi3"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "08 Mayıs 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Bebek Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/bebek-tarifleri"
    },
    {
     "label": "Sebze",
     "href": "https://dadagastro.com/tarifler/kategori/sebze"
    },
    {
     "label": "Arjantin Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=arjantin-mutfagi"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Tuzsuz Bebek Tavuk Suyu | Mamaların Tabanı İçin Süzülmüş Et Suyu",
     "url": "https://dadagastro.com/tarif/tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Sebze Çorbası | 10 Ay ve Üzeri Bebekler İçin Tuzsuz Çorba",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Köz Patlıcan ve Yoğurt Ezmesi | Balkan Usulü Yumuşak Kıvamlı Mama",
     "url": "https://dadagastro.com/tarif/koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama",
     "image": "https://dadagastro.com/varliklar/media/9278.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Firik Lapası | Irak Usulü Kavrulmuş Buğday Bebek Maması",
     "url": "https://dadagastro.com/tarif/firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi",
     "image": "https://dadagastro.com/varliklar/media/8033.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Ramazan Yaman",
     "rating": 5,
     "body": "Havuç yerine tatlı patatesle de denedim, mısırın tatlılığıyla güzel uyum sağladı ve bebeğim hiç yadırgamadı. Süzgeçten geçirme adımını ikiden fazla tekrarlamak gerekir mi, yoksa iki kez gerçekten yeterli mi?",
     "date": "4 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "2",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "glutensiz",
     "seker-ilavesiz"
    ],
    "mutfak": [
     "arjantin-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Arjantin'in asado kültüründen ilham alan bu bebek maması, mısır koçanlarının közde kavrulup tanelerinin ince bir püre kıvamına getirilmesiyle hazırlanır. Kabuk ve lif kalıntısı bırakmamak için iki kez süzülen püre, 8 aydan itibaren bebeklerin ilk tahıllı lezzetlerinden biridir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Saleeg | Suudi Arabistan Usulü Sütte ve Tavuk Suyunda Pişen Kremamsı Pilav",
   "url": "https://dadagastro.com/tarif/saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav-kapak.webp",
   "category": "Pilav",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav",
   "description": "Saleeg nasıl yapılır? Kısa taneli pirincin önce baharatlı tavuk suyunda, sonra sütte kremamsı pişirildiği ve kızarmış tavukla verildiği Taif yemeği.",
   "author": "Rüzgar Korol",
   "servings": 6,
   "unit": "kişilik",
   "minutes": 115,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "bütün piliç (dört parçaya bölünmüş)",
     "amount": 1.4,
     "unit": "kg"
    },
    {
     "name": "su",
     "amount": 2,
     "unit": "l"
    },
    {
     "name": "kuru soğan",
     "amount": 100,
     "unit": "g"
    },
    {
     "name": "bütün kakule",
     "amount": 6,
     "unit": "adet"
    },
    {
     "name": "defne yaprağı",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "çubuk tarçın",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "tane karabiber",
     "amount": 2,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 12,
     "unit": "g"
    },
    {
     "name": "baldo pirinç",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "sıcak tavuk suyu (yukarıdan)",
     "amount": 1,
     "unit": "l"
    },
    {
     "name": "tam yağlı süt",
     "amount": 800,
     "unit": "ml"
    },
    {
     "name": "tereyağı",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 3,
     "unit": "g"
    },
    {
     "name": "sade yağ",
     "amount": 30,
     "unit": "g"
    },
    {
     "name": "toz kakule",
     "amount": 1,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 1,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Pirinci yıka",
     "body": "Pirinci süzgeçte, akan su berraklaşana kadar yıkayın ve bol soğuk suyla bir kaba alın.",
     "time": "5 dk"
    },
    {
     "title": "Tavuğu haşla",
     "body": "Tavuk parçalarını 2 litre soğuk suyla tencereye alın ve kaynamaya getirin; yüzeyde toplanan köpüğü kepçeyle alın. İkiye kestiğiniz soğanı, kakuleyi, defneyi, tarçını, tane karabiberi ve tuzu ekleyin, kısık ateşte kapak aralık 40 dakika pişirin. Termometreyi budun en kalın yerine kemiğe değmeden batırın: 74 °C'yi gördüğünüzde tavuk pişmiştir.",
     "time": "45 dk"
    },
    {
     "title": "Suyu süz",
     "body": "Tavuk parçalarını bir tepsiye alın. Suyu ince süzgeçten geçirip 1 litresini ölçün ve kısık ateşte sıcak tutun; kalanını başka bir yemek için saklayın. Sütü ayrı bir tencerede kaynamaya yakın ısıtın.",
     "time": "5 dk"
    },
    {
     "title": "Pirinci suda pişir",
     "body": "Islattığınız pirinci süzüp sıcak tavuk suyuna ekleyin, bir kez karıştırıp orta-kısık ateşte kapaksız pişirin. 12–15 dakikada su çekilir ve pirinç tanesi dışı yumuşak, ortası hafif diri hâle gelir.",
     "time": "15 dk"
    },
    {
     "title": "Sütle kremalaştır",
     "body": "Sıcak sütü üç seferde, her seferinde bir öncekini çekmesini bekleyerek ekleyin ve tahta kaşıkla tencerenin dibini kazıyarak sık sık karıştırın. 20–25 dakika sonra pirinç tamamen yumuşar ve kaşıktan yavaşça akan, risotto gibi kremamsı bir kıvam alır. Tereyağını ve 3 g tuzu ekleyip ocağı kapatın.",
     "time": "25 dk"
    },
    {
     "title": "Tavuğu kızart",
     "body": "Pilav pişerken fırını 220 °C'ye ısıtın. Tavuk parçalarını kâğıt havluyla kurulayın, eritilmiş sade yağı toz kakule ve karabiberle karıştırıp derisine sürün. Fırının üst rafında 12–15 dakika, deri altın rengi olana kadar kızartın.",
     "time": "15 dk"
    },
    {
     "title": "Servis et",
     "body": "Pilavı geniş bir servis tabağına yayın, tavuk parçalarını üstüne dizin ve tepsideki yağı pilavın üstüne gezdirin. Pilav bekledikçe koyulaşır; hemen servis edin.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 2,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Pirinç pişirmeden önce 30 dakika suda bekletilir; süt pirince azar azar eklenir ve tencerenin dibi durmadan kazınır, çünkü süt tabanda kolayca tutar ve yanık kokusu bütün pilava geçer."
     }
    ],
    "tags": [],
    "features": [
     "Pilav",
     "Suudi Arabistan Mutfağı",
     "Protein Ağırlıklı",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon6 kişilik",
     "Hazırlık + Pişirme 20 dk + 95 dk",
     "ZorlukOrta",
     "Pişirme Derecesi220°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Tavuk ve suyu için"
    },
    {
     "name": "bütün piliç (dört parçaya bölünmüş)",
     "note": "",
     "quantity": "1,4 kg",
     "unit": "kg",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "su",
     "note": "",
     "quantity": "2 l",
     "unit": "l",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "100 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "bütün kakule",
     "note": "",
     "quantity": "6 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "defne yaprağı",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "çubuk tarçın",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tane karabiber",
     "note": "",
     "quantity": "2 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "12 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Pilav için"
    },
    {
     "name": "baldo pirinç",
     "note": "",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [
      "osmancık pirinç — daha az nişasta salar ve tanesi belirgin kalır, sütü 100 ml azaltın"
     ],
     "sponsor": ""
    },
    {
     "name": "sıcak tavuk suyu (yukarıdan)",
     "note": "",
     "quantity": "1 l",
     "unit": "l",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tam yağlı süt",
     "note": "",
     "quantity": "800 ml",
     "unit": "ml",
     "substitutes": [
      "yarım yağlı süt — kıvam daha sulu ve daha az kremamsı olur, son 5 dakikayı kapak açık pişirin"
     ],
     "sponsor": ""
    },
    {
     "name": "tereyağı",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "3 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Tavuğu kızartmak için"
    },
    {
     "name": "sade yağ",
     "note": "",
     "quantity": "30 g",
     "unit": "gram",
     "substitutes": [
      "tereyağı — 220 °C'de kararır, fırını 200 °C'ye ayarlayıp 3 dakika uzun pişirin"
     ],
     "sponsor": ""
    },
    {
     "name": "toz kakule",
     "note": "",
     "quantity": "1 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "1 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "3",
   "chef": {
    "info": "Rüzgar Korol\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif31",
     "Takipçi25"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "15 Eylül 2026",
    "Son güncelleme: 15 Eylül 2026"
   ],
   "features": [
    {
     "label": "Pilav",
     "href": "https://dadagastro.com/tarifler/kategori/pilav"
    },
    {
     "label": "Suudi Arabistan Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suudi-arabistan-mutfagi"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "751 kcal",
      "label": "Kalori"
     },
     {
      "value": "38.4 g",
      "label": "Protein"
     },
     {
      "value": "61.6 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "39 g",
      "label": "Yağ"
     },
     {
      "value": "1.4 g",
      "label": "Lif"
     },
     {
      "value": "7.5 g",
      "label": "Şeker"
     },
     {
      "value": "752 mg",
      "label": "Sodyum"
     },
     {
      "value": "16 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %20",
     "Karbonhidrat %33",
     "Yağ %47"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
     "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Pilav | Tereyağlı Kavrulmuş Arpa Şehriyesi",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Greçka Po-Kupeçeski | Rus Usulü Etli Havuçlu Tencere Karabuğdayı",
     "url": "https://dadagastro.com/tarif/grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kuşkonmazlı Makademya Pilavı | Avustralya Usulü Fındıklı Pilav",
     "url": "https://dadagastro.com/tarif/kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav",
     "image": "https://dadagastro.com/varliklar/media/8115.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Parisa Rahimi",
     "rating": null,
     "body": "Tavuğu kızartma adımı isteğe bağlı gibi duruyor ama pilavın yanında o kızarmış deri olmayınca yemek tekdüze kalıyor.",
     "date": "3 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Rüzgar",
       "body": "Kızartma adımı Hicaz sofrasında standarttır, isteğe bağlı değil. Fırında üstten de kızartabilirsiniz, sonuç aynı.",
       "date": "3 hafta önce"
      }
     ]
    },
    {
     "author": "Şule Ünsal",
     "rating": null,
     "body": "Pirinci sütle kremalaştırırken sürekli karıştırmak gerekiyor, bıraktığım an dibi tuttu. Tencerenin de kalın tabanlı olması şart, ince tencerede sütün değdiği yer bir anda kahverengileşip pilava yanık tat veriyor.",
     "date": "3 hafta önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "protein-agirlikli"
    ],
    "mutfak": [
     "suudi-arabistan-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Saleeg, Hicaz'ın ve özellikle Taif'in beyaz pirinç yemeğidir: kısa taneli pirinç önce kakule, defne ve tarçınla kaynatılan tavuk suyunu çeker, sonra sütle karıştırılarak lapayla risotto arası kremamsı bir kıvama gelir. Tavuk haşlandıktan sonra sade yağla fırında kızartılır ve pirincin üstüne yatırılır. Tatlı değil tuzludur; sütü sosu bağlamak için kullanır, şeker girmez."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Arpa Şehriyeli Pilav | Tereyağlı Kavrulmuş Arpa Şehriyesi",
   "url": "https://dadagastro.com/tarif/arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-kapak.webp",
   "category": "Pilav",
   "difficulty": "Çok Kolay",
   "rating": "5.0",
   "slug": "arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi",
   "description": "Arpa şehriyesi pilav olur mu, kaç ölçü su çeker ve ne kadar kavrulur? Tereyağında kavrulup et suyuyla demlenen arpa şehriyeli pilavın tarifi.",
   "author": "Derin Sezek",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 32,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "arpa şehriye",
     "amount": 300,
     "unit": "g"
    },
    {
     "name": "kuru soğan",
     "amount": 60,
     "unit": "g"
    },
    {
     "name": "tereyağı",
     "amount": 40,
     "unit": "g"
    },
    {
     "name": "sıcak et suyu",
     "amount": 600,
     "unit": "ml"
    },
    {
     "name": "tuz",
     "amount": 6,
     "unit": "g"
    },
    {
     "name": "karabiber",
     "amount": 1,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Şehriyeyi kavur",
     "body": "Tereyağını tencerede eritip arpa şehriyesini orta ateşte 5–6 dakika, taneler her yanından kahverengileşene kadar sürekli çevirin.",
     "time": "7 dk"
    },
    {
     "title": "Soğanı ekle",
     "body": "İnce doğranmış soğanı ekleyip 4 dakika, yumuşayana kadar karıştırın.",
     "time": "5 dk"
    },
    {
     "title": "Suyu ekle ve pişir",
     "body": "Sıcak et suyunu, tuzu ve karabiberi ekleyin; ölçü hacimcedir, bir ölçü arpa şehriyesine iki ölçü su. Kaynayınca ateşi kısıp kapağı kapatın ve 12–15 dakika, su çekilip taneler dişe yumuşak gelene kadar pişirin.",
     "time": "15 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Pişen pilavı ocaktan alıp kapağın altına bez koyarak 10 dakika demlendirin; demlenmeden karıştırılan şehriye birbirine yapışır."
     }
    ],
    "tags": [],
    "features": [
     "Pilav",
     "Türk Mutfağı",
     "Yumurta İçermez",
     "Şeker İlavesiz",
     "Kuruyemiş İçermez",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 10 dk + 22 dk",
     "ZorlukÇok Kolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Pilav için"
    },
    {
     "name": "arpa şehriye",
     "note": "",
     "quantity": "300 g",
     "unit": "gram",
     "substitutes": [
      "tel şehriye — çok daha ince olduğu için 2 dakika kısa kavrulur ve 10 dakikada pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "60 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tereyağı",
     "note": "",
     "quantity": "40 g",
     "unit": "gram",
     "substitutes": [
      "sadeyağ — daha yoğun kokar, aynı miktar"
     ],
     "sponsor": ""
    },
    {
     "name": "sıcak et suyu",
     "note": "",
     "quantity": "600 ml",
     "unit": "ml",
     "substitutes": [
      "sıcak su — pilav daha sade olur, tuzu 2 g artırın"
     ],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "6 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "1 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "1",
   "chef": {
    "info": "Derin Sezek\nÇömez Aşçı\n2026'dan beri üye",
    "meta": [
     "Tarif6",
     "Takipçi7"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "03 Eylül 2026",
    "Son güncelleme: 03 Eylül 2026"
   ],
   "features": [
    {
     "label": "Pilav",
     "href": "https://dadagastro.com/tarifler/kategori/pilav"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "353 kcal",
      "label": "Kalori"
     },
     {
      "value": "10 g",
      "label": "Protein"
     },
     {
      "value": "58 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "9 g",
      "label": "Yağ"
     },
     {
      "value": "2.6 g",
      "label": "Lif"
     },
     {
      "value": "2.9 g",
      "label": "Şeker"
     },
     {
      "value": "590 mg",
      "label": "Sodyum"
     },
     {
      "value": "5.3 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %11",
     "Karbonhidrat %66",
     "Yağ %23"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Saleeg | Suudi Arabistan Usulü Sütte ve Tavuk Suyunda Pişen Kremamsı Pilav",
     "url": "https://dadagastro.com/tarif/saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
     "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Greçka Po-Kupeçeski | Rus Usulü Etli Havuçlu Tencere Karabuğdayı",
     "url": "https://dadagastro.com/tarif/grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kuşkonmazlı Makademya Pilavı | Avustralya Usulü Fındıklı Pilav",
     "url": "https://dadagastro.com/tarif/kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav",
     "image": "https://dadagastro.com/varliklar/media/8115.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-adim3.webp"
     ]
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "yumurta-icermez",
     "seker-ilavesiz",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Arpa şehriyesi pirinç yerine tek başına pilav olur: taneler tereyağında kahverengileşene kadar kavrulur ve et suyuyla demlenir. Kavurmanın rengi pilavın tadını belirler, bu yüzden acele edilmez. Izgara etlerin ve sulu yemeklerin yanına, pirinç pilavının yerine konur."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Greçka Po-Kupeçeski | Rus Usulü Etli Havuçlu Tencere Karabuğdayı",
   "url": "https://dadagastro.com/tarif/grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi-kapak.webp",
   "category": "Pilav",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi",
   "description": "Karabuğday lapalaşmadan nasıl pişer? Dana eti, soğan ve havuçla tek tencerede demlenen Rus usulü tüccar karabuğdayı tarifi, adım adım.",
   "author": "Rüya Pekkan",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 100,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "dana kuşbaşı (kol ya da but)",
     "amount": 450,
     "unit": "g"
    },
    {
     "name": "ayçiçek yağı",
     "amount": 3,
     "unit": "yemek kaşığı"
    },
    {
     "name": "kuru soğan",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "havuç",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "domates salçası",
     "amount": 1,
     "unit": "yemek kaşığı"
    },
    {
     "name": "sarımsak",
     "amount": 3,
     "unit": "diş"
    },
    {
     "name": "defne yaprağı",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "sıcak su (et için)",
     "amount": 250,
     "unit": "ml"
    },
    {
     "name": "kavrulmuş karabuğday",
     "amount": 300,
     "unit": "g"
    },
    {
     "name": "kaynar su",
     "amount": 600,
     "unit": "ml"
    },
    {
     "name": "tuz",
     "amount": 2,
     "unit": "çay kaşığı"
    },
    {
     "name": "karabiber",
     "amount": 0.5,
     "unit": "çay kaşığı"
    },
    {
     "name": "tereyağı",
     "amount": 20,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Karabuğdayı ayıkla ve kavur",
     "body": "Karabuğdayı tepsiye yayıp kararmış taneleri ve taşları ayıklayın, soğuk suda iki kez yıkayıp süzün. Kuru ve geniş bir tavada orta ateşte 4–5 dakika, üzerindeki su buharlaşıp taneler fındık gibi kokana kadar karıştırarak kavurun; kavrulan tane pişerken birbirine yapışmaz.",
     "time": "8 dk"
    },
    {
     "title": "Eti mühürle",
     "body": "Etin suyunu kâğıt havluyla alın. Kalın dipli tencerede yağı iyice ısıtıp eti iki partide, her yüzü koyu kahverengi olana kadar 4–5 dakika kavurun; tencere kalabalıksa et suyunu salar ve haşlanır.",
     "time": "10 dk"
    },
    {
     "title": "Sebzeleri ekle",
     "body": "Yarım ay doğranmış soğanı ve iri rendelenmiş havucu ete katıp 7 dakika, soğan yumuşayıp havuç rengini yağa verene kadar çevirin. Salçayı ve ezilmiş sarımsağı ekleyip 2 dakika daha, salçanın çiğ kokusu gidene kadar kavurun.",
     "time": "10 dk"
    },
    {
     "title": "Eti yumuşat",
     "body": "250 ml sıcak suyu ve defneyi ekleyin, kapağı kapatıp kısık ateşte 40–45 dakika pişirin. Et parçası çatalla kolayca bölünüyorsa hazırdır; su tamamen çekilirse birkaç kaşık sıcak su ekleyin.",
     "time": "45 dk"
    },
    {
     "title": "Karabuğdayı demle",
     "body": "Karabuğdayı etin üzerine eşit bir kat hâlinde yayın, tuzu serpin ve 600 ml kaynar suyu kaşığın sırtından yavaşça dökün; su karabuğdayı 1 cm geçmeli. Kaynayınca ateşi en kısığa indirip kapağı sıkıca kapatın ve karıştırmadan 20 dakika pişirin. Yüzeyde küçük buhar delikleri açılmış ve su görünmüyorsa hazırdır.",
     "time": "20 dk"
    },
    {
     "title": "Tereyağıyla harmanla",
     "body": "Demlenen karabuğdayın üstüne tereyağını ve karabiberi koyup çatalla alttaki etle birlikte havalandırarak karıştırın. Defneyi çıkarıp sıcak servis edin; yanında salatalık turşusu iyi gider.",
     "time": "2 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 0,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Karabuğdayı ekledikten sonra karıştırmayın ve kapağı açmayın; buhar kaçarsa taneler üstte çiğ, altta lapa kalır. Ocaktan alınca kapak kapalı 10 dakika demlendirin."
     }
    ],
    "tags": [],
    "features": [
     "Pilav",
     "Kırmızı Et",
     "Rus Mutfağı",
     "Glutensiz",
     "Protein Ağırlıklı",
     "Yüksek Lifli",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 25 dk + 75 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Et için"
    },
    {
     "name": "dana kuşbaşı (kol ya da but)",
     "note": "",
     "quantity": "450 g",
     "unit": "gram",
     "substitutes": [
      "kuzu kuşbaşı — daha yağlı ve kokuludur, pişme süresi aynıdır"
     ],
     "sponsor": ""
    },
    {
     "name": "ayçiçek yağı",
     "note": "",
     "quantity": "3 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kuru soğan",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "havuç",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "domates salçası",
     "note": "",
     "quantity": "1 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sarımsak",
     "note": "",
     "quantity": "3 diş",
     "unit": "dis",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "defne yaprağı",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sıcak su (et için)",
     "note": "",
     "quantity": "250 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "group": "Karabuğday için"
    },
    {
     "name": "kavrulmuş karabuğday",
     "note": "",
     "quantity": "300 g",
     "unit": "gram",
     "substitutes": [
      "iri bulgur — daha nötr bir tat verir ve karabuğdayın fındıksı kokusu gelmez, aynı miktar suyla pişer"
     ],
     "sponsor": ""
    },
    {
     "name": "kaynar su",
     "note": "",
     "quantity": "600 ml",
     "unit": "ml",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "2 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "karabiber",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tereyağı",
     "note": "",
     "quantity": "20 g",
     "unit": "gram",
     "substitutes": [
      "margarin — aynı parlaklığı verir ama tereyağının kokusu olmaz"
     ],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "2",
   "chef": {
    "info": "Rüya Pekkan\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif43",
     "Takipçi20"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "30 Ağustos 2026",
    "Son güncelleme: 30 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Pilav",
     "href": "https://dadagastro.com/tarifler/kategori/pilav"
    },
    {
     "label": "Kırmızı Et",
     "href": "https://dadagastro.com/tarifler/kategori/kirmizi-et"
    },
    {
     "label": "Rus Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=rus-mutfagi"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Protein Ağırlıklı",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=protein-agirlikli"
    },
    {
     "label": "Yüksek Lifli",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yuksek-lifli"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "629 kcal",
      "label": "Kalori"
     },
     {
      "value": "32 g",
      "label": "Protein"
     },
     {
      "value": "67 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "28 g",
      "label": "Yağ"
     },
     {
      "value": "10 g",
      "label": "Lif"
     },
     {
      "value": "6 g",
      "label": "Şeker"
     },
     {
      "value": "1130 mg",
      "label": "Sodyum"
     },
     {
      "value": "9 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %20",
     "Karbonhidrat %41",
     "Yağ %39"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Saleeg | Suudi Arabistan Usulü Sütte ve Tavuk Suyunda Pişen Kremamsı Pilav",
     "url": "https://dadagastro.com/tarif/saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
     "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Pilav | Tereyağlı Kavrulmuş Arpa Şehriyesi",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kuşkonmazlı Makademya Pilavı | Avustralya Usulü Fındıklı Pilav",
     "url": "https://dadagastro.com/tarif/kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav",
     "image": "https://dadagastro.com/varliklar/media/8115.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Ferhat Odabaş",
     "rating": null,
     "body": "Karabuğdayı ayıklayıp kuru kavurmak kokuyu tamamen değiştiriyor, kavurmadan atınca yemek toprak tadı verdi. Karabuğdayı eti yumuşattıktan sonra katmak da gerekiyor, birlikte pişirince karabuğday dağılıp yemeği lapa yapıyor.",
     "date": "1 ay önce",
     "badge": "",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "glutensiz",
     "protein-agirlikli",
     "yuksek-lifli"
    ],
    "mutfak": [
     "rus-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Greçka po-kupeçeski, 'tüccar usulü karabuğday', Rus ev mutfağının tek tencere yemeğidir: et soğan ve havuçla kavrulup yumuşatılır, karabuğday üstüne serilip suyunu çekene kadar demlenir. Karabuğday etin suyunu ve salçanın rengini emer, taneler dağılmadan yumuşar. Adındaki tüccar, yemeğin bol etli ve doyurucu oluşuna gönderme yapar."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Kuşkonmazlı Makademya Pilavı | Avustralya Usulü Fındıklı Pilav",
   "url": "https://dadagastro.com/tarif/kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav",
   "image": "https://dadagastro.com/varliklar/media/8115.webp",
   "category": "Pilav",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav",
   "description": "Pirincin kuşkonmaz ve makademya fındığıyla ocak üstünde piştiği Avustralya usulü pilav tarifi, adım adım anlatım.",
   "author": "Bekir Tekin",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 50,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Pirinç",
     "amount": 1.5,
     "unit": "su bardağı"
    },
    {
     "name": "kuşkonmaz doğranmış",
     "amount": 200,
     "unit": "g"
    },
    {
     "name": "makademya fındığı kabaca kırılmış",
     "amount": 0.5,
     "unit": "su bardağı"
    },
    {
     "name": "Soğan",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "tavuk suyu",
     "amount": 3,
     "unit": "su bardağı"
    },
    {
     "name": "Zeytinyağı",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "Karabiber",
     "amount": 0.5,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Soğanı kavurun",
     "body": "Doğranmış soğanı zeytinyağında 5 dakika kavurun.",
     "time": "5 dk"
    },
    {
     "title": "Pirinci kavurun",
     "body": "Pirinci ekleyip 3 dakika daha kavurmaya devam edin.",
     "time": "3 dk"
    },
    {
     "title": "Pişirin",
     "body": "Tavuk suyu, tuz ve karabiberi ekleyip kaynatın, kısık ateşte kapağı kapalı 15 dakika pişirin.",
     "time": "15 dk"
    },
    {
     "title": "Kuşkonmazı ekleyin",
     "body": "Kuşkonmazı ekleyip 5 dakika daha pişirin.",
     "time": "5 dk"
    },
    {
     "title": "Demlendirip servis edin",
     "body": "Ocaktan alıp makademya fındığını serpin, 10 dakika demlenmeye bırakıp servis edin.",
     "time": "10 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 112,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Makademya fındığını en son ekleyin, erken eklenirse pilavın nemiyle yumuşayıp çıtırlığını kaybeder. Alerjen: sert kabuklu yemiş (makademya) içerir."
     }
    ],
    "tags": [],
    "features": [
     "Pilav",
     "Avustralya Mutfağı",
     "Glutensiz",
     "Laktozsuz",
     "Süt İçermez",
     "Yumurta İçermez",
     "Şeker İlavesiz",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 25 dk + 25 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Pirinç",
     "note": "",
     "quantity": "1½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "kuşkonmaz doğranmış",
     "note": "doğranmış",
     "quantity": "200 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "makademya fındığı kabaca kırılmış",
     "note": "kabaca kırılmış",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Soğan",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "tavuk suyu",
     "note": "",
     "quantity": "3 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Karabiber",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8115.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "4",
   "chef": {
    "info": "Bekir Tekin\nÇömez Aşçı\n2026'dan beri üye",
    "meta": [
     "Tarif4",
     "Takipçi1"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "21 Haziran 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Pilav",
     "href": "https://dadagastro.com/tarifler/kategori/pilav"
    },
    {
     "label": "Avustralya Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=avustralya-mutfagi"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Saleeg | Suudi Arabistan Usulü Sütte ve Tavuk Suyunda Pişen Kremamsı Pilav",
     "url": "https://dadagastro.com/tarif/saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arroz con Pato | Peru Usulü Kişnişli Ördekli Pilav",
     "url": "https://dadagastro.com/tarif/arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Arpa Şehriyeli Pilav | Tereyağlı Kavrulmuş Arpa Şehriyesi",
     "url": "https://dadagastro.com/tarif/arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Greçka Po-Kupeçeski | Rus Usulü Etli Havuçlu Tencere Karabuğdayı",
     "url": "https://dadagastro.com/tarif/grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "glutensiz",
     "laktozsuz",
     "sut-icermez",
     "yumurta-icermez",
     "seker-ilavesiz"
    ],
    "mutfak": [
     "avustralya-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Avustralya'nın kendi ağacından çıkan makademya fındığı, bu pilavda kuşkonmazla buluşup ocak üstünde hazırlanan sade bir pilava çıtır bir doku katıyor. Piknik sepetlerinde soğuduğunda bile lezzetini koruyan bir tarif."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Airfryer'da Hamsili Ekmek | Karadeniz Usulü Kahvaltılık Balık Ekmeği",
   "url": "https://dadagastro.com/tarif/airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi",
   "image": "https://dadagastro.com/varliklar/media/7518.webp",
   "category": "Balık ve Deniz Ürünleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi",
   "description": "Airfryer'da hamsili ekmek nasıl yapılır? Hamsinin mısır ununa bulanması, airfryer'da pişirilmesi, ekmeğin kızartılması ve sandviçin hazırlanması aşamalarıyla…",
   "author": "Canan Yücel",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 45,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Hamsi temizlenmiş, kılçığı ayıklanmış",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "mısır unu",
     "amount": 4,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Yumurta",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Tuz",
     "amount": 0.5,
     "unit": "çay kaşığı"
    },
    {
     "name": "Karabiber",
     "amount": 0.5,
     "unit": "çay kaşığı"
    },
    {
     "name": "ekmek köy ekmeği, dilimlenmiş",
     "amount": 8,
     "unit": "dilim"
    },
    {
     "name": "Domates dilimlenmiş",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Soğan ince doğranmış",
     "amount": 0.5,
     "unit": "adet"
    },
    {
     "name": "Maydanoz ince kıyılmış",
     "amount": 1,
     "unit": "demet"
    }
   ],
   "steps": [
    {
     "title": "Hamsileri hazırlayın",
     "body": "Temizlenmiş hamsileri yumurtaya bulayıp mısır unu, tuz ve karabiberle harmanlayın.",
     "time": "10 dk"
    },
    {
     "title": "Airfryer'da pişirin",
     "body": "Hamsileri airfryer sepetine tek sıra hâlinde dizip 200 derecede 12 dakika, çıtırlaşana kadar pişirin. Airfryer'ınız yoksa aynı sıcaklıktaki fırında da 12 dakika pişirebilirsiniz.",
     "time": "12 dk"
    },
    {
     "title": "Ekmeği kızartın",
     "body": "Köy ekmeği dilimlerini yağsız bir tavada her iki yüzü hafif kızarana kadar 4 dakika kızartın.",
     "time": "4 dk"
    },
    {
     "title": "Sandviçleri hazırlayın",
     "body": "Ekmek dilimlerinin üzerine domates ve soğan dilimlerini yerleştirip pişmiş hamsileri paylaştırın, maydanoz serperek servis edin.",
     "time": "4 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 96,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Hamsileri airfryer sepetine tek sıra hâlinde dizin, üst üste bindirirseniz çıtırlaşmadan buğulanır. Airfryer'ınız yoksa hamsileri 200 dereceye ısıtılmış fırında 12 dakika pişirebilirsiniz. Alerjen: balık, buğday (gluten, ekmekten) ve yumurta içerir."
     }
    ],
    "tags": [],
    "features": [
     "Balık ve Deniz Ürünleri",
     "Türk Mutfağı",
     "Laktozsuz",
     "Süt İçermez",
     "Şeker İlavesiz",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 15 dk + 30 dk",
     "ZorlukKolay",
     "Pişirme Derecesi200°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Hamsi temizlenmiş, kılçığı ayıklanmış",
     "note": "temizlenmiş, kılçığı ayıklanmış",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "mısır unu",
     "note": "",
     "quantity": "4 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Yumurta",
     "note": "",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Karabiber",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "ekmek köy ekmeği, dilimlenmiş",
     "note": "köy ekmeği, dilimlenmiş",
     "quantity": "8 dilim",
     "unit": "dilim",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Domates dilimlenmiş",
     "note": "dilimlenmiş",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Soğan ince doğranmış",
     "note": "ince doğranmış",
     "quantity": "½ adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Maydanoz ince kıyılmış",
     "note": "ince kıyılmış",
     "quantity": "1 demet",
     "unit": "demet",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/7518.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "2",
   "clapCount": "0",
   "chef": {
    "info": "Canan Yücel\nKıdemli Aşçı\n2026'dan beri üye",
    "meta": [
     "Tarif140",
     "Takipçi35"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "09 Temmuz 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Balık ve Deniz Ürünleri",
     "href": "https://dadagastro.com/tarifler/kategori/balik-ve-deniz-urunleri"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Asam Pedas | Malezya Usulü Demirhindili Ekşi Acı Balık Yahnisi",
     "url": "https://dadagastro.com/tarif/asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Jiao Yan Karides | Çin Usulü Tuz ve Biberli Çıtır Karides",
     "url": "https://dadagastro.com/tarif/jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "İran Usulü Baharatlı Acılı Balık Kebabı | Gece Atıştırmalığından Brunch'a Uzanan Şiş",
     "url": "https://dadagastro.com/tarif/iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis",
     "image": "https://dadagastro.com/varliklar/media/8444.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Karabuğday Kaplamalı Levrek | Fırında Tam Tahıllı Kabuklu Balık",
     "url": "https://dadagastro.com/tarif/karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik",
     "image": "https://dadagastro.com/varliklar/media/8551.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "laktozsuz",
     "sut-icermez",
     "seker-ilavesiz",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Karadeniz'in kahvaltı sofralarında sevilen hamsili ekmek, mısır ununa bulanan hamsilerin airfryer'da kavrulup köy ekmeği dilimleri arasına domates ve soğanla yerleştirilmesiyle hazırlanır. Yağda kızartmadan elde edilen çıtırlık, klasik tadı korurken daha hafif bir kahvaltı sunar."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Böğrülce Yemeği | Kuzu Etli Düdüklü Tencerede",
   "url": "https://dadagastro.com/tarif/bogrulce-yemegi-kuzu-etli-duduklu-tencerede",
   "image": "https://dadagastro.com/varliklar/media/7804.webp",
   "category": "Bakliyat",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "bogrulce-yemegi-kuzu-etli-duduklu-tencerede",
   "description": "Kuzu etli böğrülce yemeği düdüklü tencerede nasıl yapılır? Etin kavrulması, böğrülcenin eklenmesi ve düdüklüde pişirme aşamalarıyla tarif.",
   "author": "Ebru Bolatlı",
   "servings": 5,
   "unit": "kişilik",
   "minutes": 45,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "kuşbaşı et kuzu",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "böğrülce yıkanmış",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "Soğan küp doğranmış",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Domates salçası",
     "amount": 1,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "Karabiber",
     "amount": 0.5,
     "unit": "çay kaşığı"
    },
    {
     "name": "Su",
     "amount": 3,
     "unit": "su bardağı"
    }
   ],
   "steps": [
    {
     "title": "Eti kavurun",
     "body": "Düdüklü tencerede kuşbaşı eti ve soğanı orta ateşte rengi dönene kadar 10 dakika kavurun.",
     "time": "10 dk"
    },
    {
     "title": "Böğrülceyi ekleyin",
     "body": "Yıkanmış böğrülceyi, domates salçasını, tuzu, karabiberi ve suyu ekleyip karıştırın, ardından düdüklünün kapağını kapatın.",
     "time": "5 dk"
    },
    {
     "title": "Düdüklüde pişirin",
     "body": "Düdüklü tencere kaynayıp ıslık çaldıktan sonra kısık ateşte 20 dakika pişirin.",
     "time": "20 dk"
    },
    {
     "title": "Dinlendirip servis edin",
     "body": "Ocaktan alıp kapağı açmadan önce buharın kendiliğinden inmesi için 10 dakika bekleyin, ardından sıcak servis edin.",
     "time": "10 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 106,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Böğrülceyi pişirmeden önce mutlaka yıkayın, aksi halde köpüklenme kapağın contasını zorlayabilir. Düdüklünün buharını kapağı açmadan önce kendiliğinden indirin, aksi halde taneler dağılıp harç sululaşır."
     }
    ],
    "tags": [],
    "features": [
     "Bakliyat",
     "Türk Mutfağı",
     "Glutensiz",
     "Laktozsuz",
     "Süt İçermez",
     "Yumurta İçermez",
     "Şeker İlavesiz",
     "Kuruyemiş İçermez",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon5 kişilik",
     "Hazırlık + Pişirme 15 dk + 30 dk",
     "ZorlukOrta"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "kuşbaşı et kuzu",
     "note": "kuzu",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "böğrülce yıkanmış",
     "note": "yıkanmış",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Soğan küp doğranmış",
     "note": "küp doğranmış",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Domates salçası",
     "note": "",
     "quantity": "1 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Karabiber",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Su",
     "note": "",
     "quantity": "3 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/7804.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "2",
   "chef": {
    "info": "Ebru Bolatlı\nHat Aşçısı\n2026'dan beri üye",
    "meta": [
     "Tarif55",
     "Takipçi42"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "06 Mayıs 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Bakliyat",
     "href": "https://dadagastro.com/tarifler/kategori/bakliyat"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Moin Moin | Nijerya Usulü Buharda Börülce Pudingi",
     "url": "https://dadagastro.com/tarif/moin-moin-nijerya-usulu-buharda-borulce-pudingi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-moin-moin-nijerya-usulu-buharda-borulce-pudingi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Waakye | Gana Usulü Sorgum Yapraklı Pirinçli Fasulye",
     "url": "https://dadagastro.com/tarif/waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Enfrijoladas | Meksika Usulü Fasulye Sosuna Batırılmış Tortilla",
     "url": "https://dadagastro.com/tarif/enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Frijoles Refritos | Meksika Usulü Ezme Fasulye",
     "url": "https://dadagastro.com/tarif/frijoles-refritos-meksika-usulu-ezme-fasulye",
     "image": "https://dadagastro.com/varliklar/media/6936.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Nihal Ergün",
     "rating": 5,
     "body": "Salçayı biraz fazla koydum ama beş kişilik porsiyon yine de dengeli çıktı, hepimiz bitirdik.",
     "date": "4 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "3",
     "photos": [],
     "replies": []
    },
    {
     "author": "Selim Yıldız",
     "rating": 5,
     "body": "Düdüklüde tam 20 dakikada böğrülceler dağılmadan yumuşadı, kıvamı da tam istediğim gibi oldu.",
     "date": "3 ay önce",
     "badge": "Mutfak Meraklısı",
     "likes": "4",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "glutensiz",
     "laktozsuz",
     "sut-icermez",
     "yumurta-icermez",
     "seker-ilavesiz",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Böğrülce, kuzu kuşbaşı etiyle düdüklü tencerede kısa sürede pişirilerek hazırlanan doyurucu bir yemektir. Domates salçalı soğanlı harcı, taneleri dağıtmadan yumuşak bir kıvam bırakır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Sumaklı Yumurta | Düdüklü Tencerede Ürdün Usulü Piknik Yumurtası",
   "url": "https://dadagastro.com/tarif/sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi",
   "image": "https://dadagastro.com/varliklar/media/9061.webp",
   "category": "Yumurta Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi",
   "description": "Sumaklı yumurta nasıl yapılır? Yumurtaların düdüklü tencerede haşlanması, soyulması ve zeytinyağlı sumakla tatlandırılmasıyla adım adım Ürdün usulü piknik…",
   "author": "Şahnur Sezek",
   "servings": 3,
   "unit": "kişilik",
   "minutes": 40,
   "ratingCount": 2,
   "ingredients": [
    {
     "name": "Yumurta",
     "amount": 6,
     "unit": "adet"
    },
    {
     "name": "Sumak",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Zeytinyağı",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 0.5,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Yumurtaları yerleştirin",
     "body": "Yumurtaları düdüklü tencereye dizip üzerini su ile örtün.",
     "time": "5 dk"
    },
    {
     "title": "Düdüklü tencerede pişirin",
     "body": "Düdüklü tencerenin kapağını kapatıp düdük atınca ateşi kısıp 6 dakika pişirin.",
     "time": "8 dk"
    },
    {
     "title": "Basıncın inmesini bekleyin",
     "body": "Basıncın kendiliğinden inmesini bekleyip kapağı açın.",
     "time": "10 dk"
    },
    {
     "title": "Soyun",
     "body": "Yumurtaları soğuk suya alıp kabuklarını soyun.",
     "time": "5 dk"
    },
    {
     "title": "Tatlandırıp servis edin",
     "body": "Zeytinyağı ve tuzu karıştırıp yumurtaların üzerine gezdirin, üzerine sumak serpiştirip servis edin.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 108,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yumurtaları soğuk suya almadan soymayın, aksi halde kabuk zor ayrılır. Basıncın kendiliğinden inmesini bekleyin, erken açarsanız yumurta akı fazla pişebilir. Alerjen: yumurta içerir."
     }
    ],
    "tags": [],
    "features": [
     "Yumurta Tarifleri",
     "Ürdün Mutfağı",
     "Ketojenik",
     "Düşük Kalorili",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon3 kişilik",
     "Hazırlık + Pişirme 15 dk + 25 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Yumurta",
     "note": "",
     "quantity": "6 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Sumak",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/9061.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "1",
   "chef": {
    "info": "Şahnur Sezek\nKısım Şefi\n2026'dan beri üye",
    "meta": [
     "Tarif171",
     "Takipçi34"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "07 Temmuz 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Yumurta Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/yumurta-tarifleri"
    },
    {
     "label": "Ürdün Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=urdun-mutfagi"
    },
    {
     "label": "Ketojenik",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=ketojenik"
    },
    {
     "label": "Düşük Kalorili",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=dusuk-kalorili"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
     "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Nohutlu Baharatlı Yumurta Güveci | Fırında Safranlı Kahvaltı Güveci",
     "url": "https://dadagastro.com/tarif/nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci",
     "image": "https://dadagastro.com/varliklar/media/8268.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Suudi Usulü Düdüklüde Yumurtalı Cerişe | Dondurucuda Bekleyen Kahvaltılık",
     "url": "https://dadagastro.com/tarif/suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik",
     "image": "https://dadagastro.com/varliklar/media/9079.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Huevos Rellenos | Küba Usulü Baharatlı Dolgulu Yumurta",
     "url": "https://dadagastro.com/tarif/huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta",
     "image": "https://dadagastro.com/varliklar/media/8404.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "2"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "ketojenik",
     "dusuk-kalorili"
    ],
    "mutfak": [
     "urdun-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Sumaklı yumurta, düdüklü tencerede hızlıca haşlanan yumurtaların zeytinyağı ve sumakla tatlandırılmasından oluşan, Ürdün'de piknik sepetlerinin vazgeçilmezi olan pratik bir yumurta tarifidir. Düdüklü tencere, haşlama süresini kısaltırken kabukların da kolay soyulmasını sağlar."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Nohutlu Baharatlı Yumurta Güveci | Fırında Safranlı Kahvaltı Güveci",
   "url": "https://dadagastro.com/tarif/nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci",
   "image": "https://dadagastro.com/varliklar/media/8268.webp",
   "category": "Yumurta Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci",
   "description": "Nohutlu baharatlı yumurta güveci nasıl yapılır? Nohudun domatesle kavrulması, safranlı suyun eklenmesi ve yumurtayla fırınlanmasıyla adım adım kahvaltı güveci…",
   "author": "Belgin Aksoy",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 100,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Nohut haşlanmış",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "Domates",
     "amount": 2,
     "unit": "adet"
    },
    {
     "name": "Yumurta",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "Safran",
     "amount": 1,
     "unit": "tutam"
    },
    {
     "name": "Zeytinyağı",
     "amount": 3,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Kimyon",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "Karabiber",
     "amount": 0.5,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Domatesi kavurun",
     "body": "Domatesleri rendeleyip zeytinyağında kavurun.",
     "time": "8 dk"
    },
    {
     "title": "Nohudu ekleyin",
     "body": "Nohut, kimyon, tuz ve karabiberi ekleyip 5 dakika daha pişirin.",
     "time": "5 dk"
    },
    {
     "title": "Safranı ıslatın",
     "body": "Safranı 2 yemek kaşığı ılık suda 15 dakika bekletip rengini çıkarın.",
     "time": "15 dk"
    },
    {
     "title": "Güvece aktarın",
     "body": "Safranlı suyu güveç karışımına ekleyip karıştırın, güveç kabına aktarın.",
     "time": "3 dk"
    },
    {
     "title": "Yumurtaları kırın",
     "body": "Karışımın üzerine yumurtaları kırıp fırın kabına yerleştirin.",
     "time": "5 dk"
    },
    {
     "title": "Fırınlayın",
     "body": "Önceden 170 dereceye ısıtılmış fırında yumurta akı sertleşip sarısı kremamsı kalana kadar 20 dakika pişirin.",
     "time": "20 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 92,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yumurtaları kırarken sarılarını dağıtmamaya dikkat edin, güvecin görünümü ve kıvamı buna bağlıdır. Fırından erken çıkarırsanız sarı akışkan kalır, geç çıkarırsanız kurur; 20 dakika ideal süredir. Alerjen: yumurta içerir."
     }
    ],
    "tags": [],
    "features": [
     "Yumurta Tarifleri",
     "Türk Mutfağı",
     "Vejetaryen",
     "Glutensiz",
     "Laktozsuz",
     "Süt İçermez",
     "Şeker İlavesiz",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 30 dk + 70 dk",
     "ZorlukKolay",
     "Pişirme Derecesi170°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Nohut haşlanmış",
     "note": "haşlanmış",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Domates",
     "note": "",
     "quantity": "2 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Yumurta",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Safran",
     "note": "",
     "quantity": "1 tutam",
     "unit": "tutam",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "3 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Kimyon",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Karabiber",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8268.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "2",
   "chef": {
    "info": "Belgin Aksoy\nKıdemli Yamak\n2026'dan beri üye",
    "meta": [
     "Tarif43",
     "Takipçi12"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "29 Haziran 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Yumurta Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/yumurta-tarifleri"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Glutensiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=glutensiz"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Süt İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=sut-icermez"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
     "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Sumaklı Yumurta | Düdüklü Tencerede Ürdün Usulü Piknik Yumurtası",
     "url": "https://dadagastro.com/tarif/sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi",
     "image": "https://dadagastro.com/varliklar/media/9061.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Suudi Usulü Düdüklüde Yumurtalı Cerişe | Dondurucuda Bekleyen Kahvaltılık",
     "url": "https://dadagastro.com/tarif/suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik",
     "image": "https://dadagastro.com/varliklar/media/9079.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Huevos Rellenos | Küba Usulü Baharatlı Dolgulu Yumurta",
     "url": "https://dadagastro.com/tarif/huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta",
     "image": "https://dadagastro.com/varliklar/media/8404.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "glutensiz",
     "laktozsuz",
     "sut-icermez",
     "seker-ilavesiz",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Nohutlu baharatlı yumurta güveci, domates ve kimyonla kavrulan haşlanmış nohudun üzerine kırılan yumurtaların safranlı bir aromayla fırınlanmasından oluşan doyurucu bir brunch güvecidir. Safranlı ıslatma suyu, güvece hem altın bir renk hem de zarif bir koku katar."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Suudi Usulü Düdüklüde Yumurtalı Cerişe | Dondurucuda Bekleyen Kahvaltılık",
   "url": "https://dadagastro.com/tarif/suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik",
   "image": "https://dadagastro.com/varliklar/media/9079.webp",
   "category": "Yumurta Tarifleri",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik",
   "description": "Kırık buğdayın düdüklü tencerede kısa sürede pişirilip üzerine yumurta kırılarak tamamlanmasıyla Suudi usulü cerişe hazırlamanın adımları.",
   "author": "Ayşe Şahinkaya",
   "servings": 4,
   "unit": "kişilik",
   "minutes": 25,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "kırık buğday bir gece önceden ıslatılmış",
     "amount": 1,
     "unit": "su bardağı"
    },
    {
     "name": "Tereyağı",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Yumurta",
     "amount": 4,
     "unit": "adet"
    },
    {
     "name": "Tuz",
     "amount": 0.5,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Buğdayı düdüklüde pişirin",
     "body": "Islatılmış kırık buğdayı tereyağı ve tuzla düdüklü tencerede orta ateşte 12 dakika pişirin.",
     "time": "12 dk"
    },
    {
     "title": "Yumurtaları ekleyin",
     "body": "Basıncı boşalttıktan sonra yumurtaları buğdayın üzerine kırıp kapağı kapatmadan 3 dakika daha pişirin.",
     "time": "3 dk"
    },
    {
     "title": "Servis edin",
     "body": "Cerişeyi sıcak servis edin.",
     "time": "2 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 104,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Buğdayı bir gece önceden suda bekletin, ıslatılmayan buğday düdüklüde gereğinden uzun sürede yumuşar. Yumurtayı en son ekleyip fazla karıştırmayın. Alerjen: gluten (kırık buğday), yumurta, süt ve süt ürünleri (tereyağı) içerir."
     }
    ],
    "tags": [],
    "features": [
     "Yumurta Tarifleri",
     "Suudi Arabistan Mutfağı",
     "Vejetaryen",
     "Şeker İlavesiz",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon4 kişilik",
     "Hazırlık + Pişirme 10 dk + 15 dk",
     "ZorlukKolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "kırık buğday bir gece önceden ıslatılmış",
     "note": "bir gece önceden ıslatılmış",
     "quantity": "1 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tereyağı",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Yumurta",
     "note": "",
     "quantity": "4 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "½ çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/9079.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "5",
   "clapCount": "3",
   "chef": {
    "info": "Ayşe Şahinkaya\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif15",
     "Takipçi1"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "07 Haziran 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Yumurta Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/yumurta-tarifleri"
    },
    {
     "label": "Suudi Arabistan Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=suudi-arabistan-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Şeker İlavesiz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=seker-ilavesiz"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "270 kcal",
      "label": "Kalori"
     },
     {
      "value": "13 g",
      "label": "Protein"
     },
     {
      "value": "28 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "12 g",
      "label": "Yağ"
     },
     {
      "value": "4 g",
      "label": "Lif"
     },
     {
      "value": "1 g",
      "label": "Şeker"
     },
     {
      "value": "320 mg",
      "label": "Sodyum"
     },
     {
      "value": "5 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %19",
     "Karbonhidrat %41",
     "Yağ %40"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
     "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Sumaklı Yumurta | Düdüklü Tencerede Ürdün Usulü Piknik Yumurtası",
     "url": "https://dadagastro.com/tarif/sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi",
     "image": "https://dadagastro.com/varliklar/media/9061.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Nohutlu Baharatlı Yumurta Güveci | Fırında Safranlı Kahvaltı Güveci",
     "url": "https://dadagastro.com/tarif/nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci",
     "image": "https://dadagastro.com/varliklar/media/8268.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Huevos Rellenos | Küba Usulü Baharatlı Dolgulu Yumurta",
     "url": "https://dadagastro.com/tarif/huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta",
     "image": "https://dadagastro.com/varliklar/media/8404.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Volkan Aygün",
     "rating": 5,
     "body": "Tereyağı yerine sade yağ kullandım, cerişenin tadı biraz daha hafif çıktı ama yine de gerçekten lezzetliydi; 4 kişilik porsiyon kahvaltıda hızla bitti. Herkese denemesini öneririm.",
     "date": "2 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Ayşe",
       "body": "Sade yağ tereyağına iyi bir alternatif; isterseniz ikisini yarı yarıya karıştırıp hem hafiflik hem de tereyağının aromasını bir arada da deneyebilirsiniz.",
       "date": "2 ay önce"
      }
     ]
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "seker-ilavesiz",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "suudi-arabistan-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Suudi usulü düdüklüde yumurtalı cerişe, kırık buğdayın düdüklü tencerede kısa sürede pişirilip üzerine yumurta kırılarak tamamlanmasıyla hazırlanan doyurucu bir tariftir. Buğdayın önceden bir gece suda bekletilmesi, düdüklüdeki pişme süresini kısaltan bir adımdır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Huevos Rellenos | Küba Usulü Baharatlı Dolgulu Yumurta",
   "url": "https://dadagastro.com/tarif/huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta",
   "image": "https://dadagastro.com/varliklar/media/8404.webp",
   "category": "Yumurta Tarifleri",
   "difficulty": "Zor",
   "rating": "5.0",
   "slug": "huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta",
   "description": "Haşlanmış yumurtaların sarılarının mayonez ve kimyonla ezilip beyazlarına doldurularak dizilmesiyle Küba usulü huevos rellenos hazırlamanın adımları.",
   "author": "Ece Yetkiner",
   "servings": 6,
   "unit": "kişilik",
   "minutes": 25,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "haşlanmış yumurta soyulmuş",
     "amount": 8,
     "unit": "adet"
    },
    {
     "name": "Mayonez",
     "amount": 4,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Kimyon",
     "amount": 1,
     "unit": "çay kaşığı"
    },
    {
     "name": "Pul biber",
     "amount": 1,
     "unit": "tutam"
    },
    {
     "name": "Maydanoz ince kıyılmış, süslemek için",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 1,
     "unit": "çay kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Yumurtaları ikiye kesin",
     "body": "Haşlanmış yumurtaları keskin bir bıçakla boydan ikiye kesip sarılarını çıkarın.",
     "time": "8 dk"
    },
    {
     "title": "Harcı hazırlayın",
     "body": "Sarıları mayonez, kimyon, pul biber ve tuzla pürüzsüz olana kadar ezin.",
     "time": "7 dk"
    },
    {
     "title": "Doldurup dizin",
     "body": "Harcı bir poşete alıp yumurta beyazlarına düzenli şekilde sıkın, maydanozla süsleyip bir tabağa dizin.",
     "time": "10 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 84,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yumurtaları ikiye keserken keskin bir bıçak kullanın, aksi halde beyazlar yırtılır. Doldururken poşet veya kaşık kullanın, elle doldurmak düzensiz bir görünüm verir. Alerjen: yumurta içerir."
     }
    ],
    "tags": [],
    "features": [
     "Yumurta Tarifleri",
     "Küba Mutfağı",
     "Ketojenik",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon6 kişilik",
     "Hazırlık + Pişirme 25 dk + 0 dk",
     "ZorlukZor"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "haşlanmış yumurta soyulmuş",
     "note": "soyulmuş",
     "quantity": "8 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Mayonez",
     "note": "",
     "quantity": "4 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Kimyon",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Pul biber",
     "note": "",
     "quantity": "1 tutam",
     "unit": "tutam",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Maydanoz ince kıyılmış, süslemek için",
     "note": "ince kıyılmış, süslemek için",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "1 çay kaşığı",
     "unit": "cay-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8404.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "0",
   "chef": {
    "info": "Ece Yetkiner\nAşçı Yamağı\n2026'dan beri üye",
    "meta": [
     "Tarif27",
     "Takipçi14"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "27 Mayıs 2026",
    "Son güncelleme: 11 Eylül 2026"
   ],
   "features": [
    {
     "label": "Yumurta Tarifleri",
     "href": "https://dadagastro.com/tarifler/kategori/yumurta-tarifleri"
    },
    {
     "label": "Küba Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=kuba-mutfagi"
    },
    {
     "label": "Ketojenik",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=ketojenik"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "160 kcal",
      "label": "Kalori"
     },
     {
      "value": "9 g",
      "label": "Protein"
     },
     {
      "value": "1 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "13 g",
      "label": "Yağ"
     },
     {
      "value": "0 g",
      "label": "Lif"
     },
     {
      "value": "0 g",
      "label": "Şeker"
     },
     {
      "value": "220 mg",
      "label": "Sodyum"
     },
     {
      "value": "3 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %23",
     "Karbonhidrat %3",
     "Yağ %75"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
     "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Sumaklı Yumurta | Düdüklü Tencerede Ürdün Usulü Piknik Yumurtası",
     "url": "https://dadagastro.com/tarif/sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi",
     "image": "https://dadagastro.com/varliklar/media/9061.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Nohutlu Baharatlı Yumurta Güveci | Fırında Safranlı Kahvaltı Güveci",
     "url": "https://dadagastro.com/tarif/nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci",
     "image": "https://dadagastro.com/varliklar/media/8268.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Suudi Usulü Düdüklüde Yumurtalı Cerişe | Dondurucuda Bekleyen Kahvaltılık",
     "url": "https://dadagastro.com/tarif/suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik",
     "image": "https://dadagastro.com/varliklar/media/9079.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "ketojenik"
    ],
    "mutfak": [
     "kuba-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Huevos rellenos, önceden haşlanmış yumurtaların sarılarının mayonez ve kimyonla ezilip beyazlarına geri doldurularak şık bir tabakta dizilmesiyle hazırlanan Küba mezesidir. Kalabalık davetler için düzgün bir sunum yapmak deneyim isteyen bir tekniktir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Agedashi Tofu | Japon Usulü Airfryer'da Kızartılmış Tofu",
   "url": "https://dadagastro.com/tarif/agedashi-tofu-japon-usulu-airfryerda-kizartilmis-tofu",
   "image": "https://dadagastro.com/varliklar/media/7499.webp",
   "category": "Kahvaltılık",
   "difficulty": "Çok Kolay",
   "rating": "5.0",
   "slug": "agedashi-tofu-japon-usulu-airfryerda-kizartilmis-tofu",
   "description": "Japon usulü agedashi tofu nasıl yapılır? Tofunun süzülmesi, mısır nişastasına bulanması ve airfryer'da pişirilmesi adım adım anlatılıyor.",
   "author": "Ece Özdenak",
   "servings": 2,
   "unit": "kişilik",
   "minutes": 30,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "tofu yumuşak, ağırlıkla süzülmüş",
     "amount": 400,
     "unit": "g"
    },
    {
     "name": "mısır nişastası",
     "amount": 3,
     "unit": "yemek kaşığı"
    },
    {
     "name": "sebze suyu",
     "amount": 0.5,
     "unit": "su bardağı"
    },
    {
     "name": "Soya sosu",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Taze soğan ince doğranmış",
     "amount": 1,
     "unit": "adet"
    },
    {
     "name": "Zeytinyağı",
     "amount": 1,
     "unit": "yemek kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Tofuyu süzün",
     "body": "Tofuyu bir bezin arasına koyup üzerine ağırlık yerleştirerek 20 dakika süzün, ardından küp küp doğrayın.",
     "time": "20 dk"
    },
    {
     "title": "Nişastaya bulayın",
     "body": "Tofu küplerini mısır nişastasına hafifçe bulayıp fazlasını silkeleyin, üzerlerine zeytinyağı gezdirin.",
     "time": "5 dk"
    },
    {
     "title": "Airfryer'da pişirin",
     "body": "Tofu küplerini airfryer sepetine tek kat halinde dizip her yüzü altın rengi ve çıtır olana kadar pişirin.",
     "time": "12 dk"
    },
    {
     "title": "Sosla servis edin",
     "body": "Sebze suyunu ve soya sosunu karıştırıp ısıtın, çıtır tofunun üzerine dökün, taze soğan serperek servis edin.",
     "time": "3 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 97,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Tofuyu kesmeden önce ağırlık koyup en az 20 dakika süzün, fazla su kalırsa nişasta yapışmaz ve kabuk çıtırlaşmaz. Alerjen: soya (tofu) içerir. Ek alerjen kontrolü: Şu malzemelerin ürün etiketindeki gluten beyanını kontrol edin: soya sosu. İçerik ürüne göre değişebilir."
     }
    ],
    "tags": [],
    "features": [
     "Kahvaltılık",
     "Japon Mutfağı",
     "Diyabete Uygun",
     "Laktozsuz",
     "Kuruyemiş İçermez",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon2 kişilik",
     "Hazırlık + Pişirme 15 dk + 15 dk",
     "ZorlukÇok Kolay"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "tofu yumuşak, ağırlıkla süzülmüş",
     "note": "yumuşak, ağırlıkla süzülmüş",
     "quantity": "400 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "mısır nişastası",
     "note": "",
     "quantity": "3 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sebze suyu",
     "note": "",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Soya sosu",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Taze soğan ince doğranmış",
     "note": "ince doğranmış",
     "quantity": "1 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Zeytinyağı",
     "note": "",
     "quantity": "1 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/7499.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "1",
   "chef": {
    "info": "Ece Özdenak\nAşçı\n2026'dan beri üye",
    "meta": [
     "Tarif97",
     "Takipçi52"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "18 Temmuz 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Kahvaltılık",
     "href": "https://dadagastro.com/tarifler/kategori/kahvaltilik"
    },
    {
     "label": "Japon Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=japon-mutfagi"
    },
    {
     "label": "Diyabete Uygun",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=diyabete-uygun"
    },
    {
     "label": "Laktozsuz",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=laktozsuz"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Semizotlu Yumurta | Soğanla Kavrulan Semizotuna Kırılan Yazlık Yumurta",
     "url": "https://dadagastro.com/tarif/semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Masabeeb | Suudi Arabistan Usulü Tam Buğday Unlu Kalın Tava Pankeki",
     "url": "https://dadagastro.com/tarif/masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "İrimşik | Kazak Usulü Kızarana Kadar Pişen Tatlımsı Kurutulmuş Lor",
     "url": "https://dadagastro.com/tarif/irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Mamounia | Halep Usulü Tereyağlı İrmik Kahvaltısı",
     "url": "https://dadagastro.com/tarif/mamounia-halep-usulu-tereyagli-irmik-kahvaltisi",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-mamounia-halep-usulu-tereyagli-irmik-kahvaltisi-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Sevil Kaya",
     "rating": 5,
     "body": "Tofuyu tam 20 dakika ağırlıkla süzdüm, nişasta mükemmel yapıştı ve airfryer'dan gerçekten çıtır çıktı.",
     "date": "2 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "diyabete-uygun",
     "laktozsuz",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "japon-mutfagi"
    ],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Agedashi Tofu, mısır nişastasına bulanan yumuşak tofunun airfryer'da geleneksel derin yağda kızartmaya göre çok daha az yağla çıtırlaştırılmasıyla hazırlanan Japon kahvaltı sofralarının hafif bir tabağıdır. Tofunun suyunun iyice süzülmesi, kabuğun çıtır çıkmasını sağlar. İlave tatlandırıcı içermeyen soslu servisi sayesinde kan şekerini takip edenler için de uygun bir seçenektir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Pancarlı Kek | Pancar Rendeli Nemli Kakaolu Kek",
   "url": "https://dadagastro.com/tarif/pancarli-kek-pancar-rendeli-nemli-kakaolu-kek",
   "image": "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-kapak.webp",
   "category": "Kek ve Pasta",
   "difficulty": "Kolay",
   "rating": "5.0",
   "slug": "pancarli-kek-pancar-rendeli-nemli-kakaolu-kek",
   "description": "Pancarlı kek neden kuru oluyor? Haşlanan pancarın suyu gider, çiğ rendelenmeli; kakao oranı ve pişirme ölçüsü burada.",
   "author": "Şahnur Mertoğlu",
   "servings": 14,
   "unit": "dilim",
   "minutes": 75,
   "ratingCount": 3,
   "ingredients": [
    {
     "name": "pancar",
     "amount": 250,
     "unit": "g"
    },
    {
     "name": "un",
     "amount": 280,
     "unit": "g"
    },
    {
     "name": "şekersiz toz kakao",
     "amount": 50,
     "unit": "g"
    },
    {
     "name": "toz şeker",
     "amount": 200,
     "unit": "g"
    },
    {
     "name": "yumurta",
     "amount": 3,
     "unit": "adet"
    },
    {
     "name": "sıvı yağ",
     "amount": 150,
     "unit": "ml"
    },
    {
     "name": "kabartma tozu",
     "amount": 10,
     "unit": "g"
    },
    {
     "name": "tuz",
     "amount": 3,
     "unit": "g"
    }
   ],
   "steps": [
    {
     "title": "Pancarı rendele ve süz",
     "body": "Pancarın kabuğunu soyup ince rendenin küçük gözlü yüzeyinde rendeleyin; iri rendelenen pancar kekin içinde lif lif hissedilir. Rendeyi süzgece alıp elle hafifçe sıkın ve çıkan koyu suyu dökün. Tamamen sıkmayın, kekin nemi bu sudan gelecek. Eldiven kullanın, pancar eli boyar.",
     "time": "12 dk"
    },
    {
     "title": "Yumurta ve şekeri çırp",
     "body": "Yumurtaları şekerle birlikte, rengi açılıp hacmi iki katına çıkana kadar 5 dakika çırpın.",
     "time": "6 dk"
    },
    {
     "title": "Yağı ekle",
     "body": "Sıvı yağı ince bir şerit hâlinde dökerek düşük hızda karıştırın. Yağı bir kerede boşaltmayın, karışım ayrışır.",
     "time": "3 dk"
    },
    {
     "title": "Kuruları ve pancarı ekle",
     "body": "Un, kakao, kabartma tozu ve tuzu eleyerek ekleyin ve spatulayla karıştırın, sonra rendelenmiş pancarı katıp alttan üste doğru dağıtın. Karışım koyu bordo renkli ve ağır olacaktır, doğrudur. Un görünmez olduğunda durun.",
     "time": "5 dk"
    },
    {
     "title": "Kalıba dök",
     "body": "Karışımı yağlanıp kakaoyla tozlanmış kalıba dökün; kakaolu keki unla tozlamak yüzeyde beyaz izler bırakır. Yüzeyi düzleyip kalıbı tezgâha iki kez vurun.",
     "time": "3 dk"
    },
    {
     "title": "Fırınla",
     "body": "Önceden 175 °C'ye ısıtılmış fırında 45 dakika pişirin. Kakaolu hamurda renk okunmaz; ortasına batırdığınız kürdan birkaç nemli kırıntıyla çıktığında pişmiştir, tamamen kuru çıkıyorsa fazla pişmiştir. Kalıpta 15 dakika bekletip tele alın.",
     "time": "45 dk"
    }
   ],
   "reviews": [],
   "cost": 1,
   "views": 1,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Kek tel üstünde en az 1 saat soğumalı; bu süre tarifin sürelerine dahil değildir. Pancarlı kek sıcakken nemli ve ağır hissettirir, dokusuna soğuyunca kavuşur."
     }
    ],
    "tags": [],
    "features": [
     "Kek ve Pasta",
     "Vejetaryen",
     "Ekonomik (₺)"
    ],
    "facts": [
     "Porsiyon14 dilim",
     "Hazırlık + Pişirme 30 dk + 45 dk",
     "ZorlukKolay",
     "Pişirme Derecesi175°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "group": "Kek için"
    },
    {
     "name": "pancar",
     "note": "",
     "quantity": "250 g",
     "unit": "gram",
     "substitutes": [
      "havuç — aynı miktarda kullanılır, renk turuncuya döner ve tat daha tanıdık olur",
      "kabak — aynı miktarda kullanılır, suyu daha çok olduğu için sıkarak kullanın"
     ],
     "sponsor": ""
    },
    {
     "name": "un",
     "note": "",
     "quantity": "280 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "şekersiz toz kakao",
     "note": "",
     "quantity": "50 g",
     "unit": "gram",
     "substitutes": [
      "rendelenmiş bitter çikolata — 120 g kullanılır ve sıvı yağda eritilir, şekeri 30 g azaltın"
     ],
     "sponsor": ""
    },
    {
     "name": "toz şeker",
     "note": "",
     "quantity": "200 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "yumurta",
     "note": "",
     "quantity": "3 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "sıvı yağ",
     "note": "",
     "quantity": "150 ml",
     "unit": "ml",
     "substitutes": [
      "erimiş tereyağı — 165 g kullanılır, kek daha zengin olur ancak soğuyunca sertleşir"
     ],
     "sponsor": ""
    },
    {
     "name": "kabartma tozu",
     "note": "",
     "quantity": "10 g",
     "unit": "gram",
     "substitutes": [
      "karbonat ve limon suyu — 6 g karbonat ile 12 ml limon suyu aynı kabarmayı verir"
     ],
     "sponsor": ""
    },
    {
     "name": "tuz",
     "note": "",
     "quantity": "3 g",
     "unit": "gram",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-kapak.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "3",
   "clapCount": "1",
   "chef": {
    "info": "Şahnur Mertoğlu\nKomi\n2026'dan beri üye",
    "meta": [
     "Tarif8",
     "Takipçi9"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "22 Ağustos 2026",
    "Son güncelleme: 22 Ağustos 2026"
   ],
   "features": [
    {
     "label": "Kek ve Pasta",
     "href": "https://dadagastro.com/tarifler/kategori/kek-ve-pasta"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Ekonomik (₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=1"
    }
   ],
   "nutrition": {
    "notice": "Değerler tahminidir",
    "cells": [
     {
      "value": "256 kcal",
      "label": "Kalori"
     },
     {
      "value": "4 g",
      "label": "Protein"
     },
     {
      "value": "33 g",
      "label": "Karbonhidrat"
     },
     {
      "value": "12 g",
      "label": "Yağ"
     },
     {
      "value": "2 g",
      "label": "Lif"
     },
     {
      "value": "15 g",
      "label": "Şeker"
     },
     {
      "value": "100 mg",
      "label": "Sodyum"
     },
     {
      "value": "2 g",
      "label": "Doymuş Yağ"
     }
    ],
    "macros": [
     "Protein %6",
     "Karbonhidrat %52",
     "Yağ %42"
    ]
   },
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
     "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Vişneli Islak Kek | Türk Usulü Şerbetli Parti Keki",
     "url": "https://dadagastro.com/tarif/visneli-islak-kek-turk-usulu-serbetli-parti-keki",
     "image": "https://dadagastro.com/varliklar/media/8834.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Znoud el-Sit | Ürdün Usulü Kremalı Kızarmış Rulo Tatlısı",
     "url": "https://dadagastro.com/tarif/znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi",
     "image": "https://dadagastro.com/varliklar/media/9257.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kastera Kek | Japon Usulü Bal Şerbetli Sünger Kek",
     "url": "https://dadagastro.com/tarif/kastera-kek-japon-usulu-bal-serbetli-sunger-kek",
     "image": "https://dadagastro.com/varliklar/media/8577.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "3"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-adim1.webp"
     ]
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-adim4.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-adim5.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-adim6.webp"
     ]
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen"
    ],
    "mutfak": [],
    "butce": [
     "1"
    ]
   },
   "fullDescription": "Pancarlı kek, rendelenmiş çiğ pancarın kakaoyla birlikte kullanıldığı, nemini ve rengini sebzeden alan bir kektir. Pancar tatlı bir sebzedir ve şekerin bir kısmının yerini tutar; kakao ise pancarın toprağımsı kokusunu örter, bu yüzden ikisi birlikte kullanılır. Pancar haşlanmaz, çiğ rendelenir: haşlanan pancarın suyu gider, kek kuru kalır."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Vişneli Islak Kek | Türk Usulü Şerbetli Parti Keki",
   "url": "https://dadagastro.com/tarif/visneli-islak-kek-turk-usulu-serbetli-parti-keki",
   "image": "https://dadagastro.com/varliklar/media/8834.webp",
   "category": "Kek ve Pasta",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "visneli-islak-kek-turk-usulu-serbetli-parti-keki",
   "description": "Türk usulü vişneli ıslak kek nasıl yapılır? Kek hamurunun hazırlanması, fırınlanması ve vişne şerbetiyle ıslatılması adım adım tarif.",
   "author": "Şahnur Sezek",
   "servings": 8,
   "unit": "dilim",
   "minutes": 60,
   "ratingCount": 4,
   "ingredients": [
    {
     "name": "Un",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "Yumurta",
     "amount": 3,
     "unit": "adet"
    },
    {
     "name": "Şeker",
     "amount": 1,
     "unit": "su bardağı"
    },
    {
     "name": "Sıvı yağ",
     "amount": 0.5,
     "unit": "su bardağı"
    },
    {
     "name": "Süt",
     "amount": 0.5,
     "unit": "su bardağı"
    },
    {
     "name": "Kabartma tozu",
     "amount": 1,
     "unit": "tatlı kaşığı"
    },
    {
     "name": "vişne suyu",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "Toz şeker şerbet için",
     "amount": 0.5,
     "unit": "su bardağı"
    }
   ],
   "steps": [
    {
     "title": "Keki hazırlayın",
     "body": "Yumurta ve şekeri çırpın, sıvı yağ ve sütü ekleyip karıştırın. Un ve kabartma tozunu katıp pürüzsüz bir hamur elde edin.",
     "time": "15 dk"
    },
    {
     "title": "Fırınlayın",
     "body": "Hamuru yağlanmış bir kalıba dökün, önceden 175 dereceye ısıtılmış fırında ortasına batırılan çubuk temiz çıkana kadar 30 dakika pişirin.",
     "time": "30 dk"
    },
    {
     "title": "Şerbeti hazırlayın",
     "body": "Vişne suyu ve toz şekeri bir tencerede kaynatıp 5 dakika koyulaştırın.",
     "time": "10 dk"
    },
    {
     "title": "Islatın",
     "body": "Fırından çıkan sıcak kekin üzerine ılık şerbeti azar azar dökerek tamamen emmesini sağlayın.",
     "time": "5 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 147,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Şerbeti sıcak kekin üzerine yavaş yavaş, birkaç seferde dökün, aksi halde şerbetin çoğu kenarlardan taşar. Alerjen: buğday (gluten), yumurta ve süt içerir."
     }
    ],
    "tags": [],
    "features": [
     "Kek ve Pasta",
     "Türk Mutfağı",
     "Vejetaryen",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon8 dilim",
     "Hazırlık + Pişirme 20 dk + 40 dk",
     "ZorlukOrta",
     "Pişirme Derecesi175°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Un",
     "note": "",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Yumurta",
     "note": "",
     "quantity": "3 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Şeker",
     "note": "",
     "quantity": "1 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Sıvı yağ",
     "note": "",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Süt",
     "note": "",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Kabartma tozu",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "vişne suyu",
     "note": "",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Toz şeker şerbet için",
     "note": "şerbet için",
     "quantity": "½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8834.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "0",
   "chef": {
    "info": "Şahnur Sezek\nKısım Şefi\n2026'dan beri üye",
    "meta": [
     "Tarif171",
     "Takipçi34"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "06 Ağustos 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Kek ve Pasta",
     "href": "https://dadagastro.com/tarifler/kategori/kek-ve-pasta"
    },
    {
     "label": "Türk Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=turk-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
     "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pancarlı Kek | Pancar Rendeli Nemli Kakaolu Kek",
     "url": "https://dadagastro.com/tarif/pancarli-kek-pancar-rendeli-nemli-kakaolu-kek",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Znoud el-Sit | Ürdün Usulü Kremalı Kızarmış Rulo Tatlısı",
     "url": "https://dadagastro.com/tarif/znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi",
     "image": "https://dadagastro.com/varliklar/media/9257.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kastera Kek | Japon Usulü Bal Şerbetli Sünger Kek",
     "url": "https://dadagastro.com/tarif/kastera-kek-japon-usulu-bal-serbetli-sunger-kek",
     "image": "https://dadagastro.com/varliklar/media/8577.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "4"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "İpek Kurt",
     "rating": 5,
     "body": "Kestiğimde şerbeti damlayan, kıvamı yoğun bir kek çıktı, parti misafirleri tarifi hemen sordu.",
     "date": "2 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "1",
     "photos": [],
     "replies": []
    },
    {
     "author": "Nurgül Bilgin",
     "rating": 5,
     "body": "30 dakika fırınladıktan sonra çubuk gerçekten temiz çıktı, kek tam kıvamındaydı. Şerbeti ılıkken döktüğüm için emilim çok dengeli oldu, kenarlardan hiç taşmadı, tabağı bile temiz kaldı.",
     "date": "2 ay önce",
     "badge": "Mutfak Meraklısı",
     "likes": "1",
     "photos": [],
     "replies": []
    },
    {
     "author": "Filiz Polat",
     "rating": 5,
     "body": "Kalıptan çıkarmadan önce kekin tamamen soğumasını mı beklemeliyim, yoksa şerbeti dökmeden hemen önce mi çıkarmalıyım? Bu sırayı karıştırınca kek biraz dağılır mı diye merak ediyorum.",
     "date": "2 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "0",
     "photos": [],
     "replies": [
      {
       "author": "Şahnur",
       "body": "Şerbeti dökmeden hemen önce kalıptan çıkarmanızı öneririm, kek hâlâ sıcakken şerbeti çok daha iyi emiyor. Tamamen soğumasını beklerseniz emilim zayıflar ama dağılma riski yoktur.",
       "date": "2 ay önce"
      }
     ]
    },
    {
     "author": "Erhan Sarıkaya",
     "rating": 5,
     "body": "Şerbeti tarifte dediği gibi azar azar döktüm ve kek hiç taşırmadan emdi, kıvamı gerçekten yoğun ve nemli oldu. Bir gün önceden hazırlayıp buzdolabında bekletsem tadı daha mı iyi olur?",
     "date": "2 ay önce",
     "badge": "Çömez Aşçı",
     "likes": "1",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": [
      "https://dadagastro.com/varliklar/media/10074.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/10227.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/10228.webp"
     ]
    },
    {
     "images": [
      "https://dadagastro.com/varliklar/media/10229.webp"
     ]
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "turk-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Türk pastanelerinin sevilen ıslak keki, sade bir kek hamurunun fırınlandıktan sonra vişne suyundan hazırlanan şerbetle iyice ıslatılmasıyla hazırlanır. Kesildiğinde şerbeti damlayan bu kek, kalabalık parti sofralarının gözde tatlılarından biridir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Znoud el-Sit | Ürdün Usulü Kremalı Kızarmış Rulo Tatlısı",
   "url": "https://dadagastro.com/tarif/znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi",
   "image": "https://dadagastro.com/varliklar/media/9257.webp",
   "category": "Kek ve Pasta",
   "difficulty": "Zor",
   "rating": "5.0",
   "slug": "znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi",
   "description": "Ürdün usulü znoud el-sit nasıl yapılır? Gül sulu kremanın hazırlanması, yufkaların sarılması, kızartılması ve şerbete batırılması adım adım anlatılıyor.",
   "author": "Göktürk Dizdar",
   "servings": 6,
   "unit": "kişilik",
   "minutes": 50,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "rulo yufkası",
     "amount": 12,
     "unit": "adet"
    },
    {
     "name": "Süt",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "nişasta",
     "amount": 3,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Toz şeker krema için",
     "amount": 4,
     "unit": "yemek kaşığı"
    },
    {
     "name": "gül suyu",
     "amount": 1,
     "unit": "tatlı kaşığı"
    },
    {
     "name": "Toz şeker şerbet için",
     "amount": 1,
     "unit": "su bardağı"
    },
    {
     "name": "Su şerbet için",
     "amount": 0.75,
     "unit": "su bardağı"
    },
    {
     "name": "Limon suyu",
     "amount": 1,
     "unit": "tatlı kaşığı"
    },
    {
     "name": "ayçiçek yağı kızartmak için",
     "amount": 2,
     "unit": "su bardağı"
    },
    {
     "name": "Antep fıstığı kıyılmış, üzeri için",
     "amount": 2,
     "unit": "yemek kaşığı"
    }
   ],
   "steps": [
    {
     "title": "Kremayı pişirin",
     "body": "Süt, nişasta ve toz şekeri bir tencerede pürüzsüz olana kadar karıştırıp kısık ateşte sürekli çırparak koyulaşana kadar pişirin, ocaktan alıp gül suyunu ekleyin.",
     "time": "10 dk"
    },
    {
     "title": "Kremayı soğutun",
     "body": "Kremanın üzerini örterek buzdolabında en az 20 dakika soğutup koyulaşmasını bekleyin.",
     "time": "20 dk"
    },
    {
     "title": "Şerbeti hazırlayın",
     "body": "Toz şekeri su ile bir tencerede kaynatıp limon suyunu ekleyin, 5 dakika kaynattıktan sonra ocaktan alıp oda sıcaklığında soğumaya bırakın.",
     "time": "5 dk"
    },
    {
     "title": "Ruloları sarın",
     "body": "Her rulo yufkasına bir kaşık soğuyan kremadan koyup sıkıca sarın, uçlarını iyice kapatın.",
     "time": "15 dk"
    },
    {
     "title": "Kızartıp şerbete batırın",
     "body": "Ayçiçek yağını kızdırıp ruloları her yüzü altın rengi alana kadar kızartın, sıcakken soğuk şerbete batırıp üzerine antep fıstığı serperek servis edin.",
     "time": "10 dk"
    }
   ],
   "reviews": [],
   "cost": 2,
   "views": 101,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Yufkaları sararken uçlarını iyice kapatın, açık kalan uç kızgın yağda kremanın dışarı sızmasına yol açar. Alerjen: gluten (yufka), süt ve süt ürünleri (süt), sert kabuklu yemiş (antep fıstığı) içerir."
     }
    ],
    "tags": [],
    "features": [
     "Kek ve Pasta",
     "Ürdün Mutfağı",
     "Vejetaryen",
     "Yumurta İçermez",
     "Pesketaryen",
     "Orta Bütçe (₺₺)"
    ],
    "facts": [
     "Porsiyon6 kişilik",
     "Hazırlık + Pişirme 30 dk + 20 dk",
     "ZorlukZor"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "rulo yufkası",
     "note": "",
     "quantity": "12 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Süt",
     "note": "",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "nişasta",
     "note": "",
     "quantity": "3 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Toz şeker krema için",
     "note": "krema için",
     "quantity": "4 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "gül suyu",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Toz şeker şerbet için",
     "note": "şerbet için",
     "quantity": "1 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Su şerbet için",
     "note": "şerbet için",
     "quantity": "¾ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Limon suyu",
     "note": "",
     "quantity": "1 tatlı kaşığı",
     "unit": "tatli-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "ayçiçek yağı kızartmak için",
     "note": "kızartmak için",
     "quantity": "2 su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Antep fıstığı kıyılmış, üzeri için",
     "note": "kıyılmış, üzeri için",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/9257.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "4",
   "clapCount": "1",
   "chef": {
    "info": "Göktürk Dizdar\nKısım Şefi\n2026'dan beri üye",
    "meta": [
     "Tarif171",
     "Takipçi26"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "10 Mayıs 2026",
    "Son güncelleme: 11 Eylül 2026"
   ],
   "features": [
    {
     "label": "Kek ve Pasta",
     "href": "https://dadagastro.com/tarifler/kategori/kek-ve-pasta"
    },
    {
     "label": "Ürdün Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=urdun-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Yumurta İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=yumurta-icermez"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Orta Bütçe (₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=2"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
     "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pancarlı Kek | Pancar Rendeli Nemli Kakaolu Kek",
     "url": "https://dadagastro.com/tarif/pancarli-kek-pancar-rendeli-nemli-kakaolu-kek",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Vişneli Islak Kek | Türk Usulü Şerbetli Parti Keki",
     "url": "https://dadagastro.com/tarif/visneli-islak-kek-turk-usulu-serbetli-parti-keki",
     "image": "https://dadagastro.com/varliklar/media/8834.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Kastera Kek | Japon Usulü Bal Şerbetli Sünger Kek",
     "url": "https://dadagastro.com/tarif/kastera-kek-japon-usulu-bal-serbetli-sunger-kek",
     "image": "https://dadagastro.com/varliklar/media/8577.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "yumurta-icermez",
     "pesketaryen"
    ],
    "mutfak": [
     "urdun-mutfagi"
    ],
    "butce": [
     "2"
    ]
   },
   "fullDescription": "Znoud el-Sit, ince rulo yufkasının gül suyuyla aromalandırılan kıvamlı bir süt kremasıyla doldurulup sıkıca sarılarak kızgın yağda kızartılmasının ardından şerbete batırılmasıyla hazırlanan Ürdün'ün düğün ve bayram sofralarına özgü bir tatlısıdır. Yufkanın kızartılırken açılmadan bütünlüğünü koruması sıkı bir sarma tekniği ister. Sıkı kapalı bir kapta birkaç saat taşınabildiğinden pikniğe de götürülebilir."
  },
  "captured": "2026-10-10"
 },
 {
  "recipe": {
   "title": "Kastera Kek | Japon Usulü Bal Şerbetli Sünger Kek",
   "url": "https://dadagastro.com/tarif/kastera-kek-japon-usulu-bal-serbetli-sunger-kek",
   "image": "https://dadagastro.com/varliklar/media/8577.webp",
   "category": "Kek ve Pasta",
   "difficulty": "Orta",
   "rating": "5.0",
   "slug": "kastera-kek-japon-usulu-bal-serbetli-sunger-kek",
   "description": "Japon usulü kastera kek nasıl yapılır? Yumurta ve şekerin çırpılması, unun katlanması, alçak ateşte fırınlanması ve dilimlenmesiyle adım adım tarif.",
   "author": "Şahnur Ilıcalı",
   "servings": 10,
   "unit": "dilim",
   "minutes": 60,
   "ratingCount": 1,
   "ingredients": [
    {
     "name": "Yumurta oda sıcaklığında",
     "amount": 6,
     "unit": "adet"
    },
    {
     "name": "Toz şeker",
     "amount": 1.5,
     "unit": "su bardağı"
    },
    {
     "name": "Un elenmiş",
     "amount": 1.5,
     "unit": "su bardağı"
    },
    {
     "name": "Bal",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Süt ılık",
     "amount": 2,
     "unit": "yemek kaşığı"
    },
    {
     "name": "Tuz",
     "amount": 1,
     "unit": "tutam"
    }
   ],
   "steps": [
    {
     "title": "Yumurta ve şekeri çırpın",
     "body": "Yumurtaları ve toz şekeri benmari üzerinde ılıtarak, ardından mikserle rengi açılıp kıvamı bandına ulaşana kadar 12 dakika çırpın.",
     "time": "12 dk"
    },
    {
     "title": "Unu katlayın",
     "body": "Balı ılık sütle karıştırıp çırpılmış karışıma ekleyin, bir tutam tuz serpin, ardından unu üç seferde spatulayla nazikçe katlayın; hava kabarcıklarını kaybetmeyin.",
     "time": "8 dk"
    },
    {
     "title": "Fırınlayın",
     "body": "Hamuru yağlı kağıt kaplı kalıba dökün, önceden 160 dereceye ısıtılmış fırının alt rafında 40 dakika pişirin.",
     "time": "40 dk"
    },
    {
     "title": "Dinlendirin ve dilimleyin",
     "body": "Kalıbı fırından çıkarır çıkmaz masaya hafifçe vurup hava kabarcıklarını alın, streçle sararak 2 saat dinlendirdikten sonra dilimleyin.",
     "time": "120 dk"
    }
   ],
   "reviews": [],
   "cost": 3,
   "views": 99,
   "web": {
    "notes": [
     {
      "title": "Hatırlatma",
      "body": "Fırın kapağını ilk 25 dakika açmayın, aksi halde kek göçer ve dokusu sıkılaşır. Alerjen: gluten (un), yumurta içerir."
     }
    ],
    "tags": [
     "#Nagazaki"
    ],
    "features": [
     "Kek ve Pasta",
     "Japon Mutfağı",
     "Vejetaryen",
     "Pesketaryen",
     "Kuruyemiş İçermez",
     "Premium (₺₺₺)"
    ],
    "facts": [
     "Porsiyon10 dilim",
     "Hazırlık + Pişirme 20 dk + 40 dk",
     "ZorlukOrta",
     "Pişirme Derecesi160°C fırın"
    ],
    "similar": []
   }
  },
  "parity": {
   "ingredients": [
    {
     "name": "Yumurta oda sıcaklığında",
     "note": "oda sıcaklığında",
     "quantity": "6 adet",
     "unit": "adet",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Toz şeker",
     "note": "",
     "quantity": "1½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Un elenmiş",
     "note": "elenmiş",
     "quantity": "1½ su bardağı",
     "unit": "su-bardagi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Bal",
     "note": "",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Süt ılık",
     "note": "ılık",
     "quantity": "2 yemek kaşığı",
     "unit": "yemek-kasigi",
     "substitutes": [],
     "sponsor": ""
    },
    {
     "name": "Tuz",
     "note": "",
     "quantity": "1 tutam",
     "unit": "tutam",
     "substitutes": [],
     "sponsor": ""
    }
   ],
   "gallery": [
    "https://dadagastro.com/varliklar/media/8577.webp"
   ],
   "badges": [],
   "made": "",
   "madeCount": "1",
   "clapCount": "1",
   "chef": {
    "info": "Şahnur Ilıcalı\nKısım Şefi\n2026'dan beri üye",
    "meta": [
     "Tarif171",
     "Takipçi24"
    ],
    "bio": "",
    "subscription": false
   },
   "dates": [
    "26 Mayıs 2026",
    "Son güncelleme: 12 Eylül 2026"
   ],
   "features": [
    {
     "label": "Kek ve Pasta",
     "href": "https://dadagastro.com/tarifler/kategori/kek-ve-pasta"
    },
    {
     "label": "Japon Mutfağı",
     "href": "https://dadagastro.com/tarifler?mutfak%5B0%5D=japon-mutfagi"
    },
    {
     "label": "Vejetaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=vejetaryen"
    },
    {
     "label": "Pesketaryen",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=pesketaryen"
    },
    {
     "label": "Kuruyemiş İçermez",
     "href": "https://dadagastro.com/tarifler?beslenme%5B0%5D=kuruyemis-icermez"
    },
    {
     "label": "Premium (₺₺₺)",
     "href": "https://dadagastro.com/tarifler?butce%5B0%5D=3"
    }
   ],
   "nutrition": null,
   "skills": [],
   "related": [],
   "similar": [
    {
     "title": "Kiev Pastası | Ukrayna Usulü Fındıklı Beze Katlı Kremalı Pasta",
     "url": "https://dadagastro.com/tarif/kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Pancarlı Kek | Pancar Rendeli Nemli Kakaolu Kek",
     "url": "https://dadagastro.com/tarif/pancarli-kek-pancar-rendeli-nemli-kakaolu-kek",
     "image": "https://dadagastro.com/varliklar/media/yayilim/t-pancarli-kek-pancar-rendeli-nemli-kakaolu-kek-kapak.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Vişneli Islak Kek | Türk Usulü Şerbetli Parti Keki",
     "url": "https://dadagastro.com/tarif/visneli-islak-kek-turk-usulu-serbetli-parti-keki",
     "image": "https://dadagastro.com/varliklar/media/8834.webp",
     "author": "",
     "rating": "",
     "views": ""
    },
    {
     "title": "Znoud el-Sit | Ürdün Usulü Kremalı Kızarmış Rulo Tatlısı",
     "url": "https://dadagastro.com/tarif/znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi",
     "image": "https://dadagastro.com/varliklar/media/9257.webp",
     "author": "",
     "rating": "",
     "views": ""
    }
   ],
   "reviewSummary": {
    "recommend": "%100'si tavsiye ediyor",
    "distribution": [
     {
      "star": "5",
      "count": "1"
     },
     {
      "star": "4",
      "count": "0"
     },
     {
      "star": "3",
      "count": "0"
     },
     {
      "star": "2",
      "count": "0"
     },
     {
      "star": "1",
      "count": "0"
     }
    ]
   },
   "reviews": [
    {
     "author": "Seda Şen",
     "rating": 5,
     "body": "Kalıp olarak kare fırın tepsisi kullanabilir miyim, yoksa mutlaka uzun kek kalıbı mı gerekiyor? 40 dakika olan süre tepside de aynı mı kalır, yoksa daha ince bir katman olduğu için kısaltmam mı gerekir acaba?",
     "date": "3 ay önce",
     "badge": "Komi",
     "likes": "0",
     "photos": [],
     "replies": []
    }
   ],
   "steps": [
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    },
    {
     "images": []
    }
   ],
   "video": "",
   "audio": "",
   "madePhotos": [],
   "commentsEnabled": true,
   "altReviewCount": "",
   "facets": {
    "beslenme": [
     "vejetaryen",
     "pesketaryen",
     "kuruyemis-icermez"
    ],
    "mutfak": [
     "japon-mutfagi"
    ],
    "butce": [
     "3"
    ]
   },
   "fullDescription": "Nagazaki'den tüm Japonya'ya yayılan kastera kek, yumurta ve şekerin uzun süre çırpılmasıyla oluşan hava kabarcıklarından gücünü alır. Bal ile nemlendirilen hamur alçak ateşte pişirilip dilimlere kesildiğinde, kalabalık sofralarda ve piknik sepetlerinde kolayca paylaşılır."
  },
  "captured": "2026-10-10"
 }
];
/* Canlı benzer tarif listeleri (slug → 4 benzer slug), docs/detay-v2-benzer-topla.mjs. */
window.DV2_SIMILAR={"tavuk-curry-hindistan-cevizli-hint-usulu": ["guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci", "ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu", "arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav"], "yunan-usulu-limonlu-karides-sote-zeytinyagli-hizli-deniz-urunu-tarifi": ["asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik"], "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi": ["mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek"], "kirmizi-fasulye-yahnisi-jamaika-usulu-kahvaltilik-stew-peas": ["moin-moin-nijerya-usulu-buharda-borulce-pudingi", "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "frijoles-refritos-meksika-usulu-ezme-fasulye"], "patates-mucveri-cig-rendelenmis-patatesle-tavada-kizaran-kahvaltilik-mucver": ["semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki", "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor", "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi"], "sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi": ["kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi", "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi"], "pasteis-de-feijao-portekiz-torres-vedras-usulu-bademli-fasulyeli-mini-tart": ["sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi"], "tarte-de-amendoa-portekiz-algarve-usulu-karamelize-bademli-tart": ["sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi"], "sardalya-izgara-limon-kekikli": ["asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik"], "guvecte-ayvali-tavuk-mayhos-ayvayla-kis-guveci": ["ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu", "arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav", "huhnerfrikassee-alman-usulu-kuskonmazli-mantarli-kremali-tavuk-yahnisi"], "ordek-dolmasi-firinda-ic-pilavli-butun-ordek": ["mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek", "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi"], "tuzsuz-bebek-tavuk-suyu-mamalarin-tabani-icin-suzulmus-et-suyu": ["arpa-sehriyeli-sebze-corbasi-10-ay-ve-uzeri-bebekler-icin-tuzsuz-corba", "koz-patlican-ve-yogurt-ezmesi-balkan-usulu-yumusak-kivamli-mama", "firik-lapasi-irak-usulu-kavrulmus-bugday-bebek-mamasi", "izgara-misir-puresi-arjantin-usulu-bebek-mamasi"], "arroz-con-pato-peru-usulu-kisnisli-ordekli-pilav": ["saleeg-suudi-arabistan-usulu-sutte-ve-tavuk-suyunda-pisen-kremamsi-pilav", "arpa-sehriyeli-pilav-tereyagli-kavrulmus-arpa-sehriyesi", "grecka-po-kupeceski-rus-usulu-etli-havuclu-tencere-karabugdayi", "kuskonmazli-makademya-pilavi-avustralya-usulu-findikli-pilav"], "asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi": ["jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik", "airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi"], "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides": ["asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik", "airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi"], "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis": ["asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik", "airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi"], "karabugday-kaplamali-levrek-firinda-tam-tahilli-kabuklu-balik": ["asam-pedas-malezya-usulu-demirhindili-eksi-aci-balik-yahnisi", "jiao-yan-karides-cin-usulu-tuz-ve-biberli-citir-karides", "iran-usulu-baharatli-acili-balik-kebabi-gece-atistirmaligindan-bruncha-uzanan-sis", "airfryerda-hamsili-ekmek-karadeniz-usulu-kahvaltilik-balik-ekmegi"], "mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli": ["ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek", "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi"], "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma": ["mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek", "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi"], "chelsea-bun-yeni-zelanda-usulu-tarcinli-kuru-uzumlu-rulo-corek": ["mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli", "ordek-dolmasi-firinda-ic-pilavli-butun-ordek", "lor-dolmasi-bayburt-usulu-lorlu-yaprak-sarma", "duduklude-balkan-usulu-lahana-sarmasi-kalabalik-sofralarin-hizli-pisen-sarmasi"], "moin-moin-nijerya-usulu-buharda-borulce-pudingi": ["waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "frijoles-refritos-meksika-usulu-ezme-fasulye", "bogrulce-yemegi-kuzu-etli-duduklu-tencerede"], "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye": ["moin-moin-nijerya-usulu-buharda-borulce-pudingi", "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "frijoles-refritos-meksika-usulu-ezme-fasulye", "bogrulce-yemegi-kuzu-etli-duduklu-tencerede"], "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla": ["moin-moin-nijerya-usulu-buharda-borulce-pudingi", "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "frijoles-refritos-meksika-usulu-ezme-fasulye", "bogrulce-yemegi-kuzu-etli-duduklu-tencerede"], "frijoles-refritos-meksika-usulu-ezme-fasulye": ["moin-moin-nijerya-usulu-buharda-borulce-pudingi", "waakye-gana-usulu-sorgum-yaprakli-pirincli-fasulye", "enfrijoladas-meksika-usulu-fasulye-sosuna-batirilmis-tortilla", "bogrulce-yemegi-kuzu-etli-duduklu-tencerede"], "semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta": ["sumakli-yumurta-duduklu-tencerede-urdun-usulu-piknik-yumurtasi", "nohutlu-baharatli-yumurta-guveci-firinda-safranli-kahvalti-guveci", "suudi-usulu-duduklude-yumurtali-cerise-dondurucuda-bekleyen-kahvaltilik", "huevos-rellenos-kuba-usulu-baharatli-dolgulu-yumurta"], "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki": ["semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor", "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi", "agedashi-tofu-japon-usulu-airfryerda-kizartilmis-tofu"], "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor": ["semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki", "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi", "agedashi-tofu-japon-usulu-airfryerda-kizartilmis-tofu"], "mamounia-halep-usulu-tereyagli-irmik-kahvaltisi": ["semizotlu-yumurta-soganla-kavrulan-semizotuna-kirilan-yazlik-yumurta", "masabeeb-suudi-arabistan-usulu-tam-bugday-unlu-kalin-tava-pankeki", "irimsik-kazak-usulu-kizarana-kadar-pisen-tatlimsi-kurutulmus-lor", "agedashi-tofu-japon-usulu-airfryerda-kizartilmis-tofu"], "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta": ["pancarli-kek-pancar-rendeli-nemli-kakaolu-kek", "visneli-islak-kek-turk-usulu-serbetli-parti-keki", "znoud-el-sit-urdun-usulu-kremali-kizarmis-rulo-tatlisi", "kastera-kek-japon-usulu-bal-serbetli-sunger-kek"], "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma": ["sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi", "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi"], "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi": ["sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi"], "muska-tatlisi-ucgen-katlanmis-cevizli-serbetli-yufka-tatlisi": ["sagdana-suudi-arabistan-hicaz-usulu-kakuleli-sagu-incili-sut-tatlisi", "kiev-pastasi-ukrayna-usulu-findikli-beze-katli-kremali-pasta", "tamriyeh-sam-usulu-irmik-kremali-hurmali-kizartma", "tepsi-kadayifi-cevizli-tel-kadayifli-serbetli-firin-tatlisi"], "misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole": ["sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli", "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi", "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole", "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz"], "sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli": ["misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole", "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi", "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole", "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz"], "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi": ["misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole", "sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli", "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole", "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz"], "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole": ["misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole", "sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli", "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi", "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz"], "jamaika-usulu-ananas-zencefil-receli-dondurucuya-ayrilan-kavanoz": ["misir-kocani-jolesi-tanesi-alinmis-kocan-suyundan-bal-renkli-jole", "sadok-kabugu-receli-kalin-kabuklu-pomelodan-serbetli-kabuk-receli", "murver-cicegi-jolesi-limonlu-cicek-demlemesinden-berrak-bahar-jolesi", "japon-ayvasi-jolesi-sus-ayvasinin-sert-meyvesinden-kendi-pektiniyle-donan-jole"], "shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte": ["tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte", "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi", "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi", "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte"], "tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte": ["shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte", "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi", "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi", "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte"], "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi": ["shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte", "tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte", "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi", "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte"], "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi": ["shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte", "tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte", "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi", "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte"], "kagitta-kofte-yagli-kagitta-sebzeyle-kendi-buharinda-pisen-kofte": ["shami-kebap-pakistan-usulu-nohutlu-yumurtaya-bulanmis-tavada-kofte", "tire-kofte-izmir-usulu-siste-kozlenip-pide-ustune-yatirilan-kofte", "pirasa-koftesi-ege-usulu-limonlu-kiymali-pirasa-koftesi", "yeni-dunya-kebabi-gaziantep-usulu-malta-erikli-kofte-sisi"]};
/* Varsayılan tarif (10 Ekim, Türk mutfağı): adreste ?tarif= yoksa Mercimekli Yaprak Sarma açılır — 7 alternatif malzeme,
   alerjen kartı, 8 alanlı besin değerleri, 4 adım fotoğrafı, eksiksiz yazar. Yalnız sayfanın kendi adres parametreleri için
   geçerlidir; ?tarif= verilen bağlantılar (Shami Kebap dahil) aynen çalışır. */
window.DV2_DEFAULT_RECIPE='mercimekli-yaprak-sarma-adiyaman-usulu-kirmizi-mercimekli';
(()=>{const get=URLSearchParams.prototype.get;let done=false;
 const own=sp=>sp.toString()===new URLSearchParams(location.search).toString();
 URLSearchParams.prototype.get=function(key){
  if(!done){try{if(typeof DATA!=='undefined'&&typeof PARITY!=='undefined'){done=true;for(const x of window.DV2_EXTRA){if(!DATA.recipes.some(r=>r.slug===x.recipe.slug))DATA.recipes.push(x.recipe);PARITY.recipes[x.recipe.slug]=x.parity;}
   /* Görsel yolları (10 Ekim): ortak veride 68 adım/galeri görseli göreli '/varliklar/…' — yerel sunucuda 404 ve boş galeri.
      Canlı kökle (https://dadagastro.com) mutlaklaştırılır; ortak dosya değişmez. */
   const abs=v=>typeof v==='string'&&v.startsWith('/varliklar/')?'https://dadagastro.com'+v:v;const walk=o=>{if(Array.isArray(o)){o.forEach((v,i)=>{o[i]=abs(v);if(v&&typeof v==='object')walk(v);});}else if(o&&typeof o==='object'){for(const k of Object.keys(o)){o[k]=abs(o[k]);if(o[k]&&typeof o[k]==='object')walk(o[k]);}}};walk(PARITY.recipes);DATA.recipes.forEach(walk);
   /* Benzer tarifler (10 Ekim): canlı .simrec listesi (docs/detay-v2-benzer-topla.mjs); ortak veride 23 tarifte similar boştu. */
   for(const [s,l] of Object.entries(window.DV2_SIMILAR||{})){const P=PARITY.recipes[s];if(P&&l.length)P.similar=l.map(x=>({url:'https://dadagastro.com/tarif/'+x,title:'',image:'',author:'',rating:'',views:''}));}}}catch{}}
  const v=get.call(this,key);
  if(key==='tarif'&&v===null&&own(this))return window.DV2_DEFAULT_RECIPE;
  return v;
 };})();
