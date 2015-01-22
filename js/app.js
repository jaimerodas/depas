var inputs, i;

function findValue(id) {
    return parseFloat(document.getElementById(id).value);
}

function replaceValue(id, value) {
    document.getElementById(id).innerHTML = finance.format(value, {precision: 2});
}

function calcularDeuda(anualidad, totalCosto) {
    var tasaInteres, periodo, meses, mensualidad, totalDeuda, totalEnganche;

    tasaInteres = findValue('tasaInteres');
    periodo = findValue('periodo');

    meses = periodo * 12;
    mensualidad = anualidad / 12;

    totalDeuda = finance.calculateAmount(meses, tasaInteres, mensualidad);
    replaceValue('totalDeuda', totalDeuda);

    totalEnganche = totalCosto - totalDeuda;
    replaceValue('totalEnganche', totalEnganche);
}

function calcularTIR(totalCosto, utilidadAnual) {
    var tiempoRecuperacion = totalCosto / utilidadAnual;
    replaceValue('tiempoRecuperacion', tiempoRecuperacion);
}

function calcularIngresos(totalCosto, numDepartamentos) {
    var rentaMensual, mantenimiento, rentaMensualTotal, utilidadAnual;

    rentaMensual = findValue('rentaMensual');
    mantenimiento = findValue('mantenimiento');

    rentaMensualTotal = rentaMensual * numDepartamentos;
    replaceValue('rentaMensualTotal', rentaMensualTotal);

    utilidadAnual = (rentaMensualTotal - mantenimiento) * 12;
    replaceValue('utilidadAnual', utilidadAnual);

    calcularTIR(totalCosto, utilidadAnual);

    return utilidadAnual;
}

function calcularCostos() {
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
}

inputs = document.getElementsByTagName('input');

for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", calcularCostos);
}

calcularCostos();
