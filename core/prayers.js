
var englishRosaryPrayers = {
  'SOTC':  'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',

'CREED': 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',

'OF': 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',

'HM': 'Hail Mary, full of grace! The Lord is with thee; Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, Pray for us sinners, now and at the hour of our death. Amen.',

'GB': 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',

'FP': 'O my Jesus, forgive us of our sins. Save us from the fires of hell. Lead all souls into heaven, especially those in most need of thy mercy. Amen.',
JM1: 'The Annunciation',
JM2: 'The Visitation', 
JM3: 'The Nativity' ,
JM4: 'The Presentation in the Temple',
JM5: 'The Finding in the Temple',

LM1: 'The Baptism of Jesus', 
LM2: 'The Wedding of Cana',
LM3: 'The Proclamation of the Kingdom', 
LM4: 'The Transfiguration',
LM5: 'The Institution of the Eucharist', 

SM1: 'The Agony in the Garden', 
SM2: 'The Scourging at the Pillar', 
SM3: 'The Crowning with Thorns', 
SM4: 'The Carrying of the Cross', 
SM5: 'The Crucifixion', 
GM1: 'The Resurrection', 
GM2: 'The Ascension', 
GM3: 'The Coming of the Holy Spirit', 
GM4: 'The Assumption of Mary',
GM5: 'The Coronation of Mary',
FHC: 'Faith Hope & Charity'
};

var rosary = function(ln){

  if(ln === 'en'){
  	return englishRosaryPrayers;
  }
  return englishRosaryPrayers;
};

console.log('hello');
module.exports = rosary;