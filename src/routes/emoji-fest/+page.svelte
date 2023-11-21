<script>
import {width, height} from '$lib/store'
let script = `let sketch = function(p) {
  let x = 200;
  let y = 200;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background('white');
  };

  p.draw = function() {
    x += (Math.random() - 0.5) * 5;
    y += (Math.random() - 0.5) * 5;
    p.fill('blue');
    p.textSize(80);
    p.text('👾', x, y);
  };

  p.windowResized = function(){
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    p.setup()
  };
};

let myp5 = new p5(sketch);`

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
        }
        </style>
   <script type='module'>${script}<\/script> 
    </body>
</html>
`

   



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
    <div class='scriptContainer'>
        <iframe srcDoc={code} sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation" title='code'/>
    </div>
<h1>Emoji Fest</h1>
<p>Фестиваль Эмодзи - курс для начинающих программистов, где изучаются основы HTML, CSS, JavaScript и p5.js. На каждом из четырех занятий участники разрабатывают уникальные проекты. Курс помогает получить практические навыки веб-разработки, знакомит с генеративным дизайном - области программирования для создания художественных проектов, а также вдохновляет на создание собственных проектов.</p>
</div>
</div>

<style>
    .container{
        width: 100%;
        max-width: 800px;
        padding: 10px;

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
    }

    .scriptContainer{
        width: min(100%, 800px);

    }
</style>