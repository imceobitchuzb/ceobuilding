/* ==========================================================================
   CEOBUILDING — INTERACTIVE ARCHITECTURAL FLOOR PLAN & BLUEPRINT RENDERER
   Renders vector SVG floor plates and individual apartment layout blueprints
   with interactive click/hover states, legend, and mobile responsiveness.
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

    if (floorNumber === 1) {
      // 1-й этаж: Лобби, Ресепшн, Велнес
      this.renderLobbyFloor();
      return;
    }

    const floorData = window.APARTMENTS_CATALOG.getFloorStats(floorNumber);
    const units = floorData.units;

    // Отрисовываем интерактивный SVG поэтажного плана
    // План имеет центральное ядро (лифты, лестницы, коридор) и квартиры по периметру
    const isPenthouseFloor = floorNumber === 14;

    const svgHtml = isPenthouseFloor 
      ? this.generatePenthouseFloorSvg(units)
      : this.generateTypicalFloorSvg(units);

    this.container.innerHTML = `
      <div class="floorplan-wrapper">
        <div class="floorplan-header-bar">
          <div class="fph-left">
            <span class="fph-badge">${isPenthouseFloor ? 'SKY PENTHOUSES' : 'RESIDENTIAL LEVEL'}</span>
            <h4 class="fph-title">${floorData.name[window.currentLanguage || 'uz']}</h4>
          </div>
          <div class="fph-legend">
            <span class="leg-item"><span class="leg-dot available"></span> <span data-i18n="status_available">Mavjud</span> (${floorData.available})</span>
            <span class="leg-item"><span class="leg-dot reserved"></span> <span data-i18n="status_reserved">Band</span> (${floorData.reserved})</span>
            <span class="leg-item"><span class="leg-dot sold"></span> <span data-i18n="status_sold">Sotilgan</span> (${floorData.sold})</span>
          </div>
        </div>

        <div class="floorplan-svg-viewport">
          ${svgHtml}
        </div>

        <div class="floorplan-compass">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <polygon points="20,6 24,19 16,19" fill="#C86A3D"/>
            <polygon points="20,34 24,21 16,21" fill="rgba(255,255,255,0.3)"/>
            <text x="20" y="5" font-size="7" fill="#C86A3D" text-anchor="middle" font-family="monospace">N</text>
          </svg>
          <span class="compass-label">SHIMOL</span>
        </div>
      </div>
    `;

    // Навешиваем слушатели клика на квартиры
    this.attachSvgListeners();
  }

  // Генерация типового этажа (2–13)
  generateTypicalFloorSvg(units) {
    // 7 квартир вокруг ядра
    // SVG viewBox 0 0 900 620
    const unitCoords = [
      // 01: верх-лево
      { idIdx: 0, x: 70, y: 60, w: 220, h: 200, labelX: 180, labelY: 160 },
      // 02: верх-центр
      { idIdx: 1, x: 310, y: 60, w: 280, h: 170, labelX: 450, labelY: 145 },
      // 03: верх-право
      { idIdx: 2, x: 610, y: 60, w: 220, h: 200, labelX: 720, labelY: 160 },
      // 04: право-низ
      { idIdx: 3, x: 610, y: 280, w: 220, h: 270, labelX: 720, labelY: 415 },
      // 05: центр-низ
      { idIdx: 4, x: 470, y: 350, w: 120, h: 200, labelX: 530, labelY: 450 },
      // 06: лево-низ центр
      { idIdx: 5, x: 310, y: 350, w: 140, h: 200, labelX: 380, labelY: 450 },
      // 07: низ-лево
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

      unitsSvg += `
        <g class="fp-unit-group ${statusClass} ${selectedClass}" data-unit-id="${unit.number}" tabindex="0" role="button">
          <!-- Контур квартиры -->
          <rect class="fp-unit-rect" x="${coord.x}" y="${coord.y}" width="${coord.w}" height="${coord.h}" rx="4" />
          
          <!-- Внутренние архитектурные линии комнат (легкая сетка) -->
          <line x1="${coord.x + 10}" y1="${coord.y + coord.h * 0.4}" x2="${coord.x + coord.w - 10}" y2="${coord.y + coord.h * 0.4}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3"/>
          <line x1="${coord.x + coord.w * 0.5}" y1="${coord.y + 10}" x2="${coord.x + coord.w * 0.5}" y2="${coord.y + coord.h - 10}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3"/>

          <!-- Маркер балкона -->
          <rect x="${coord.x + coord.w * 0.2}" y="${coord.y === 60 ? coord.y - 6 : coord.y + coord.h}" width="${coord.w * 0.6}" height="6" fill="#C86A3D" opacity="0.4" rx="2" />

          <!-- Текстовые метки -->
          <text class="fp-unit-num" x="${coord.labelX}" y="${coord.labelY - 18}" text-anchor="middle">${unit.number}</text>
          <text class="fp-unit-info" x="${coord.labelX}" y="${coord.labelY + 2}" text-anchor="middle">${unit.rooms} xonali • ${unit.area} m²</text>
          <text class="fp-unit-price" x="${coord.labelX}" y="${coord.labelY + 20}" text-anchor="middle">${(unit.totalPrice / 1000000).toFixed(0)} mln UZS</text>
          <text class="fp-unit-status" x="${coord.labelX}" y="${coord.labelY + 36}" text-anchor="middle">${unit.status.toUpperCase()}</text>
        </g>
      `;
    });

    return `
      <svg class="floorplan-svg" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="fp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Фон сетки -->
        <rect width="100%" height="100%" fill="url(#fp-grid)"/>

        <!-- Внешний контур этажа здания -->
        <rect x="50" y="40" width="800" height="530" rx="8" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

        <!-- Центральное лифтовое ядро и холл -->
        <g class="fp-core-group">
          <!-- Холл этажа -->
          <rect x="310" y="250" width="280" height="80" fill="rgba(20,24,32,0.95)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          <text x="450" y="295" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.4)" font-family="monospace">QAVAT XOLLI & KORIDOR</text>

          <!-- Шахты лифтов (2 скоростных лифта Otis) -->
          <rect x="370" y="260" width="34" height="28" fill="#12161E" stroke="#C86A3D" stroke-width="1"/>
          <line x1="370" y1="260" x2="404" y2="288" stroke="#C86A3D" stroke-width="0.8"/>
          <line x1="404" y1="260" x2="370" y2="288" stroke="#C86A3D" stroke-width="0.8"/>
          <text x="387" y="255" text-anchor="middle" font-size="8" fill="#C86A3D" font-family="monospace">LIFT 1</text>

          <rect x="415" y="260" width="34" height="28" fill="#12161E" stroke="#C86A3D" stroke-width="1"/>
          <line x1="415" y1="260" x2="449" y2="288" stroke="#C86A3D" stroke-width="0.8"/>
          <line x1="449" y1="260" x2="415" y2="288" stroke="#C86A3D" stroke-width="0.8"/>
          <text x="432" y="255" text-anchor="middle" font-size="8" fill="#C86A3D" font-family="monospace">LIFT 2</text>

          <!-- Эвакуационная лестничная клетка -->
          <rect x="495" y="260" width="60" height="28" fill="#12161E" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <line x1="505" y1="260" x2="505" y2="288" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="515" y1="260" x2="515" y2="288" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="525" y1="260" x2="525" y2="288" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="535" y1="260" x2="535" y2="288" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <line x1="545" y1="260" x2="545" y2="288" stroke="rgba(255,255,255,0.3)" stroke-width="0.8"/>
          <text x="525" y="255" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.5)" font-family="monospace">ZINA</text>
        </g>

        <!-- Отрисовка всех квартир этажа -->
        ${unitsSvg}
      </svg>
    `;
  }

  // Генерация 14-го этажа: Скай Пентхаусы (Sky Penthouses)
  generatePenthouseFloorSvg(units) {
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

      unitsSvg += `
        <g class="fp-unit-group penthouse-unit ${statusClass} ${selectedClass}" data-unit-id="${unit.number}" tabindex="0" role="button">
          <rect class="fp-unit-rect" x="${coord.x}" y="${coord.y}" width="${coord.w}" height="${coord.h}" rx="6" />
          
          <!-- Обозначение панорамной террасы на крыше -->
          <rect x="${coord.x + 15}" y="${coord.y + 15}" width="${coord.w - 30}" height="28" fill="rgba(200,106,61,0.15)" stroke="#C86A3D" stroke-width="1" stroke-dasharray="4 2" rx="4"/>
          <text x="${coord.x + coord.w / 2}" y="${coord.y + 33}" text-anchor="middle" font-size="9" fill="#C86A3D" font-family="monospace">PANORAMIK SKY-TERRASA</text>

          <text class="fp-unit-num" x="${coord.labelX}" y="${coord.labelY - 14}" text-anchor="middle">${unit.number}</text>
          <text class="fp-unit-info" x="${coord.labelX}" y="${coord.labelY + 6}" text-anchor="middle">${unit.rooms} xonali Sky Penthouse • ${unit.area} m²</text>
          <text class="fp-unit-price" x="${coord.labelX}" y="${coord.labelY + 26}" text-anchor="middle">${(unit.totalPrice / 1000000).toFixed(0)} mln UZS</text>
          <text class="fp-unit-status" x="${coord.labelX}" y="${coord.labelY + 44}" text-anchor="middle">${unit.status.toUpperCase()}</text>
        </g>
      `;
    });

    return `
      <svg class="floorplan-svg" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
        <rect width="100%" height="100%" fill="none"/>
        <rect x="50" y="40" width="800" height="520" rx="10" fill="none" stroke="rgba(200,106,61,0.4)" stroke-width="2"/>
        ${unitsSvg}
      </svg>
    `;
  }

  // 1-й этаж: Лобби и Велнес
  renderLobbyFloor() {
    this.container.innerHTML = `
      <div class="floorplan-wrapper lobby-wrapper">
        <div class="floorplan-header-bar">
          <div class="fph-left">
            <span class="fph-badge">GROUND FLOOR & LOBBY</span>
            <h4 class="fph-title">1-qavat: Grand Reception & Wellness Hub</h4>
          </div>
        </div>
        <div class="lobby-plan-card">
          <div class="lobby-zones-grid">
            <div class="lz-item">
              <span class="lz-icon">🛎️</span>
              <div class="lz-info">
                <h5>24/7 Concierge Service</h5>
                <p>Marmar qoplamali keng kutish zali va shaxsiy mehmonlar hududi</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-icon">🌿</span>
              <div class="lz-info">
                <h5>Atrium & Winter Garden</h5>
                <p>Tropik o'simliklar va yorug'lik bilan boyitilgan dam olish maskani</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-icon">☕</span>
              <div class="lz-info">
                <h5>Lobby Lounge & Cafe</h5>
                <p>Biznes uchrashuvlar va qahva uchun maxsus rezidentlar zonasi</p>
              </div>
            </div>
            <div class="lz-item">
              <span class="lz-icon">🚗</span>
              <div class="lz-info">
                <h5>Underground Parking Exit</h5>
                <p>2 qavatli yer osti avtoturargohiga to'g'ridan-to'g'ri tezyurar liftlar</p>
              </div>
            </div>
          </div>
          <p class="lobby-note">* 1-qavatda turar-joy kvartiralari joylashmagan. Kvartiralar 2-qavatdan 14-qavatgacha mavjud.</p>
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

    const b = apartment.roomsBreakdown || {
      living: 24,
      bedroom1: 18,
      kitchen: 14,
      bath: 6,
      corridor: 8
    };

    return `
      <div class="blueprint-card">
        <div class="bp-header">
          <div class="bp-tagline">
            <span class="bp-dot"></span>
            <span>2D ARXITEKTURA CHIZMASI // MASSHTAB 1:50</span>
          </div>
          <span class="bp-code">${apartment.number}</span>
        </div>

        <div class="bp-svg-wrap">
          <svg class="bp-vector" viewBox="0 0 540 360">
            <defs>
              <pattern id="bp-grid-sub" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(200,106,61,0.06)" stroke-width="0.8"/>
              </pattern>
            </defs>

            <!-- Сетка чертежа -->
            <rect width="100%" height="100%" fill="url(#bp-grid-sub)"/>

            <!-- Внешние несущие стены толщиной 8px -->
            <rect x="30" y="30" width="480" height="300" fill="rgba(18,22,30,0.8)" stroke="#E0E3EB" stroke-width="4" rx="4"/>

            <!-- Внутренние перегородки (Комнаты) -->
            <!-- Гостиная -->
            <rect x="30" y="30" width="280" height="200" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
            <text x="170" y="120" font-size="12" font-weight="700" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">MEHMONXONA</text>
            <text x="170" y="140" font-size="10" fill="#C86A3D" text-anchor="middle" font-family="monospace">${b.living} m²</text>

            <!-- Спальня 1 -->
            <rect x="310" y="30" width="200" height="170" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
            <text x="410" y="105" font-size="12" font-weight="700" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">YOTOQXONA</text>
            <text x="410" y="125" font-size="10" fill="#C86A3D" text-anchor="middle" font-family="monospace">${b.bedroom1} m²</text>

            <!-- Кухня -->
            <rect x="30" y="230" width="200" height="100" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
            <text x="130" y="275" font-size="11" font-weight="700" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">OSHXONA</text>
            <text x="130" y="295" font-size="10" fill="#C86A3D" text-anchor="middle" font-family="monospace">${b.kitchen} m²</text>

            <!-- Ванная / Санузел -->
            <rect x="230" y="230" width="130" height="100" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
            <text x="295" y="275" font-size="10" font-weight="700" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">HAMMOM & SANUZEL</text>
            <text x="295" y="295" font-size="10" fill="#C86A3D" text-anchor="middle" font-family="monospace">${b.bath} m²</text>

            <!-- Прихожая / Холл -->
            <rect x="360" y="200" width="150" height="130" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
            <text x="435" y="260" font-size="10" font-weight="700" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">DAHLIZ</text>
            <text x="435" y="278" font-size="10" fill="#C86A3D" text-anchor="middle" font-family="monospace">${b.corridor} m²</text>

            <!-- Входная дверь с дугой открывания -->
            <path d="M 508 300 A 30 30 0 0 0 478 330" fill="none" stroke="#C86A3D" stroke-width="1.5" stroke-dasharray="3 2"/>
            <line x1="508" y1="300" x2="508" y2="330" stroke="#FFF" stroke-width="3"/>
            <text x="475" y="325" font-size="8" fill="#FFF" font-family="monospace">KIRISH</text>

            <!-- Балкон / Терраса -->
            <rect x="50" y="10" width="160" height="20" fill="rgba(200,106,61,0.2)" stroke="#C86A3D" stroke-width="1.5" rx="2"/>
            <text x="130" y="24" font-size="9" fill="#FFF" text-anchor="middle" font-family="'Space Grotesk', sans-serif">BALKON // ${apartment.balconyArea} m²</text>

            <!-- Оконные проемы с двойными линиями остекления -->
            <line x1="70" y1="30" x2="190" y2="30" stroke="#00E5FF" stroke-width="3"/>
            <line x1="340" y1="30" x2="460" y2="30" stroke="#00E5FF" stroke-width="3"/>
            <line x1="30" y1="250" x2="30" y2="310" stroke="#00E5FF" stroke-width="3"/>

            <!-- Архитектурные размерные линии (Габариты) -->
            <line x1="20" y1="30" x2="20" y2="330" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <line x1="15" y1="30" x2="25" y2="30" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <line x1="15" y1="330" x2="25" y2="330" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <text x="14" y="185" font-size="9" fill="rgba(255,255,255,0.5)" transform="rotate(-90 14,185)" text-anchor="middle" font-family="monospace">L = 10.20 m</text>
          </svg>
        </div>

        <div class="bp-room-chips">
          <div class="bp-chip"><span class="chip-l">Mehmonxona:</span> <span class="chip-v">${b.living} m²</span></div>
          <div class="bp-chip"><span class="chip-l">Yotoqxona:</span> <span class="chip-v">${b.bedroom1} m²</span></div>
          <div class="bp-chip"><span class="chip-l">Oshxona:</span> <span class="chip-v">${b.kitchen} m²</span></div>
          <div class="bp-chip"><span class="chip-l">Hammom:</span> <span class="chip-v">${b.bath} m²</span></div>
          <div class="bp-chip"><span class="chip-l">Balkon:</span> <span class="chip-v">${apartment.balconyArea} m²</span></div>
        </div>
      </div>
    `;
  }
}

window.FloorPlanRenderer = FloorPlanRenderer;
