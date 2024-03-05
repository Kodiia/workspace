<script>
	import { onMount } from "svelte";

  import { width } from '$lib/store';

    let container 
    function createSVG(width = 200, height = 200, cutHeight = 20, strokeColor = 'black', fillColor = 'blue', contourState = false, containerElement = '', id = 'card', SVGscale = 1){
    let container = document.createElement('div')
    container.id = id;
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '1';
    container.style.transform = 'scale(' + SVGscale + ')';
    // container.className = 'card'
    
    const containerWidth = width
    const containerHeight = height
    const containerOffset = 5
    const boxWidth = containerWidth / Math.floor(containerWidth / 70) 
    const boxHeight = cutHeight
    let radius
    boxWidth > boxHeight ? radius = boxHeight / 2.1 : radius = boxWidth / 2.1
    const topCoords = createTopBlocks(containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius)
    const bottomCoords = createBottomBlocks(containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius)
    
    function createTopBlocks(containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius){
    let topCoords = []
    for(let i=0; i<containerWidth/boxWidth; i++){
      if(Math.random()>0.5){
        // const box = document.createElement('div')
        // box.style.width = boxWidth + 'px'
        // box.style.height = boxHeight + 'px'
        // box.style.background = 'rgba(250,250,250,0.05)'
        // box.style.position = 'absolute'
        // box.style.top = 0
        // box.style.left = i * boxWidth + 'px'
        // container.appendChild(box)
        topCoords.push({
          object: true,
          topLeft: (i * boxWidth + containerOffset) + ' ' + (0 + containerOffset),
          topLineStart: (i * boxWidth + containerOffset + radius) + ' ' + (0 + containerOffset),
          topLineEnd: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (0 + containerOffset),
          topRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (0 + containerOffset),
          rightLineStart: (i * boxWidth + boxWidth + containerOffset) + ' ' + (0 + containerOffset + radius),
          rightLineEnd: (i * boxWidth + boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset - radius),
          bottomRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset),
          bottomLineStart: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (boxHeight + containerOffset),
          bottomLineEnd: (i * boxWidth + containerOffset + radius) + ' ' + (boxHeight + containerOffset),
          bottomLeft: (i * boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset),
          leftLineStart: (i * boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset - radius),
          leftLineEnd: (i * boxWidth + containerOffset) + ' ' + (0 + containerOffset + radius)
        })
      } else {
        topCoords.push({
          object: false,
          topLeft: (i * boxWidth + containerOffset) + ' ' + (0 + containerOffset),
          topLineStart: (i * boxWidth + containerOffset + radius) + ' ' + (0 + containerOffset),
          topLineEnd: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (0 + containerOffset),
          topRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (0 + containerOffset),
          rightLineStart: (i * boxWidth + boxWidth + containerOffset) + ' ' + (0 + containerOffset + radius),
          rightLineEnd: (i * boxWidth + boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset - radius),
          bottomRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset),
          bottomLineStart: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (boxHeight + containerOffset),
          bottomLineEnd: (i * boxWidth + containerOffset + radius) + ' ' + (boxHeight + containerOffset),
          bottomLeft: (i * boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset),
          leftLineStart: (i * boxWidth + containerOffset) + ' ' + (boxHeight + containerOffset - radius),
          leftLineEnd: (i * boxWidth + containerOffset) + ' ' + (0 + containerOffset + radius)
        })
      }
    }
    return topCoords
  }
  
  function createBottomBlocks(containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius){
    let bottomCoords = []
    for(let i=0; i<containerWidth/boxWidth; i++){
      if(Math.random()>0.5){
        // const box = document.createElement('div')
        // box.style.width = boxWidth + 'px'
        // box.style.height = boxHeight + 'px'
        // box.style.background = 'rgba(255,255,255,0.05)'
        // box.style.position = 'absolute'
        // box.style.bottom = 0
        // box.style.left = i * boxWidth + 'px'
        // container.appendChild(box)
        bottomCoords.push({
          object: true,
          topLeft: (i * boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset),
          topLineStart: (i * boxWidth + containerOffset + radius) + ' ' + (containerHeight - boxHeight - containerOffset),
          topLineEnd: (i * boxWidth + containerOffset - radius) + ' ' + (containerHeight - boxHeight - containerOffset),
          topRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset),
          rightLineStart: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset + radius),
          rightLineEnd: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset - radius),
          bottomRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset),
          bottomLineStart: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (containerHeight - containerOffset),
          bottomLineEnd: (i * boxWidth + containerOffset + radius) + ' ' + (containerHeight - containerOffset),
          bottomLeft: (i * boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset),
          leftLineStart: (i * boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset - radius),
          leftLineEnd: (i * boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset + radius)
        })
      } else {
        bottomCoords.push({
          object: false,
          topLeft: (i * boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset),
          topLineStart: (i * boxWidth + containerOffset + radius) + ' ' + (containerHeight - boxHeight - containerOffset),
          topLineEnd: (i * boxWidth + containerOffset - radius) + ' ' + (containerHeight - boxHeight - containerOffset),
          topRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset),
          rightLineStart: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset + radius),
          rightLineEnd: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset - radius),
          bottomRight: (i * boxWidth + boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset),
          bottomLineStart: (i * boxWidth + boxWidth + containerOffset - radius) + ' ' + (containerHeight - containerOffset),
          bottomLineEnd: (i * boxWidth + containerOffset + radius) + ' ' + (containerHeight - containerOffset),
          bottomLeft: (i * boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset),
          leftLineStart: (i * boxWidth + containerOffset) + ' ' + (containerHeight - containerOffset - radius),
          leftLineEnd: (i * boxWidth + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset + radius)
        })
      }
    }
    return bottomCoords
  }
  
  function getTurnCoordinates(point, turnCase, radius){
    let coords = point.split(' ')
    let pointsQ = ''
    switch (turnCase){
      case 'rightUp':
        pointsQ += point + ' ' + coords[0] + ' ' + (Number(coords[1]) - radius)
        break;
      case 'rightDown':
        pointsQ += point + ' ' + coords[0] + ' ' + (Number(coords[1]) + radius)
        break;
      case 'upRight':
        pointsQ += point + ' ' + (Number(coords[0]) + radius) + ' ' + coords[1]
        break;
      case 'downRight':
        pointsQ += point + ' ' + (Number(coords[0]) + radius) + ' ' + coords[1]
        break;
      case 'downLeft':
        pointsQ += point + ' ' + (Number(coords[0]) - radius) + ' ' + (Number(coords[1]))
        break;
      case 'leftDown':
        pointsQ += point + ' ' + (Number(coords[0])) + ' ' + (Number(coords[1]) + radius)
        break;
      case 'leftUp':
        pointsQ += point + ' ' + (Number(coords[0])) + ' ' + (Number(coords[1]) - radius)
        break;
      case 'upLeft':
        pointsQ += point + ' ' + (Number(coords[0]) - radius) + ' ' + (Number(coords[1]))
        break;
    }
    // console.log(pointsQ)
    return pointsQ
  }
  
  function setTopCoordinatesString(topCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius){
    let firstPoint, firstTurnPoint, finalPoint, finalTurnPoint
    if(topCoords[0].object === true){
      firstPoint = (0 + containerOffset) + ' ' + (boxHeight + containerOffset + radius)
      firstTurnPoint = (0 + containerOffset) + ' ' + (boxHeight + containerOffset)
    } else {
      firstPoint = (0 + containerOffset) + ' ' + (0 + containerOffset + radius)
      firstTurnPoint = (0 + containerOffset) + ' ' + (0 + containerOffset)
    }
    if(topCoords[topCoords.length - 1].object === true){
      finalPoint = (containerWidth - containerOffset - radius) + ' ' + (boxHeight + containerOffset)
      finalTurnPoint = (containerWidth - containerOffset) + ' ' + (boxHeight + containerOffset)
    } else {
      finalPoint = (containerWidth - containerOffset - radius) + ' ' + (0 + containerOffset)
      finalTurnPoint = (containerWidth - containerOffset) + ' ' + (0 + containerOffset)
    }
  
    let str = 'M ' + firstPoint + ' ' + ' Q' + getTurnCoordinates(firstTurnPoint, 'upRight', radius) + ' '
    
    for(let i=0; i<topCoords.length-1; i++){
      if(topCoords[i].object === true){
        if(topCoords[i + 1].object === false){
          str += ' L' + topCoords[i].bottomLineStart + 'Q' + getTurnCoordinates(topCoords[i].bottomRight, 'rightUp', radius) + ' L' + topCoords[i].rightLineEnd + ' ' + topCoords[i].rightLineStart + ' Q' + getTurnCoordinates(topCoords[i].topRight, 'upRight', radius) + ' '
          // str += ' L' + topCoords[i].rightLineStart + ' ' + topCoords[i].rightLineEnd + ' ' //+ ' Q' + getTurnCoordinates(topCoords[i].topRight, 'upRight');
        }
        if(topCoords[i + 1].object === true){
          // str += ' L' + topCoords[i].bottomRight + ' '
          str += ' L' + topCoords[i].bottomLineStart + ' '
        }
      }
      if(topCoords[i].object === false){
        if(topCoords[i + 1].object === false){
          // str += ' L' + topCoords[i].topRight + ' '
          str += ' L' + topCoords[i].topLineStart + ' '
        }
        if(topCoords[i + 1].object === true){
          // str += ' L' + topCoords[i].topRight + ' ' + topCoords[i].bottomRight + ' '
          str += ' L' + topCoords[i].topLineEnd + ' Q' + getTurnCoordinates(topCoords[i].topRight, 'rightDown', radius) + ' L' + topCoords[i].rightLineStart + ' ' + topCoords[i].rightLineEnd + ' Q' + getTurnCoordinates(topCoords[i].bottomRight, 'downRight', radius) + ' '
        }
      }
    }
    str += 'L' + finalPoint + ' ' + ' Q' + getTurnCoordinates(finalTurnPoint, 'rightDown', radius) + ' '
  //console.log(str)
    return str
  }
  
  function setBottomCoordinatesString(bottomCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius){
    let firstPoint, firstTurnPoint, finalPoint, finalTurnPoint
    if(bottomCoords[bottomCoords.length - 1].object === true){
      firstPoint = (containerWidth - containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset - radius)
      firstTurnPoint = (containerWidth - containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset)
    } else {
      firstPoint = (containerWidth - containerOffset) + ' ' + (containerHeight - containerOffset - radius)
      firstTurnPoint = (containerWidth - containerOffset) + ' ' + (containerHeight - containerOffset)
    }
    if(bottomCoords[0].object === true){
      finalPoint = (0 + containerOffset + radius) + ' ' + (containerHeight - boxHeight - containerOffset)
      finalTurnPoint = (0 + containerOffset) + ' ' + (containerHeight - boxHeight - containerOffset)
    } else {
      finalPoint = (0 + containerOffset + radius) + ' ' + (containerHeight - containerOffset)
      finalTurnPoint = (0 + containerOffset) + ' ' + (containerHeight - containerOffset)
    }
    
    let str = ' L' + firstPoint + ' ' + ' Q' + getTurnCoordinates(firstTurnPoint, 'downLeft', radius) + ' '
    
    for(let i=bottomCoords.length-1; i > 0; i--){
      if(bottomCoords[i].object === true){
        if(bottomCoords[i - 1].object === false){
          // str += ' L' + bottomCoords[i].topLeft + ' ' + bottomCoords[i].bottomLeft + ' '
          str += ' L' + bottomCoords[i].topLineStart + ' Q' +  getTurnCoordinates(bottomCoords[i].topLeft, 'leftDown', radius) + ' L' + bottomCoords[i].leftLineStart + ' Q' +  getTurnCoordinates(bottomCoords[i].bottomLeft, 'downLeft', radius) + ' '
        }
        if(bottomCoords[i - 1].object === true){
          str += ' L' + bottomCoords[i].topLineStart + ' '
        }
      }
      if(bottomCoords[i].object === false){
        if(bottomCoords[i - 1].object === false){
          str += ' L' + bottomCoords[i].bottomLineEnd + ' '
        }
        if(bottomCoords[i - 1].object === true){
          str +=  ' L' + bottomCoords[i].bottomLineEnd + ' Q' + getTurnCoordinates(bottomCoords[i].bottomLeft, 'leftUp', radius) + ' L' + bottomCoords[i].leftLineEnd + ' ' + ' Q' + getTurnCoordinates(bottomCoords[i].topLeft, 'upLeft', radius) + ' '
        }
      }
    }
    str += ' L' + finalPoint + ' Q' + getTurnCoordinates(finalTurnPoint, 'leftUp', radius) + 'Z'
  // console.log(str)
    return str
  }
  
  function setFrameCoordinates(containerWidth, containerHeight){
    let str = ''
    str += ' M 0 0 L' + containerWidth + ' 0 L' + containerWidth + ' ' + containerHeight + ' L 0 ' + containerHeight + ' Z'
    return str
  }
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    line.id='svg'
    line.setAttribute('width', containerWidth)
    line.setAttribute('height', containerHeight)
    // line.style.filter = 'drop-shadow(0px 0px 50px white)'
    const group = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    const linePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    linePath.setAttribute('fill', fillColor);
    linePath.setAttribute('viewBox', '0 0 ' + containerWidth + ' ' + containerHeight);
    // linePath.setAttribute('stroke', '#8ffe09');
    linePath.setAttribute('stroke', strokeColor);
    linePath.setAttribute('fill-rule', 'evenodd');
    
    // if(contourState){
    //   linePath.setAttribute(
    //     'd',
    //     setTopCoordinatesString(topCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius) + setBottomCoordinatesString(bottomCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius) + setFrameCoordinates(containerWidth, containerHeight)
    //   );
    // }else{
    //   linePath.setAttribute(
    //     'd',
    //     setTopCoordinatesString(topCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius) + setBottomCoordinatesString(bottomCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius)// + setFrameCoordinates(containerWidth, containerHeight)
    //   );
    // }
    // linePath.setAttribute('stroke-linecap', 'round');
    // linePath.setAttribute('stroke-linejoin', 'round');
    // linePath.setAttribute('stroke-width', '1');
  
    // group.appendChild(linePath)
    // line.appendChild(group);
    
  //   const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
  //   image.setAttribute('href', 'http://placekitten.com/600/400')
    
  //   line.appendChild(image)
    
    // container.appendChild(line)
    // containerElement.appendChild(container)

    let pathData = setTopCoordinatesString(topCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius) + setBottomCoordinatesString(bottomCoords, containerWidth, containerHeight, boxWidth, boxHeight, containerOffset, radius)// + setFrameCoordinates(containerWidth, containerHeight)

    return pathData
  }


export let imageUrl = '/api/images/courses/8vuzxx3aug1e42w/caYTNNOM8q7V_wHy79LH0FW.webp'

export let containerWidth = 200
let SVGpath

onMount(()=>{
  SVGpath = createSVG(containerWidth, containerWidth, 20)
})

width.subscribe(()=>{
  SVGpath = createSVG(containerWidth, containerWidth, 20)
})
  
</script>

<div bind:this = {container} bind:clientWidth={containerWidth} style='width: 100%'>
    <svg width='100%' height='100%' viewBox='0 0 {containerWidth} {containerWidth}'>
        <g>
            <path d={SVGpath} fill='#0000ff00'></path>
        </g>
    </svg>
    
    <div style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: grey; background-image: url({imageUrl}); background-size: cover; background-position: center; clip-path: path("{SVGpath}");'>

    </div>
</div>