var expect = require('chai').expect;
var getAnimal = require('../../../middleware/animal/getAnimal');

describe('getAnimal middleware ', function () {

    it('should return with an animal', function (done) {
        var req = {
            params: {
                animalid: '42'
            }
        };
        var res = {locals: {}};
        var fakeAnimalModel = {
            findOne: function (query, cb) {
                expect(query).to.eql({_id: '42'});
                cb(undefined, 'kecske');
            }
        };

        getAnimal({
            animalModel: fakeAnimalModel
        })(req, res, function (err) {
            expect(res.locals.animal).to.eql('kecske');
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('should return with a db error', function (done) {
        var req = {
            params: {
                animalid: '42'
            }
        };
        var res = {locals: {}};
        var fakeAnimalModel = {
            findOne: function (query, cb) {
                expect(query).to.eql({_id: '42'});
                cb('dbhiba', 'kecske');
            }
        };

        getAnimal({
            animalModel: fakeAnimalModel
        })(req, res, function (err) {
            expect(res.locals.animal).to.eql(undefined);
            expect(err).to.eql('dbhiba');
            done();
        });
    });

    //nem is tudom, hogy a kodba miert irtam bele ennek az ellenorzeset
    //mivel a route-ok miatt amugy se futhatna igy le sehogy...
    //De... mindenesetre letesztelem :D
    it('should return with an error if id param not found', function (done) {
        var req = {
            params: {}
        };
        var res = {locals: {}};
        var fakeAnimalModel = {};
        let func = getAnimal({
            animalModel: fakeAnimalModel
        });
        expect(() => {func(req, res, () => {})}).to.throw("animal id not found");
        done();
    });

});
