// test.js
const url = 'http://localhost:3011/api/cats';

const cat = {
    title: "Fluffy",
    subTitle: "The Fluffy Cat",
    path: "https://www.thesprucepets.com/thmb/Wy9Vno45XeFtos7omJ80qkZrtZc=/3760x0/filters:no_upscale():strip_icc()/GettyImages-174770333-0f52afc06a024c478fafb1280c1f491f.jpg",
    description: "A fluffy cat enjoying its nap."
};

describe('test GET api', function(){
    it('return statusCode of 200', function(done){
        // Using dynamic import for chai
        import("chai").then(chai => {
            const { expect } = chai;
            const request = require("request");

            request(url, function (error, response, bodyString){
                if (bodyString) {
                    let bodyObj = JSON.parse(bodyString);
                    expect(bodyObj.message).to.equal('Get all cats successful');
                }
                done();
            });
        }).catch(err => done(err));
    });
});

describe('test POST api', function(){
    it('post cat to DB', function(done){
        // Using dynamic import for chai
        import("chai").then(chai => {
            const { expect } = chai;
            const request = require("request");

            request.post({url: url, form: cat}, function (error, response, bodyString){
                if (bodyString) {
                    let bodyObj = JSON.parse(bodyString);
                    expect(bodyObj.message).to.equal('Success');
                }
                done();
            });
        }).catch(err => done(err));
    });
});
