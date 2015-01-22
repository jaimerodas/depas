$( document ).ready(function() {

	var calcularCostos = function() {
		// Costos de Terreno
		var costoMetroTerreno = parseFloat($('#costoMetroTerreno').val());
		var metrosTerreno = parseFloat($('#metrosTerreno').val());

		var totalTerreno = costoMetroTerreno * metrosTerreno;
		$('#totalTerreno').html( finance.format(totalTerreno));


		// Costos de Construcción
		var costoMetroConstruccion = parseFloat($('#costoMetroConstruccion').val());
		var metrosConstruccion = parseFloat($('#metrosConstruccion').val());
		var numDepartamentos = parseFloat($('#numDepartamentos').val());

		var totalConstruccion = numDepartamentos * metrosConstruccion * costoMetroConstruccion;
		$('#totalConstruccion').html( finance.format(totalConstruccion));


		// Costos Varios
		var costoMobiliario = parseFloat($('#costoMobiliario').val());
		var otrosCostos = parseFloat($('#otrosCostos').val());

		var totalVarios = (costoMobiliario * numDepartamentos) + otrosCostos;
		$('#totalVarios').html( finance.format(totalVarios));


		// Costo Total
		var totalCosto = totalTerreno + totalConstruccion + totalVarios;
		$('#totalCosto').html( finance.format(totalCosto));

		var anualidad = calcularIngresos(totalCosto);
		calcularDeuda(anualidad, totalCosto);
	};

	var calcularIngresos = function(totalCosto) {
		var rentaMensual = parseFloat($('#rentaMensual').val());
		var mantenimiento = parseFloat($('#mantenimiento').val());
		var numDepartamentos = parseFloat($('#numDepartamentos').val());

		var rentaMensualTotal = rentaMensual * numDepartamentos;
		$('#rentaMensualTotal').html( finance.format(rentaMensualTotal));

		var utilidadAnual = (rentaMensualTotal - mantenimiento) * 12;
		$('#utilidadAnual').html( finance.format(utilidadAnual));

		calcularTIR(totalCosto, utilidadAnual);

		return utilidadAnual;
	};

	var calcularTIR = function(totalCosto, utilidadAnual) {
		var tiempoRecuperacion = totalCosto / utilidadAnual;
		$('#tiempoRecuperacion').html( finance.format(tiempoRecuperacion));
	};

	var calcularDeuda = function(anualidad, totalCosto) {
		var tasaInteres = parseFloat($('#tasaInteres').val());
		var periodo = parseFloat($('#periodo').val());

		var meses = periodo * 12;
		var mensualidad = anualidad / 12;

		var totalDeuda = finance.calculateAmount(meses, tasaInteres, mensualidad);
		$('#totalDeuda').html( finance.format(totalDeuda) );

		var totalEnganche = totalCosto - totalDeuda;
		$('#totalEnganche').html( finance.format(totalEnganche) );
	}

	calcularCostos();

	$('input').on('change', calcularCostos);

});
