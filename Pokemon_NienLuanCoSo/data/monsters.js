const monsters = {
    Whales: {
        position: {
            x: 290,
            y: 330
        },
        image: {
            src: './img/whalesSprite.png'
        },
        frames: {
            max: 4,
            hold: 60
        },
        animate: true,
        name: 'Whales',
        attacks:[attacks.Tackle, attacks.Bubblegun, attacks.Icedrill, attacks.Waterball]
    },
    Draggle: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './img/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 40
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks:[attacks.Tackle, attacks.Shadowball, attacks.Fireball]
    }
}