// Üretildi: ortak/uret/uret.mjs ← ortak/tokens.json (v0.3.0). Elle değiştirmeyin.
// Flutter fazında lib/tema/ altına kopyalanır; ThemeData ve ThemeExtension<DgTokens> bu sabitlerden kurulur.
// ignore_for_file: constant_identifier_names

import 'package:flutter/physics.dart';
import 'package:flutter/widgets.dart';

abstract final class DgColors {
  static const tomato = Color(0xFFDC3D17);
  static const tomatoDark = Color(0xFFBA3413);
  static const tomatoDeep = Color(0xFF9C2B10);
  static const tomatoTint = Color(0xFFFBE6E1);
  static const danger = Color(0xFFBA3413);
  static const brandHeroAccent = Color(0xFFE87F66);
  static const neutralInk = Color(0xFF211E16);
  static const neutralSlate2 = Color(0xFF56514A);
  static const neutralMuted = Color(0xFF6F6F6F);
  static const neutralLine = Color(0xFFECECEC);
  static const neutralBg = Color(0xFFF9F9F9);
  static const neutralPaper = Color(0xFFFFFFFF);
  static const accentGreen = Color(0xFF3BB77E);
  static const accentGreenDeep = Color(0xFF2C9963);
  static const accentYellow = Color(0xFFFAC045);
  static const statusNotrFg = Color(0xFF56514A);
  static const statusNotrBg = Color(0xFFF9F9F9);
  static const statusUyariFg = Color(0xFF735C28);
  static const statusUyariBg = Color(0xFFFEF1D6);
  static const statusBasariFg = Color(0xFF2D6345);
  static const statusBasariBg = Color(0xFFE4F5ED);
  static const statusHataFg = Color(0xFF9C2B10);
  static const statusHataBg = Color(0xFFFBE6E1);
}

abstract final class DgFonts {
  static const regular = 'Gilroy';
  static const bold = 'GilroyBd';
}

/// Tipografi rolleri: letterSpacing = tracking(em) × size; height = satır çarpanı.
abstract final class DgType {
  static const display = TextStyle(fontFamily: DgFonts.bold, fontSize: 32, fontWeight: FontWeight.w700, height: 1.08, letterSpacing: -1.12);
  static const page = TextStyle(fontFamily: DgFonts.bold, fontSize: 24, fontWeight: FontWeight.w700, height: 1.15, letterSpacing: -0.6);
  static const section = TextStyle(fontFamily: DgFonts.bold, fontSize: 20, fontWeight: FontWeight.w700, height: 1.2, letterSpacing: -0.4);
  static const sheet = TextStyle(fontFamily: DgFonts.regular, fontSize: 18, fontWeight: FontWeight.w500, height: 1.25, letterSpacing: -0.27);
  static const subheading = TextStyle(fontFamily: DgFonts.regular, fontSize: 16, fontWeight: FontWeight.w500, height: 1.3, letterSpacing: -0.16);
  static const card = TextStyle(fontFamily: DgFonts.regular, fontSize: 16, fontWeight: FontWeight.w500, height: 1.25, letterSpacing: -0.24);
  static const featured = TextStyle(fontFamily: DgFonts.bold, fontSize: 20, fontWeight: FontWeight.w700, height: 1.2, letterSpacing: -0.4);
  static const body = TextStyle(fontFamily: DgFonts.regular, fontSize: 15, fontWeight: FontWeight.w500, height: 1.5, letterSpacing: 0);
  static const meta = TextStyle(fontFamily: DgFonts.regular, fontSize: 13, fontWeight: FontWeight.w500, height: 1.4, letterSpacing: 0);
  static const label = TextStyle(fontFamily: DgFonts.regular, fontSize: 11, fontWeight: FontWeight.w500, height: 1.3, letterSpacing: 0.66);
  static const button = TextStyle(fontFamily: DgFonts.regular, fontSize: 15, fontWeight: FontWeight.w500, height: 1.2, letterSpacing: 0);
  static const nav = TextStyle(fontFamily: DgFonts.regular, fontSize: 10, fontWeight: FontWeight.w500, height: 1.2, letterSpacing: 0);
  static const photoMeta = TextStyle(fontFamily: DgFonts.bold, fontSize: 13, fontWeight: FontWeight.w700, height: 1, letterSpacing: 0);
  static const cardCategory = TextStyle(fontFamily: DgFonts.bold, fontSize: 11, fontWeight: FontWeight.w700, height: 1.3, letterSpacing: 0);
  static const stat = TextStyle(fontFamily: DgFonts.bold, fontSize: 18, fontWeight: FontWeight.w700, height: 1.25, letterSpacing: 0);
  static const cookStep = TextStyle(fontFamily: DgFonts.bold, fontSize: 24, fontWeight: FontWeight.w700, height: 1.15, letterSpacing: -0.6);
  static const numeralXl = TextStyle(fontFamily: DgFonts.bold, fontSize: 48, fontWeight: FontWeight.w700, height: 1, letterSpacing: -1.68);
}

abstract final class DgSpace {
  static const double s0 = 0;
  static const double s4 = 4;
  static const double s8 = 8;
  static const double s12 = 12;
  static const double s16 = 16;
  static const double s20 = 20;
  static const double s24 = 24;
  static const double s32 = 32;
  static const double s40 = 40;
  static const double s48 = 48;
  static const double gutter = 20;
  static const double cardPadding = 16;
  static const double iconText = 8;
  static const double headerGap = 8;
  static const double panelOverlap = 24;
  static const double panelTopSpace = 16;
  static const double sectionGap = 32;
  static const double chipGap = 8;
  static const double chipPadding = 12;
  static const double gridColumnGap = 12;
  static const double gridRowGap = 20;
}

abstract final class DgRadius {
  static const double control = 12;
  static const double infoCard = 12;
  static const double media = 16;
  static const double surface = 24;
  static const double sheet = 24;
  static const double segment = 16;
  static const double choice = 4;
  static const double dot = 2;
  static const double none = 0;
  static const double chipSm = 8;
  static const double badgeSm = 6;
  // avatar: daire (BoxShape.circle)
}

abstract final class DgShadows {
  static const sm = [BoxShadow(offset: Offset(0, 1), blurRadius: 2, spreadRadius: 0, color: Color.fromRGBO(33, 30, 22, 0.04)), BoxShadow(offset: Offset(0, 2), blurRadius: 6, spreadRadius: 0, color: Color.fromRGBO(33, 30, 22, 0.05))];
  static const md = [BoxShadow(offset: Offset(0, 6), blurRadius: 22, spreadRadius: 0, color: Color.fromRGBO(33, 30, 22, 0.09))];
  static const lg = [BoxShadow(offset: Offset(0, 18), blurRadius: 50, spreadRadius: 0, color: Color.fromRGBO(33, 30, 22, 0.16))];
  // avatarRing: primary rengine bağlı, tema içinde kurulur (0 0 0 2px #FFFFFF, 0 0 0 4px var(--tomato))
  // heroCrescent: primary rengine bağlı, tema içinde kurulur (0 4px 0 var(--tomato))
}

abstract final class DgMotion {
  static const ease = Cubic(0.22, 0.61, 0.36, 1);
  static const fast = Duration(milliseconds: 150);
  static const quick = Duration(milliseconds: 180);
  static const base = Duration(milliseconds: 200);
  static const sheet = Duration(milliseconds: 250);
  static const drawer = Duration(milliseconds: 250);
  static const reveal = Duration(milliseconds: 450);
  static const savePop = Duration(milliseconds: 450);
  static const toast = Duration(milliseconds: 2800);
  static const toastAction = Duration(milliseconds: 4000);
  static const heroAutoplay = Duration(milliseconds: 6000);
  static const skeleton = Duration(milliseconds: 1000);
  static const press = Duration(milliseconds: 100);
  static const page = Duration(milliseconds: 300);
  static const pageExit = Duration(milliseconds: 200);
  static const stagger = Duration(milliseconds: 40);
  static const counter = Duration(milliseconds: 600);
  static const fill = Duration(milliseconds: 300);
  // Eğriler (Material 3 Expressive / Apple HIG)
  static const standard = Cubic(0.2, 0, 0, 1);
  static const emphasizedDecel = Cubic(0.05, 0.7, 0.1, 1);
  static const emphasizedAccel = Cubic(0.3, 0, 0.8, 0.15);
  static const decelerate = Cubic(0, 0, 0, 1);
  static const accelerate = Cubic(0.3, 0, 1, 1);
  // Yaylar: SpringSimulation / Animation.animateWith için
  static final springVarsayilan = SpringDescription(mass: 1, stiffness: 380, damping: 30);
  static final springYaylanma = SpringDescription(mass: 1, stiffness: 420, damping: 22);
  static final springYumusak = SpringDescription(mass: 1, stiffness: 200, damping: 26);
  // Öneriler (karar bekliyor, docs/54 (c))
  static const oneriPage = Duration(milliseconds: 250);
  static const oneriExit = Duration(milliseconds: 200);
  static const oneriShared = Duration(milliseconds: 250);
  static const oneriSkeletonDelay = Duration(milliseconds: 450);
  static const oneriInputDebounce = Duration(milliseconds: 250);
}

abstract final class DgSize {
  static const double touchTarget = 44;
  static const double controlSm = 44;
  static const double controlLg = 52;
  static const double menuRow = 48;
  static const double header = 68;
  static const double headerTarget = 44;
  static const double headerIcon = 40;
  static const double navBar = 64;
  static const double navEdge = 16;
  static const double navBottom = 8;
  static const double navIcon = 22;
  static const double navCenterIcon = 20;
  static const double navLabel = 10;
  static const double navFab = 48;
  static const double navIndicatorWidth = 16;
  static const double navIndicatorHeight = 2;
  static const double cookBar = 52;
  static const double saveVisible = 32;
  static const double choice = 22;
  static const double chipHeight = 44;
  static const double actionCardHeight = 80;
  static const double actionIcon = 44;
  static const double appMax = 480;
  static const double listBanner = 320;
  static const double pageEndSpace = 80;
  static const double borderWidth = 1;
  static const double iconSm = 14;
  static const double iconMd = 18;
  static const double iconLg = 22;
  static const double iconPhotoMeta = 13;
  static const double iconCheck = 12;
  static const double iconBadge = 28;
  static const double iconBadgeLarge = 40;
  static const double avatarCard = 20;
  static const double avatarRow = 40;
  static const double avatarChef = 56;
  static const double avatarChefCard = 96;
  static const double railCard = 230;
  static const double thumb = 56;
  static const double playLarge = 56;
  static const double badge = 64;
  static const double badgeLarge = 96;
  static const double progress = 4;
}

/// Kavram → Font Awesome Free 6 Solid adı (font_awesome_flutter: FontAwesomeIcons.<camelCase>).
abstract final class DgIcons {
  static const home = 'house'; // FontAwesomeIcons.house
  static const recipes = 'bowl-food'; // FontAwesomeIcons.bowlFood
  static const category = 'layer-group'; // FontAwesomeIcons.layerGroup
  static const cuisine = 'earth-europe'; // FontAwesomeIcons.earthEurope
  static const whatToCook = 'wand-magic-sparkles'; // FontAwesomeIcons.wandMagicSparkles
  static const pantry = 'basket-shopping'; // FontAwesomeIcons.basketShopping
  static const tips = 'lightbulb'; // FontAwesomeIcons.lightbulb
  static const plateToRecipe = 'camera'; // FontAwesomeIcons.camera
  static const pro = 'crown'; // FontAwesomeIcons.crown
  static const video = 'circle-play'; // FontAwesomeIcons.circlePlay
  static const play = 'play'; // FontAwesomeIcons.play
  static const chef = 'user-tie'; // FontAwesomeIcons.userTie
  static const profile = 'user'; // FontAwesomeIcons.user
  static const follow = 'user-plus'; // FontAwesomeIcons.userPlus
  static const following = 'user-check'; // FontAwesomeIcons.userCheck
  static const notifications = 'bell'; // FontAwesomeIcons.bell
  static const reminder = 'bell'; // FontAwesomeIcons.bell
  static const subscribe = 'bell'; // FontAwesomeIcons.bell
  static const allergen = 'hand-dots'; // FontAwesomeIcons.handDots
  static const editorNote = 'pen-nib'; // FontAwesomeIcons.penNib
  static const time = 'clock'; // FontAwesomeIcons.clock
  static const prepTime = 'hourglass-half'; // FontAwesomeIcons.hourglassHalf
  static const cookTime = 'fire-burner'; // FontAwesomeIcons.fireBurner
  static const rating = 'star'; // FontAwesomeIcons.star
  static const views = 'eye'; // FontAwesomeIcons.eye
  static const save = 'bookmark'; // FontAwesomeIcons.bookmark
  static const share = 'share-nodes'; // FontAwesomeIcons.shareNodes
  static const more = 'ellipsis'; // FontAwesomeIcons.ellipsis
  static const menu = 'bars'; // FontAwesomeIcons.bars
  static const close = 'xmark'; // FontAwesomeIcons.xmark
  static const back = 'arrow-left'; // FontAwesomeIcons.arrowLeft
  static const seeAll = 'arrow-right'; // FontAwesomeIcons.arrowRight
  static const rowNext = 'chevron-right'; // FontAwesomeIcons.chevronRight
  static const expand = 'chevron-down'; // FontAwesomeIcons.chevronDown
  static const search = 'magnifying-glass'; // FontAwesomeIcons.magnifyingGlass
  static const filter = 'sliders'; // FontAwesomeIcons.sliders
  static const sort = 'arrow-down-wide-short'; // FontAwesomeIcons.arrowDownWideShort
  static const sortRecommended = 'wand-magic-sparkles'; // FontAwesomeIcons.wandMagicSparkles
  static const sortNewest = 'calendar-plus'; // FontAwesomeIcons.calendarPlus
  static const sortTopRated = 'star'; // FontAwesomeIcons.star
  static const sortFastest = 'bolt'; // FontAwesomeIcons.bolt
  static const viewGrid = 'table-cells-large'; // FontAwesomeIcons.tableCellsLarge
  static const viewList = 'list'; // FontAwesomeIcons.list
  static const servings = 'utensils'; // FontAwesomeIcons.utensils
  static const difficulty = 'gauge-simple'; // FontAwesomeIcons.gaugeSimple
  static const cost = 'wallet'; // FontAwesomeIcons.wallet
  static const calories = 'fire-flame-curved'; // FontAwesomeIcons.fireFlameCurved
  static const addToList = 'cart-plus'; // FontAwesomeIcons.cartPlus
  static const shoppingList = 'cart-shopping'; // FontAwesomeIcons.cartShopping
  static const substitute = 'shuffle'; // FontAwesomeIcons.shuffle
  static const info = 'circle-info'; // FontAwesomeIcons.circleInfo
  static const madeIt = 'fire-burner'; // FontAwesomeIcons.fireBurner
  static const applause = 'hands-clapping'; // FontAwesomeIcons.handsClapping
  static const comments = 'comment-dots'; // FontAwesomeIcons.commentDots
  static const recommend = 'thumbs-up'; // FontAwesomeIcons.thumbsUp
  static const copy = 'copy'; // FontAwesomeIcons.copy
  static const link = 'link'; // FontAwesomeIcons.link
  static const language = 'globe'; // FontAwesomeIcons.globe
  static const add = 'plus'; // FontAwesomeIcons.plus
  static const exclude = 'ban'; // FontAwesomeIcons.ban
  static const inPantry = 'circle-check'; // FontAwesomeIcons.circleCheck
  static const check = 'check'; // FontAwesomeIcons.check
  static const community = 'users'; // FontAwesomeIcons.users
  static const shareRecipe = 'circle-plus'; // FontAwesomeIcons.circlePlus
  static const badge = 'award'; // FontAwesomeIcons.award
  static const keepAwake = 'sun'; // FontAwesomeIcons.sun
  static const resetTimer = 'rotate-left'; // FontAwesomeIcons.rotateLeft
  static const offline = 'wifi'; // FontAwesomeIcons.wifi
  static const error = 'triangle-exclamation'; // FontAwesomeIcons.triangleExclamation
  static const maintenance = 'screwdriver-wrench'; // FontAwesomeIcons.screwdriverWrench
  static const update = 'arrows-rotate'; // FontAwesomeIcons.arrowsRotate
  static const delete = 'trash-can'; // FontAwesomeIcons.trashCan
  static const logout = 'right-from-bracket'; // FontAwesomeIcons.rightFromBracket
  static const privacy = 'shield-halved'; // FontAwesomeIcons.shieldHalved
  static const password = 'key'; // FontAwesomeIcons.key
  static const settings = 'gear'; // FontAwesomeIcons.gear
  static const history = 'clock-rotate-left'; // FontAwesomeIcons.clockRotateLeft
  static const moveUp = 'arrow-up'; // FontAwesomeIcons.arrowUp
  static const moveDown = 'arrow-down'; // FontAwesomeIcons.arrowDown
  static const showPassword = 'eye'; // FontAwesomeIcons.eye
  static const hidePassword = 'eye-slash'; // FontAwesomeIcons.eyeSlash
  static const login = 'right-to-bracket'; // FontAwesomeIcons.rightToBracket
}

/// Alt menü sırası veri olarak (Beyar kararı 8; patron teyidi bekliyor).
abstract final class DgNav {
  static const items = [
    (id: 'home', label: 'Ana Sayfa', icon: 'house', center: false),
    (id: 'recipes', label: 'Tarifler', icon: 'bowl-food', center: false),
    (id: 'find', label: 'Ne Pişirsem', icon: 'wand-magic-sparkles', center: true),
    (id: 'saved', label: 'Kaydettiklerim', icon: 'bookmark', center: false),
    (id: 'profile', label: 'Profil', icon: 'user', center: false),
  ];
}
