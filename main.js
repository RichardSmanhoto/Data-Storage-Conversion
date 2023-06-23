const form = document.getElementById("conversorForm");
const submitButton = document.getElementById("submit");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const valorEntrada = document.getElementById("valorEntrada").value;
  const valorSaida = document.getElementById("valorSaida");
  const sistemasConverter = document.querySelector(
    'select[name="sistemasConverter"]'
  );
  const sistemasConvertido = document.querySelector(
    'select[name="sistemasConvertido"]'
  );
  let resultado;
  if (sistemasConverter.value == 0) {
    //binario
    resultado = binarioParaSistema(valorEntrada, sistemasConvertido.value);
  } else if (sistemasConverter.value == 1) {
    //octa
    resultado = octalParaSistema(valorEntrada, sistemasConvertido.value);
  } else if (sistemasConverter.value == 2) {
    //dec
    resultado = decimalParaSistema(valorEntrada, sistemasConvertido.value);
  } else {
    //hex
    resultado = hexParaSistema(valorEntrada, sistemasConvertido.value);
  }

  valorSaida.value = resultado;
});

function binarioParaSistema(valorBinario, sistema) {
  if (sistema == 1) {
    //octadecimal
    const resto = valorBinario.length % 3;

    if (resto !== 0) {
      const zeros = "0".repeat(3 - resto);
      valorBinario = zeros + valorBinario;
    }

    const grupos = criarGrupos(valorBinario, 3);
    let resultado = "";
    grupos.forEach((valor) => {
      let converter = parseInt(valor, 2).toString(8);
      resultado += converter;
    });
    return resultado;
  }
  if (sistema == 2) {
    return binarioParaDecimal(valorBinario);
  }
  if (sistema == 3) {
    var hexadecimal = "";
    var tamanho = valorBinario.length;

    // Adiciona zeros à esquerda para garantir um número inteiro de grupos de 4 dígitos
    while (valorBinario.length % 4 !== 0) {
      valorBinario = "0" + valorBinario;
    }

    // Divide o número binário em grupos de 4 dígitos
    for (var i = 0; i < tamanho; i += 4) {
      // Obtém o grupo de 4 dígitos atual
      var grupo = valorBinario.substr(i, 4);

      // Converte o grupo de binário para decimal
      var decimal = binarioParaDecimal(grupo);

      // Converte o decimal para hexadecimal
      var caractereHexadecimal = decimalParaHexadecimal(decimal);

      // Adiciona o caractere hexadecimal ao resultado final
      hexadecimal += caractereHexadecimal;
    }

    return hexadecimal;
  }
}

function octalParaSistema(valorOctal, sistema) {
  if (sistema == 0) {
    let numeroBinario = "";

    // Converte cada dígito octal para binário
    for (let i = 0; i < valorOctal.length; i++) {
      const digitoOctal = parseInt(valorOctal[i], 8);
      let digitoBinario = "";

      // Converte o dígito octal para binário
      let temp = digitoOctal;
      while (temp > 0) {
        digitoBinario = (temp % 2) + digitoBinario;
        temp = Math.floor(temp / 2);
      }

      // Adiciona zeros à esquerda, se necessário
      while (digitoBinario.length < 3) {
        digitoBinario = "0" + digitoBinario;
      }

      numeroBinario += digitoBinario;
    }

    return numeroBinario;
  }
  if (sistema == 2) {
    return octalParaDecimal(valorOctal);
  }
  if (sistema == 3) {
    // Converte o número octal para decimal
    var decimal = octalParaDecimal(valorOctal);

    // Converte o decimal para hexadecimal
    var hexadecimal = decimal.toString(16).toUpperCase();

    return hexadecimal;
  }
}

function decimalParaSistema(valorDec, sistema) {
  if (sistema == 0) {
    var binario = "";

    // Converte o decimal para binário
    while (valorDec > 0) {
      var digito = valorDec % 2;
      binario = digito + binario;
      valorDec = Math.floor(valorDec / 2);
    }

    return binario;
  }
  if (sistema == 1) {
    var octal = "";

    // Converte o decimal para octal
    while (valorDec > 0) {
      var digito = valorDec % 8;
      octal = digito + octal;
      valorDec = Math.floor(valorDec / 8);
    }

    return octal;
  }
  if (sistema == 3) {
    return decimalParaHexadecimal(valorDec);
  }
}

function hexParaSistema(valorHex, sistema) {
  if (sistema == 0) {
    hexadecimalParaBinario(valorHex);
  }
  if (sistema == 1) {
    const binario = hexadecimalParaBinario(valorHex);
    let octal = "";

    for (let i = 0; i < binario.length; i += 3) {
      const binarioChunk = binario.substr(i, 3);
      const octalDigit = parseInt(binarioChunk, 2).toString(8);
      octal += octalDigit;
    }

    return octal;
  }
  if (sistema == 2) {
    const binario = hexadecimalParaBinario(valorHex);
    const decimal = parseInt(binario, 2);
    return decimal;
  }
}

function criarGrupos(str, tamanho) {
  const grupo = [];
  for (let i = 0; i < str.length; i += tamanho) {
    grupo.push(str.slice(i, i + tamanho));
  }
  return grupo;
}

function binarioParaDecimal(binary) {
  var decimal = 0;
  var tamanho = binary.length;
  for (var i = 0; i < tamanho; i++) {
    let expoente = tamanho - i - 1;
    let digito = parseInt(binary[i]);

    var valor = digito * Math.pow(2, expoente);
    decimal += valor;
  }

  return decimal;
}

function octalParaDecimal(octal) {
  var decimal = 0;

  // Converte o número octal para decimal
  for (var i = 0; i < octal.length; i++) {
    var digito = parseInt(octal[i], 8);
    var posicao = octal.length - i - 1;
    var valor = digito * Math.pow(8, posicao);
    decimal += valor;
  }

  return decimal;
}
function decimalParaHexadecimal(decimal) {
  var hexadecimal = "";
  var caracteresHexadecimais = "0123456789ABCDEF";

  // Converte o decimal para hexadecimal
  while (decimal > 0) {
    var resto = decimal % 16;
    hexadecimal = caracteresHexadecimais[resto] + hexadecimal;
    decimal = Math.floor(decimal / 16);
  }

  return hexadecimal;
}
function hexadecimalParaBinario(hex) {
  let binario = "";
  const hexDigitos = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };

  hex = hex.toString().toUpperCase();

  for (let i = 0; i < hex.length; i++) {
    if (hexDigitos.hasOwnProperty(hex[i])) {
      binario += hexDigitos[hex[i]];
    } else {
      return "Digite um número hexadecimal válido.";
    }
  }

  return binario;
}
