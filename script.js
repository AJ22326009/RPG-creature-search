const creaturesLink='https://rpg-creature-api.freecodecamp.rocks/api/creatures';

const fetchCreatureDetails= async (identifier)=>{
  try{
    const res=await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${identifier}`)
    const data=await res.json();

    return data;
  }catch(err){
    console.log('There was an error in fetching the creature details', err)
  }
}

const showInUI= async (creatureDetails)=>{
  if (!creatureDetails) {
    return;
  }

  document.getElementById('creature-name').textContent=creatureDetails.name;
  document.getElementById('creature-id').textContent='#'+creatureDetails.id;
  document.getElementById('weight').textContent='Weight: '+creatureDetails.weight;
  document.getElementById('height').textContent='Height: '+creatureDetails.height;
  document.getElementById('s-name').textContent=creatureDetails.special.name;
  document.getElementById('s-description').textContent=creatureDetails.special.description;

  document.getElementById('hp').textContent=creatureDetails.stats[0].base_stat;
  document.getElementById('attack').textContent=creatureDetails.stats[1].base_stat;
  document.getElementById('defense').textContent=creatureDetails.stats[2].base_stat;
  document.getElementById('special-attack').textContent=creatureDetails.stats[3].base_stat;
  document.getElementById('special-defense').textContent=creatureDetails.stats[4].base_stat;
  document.getElementById('speed').textContent=creatureDetails.stats[5].base_stat;

  const typesContainer=document.getElementById('types');
  const types=creatureDetails.types;
  typesContainer.innerHTML=''
  for(let i=0;i<types.length;i++){
    const newElement=document.createElement('span');
    newElement.classList.add('type');
    const type=types[i].name;
    newElement.textContent=type;
    let color='';
    
    switch (type){
      case 'grass':
      color='rgb(50, 205, 50)';
      break;
      case 'poison':
      color='rgb(0, 255, 60)'
      break;
      case 'fire':
      color='rgb(255, 0, 0)'
      break;
      case 'rock':
      color='rgb(128, 128, 128)'
      break;
      case 'water':
      color='rgb(173, 216, 230)'
      break;
      case 'electric':
      color='rgb(0, 255, 255)'
      break;
      case 'dragon':
      color='rgb(178, 34, 34)'
      break;
      case 'ice':
      color='rgb(173, 216, 230)'
      break;
      case 'fairy':
      color='rgb(221, 160, 221)'
      break;
      case 'ground':
      color='rgb(139, 69, 19)'
      break;
      case 'flying':
      color='rgb(135, 206, 235)'
      break;
      case 'bug':
      color='rgb(80, 80, 0)'
      break;
      case 'psychic':
      color='rgb(128, 0, 128)'
      break;
      case 'steel':
      color='rgb(112, 128, 144)'
      break;
      case 'ghost':
      color='rgb(240, 248, 255)'
      break;
      default:
      color='rgb(100, 100, 100)';
    }

    newElement.style.backgroundColor=color;
    typesContainer.appendChild(newElement);
  }
}

const fetchData= async (input)=>{
  try{
    const number=Number(input);
    let creatureData;

    if(typeof number==='number' && !Number.isNaN(number)){
      creatureData = await fetchCreatureDetails(number);
    }else{
      creatureData = await fetchCreatureDetails(input.toLowerCase());
    }

    if (creatureData) {
            showInUI(creatureData);
        } else {
            alert('Creature not found!');
        }
  }catch(err){
    console.log("There was an error: ", err)
  }
}

document.getElementById('form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const input=document.getElementById('search-input').value.trim();
  fetchData(input)
})