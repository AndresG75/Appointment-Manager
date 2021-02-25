const inputMascota = document.querySelector('#mascota');
const inputPropietario = document.querySelector('#propietario');
const inputTelefono = document.querySelector('#telefono');
const inputFecha = document.querySelector('#fecha');
const inputHora = document.querySelector('#hora');
const inputSintomas = document.querySelector('#sintomas');
const form = document.querySelector('#nueva-cita');
const citasList = document.querySelector('#citas');

let editando = false;

class Cita {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        console.log(`Mira la cita: ${cita.propietario}`);
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita=>cita.id != id);
    }

    actualizar(citaNew){
        this.citas = this.citas.map((cita)=>citaNew.id === cita.id ? citaNew : cita);
    }
}


class UI{
    constructor(){}
    validarFormulario(e){
        e.preventDefault(); 
        const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
        if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
            interfaz.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')
            return;
        }
        
        if(editando){
            citaGlobal.actualizar({...citaObj});
            interfaz.imprimirAlerta('Se actualizó correctamente');
            form.querySelector('button[type="submit"]').textContent = 'Crear Cita';
            editando = false;

        }else{
            //Agregar cita
            citaObj.id = Date.now();
            citaGlobal.agregarCita({...citaObj});
            interfaz.imprimirAlerta('Se agregó correctamente');
        }
        interfaz.mostrarHTML(citaGlobal.citas);
        LimpiarCitaObj();
        form.reset();
    }

    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   mostrarHTML(citas){

    this.limpiarHTML();
    citas.forEach(cita => {
        const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        // scRIPTING DE LOS ELEMENTOS...
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.innerHTML = `${mascota}`;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

        // Agregar un botón de eliminar...
        const btnEliminar = document.createElement('button');
        btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

        // Añade un botón de editar...
        const btnEditar = document.createElement('button');
        btnEditar.onclick = () => cargarEdicion(cita);

        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

        // Agregar al HTML
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar)
        divCita.appendChild(btnEditar)

        citasList.appendChild(divCita);
    }); 
   }

   limpiarHTML(){
       while(citasList.firstChild){
           citasList.firstChild.remove();
       }
   }
}

const citaGlobal = new Cita();
const interfaz = new UI();

Events();

function Events(){
    inputMascota.addEventListener('change',CaptureInput);
    inputPropietario.addEventListener('change',CaptureInput);
    inputTelefono.addEventListener('change',CaptureInput);
    inputFecha.addEventListener('change',CaptureInput);
    inputHora.addEventListener('change',CaptureInput);
    inputSintomas.addEventListener('change',CaptureInput);
    form.addEventListener('submit',interfaz.validarFormulario)
}


const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}

//Functions

function CaptureInput(e){
    e.preventDefault();
    citaObj[e.target.name] = e.target.value;
}

function LimpiarCitaObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';  
}

function eliminarCita(id){
    citaGlobal.eliminarCita(id);
    interfaz.mostrarHTML(citaGlobal.citas);
}

function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTelefono.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}