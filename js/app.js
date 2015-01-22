var findValue, replaceValue, calcularDeuda, calcularTIR, calcularIngresos, calcularCostos, inputs;

findValue = function (id) {
    return parseFloat(document.getElementById(id).value);
};

replaceValue = function (id, value) {
    document.getElementById(id).innerHTML = finance.format(value);
};

calcularDeuda = function (anualidad, totalCosto) {
    var tasaInteres, periodo, meses, mensualidad, totalDeuda, totalEnganche;

    tasaInteres = findValue('tasaInteres');
    periodo = findValue('periodo');

    meses = periodo * 12;
    mensualidad = anualidad / 12;

    totalDeuda = finance.calculateAmount(meses, tasaInteres, mensualidad);
    replaceValue('totalDeuda', totalDeuda);

    totalEnganche = totalCosto - totalDeuda;
    replaceValue('totalEnganche', totalEnganche);
};

calcularTIR = function (totalCosto, utilidadAnual) {
    var tiempoRecuperacion = totalCosto / utilidadAnual;
    replaceValue('tiempoRecuperacion', tiempoRecuperacion);
};

calcularIngresos = function (totalCosto, numDepartamentos) {
    var rentaMensual, mantenimiento, rentaMensualTotal, utilidadAnual;

    rentaMensual = findValue('rentaMensual');
    mantenimiento = findValue('mantenimiento');

    rentaMensualTotal = rentaMensual * numDepartamentos;
    replaceValue('rentaMensualTotal', rentaMensualTotal);

    utilidadAnual = (rentaMensualTotal - mantenimiento) * 12;
    replaceValue('utilidadAnual', utilidadAnual);

    calcularTIR(totalCosto, utilidadAnual);

    return utilidadAnual;
};

calcularCostos = function () {
    var costoMetroTerreno, metrosTerreno, totalTerreno, costoMetroConstruccion, metrosConstruccion, numDepartamentos, totalConstruccion, costoMobiliario, otrosCostos, totalVarios, totalCosto, anualidad;

    // Costos de Terreno
    costoMetroTerreno = findValue('costoMetroTerreno');
    metrosTerreno = findValue('metrosTerreno');
    totalTerreno = costoMetroTerreno * metrosTerreno;
    replaceValue('totalTerreno', totalTerreno);

    // Costos de Construcción
    costoMetroConstruccion = findValue('costoMetroConstruccion');
    metrosConstruccion = findValue('metrosConstruccion');
    numDepartamentos = findValue('numDepartamentos');
    totalConstruccion = numDepartamentos * metrosConstruccion * costoMetroConstruccion;
    replaceValue('totalConstruccion', totalConstruccion);

    // Costos Varios
    costoMobiliario = findValue('costoMobiliario');
    otrosCostos = findValue('otrosCostos');
    totalVarios = (costoMobiliario * numDepartamentos) + otrosCostos;
    replaceValue('totalVarios', totalVarios);

    // Costo Total
    totalCosto = totalTerreno + totalConstruccion + totalVarios;
    replaceValue('totalCosto', totalCosto);

    anualidad = calcularIngresos(totalCosto, numDepartamentos);
    calcularDeuda(anualidad, totalCosto);
};

calcularCostos();

inputs = document.getElementsByTagName('input');
inputs.onchange = calcularCostos();
