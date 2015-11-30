function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the desensity of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  return _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(value){
      return value > 0
    })
    .uniq()
    .size()
    .value()
}

function func2(){
 var tlast = items[334].Ping_time.split(':')
 var tlastsec = parseInt(tlast[0]) * 3600 + parseInt(tlast[1]) * 60 + parseInt(tlast[2])

 var t0 = items[0].Ping_time.split(':')
 var t0sec = parseInt(t0[0]) * 3600 + parseInt(t0[1]) * 60 + parseInt(t0[2])

 return Math.round((tlastsec - t0sec)/335) + ' seconds'
}

function func3(){
  return _.chain(items)
    .find({'Ping_time': '09:57:18'})
    .map('Samples')
    .filter(function(value){
      return parseInt(value) == 7
    })
    .size()
    .value()
}

function func4(){
  return _.chain(items)
    .map(function(item){
      var count = _.filter(item.Samples, function(value){
        return parseInt(value) == 3
      }).length
      return {'index': item.Ping_index, 'count': count} 
    })
    .sortBy('count').reverse()
    .value()[0]['index']
}

function func5(){
  return _.chain(items)
    .map(function(item){
      return _.every(item.Samples, function(value){
        return parseInt(value) <= 0
      })
    })
    .filter(function(value){
      return value == true
    })
    .size()
    .value()
  }

function func6(){
  var mostCommon = _.chain(items)
    .map('Samples')
    .flatten()
    .filter(function(value){
      return value > 0
    })
    .countBy(function(value){
      return value
    })
    .value()

    return _.invert(mostCommon)[_.max(mostCommon)]
}

function func7(){
  var NYC = [40.7127, 74.0059]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height

  var longest = _.max(items, function(item){
    var pos = [item.Latitude, item.Longitude]
    var d = geolib.getDistance(NYC, pos)
    return geolib.convertUnit('mi', d)
  })

  var boat = [longest.Latitude, longest.Longitude]

  var map = createMap(el, boat, 5)

  var circle = L.circle(boat, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map)

  return geolib.getDistance(
      {latitude: NYC[0], longitude: NYC[1]},
      {latitude: boat[0], longitude: boat[1]}
    )

}

function func8(){
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 11)

  _.forEach(items, function(item){
    var circle = L.circle([item.Latitude, item.Longitude], 20, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })
}

function func9(){
  var mostCommon = func6()

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 11)

  _.forEach(items, function(item){
    if (_.includes(item.Samples, mostCommon)) {
      var circle = L.circle([item.Latitude, item.Longitude], 20, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
    }
  })
}

function func10(){
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 11)

  _.forEach(items, function(item){
      var density = _.sum(item.Samples, function(sample){
        if (sample > 0){
          return sample
        }
      })/1000
      if (density > 1) density = 1.0
      if (density <= .05) color = '#FFC1C1'
      else if (density <= .1) color = '#FF6A6A'
      else if (density <= .5) color = '#FF7256'
      else color = '#FF2400'
      console.log(density)
      var circle = L.circle([item.Latitude, item.Longitude], 20, {
        color: color,
        fillColor: '#f03',
        fillOpacity: .5
      }).addTo(map);
  })
}

function func11(){
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 11)

  var fishSamples = _.filter(items, function(value){
    return _.contains(value.Samples, "1.000000") || _.contains(value.Samples, "3.000000")
  })

  _.each(fishSamples, function(sample){
    L.circle([sample.Latitude, sample.Longitude], 20, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })

}


function func12(){
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, [items[0].Latitude, items[0].Longitude], 11)

  var zoopSamples = _.filter(items, function(value){
    return _.contains(value.Samples, "7.000000") || _.contains(value.Samples, "13.000000")
  })

  _.each(zoopSamples, function(sample){
    L.circle([sample.Latitude, sample.Longitude], 20, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
  })
}
