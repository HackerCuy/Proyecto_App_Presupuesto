//  Funcion para cargar cabecero

let cargarCabecero = () => {
    let presupuesto = (totalIngresos() - totalEgresos());
    let porcentajeEgreso = (totalEgresos() / totalIngresos());
    //Aqui mas adelante deberemos crear con el innerHTML los elementos para cargar los primeros datos generados desde la app.js
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    //porcentaje = pocentajeEgreso
    //ingreso = totalIngresos()
    //egreso = totalEgresos()
}


const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", { style: "currency", currency: "MXM", minimumFractionDigits: 2 });
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

//se crean 2 arreglos pre-cargados de informacion para inicializar la aplicacion

const ingresos = [
    new Ingresos("Sueldo", 10000)
];

const egresos = [
    new Egresos ("Vacaciones", 5000)
]

//Funciones para Ingresos, se tendra que hacer algo similar para Egresos

//Funcion para crearIngresos
const cargarIngresos = () =>{
    let ingresosHTML = "";
    for (ingreso of ingresos){
        ingresosHTML += crearIngresos(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML
}

const crearIngresos = (ingreso) => {
    let ingresosTemplate = `
       <div id="lista-ingresos">
        <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return ingresosTemplete;
  }

const eliminarIngreso = (id) =>{
    let ingresoEliminar = ingresos.findIndex(ingresos => ingreso.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


//Funciones para Egresos,
const cargarEgresos = () =>{
    let ingresosHTML = "";
    for (egreso of egresos){
        egresosHTML += crearEgresos(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML
}

const crearEgresos = (egreso) => {
    let ingresosTemplate = `
    <div class="egreso">
    <h2 class="egreso_titulo">Egresos</h2>
    <div id="lista-egresos">
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje( 21%</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline onclick="eliminarEgreso(${egreso.id})"></ion-icon></button>
                </div>
            </div>

        </div>

        `
    return ingresosTemplete;
  }

        










//Funcion para cargar la aplicacion

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

/*Funcion para poder agregar datoss a nuestro contenedor esta funcion es la que va a permitir, 
definir el tipo de dato que se esta creando si es un Ingreso o un Egresos construye los objetos correspondientes*/

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descipcion"];
    let valor = forma["valor"];
    if(descripcion.value !== "" && valor.value !==""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingresos(descripcion.value, +valor.value)) //forma corta para agregar un nuevo elemento
       cargarCabecero();
       cargarIngresos();
        }else if(tipo.value === "egreso"){
            let newEgreso = new Egresos(descripcion.value + valor.value);
            egresos.push(newEgreso);
            cargarCabecero();
            cargarEgresos();
        }
    }else{
        alert("Debes llenar todos los campos, falta un dato");
    }
    

}
