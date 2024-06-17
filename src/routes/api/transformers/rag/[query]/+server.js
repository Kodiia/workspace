import { TogetherLLM, TogetherEmbedding, Document, VectorStoreIndex, Settings, ResponseSynthesizer, CompactAndRefine } from "llamaindex";
import { TOGETHER_API_KEY } from '$env/static/private'

Settings.embedModel = new TogetherEmbedding({
  apiKey: TOGETHER_API_KEY,
});

Settings.llm = new TogetherLLM({
  apiKey: TOGETHER_API_KEY,
  model: "meta-llama/Llama-3-8b-chat-hf",
});

const cellularAutomata = `Cellular automata (CA) have been applied in various fields, including architecture, design, and games, to generate complex patterns and structures from simple rules. Here are some key points on how CA are used in these areas:
Architecture and Design
Exploring Ancient Architectural Designs: CA can be used to model and generate architectural designs, such as the Borobudur Temple in Indonesia, by applying simple rules to the lower ground of the structure and then propagating these rules to the upper floors.
Generative Design Tools: CA can be adapted as architectural design tools to support specific design processes. This involves modifying CA rules, cell shapes, and site context to produce desired architectural forms.
Computational Design Thinking: CA can be used in design studios to generate fractal-based forms and explore computational design thinking. This involves applying CA processes to design problems and analyzing the contributions of these models to design education.
Games
Game of Life: The "Game of Life" is a well-known CA model that exhibits complex behavior from simple rules. This model has been used in various games and simulations to demonstrate the emergence of complex patterns.
Generative Game Design: CA can be used in game design to create unpredictable, novel relationships and outcomes. This involves applying algorithmic processes, such as shape grammars and evolutionary algorithms, to generate game designs.
Key Concepts
Simple Rules: CA are based on simple rules that are applied to each cell in a grid. These rules determine the state of the cell based on the states of its neighbors.
Local Interconnectivity: The simplicity of CA is dependent on the local interconnectivity of cells, which allows for the emergence of complex patterns and structures.
Generative Processes: CA can be used in various generative processes, such as fractal generation, to produce complex forms and patterns.
Computational Design Thinking: CA can be used to explore computational design thinking, which involves applying algorithmic methods to design problems and analyzing the contributions of these models to design education.
`

const p5jsExampleProject = `
  //here is the example code for p5js project
  let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = function () {
    p.background("violet");

    p.ellipse(p.mouseX, p.mouseY, 50);
  };

  p.windowResized = function () {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

let myp5 = new p5(sketch);`

const threejsExampleProject = `
//here is the example code for threejs project
//import three.js library
import * as THREE from "three";

//create a new scene
const scene = new THREE.Scene();
//create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

//get the canvas from HTML file
const appCanvas = document.getElementById("appCanvas");

//setup renderer
const renderer = new THREE.WebGLRenderer({
  canvas: appCanvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//resize function
function resize() {
  // Update sizes
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
}
window.addEventListener("resize", resize);

//basic cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4233fb });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//game loop function and cube rotation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.rotateY(0.1);
}
animate();
`

const brainjsExampleProject = `
//here is the example code for brainjs project
const trainingData = [
  { input: { bravery: 1, intelligence: 0, loyalty: 0, cunning: 0 }, output: { gryffindor: 1 } },
  { input: { bravery: 0, intelligence: 1, loyalty: 0, cunning: 0 }, output: { ravenclaw: 1 } },
  { input: { bravery: 0, intelligence: 0, loyalty: 1, cunning: 0 }, output: { hufflepuff: 1 } },
  { input: { bravery: 0, intelligence: 0, loyalty: 0, cunning: 1 }, output: { slytherin: 1 } }
];

const net = new brain.NeuralNetwork();

net.train(trainingData);

const student = { bravery: 0.8, intelligence: 0.6, loyalty: 0.4, cunning: 0.2 };
const result = net.run(student);
console.log(result);
`

const citySimGame = `// this is a simple city simulation game. 
  // here cellular automata is used to simulate air pollution according to various building types 
  let sketch = function(p) {
  let gridSize = 50; // size of each cell in pixels
  let gridWidth, gridHeight;
  let grid = [];

  class Cell {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type; // 0: nature, 1: residential, 2: office, 3: factory
      this.airQuality = 1;
      this.pollution = 1;
    }

    updateAirQuality() {
      let neighbors = this.getNeighbors();
      let totalNeighbors = neighbors.length;

      let diffusionRate = 0.1; // diffusion rate

      let sumAirQuality = this.airQuality;

      for (let neighbor of neighbors) {
        sumAirQuality += neighbor.airQuality;
      }

      let averageAirQuality = sumAirQuality / (totalNeighbors + 1);

      this.airQuality = averageAirQuality;

      if (this.type === 3) { // factory
        this.airQuality -= 0.5;
        this.pollution -= 0.5;
      } else if (this.type === 2) { // office
        this.airQuality -= 0.02;
        this.pollution -= 0.02;
      } else if (this.type === 1) { // residential
        this.airQuality -= 0.02;
        this.pollution -= 0.02;
      } else { // nature
        this.airQuality += 0.1;
        this.pollution += 0.1;
      }
      this.airQuality = p.constrain(this.airQuality, 0, 1);
      this.pollution = p.constrain(this.pollution, 0, 1);
    }

    updatePollution() {
      let neighbors = this.getNeighbors();
      let totalNeighbors = neighbors.length;

      let diffusionRate = 0.1; // diffusion rate

      let sumPollution = this.pollution;

      for (let neighbor of neighbors) {
        sumPollution += neighbor.pollution;
      }

      let averagePollution = sumPollution / (totalNeighbors + 1);

      this.pollution = averagePollution;

      if (this.type === 3) { // factory
        this.pollution -= 0.5;
      } else if (this.type === 2) { // office
        this.pollution -= 0.2;
      } else if (this.type === 1) { // residential
        this.pollution -= 0.2;
      } else { // nature
        this.pollution += 0.05;
      }
      this.pollution = p.constrain(this.pollution, 0, 1);
    }

    display() {
      let cellColor;
      if (this.type === 0) { // nature
        cellColor = p.color(0, 255, 0);
      } else if (this.type === 1) { // residential
        cellColor = p.color(255, 0, 0);
      } else if (this.type === 2) { // office
        cellColor = p.color(255, 255, 0);
      } else { // factory
        cellColor = p.color(0, 0, 255);
      }
      p.fill(cellColor);
      p.rect(this.x * gridSize, this.y * gridSize, gridSize, gridSize);
      p.fill(0);
      p.textSize(10)
      p.text(this.type + " " + p.floor(this.airQuality * 100) + " " + p.floor(this.pollution * 100), this.x * gridSize, this.y * gridSize + gridSize / 1.2);
      p.fill(this.airQuality * 255)
      p.circle(this.x * gridSize + gridSize / 4, this.y * gridSize + gridSize / 4, gridSize / 4)

      p.fill(this.pollution * 255)
      p.circle(this.x * gridSize + gridSize / 1.5, this.y * gridSize + gridSize / 4, gridSize / 4)
    }

    getNeighbors() {
      let neighbors = [];
      let offsets = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ];

      for (let offset of offsets) {
        let neighborX = this.x + offset.x;
        let neighborY = this.y + offset.y;

        if (neighborX >= 0 && neighborX < gridWidth && neighborY >= 0 && neighborY < gridHeight) {
          neighbors.push(grid[neighborX + neighborY * gridWidth]);
        }
      }

      return neighbors;
    }
  }

  p.setup = function() {
    p.createCanvas(600, 600);
    gridWidth = p.width / gridSize;
    gridHeight = p.height / gridSize;

    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        grid.push(new Cell(x, y, 0)); // initialize with nature cells
      }
    }

    // randomly place city cells
    for (let i = 0; i < 16; i++) {
      let x = p.floor(p.random(gridWidth / 2 - 2, gridWidth / 2 + 2));
      let y = p.floor(p.random(gridHeight / 2 - 2, gridHeight / 2 + 2));
      grid[x * gridWidth + y].type = p.floor(p.random(1, 4));
    }
  }

  p.draw = function() {
    p.background(220);

    // update and display cells
    for (let cell of grid) {
      cell.updateAirQuality();
      cell.updatePollution();
      cell.display();
    }
  }

  p.mouseClicked = function() {
    let x = p.floor(p.mouseX / gridSize);
    let y = p.floor(p.mouseY / gridSize);

    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
      let cell = grid[x * gridWidth + y];
      if (cell.type === 0) {
        cell.type = p.floor(p.random(1, 4));
        console.log(cell.type)
      } else {
        cell.type = 0;
      }
    }
  }
};
let myp5 = new p5(sketch);`

const archScene = `
// this is a simple three.js scene with orbitcontrols and a custom glb model uploaded
//import three.js library
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//create a new scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("skyblue");
//create a camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 3;

//get the canvas from HTML file
const appCanvas = document.getElementById("appCanvas");

//setup renderer
const renderer = new THREE.WebGLRenderer({
  canvas: appCanvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableDamping = true;
controls.target = new THREE.Vector3(3, 2, -1);

//resize function
function resize() {
  // Update sizes
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
}
window.addEventListener("resize", resize);

const light = new THREE.AmbientLight("white", 0.2);
scene.add(light);

const sun = new THREE.DirectionalLight("white", 1.5);
sun.position.set(10, 10, 10);
sun.castShadow = true;

// Set up shadow properties
sun.shadow.camera.near = 0.005;
sun.shadow.camera.far = 100;
sun.shadow.camera.left = -50;
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;

sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;

sun.shadow.bias = -0.0025;

scene.add(sun);

// Instantiate a loader
const loader = new GLTFLoader();

let building = new THREE.Object3D();

// Load a glTF resource
loader.load(
  // resource URL
  "/api/assets/mozbyhm955xpenp/archweekend_1_1_upRWSV5gGC.glb",
  // called when the resource is loaded
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    building = gltf.scene.children[0];
    building.scale.set(0.1, 0.1, 0.1);
    scene.add(building);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  },
);

//game loop function and cube rotation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
}
animate();
`

const genArtWithNoise = `
// this is a simple example of generative art with Perlin Noise
let sketch = function (p) {
  let particles = [];
  const particlesNumber = 50;
  for (let i = 0; i < particlesNumber; i++) {
    particles.push(
      p.createVector(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
      ),
    );
  }

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.strokeWeight(1);
    p.background(255)

    for (let i = 0; i < 100; i++) {
      for (let particle of particles) {
        p.rect(particle.x, particle.y, 20);
        let n = p.noise(particle.x * 0.002, particle.y * 0.002);
        particle.x += 2*Math.cos(n * Math.PI * 2);
        particle.y += 2*Math.sin(n * Math.PI * 2);
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.x = Math.random() * window.innerWidth;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.y = Math.random() * window.innerHeight;
        }
      }
    }
  };

  p.draw = function () {
    // p.background('#ffffff20');
  };

  p.windowResized = function () {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    p.setup();
  };
};

let myp5 = new p5(sketch);
`

const data = `Algorithms in Design, Architecture, and Games
The world of design, architecture, and gaming has been revolutionized by the integration of various computational algorithms. These algorithms, including Cellular Automata (CA), Perlin Noise, Agent-Based Modeling (ABM), Fractals, Random Walkers, Neural Networks, Marching Cubes, and Wave Function Collapse, offer unique capabilities for generating complex patterns, simulating natural processes, optimizing designs, and enhancing visual appeal. This article explores these algorithms' applications across different domains.

Cellular Automata (CA)
Cellular Automata create visually appealing patterns through simple rules applied to cells arranged in a grid. Applications include:

Graphic Design: Generating textures and patterns.
Textiles: Creating intricate fabric designs.
Game Design: Procedurally generating landscapes and environments.
Digital Art: Producing abstract art pieces.
Design Optimization: Finding efficient layouts and solving spatial problems.
Interactive Installations: Evolving designs based on user input or environmental factors.
Perlin Noise
Perlin Noise generates gradient noise, useful for creating natural-looking textures and animations. It's applied in:

Texture Creation: Wood grain, marble, clouds, terrain.
Landscape Generation: Realistic terrains and environmental features.
Animation: Adding organic motion to water flow or waving grass.
Agent-Based Modeling (ABM)
ABM simulates autonomous agents interacting within a system, aiding in:

City Planning: Optimizing pedestrian and traffic flows.
Building Designs: Improving usability and functionality based on user behavior.
Public Spaces: Enhancing social dynamics and crowd management.
Ecosystem Modeling: Promoting sustainability and resilience.
Random Walkers
Random walks generate intricate patterns and simulate diffusion processes, applicable in:

Abstract Art: Creating unique visual effects.
Terrain Generation: Natural-looking paths and structures.
Visual Effects: Simulating particle spread.
Data Visualization: Highlighting trends and patterns.
Dynamic Text Layouts: Introducing unpredictability in text arrangements.
Interactive Media: Driving element behavior in response to user input.
Fractals
Fractals produce complex geometric shapes that mimic natural patterns, suitable for:

Generative Art: Creating unique and complex designs.
Architecture: Innovating and optimizing structural designs.
Natural Design: Mimicking leaves, snowflakes, coastlines for organic aesthetics.
Neural Networks
Neural networks learn from data to make decisions or predictions, finding uses in:

Machine Learning: Predictive analytics and decision-making.
Artificial Intelligence: Enhancing game characters' intelligence.
Pattern Recognition: Identifying complex patterns in large datasets.
Marching Cubes
Marching Cubes algorithm generates 3D models from scalar fields, ideal for:

3D Graphics: Creating detailed terrain and landscape models.
Medical Imaging: Visualizing medical scans with high fidelity.
Wave Function Collapse
Wave Function Collapse uses procedural generation to create content, beneficial in:

Game Development: Generating levels and worlds procedurally.
Content Creation: Automatically designing assets like buildings or furniture.
These algorithms, each with its unique strengths, have transformed the way designers, architects, and game developers approach their work. By leveraging the emergent properties and capabilities of these algorithms, creators can explore new possibilities, enhance realism, and introduce complexity and unpredictability into their projects, pushing the boundaries of what is achievable in design, architecture, and gaming.`

export async function GET({ params, locals }) {
  const document = new Document({ text: data, id_: "data" });
  const documentCA = new Document({ text: cellularAutomata, id_: "dataCA" });
  const documentP5js = new Document({ text: p5jsExampleProject, id_: "dataP5" });
  const documentThreejs = new Document({ text: threejsExampleProject, id_: "dataThree" });
  const documentBrainjs = new Document({ text: brainjsExampleProject, id_: "dataBrain" });
  const documentCitySimGame = new Document({ text: citySimGame, id_: "citySimGame" });
  const query = params.query

  if (locals.user && locals.user.requests > 0) {
    try {
      // Define a system prompt
      const newTextQaPrompt = ({ context = '', query = '' }) => {
        return `You are a creative developer assistant, 
            you specialize in creating generative art, simulations, and games for artists, architects, and designers. 
            You know how to create projects transcending cultural and linguistic barriers, and fostering connections between diverse communities.
            You use only HTML, CSS, JavaScript, and libraries like brain.js (to train neural networks), 
            transformers.js (to use pretrained models), 
            p5.js for 2D graphics, and three.js for 3D graphics. 
            You always use p5.js in an INSTANCE MODE.
            You develop projects using algorithms like cellular automata (CA), 
            perlin noise, agent-based modelling, random walkers, 
            neural networks, fractals, marching cubes, etc. 
            If necessary, provide short and concise code snippets and code examples. For p5.js library provide snippets in an instance mode.
            Suggest suitable libraries and algorithms for users task. 
            Provide users with a short list of step-by-step instructions of how to complete the task in the query they provide.
            Suggest how these algorithms and libraries could be used to developing user projects. 
            Provide insights and new ideas, suggest possible directions for creative experiments, offer intelligent feedback.
            Please, do not mention that some code examples are already provided to you.
            Context information is below.
            ---------------------
            ${context}
            ---------------------
            Given the context information and your prior knowledge, if necessary, answer the query.
            Query: ${query}
            Answer:`;
      };

      // Create an instance of response synthesizer
      const responseSynthesizer = new ResponseSynthesizer({
        responseBuilder: new CompactAndRefine(undefined, newTextQaPrompt),
      });

      // Load and index documents
      const index = await VectorStoreIndex.fromDocuments([document, documentCA, documentP5js, documentThreejs, documentBrainjs, documentCitySimGame]);

      // get retriever
      const retriever = index.asRetriever();

      // Create a query engine
      const queryEngine = index.asQueryEngine({
        // retriever,
        responseSynthesizer
      });

      // Query
      const response = await queryEngine.query({
        query
      });

      // Log the response
      // console.log(response);

      return new Response(JSON.stringify(response.response))
    } catch (err) {
      console.log(err)
    }
  } else {
    return new Response(JSON.stringify("Something went wrong. You need to be logged in and have enough requests to access the chat feature."))
  }
}