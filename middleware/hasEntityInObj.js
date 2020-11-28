
const required_attributes = {
    shepherd: ['name','area','born'],
    animal: ['name','cost'],
    //shepherd_animal: ['animal_id','quantity','shepherd_id']

};


/**
 * Azt csinálja, hogy a kapott objektumban megnezi, hogy megtalahatoak e az adott entitas attributumai
 * (a req.body-t, meg a res.locals ellenorzesere fogom hasznalni.)
 * */
function hasEntityInObj(req_body, entityName) {
    if (!req_body || !required_attributes[entityName])  {return false;}

    required_attributes[entityName].forEach(e => {
       if (!req_body.hasOwnProperty(e) || !req_body[e]) {
           return false;
       }
    });
    return true;

}

module.exports = hasEntityInObj;
