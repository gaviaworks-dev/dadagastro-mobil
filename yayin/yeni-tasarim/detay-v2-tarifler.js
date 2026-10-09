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
 }
];
(()=>{const get=URLSearchParams.prototype.get;let done=false;
 URLSearchParams.prototype.get=function(key){
  if(!done){try{if(typeof DATA!=='undefined'&&typeof PARITY!=='undefined'){done=true;for(const x of window.DV2_EXTRA){if(!DATA.recipes.some(r=>r.slug===x.recipe.slug))DATA.recipes.push(x.recipe);PARITY.recipes[x.recipe.slug]=x.parity;}}}catch{}}
  if(done&&URLSearchParams.prototype.get!==get)URLSearchParams.prototype.get=get;
  return get.call(this,key);
 };})();
