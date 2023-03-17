const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite(
    {position: {
    x: 0,
    y: 0
    },
    image: battleBackgroundImage
})
// Thêm nhân vật draggle, thêm nhân vật whales
let draggle
let whales = new Monster(monsters.Whales)
let renderedSprites = [draggle, whales]
let battleAnimationId
let queue

function initBattle() {
    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren()
    draggle = new Monster(monsters.Draggle)
    whales = new Monster(monsters.Whales)
    renderedSprites = [draggle, whales]
    queue = []

    whales.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

    // Attack
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) =>{
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        whales.attack({ 
            attack: selectedAttack,
            recipient: draggle,
            renderedSprites
        })

        if (draggle.health <= 0) {
            queue.push(() => {
                draggle.faint()  
            })
            queue.push(() => {
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#userInterface').style.display = 'none'
                        gsap.to('#overlappingDiv', {
                            opacity: 0
                        })
                        battle.initiated = false
                    }
                })
            })
            
        }

        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

        queue.push(() => {
            draggle.attack({ 
                attack: randomAttack,
                recipient: whales,
                renderedSprites
            })   
            if (whales.health <= 0) {
                queue.push(() => {
                    whales.faint()  
                })

                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 0
                            })

                            battle.initiated = false
                        }
                    })
                })
            }            
        })
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attackType').innerHTML = selectedAttack.type
        document.querySelector('#attackType').style.color = selectedAttack.color
        })
    })
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    
    console.log(battleAnimationId)

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

 animate()
// initBattle()
// animateBattle()


document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'   
})