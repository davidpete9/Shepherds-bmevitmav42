var expect = require('chai').expect;
var saveAnimal = require('../../../middleware/animal/saveAnimal');

// Mar megcsinaltam a ket masik mw-re egy teljes tesztet, itt csak kiprobalom, hogy egy
//osszetettebbet hogy is lehet.. Ez nem lesz teljes

describe('saveAnimals middleware ', function () {

    it('should update animal', function (done) {
        var fakeAnimalModel = {
            save: function (cb) {
                //ha rendben megy a hozzaadas visszater a hozzaadottal
                return cb(undefined, ujKecske);
            }
        };
        var ujKecske =  {
            name: 'kecske',
            cost: 1000,
            _id: '42'
        };
        var req = {
            body: {
                name: ujKecske.name,
                cost: ujKecske.cost,
                _id: ujKecske._id
            }
        };
        var res = {
            locals: {
                animal: {
                    name: 'RegiKecske',
                    cost: 1111,
                    _id: '42',
                    save: fakeAnimalModel.save
                }
            },
            json: function (data) {
                expect(JSON.stringify(data)).to.eql(JSON.stringify(ujKecske));
                done();
            }
        };

        saveAnimal({
            animalModel: fakeAnimalModel
        })(req, res, () => {});
    });

    it('should add an animal', function (done) {
        class fakeModel {
            constructor(data) {
                this.data = data;
            }
            save (cb) {
                this.data._id = '3939';
                //ha rendben megy a hozzaadas visszater a hozzaadottal
                return cb(undefined, this.data);
            }
        }

        var ujKecske =  {
            name: 'kecske',
            cost: 1000,
            _id: '42'
        };
        var req = {
            body: {
                name: ujKecske.name,
                cost: ujKecske.cost
            }
        };
        var res = {
            locals: {},
            json: function (data) {
                expect(data.name).to.eql(ujKecske.name);
                expect(data.cost).to.eql(ujKecske.cost);
                expect(data.hasOwnProperty('_id')).to.eql(true);
                done();
            }
        };

        saveAnimal({
            animalModel: fakeModel
        })(req, res, () => {});
    });



});
