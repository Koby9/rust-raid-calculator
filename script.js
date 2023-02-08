const buildingItems = [
    {
        name: 'Wood Wall',
        exploAmmo: 49,
        satchel: 3,
        c4: 1,
        rocket: 2,
        image: 'wooden-wall.jpg'
    },
    {
        name: 'Stone Wall',
        exploAmmo: 185,
        satchel: 10,
        c4: 2,
        rocket: 4,
        image: 'stone-wall.jpg'
    },
    {
        name: 'Metal Wall',
        exploAmmo: 400,
        satchel: 23,
        c4: 4,
        rocket: 8,
        image: 'metal-wall.jpg'
    },
    {
        name: 'Armored Wall',
        exploAmmo: 799,
        satchel: 46,
        c4: 8,
        rocket: 15,
        image: 'armored-wall.jpg'
    },
    {
        name: 'Wooden Door',
        exploAmmo: 19,
        satchel: 2,
        c4: 1,
        rocket: 1,
        image: 'wood-door.jpg'
    },
    {
        name: 'Sheet Metal Door',
        exploAmmo: 63,
        satchel: 4,
        c4: 1,
        rocket: 2,
        image: 'metal-door.jpg'
    },
    {
        name: 'Armored Door',
        exploAmmo: 250,
        satchel: 15,
        c4: 3,
        rocket: 5,
        image: 'armored-door.png'
    }
]

const craftingExplosiveCost = [
    {
        name: 'Explosive Ammo',
        sulfurCost: 50,
        metalCost: 10,
        charcoalCost: 60,
        image: 'explo-ammo.png'
    },
    {
        name: 'Satchel',
        sulfurCost: 480,
        metalCost: 80,
        charcoalCost: 720,
        image: 'satchel.png'
    },
    {
        name: 'C4',
        sulfurCost: 2200,
        metalCost: 200,
        charcoalCost: 3000,
        image: 'c4.png'
    },
    {
        name: 'Rocket',
        sulfurCost: 50,
        metalCost: 10,
        charcoalCost: 60,
        image: 'rocket.png'
    },
]

const selectBuildingsContainer = document.getElementById('select-buildings-container')
const buildingImages = document.getElementsByClassName('building-imgs')
const inputCountContainer = document.getElementById('input-count-container')
const exploAmmoTotal = document.getElementById('explo-ammo-total')
const satchelTotal = document.getElementById('satchel-total')
const c4Total = document.getElementById('c4-total')
const rocketTotal = document.getElementById('rocket-total')


selectBuildingsContainer.addEventListener('click', addBuildingItem)
inputCountContainer.addEventListener('click', clickRaidItem)

function addBuildingItem(e){
    if (e.target.classList.contains('building-imgs')){
        const counter = e.target.nextSibling
        e.target.classList.add('building-imgs-click')
        counter.textContent++
        calulateCost(counter.textContent, e.target.id)
    }
}

function clickRaidItem(e){
    console.log(e.target)
    if (e.target.classList.contains('raid-items-img')) {
        console.log(e.target.nextSibling)
    }
}

function calulateCost(amount, item) {
    let exploAmmo = 0
    let satchels = 0
    let c4 = 0
    let rockets = 0

    for (let buildingItem of buildingItems) {
        if (buildingItem.name === item){
            exploAmmo = buildingItem.exploAmmo
            satchels = buildingItem.satchel
            c4 = buildingItem.c4
            rockets = buildingItem.rocket
        }
    }
    exploAmmoTotal.textContent = parseInt(exploAmmoTotal.textContent) + exploAmmo
    satchelTotal.textContent = parseInt(satchelTotal.textContent) + satchels
    c4Total.textContent = parseInt(c4Total.textContent) + c4
    rocketTotal.textContent = parseInt(rocketTotal.textContent) + rockets
}

function renderBuildingItems() {
    for (let buildingItem of buildingItems) {
        const img = document.createElement('img')
        const div = document.createElement('div')
        const p = document.createElement('p')
        div.classList.add('building-item-div')
        p.classList.add('item-counter')
        img.classList.add('building-imgs')
        img.setAttribute('id', buildingItem.name)
        img.src = `./images/${buildingItem.image}`
        selectBuildingsContainer.append(div)
        div.append(img)
        div.append(p)
    }
}


renderBuildingItems()