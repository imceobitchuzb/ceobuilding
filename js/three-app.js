/* ==========================================================================
   CEOBUILDING — INTERACTIVE 3D RESIDENTIAL SKYSCRAPER (THREE.JS)
   Architectural visualization with 14 selectable floors, raycasting,
   realistic materials (concrete, glass, metal), landscaping & camera modes.
   ========================================================================== */

class Residential3DBuilding {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.onFloorClick = options.onFloorClick || null;
    this.onFloorHover = options.onFloorHover || null;

    // Параметры здания
    this.totalFloors = 14;
    this.floorHeight = 2.4;
    this.buildingWidth = 16;
    this.buildingDepth = 13;
    this.selectedFloor = 12;
    this.hoveredFloor = null;

    // Режимы
    this.cameraMode = 'exterior'; // 'exterior' | 'top' | 'orbit' | 'cutaway'
    this.isRotating = true;
    this.rotationSpeed = 0.0015;

    // Коллекции
    this.floorMeshes = [];      // Меши этажей для Raycasting
    this.floorGroups = [];      // Группы каждого этажа
    this.interactiveObjects = []; // Интерактивные коллайдеры этажей

    // Raycaster для кликов и ховеров по этажам
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    this.init();
  }

  init() {
    // 1. Сцена и туман
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0f14);
    this.scene.fog = new THREE.FogExp2(0x0c0f14, 0.012);

    // 2. Камера
    this.camera = new THREE.PerspectiveCamera(
      42,
      this.container.clientWidth / this.container.clientHeight,
      0.5,
      600
    );
    this.camera.position.set(38, 28, 44);

    // 3. Рендерер с ACES Filmic Tone Mapping и оптимизацией производительности
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // Ограничение DPR до 1.5 для плавной работы на ноутбуках
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.container.appendChild(this.renderer.domElement);

    // Флаг видимости для остановки цикла рендера вне экрана
    this.isVisible = true;
    this.hoverPending = false;
    this.setupVisibilityObserver();

    // 4. OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.minDistance = 18;
    this.controls.maxDistance = 120;
    this.controls.target.set(0, 16, 0);

    // 5. Инициализация материалов, освещения и геометрии
    this.initMaterials();
    this.setupLighting();
    this.createSiteAndLandscape();
    this.createResidentialSkyscraper();

    // 6. События мыши для выбора этажей
    this.setupInteractions();

    // 7. Ресайз
    window.addEventListener('resize', () => this.onWindowResize());

    // 8. Цикл рендера
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  /* --------------------------------------------------------------------------
     МАТЕРИАЛЫ
     -------------------------------------------------------------------------- */
  initMaterials() {
    this.materials = {
      // Архитектурный темный графитовый бетон фасада
      darkConcrete: new THREE.MeshStandardMaterial({
        color: 0x1a1e26,
        roughness: 0.8,
        metalness: 0.2
      }),
      // Светлый теплый архитектурный камень (пилястры)
      lightStone: new THREE.MeshStandardMaterial({
        color: 0x8a929e,
        roughness: 0.7,
        metalness: 0.1
      }),
      // Премиальное архитектурное тонированное остекление
      facadeGlass: new THREE.MeshPhysicalMaterial({
        color: 0x1b2838,
        metalness: 0.25,
        roughness: 0.1,
        transmission: 0.65,
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
      }),
      // Теплый свет в окнах квартир (вечерний уют)
      interiorGlow: new THREE.MeshBasicMaterial({
        color: 0xffdfaa,
        transparent: true,
        opacity: 0.35
      }),
      // Анодированный алюминий и карнизы (терракотово-бронзовый акцент)
      bronzeMetal: new THREE.MeshStandardMaterial({
        color: 0xc86a3d,
        roughness: 0.35,
        metalness: 0.8
      }),
      // Подсветка активного выбранного этажа
      selectedFloorGlow: new THREE.MeshBasicMaterial({
        color: 0xc86a3d,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      }),
      // Ховер этажа
      hoverFloorGlow: new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.25
      }),
      // Земля и благоустройство
      plazaGround: new THREE.MeshStandardMaterial({
        color: 0x11141a,
        roughness: 0.9
      }),
      parkGreen: new THREE.MeshStandardMaterial({
        color: 0x1e2d24,
        roughness: 0.85
      }),
      waterFeature: new THREE.MeshStandardMaterial({
        color: 0x0d1f2d,
        roughness: 0.1,
        metalness: 0.9
      })
    };
  }

  /* --------------------------------------------------------------------------
     ОСВЕЩЕНИЕ
     -------------------------------------------------------------------------- */
  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0x2a3342, 1.4);
    this.scene.add(this.ambientLight);

    // Главный свет солнца / луны (оптимизированный shadowMap)
    this.sunLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    this.sunLight.position.set(45, 65, 40);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 180;
    this.sunLight.shadow.camera.left = -45;
    this.sunLight.shadow.camera.right = 45;
    this.sunLight.shadow.camera.top = 45;
    this.sunLight.shadow.camera.bottom = -45;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    // Архитектурный контрастный контурный свет (Rim Light)
    this.rimLight = new THREE.DirectionalLight(0xc86a3d, 1.1);
    this.rimLight.position.set(-45, 30, -35);
    this.scene.add(this.rimLight);

    // Освещение гранд-лобби у входа
    const lobbyLight = new THREE.PointLight(0xffaa55, 3.0, 20);
    lobbyLight.position.set(0, 3, 10);
    this.scene.add(lobbyLight);
  }

  /* --------------------------------------------------------------------------
     БЛАГОУСТРОЙСТВО И ТЕРРИТОРИЯ (LANDSCAPING)
     -------------------------------------------------------------------------- */
  createSiteAndLandscape() {
    this.siteGroup = new THREE.Group();
    this.scene.add(this.siteGroup);

    // Главная площадь и тротуары вокруг небоскреба
    const plazaGeo = new THREE.PlaneGeometry(140, 140);
    const plaza = new THREE.Mesh(plazaGeo, this.materials.plazaGround);
    plaza.rotation.x = -Math.PI / 2;
    plaza.receiveShadow = true;
    this.siteGroup.add(plaza);

    // Архитектурная координатная разметка
    const grid = new THREE.GridHelper(100, 50, 0xc86a3d, 0x1e2633);
    grid.position.y = 0.02;
    this.siteGroup.add(grid);

    // Газоны и парковые островки
    const parkCoords = [
      { x: -22, z: 18, w: 18, d: 14 },
      { x: 22, z: 18, w: 18, d: 14 },
      { x: -22, z: -18, w: 18, d: 14 },
      { x: 22, z: -18, w: 18, d: 14 }
    ];

    parkCoords.forEach(c => {
      const lawnGeo = new THREE.BoxGeometry(c.w, 0.2, c.d);
      const lawn = new THREE.Mesh(lawnGeo, this.materials.parkGreen);
      lawn.position.set(c.x, 0.1, c.z);
      lawn.receiveShadow = true;
      this.siteGroup.add(lawn);

      // Стилизованные архитектурные деревья (конусы и цилиндры)
      for (let i = 0; i < 3; i++) {
        const treeGroup = new THREE.Group();
        const tx = c.x + (Math.random() - 0.5) * (c.w - 4);
        const tz = c.z + (Math.random() - 0.5) * (c.d - 4);

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.8, 6), this.materials.darkConcrete);
        trunk.position.y = 0.9;
        const foliage = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.2, 7), this.materials.parkGreen);
        foliage.position.y = 2.6;

        treeGroup.add(trunk, foliage);
        treeGroup.position.set(tx, 0.2, tz);
        this.siteGroup.add(treeGroup);
      }
    });

    // Декоративный водоем / фонтан перед центральным входом
    const pondGeo = new THREE.BoxGeometry(14, 0.25, 4);
    const pond = new THREE.Mesh(pondGeo, this.materials.waterFeature);
    pond.position.set(0, 0.12, 14);
    this.siteGroup.add(pond);
  }

  /* --------------------------------------------------------------------------
     АРХИТЕКТУРНЫЙ НЕБОСКРЕБ: 14 ЭТАЖЕЙ С КЛИКАБЕЛЬНЫМИ СЛОЯМИ
     -------------------------------------------------------------------------- */
  createResidentialSkyscraper() {
    this.buildingGroup = new THREE.Group();
    this.scene.add(this.buildingGroup);

    // 1-й ЭТАЖ: Гранд Лобби с двойным светом, мрамором и высокими стеклянными витринами
    this.createGrandLobby();

    // 2–13 ЭТАЖИ: Жилые этажи с балконами, панорамными окнами и пилястрами
    for (let floor = 2; floor <= 13; floor++) {
      this.createResidentialFloor(floor);
    }

    // 14-й ЭТАЖ: Sky Penthouses с открытыми панорамными террасами и шпилем
    this.createSkyPenthouseFloor();

    // Первоначальное выделение этажа
    this.highlightFloor(this.selectedFloor);
  }

  // 1-й этаж (Lobby)
  createGrandLobby() {
    const floorGroup = new THREE.Group();
    const elevation = 1.6;
    floorGroup.position.set(0, elevation, 0);

    // Высокий монолитный стилобат
    const podiumGeo = new THREE.BoxGeometry(this.buildingWidth + 2, 3.2, this.buildingDepth + 2);
    const podium = new THREE.Mesh(podiumGeo, this.materials.darkConcrete);
    podium.castShadow = true;
    podium.receiveShadow = true;
    floorGroup.add(podium);

    // Фасадные панорамные витрины лобби
    const lobbyGlassGeo = new THREE.BoxGeometry(this.buildingWidth + 1.6, 2.6, this.buildingDepth + 1.6);
    const lobbyGlass = new THREE.Mesh(lobbyGlassGeo, this.materials.facadeGlass);
    floorGroup.add(lobbyGlass);

    // Козырек центрального входа (Canopy)
    const canopyGeo = new THREE.BoxGeometry(8, 0.3, 4.5);
    const canopy = new THREE.Mesh(canopyGeo, this.materials.bronzeMetal);
    canopy.position.set(0, 0.4, (this.buildingDepth + 2) / 2 + 1.8);
    floorGroup.add(canopy);

    // Невидимый коллайдер для клика по 1 этажу
    const colliderGeo = new THREE.BoxGeometry(this.buildingWidth + 4, 3.2, this.buildingDepth + 4);
    const colliderMat = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeo, colliderMat);
    collider.userData = { floorNumber: 1 };
    floorGroup.add(collider);
    this.interactiveObjects.push(collider);

    this.floorGroups[1] = floorGroup;
    this.buildingGroup.add(floorGroup);
  }

  // Создание отдельного жилого этажа (2–13)
  createResidentialFloor(floorNumber) {
    const floorGroup = new THREE.Group();
    // Высота центра этажа
    const elevation = 3.2 + (floorNumber - 1) * this.floorHeight;
    floorGroup.position.set(0, elevation, 0);

    // Плита межэтажного перекрытия
    const slabGeo = new THREE.BoxGeometry(this.buildingWidth, 0.35, this.buildingDepth);
    const slab = new THREE.Mesh(slabGeo, this.materials.darkConcrete);
    slab.castShadow = true;
    slab.receiveShadow = true;
    floorGroup.add(slab);

    // Остекление этажа и внутреннее теплое свечение
    const glassGeo = new THREE.BoxGeometry(this.buildingWidth - 0.4, this.floorHeight - 0.35, this.buildingDepth - 0.4);
    const glass = new THREE.Mesh(glassGeo, this.materials.facadeGlass);
    floorGroup.add(glass);

    const glowGeo = new THREE.BoxGeometry(this.buildingWidth - 2.0, this.floorHeight - 0.6, this.buildingDepth - 2.0);
    const glow = new THREE.Mesh(glowGeo, this.materials.interiorGlow);
    floorGroup.add(glow);

    // Балконы с металлическими ограждениями (архитектурные выступы)
    const balconyGeo = new THREE.BoxGeometry(4.2, 0.9, 1.2);
    // Балкон спереди слева
    const b1 = new THREE.Mesh(balconyGeo, this.materials.bronzeMetal);
    b1.position.set(-4.5, -0.4, this.buildingDepth / 2 + 0.5);
    // Балкон спереди справа
    const b2 = new THREE.Mesh(balconyGeo, this.materials.bronzeMetal);
    b2.position.set(4.5, -0.4, this.buildingDepth / 2 + 0.5);
    // Балкон сзади
    const b3 = new THREE.Mesh(balconyGeo, this.materials.bronzeMetal);
    b3.position.set(0, -0.4, -(this.buildingDepth / 2 + 0.5));

    floorGroup.add(b1, b2, b3);

    // Архитектурные вертикальные ребра и пилястры (Pillars)
    const pillarGeo = new THREE.BoxGeometry(0.4, this.floorHeight, 0.6);
    const pCoords = [-7.8, -3.8, 0, 3.8, 7.8];
    pCoords.forEach(x => {
      const pFront = new THREE.Mesh(pillarGeo, this.materials.lightStone);
      pFront.position.set(x, 0, this.buildingDepth / 2 + 0.1);
      const pBack = new THREE.Mesh(pillarGeo, this.materials.lightStone);
      pBack.position.set(x, 0, -(this.buildingDepth / 2 + 0.1));
      floorGroup.add(pFront, pBack);
    });

    // Меш подсветки выбранного этажа (рамка)
    const highlightGeo = new THREE.BoxGeometry(this.buildingWidth + 0.8, this.floorHeight, this.buildingDepth + 0.8);
    const highlightMesh = new THREE.Mesh(highlightGeo, this.materials.selectedFloorGlow.clone());
    highlightMesh.visible = false;
    floorGroup.add(highlightMesh);

    // Коллайдер для Raycasting (чуть больше этажа для удобного клика мышью)
    const colliderGeo = new THREE.BoxGeometry(this.buildingWidth + 2.5, this.floorHeight, this.buildingDepth + 2.5);
    const colliderMat = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeo, colliderMat);
    collider.userData = { floorNumber: floorNumber };
    floorGroup.add(collider);
    this.interactiveObjects.push(collider);

    floorGroup.userData = {
      floorNumber: floorNumber,
      highlightMesh: highlightMesh,
      elevation: elevation
    };

    this.floorGroups[floorNumber] = floorGroup;
    this.buildingGroup.add(floorGroup);
  }

  // 14-й этаж: Sky Penthouses
  createSkyPenthouseFloor() {
    const floorNumber = 14;
    const floorGroup = new THREE.Group();
    const elevation = 3.2 + (floorNumber - 1) * this.floorHeight;
    floorGroup.position.set(0, elevation, 0);

    // Пентхаус имеет чуть меньший объем и открытые террасы по периметру
    const penthouseWidth = this.buildingWidth - 2.5;
    const penthouseDepth = this.buildingDepth - 2.5;

    // Плита основания
    const slabGeo = new THREE.BoxGeometry(this.buildingWidth, 0.4, this.buildingDepth);
    const slab = new THREE.Mesh(slabGeo, this.materials.darkConcrete);
    floorGroup.add(slab);

    // Остекление пентхауса
    const glassGeo = new THREE.BoxGeometry(penthouseWidth, 3.0, penthouseDepth);
    const glass = new THREE.Mesh(glassGeo, this.materials.facadeGlass);
    glass.position.y = 0.5;
    floorGroup.add(glass);

    // Бронзовый парапет террасы пентхауса
    const railingGeo = new THREE.BoxGeometry(this.buildingWidth - 0.2, 1.0, this.buildingDepth - 0.2);
    const railing = new THREE.Mesh(railingGeo, this.materials.bronzeMetal);
    railing.position.y = 0.5;
    floorGroup.add(railing);

    // Архитектурная крыша с карнизом
    const roofGeo = new THREE.BoxGeometry(penthouseWidth + 1.2, 0.5, penthouseDepth + 1.2);
    const roof = new THREE.Mesh(roofGeo, this.materials.darkConcrete);
    roof.position.y = 2.1;
    floorGroup.add(roof);

    // Шпиль небоскреба
    const spireGeo = new THREE.ConeGeometry(0.3, 6.0, 6);
    const spire = new THREE.Mesh(spireGeo, this.materials.bronzeMetal);
    spire.position.y = 5.2;
    floorGroup.add(spire);

    // Подсветка шпиля
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0xc86a3d }));
    beacon.position.y = 8.2;
    floorGroup.add(beacon);

    // Рамка подсветки
    const highlightGeo = new THREE.BoxGeometry(this.buildingWidth + 1.0, 3.2, this.buildingDepth + 1.0);
    const highlightMesh = new THREE.Mesh(highlightGeo, this.materials.selectedFloorGlow.clone());
    highlightMesh.visible = false;
    floorGroup.add(highlightMesh);

    // Коллайдер
    const colliderGeo = new THREE.BoxGeometry(this.buildingWidth + 3.0, 3.5, this.buildingDepth + 3.0);
    const collider = new THREE.Mesh(colliderGeo, new THREE.MeshBasicMaterial({ visible: false }));
    collider.userData = { floorNumber: floorNumber };
    floorGroup.add(collider);
    this.interactiveObjects.push(collider);

    floorGroup.userData = {
      floorNumber: floorNumber,
      highlightMesh: highlightMesh,
      elevation: elevation
    };

    this.floorGroups[floorNumber] = floorGroup;
    this.buildingGroup.add(floorGroup);
  }

  setupVisibilityObserver() {
    if ('IntersectionObserver' in window && this.container) {
      this.visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            requestAnimationFrame(this.animate);
          }
        });
      }, { threshold: 0.05 });
      this.visibilityObserver.observe(this.container);
    }
  }

  /* --------------------------------------------------------------------------
     ВЗАИМОДЕЙСТВИЕ: RAYCASTING (КЛИК И ХОВЕР ПО ЭТАЖАМ)
     -------------------------------------------------------------------------- */
  setupInteractions() {
    const canvas = this.renderer.domElement;

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return { x, y };
    };

    canvas.addEventListener('mousemove', (e) => {
      const pos = getMousePos(e);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
      this.hoverPending = true; // Троттлинг: проверяем только в следующем кадре
    }, { passive: true });

    canvas.addEventListener('click', (e) => {
      const pos = getMousePos(e);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

      if (intersects.length > 0) {
        const floorNum = intersects[0].object.userData.floorNumber;
        if (floorNum) {
          this.selectFloor(floorNum, true);
        }
      }
    });
  }

  checkHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      const floorNum = intersects[0].object.userData.floorNumber;
      if (this.hoveredFloor !== floorNum) {
        this.hoveredFloor = floorNum;
        this.renderer.domElement.style.cursor = 'pointer';
        if (this.onFloorHover) this.onFloorHover(floorNum);
      }
    } else {
      if (this.hoveredFloor !== null) {
        this.hoveredFloor = null;
        this.renderer.domElement.style.cursor = 'default';
        if (this.onFloorHover) this.onFloorHover(null);
      }
    }
  }

  // Выбор этажа
  selectFloor(floorNumber, triggerCallback = false) {
    this.selectedFloor = floorNumber;
    this.highlightFloor(floorNumber);

    // Плавная фокусировка камеры на этаже при клике
    const floorGroup = this.floorGroups[floorNumber];
    if (floorGroup && this.cameraMode === 'exterior') {
      const targetY = floorGroup.userData.elevation || 16;
      gsap.to(this.controls.target, {
        y: targetY,
        duration: 1.0,
        ease: 'power2.out'
      });
    }

    if (triggerCallback && this.onFloorClick) {
      this.onFloorClick(floorNumber);
    }
  }

  // Визуальное выделение этажа светящейся архитектурной рамкой
  highlightFloor(floorNumber) {
    for (let f = 1; f <= this.totalFloors; f++) {
      const group = this.floorGroups[f];
      if (group && group.userData && group.userData.highlightMesh) {
        group.userData.highlightMesh.visible = (f === floorNumber);
      }
    }
  }

  /* --------------------------------------------------------------------------
     РЕЖИМЫ КАМЕРЫ (EXTERIOR, TOP, ORBIT, CUTAWAY)
     -------------------------------------------------------------------------- */
  setCameraMode(mode) {
    this.cameraMode = mode;

    if (mode === 'exterior') {
      this.isRotating = true;
      gsap.to(this.camera.position, {
        x: 36,
        y: 26,
        z: 42,
        duration: 1.4,
        ease: 'power2.out'
      });
      gsap.to(this.controls.target, {
        x: 0,
        y: 16,
        z: 0,
        duration: 1.4,
        ease: 'power2.out'
      });
      this.setCutaway(false);
    } else if (mode === 'top') {
      this.isRotating = false;
      gsap.to(this.camera.position, {
        x: 0.1,
        y: 65,
        z: 0.1,
        duration: 1.5,
        ease: 'power2.out'
      });
      gsap.to(this.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
      this.setCutaway(false);
    } else if (mode === 'orbit') {
      this.isRotating = !this.isRotating;
    } else if (mode === 'cutaway') {
      this.setCutaway(true);
    }
  }

  // Режим полупрозрачного разреза здания (Cutaway / X-Ray)
  setCutaway(enabled) {
    if (enabled) {
      this.materials.facadeGlass.opacity = 0.2;
      this.materials.darkConcrete.opacity = 0.45;
      this.materials.darkConcrete.transparent = true;
    } else {
      this.materials.facadeGlass.opacity = 0.8;
      this.materials.darkConcrete.opacity = 1.0;
      this.materials.darkConcrete.transparent = false;
    }
  }

  /* --------------------------------------------------------------------------
     РЕНДЕР-ЦИКЛ (С ПАУЗОЙ ПРИ СКРОЛЛЕ И ТРОТТЛИНГОМ ХОВЕРА)
     -------------------------------------------------------------------------- */
  animate() {
    if (!this.isVisible) return; // Пауза, когда 3D холст не виден на экране
    requestAnimationFrame(this.animate);

    // Троттлинг ховера: выполняется максимум 1 раз за кадр
    if (this.hoverPending) {
      this.checkHover();
      this.hoverPending = false;
    }

    // Плавное медленное вращение модели вокруг своей оси
    if (this.isRotating && this.cameraMode === 'exterior') {
      this.buildingGroup.rotation.y += this.rotationSpeed;
      if (this.siteGroup) this.siteGroup.rotation.y += this.rotationSpeed;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (!this.container) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  // Очистка памяти при переходе/размонтировании
  destroy() {
    window.removeEventListener('resize', this.onWindowResize);
    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}

window.Residential3DBuilding = Residential3DBuilding;
