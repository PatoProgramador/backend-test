const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const getSizes = (event) => {
    const { groups } = event.body;
    try {
        const groupsArr = groups.split(",").map((num) => {
            return Number(num);
        });
        
        let sumaDePasajeros = 0;
        groupsArr.forEach(function (a) { sumaDePasajeros += a; });

        let grupoMinimo = 0;
        groupsArr.forEach(function (a) { if (a > grupoMinimo) grupoMinimo = a });

        let sizes = [];
        for (let i = grupoMinimo; i <= sumaDePasajeros; i++) {
            let acumulador = i;
            let aux = false;
            for (let j = 0; j < groupsArr.length; j++) {
                if (groupsArr[j] > acumulador) break
                if (groupsArr[j] <= acumulador) acumulador -= groupsArr[j];
                if (acumulador === 0 && j === groupsArr.length - 1) {
                    aux = true;
                }
                if (acumulador === 0) acumulador = i;
            }
            if (aux === true) {
                sizes.push(i);
            }
        }
        sizes = sizes.join();
        return {
            statusCode: 200,
            body: JSON.stringify({"sizes": sizes})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({"Error": error})
        };
    }
};

module.exports = { getSizes: middy(getSizes).use(jsonBodyParser()) };