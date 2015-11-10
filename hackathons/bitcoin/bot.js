//
// TODO: implement the logic to decide whether or not to make a trade
//
var words = {'apple': [0.0,0.0],
                'google': [0.0,0.0],
                'fun': [0.0,0.0],
                'game': [0.0,0.0],
                'news': [0.0,0.0],
                'money': [0.0,0.0],
                'good': [0.0,0.0],
                'actor': [0.0,0.0],
                'movies': [0.0,0.0],
                'tech': [0.0,0.0],
                'music': [0.0,0.0],
                'people': [0.0,0.0]}

function strength(slider){
    if (slider.length < 5){
        return
    }
  change = slider[0].price - slider[4].price

  if (slider[4].tweet.match(/fun/i)) {
    words['fun'][1] += 1
    words['fun'][0] += change/words['fun'][1]
  }
  else if (slider[4].tweet.match(/apple/i)) {
    words['apple'][1] += 1
    words['apple'][0] += change/words['apple'][1]
  }
  else if (slider[4].tweet.match(/google/i)) {
    words['google'][1] += 1
    words['google'][0] += change/words['google'][1]
  }
  else if (slider[4].tweet.match(/game/i)) {
    words['game'][1] += 1
    words['game'][0] += change/words['game'][1]
  }
  else if (slider[4].tweet.match(/news/i)) {
    words['news'][1] += 1
    words['news'][0] += change/words['news'][1]
  }
  else if (slider[4].tweet.match(/money/i)) {
    words['money'][1] += 1
    words['money'][0] += change/words['money'][1]
  }
  else if (slider[4].tweet.match(/good/i)) {
    words['good'][1] += 1
    words['good'][0] += change/words['good'][1]
  }
  else if (slider[4].tweet.match(/actor/i)) {
    words['actor'][1] += 1
    words['actor'][0] += change/words['actor'][1]
  }
  else if (slider[4].tweet.match(/movies/i)) {
    words['movies'][1] += 1
    words['movies'][0] += change/words['movies'][1]
  }
  else if (slider[4].tweet.match(/tech/i)) {
    words['tech'][1] += 1
    words['tech'][0] += change/words['tech'][1]
  }
  else if (slider[4].tweet.match(/music/i)) {
    words['music'][1] += 1
    words['music'][0] += change/words['music'][1]
  }
  else if (slider[4].tweet.match(/people/i)) {
    words['people'][1] += 1
    words['people'][0] += change/words['people'][1]
  }
}

function decideWhetherOrNotToTrade(tweet){
  var sum = 0
  if (tweet.match(/fun/i)) {
    sum += words['fun'][0]
  }
  if (tweet.match(/apple/i)) {
    sum += words['apple'][0]
  }
  if (tweet.match(/google/i)) {
    sum += words['google'][0]
  }
  if (tweet.match(/game/i)) {
    sum += words['game'][0]
  }
  if (tweet.match(/news/i)) {
    sum += words['news'][0]
  }
  if (tweet.match(/money/i)) {
    sum += words['money'][0]
  }
  if (tweet.match(/good/i)) {
    sum += words['good'][0]
  }
  if (tweet.match(/actor/i)) {
    sum += words['actor'][0]
  }
  if (tweet.match(/movies/i)) {
    sum += words['movies'][0]
  }
  if (tweet.match(/tech/i)) {
    sum += words['tech'][0]
  }
  if (tweet.match(/music/i)) {
    sum += words['music'][0]
  }
  if (tweet.match(/people/i)) {
    sum += words['people'][0]
  }

  if (sum > 0){
    if (bank.currency === 'USD'){
        return true
    } else {
        return false
    }
  } else if(sum < 0){
    if (bank.currency === 'USD'){
        return false
    } else {
        return true
    }
  } else{
    return false
  }
}