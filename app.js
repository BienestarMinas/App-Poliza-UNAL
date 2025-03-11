// Configurar IndexedDB para almacenar datos
const dbName = 'EmergenciasDB';
let db;

const request = indexedDB.open(dbName, 1);
request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore('lugares', { keyPath: 'id', autoIncrement: true });
    store.createIndex('nombre', 'nombre', { unique: false });
    store.createIndex('telefono', 'telefono', { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;
    cargarDatos();
};

// Precargar datos si la base de datos está vacía
function cargarDatos() {
    const transaction = db.transaction('lugares', 'readwrite');
    const store = transaction.objectStore('lugares');

    // Primero, vaciar la base de datos
    store.clear().onsuccess = () => {
        console.log('Base de datos vaciada, cargando nuevos datos...');
        agregarDatosIniciales(); // Luego, cargar los nuevos datos
    };
}

function agregarDatosIniciales() {
    const transaction = db.transaction('lugares', 'readwrite');
    const store = transaction.objectStore('lugares');
    const lugares = [
        // Medellin
        { nombre: 'HOSPITAL ALMA MATER DE ANTIOQUIA', direccion: 'CALLE 69 No. 51C-24', telefono: '3223633-3137060956', palabras_claves: ['Antioquia'] },
        { nombre: 'CLÍNICA OFTALMOLOGICA DE ANTIOQUIA S.A.S', direccion: 'CRA 48 No. 19A-40 P. 11', telefono: '4440090-3152042031-3104149448', palabras_claves: ['Antioquia'] },
        { nombre: 'CENTRO MÉDICO Y ODONTOLÓGICO ORALSER S.A.', direccion: 'Calle 59 No. 50A-66', telefono: '(094)4445138-3116011715', palabras_claves: ['Antioquia'] },
        { nombre: 'CLÍNICA MEDELLÍN S.A.', direccion: 'Carrera 65 B No. 30-95', telefono: '4020990-3104418944', palabras_claves: ['Antioquia'] },
        { nombre: 'CLÍNICA DE OTORRINOLARINGOLOGÍA DE ANTIOQUIA S.A. –ORLANT S.A', direccion: 'Calle 34 N° 63A-30', telefono: '2658584', palabras_claves: ['Antioquia'] },
        { nombre: 'CENTRO DE ORTOPEDIA Y TRAUMATOLOGIA EL ESTADIO S.A.', direccion: 'Carrera 74 No. 48B – 77', telefono: '2307288-2307288 Ext 129-3136263867', palabras_claves: ['Antioquia'] },
        { nombre: 'CORPORACIÓN HOSPITAL INFANTIL CONCEJO DE MEDELLIN', direccion: 'Calle 72A No 48A-20', telefono: '4446425-3172647565', palabras_claves: ['Antioquia'] },
        { nombre: 'I.P.S. FISINOVA S.A.S', direccion: 'Calle 56 No. 41-21', telefono: '3107048375-3004838587', palabras_claves: ['Antioquia'] },
        { nombre: 'FUNDACIÓN INSTITUTO NEUROLÓGICO DE COLOMBIA – FUNDACIÓN INDEC', direccion: 'Calle 55 No. 46-36 Sector Centro de Medellin.', telefono: '(604)5766666 Ext 1400-3103733045', palabras_claves: ['Antioquia'] },
        { nombre: 'CEDIMED S.A.S.', direccion: 'Calle 7 No. 39-290. Piso 3', telefono: '3014147716-3006773723', palabras_claves: ['Antioquia'] },
        { nombre: 'TIENDA MÉDICA MEDELLÍN S.A.S', direccion: 'CALLE 48B No. 81A-24', telefono: '3103617822-3005428016', palabras_claves: ['Antioquia'] },
        { nombre: 'ORTHOPRAXIS SAS', direccion: 'CALLE 27 # 45-28', telefono: '4441929-3117723111', palabras_claves: ['Antioquia'] },
        { nombre: 'CLÍNICA DE FRACTURAS DE MEDELLÍN S.A.S.', direccion: 'CARRERA 45 N° 53-38', telefono: '3116303239-3147981293', palabras_claves: ['Antioquia'] },
        { nombre: 'E.S.E. HOSPITAL GENERAL DE MEDELLÍN LUZ CASTRO DE GUTIERREZ', direccion: 'CARRERA 48 N° 32-102', telefono: '3847302-3184616512', palabras_claves: ['Antioquia'] },
        { nombre: 'SERVICIOS INMUNOLÓGICOS PREVINM S.A.S', direccion: 'Calle 49 No. 40-11 Local 611-1', telefono: '3174428850-3194273557', palabras_claves: ['Antioquia'] },
        { nombre: 'CENTRO INTEGRAL DE REHABILITACIÓN DEL SUR S.A.S. – SIGLA CENTIR DEL SUR S.A.S.', direccion: 'Calle 34 No. 63-56', telefono: '3209280 EXT 1008-3212915117-3167635526', palabras_claves: ['Antioquia'] },
        { nombre: 'CLÍNICA DE OFTALMOLOGÍA SAN DIEGO S.A.', direccion: 'Carrera 43 No. 29-35', telefono: '3127986159-2626363', palabras_claves: ['Antioquia'] },
        { nombre: 'HOSPITAL PABLO TOBÓN URIBE', direccion: 'CALLE 78B N° 69-240', telefono: '3002874064-3108420986-4459000', palabras_claves: ['Antioquia'] },
        { nombre: 'DIAGNOSTICARTE S.A.S.', direccion: 'Cl. 19 No. 44-25 LC 210', telefono: '4449411-3128661213', palabras_claves: ['Antioquia'] },
        { nombre: 'PROMOTORA MÉDICA Y ODONTOLÓGICA DE ANTIOQUIA SA', direccion: 'CALLE 53 No. 46-38', telefono: '3122893155-3104249452', palabras_claves: ['Antioquia'] },
        { nombre: 'FUNDACION CLÍNICA NOEL', direccion: 'CRA. 49 No. 14-30', telefono: '3128318633-6042156', palabras_claves: ['Antioquia'] },
        { nombre: 'UNIVERSIDAD PONTIFICIA BOLIVARIANA', direccion: 'CRA 72A No. 78B-50', telefono: '3167507389-4455900 ext 4507', palabras_claves: ['Antioquia'] },
        { nombre: 'MAS VALOR A TU SALUD S.A.S.', direccion: 'Carrera 75 No. 49-105', telefono: '3175600111-3016030300', palabras_claves: ['Antioquia'] },

        //Bogotá


        //Palmira


        //Manizales


        //Caribe (San andres isla)


        //Amazonía


        //Orinoquía


        //Tumaco


        //La paz


      ];
    lugares.forEach(lugar => store.add(lugar));
}

// Service Worker para habilitar el modo offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/App-Poliza-UNAL/sw.js')
        .then(registration => {
            registration.onupdatefound = () => {
                const newWorker = registration.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log("Nueva versión disponible, recargando...");
                        window.location.reload();
                    }
                };
            };
        }).catch(err => console.error('Error al registrar el Service Worker:', err));
}
    
    

// Función para eliminar acentos
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función de filtrado rápido
function filtrarLugares() {
    const criterio = normalizarTexto(document.getElementById('busqueda').value);
    const transaction = db.transaction('lugares', 'readonly');
    const store = transaction.objectStore('lugares');
    const lugaresFiltrados = [];

    store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const nombreNormalizado = normalizarTexto(cursor.value.nombre);
            const direccionNormalizada = normalizarTexto(cursor.value.direccion);
            const telefono = cursor.value.telefono; // No necesita normalización
            const palabrasClaves = cursor.value.palabras_claves || []; // Si no tiene palabras clave, usar array vacío
            
            // Verificar si el criterio está en nombre, dirección, teléfono o palabras clave
            if (
                nombreNormalizado.includes(criterio) || 
                direccionNormalizada.includes(criterio) ||
                telefono.includes(criterio) ||
                palabrasClaves.some(palabra => normalizarTexto(palabra).includes(criterio))
            ) {
                lugaresFiltrados.push(cursor.value);
            }
            cursor.continue();
        } else {
            mostrarResultados(lugaresFiltrados);
        }
    };
}



// Mostrar resultados en la UI
function mostrarResultados(lugares) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    lugares.forEach(lugar => {
        const item = document.createElement('div');

        // Expresión regular para encontrar números de teléfono (mínimo 7 dígitos)
        const numeros = lugar.telefono.match(/\d{7,}/g) || [];

        // Crear una versión del teléfono con enlaces clickeables
        let telefonoFormateado = lugar.telefono.replace(/\d{7,}/g, num => `<a href="tel:${num}">📞 ${num}</a>`);

        item.innerHTML = `<strong>${lugar.nombre}</strong><br>
                          ${lugar.direccion}<br>
                          ${telefonoFormateado}<hr>`;
        lista.appendChild(item);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('busqueda').addEventListener('input', filtrarLugares);
    filtrarLugares();
});
