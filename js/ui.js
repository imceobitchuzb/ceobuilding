/* ==========================================================================
   CEOBUILDING — REAL ESTATE USER INTERFACE CONTROLLER & LOCALIZATION
   Quiet luxury architecture studio aesthetic.
   Bilingual support: Russian (default) and English.
   3D synchronization, floor selector, SVG floor plan, filters, gallery & inquiry.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Социальные сети проекта CEOBUILDING
  const SOCIAL_LINKS = {
    instagram: "https://instagram.com/ceobuilding",
    telegram: "https://t.me/ceobuilding"
  };

  // 1. ДВУЯЗЫЧНЫЙ СЛОВАРЬ (РУССКИЙ — ПО УМОЛЧАНИЮ, АНГЛИЙСКИЙ)
  const translations = {
    ru: {
      nav_concept: "КОНЦЕПТ",
      nav_architecture: "АРХИТЕКТУРА",
      nav_apartments: "РЕЗИДЕНЦИИ",
      nav_plans: "ПЛАНИРОВКИ",
      nav_amenities: "СЕРВИСЫ",
      nav_gallery: "ГАЛЕРЕЯ",
      nav_location: "ЛОКАЦИЯ",
      nav_timeline: "ХОД СТРОЙКИ",
      nav_contact: "КОНТАКТЫ",
      btn_choose_apt: "ВЫБРАТЬ РЕЗИДЕНЦИЮ",

      hero_badge: "TASHKENT CITY // LOT 204 // 2026 ARCHITECTURE",
      hero_title_1: "Мы создаем",
      hero_title_2: "пространства",
      hero_title_3: "вне времени.",
      hero_desc: "Синтез монументальной архитектуры и приватной роскоши в самом сердце Tashkent City. 14-этажный клубный дом с панорамным остеклением, приватными видовыми террасами и благоустроенным японским садом.",
      hero_btn_select: "ВЫБРАТЬ РЕЗИДЕНЦИЮ",
      hero_btn_explore: "О ПРОЕКТЕ",
      hero_coords_title: "КООРДИНАТЫ ОБЪЕКТА",
      scroll_hint: "ПРОКРУТИТЕ ВНИЗ",

      metric_floors: "Этажность",
      metric_residences: "Резиденции",
      metric_ceiling: "Высота потолков",
      metric_handover: "Срок сдачи",

      concept_tag: "ФИЛОСОФИЯ АРХИТЕКТУРЫ",
      concept_title: "Архитектура будущего и бескомпромиссный комфорт.",
      concept_desc1: "CEOBUILDING — это не просто клубный дом, а новый ориентир городской эстетики. Мы объединили монолитный каркас с энергоэффективными термофасадами, создав безопасную, уединенную атмосферу в деловом центре столицы.",
      concept_desc2: "Инсоляция, акустическая изоляция и микроклимат каждой резиденции выверены с помощью 4D BIM-проектирования.",
      cc1_title: "Монолит M450 и сейсмика 9.0",
      cc1_desc: "Мощный свайный фундамент и армированный каркас с предельной сейсмостойкостью.",
      cc2_title: "Панорамный термофасад",
      cc2_desc: "Двухкамерные стеклопакеты со снижением уличного шума до 42 дБ и солнцезащитным напылением.",
      cc3_title: "Интеллектуальный дом",
      cc3_desc: "Климат-контроль, управление сценариями освещения и доступ резидентов через смартфон.",
      cc4_title: "Приватный ландшафтный парк",
      cc4_desc: "Закрытая внутренняя территория без машин с японским садом, фонтанами и местами для отдыха.",

      arch_tag: "3D МОДЕЛЬ И ЭТАЖИ",
      arch_title: "Интерактивная 3D Архитектура",
      arch_desc: "Выберите этаж на 3D модели или переключайтесь между ракурсами. Изучайте высоту этажей, балконы и силуэт здания со всех сторон.",
      btn_view_floor_units: "ВЫБРАТЬ РЕЗИДЕНЦИЮ НА ЭТОМ ЭТАЖЕ →",

      selector_tag: "ПОДБОР РЕЗИДЕНЦИИ",
      selector_title: "Интерактивный Выбор Квартиры",
      selector_desc: "Выберите этаж слева, нажмите на резиденцию на поэтажном плане и ознакомьтесь с параметрами, стоимостью и графиком платежей.",
      stat_available: "Резиденций в продаже",
      stat_reserved: "Забронировано",

      filter_rooms: "Количество комнат:",
      filter_price: "Максимальная цена (млн UZS):",
      filter_area: "Площадь (м²):",
      filter_available_only: "Только в продаже",
      btn_reset_filters: "СБРОСИТЬ ФИЛЬТРЫ",

      fsc_header: "ВЫБОР ЭТАЖА",
      status_available: "В продаже",
      status_reserved: "Бронь",
      status_sold: "Продано",

      apt_select_prompt: "Выберите резиденцию",
      apt_select_prompt_sub: "Кликните на любую планировку на плане этажа для просмотра полной информации и расчета.",
      param_floor: "Этаж:",
      param_area: "Общая площадь:",
      param_balcony: "Балкон / Терраса:",
      param_ceiling: "Высота потолков:",
      param_view: "Вид из окон:",
      param_price: "Стоимость:",
      mortgage_title: "Рассрочка и график платежей",
      btn_book_apt: "ЗАБРОНИРОВАТЬ ЭТУ РЕЗИДЕНЦИЮ",
      btn_view_blueprint: "2D АРХИТЕКТУРНЫЙ ЧЕРТЕЖ",

      plans_tag: "ТИПОВЫЕ ПЛАНИРОВКИ",
      plans_title: "Продуманные Планировочные Решения",
      plans_desc: "Каждый квадратный метр организован для наполненности светом и ощущения простора. Изолированные спальни, мастер-сьюты и приватные видовые балконы.",

      amenities_tag: "СЕРВИС И ИНФРАСТРУКТУРА",
      amenities_title: "Стандарт Пятизвездочного Комфорта",
      amenities_desc: "Проживание в CEOBUILDING открывает доступ ко всей клубной инфраструктуре прямо на территории дома.",
      am1_title: "24/7 Гранд-Консьерж",
      am1_desc: "Персональный консьерж-сервис, прием гостей, доставка и бронирование сервисов.",
      am2_title: "2-уровневый подземный паркинг",
      am2_desc: "Охраняемая парковка со станциями зарядки электромобилей и распознаванием номеров.",
      am3_title: "Велнес и Спа-пространство",
      am3_desc: "25-метровый панорамный бассейн, финская сауна и тренажерный зал с оборудованием TechnoGym.",
      am4_title: "Приватный Японский сад",
      am4_desc: "Безопасный двор без машин с ландшафтным озеленением, беседками и детской зоной.",
      am5_title: "Скоростные лифты Otis",
      am5_desc: "Бесшумные скоростные лифты (2.5 м/с) с биометрическим доступом к персональному этажу.",
      am6_title: "Многоуровневая безопасность",
      am6_desc: "Система распознавания лиц Face-ID, круглосуточное видеонаблюдение и служба охраны.",

      gallery_tag: "ХОД СТРОИТЕЛЬСТВА И АРХИТЕКТУРА",
      gallery_title: "Фотохроника и Визуализация Проекта",
      gallery_desc: "Познакомьтесь с реальными процессами на строительной площадке, работой кранов, монолитным каркасом и будущими интерьерами.",
      gtab_all: "Все",
      gtab_site: "Стройплощадка",
      gtab_facade: "Фасад и башня",
      gtab_interior: "Интерьеры и сад",
      g_site_badge: "СТРОЙПЛОЩАДКА",
      g_facade_badge: "ФАСАД",
      g_interior_badge: "ИНТЕРЬЕР",
      g1_title: "Монолитный каркас и башенные краны",
      g1_sub: "Строительство 14-этажного премиального комплекса в Tashkent City",
      g2_title: "Панорамный остекленный фасад",
      g2_sub: "Двухкамерный термофасад и композитные архитектурные ламели",
      g3_title: "Фундамент и бетонные работы",
      g3_sub: "Высокомарочный бетон B40 и арматурный каркас A500C",
      g4_title: "24/7 Лобби Гранд-Консьерж",
      g4_sub: "Мраморная отделка, теплое световое зонирование и гостевой лаунж",
      g5_title: "Приватный японский сад и фонтаны",
      g5_sub: "Двор без автомобилей и уединенный променад для резидентов",
      g6_title: "Открытая терраса Sky Penthouse",
      g6_sub: "Панорамный обзор 360° на парк Tashkent City с 14 этажа",

      location_tag: "СТРАТЕГИЧЕСКАЯ ЛОКАЦИЯ",
      location_title: "Tashkent City: Главный Адрес Столицы",
      location_desc: "Комплекс расположен в респектабельном деловом и культурном центре Ташкента, в шаговой доступности от центрального парка, пятизвездочных отелей и ресторанов.",

      timeline_tag: "ХОД СТРОИТЕЛЬСТВА",
      timeline_title: "Этапы Реализации и Сроки",
      timeline_desc: "Все строительные работы ведутся в строгом соответствии с международным графиком и строительными нормами.",
      t1_title: "Котлован и фундамент",
      t1_desc: "Забиты 12-метровые сваи, залита монолитная фундаментная плита B40.",
      t2_title: "Монолитный железобетонный каркас",
      t2_desc: "Возведены несущие колонны и перекрытия всех 14 этажей.",
      t3_title: "Фасад и панорамное остекление",
      t3_desc: "Монтаж энергосберегающих теплоэффективных стеклопакетов.",
      t4_title: "Внутренние инженерные системы",
      t4_desc: "Установка лифтов, вентиляции, центрального кондиционирования и отделка лобби.",
      t5_title: "Ввод в эксплуатацию и ключи",
      t5_desc: "Завершение благоустройства территории и передача резиденций владельцам.",

      contact_tag: "ОФИС ПРОДАЖ И КОНСУЛЬТАЦИИ",
      contact_title: "Выберите Свою Резиденцию в Tashkent City",
      contact_desc: "Эксперты отдела продаж подробно проконсультируют вас по планировкам, спецпредложениям и индивидуальным графикам рассрочки.",
      form_title: "Записаться на Консультацию",
      form_desc: "Оставьте контактные данные, наш специалист свяжется с вами в течение 15 минут.",
      label_name: "Ваше имя *",
      label_phone: "Номер телефона *",
      label_unit: "Выбранная резиденция:",
      label_lang: "Язык общения:",
      btn_submit: "ОТПРАВИТЬ ЗАЯВКУ"
    },

    en: {
      nav_concept: "CONCEPT",
      nav_architecture: "ARCHITECTURE",
      nav_apartments: "RESIDENCES",
      nav_plans: "FLOOR PLANS",
      nav_amenities: "AMENITIES",
      nav_gallery: "GALLERY",
      nav_location: "LOCATION",
      nav_timeline: "PROGRESS",
      nav_contact: "CONTACT",
      btn_choose_apt: "SELECT RESIDENCE",

      hero_badge: "TASHKENT CITY // LOT 204 // 2026 ARCHITECTURE",
      hero_title_1: "We craft",
      hero_title_2: "timeless",
      hero_title_3: "spaces.",
      hero_desc: "A harmonious balance of monumental architecture and private luxury in the heart of Tashkent City. A 14-story residential boutique tower featuring floor-to-ceiling panoramic glazing, private sky terraces, and a tranquil Zen garden.",
      hero_btn_select: "SELECT RESIDENCE",
      hero_btn_explore: "EXPLORE PROJECT",
      hero_coords_title: "SITE COORDINATES",
      scroll_hint: "SCROLL DOWN",

      metric_floors: "Floors",
      metric_residences: "Residences",
      metric_ceiling: "Ceiling Height",
      metric_handover: "Handover",

      concept_tag: "DESIGN PHILOSOPHY",
      concept_title: "Future-proof architecture meets uncompromised living.",
      concept_desc1: "CEOBUILDING is not simply a residence; it is an architectural milestone. We paired a heavy reinforced concrete monolithic frame with high-performance thermal facades, establishing a serene sanctuary in the capital's premier business enclave.",
      concept_desc2: "Natural daylighting, acoustic privacy, and indoor climate circulation are calculated via advanced 4D BIM modeling.",
      cc1_title: "M450 Monolith & 9.0 Seismic",
      cc1_desc: "Heavy-duty foundation piling and reinforced concrete structural frame built to 9.0 seismic codes.",
      cc2_title: "Thermal Curtain Wall",
      cc2_desc: "Double-glazed insulated units delivering 42 dB acoustic insulation and solar heat protection.",
      cc3_title: "Intelligent Home OS",
      cc3_desc: "Integrated climate regulation, ambient lighting presets, and resident access via smartphone.",
      cc4_title: "Private Landscaped Park",
      cc4_desc: "Car-free secured resident courtyard with Japanese Zen stones, fountains, and leisure pavilions.",

      arch_tag: "3D MODEL & LEVELS",
      arch_title: "Interactive 3D Architectural Model",
      arch_desc: "Select any floor directly on the 3D model or toggle viewpoints. Inspect floor heights, cantilevered balconies, and tower geometry in real time.",
      btn_view_floor_units: "EXPLORE RESIDENCES ON THIS FLOOR →",

      selector_tag: "RESIDENCE SELECTOR",
      selector_title: "Interactive Residence Finder",
      selector_desc: "Select a level on the left, click on any residence on the floor plate, and inspect unit specifications, pricing, and monthly financing options.",
      stat_available: "Available Units",
      stat_reserved: "Reserved Units",

      filter_rooms: "Bedrooms:",
      filter_price: "Max Price (mln UZS):",
      filter_area: "Area (m²):",
      filter_available_only: "Available units only",
      btn_reset_filters: "RESET FILTERS",

      fsc_header: "SELECT LEVEL",
      status_available: "Available",
      status_reserved: "Reserved",
      status_sold: "Sold",

      apt_select_prompt: "Select a Residence",
      apt_select_prompt_sub: "Click on any residence on the floor plan above to review full specifications and payment calculations.",
      param_floor: "Floor:",
      param_area: "Total Area:",
      param_balcony: "Balcony / Terrace:",
      param_ceiling: "Ceiling Height:",
      param_view: "Window Orientation:",
      param_price: "Total Price:",
      mortgage_title: "Installment & Payment Plan",
      btn_book_apt: "INQUIRE ABOUT THIS RESIDENCE",
      btn_view_blueprint: "2D ARCHITECTURAL BLUEPRINT",

      plans_tag: "TYPICAL LAYOUTS",
      plans_title: "Refined & Ergonomic Layouts",
      plans_desc: "Every square meter is sculpted for natural illumination and comfortable living. Expansive living salons, private master suites, and panoramic glazed terraces.",

      amenities_tag: "AMENITIES & CONCIERGE",
      amenities_title: "Five-Star Residential Living",
      amenities_desc: "Living at CEOBUILDING means enjoying hotel-grade concierge and wellness amenities within your own building.",
      am1_title: "24/7 Grand Concierge",
      am1_desc: "Dedicated resident concierge, valet assistance, parcel reception, and private booking services.",
      am2_title: "2-Level Subterranean Garage",
      am2_desc: "Underground parking with high-capacity EV charging bays and automated license-plate recognition.",
      am3_title: "Wellness & Panoramic Spa",
      am3_desc: "25-meter indoor heated pool, Finnish sauna, and state-of-the-art TechnoGym fitness center.",
      am4_title: "Private Zen Courtyard Garden",
      am4_desc: "Car-free tranquil courtyard with Japanese stone gardens, fountains, and dedicated leisure areas.",
      am5_title: "Otis High-Speed Elevators",
      am5_desc: "Ultra-quiet passenger elevators travelling at 2.5 m/s with private keycard destination dispatch.",
      am6_title: "Multi-Tiered Security",
      am6_desc: "Biometric Face-ID access, perimeter monitoring, and round-the-clock security personnel.",

      gallery_tag: "CONSTRUCTION & ARCHITECTURE",
      gallery_title: "Project Photo Chronicles & Visuals",
      gallery_desc: "Explore active construction site progress, tower cranes, monolithic works, and future luxury interiors.",
      gtab_all: "All",
      gtab_site: "Construction Site",
      gtab_facade: "Facade & Tower",
      gtab_interior: "Interiors & Garden",
      g_site_badge: "CONSTRUCTION SITE",
      g_facade_badge: "FACADE",
      g_interior_badge: "INTERIOR",
      g1_title: "Monolithic Skeleton & Tower Cranes",
      g1_sub: "Construction of the 14-story residential complex in Tashkent City",
      g2_title: "Panoramic Glazed Facade",
      g2_sub: "Double-glazed high-efficiency curtain wall and bronze panels",
      g3_title: "Foundation & Concrete Works",
      g3_sub: "B40 high-strength concrete and A500C steel framework",
      g4_title: "24/7 Grand Concierge Lobby",
      g4_sub: "Marble finishes, warm ambient illumination and resident lounge",
      g5_title: "Private Zen Courtyard Garden & Fountains",
      g5_sub: "Car-free secured garden and walking paths for residents",
      g6_title: "Open-Air Sky Penthouse Terrace",
      g6_sub: "360° panoramic city and park skyline view from the 14th floor",

      location_tag: "STRATEGIC LOCATION",
      location_title: "Tashkent City: The Capital's Prestigious Core",
      location_desc: "Situated right in Tashkent's premier financial and cultural district, steps away from central park fountains, five-star hotels and fine dining.",

      timeline_tag: "CONSTRUCTION PROGRESS",
      timeline_title: "Development Milestones & Schedule",
      timeline_desc: "Construction is progressing strictly on schedule according to rigorous international structural codes.",
      t1_title: "Excavation & Foundation",
      t1_desc: "12-meter reinforced concrete piles driven and B40 foundation slab poured.",
      t2_title: "Monolithic Concrete Frame",
      t2_desc: "All 14 floors of structural columns and slabs fully cast.",
      t3_title: "Facade & Glazing",
      t3_desc: "Installation of high-performance thermal curtain wall glazing.",
      t4_title: "MEP Systems & Interior Fit-Out",
      t4_desc: "Elevators, HVAC, electrical infrastructure and marble lobby finishes.",
      t5_title: "Handover & Keys",
      t5_desc: "Commissioning of the residence complex and resident move-in.",

      contact_tag: "SALES GALLERY & INQUIRIES",
      contact_title: "Select Your Residence Today",
      contact_desc: "Our senior sales advisors will guide you through floor selections, custom fit-outs, and flexible financing arrangements.",
      form_title: "Request Private Consultation",
      form_desc: "Leave your phone number, and our senior advisor will contact you within 15 minutes.",
      label_name: "Full Name *",
      label_phone: "Phone Number *",
      label_unit: "Selected Residence:",
      label_lang: "Preferred Language:",
      btn_submit: "SUBMIT INQUIRY"
    }
  };

  // По умолчанию Русский язык (RU)
  const savedLang = localStorage.getItem('ceobuilding_lang');
  window.currentLanguage = (savedLang === 'en') ? 'en' : 'ru';
  window.currentPlanType = '2b';

  function applyLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') lang = 'ru';
    window.currentLanguage = lang;
    localStorage.setItem('ceobuilding_lang', lang);
    document.documentElement.lang = lang;

    const t = translations[lang] || translations.ru;

    // 1. Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // 2. Активные кнопки языка (только RU и EN)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });

    // 3. Обновляем список этажей без сброса выбора
    updateFloorSelectorUI();

    // 4. Обновляем поэтажный план
    if (window.currentFloorPlan) {
      window.currentFloorPlan.renderFloor(
        window.activeFloorNumber, 
        window.activeApartment ? window.activeApartment.number : null
      );
    }

    // 5. Обновляем карточку выбранной квартиры в новом языке
    if (window.activeApartment) {
      selectApartment(window.activeApartment);
    }

    // 6. Обновляем демонстрационную планировку
    showFeaturedPlan(window.currentPlanType || '2b');

    // 7. Обновляем плашку 3D HUD
    update3DHud(window.activeFloorNumber || 12);
  }

  // Слушатель переключения языков
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // 2. ИНИЦИАЛИЗАЦИЯ 3D ЗДАНИЯ (THREE.JS)
  let building3D = null;
  const canvasContainer = document.getElementById('building-3d-canvas');
  if (canvasContainer && typeof Residential3DBuilding !== 'undefined') {
    building3D = new Residential3DBuilding('building-3d-canvas', {
      onFloorClick: (floorNumber) => {
        selectFloor(floorNumber, true);
      },
      onFloorHover: (floorNumber) => {
        update3DHud(floorNumber);
      }
    });
  }

  // Режимы 3D камеры
  document.querySelectorAll('.cam-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      document.querySelectorAll('.cam-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (building3D) building3D.setCameraMode(mode);
    });
  });

  // Плашка 3D HUD
  const fhudFloorName = document.getElementById('fhud-floor-name');
  const fhudFloorInfo = document.getElementById('fhud-floor-info');
  const fhudJumpBtn = document.getElementById('fhud-jump-btn');

  function update3DHud(floorNumber) {
    if (!floorNumber) return;
    const stats = window.APARTMENTS_CATALOG.getFloorStats(floorNumber);
    const lang = window.currentLanguage || 'ru';

    if (fhudFloorName) {
      fhudFloorName.textContent = stats.name[lang] || stats.name.ru;
    }
    if (fhudFloorInfo) {
      if (floorNumber === 1) {
        fhudFloorInfo.textContent = lang === 'en' 
          ? "Grand Lobby, Wellness & Concierge" 
          : "Гранд-Лобби, Велнес и Консьерж-сервис";
      } else {
        const availText = lang === 'en' ? 'available residences' : 'резиденций в продаже';
        const ceilingText = lang === 'en' ? 'Ceiling: 3.30 m' : 'Потолки: 3.30 м';
        fhudFloorInfo.textContent = `${ceilingText} • ${stats.available} ${availText}`;
      }
    }
  }

  if (fhudJumpBtn) {
    fhudJumpBtn.addEventListener('click', () => {
      const targetFloor = building3D ? building3D.selectedFloor : 12;
      selectFloor(targetFloor, true);
      const el = document.getElementById('apartments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 3. СЕЛЕКТОР КВАРТИР (APARTMENT SELECTOR CORE)
  window.activeFloorNumber = 12;
  window.activeApartment = null;

  // Инициализация рендера поэтажного плана
  const floorPlanRenderer = new FloorPlanRenderer('interactive-floorplan-container', (selectedApt) => {
    selectApartment(selectedApt);
  });
  window.currentFloorPlan = floorPlanRenderer;

  // Генерация кнопок этажей (от 14 до 1)
  const floorButtonsList = document.getElementById('floor-buttons-list');
  function updateFloorSelectorUI() {
    if (!floorButtonsList) return;
    floorButtonsList.innerHTML = '';

    const lang = window.currentLanguage || 'ru';

    for (let f = 14; f >= 1; f--) {
      const stats = window.APARTMENTS_CATALOG.getFloorStats(f);
      const isActive = (f === window.activeFloorNumber);

      const btn = document.createElement('button');
      btn.className = `btn-floor-row ${isActive ? 'active' : ''}`;
      btn.setAttribute('data-floor', f);

      const countLabel = lang === 'en' ? `${stats.available} left` : `${stats.available} св.`;
      let badgeHtml = `<span class="bfr-badge">${countLabel}</span>`;
      if (f === 1) badgeHtml = `<span class="bfr-badge">${lang === 'en' ? 'Lobby' : 'Лобби'}</span>`;

      btn.innerHTML = `
        <span class="bfr-num">${f}F</span>
        <span class="bfr-name">${stats.name[lang] || stats.name.ru}</span>
        ${badgeHtml}
      `;

      btn.addEventListener('click', () => {
        selectFloor(f);
      });

      floorButtonsList.appendChild(btn);
    }
  }

  // Выбор этажа
  function selectFloor(floorNumber, scrollIntoView = false) {
    window.activeFloorNumber = floorNumber;

    // Синхронизация с 3D
    if (building3D) {
      building3D.selectFloor(floorNumber, false);
      update3DHud(floorNumber);
    }

    // Подсветка кнопок этажей
    document.querySelectorAll('.btn-floor-row').forEach(b => {
      const f = parseInt(b.getAttribute('data-floor'), 10);
      b.classList.toggle('active', f === floorNumber);
    });

    // Отрисовка плана этажа
    floorPlanRenderer.renderFloor(floorNumber, window.activeApartment ? window.activeApartment.number : null);

    if (scrollIntoView) {
      const aptSec = document.getElementById('apartments');
      if (aptSec) aptSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 4. ДЕТАЛИ ВЫБРАННОЙ КВАРТИРЫ
  const aptCardPlaceholder = document.getElementById('apt-card-placeholder');
  const aptCardData = document.getElementById('apt-card-data');
  const cardNumber = document.getElementById('card-number');
  const cardStatusBadge = document.getElementById('card-status-badge');
  const cardRoomsTitle = document.getElementById('card-rooms-title');
  const cardFloor = document.getElementById('card-floor');
  const cardArea = document.getElementById('card-area');
  const cardBalcony = document.getElementById('card-balcony');
  const cardCeiling = document.getElementById('card-ceiling');
  const cardView = document.getElementById('card-view');
  const cardPrice = document.getElementById('card-price');
  const cardMeterPrice = document.getElementById('card-meter-price');
  const cardMonthlyPayment = document.getElementById('card-monthly-payment');
  const cardThumbImg = document.getElementById('card-thumb-img');
  const formSelectedAptInput = document.getElementById('form-selected-apt');

  function selectApartment(apt) {
    window.activeApartment = apt;
    if (!apt) return;

    const lang = window.currentLanguage || 'ru';

    if (aptCardPlaceholder) aptCardPlaceholder.classList.add('hidden');
    if (aptCardData) aptCardData.classList.remove('hidden');

    if (cardNumber) cardNumber.textContent = apt.number;

    // Обновляем превью-фотографию (для пентхаусов — терраса, для обычных — фасад башни)
    if (cardThumbImg) {
      cardThumbImg.src = apt.isPenthouse 
        ? 'assets/images/penthouse-terrace.webp' 
        : 'assets/images/tower-facade.webp';
    }

    if (cardStatusBadge) {
      cardStatusBadge.className = `apt-status-badge ${apt.status}`;
      const statusTexts = {
        available: { ru: 'В ПРОДАЖЕ', en: 'AVAILABLE' },
        reserved: { ru: 'БРОНЬ', en: 'RESERVED' },
        sold: { ru: 'ПРОДАНО', en: 'SOLD' }
      };
      cardStatusBadge.textContent = (statusTexts[apt.status] && statusTexts[apt.status][lang]) || apt.status.toUpperCase();
    }

    if (cardRoomsTitle) {
      let roomWord = `${apt.rooms}-комнатная Резиденция`;
      if (apt.isPenthouse) {
        roomWord = lang === 'en' ? 'Panoramic Sky Penthouse' : 'Видовой Sky Penthouse';
      } else if (lang === 'en') {
        roomWord = `${apt.rooms}-Bedroom Residence`;
      }
      cardRoomsTitle.textContent = roomWord;
    }

    if (cardFloor) cardFloor.textContent = lang === 'en' ? `Level ${apt.floor}` : `${apt.floor} этаж`;
    if (cardArea) cardArea.textContent = `${apt.area} m²`;
    if (cardBalcony) cardBalcony.textContent = `${apt.balconyArea} m²`;
    if (cardCeiling) cardCeiling.textContent = apt.ceilingHeight;
    if (cardView) cardView.textContent = apt.view[lang] || apt.view.ru;

    if (cardPrice) cardPrice.textContent = window.APARTMENTS_CATALOG.formatUZS(apt.totalPrice);
    if (cardMeterPrice) cardMeterPrice.textContent = window.APARTMENTS_CATALOG.formatUZS(apt.meterPrice) + " / m²";

    // Расчет рассрочки
    const mortgage = window.APARTMENTS_CATALOG.calculateMortgage(apt.totalPrice, 30, 10);
    if (cardMonthlyPayment) {
      cardMonthlyPayment.textContent = window.APARTMENTS_CATALOG.formatUZS(mortgage.monthlyPayment);
    }

    // Авто-заполнение формы заявки
    if (formSelectedAptInput) {
      const unitText = lang === 'en' 
        ? `${apt.number} (${apt.rooms} bed, ${apt.area} m² - ${window.APARTMENTS_CATALOG.formatUZS(apt.totalPrice)})`
        : `${apt.number} (${apt.rooms}-комн., ${apt.area} м² - ${window.APARTMENTS_CATALOG.formatUZS(apt.totalPrice)})`;
      formSelectedAptInput.value = unitText;
    }
  }

  // Кнопка бронирования
  const btnInquireSelected = document.getElementById('btn-inquire-selected');
  if (btnInquireSelected) {
    btnInquireSelected.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('form-user-name');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Кнопка 2D чертежа
  const btnViewBlueprint = document.getElementById('btn-view-blueprint');
  const blueprintModal = document.getElementById('blueprint-modal');
  const blueprintModalBody = document.getElementById('blueprint-modal-body');
  const btnCloseBlueprint = document.getElementById('btn-close-blueprint');

  if (btnViewBlueprint && blueprintModal && blueprintModalBody) {
    btnViewBlueprint.addEventListener('click', () => {
      if (!window.activeApartment) return;
      blueprintModalBody.innerHTML = FloorPlanRenderer.renderApartmentBlueprint(window.activeApartment);
      blueprintModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModal = () => {
    if (blueprintModal) {
      blueprintModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (btnCloseBlueprint) btnCloseBlueprint.addEventListener('click', closeModal);
  if (blueprintModal) {
    blueprintModal.addEventListener('click', (e) => {
      if (e.target === blueprintModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blueprintModal.classList.contains('open')) closeModal();
    });
  }

  // 5. ФИЛЬТРАЦИЯ КВАРТИР
  let filterRooms = 'all';
  let filterMaxPrice = 3000;
  let filterMaxArea = 160;
  let filterAvailableOnly = true;

  const roomChips = document.querySelectorAll('.room-chip');
  const priceRange = document.getElementById('filter-price-range');
  const priceVal = document.getElementById('filter-price-val');
  const areaRange = document.getElementById('filter-area-range');
  const areaVal = document.getElementById('filter-area-val');
  const availCheckbox = document.getElementById('filter-available-only');
  const btnReset = document.getElementById('btn-reset-filters');

  roomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterRooms = chip.getAttribute('data-rooms');
      applyFilters();
    });
  });

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', (e) => {
      filterMaxPrice = parseInt(e.target.value, 10);
      priceVal.textContent = `${filterMaxPrice.toLocaleString()} млн`;
      applyFilters();
    });
  }

  if (areaRange && areaVal) {
    areaRange.addEventListener('input', (e) => {
      filterMaxArea = parseInt(e.target.value, 10);
      areaVal.textContent = `${filterMaxArea} m²`;
      applyFilters();
    });
  }

  if (availCheckbox) {
    availCheckbox.addEventListener('change', (e) => {
      filterAvailableOnly = e.target.checked;
      applyFilters();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      filterRooms = 'all';
      filterMaxPrice = 3000;
      filterMaxArea = 160;
      filterAvailableOnly = true;

      roomChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-rooms') === 'all'));
      if (priceRange) priceRange.value = 3000;
      if (priceVal) priceVal.textContent = "3,000 млн";
      if (areaRange) areaRange.value = 160;
      if (areaVal) areaVal.textContent = "160 m²";
      if (availCheckbox) availCheckbox.checked = true;

      applyFilters();
    });
  }

  function applyFilters() {
    const all = window.APARTMENTS_CATALOG.allApartments;
    const filtered = all.filter(apt => {
      if (filterRooms !== 'all') {
        const r = parseInt(filterRooms, 10);
        if (r === 4) {
          if (apt.rooms < 4) return false;
        } else {
          if (apt.rooms !== r) return false;
        }
      }
      const priceMln = apt.totalPrice / 1000000;
      if (priceMln > filterMaxPrice) return false;
      if (apt.area > filterMaxArea) return false;
      if (filterAvailableOnly && apt.status !== 'available') return false;

      return true;
    });

    if (filtered.length > 0) {
      const matchOnCurrent = filtered.some(a => a.floor === window.activeFloorNumber);
      if (!matchOnCurrent) {
        selectFloor(filtered[0].floor);
      } else {
        floorPlanRenderer.renderFloor(window.activeFloorNumber);
      }
    }
  }

  // 6. СЕКЦИЯ ПЛАНИРОВОК (PLANLAR SHOWCASE)
  const planTabs = document.querySelectorAll('.plan-tab');
  const featuredPlanDisplay = document.getElementById('featured-plan-display');

  const sampleApts = {
    '1b': { number: 'TYPE-1B (44.5 m²)', rooms: 1, area: 44.5, balconyArea: 3.5, roomsBreakdown: { living: 18.5, bedroom1: 0, kitchen: 12.5, bath: 4.5, corridor: 5.5 } },
    '2b': { number: 'TYPE-2B (64.2 m²)', rooms: 2, area: 64.2, balconyArea: 4.8, roomsBreakdown: { living: 22.4, bedroom1: 16.8, kitchen: 12.0, bath: 5.2, corridor: 7.8 } },
    '3b': { number: 'TYPE-3B (88.6 m²)', rooms: 3, area: 88.6, balconyArea: 6.2, roomsBreakdown: { living: 28.0, bedroom1: 18.2, bedroom2: 15.4, kitchen: 14.0, bath: 6.5, corridor: 6.5 } },
    'ph': { number: 'SKY PENTHOUSE (146.5 m²)', rooms: 4, area: 146.5, balconyArea: 28.5, roomsBreakdown: { living: 45.0, bedroom1: 24.0, bedroom2: 19.5, bedroom3: 16.0, kitchen: 20.0, bath: 12.0, corridor: 10.0 } }
  };

  function showFeaturedPlan(type) {
    window.currentPlanType = type;
    const apt = sampleApts[type] || sampleApts['2b'];
    if (featuredPlanDisplay) {
      featuredPlanDisplay.innerHTML = FloorPlanRenderer.renderApartmentBlueprint(apt);
    }
  }

  planTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      planTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showFeaturedPlan(tab.getAttribute('data-type'));
    });
  });

  // 7. СЕКЦИЯ ГАЛЕРЕИ (ИНТЕРАКТИВНАЯ ФИЛЬТРАЦИЯ КАТЕГОРИЙ)
  const galleryFilterTabs = document.querySelectorAll('#gallery-filter-tabs .g-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. ФОРМА ЗАЯВКИ
  const inquiryForm = document.getElementById('main-inquiry-form');
  const formStatusBox = document.getElementById('form-status-box');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-user-name').value.trim();
      const phone = document.getElementById('form-user-phone').value.trim();
      const unit = document.getElementById('form-selected-apt').value;
      const lang = window.currentLanguage || 'ru';

      if (!name || !phone) return;

      const submitBtn = document.getElementById('btn-submit-form');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "...";
      }

      setTimeout(() => {
        if (formStatusBox) {
          formStatusBox.className = 'form-status-alert success';
          if (lang === 'en') {
            formStatusBox.innerHTML = `
              <strong>Thank you, ${name}!</strong> Your inquiry has been received.<br>
              Selected residence: <em>${unit}</em>.<br>
              Our senior private advisor will contact you at ${phone} within 15 minutes.
            `;
          } else {
            formStatusBox.innerHTML = `
              <strong>Спасибо, ${name}!</strong> Ваша заявка успешно принята.<br>
              Выбранная резиденция: <em>${unit}</em>.<br>
              Наш эксперт свяжется с вами по номеру ${phone} в течение 15 минут.
            `;
          }
          formStatusBox.classList.remove('hidden');
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = translations[lang].btn_submit;
        }

        inquiryForm.reset();
      }, 700);
    });
  }

  // 9. МОБИЛЬНОЕ МЕНЮ
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          mobileToggle.classList.remove('active');
          mainNav.classList.remove('mobile-open');
        }
      });
    });
  }

  // 10. ПРИВЯЗКА СОЦИАЛЬНЫХ СЕТЕЙ (INSTAGRAM И TELEGRAM)
  document.querySelectorAll('a[data-social="instagram"]').forEach(a => a.href = SOCIAL_LINKS.instagram);
  document.querySelectorAll('a[data-social="telegram"]').forEach(a => a.href = SOCIAL_LINKS.telegram);

  // 11. СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ
  updateFloorSelectorUI();
  selectFloor(12);

  // Выбираем по умолчанию квартиру A-1204
  const defaultApt = window.APARTMENTS_CATALOG.allApartments.find(a => a.number === 'A-1204');
  if (defaultApt) selectApartment(defaultApt);

  showFeaturedPlan('2b');

  // Применяем сохраненный язык (по умолчанию ru)
  applyLanguage(window.currentLanguage);
});
