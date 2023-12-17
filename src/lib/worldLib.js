export const lib = [
    {
        name: 'rotateX',
        description: 'Rotate along X axis.',
        use: 'rotateX(0.1)',
        code: 'let rotateX = function(num = 0) { object.rotation.x += num; };'
    },
    {
        name: 'rotateY',
        description: 'Rotate along Y axis.',
        use: 'rotateY(0.1)',
        code: 'let rotateY = function(num = 0) { object.rotation.y += num; };'
    },
    {
        name: 'rotateZ',
        description: 'Rotate along Z axis.',
        use: 'rotateZ(0.1)',
        code: 'let rotateZ = function(num = 0) { object.rotation.z += num; };'
    },
    {
        name: 'moveX',
        description: 'Move along X axis.',
        use: 'moveX(0.1)',
        code: 'let moveX = function(num = 0) { object.position.x += num; };'
    },
    {
        name: 'moveY',
        description: 'Move along Y axis.',
        use: 'moveY(0.1)',
        code: 'let moveY = function(num = 0) { object.position.y += num; };'
    },
    {
        name: 'moveZ',
        description: 'Move along Z axis.',
        use: 'moveZ(0.1)',
        code: 'let moveZ = function(num = 0) { object.position.z += num; };'
    },
    {
        name: 'moveYBetween',
        description: 'Move along Y axis between two values.',
        use: 'moveYBetween(1, 10)',
        code: 'let moveYBetween = function(pointA = 0, pointB = 0) { object.position.y += object.speed; if (object.position.y > pointB || object.position.y < pointA){object.speed = -object.speed}};'
    }
]