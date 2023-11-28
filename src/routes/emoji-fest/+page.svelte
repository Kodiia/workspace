<script>
  import { onMount } from 'svelte';
import {width, height} from '$lib/store'
import { createSVG } from '$lib/createSVG'

import kodiia_logo_bw from '$lib/logos/kodiia_logo_color.svg'
import brainhub_logo from '$lib/logos/brainhub_logo.png'

let script = `let sketch = function (p) {
  let faces = ["🦄", "👻", "🤓", "🍩"];

  let smile = function (x, y, face, size) {
    p.textSize(size);
    p.text(face, x, y);
  };

  class Particle {
    constructor(x, y, size, type) {
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acceleration = p.createVector(0, 0);
      this.size = size;
      this.color = p.color(p.random(255), p.random(255), p.random(255));
      this.type = faces[Math.floor(p.random(faces.length))];
    }

    // Update the particle's position and velocity based on its acceleration
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    // Apply a force to the particle
    applyForce(force) {
      this.acceleration.add(force);
    }

    // Draw the particle on the canvas
    display() {
      p.fill(this.color);
      smile(this.position.x, this.position.y, this.type, this.size);
    }
  }

  // Define the ParticleSystem class
  class ParticleSystem {
    constructor() {
      this.particles = [];
    }

    // Add a new particle to the system
    addParticle(x, y, size) {
      let particle = new Particle(x, y, size);
      if (this.particles.length < 100) {
        this.particles.push(particle);
      }
    }

    // Apply a force to all particles in the system
    applyForce(force) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].applyForce(force);
      }
    }

    // Update and display all particles in the system
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.update();
        particle.display();
        if (
          particle.position.x < 0 ||
          particle.position.x > p.width ||
          particle.position.y < 0 ||
          particle.position.y > p.height
        ) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  // Create a new ParticleSystem
  let ps = new ParticleSystem();

  p.setup = function () {
    p.createCanvas(800, 600);
  };

  p.draw = function () {
    p.background("#fed4ff");

    // Add a new particle to the system every frame
    let x = p.mouseX;
    let y = p.mouseY;
    if (x <= 0) {
      x = p.width / 2;
    }
    if (y <= 0) {
      y = p.height / 2;
    }
    ps.addParticle(x, y, Math.floor(p.random(10, 40)));

    // Apply a force to all particles in the system based on the mouse position
    let mouseForce = p.createVector(
      p.mouseX - p.width / 2,
      p.mouseY - p.height / 2,
    );
    mouseForce.mult(0.0001);
    ps.applyForce(mouseForce);

    // Update and display all particles in the system
    ps.run();
  };

  p.windowResized = function () {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

let myp5 = new p5(sketch);
`

let code = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Hello world!</title>


    <!-- import p5.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"><\/script>

  </head>
  <body>
    <style>
        body{
            margin: 0;
            overflow: hidden;
        }
        </style>
   <script type='module'>${script}<\/script> 
    </body>
</html>
`
let scriptContainer, card1, card2, card3, card4    

   onMount(()=>{
    let cards = [card1, card2, card3, card4]
    for(let element of cards){
      createSVG(element, element.clientWidth, element.clientHeight, 20, '#f9f9f9', '#f9f9f9', true)
    }
   })



</script>

<div style='width: 100%; 
display: flex;
flex-direction: column;
align-items: center;
min-height: 100svh;
background: #f9f9f9;
padding: 10px;
box-sizing: border-box;'>
<div class='container'>

  <div class='logosContainer'>
    <img src={brainhub_logo} alt='brainhub logo' width='135'/>
    <img src={kodiia_logo_bw} alt='kodiia logo' width='70'/>
  </div>
    <div class='scriptContainer' bind:this={scriptContainer}>
        <iframe srcDoc={code} sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" title='code'/>
    </div>
    <div class='headerContainer'>
      <h1>Emoji Fest | 05.12-15.12</h1>
      <p class='infoText'>Свяжитесь c Вашим менеджером в Brainhub  для записи на курс</p>
      <!-- <button class='subscribeButtonWhite'>Оставить заявку</button> -->
    </div>
    <div>
      <h2>Как устроен курс</h2>
      <p>Фестиваль Эмодзи - курс для начинающих программистов, где изучаются основы HTML, CSS, JavaScript и библиотеки p5.js. На каждом из четырех занятий участники разрабатывают уникальные проекты. Курс помогает получить практические навыки веб-разработки, знакомит с генеративным дизайном - области программирования для создания художественных проектов, а также вдохновляет на создание собственных работ.</p>
      <p>
        <u>Формат:</u> онлайн<br>
        <u>Продолжительность:</u> 4 занятия по 60 минут<br>
        <u>Как устроено каждое занятие:</u>  теория + практика + ответы на вопросы + discord чат
      </p>
    </div>

    <div>
    <h2>План занятий</h2>
    <div class='cardsContainer'>
      <div class='card' bind:this = {card1}>
        <div class='cardHeader'>
          <h4>⭐️ Занятие 1</h4>
          <h2>Введение в HTML и CSS</h2>
        </div>
        <div>
          <ul>
            <li>Основы HTML: теги, атрибуты и структура документа</li>
            <li>Создание основной структуры веб-страницы с использованием HTML</li>
            <li>Оформление веб-страницы с помощью CSS</li>
            <li>Добавление эмодзи на веб-страницу</li>
            <li>Интерактивные элементы и анимация с помощью CSS</li>
          </ul>
        </div>
      </div>
      <div class='card' bind:this = {card2}>
        <div class='cardHeader'>
          <h4>🌟 Занятие 2</h4>
          <h2>Основы JavaScript</h2>
        </div>
        <div>
          <ul>
            <li>Введение в JavaScript: переменные, операторы и условные выражения</li>
            <li>Работа с событиями и обработка пользовательского ввода</li>
            <li>Изменение содержимого веб-страницы с использованием JavaScript</li>
            <li>Создание интерактивного элемента с эмодзи</li>
          </ul>
        </div>
      </div>
      <div class='card' bind:this={card3}>
        <div class='cardHeader'>
          <h4>⚡️ Занятие 3</h4>
          <h2>Основы p5.js</h2>
        </div>
        <div>
          <ul>
            <li>Основные функции и возможности библиотеки p5.js</li>
            <li>Создание простой графики с использованием p5.js</li>
            <li>Добавление анимации с использованием эмодзи</li>
          </ul>
        </div>
      </div>
      <div class='card' bind:this = {card4}>
        <div class='cardHeader'>
          <h4>💥 Занятие 4</h4>
          <h2>Создание игры с использованием p5.js</h2>
        </div>
        <div>
          <ul>
            <li>Практическое применение знаний HTML, CSS, JavaScript и p5.js для создания игры</li>
            <li>Создание игровых объектов и взаимодействие с ними</li>
          </ul>
        </div>
      </div>
    </div>
    </div>

    <div class='tutorsDataContainer'>
      <h2>Преподаватели</h2>
      <div class='tutorsCardsContainer'>
        <div class='card'>
          <div class='cardHeader'>
            <h4>🌝</h4>
            <h2>Алина Черейская</h2>
          </div>
          <div>
            <p>сооснователь платформы Kodiia, архитектор и партнер SA lab, вычислительный дизайнер, преподаватель международных образовательных программ в области алгоритмического проектирования, процедурного и генеративного дизайна</p>
          </div>
        </div>

        <div class='card'>
          <div class='cardHeader'>
            <h4>🌚</h4>
            <h2>Степан Кухарский</h2>
          </div>
          <div>
            <p>сооснователь платформы Kodiia, архитектор и партнер SA lab, вычислительный дизайнер, преподаватель международных образовательных программ в области алгоритмического проектирования, процедурного и генеративного дизайна</p>
          </div>
        </div>
      </div>
    </div>

    <div class='subscribeDataContainer'>
      <h2>Записаться на курс</h2>
      <div class='footerContainer'>
      <!-- <button class='subscribeButtonWhite'>Оставить заявку</button> -->
      <p class='infoText'>Свяжитесь c Вашим менеджером в Brainhub для записи на курс</p>
      <h2>Emoji Fest | 05.12-15.12</h2>
      </div>
    </div>

    <div class='logosContainer'>
      <!-- <img src={brainhub_logo} alt='brainhub logo' width='135'/>
      <img src={kodiia_logo_bw} alt='kodiia logo' width='70'/> -->
      <p>Ждем Вас на занятиях! 💜</p>
    </div>
</div>
</div>

<style>
    .container{
        width: 100%;
        max-width: 800px;
        padding: 0 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    iframe{
        margin: 0;
        padding: 0;
        border: 0;
        width: 100%;
        height: 300px;
        overflow: hidden;
        touch-action: none;
        border-radius: 10px; 
        /* box-shadow: 0 0 10px #3d95ee50; */
    }

    .logosContainer{
      width: 100%;
      height: 40px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .logosContainer h2{
      margin: 0;
    }

    .scriptContainer{
        width: min(100%, 800px);
        position: relative;

    }

    .headerContainer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #4433fbc0;
      color: #f9f9f9;
      margin: 10px;
      padding: 0 20px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      /* box-shadow: 0 0 10px #3d95ee50; */
      /* background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30px" height="20px"><text x="5" y="15" font-family="FontAwesome">🍩</text></svg>'); */
    }
    /* .headerContainer h1{
      padding: 10px;
      background: #f9f9f9;

    } */

    .footerContainer{
      display: flex;
      justify-content: space-between;
      align-items: center;

      background: #4433fbc0;
      color: #f9f9f9;
      margin: 10px 0;
      padding: 0 20px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
    }

    .cardsContainer, .tutorsCardsContainer{
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .card{
      position: relative;
      background: #fed4ff;
      /* color: #f9f9f9; */
      padding: 30px 20px;
      box-sizing: border-box;
      min-height: 300px;
      border-radius: 10px;
      /* box-shadow: 0 0 10px #3d95ee50; */

      display: flex;
      flex-direction: column;
      /* justify-content: space-between; */
    }
    .cardHeader{
      height: 100px;
    }
    .card h4{
      margin: 0;
    }
    .card h2{
      margin: 10px 0;
    }
    .card ul{
      font-size: 1rem;
      padding-inline-start: 20px;
    }
    .card li{
      margin-left: 0;
    }

    .subscribeDataContainer{
      width: 100%;
    }

    @media (max-width: 700px){
      .cardsContainer, .tutorsCardsContainer{
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    }

    .infoText{
      width: 50%;
      border: 1px dashed #f9f9f9;
      border-radius: 10px;
      padding: 5px;

    }

    .subscribeButton{
      font-size: 1.5rem;
      background: #4233fb;
      color: #f9f9f9;
    }
    .subscribeButton:hover{
      box-shadow: 0 0 20px #3d95ee;
    }

    .subscribeButtonWhite{
      font-size: 1.5rem;
      background: none;
      color: #f9f9f9;
      border: 2px solid #f9f9f9;
      margin: 0;
      height: 80%;
    }
    .subscribeButtonWhite:hover{
      background: #f9f9f9;
      color: #4233fb;
    }

</style>