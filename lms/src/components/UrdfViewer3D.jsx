import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  RotateCcw,
  Sliders,
  Compass
} from 'lucide-react';

// ==============================================================================
// ROBOT URDF GEOMETRIC & KINEMATIC SPECIFICATIONS (Nexus AMR)
// Matches exact physical parameters in nexus_amr.urdf.xacro
// ==============================================================================
const ROBOT_LINKS_DATA = {
  base_footprint: {
    name: 'base_footprint',
    parentJoint: 'None (Root Datum)',
    jointType: 'root',
    rosPos: [0.0, 0.0, 0.0],
    rosRpy: [0.0, 0.0, 0.0],
    mass: '0.0 kg (Virtual)',
    inertia: 'Ixx=0, Iyy=0, Izz=0',
    description: 'Ground contact reference projection on floor (Z=0.0m). Used by Nav2 costmaps and footprint inflation.',
    color: '#06b6d4',
    category: 'Kinematic Datum'
  },
  base_link: {
    name: 'base_link',
    parentJoint: 'base_footprint_joint (fixed)',
    jointType: 'fixed',
    rosPos: [0.0, 0.0, 0.06],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: '0.40m (L) x 0.30m (W) x 0.14m (H)',
    mass: '8.0 kg',
    inertia: 'Ixx=0.073, Iyy=0.120, Izz=0.167',
    description: 'Main structural chassis body. Origin is at the drive axle center line, elevated 0.06m above ground.',
    color: '#00c0e6',
    category: 'Chassis'
  },
  left_wheel_link: {
    name: 'left_wheel_link',
    parentJoint: 'left_wheel_joint (continuous)',
    jointType: 'continuous',
    axis: 'Y-Axis [0 1 0]',
    rosPos: [0.0, +0.16, 0.06],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Radius=0.06m, Width=0.035m',
    mass: '0.8 kg',
    inertia: 'Ixx=0.0008, Iyy=0.0008, Izz=0.0014',
    description: 'Port-side actuated differential drive wheel. Continuous 360° rotation driven by motor velocity commands.',
    color: '#10b981',
    category: 'Actuation'
  },
  right_wheel_link: {
    name: 'right_wheel_link',
    parentJoint: 'right_wheel_joint (continuous)',
    jointType: 'continuous',
    axis: 'Y-Axis [0 1 0]',
    rosPos: [0.0, -0.16, 0.06],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Radius=0.06m, Width=0.035m',
    mass: '0.8 kg',
    inertia: 'Ixx=0.0008, Iyy=0.0008, Izz=0.0014',
    description: 'Starboard-side actuated differential drive wheel. Powered independently to provide differential steering.',
    color: '#10b981',
    category: 'Actuation'
  },
  front_caster_link: {
    name: 'front_caster_link',
    parentJoint: 'front_caster_joint (fixed)',
    jointType: 'fixed',
    rosPos: [+0.14, 0.0, 0.03],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Sphere Radius=0.03m',
    mass: '0.3 kg',
    inertia: 'Ixx=Iyy=Izz=0.0001',
    description: 'Passive low-friction front support caster ball (mu1=0.001) preventing pitching while allowing multi-axis slip.',
    color: '#94a3b8',
    category: 'Support'
  },
  rear_caster_link: {
    name: 'rear_caster_link',
    parentJoint: 'rear_caster_joint (fixed)',
    jointType: 'fixed',
    rosPos: [-0.14, 0.0, 0.03],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Sphere Radius=0.03m',
    mass: '0.3 kg',
    inertia: 'Ixx=Iyy=Izz=0.0001',
    description: 'Passive low-friction rear support caster ball maintaining 3-point static equilibrium on flat facility floors.',
    color: '#94a3b8',
    category: 'Support'
  },
  laser_frame: {
    name: 'laser_frame',
    parentJoint: 'laser_joint (fixed)',
    jointType: 'fixed',
    rosPos: [+0.08, 0.0, 0.22],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Cylinder Radius=0.04m, Height=0.04m',
    mass: '0.15 kg',
    inertia: 'Ixx=Iyy=0.00008, Izz=0.00012',
    description: '2D Planar LiDAR sensor scanning 360° at 10Hz. Publishes sensor_msgs/LaserScan on topic /scan for SLAM & Nav2.',
    color: '#f59e0b',
    category: 'Perception'
  },
  camera_link: {
    name: 'camera_link',
    parentJoint: 'camera_joint (fixed)',
    jointType: 'fixed',
    rosPos: [+0.20, 0.0, 0.08],
    rosRpy: [0.0, 0.0, 0.0],
    dimensions: 'Box 0.025m x 0.09m x 0.025m',
    mass: '0.08 kg',
    inertia: 'Ixx=0.00005, Iyy=0.00001, Izz=0.00005',
    description: 'Student Challenge Asset: Modular RGB camera sensor macro (camera.xacro). Mounted on front chassis bumper to stream image frames and depth perception.',
    color: '#8b5cf6',
    category: 'Student Challenge Asset'
  }
};

export default function UrdfViewer3D() {
  const mountRef = useRef(null);

  // User Interactive State
  const [selectedLink, setSelectedLink] = useState('base_link');
  const [showSolidBodies, setShowSolidBodies] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      if (search.includes('solids=false') || hash.includes('solids=false')) return false;
    }
    return true;
  });
  const [showTfAxes, setShowTfAxes] = useState(true);
  const [showTfLabels, setShowTfLabels] = useState(true);
  const [showTreeLines, setShowTreeLines] = useState(true);
  const [manualWheelAngle, setManualWheelAngle] = useState(0); // manual slider angle

  // 2D Label Overlay Positions (screen coordinates for TF labels)
  const [labelCoords, setLabelCoords] = useState({});

  // Three.js References
  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    animFrameId: null,
    tfGroups: {},
    visualMeshes: [],
    leftWheelGroup: null,
    rightWheelGroup: null,
    lidarPuckGroup: null,
    treeLineMesh: null,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2()
  });

  // Convert ROS coordinates (X=Fwd, Y=Left, Z=Up) to Three.js coordinates (X=Left, Y=Up, Z=Back)
  const rosToThree = (x, y, z) => new THREE.Vector3(-y, z, -x);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 520;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    // 2. Camera Setup (Isometric Perspective)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.05, 50);
    camera.position.set(1.1, 0.9, 1.2);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0.12, 0);
    controls.minDistance = 0.4;
    controls.maxDistance = 4.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't flip below floor

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(2, 4, 2);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.6); // Cyan rim light
    dirLight2.position.set(-3, 2, -3);
    scene.add(dirLight2);

    const groundLight = new THREE.DirectionalLight(0x1e293b, 0.4);
    groundLight.position.set(0, -2, 0);
    scene.add(groundLight);

    // 6. RViz2 Ground Grid Plane
    const grid = new THREE.GridHelper(4.0, 16, 0x06b6d4, 0x1e293b);
    grid.position.y = 0.0;
    scene.add(grid);

    // Subtle dark circular drop shadow under the AMR chassis
    const shadowGeo = new THREE.PlaneGeometry(0.55, 0.45);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, 0.001, 0);
    scene.add(shadowMesh);

    // --------------------------------------------------------------------------
    // 7. BUILD 3D ROBOT MESHES & KINEMATIC TF HIERARCHY
    // --------------------------------------------------------------------------
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    const visualMeshes = [];
    const tfGroups = {};

    // Helper: Create REP 103 Trihedron (Red=+X Forward, Green=+Y Left, Blue=+Z Up)
    const createTfTrihedron = (scale = 0.1) => {
      const group = new THREE.Group();

      const axisLen = scale;
      const headLen = scale * 0.28;
      const shaftLen = axisLen - headLen;
      const shaftRadius = scale * 0.035;
      const headRadius = scale * 0.08;

      const makeArrow = (dirVector, hexColor) => {
        const arrow = new THREE.Group();

        const shaftGeo = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLen, 12);
        const mat = new THREE.MeshBasicMaterial({ color: hexColor });
        const shaftMesh = new THREE.Mesh(shaftGeo, mat);
        shaftMesh.position.y = shaftLen / 2;
        arrow.add(shaftMesh);

        const headGeo = new THREE.ConeGeometry(headRadius, headLen, 16);
        const headMesh = new THREE.Mesh(headGeo, mat);
        headMesh.position.y = shaftLen + headLen / 2;
        arrow.add(headMesh);

        const defaultUp = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(defaultUp, dirVector.clone().normalize());
        arrow.quaternion.copy(quat);

        return arrow;
      };

      // In Three.js coordinates matching ROS REP 103:
      // +X (Forward) is (0, 0, -1)
      const xAxis = makeArrow(new THREE.Vector3(0, 0, -1), 0xef4444); // RED
      // +Y (Left) is (-1, 0, 0)
      const yAxis = makeArrow(new THREE.Vector3(-1, 0, 0), 0x10b981); // GREEN
      // +Z (Up) is (0, 1, 0)
      const zAxis = makeArrow(new THREE.Vector3(0, 1, 0), 0x3b82f6); // BLUE

      group.add(xAxis);
      group.add(yAxis);
      group.add(zAxis);

      const beadGeo = new THREE.SphereGeometry(scale * 0.07, 12, 12);
      const beadMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      group.add(new THREE.Mesh(beadGeo, beadMat));

      return group;
    };

    // 7.1 base_footprint (Z = 0.0m ground datum)
    const baseFootprintGroup = new THREE.Group();
    baseFootprintGroup.position.set(0, 0, 0);
    robotRoot.add(baseFootprintGroup);
    const tfBfp = createTfTrihedron(0.12);
    baseFootprintGroup.add(tfBfp);
    tfGroups['base_footprint'] = tfBfp;

    // 7.2 base_link (Z = +0.06m)
    const baseLinkGroup = new THREE.Group();
    baseLinkGroup.position.copy(rosToThree(0.0, 0.0, 0.06));
    robotRoot.add(baseLinkGroup);
    const tfBase = createTfTrihedron(0.14);
    baseLinkGroup.add(tfBase);
    tfGroups['base_link'] = tfBase;

    // Chassis Visual Mesh: Chamfered Box 0.40m (X) x 0.30m (Y) x 0.14m (Z)
    // Centered at Z = +0.07m relative to base_link
    const chassisGeo = new THREE.BoxGeometry(0.30, 0.14, 0.40);
    const chassisVisMat = new THREE.MeshStandardMaterial({
      color: 0x00c0e6,
      metalness: 0.65,
      roughness: 0.25,
      envMapIntensity: 1.0
    });
    const chassisVisMesh = new THREE.Mesh(chassisGeo, chassisVisMat);
    chassisVisMesh.position.set(0, 0.07, 0);
    chassisVisMesh.castShadow = true;
    chassisVisMesh.receiveShadow = true;
    chassisVisMesh.userData = { linkName: 'base_link' };
    baseLinkGroup.add(chassisVisMesh);
    visualMeshes.push(chassisVisMesh);

    // Chassis decorative styling: Dark top lid & glowing front LED light bar
    const lidGeo = new THREE.BoxGeometry(0.28, 0.005, 0.38);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.set(0, 0.141, 0);
    baseLinkGroup.add(lidMesh);
    visualMeshes.push(lidMesh);

    const ledGeo = new THREE.BoxGeometry(0.22, 0.015, 0.005);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, 0.04, -0.201); // Front bumper
    baseLinkGroup.add(ledMesh);
    visualMeshes.push(ledMesh);

    // 7.3 Left Drive Wheel (Y = +0.16m in ROS -> -0.16m in Three.js)
    const leftWheelGroup = new THREE.Group();
    leftWheelGroup.position.copy(rosToThree(0.0, +0.16, 0.06));
    robotRoot.add(leftWheelGroup);
    const tfLw = createTfTrihedron(0.09);
    leftWheelGroup.add(tfLw);
    tfGroups['left_wheel_link'] = tfLw;

    const wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.035, 32);
    wheelGeo.rotateZ(Math.PI / 2); // Align cylinder axial depth along Three.js X (ROS Y)

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, metalness: 0.1 });
    const leftTireMesh = new THREE.Mesh(wheelGeo, tireMat);
    leftTireMesh.castShadow = true;
    leftTireMesh.userData = { linkName: 'left_wheel_link' };
    leftWheelGroup.add(leftTireMesh);
    visualMeshes.push(leftTireMesh);

    const rimGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.036, 16);
    rimGeo.rotateZ(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.3 });
    const leftRimMesh = new THREE.Mesh(rimGeo, rimMat);
    leftWheelGroup.add(leftRimMesh);
    visualMeshes.push(leftRimMesh);

    // 7.4 Right Drive Wheel (Y = -0.16m in ROS -> +0.16m in Three.js)
    const rightWheelGroup = new THREE.Group();
    rightWheelGroup.position.copy(rosToThree(0.0, -0.16, 0.06));
    robotRoot.add(rightWheelGroup);
    const tfRw = createTfTrihedron(0.09);
    rightWheelGroup.add(tfRw);
    tfGroups['right_wheel_link'] = tfRw;

    const rightTireMesh = new THREE.Mesh(wheelGeo, tireMat);
    rightTireMesh.castShadow = true;
    rightTireMesh.userData = { linkName: 'right_wheel_link' };
    rightWheelGroup.add(rightTireMesh);
    visualMeshes.push(rightTireMesh);

    const rightRimMesh = new THREE.Mesh(rimGeo, rimMat);
    rightWheelGroup.add(rightRimMesh);
    visualMeshes.push(rightRimMesh);

    // 7.5 Front Caster (X = +0.14m, Z = 0.03m)
    const frontCasterGroup = new THREE.Group();
    frontCasterGroup.position.copy(rosToThree(+0.14, 0.0, 0.03));
    robotRoot.add(frontCasterGroup);
    const tfFc = createTfTrihedron(0.08);
    frontCasterGroup.add(tfFc);
    tfGroups['front_caster_link'] = tfFc;

    const casterGeo = new THREE.SphereGeometry(0.03, 24, 24);
    const casterVisMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
    const frontCasterMesh = new THREE.Mesh(casterGeo, casterVisMat);
    frontCasterMesh.castShadow = true;
    frontCasterMesh.userData = { linkName: 'front_caster_link' };
    frontCasterGroup.add(frontCasterMesh);
    visualMeshes.push(frontCasterMesh);

    // 7.6 Rear Caster (X = -0.14m, Z = 0.03m)
    const rearCasterGroup = new THREE.Group();
    rearCasterGroup.position.copy(rosToThree(-0.14, 0.0, 0.03));
    robotRoot.add(rearCasterGroup);
    const tfRc = createTfTrihedron(0.08);
    rearCasterGroup.add(tfRc);
    tfGroups['rear_caster_link'] = tfRc;

    const rearCasterMesh = new THREE.Mesh(casterGeo, casterVisMat);
    rearCasterMesh.castShadow = true;
    rearCasterMesh.userData = { linkName: 'rear_caster_link' };
    rearCasterGroup.add(rearCasterMesh);
    visualMeshes.push(rearCasterMesh);

    // 7.7 2D LiDAR (laser_frame) at X = +0.08m, Z = 0.22m
    const lidarGroup = new THREE.Group();
    lidarGroup.position.copy(rosToThree(+0.08, 0.0, 0.22));
    robotRoot.add(lidarGroup);
    const tfLidar = createTfTrihedron(0.11);
    lidarGroup.add(tfLidar);
    tfGroups['laser_frame'] = tfLidar;

    // LiDAR Base Cylinders (Safety Orange + Dark Puck)
    const lidarBaseGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 28);
    const lidarOrangeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const lidarBaseMesh = new THREE.Mesh(lidarBaseGeo, lidarOrangeMat);
    lidarBaseMesh.position.y = -0.01;
    lidarBaseMesh.userData = { linkName: 'laser_frame' };
    lidarGroup.add(lidarBaseMesh);
    visualMeshes.push(lidarBaseMesh);

    const lidarPuckGroup = new THREE.Group();
    lidarGroup.add(lidarPuckGroup);
    const lidarPuckGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.025, 28);
    const lidarPuckMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.5 });
    const lidarPuckMesh = new THREE.Mesh(lidarPuckGeo, lidarPuckMat);
    lidarPuckMesh.position.y = 0.0125;
    lidarPuckMesh.userData = { linkName: 'laser_frame' };
    lidarPuckGroup.add(lidarPuckMesh);
    visualMeshes.push(lidarPuckMesh);

    const slitGeo = new THREE.CylinderGeometry(0.041, 0.041, 0.008, 28);
    const slitMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const slitMesh = new THREE.Mesh(slitGeo, slitMat);
    slitMesh.position.y = 0.0125;
    lidarPuckGroup.add(slitMesh);
    visualMeshes.push(slitMesh);

    // 7.8 Depth / RGB Camera (camera_link) at X = +0.20m, Z = 0.08m (Front Chassis Bumper)
    // Left as the dedicated Hands-on Student Challenge Asset
    const cameraGroup = new THREE.Group();
    cameraGroup.position.copy(rosToThree(+0.20, 0.0, 0.08));
    robotRoot.add(cameraGroup);
    const tfCam = createTfTrihedron(0.09);
    cameraGroup.add(tfCam);
    tfGroups['camera_link'] = tfCam;

    const camBoxGeo = new THREE.BoxGeometry(0.09, 0.025, 0.025);
    const camMat = new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.4, metalness: 0.7 });
    const camMesh = new THREE.Mesh(camBoxGeo, camMat);
    camMesh.castShadow = true;
    camMesh.userData = { linkName: 'camera_link' };
    cameraGroup.add(camMesh);
    visualMeshes.push(camMesh);

    // Dual camera optical aperture lenses
    const lensGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.005, 16);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leftLens = new THREE.Mesh(lensGeo, lensMat);
    leftLens.position.set(-0.025, 0, -0.013);
    cameraGroup.add(leftLens);
    const rightLens = new THREE.Mesh(lensGeo, lensMat);
    rightLens.position.set(+0.025, 0, -0.013);
    cameraGroup.add(rightLens);
    visualMeshes.push(leftLens, rightLens);

    // --------------------------------------------------------------------------
    // 8. KINEMATIC TREE DOTTED CONNECTORS (Parent -> Child Lines)
    // --------------------------------------------------------------------------
    const treeLinePoints = [
      // base_footprint -> base_link
      rosToThree(0, 0, 0), rosToThree(0, 0, 0.06),
      // base_link -> left_wheel
      rosToThree(0, 0, 0.06), rosToThree(0, +0.16, 0.06),
      // base_link -> right_wheel
      rosToThree(0, 0, 0.06), rosToThree(0, -0.16, 0.06),
      // base_link -> front_caster
      rosToThree(0, 0, 0.06), rosToThree(+0.14, 0, 0.03),
      // base_link -> rear_caster
      rosToThree(0, 0, 0.06), rosToThree(-0.14, 0, 0.03),
      // base_link -> laser_frame
      rosToThree(0, 0, 0.06), rosToThree(+0.08, 0, 0.22),
      // base_link -> camera_link (Student Challenge Asset)
      rosToThree(0, 0, 0.06), rosToThree(+0.20, 0, 0.08)
    ];
    const treeLineGeo = new THREE.BufferGeometry().setFromPoints(treeLinePoints);
    const treeLineMat = new THREE.LineDashedMaterial({
      color: 0x06b6d4,
      dashSize: 0.025,
      gapSize: 0.015,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75
    });
    const treeLineMesh = new THREE.LineSegments(treeLineGeo, treeLineMat);
    treeLineMesh.computeLineDistances();
    scene.add(treeLineMesh);

    // Save refs for state synchronization
    threeRefs.current = {
      scene,
      camera,
      renderer,
      controls,
      animFrameId: null,
      tfGroups,
      visualMeshes,
      leftWheelGroup,
      rightWheelGroup,
      lidarPuckGroup,
      treeLineMesh,
      raycaster: new THREE.Raycaster(),
    };

    // Apply initial visibility
    visualMeshes.forEach((mesh) => {
      mesh.visible = showSolidBodies;
    });

    // --------------------------------------------------------------------------
    // 9. ANIMATION & RENDER LOOP
    // --------------------------------------------------------------------------
    const animate = () => {
      threeRefs.current.animFrameId = requestAnimationFrame(animate);

      controls.update();

      // Spin lidar puck continuously like a real sensor
      if (lidarPuckGroup) {
        lidarPuckGroup.rotation.y += 0.04;
      }

      // Update projected 2D screen positions for TF frame badges
      const newCoords = {};
      Object.keys(ROBOT_LINKS_DATA).forEach((key) => {
        const tfObj = tfGroups[key];
        if (tfObj) {
          const worldPos = new THREE.Vector3();
          tfObj.getWorldPosition(worldPos);
          worldPos.y += 0.025; // Slight offset above trihedron center
          const proj = worldPos.project(camera);

          // Check if behind camera
          if (proj.z < 1) {
            const x = (proj.x * 0.5 + 0.5) * width;
            const y = (-(proj.y * 0.5) + 0.5) * height;
            newCoords[key] = { x, y, visible: true };
          } else {
            newCoords[key] = { visible: false };
          }
        }
      });
      setLabelCoords(newCoords);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Click / Raycasting to Select Link in 3D
    const handleCanvasClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = threeRefs.current.raycaster;
      raycaster.setFromCamera({ x, y }, camera);

      const intersects = raycaster.intersectObjects(visualMeshes.filter((m) => m.visible), true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.linkName && obj.parent) {
          obj = obj.parent;
        }
        if (obj && obj.userData.linkName) {
          setSelectedLink(obj.userData.linkName);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      camera.aspect = newW / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRefs.current.animFrameId) {
        cancelAnimationFrame(threeRefs.current.animFrameId);
      }
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ----------------------------------------------------------------------------
  // SYNCHRONIZE STATE TOGGLES WITH THREE.JS
  // ----------------------------------------------------------------------------
  // 0. Solid Bodies (Visual Meshes) Visibility
  useEffect(() => {
    const { visualMeshes } = threeRefs.current;
    if (!visualMeshes) return;
    visualMeshes.forEach((mesh) => {
      mesh.visible = showSolidBodies;
    });
  }, [showSolidBodies]);

  // 1. TF Axes Visibility
  useEffect(() => {
    const { tfGroups } = threeRefs.current;
    if (!tfGroups) return;
    Object.values(tfGroups).forEach((tf) => {
      tf.visible = showTfAxes;
    });
  }, [showTfAxes]);

  // 2. Kinematic Tree Lines
  useEffect(() => {
    const { treeLineMesh } = threeRefs.current;
    if (treeLineMesh) {
      treeLineMesh.visible = showTreeLines;
    }
  }, [showTreeLines]);

  // 3. Wheel Rotation Slider
  useEffect(() => {
    const { leftWheelGroup, rightWheelGroup } = threeRefs.current;
    if (!leftWheelGroup || !rightWheelGroup) return;

    // Apply pitch rotation around X in Three.js (corresponds to Y axis in ROS)
    leftWheelGroup.rotation.x = manualWheelAngle;
    rightWheelGroup.rotation.x = manualWheelAngle;
  }, [manualWheelAngle]);

  // Camera Presets
  const setCameraPreset = (preset) => {
    const { camera, controls } = threeRefs.current;
    if (!camera || !controls) return;

    if (preset === 'iso') {
      camera.position.set(1.1, 0.9, 1.2);
      controls.target.set(0, 0.12, 0);
    } else if (preset === 'top') {
      camera.position.set(0, 2.0, 0.001);
      controls.target.set(0, 0, 0);
    } else if (preset === 'front') {
      camera.position.set(0, 0.25, -1.5);
      controls.target.set(0, 0.12, 0);
    } else if (preset === 'side') {
      camera.position.set(-1.6, 0.25, 0);
      controls.target.set(0, 0.12, 0);
    }
    controls.update();
  };

  const selectedData = ROBOT_LINKS_DATA[selectedLink] || ROBOT_LINKS_DATA['base_link'];

  return (
    <div
      className="interactive-urdf-viewer-container"
      style={{
        margin: '2rem 0',
        borderRadius: '14px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        background: '#0a0f1d',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}
    >
      {/* -------------------------------------------------------------------- */}
      {/* HEADER TOOLBAR                                                       */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 100%)',
          padding: '0.9rem 1.4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06b6d4'
            }}
          >
            <Compass size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#06b6d4'
                }}
              >
                Interactive 3D WebGL Digital Twin
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontWeight: 600
                }}
              >
                REP 103 TF ACTIVE
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Nexus AMR &mdash; Live URDF &amp; TF Kinematics Visualizer
            </h3>
          </div>
        </div>

        {/* Camera Views Quick Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginRight: '0.2rem' }}>Views:</span>
          {['iso', 'front', 'side', 'top'].map((p) => (
            <button
              key={p}
              onClick={() => setCameraPreset(p)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(6, 182, 212, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
            >
              {p === 'iso' ? 'Isometric' : p}
            </button>
          ))}
          <button
            onClick={() => setCameraPreset('iso')}
            title="Reset Camera View"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#94a3b8',
              padding: '0.3rem 0.5rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* SECONDARY CONTROLS TOOLBAR                                            */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '0.6rem 1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.8rem'
        }}
      >
        {/* Layer Visibility Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Display Toggles:
          </span>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showSolidBodies}
              onChange={(e) => setShowSolidBodies(e.target.checked)}
              style={{ accentColor: '#06b6d4' }}
            />
            <span style={{ fontWeight: 600 }}>Solid Bodies</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showTfAxes}
              onChange={(e) => setShowTfAxes(e.target.checked)}
              style={{ accentColor: '#06b6d4' }}
            />
            <span style={{ fontWeight: 600 }}>TF Trihedrons (REP 103)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showTfLabels}
              onChange={(e) => setShowTfLabels(e.target.checked)}
              style={{ accentColor: '#06b6d4' }}
            />
            <span>Frame Badges</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showTreeLines}
              onChange={(e) => setShowTreeLines(e.target.checked)}
              style={{ accentColor: '#06b6d4' }}
            />
            <span>Kinematic Parent Lines</span>
          </label>
        </div>

        <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
          <span>Active Model: </span>
          <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>nexus_amr.urdf.xacro</span>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 3D CANVAS VIEWPORT WITH FLOATING LABELS & PANELS                      */}
      {/* -------------------------------------------------------------------- */}
      <div style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden' }}>
        {/* Three.js Container */}
        <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

        {/* 2D Projected TF Labels */}
        {showTfLabels &&
          showTfAxes &&
          Object.keys(labelCoords).map((linkKey) => {
            const pos = labelCoords[linkKey];
            if (!pos || !pos.visible) return null;
            const isSelected = selectedLink === linkKey;

            return (
              <div
                key={linkKey}
                onClick={() => setSelectedLink(linkKey)}
                style={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: 'translate(-50%, -100%)',
                  background: isSelected ? '#06b6d4' : 'rgba(15, 23, 42, 0.85)',
                  color: isSelected ? '#0a0f1d' : '#f1f5f9',
                  border: `1px solid ${isSelected ? '#22d3ee' : 'rgba(255, 255, 255, 0.2)'}`,
                  backdropFilter: 'blur(4px)',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 700,
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  zIndex: isSelected ? 20 : 10,
                  boxShadow: isSelected ? '0 0 12px rgba(6, 182, 212, 0.6)' : '0 2px 4px rgba(0,0,0,0.5)',
                  transition: 'background 0.15s ease, transform 0.15s ease',
                  userSelect: 'none'
                }}
              >
                {linkKey}
              </div>
            );
          })}

        {/* FLOATING TOP-LEFT: SELECTED LINK PROPERTY INSPECTOR */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            width: '320px',
            background: 'rgba(10, 15, 29, 0.88)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '10px',
            padding: '0.9rem 1.1rem',
            color: '#e2e8f0',
            fontSize: '0.8rem',
            pointerEvents: 'auto',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            zIndex: 15
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 700,
                color: selectedData.color
              }}
            >
              Link Inspector: {selectedData.category}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                color: '#94a3b8',
                background: 'rgba(255,255,255,0.06)',
                padding: '1px 6px',
                borderRadius: '4px'
              }}
            >
              {selectedData.jointType}
            </span>
          </div>

          <h4
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#38bdf8',
              fontFamily: 'var(--font-mono, monospace)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>🔗</span> {selectedData.name}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '85px 1fr', gap: '0.3rem', fontSize: '0.76rem', marginBottom: '0.55rem' }}>
            <span style={{ color: '#94a3b8' }}>Parent Joint:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{selectedData.parentJoint}</span>

            <span style={{ color: '#94a3b8' }}>ROS Position:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b' }}>
              [{selectedData.rosPos.map((n) => n.toFixed(2)).join(', ')}] m
            </span>

            {selectedData.axis && (
              <>
                <span style={{ color: '#94a3b8' }}>Revolute Axis:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#10b981' }}>{selectedData.axis}</span>
              </>
            )}

            <span style={{ color: '#94a3b8' }}>Mass (kg):</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{selectedData.mass}</span>

            <span style={{ color: '#94a3b8' }}>Inertia Tensor:</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{selectedData.inertia}</span>
          </div>

          <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.45, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem' }}>
            {selectedData.description}
          </p>
        </div>

        {/* FLOATING BOTTOM-LEFT: REP 103 AXIS LEGEND */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            background: 'rgba(10, 15, 29, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '0.55rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono, monospace)',
            zIndex: 15
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ef4444' }} />
            <strong style={{ color: '#ef4444' }}>+X: Forward</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }} />
            <strong style={{ color: '#10b981' }}>+Y: Port Left</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#3b82f6' }} />
            <strong style={{ color: '#3b82f6' }}>+Z: Upward</strong>
          </div>
        </div>

        {/* FLOATING BOTTOM-RIGHT: INTERACTIVE JOINT STATE SLIDER (Wheel Angle) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            background: 'rgba(10, 15, 29, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '0.65rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            zIndex: 15
          }}
        >
          <Sliders size={16} color="#06b6d4" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#cbd5e1' }}>
              <span>Drive Joint Angle:</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#06b6d4', fontWeight: 700 }}>
                {((manualWheelAngle * 180) / Math.PI).toFixed(0)}&deg;
              </span>
            </div>
            <input
              type="range"
              min={-Math.PI * 2}
              max={Math.PI * 2}
              step={0.05}
              value={manualWheelAngle}
              onChange={(e) => setManualWheelAngle(parseFloat(e.target.value))}
              style={{ width: '130px', accentColor: '#06b6d4' }}
            />
          </div>
          <button
            onClick={() => setManualWheelAngle(0)}
            title="Reset Wheel Angle"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#94a3b8',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.7rem'
            }}
          >
            Reset
          </button>
        </div>

        {/* Orbit Hint */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            background: 'rgba(10, 15, 29, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '3px 8px',
            fontSize: '0.7rem',
            color: '#64748b',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          🖱️ Left Click: Rotate &bull; Right Click: Pan &bull; Scroll: Zoom
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* BOTTOM LINK HIERARCHY SELECTOR PILLS                                  */}
      {/* -------------------------------------------------------------------- */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          padding: '0.65rem 1.2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          overflowX: 'auto',
          scrollbarWidth: 'thin'
        }}
      >
        <span style={{ fontSize: '0.74rem', color: '#94a3b8', flexShrink: 0, marginRight: '0.3rem' }}>
          Kinematic Links:
        </span>
        {Object.keys(ROBOT_LINKS_DATA).map((key) => {
          const isSelected = selectedLink === key;
          const data = ROBOT_LINKS_DATA[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedLink(key)}
              style={{
                background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${isSelected ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isSelected ? '#38bdf8' : '#94a3b8',
                borderRadius: '6px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: data.color }} />
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
