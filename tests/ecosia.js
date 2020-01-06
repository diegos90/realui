module.exports = {
    /*'step one: navigate to ecosia.org': function (browser) {
      browser
        .url('https://www.ecosia.org')
        .waitForElementVisible('body')
        .assert.titleContains('Ecosia')
        .assert.visible('input[type=search]')
        .setValue('input[type=search]', 'nightwatch')
        .assert.visible('button[type=submit]');
    },
  
    'step two: click submit' : function (browser) {
      browser
        .click('button[type=submit]')
        .assert.containsText('.mainline-results', 'Nightwatch.js')
        .end();
    }*/



    'step one: open Book Now page': function (browser) {
        browser
            .url('http://localhost:3000/#/booknow')
            .waitForElementVisible('body')
            .assert.titleContains('Nite Life Party Cabs');    
    },

    'step two: fill in form': function (browser) {
        browser
            .assert.visible('input[id=name]')
            .setValue('input[id=name]', 'Vuyani Shabangu')
            .assert.visible('input[id=email]')
            .setValue('input[id=email]', 'vuyani.shabangu@gmail.com')
            .assert.visible('input[id=cellNumber]')
            .setValue('input[id=cellNumber]', '071 654 8723')
            .setValue('input[id=departureDate]', 'January 2nd')
            .setValue('input=[id=departureTime]', '10:33 PM')
            //.setValue('input=[id=departurePickUpLocation]', 'Midknight Valencia, Basden Avenue, Die Hoewes, Centurion, South Africa')
            //.setValue('input=[id=departureDropOffLocation]', 'Rhema Bible Church North, Hans Schoeman Street, Bromhof, Randburg, South Africa')
            .setValue('input[id=returnDate]', 'January 2nd')
            .setValue('input=[id=returnTime]', '10:33 PM')
            //.setValue('input=[id=returnDropOffLocation]', 'Midknight Valencia, Basden Avenue, Die Hoewes, Centurion, South Africa')
            .setValue('input=[id=vehicleType]', 'NLPREMIUMXL')
           
            //.waitForElementVisible('bangabanga');
            setTimeout(function(){
              //do what you need here
          }, 100000);
    }
        

  };