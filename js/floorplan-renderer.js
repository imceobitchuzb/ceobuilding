/* ==========================================================================
   CEOBUILDING — INTERACTIVE ARCHITECTURAL FLOOR PLAN & BLUEPRINT RENDERER
   Quiet Luxury editorial styling, vector SVG floor plates & CAD blueprints.
   Bilingual: Russian (default) and English.
   ========================================================================== */

class FloorPlanRenderer {
  constructor(containerId, onApartmentSelect) {
    this.container = document.getElementById(containerId);
    this.onApartmentSelect = onApartmentSelect;
    this.currentFloor = 12;
    this.selectedApartmentId = null;
  }

  // Отрисовка поэтажного плана (Floor Plate)
  renderFloor(floorNumber, selectedUnitId = null) {
    this.currentFloor = floorNumber;
    if (selectedUnitId) this.selectedApartmentId = selectedUnitId;
    if (!this.container) return;

    const lang = window.currentLanguage || 'ru';

    if (floorNumber === 1) {
      // 1-й этаж: Лобби, Ресепшн, Велнес
      this.renderLobbyFloor();
      return;
    }

    const floorData = window.APARTMENTS_CATALOG.getFloorStats(floorNumber);
    const units = floorData.units;
    const isPenthouseFloor = floorNumber === 14;

    const badgeText = isPenthouseFloor
      ? (lang === 'en' ? 'SKY PENTHOUSES' : 'ВИДОВЫЕ ПЕНТХАУСЫ')
      : (lang === 'en' ? 'RESIDENTIAL LEVEL' : 'ЖИЛОЙ ЭТАЖ');

    const statusTexts = {
      available: lang === 'en' ? 'Available' : 'В продаже',
      reserved: lang === 'en' ? 'Reserved' : 'Бронь',
      sold: lang === 'en' ? 'Sold' : 'Продано'
    };

    const compassLabel = lang === 'en' ? 'NORTH' : 'СЕВЕР';

    const svgHtml = isPenthouseFloor 
      ? this.generatePenthouseFloorSvg(units)
      : this.generateTypicalFloorSvg(units);

    this.container.innerHTML = `
      <div class="floorplan-wrapper">
        <div class="floorplan-header-bar">
          <div class="fph-left">
            <span class="fph-badge">${badgeText}</span>
            <h4 class="fph-title">${floorData.name[lang] || floorData.name.ru}</h4>
          </div>
          <div class="fph-legend">
            <span class="leg-item"><span class="leg-dot available"></span> <span>${statusTexts.available}</span> (${floorData.available})</span>
            <span class="leg-item"><span class="leg-dot reserved"></span> <span>${statusTexts.reserved}</span> (${floorData.reserved})</span>
            <span class="leg-item"><span class="leg-dot sold"></span> <span>${statusTexts.sold}</span> (${floorData.sold})</span>
          </div>
        </div>

        <div class="floorplan-svg-viewport">
          ${svgHtml}
        </div>

        <div class="floorplan-compass" title="Orientation">
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="var(--border-subtle, #E5E2DA)" stroke-width="1"/>
            <polygon points="20,6 23,19 17,19" fill="var(--accent-bronze, #8C7355)"/>
            <polygon points="20,34 23,21 17,21" fill="var(--text-muted, #94979E)"/>
            <text x="20" y="5" font-size="7" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600">N</text>
          </svg>
          <span class="compass-label">${compassLabel}</span>
        </div>
      </div>
    `;

    // Навешиваем слушатели клика на квартиры
    this.attachSvgListeners();
  }

  // Генерация типового этажа (2–13)
  generateTypicalFloorSvg(units) {
    const lang = window.currentLanguage || 'ru';
    const roomWord = lang === 'en' ? 'rooms' : 'комн.';

    const unitCoords = [
      { idIdx: 0, x: 70, y: 60, w: 220, h: 200, labelX: 180, labelY: 160 },
      { idIdx: 1, x: 310, y: 60, w: 280, h: 170, labelX: 450, labelY: 145 },
      { idIdx: 2, x: 610, y: 60, w: 220, h: 200, labelX: 720, labelY: 160 },
      { idIdx: 3, x: 610, y: 280, w: 220, h: 270, labelX: 720, labelY: 415 },
      { idIdx: 4, x: 470, y: 350, w: 120, h: 200, labelX: 530, labelY: 450 },
      { idIdx: 5, x: 310, y: 350, w: 140, h: 200, labelX: 380, labelY: 450 },
      { idIdx: 6, x: 70, y: 280, w: 220, h: 270, labelX: 180, labelY: 415 }
    ];

    let unitsSvg = '';

    unitCoords.forEach((coord, i) => {
      const unit = units[coord.idIdx] || {
        number: `A-${this.currentFloor}0${i+1}`,
        rooms: 2,
        area: 65,
        status: 'available',
        totalPrice: 900000000
      };

      const isSelected = this.selectedApartmentId === unit.number;
      const statusClass = `unit-${unit.status}`;
      const selectedClass = isSelected ? 'unit-selected' : '';

      const statusLabels = {
        available: lang === 'en' ? 'AVAILABLE' : 'В ПРОДАЖЕ',
        reserved: lang === 'en' ? 'RESERVED' : 'ЗАБРОНИРОВАНО',
        sold: lang === 'en' ? 'SOLD' : 'ПРОДАНО'
      };

      const priceText = `${(unit.totalPrice / 1000000).toFixed(0)} mln UZS`;

      unitsSvg += `
        <g class="fp-unit-group ${statusClass} ${selectedClass}" data-unit-id="${unit.number}" tabindex="0" role="button" aria-label="${unit.number}">
          <!-- Контур квартиры -->
          <rect class="fp-unit-rect" x="${coord.x}" y="${coord.y}" width="${coord.w}" height="${coord.h}" rx="3" />
          
          <!-- Внутренние архитектурные линии комнат (легкая сетка) -->
          <line x1="${coord.x + 10}" y1="${coord.y + coord.h * 0.4}" x2="${coord.x + coord.w - 10}" y2="${coord.y + coord.h * 0.4}" stroke="var(--border-subtle, #E5E2DA)" stroke-dasharray="3 3"/>
          <line x1="${coord.x + coord.w * 0.5}" y1="${coord.y + 10}" x2="${coord.x + coord.w * 0.5}" y2="${coord.y + coord.h - 10}" stroke="var(--border-subtle, #E5E2DA)" stroke-dasharray="3 3"/>

          <!-- Маркер балкона -->
          <rect x="${coord.x + coord.w * 0.2}" y="${coord.y === 60 ? coord.y - 6 : coord.y + coord.h}" width="${coord.w * 0.6}" height="6" fill="var(--accent-bronze, #8C7355)" opacity="0.6" rx="2" />

          <!-- Текстовые метки -->
          <text class="fp-unit-num" x="${coord.labelX}" y="${coord.labelY - 18}" text-anchor="middle">${unit.number}</text>
          <text class="fp-unit-info" x="${coord.labelX}" y="${coord.labelY + 2}" text-anchor="middle">${unit.rooms} ${roomWord} • ${unit.area} m²</text>
          <text class="fp-unit-price" x="${coord.labelX}" y="${coord.labelY + 20}" text-anchor="middle">${priceText}</text>
          <text class="fp-unit-status" x="${coord.labelX}" y="${coord.labelY + 36}" text-anchor="middle">${statusLabels[unit.status] || ''}</text>
        </g>
      `;
    });

    const coreLabel = lang === 'en' ? 'CENTRAL ELEVATOR CORE & CORRIDOR' : 'ЛИФТОВЫЙ ХОЛЛ И КОРИДОР';
    const stairsLabel = lang === 'en' ? 'STAIRS' : 'ЛЕСТНИЦА';

    return `
      <svg class="floorplan-svg" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="fp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--border-subtle, rgba(20,23,26,0.04))" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Фон сетки -->
        <rect width="100%" height="100%" fill="url(#fp-grid)"/>

        <!-- Внешний контур этажа здания -->
        <rect x="50" y="40" width="800" height="530" rx="4" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>

        <!-- Центральное лифтовое ядро и холл -->
        <g class="fp-core-group">
          <!-- Холл этажа -->
          <rect x="310" y="250" width="280" height="80" fill="var(--bg-surface-elevated, #EBE8E1)" stroke="var(--border-medium, #D8D5CD)" stroke-width="1" rx="2"/>
          <text x="450" y="295" text-anchor="middle" font-size="10" fill="var(--text-secondary, #5A5D62)" font-family="'Inter', sans-serif" letter-spacing="1">${coreLabel}</text>

          <!-- Шахты лифтов (2 скоростных лифта Otis) -->
          <rect x="370" y="260" width="34" height="28" fill="var(--bg-surface, #FFFFFF)" stroke="var(--accent-bronze, #8C7355)" stroke-width="1"/>
          <line x1="370" y1="260" x2="404" y2="288" stroke="var(--accent-bronze, #8C7355)" stroke-width="0.8"/>
          <line x1="404" y1="260" x2="370" y2="288" stroke="var(--accent-bronze, #8C7355)" stroke-width="0.8"/>
          <text x="387" y="255" text-anchor="middle" font-size="8" fill="var(--accent-bronze, #8C7355)" font-family="'Inter', sans-serif" font-weight="600">OTIS 1</text>

          <rect x="415" y="260" width="34" height="28" fill="var(--bg-surface, #FFFFFF)" stroke="var(--accent-bronze, #8C7355)" stroke-width="1"/>
          <line x1="415" y1="260" x2="449" y2="288" stroke="var(--accent-bronze, #8C7355)" stroke-width="0.8"/>
          <line x1="449" y1="260" x2="415" y2="288" stroke="var(--accent-bronze, #8C7355)" stroke-width="0.8"/>
          <text x="432" y="255" text-anchor="middle" font-size="8" fill="var(--accent-bronze, #8C7355)" font-family="'Inter', sans-serif" font-weight="600">OTIS 2</text>

          <!-- Эвакуационная лестничная клетка -->
          <rect x="495" y="260" width="60" height="28" fill="var(--bg-surface, #FFFFFF)" stroke="var(--border-medium, #D8D5CD)" stroke-width="1"/>
          <line x1="505" y1="260" x2="505" y2="288" stroke="var(--border-medium, #D8D5CD)" stroke-width="0.8"/>
          <line x1="515" y1="260" x2="515" y2="288" stroke="var(--border-medium, #D8D5CD)" stroke-width="0.8"/>
          <line x1="525" y1="260" x2="525" y2="288" stroke="var(--border-medium, #D8D5CD)" stroke-width="0.8"/>
          <line x1="535" y1="260" x2="535" y2="288" stroke="var(--border-medium, #D8D5CD)" stroke-width="0.8"/>
          <line x1="545" y1="260" x2="545" y2="288" stroke="var(--border-medium, #D8D5CD)" stroke-width="0.8"/>
          <text x="525" y="255" text-anchor="middle" font-size="8" fill="var(--text-muted, #94979E)" font-family="'Inter', sans-serif">${stairsLabel}</text>
        </g>

        <!-- Отрисовка всех квартир этажа -->
        ${unitsSvg}
      </svg>
    `;
  }

  // Генерация 14-го этажа: Скай Пентхаусы (Sky Penthouses)
  generatePenthouseFloorSvg(units) {
    const lang = window.currentLanguage || 'ru';
    const coords = [
      { idIdx: 0, x: 70, y: 60, w: 360, h: 230, labelX: 250, labelY: 175 },
      { idIdx: 1, x: 470, y: 60, w: 360, h: 230, labelX: 650, labelY: 175 },
      { idIdx: 2, x: 70, y: 320, w: 760, h: 220, labelX: 450, labelY: 430 }
    ];

    let unitsSvg = '';
    coords.forEach((coord, i) => {
      const unit = units[coord.idIdx] || {
        number: `PH-140${i+1}`,
        rooms: 4,
        area: 150,
        status: 'available',
        totalPrice: 2800000000
      };

      const isSelected = this.selectedApartmentId === unit.number;
      const statusClass = `unit-${unit.status}`;
      const selectedClass = isSelected ? 'unit-selected' : '';

      const terraceText = lang === 'en' ? 'OPEN SKY TERRACE' : 'ОТКРЫТАЯ SKY-ТЕРРАСА';
      const phText = lang === 'en' ? `${unit.rooms}-Bedroom Sky Penthouse` : `${unit.rooms}-комнатный Sky Penthouse`;
      const priceText = `${(unit.totalPrice / 1000000).toFixed(0)} mln UZS`;

      unitsSvg += `
        <g class="fp-unit-group penthouse-unit ${statusClass} ${selectedClass}" data-unit-id="${unit.number}" tabindex="0" role="button">
          <rect class="fp-unit-rect" x="${coord.x}" y="${coord.y}" width="${coord.w}" height="${coord.h}" rx="4" />
          
          <!-- Обозначение панорамной террасы на крыше -->
          <rect x="${coord.x + 15}" y="${coord.y + 15}" width="${coord.w - 30}" height="28" fill="var(--accent-bronze-soft, rgba(140,115,85,0.08))" stroke="var(--accent-bronze, #8C7355)" stroke-width="1" stroke-dasharray="4 2" rx="3"/>
          <text x="${coord.x + coord.w / 2}" y="${coord.y + 33}" text-anchor="middle" font-size="9" fill="var(--accent-bronze, #8C7355)" font-family="'Inter', sans-serif" font-weight="600" letter-spacing="1">${terraceText}</text>

          <text class="fp-unit-num" x="${coord.labelX}" y="${coord.labelY - 14}" text-anchor="middle">${unit.number}</text>
          <text class="fp-unit-info" x="${coord.labelX}" y="${coord.labelY + 6}" text-anchor="middle">${phText} • ${unit.area} m²</text>
          <text class="fp-unit-price" x="${coord.labelX}" y="${coord.labelY + 26}" text-anchor="middle">${priceText}</text>
          <text class="fp-unit-status" x="${coord.labelX}" y="${coord.labelY + 44}" text-anchor="middle">${unit.status.toUpperCase()}</text>
        </g>
      `;
    });

    return `
      <svg class="floorplan-svg" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
        <rect width="100%" height="100%" fill="none"/>
        <rect x="50" y="40" width="800" height="520" rx="4" fill="none" stroke="var(--accent-bronze, #8C7355)" stroke-width="2"/>
        ${unitsSvg}
      </svg>
    `;
  }

  // 1-й этаж: Лобби и Велнес
  renderLobbyFloor() {
    const lang = window.currentLanguage || 'ru';
    const isEn = lang === 'en';

    this.container.innerHTML = `
      <div class="floorplan-wrapper lobby-wrapper">
        <div class="floorplan-header-bar">
          <div class="fph-left">
            <span class="fph-badge">${isEn ? 'GROUND FLOOR & LOBBY' : 'ПЕРВЫЙ ЭТАЖ И ЛОББИ'}</span>
            <h4 class="fph-title">${isEn ? 'Level 1: Grand Concierge & Wellness Hub' : '1 этаж: Гранд-Консьерж и Велнес-комплекс'}</h4>
          </div>
        </div>
        <div class="lobby-plan-card">
          <div class="lobby-zones-grid">
            <div class="lz-item">
              <span class="lz-num">01</span>
              <div class="lz-info">
                <h5>${isEn ? '24/7 Grand Concierge Service' : '24/7 Гранд-Консьерж'}</h5>
                <p>${isEn ? 'Marble entrance lounge, private guest salon and parcel services.' : 'Мраморный парадный вестибюль, лаунж для встречи гостей и портье-сервис.'}</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-num">02</span>
              <div class="lz-info">
                <h5>${isEn ? 'Atrium & Winter Garden' : 'Атриум и Зимний сад'}</h5>
                <p>${isEn ? 'Botanical collection, gentle water features and quiet relaxation zones.' : 'Коллекция декоративных растений, интерьерные фонтаны и зона тишины.'}</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-num">03</span>
              <div class="lz-info">
                <h5>${isEn ? 'Resident Lounge & Private Library' : 'Лаунж-библиотека для резидентов'}</h5>
                <p>${isEn ? 'Co-working suites, private meeting rooms and specialty coffee bar.' : 'Камерные переговорные комнаты, кофе-пойнт и библиотека резидентов.'}</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-num">04</span>
              <div class="lz-info">
                <h5>${isEn ? 'Underground Garage Elevators' : 'Лифты в подземный паркинг'}</h5>
                <p>${isEn ? 'Direct high-speed elevator transfer to 2-level secure parking.' : 'Прямой доступ на 2 уровня охраняемого паркинга на скоростных лифтах Otis.'}</p>
              </div>
            </div>
          </div>
          <p class="lobby-note">${isEn ? '* Level 1 is exclusively reserved for resident amenities and concierge services. Private residences occupy levels 2 through 14.' : '* 1 этаж полностью отведен под инфраструктуру и консьерж-сервис. Резиденции расположены со 2 по 14 этаж.'}</p>
        </div>
      </div>
    `;
  }

  // Слушатели клика и ховера на SVG объектах
  attachSvgListeners() {
    const unitGroups = this.container.querySelectorAll('.fp-unit-group');
    unitGroups.forEach(group => {
      const unitId = group.getAttribute('data-unit-id');

      group.addEventListener('click', () => {
        this.selectedApartmentId = unitId;
        unitGroups.forEach(g => g.classList.remove('unit-selected'));
        group.classList.add('unit-selected');

        if (this.onApartmentSelect) {
          const apt = window.APARTMENTS_CATALOG.allApartments.find(a => a.number === unitId);
          if (apt) this.onApartmentSelect(apt);
        }
      });

      // Доступность с клавиатуры
      group.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          group.click();
        }
      });
    });
  }

  // Отрисовка детализированного 2D архитектурного чертежа отдельной квартиры (Blueprint)
  static renderApartmentBlueprint(apartment) {
    if (!apartment) return '';

    const lang = window.currentLanguage || 'ru';
    const isEn = lang === 'en';

    const b = apartment.roomsBreakdown || {
      living: 24,
      bedroom1: 18,
      kitchen: 14,
      bath: 6,
      corridor: 8
    };

    const labels = {
      tag: isEn ? '2D ARCHITECTURAL BLUEPRINT // SCALE 1:50' : '2D АРХИТЕКТУРНЫЙ ЧЕРТЕЖ // МАСШТАБ 1:50',
      living: isEn ? 'LIVING ROOM' : 'ГОСТИНАЯ',
      bedroom: isEn ? 'BEDROOM' : 'СПАЛЬНЯ',
      kitchen: isEn ? 'KITCHEN' : 'КУХНЯ',
      bath: isEn ? 'BATHROOM' : 'ВАННАЯ',
      corridor: isEn ? 'FOYER' : 'ХОЛЛ',
      entry: isEn ? 'ENTRY' : 'ВХОД',
      balcony: isEn ? 'BALCONY' : 'БАЛКОН'
    };

    return `
      <div class="blueprint-card">
        <div class="bp-header">
          <div class="bp-tagline">
            <span class="bp-dot"></span>
            <span>${labels.tag}</span>
          </div>
          <span class="bp-code">${apartment.number}</span>
        </div>

        <div class="bp-svg-wrap">
          <svg class="bp-vector" viewBox="0 0 540 360">
            <defs>
              <pattern id="bp-grid-sub" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-subtle, rgba(20,23,26,0.05))" stroke-width="0.8"/>
              </pattern>
            </defs>

            <!-- Сетка чертежа -->
            <rect width="100%" height="100%" fill="url(#bp-grid-sub)"/>

            <!-- Внешние несущие стены толщиной 8px -->
            <rect x="30" y="30" width="480" height="300" fill="var(--bg-surface, #FFFFFF)" stroke="var(--text-primary, #14171A)" stroke-width="3" rx="2"/>

            <!-- Внутренние перегородки (Комнаты) -->
            <!-- Гостиная -->
            <rect x="30" y="30" width="280" height="200" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>
            <text x="170" y="120" font-size="11" font-weight="600" fill="var(--text-primary, #14171A)" text-anchor="middle" font-family="'Inter', sans-serif" letter-spacing="1">${labels.living}</text>
            <text x="170" y="140" font-size="10" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif">${b.living} m²</text>

            <!-- Спальня 1 -->
            <rect x="310" y="30" width="200" height="170" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>
            <text x="410" y="105" font-size="11" font-weight="600" fill="var(--text-primary, #14171A)" text-anchor="middle" font-family="'Inter', sans-serif" letter-spacing="1">${labels.bedroom}</text>
            <text x="410" y="125" font-size="10" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif">${b.bedroom1} m²</text>

            <!-- Кухня -->
            <rect x="30" y="230" width="200" height="100" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>
            <text x="130" y="275" font-size="11" font-weight="600" fill="var(--text-primary, #14171A)" text-anchor="middle" font-family="'Inter', sans-serif" letter-spacing="1">${labels.kitchen}</text>
            <text x="130" y="295" font-size="10" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif">${b.kitchen} m²</text>

            <!-- Ванная / Санузел -->
            <rect x="230" y="230" width="130" height="100" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>
            <text x="295" y="275" font-size="10" font-weight="600" fill="var(--text-primary, #14171A)" text-anchor="middle" font-family="'Inter', sans-serif" letter-spacing="1">${labels.bath}</text>
            <text x="295" y="295" font-size="10" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif">${b.bath} m²</text>

            <!-- Прихожая / Холл -->
            <rect x="360" y="200" width="150" height="130" fill="none" stroke="var(--border-medium, #D8D5CD)" stroke-width="2"/>
            <text x="435" y="260" font-size="10" font-weight="600" fill="var(--text-primary, #14171A)" text-anchor="middle" font-family="'Inter', sans-serif" letter-spacing="1">${labels.corridor}</text>
            <text x="435" y="278" font-size="10" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif">${b.corridor} m²</text>

            <!-- Входная дверь с дугой открывания -->
            <path d="M 508 300 A 30 30 0 0 0 478 330" fill="none" stroke="var(--accent-bronze, #8C7355)" stroke-width="1.5" stroke-dasharray="3 2"/>
            <line x1="508" y1="300" x2="508" y2="330" stroke="var(--text-primary, #14171A)" stroke-width="3"/>
            <text x="475" y="325" font-size="8" fill="var(--text-secondary, #5A5D62)" font-family="'Inter', sans-serif">${labels.entry}</text>

            <!-- Балкон / Терраса -->
            <rect x="50" y="10" width="160" height="20" fill="var(--accent-bronze-soft, rgba(140,115,85,0.08))" stroke="var(--accent-bronze, #8C7355)" stroke-width="1.5" rx="2"/>
            <text x="130" y="24" font-size="9" fill="var(--accent-bronze, #8C7355)" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="600">${labels.balcony} // ${apartment.balconyArea} m²</text>

            <!-- Оконные проемы с двойными линиями остекления -->
            <line x1="70" y1="30" x2="190" y2="30" stroke="var(--accent-bronze, #8C7355)" stroke-width="3"/>
            <line x1="340" y1="30" x2="460" y2="30" stroke="var(--accent-bronze, #8C7355)" stroke-width="3"/>
            <line x1="30" y1="250" x2="30" y2="310" stroke="var(--accent-bronze, #8C7355)" stroke-width="3"/>

            <!-- Архитектурные размерные линии (Габариты) -->
            <line x1="20" y1="30" x2="20" y2="330" stroke="var(--border-medium, #D8D5CD)" stroke-width="1"/>
            <line x1="15" y1="30" x2="25" y2="30" stroke="var(--border-medium, #D8D5CD)" stroke-width="1"/>
            <line x1="15" y1="330" x2="25" y2="330" stroke="var(--border-medium, #D8D5CD)" stroke-width="1"/>
            <text x="14" y="185" font-size="9" fill="var(--text-muted, #94979E)" transform="rotate(-90 14,185)" text-anchor="middle" font-family="'Inter', monospace">L = 10.20 m</text>
          </svg>
        </div>

        <div class="bp-room-chips">
          <div class="bp-chip"><span class="chip-l">${labels.living}:</span> <span class="chip-v">${b.living} m²</span></div>
          <div class="bp-chip"><span class="chip-l">${labels.bedroom}:</span> <span class="chip-v">${b.bedroom1} m²</span></div>
          <div class="bp-chip"><span class="chip-l">${labels.kitchen}:</span> <span class="chip-v">${b.kitchen} m²</span></div>
          <div class="bp-chip"><span class="chip-l">${labels.bath}:</span> <span class="chip-v">${b.bath} m²</span></div>
          <div class="bp-chip"><span class="chip-l">${labels.balcony}:</span> <span class="chip-v">${apartment.balconyArea} m²</span></div>
        </div>
      </div>
    `;
  }
}

window.FloorPlanRenderer = FloorPlanRenderer;
