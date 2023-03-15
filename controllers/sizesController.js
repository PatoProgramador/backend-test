const getSizes = (req, res) => {
    const { groups } = req.body;
    try {
        const groupsArr = groups.split(",").map((num) => {
            return Number(num);
        });
        
        let sumaDePasajeros = 0;
        groupsArr.forEach(function (a) { sumaDePasajeros += a; });

        let grupoMinimo = 0;
        groupsArr.forEach(function (a) { if (a > grupoMinimo) grupoMinimo = a });

        const sizes = [];
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
        let sizesString = sizes.join();
        res.status(200).json({ "sizes": sizesString });
    } catch (error) {
        res.status(500).json({ "message": error });
    }
};

module.exports = { getSizes };