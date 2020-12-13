var expect = require('chai').expect;
var listAnimals = require('../../../middleware/animal/listAnimals');

describe('listAnimals middleware ', function () {

    it('should return animals', function (done) {
        var req = {};
        var res = {locals: {}};
        var fakeAnimalModel = {
            find: function (query, cb) {
                cb(undefined, ['kecske','kutya']);
            }
        };

        listAnimals({
            animalModel: fakeAnimalModel
        })(req, res, function (err) {
            expect(res.locals.animals).to.eql(['kecske','kutya']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('when db error', function (done) {
        var req = {};
        var res = {locals: {}};
        var fakeAnimalModel = {
            find: function (query, cb) {
                //van hiba
                cb('dbhiba', ['kecske','kutya']);
            }
        };

        listAnimals({
            animalModel: fakeAnimalModel
        })(req, res, function (err) {
            expect(res.locals.animals).to.eql(undefined);
            expect(err).to.eql('dbhiba');
            done();
        });
    });

});
