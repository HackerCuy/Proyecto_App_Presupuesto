//se crean 2 arreglos pre-cargados de informacion para inicializar la aplicacion

const ingresos = [
    new Ingresos("Salario", 20000),
    new Ingresos("Venta Auto", 50000),
    new Ingresos("Inversiones", 3000)
];

const egresos = [
    new Egresos("Renta", 4000),
    new Egresos("Ropa", 800),
]

//  Funcion para cargar cabecero

let cargarCabecero = () => {
    let presupuesto = (totalIngresos() - totalEgresos());
    let porcentajeEgreso = (totalEgresos() / totalIngresos());
    //Aqui mas adelante deberemos crear con el innerHTML los elementos para cargar los primeros datos generados desde la app.js
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());

    // console.log(formatoMoneda(presupuesto));
    // console.log(formatoPorcentaje(porcentajeEgreso));
    // console.log(formatoMoneda(totalIngresos()));
    // console.log(formatoMoneda(totalEgresos()));
}



const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
};



const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", { style: "percent", minimumFractionDigits: 2 })
};

//Funciones para totalIngresos y totalEgresos

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;

}

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
};


//Funciones para Ingresos, se tendra que hacer algo similar para Egresos

//Funcion para crearIngresos
const cargarIngresos = () => {
    let ingresosHTML = "";
    for (ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>     
    `
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let ingresoEliminar = ingresos.findIndex(ingresos => ingreso.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


//Funciones para Egresos,
const cargarEgresos = () => {
    let egresosHTML = "";
    for (egreso of egresos) {
        egresosHTML += crearEgresos(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresos = (egreso) => {
    let porcentajeEgreso = egreso.valor / totalIngresos();
    let egresosHTML= `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon></button>
                        </div>
                    </div>

                </div>
        `
    return egresosHTML;
  }

  const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
};



//Funcion para cargar la aplicacion

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

/*Funcion para poder agregar datoss a nuestro contenedor esta funcion es la que va a permitir, 
definir el tipo de dato que se esta creando si es un Ingreso o un Egresos construye los objetos correspondientes*/

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value !== "" && valor.value !== "") {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingresos(descripcion.value, +valor.value)) //forma corta para agregar un nuevo elemento
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === "egreso") {
            let newEgreso = new Egresos(descripcion.value, + valor.value);
            egresos.push(newEgreso);
            cargarCabecero();
            cargarEgresos();
        }
    } else {
        alert("Debes llenar todos los campos, falta un dato");
    }


}
