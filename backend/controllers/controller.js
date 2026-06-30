class URLAcortadorController {
  constructor() {
    this.urls = {};
    this.contador = 0;
  }

  crearURL(urlOriginal) {
    this.contador++;
    const urlAcortada = `http://localhost:3000/${this.contador}`;
    this.urls[urlAcortada] = urlOriginal;
    return urlAcortada;
  }

  leerURL(urlAcortada) {
    return this.urls[urlAcortada];
  }

  actualizarURL(urlAcortada, urlOriginal) {
    if (this.urls[urlAcortada]) {
      this.urls[urlAcortada] = urlOriginal;
      return true;
    }
    return false;
  }

  eliminarURL(urlAcortada) {
    if (this.urls[urlAcortada]) {
      delete this.urls[urlAcortada];
      return true;
    }
    return false;
  }
}

const controlador = new URLAcortadorController();

function crearURL(urlOriginal) {
  return controlador.crearURL(urlOriginal);
}

function leerURL(urlAcortada) {
  return controlador.leerURL(urlAcortada);
}

function actualizarURL(urlAcortada, urlOriginal) {
  return controlador.actualizarURL(urlAcortada, urlOriginal);
}

function eliminarURL(urlAcortada) {
  return controlador.eliminarURL(urlAcortada);
}