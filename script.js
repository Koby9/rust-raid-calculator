import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const buildingItems = [
    {
        name: 'Wood Wall',
        exploAmmo: 49,
        satchel: 3,
        c4: 1,
        rocket: 2,
        image: 'wooden-wall.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Stone Wall',
        exploAmmo: 185,
        satchel: 10,
        c4: 2,
        rocket: 4,
        image: 'stone-wall.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Metal Wall',
        exploAmmo: 400,
        satchel: 23,
        c4: 4,
        rocket: 8,
        image: 'metal-wall.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Armored Wall',
        exploAmmo: 799,
        satchel: 46,
        c4: 8,
        rocket: 15,
        image: 'armored-wall.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Wooden Door',
        exploAmmo: 19,
        satchel: 2,
        c4: 1,
        rocket: 1,
        image: 'wood-door.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Sheet Metal Door',
        exploAmmo: 63,
        satchel: 4,
        c4: 1,
        rocket: 2,
        image: 'metal-door.jpg',
        amountSelected: 0,
        uuid: uuidv4()
    },
    {
        name: 'Armored Door',
        exploAmmo: 250,
        satchel: 15,
        c4: 3,
        rocket: 5,
        image: 'armored-door.png',
        amountSelected: 0,
        uuid: uuidv4()
    }
]

const explosives = [
    {
        name: 'exploAmmo',
        sulfurCost: 50,
        metalCost: 10,
        charcoalCost: 60,
        image: 'explo-ammo.png',
        isSelected: false,
        uuid: uuidv4(),
        amountRequired: 0
    },
    {
        name: 'satchel',
        sulfurCost: 480,
        metalCost: 80,
        charcoalCost: 720,
        image: 'satchel.png',
        isSelected: false,
        uuid: uuidv4(),
        amountRequired: 0
    },
    {
        name: 'c4',
        sulfurCost: 2200,
        metalCost: 200,
        charcoalCost: 3000,
        image: 'c4.png',
        isSelected: false,
        uuid: uuidv4(),
        amountRequired: 0
    },
    {
        name: 'rocket',
        sulfurCost: 1400,
        metalCost: 100,
        charcoalCost: 1950,
        image: 'rocket.png',
        isSelected: false,
        uuid: uuidv4(),
        amountRequired: 0
    },
]

document.addEventListener('click', function(e){
    if (e.target.dataset.raidBuilding) {
        handleBuildingItemsClick(e.target.dataset.raidBuilding)
    }
    else if (e.target.id === 'clear-btn'){
        eraseBuildingItemsCounter()
    }
    else if (e.target.dataset.explosive) {
        handleExplosivesClick(e.target.dataset.explosive)
    }
})


function handleBuildingItemsClick(raidDefenseId) {
    const targetRaidDefenseObject = buildingItems.filter(function(item){
        return item.uuid === raidDefenseId
    })[0]
    targetRaidDefenseObject.amountSelected++

    
    renderBuildingItems()
    calculateResourcesNeeded(targetRaidDefenseObject)
    renderExplosives()
    handleExplosivesSelectionClick()
    renderRaidCost()
}

function handleExplosivesClick(explosiveId){
    const targetObject = explosives.filter(function(explo){
        return explo.uuid === explosiveId
    })[0]
    explosives.forEach(function(explo){
        explo.isSelected = false
    })
    targetObject.isSelected = !targetObject.isSelected
    handleExplosivesSelectionClick()
    renderRaidCost()
}

function handleExplosivesSelectionClick(){
    explosives.forEach(function(explo){
        const targetDiv = document.getElementById(`explo-${explo.uuid}`)
        const targetCounter = document.getElementById(`counter-${explo.uuid}`)
        if (explo.isSelected){
            targetCounter.classList.remove('hidden')
        } else {
            targetCounter.classList.add('hidden')
        }
    })
}

function calculateResourcesNeeded(buildingItem){
    let exploAmmoTotal = 0
    let satchelTotal = 0
    let c4Total = 0
    let rocketTotal = 0

    buildingItems.forEach(function(item){
        exploAmmoTotal += item.amountSelected * item.exploAmmo
        satchelTotal += item.amountSelected * item.satchel
        c4Total += item.amountSelected * item.c4
        rocketTotal += item.amountSelected * item.rocket
    })
    explosives.forEach(function(explo){
        if (explo.name === 'exploAmmo'){
            explo.amountRequired = exploAmmoTotal
        } else if (explo.name === 'satchel'){
            explo.amountRequired = satchelTotal
        } else if (explo.name === 'c4'){
            explo.amountRequired = c4Total
        } else if (explo.name === 'rocket'){
            explo.amountRequired = rocketTotal
        }
    })
    
}

function eraseBuildingItemsCounter(){
    buildingItems.forEach(function(item){
        item.amountSelected = 0
    })
    explosives.forEach(function(explo){
        explo.amountRequired = 0
    })
    renderAll()
    handleExplosivesSelectionClick()
}

function renderAll(){
    renderBuildingItems()
    renderExplosives()
    renderRaidCost()
}

function renderBuildingItems() {
    let raidDefenseList = ''
    buildingItems.forEach(function(item){
        if (item.amountSelected){
            raidDefenseList += `<div style="background-image:url('/images/${item.image}')" data-raid-building="${item.uuid}" class="defense-item"><p class="defense-item-counter">${item.amountSelected}</p></div>`
        } else {
            raidDefenseList += `<div style="background-image:url('/images/${item.image}')" data-raid-building="${item.uuid}" class="defense-item"></div>`
        }
    })
    raidDefenseList += `<img style="width:30px; height:30px;" src="images/clear-symbol.png" alt="" id="clear-btn">`

    document.getElementById('select-buildings-container').innerHTML = raidDefenseList
}


function renderExplosives() {
    let raidExplosiveList = ''
    explosives.forEach(function(explo){
        raidExplosiveList += `<div style='background-image:url("images/${explo.image}")' class="raid-items" data-explosive="${explo.uuid}" id="explo-${explo.uuid}"><p class="explo-counter" id="counter-${explo.uuid}">${explo.amountRequired}</p></div>`
    })

    document.getElementById('explosives-container').innerHTML = raidExplosiveList
}

function renderRaidCost(){
    let renderedHtml = ''
    explosives.forEach(function(explo){
        if(explo.isSelected){
             renderedHtml = `
            <p>Sulfur Required: ${explo.sulfurCost * explo.amountRequired}</p>
            <p>Metal Frags Required: ${explo.metalCost * explo.amountRequired}</p>
            <p>Charcoal Required: ${explo.charcoalCost * explo.amountRequired}</p>
            `
        }
    })
    document.getElementById('cost-container').innerHTML = renderedHtml
}

renderAll()
handleExplosivesSelectionClick()