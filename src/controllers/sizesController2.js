const getSizes2 = (req, res) => {
    const { groups } = req.body;
    try {
        const groupsArr = groups.split(",").map((num) => {
            return Number(num);
        });

        let sumaDePasajeros = 0;
        groupsArr.forEach(function (a) { sumaDePasajeros += a; });

        let grupoMinimo = 0;
        groupsArr.forEach(function (a) { if (a > grupoMinimo) grupoMinimo = a });

        let mySet = new Set();
        let aux = null;
        groupsArr.forEach(function (a) {
            mySet.add(a);
            if (aux !== null) {
                mySet.add(a + aux)
                aux = a + aux;
            } else {
                aux = a;
            }
        });
        let setArr = [...mySet];
        setArr = setArr.filter((a) => a >= grupoMinimo);

        let sizes = [];

        setArr.forEach(function (a) {
            let acumulador = a;
            let aux = false;
            for (let j = 0; j < groupsArr.length; j++) {
                if (groupsArr[j] > acumulador) break
                if (groupsArr[j] <= acumulador) acumulador -= groupsArr[j];
                if (acumulador === 0 && j === groupsArr.length - 1) {
                    aux = true;
                }
                if (acumulador === 0) acumulador = a;
            }
            if (aux === true) {
                sizes.push(a);
            }
        })
        sizes = sizes.join();
        res.status(200).json( {"sizes": sizes} );
    } catch (error) {
        res.status(500).json({ "message": error });
    }
};

module.exports = { getSizes2 };