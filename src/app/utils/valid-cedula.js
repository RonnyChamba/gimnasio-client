"use strict";
exports.__esModule = true;
exports.validCedula = void 0;
var validCedula = function (cedula) {
    if (!cedula.match('^[0-9]{10}$'))
        return { status: false, message: 'La cédula debe tener 10 números' };
    //   const digites = cedula.split('');
    if (!validProvinceCode(cedula.substring(0, 2)))
        return {
            status: false,
            message: 'Codigo de Provincia (dos primeros dígitos) debe estar entre 0 y 24'
        };
    if (!validTercerDigite(cedula.substring(2, 3)))
        return {
            status: false,
            message: 'Tercer dígito debe estar entre  0 y 5'
        };
    if (!algoritmoModulo10(cedula))
        return {
            status: false,
            message: 'Cédula incorrecta'
        };
    return {
        status: true,
        message: 'Cédula correcta'
    };
    ;
};
exports.validCedula = validCedula;
var validProvinceCode = function (provinceCode) {
    var code = parseInt(provinceCode);
    return code >= 0 && code <= 24;
};
var validTercerDigite = function (digite) {
    var code = parseInt(digite);
    return code >= 0 && code <= 5;
};
var algoritmoModulo10 = function (cedula) {
    var digites = cedula.split('').map(function (item) { return parseInt(item); });
    var arrayCoeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    var total = 0;
    digites.forEach(function (valuePosition, index) {
        if (index < arrayCoeficientes.length) {
            valuePosition = valuePosition * arrayCoeficientes[index];
            if (valuePosition >= 10) {
                var valueSplit = valuePosition
                    .toString()
                    .split('')
                    .map(function (item) { return parseInt(item); });
                valuePosition = valueSplit[0] + valueSplit[1];
            }
            total = total + valuePosition;
        }
    });
    var residuo = total % 10;
    var resultado = residuo == 0 ? 0 : 10 - residuo;
    console.log("resultado: ", resultado);
    // Obtener el ultimo digito de la cedula y comparar con el resultado 
    return digites[9] == resultado;
};
console.log((0, exports.validCedula)('131364689134'));
