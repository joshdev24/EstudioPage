import { useState } from 'react';
import "../styles/contratar.css";

const requisitosPorSociedad = {
SA : {
    labelDueños: 'Accionistas',
    labelAdministradores: 'Directores',
    necesitaDirectores: true,
    necesitaSindicatura: true,
    cantidadMinimaDueños: 2,
    necesitaPEP: true,
    necesitaDDJJBeneficiarioFinal: true,
    necesitaSede: true,
    Capital: '$300.000.000',
  },
  SRL: {
    labelDueños: 'Socios',
    labelAdministradores: 'Gerentes',
    necesitaDirectores: true,
    necesitaSindicatura: false,
    cantidadMinimaDueños: 2,
    necesitaPEP: true,
    necesitaDDJJBeneficiarioFinal: true,
    necesitaSede: true,
    Capital: '$100.000',
  },
  SAS: {
    labelDueños: 'Socios',
    labelAdministradores: 'Gerente',
    necesitaDirectores: false,
    necesitaSindicatura: false,
    cantidadMinimaDueños: 1,
    necesitaPEP: false,
    necesitaDDJJBeneficiarioFinal: true,
    necesitaSede: false,
  }
};

const societyTypes = [
    { id: 'SA', name: 'SA', fullName: 'Sociedad Anónima', capital: 'Capital Mínimo $30.000.000', description: '' },
    { id: 'SAU', name: 'SAU', fullName: 'Sociedad Anónima Unipersonal', capital: 'Capital Mínimo $30.000.000', description: '' },
    { id: 'SRL', name: 'SRL', fullName: 'Sociedad de Responsabilidad Limitada', capital: 'Capital Sugerido $100.000', description: '' }
  ];

export default function FormularioSociedad() {
 const tipoSociedad = localStorage.getItem('tipoSociedadSeleccionada');
  const requisitos = requisitosPorSociedad[tipoSociedad] || {};

  
  const [dueños, setDueños] = useState([
    { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', cuit: '', porcentaje: '' }
  ]);
  const [administradores, setAdministradores] = useState([
    { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', domicilioCABA: '', cuit: '' }
  ]);
  const [sindicos, setSindicos] = useState([
    { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', domicilioCABA: '', cuit: '' }
  ]);
  const [sindicatura, setSindicatura] = useState('No');
  const [capital, setCapital] = useState('');
  const [objeto, setObjeto] = useState('');
  const [pep, setPEP] = useState('');
  const [sede, setSede] = useState('');
  const [fechaCierre, setFechaCierre] = useState('');
  const [polizaDirectores, setPolizaDirectores] = useState(null);
  const [polizaGerentes, setPolizaGerentes] = useState(null);

  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [nombre3, setNombre3] = useState('');

  const agregarDueño = () => {
    setDueños([...dueños, { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', cuit: '', porcentaje: '' }]);
  };

  const eliminarDueño = (index) => {
    const nuevosDueños = [...dueños];
    nuevosDueños.splice(index, 1);
    setDueños(nuevosDueños);
  };

  const esMayorDeEdad = (fecha) => {
    if (!fecha) return false;
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad >= 18;
  };

  const agregarAdministrador = () => {
    setAdministradores([...administradores, { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', domicilioCABA: '', cuit: '' }]);
  };

  const eliminarAdministrador = (index) => {
    const nuevosAdministradores = [...administradores];
    nuevosAdministradores.splice(index, 1);
    setAdministradores(nuevosAdministradores);
  };

  const agregarSindico = () => {
    setSindicos([...sindicos, { nombre: '', dni: '', nacionalidad: '', estadoCivil: '', profesion: '', nacimiento: '', domicilio: '', domicilioCABA: '', cuit: '' }]);
  };

  const eliminarSindico = (index) => {
    const nuevosSindicos = [...sindicos];
    nuevosSindicos.splice(index, 1);
    setSindicos(nuevosSindicos);
  };

  const handleChange = (setter, index, field, value) => {
    const updated = [...setter];
    updated[index][field] = value;
    return updated;
  };

  // Función para validar arrays de personas
  const validarCamposArray = (arr, campos) => {
    for (let i = 0; i < arr.length; i++) {
      for (let campo of campos) {
        if (!arr[i][campo] || arr[i][campo].toString().trim() === '') {
          return false;
        }
      }
    }
    return true;
  };

  // Manejo del submit con validaciones
  const handleSubmit = (e) => {
    e.preventDefault();


    if (!nombre1.trim()) {
      alert('Debe ingresar la Opción 1 de nombre de sociedad.');
      return;
    }

    const camposDueños = ['nombre', 'dni', 'nacionalidad', 'estadoCivil', 'profesion', 'nacimiento', 'domicilio', 'cuit', 'porcentaje'];
    if (!validarCamposArray(dueños, camposDueños)) {
      alert(`Complete todos los datos de los ${requisitos.labelDueños.toLowerCase()}.`);
      return;
    }

    for (const d of dueños) {
      if (!esMayorDeEdad(d.nacimiento)) {
        alert('Todos los ' + requisitos.labelDueños.toLowerCase() + ' deben ser mayores de 18 años.');
        return;
      }
    }

    if (tipoSociedad === 'SA' || tipoSociedad === 'SRL') {
      const camposAdmin = ['nombre', 'dni', 'nacionalidad', 'estadoCivil', 'profesion', 'nacimiento', 'domicilio', 'domicilioCABA', 'cuit'];
      if (!validarCamposArray(administradores, camposAdmin)) {
        alert(`Complete todos los datos de los ${requisitos.labelAdministradores.toLowerCase()}.`);
        return;
      }
      for (const a of administradores) {
        if (!esMayorDeEdad(a.nacimiento)) {
          alert('Todos los ' + requisitos.labelAdministradores.toLowerCase() + ' deben ser mayores de 18 años.');
          return;
        }
      }
    }

    if (requisitos.necesitaSindicatura && sindicatura === 'Sí') {
      const camposSindicos = ['nombre', 'dni', 'nacionalidad', 'estadoCivil', 'profesion', 'nacimiento', 'domicilio', 'domicilioCABA', 'cuit'];
      if (!validarCamposArray(sindicos, camposSindicos)) {
        alert('Complete todos los datos de los síndicos.');
        return;
      }
      for (const s of sindicos) {
        if (!esMayorDeEdad(s.nacimiento)) {
          alert('Todos los síndicos deben ser mayores de 18 años.');
          return;
        }
      }
    }

    if (!capital) {
      alert('Debe ingresar el capital social.');
      return;
    }

    if (!objeto.trim()) {
      alert('Debe ingresar el objeto de la sociedad.');
      return;
    }

    if (requisitos.necesitaPEP && !pep) {
      alert('Debe seleccionar si algún director es Persona Políticamente Expuesta (PEP).');
      return;
    }

    if (requisitos.necesitaSede && !sede.trim()) {
      alert('Debe ingresar la sede social en CABA.');
      return;
    }

    if (!fechaCierre) {
      alert('Debe ingresar la fecha de cierre del ejercicio económico.');
      return;
    }

    // Si llegamos acá, todo está validado
    alert('Formulario enviado con éxito!');

    // Aquí podés hacer el envío real de datos o resetear el formulario

  };

  // Componente label con asterisco rojo
  const LabelObligatorio = ({ children }) => (
    <h4>
      {children} <span style={{ color: 'red' }}>*</span>
    </h4>
  );

  return (
    <>
    
     <div className="hero-section">
      <h1 className="hero-title-2">
  Completa el formulario <br />
  y arma tu propia {societyTypes.find(s => s.id === tipoSociedad)?.fullName || ''}
</h1>
          <div className="hero-divider"></div>
        </div>

    <form onSubmit={handleSubmit}>



      {tipoSociedad && (
        <>
          <div> 
            <h3>Nombre de la Sociedad <span style={{ color: 'red' }}>*</span></h3>
            <h4><LabelObligatorio>Opción 1:</LabelObligatorio></h4>
            <input
              type="text"
              required
              value={nombre1}
              onChange={(e) => setNombre1(e.target.value)}
            />
          </div>
          <div>
            <h4> Opción 2:</h4>
            <input
              type="text"
              value={nombre2}
              onChange={(e) => setNombre2(e.target.value)}
            />
          </div>
          <div>
            <h4> Opción 3:</h4>
            <input
              type="text"
              value={nombre3}
              onChange={(e) => setNombre3(e.target.value)}
            />
          </div>

          <h3>{requisitos.labelDueños} <span style={{ color: 'red' }}>*</span></h3>
          {dueños.map((d, i) => (
            <div key={i} className="bloque-dueño" style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '12px', boxShadow:  '0 4px 8px 3px rgba(0, 0, 0, 0.1)'   }}>
              <LabelObligatorio>Nombre Completo:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.nombre}
                onChange={(e) => setDueños(handleChange(dueños, i, 'nombre', e.target.value))}
              />

              <LabelObligatorio>DNI / Pasaporte:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.dni}
                onChange={(e) => setDueños(handleChange(dueños, i, 'dni', e.target.value))}
              />

              <LabelObligatorio>Nacionalidad:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.nacionalidad}
                onChange={(e) => setDueños(handleChange(dueños, i, 'nacionalidad', e.target.value))}
              />

              <LabelObligatorio>Estado Civil:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.estadoCivil}
                onChange={(e) => setDueños(handleChange(dueños, i, 'estadoCivil', e.target.value))}
              />

              <LabelObligatorio>Profesión:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.profesion}
                onChange={(e) => setDueños(handleChange(dueños, i, 'profesion', e.target.value))}
              />

              <LabelObligatorio>Fecha de nacimiento:</LabelObligatorio>
              <input
                type="date"
                required
                value={d.nacimiento}
                onChange={(e) => {
                  const nuevaFecha = e.target.value;
                  const actualizados = handleChange(dueños, i, 'nacimiento', nuevaFecha);
                  setDueños(actualizados);
                }}
              />
              {d.nacimiento && !esMayorDeEdad(d.nacimiento) && (
                <p style={{ color: 'red' }}>Debe ser mayor de 18 años</p>
              )}

              <LabelObligatorio>Domicilio real:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.domicilio}
                onChange={(e) => setDueños(handleChange(dueños, i, 'domicilio', e.target.value))}
              />

              <LabelObligatorio>CUIT:</LabelObligatorio>
              <input
                type="text"
                required
                value={d.cuit}
                onChange={(e) => setDueños(handleChange(dueños, i, 'cuit', e.target.value))}
              />

              <LabelObligatorio>Participación (%):</LabelObligatorio>
              <input
                type="number"
                required
                value={d.porcentaje}
                onChange={(e) => setDueños(handleChange(dueños, i, 'porcentaje', e.target.value))}
              />

              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => eliminarDueño(i)}
                  disabled={dueños.length === 1}
                  className='btn-eliminar'
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={agregarDueño}>
            + Agregar {requisitos.labelDueños.slice(0, -1)}
          </button>

          <h4>
            <LabelObligatorio>
              {tipoSociedad === 'SA' ? 'Capital Social (mínimo capital ' + requisitos.Capital + ')' : 'Capital Social (mínimo sugerido ' + requisitos.Capital + ')'}
            </LabelObligatorio>
          </h4>
          <input
            type="number"
            required
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />

          <h4><LabelObligatorio>Objeto de la Sociedad:</LabelObligatorio></h4>
          <textarea
            required
            value={objeto}
            onChange={(e) => setObjeto(e.target.value)}
          />

          {(tipoSociedad === 'SA' || tipoSociedad === 'SRL') && (
            <>
              <h3>{requisitos.labelAdministradores} <span style={{ color: 'red' }}>*</span></h3>
              {administradores.map((a, i) => (
                <div key={i} className="bloque-administrador" style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '12px', boxShadow:  '0 4px 8px 3px rgba(0, 0, 0, 0.1)'   }}>
                  <LabelObligatorio>Nombre Completo:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.nombre}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'nombre', e.target.value))}
                  />

                  <LabelObligatorio>DNI / Pasaporte:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.dni}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'dni', e.target.value))}
                  />

                  <LabelObligatorio>Nacionalidad:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.nacionalidad}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'nacionalidad', e.target.value))}
                  />

                  <LabelObligatorio>Estado Civil:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.estadoCivil}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'estadoCivil', e.target.value))}
                  />

                  <LabelObligatorio>Profesión:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.profesion}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'profesion', e.target.value))}
                  />

                  <LabelObligatorio>Fecha de nacimiento:</LabelObligatorio>
                  <input
                    type="date"
                    required
                    value={a.nacimiento}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'nacimiento', e.target.value))}
                  />

                  <LabelObligatorio>Domicilio real:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.domicilio}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'domicilio', e.target.value))}
                  />

                  <LabelObligatorio>Domicilio constituido en CABA:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.domicilioCABA}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'domicilioCABA', e.target.value))}
                  />

                  <LabelObligatorio>CUIT:</LabelObligatorio>
                  <input
                    type="text"
                    required
                    value={a.cuit}
                    onChange={(e) => setAdministradores(handleChange(administradores, i, 'cuit', e.target.value))}
                  />

                  <div style={{ marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => eliminarAdministrador(i)}
                      disabled={administradores.length === 1}
                      className='btn-eliminar'
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={agregarAdministrador}>
                + Agregar {requisitos.labelAdministradores.slice(0, -1)}
              </button>
            </>
          )}

          {requisitos.necesitaSindicatura && (
            <>
              <h4><LabelObligatorio>¿Sindicatura? (Sí / No):</LabelObligatorio></h4>
              <select
                required
                value={sindicatura}
                onChange={(e) => setSindicatura(e.target.value)}
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>

              {sindicatura === 'Sí' && (
                <>
                  <h3>Síndicos <span style={{ color: 'red' }}>*</span></h3>
                  {sindicos.map((s, i) => (
                    <div key={i} className="bloque-sindico" style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '12px', boxShadow:  '0 4px 8px 3px rgba(0, 0, 0, 0.1)'   }}>
                      <LabelObligatorio>Nombre Completo:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.nombre}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'nombre', e.target.value))}
                      />

                      <LabelObligatorio>DNI / Pasaporte:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.dni}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'dni', e.target.value))}
                      />

                      <LabelObligatorio>Nacionalidad:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.nacionalidad}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'nacionalidad', e.target.value))}
                      />

                      <LabelObligatorio>Estado Civil:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.estadoCivil}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'estadoCivil', e.target.value))}
                      />

                      <LabelObligatorio>Profesión:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.profesion}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'profesion', e.target.value))}
                      />

                      <LabelObligatorio>Fecha de nacimiento:</LabelObligatorio>
                      <input
                        type="date"
                        required
                        value={s.nacimiento}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'nacimiento', e.target.value))}
                      />

                      <LabelObligatorio>Domicilio real:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.domicilio}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'domicilio', e.target.value))}
                      />

                      <LabelObligatorio>Domicilio constituido en CABA:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.domicilioCABA}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'domicilioCABA', e.target.value))}
                      />

                      <LabelObligatorio>CUIT:</LabelObligatorio>
                      <input
                        type="text"
                        required
                        value={s.cuit}
                        onChange={(e) => setSindicos(handleChange(sindicos, i, 'cuit', e.target.value))}
                      />

                      <div style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => eliminarSindico(i)}
                          disabled={sindicos.length === 1}
                          className='btn-eliminar'
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={agregarSindico}>
                    + Agregar Síndico
                  </button>
                </>
              )}
            </>
          )}

          {requisitos.necesitaPEP && (
            <>
              <h4><LabelObligatorio>¿Algún director es Persona Políticamente Expuesta (PEP)?</LabelObligatorio></h4>
              <select
                required
                value={pep}
                onChange={(e) => setPEP(e.target.value)}
              >
                <option value="">Seleccione</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </>
          )}

          {requisitos.necesitaSede && (
            <>
              <h4><LabelObligatorio>Sede social en CABA:</LabelObligatorio></h4>
              <input
                type="text"
                required
                value={sede}
                onChange={(e) => setSede(e.target.value)}
              />
            </>
          )}

          <h4><LabelObligatorio>Fecha de cierre del ejercicio económico:</LabelObligatorio></h4>
          <input
            type="date"
            required
            value={fechaCierre}
            onChange={(e) => setFechaCierre(e.target.value)}
          />

          {(tipoSociedad === 'SA' || tipoSociedad === 'SRL') && (
            <>
              <h4>¿Poseen póliza de responsabilidad civil para directores?</h4>
              <input
                type="file"
                onChange={(e) => setPolizaDirectores(e.target.files[0])}
              />
              <h4>¿Poseen póliza de responsabilidad civil para gerentes?</h4>
              <input
                type="file"
                onChange={(e) => setPolizaGerentes(e.target.files[0])}
              />
            </>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button type="submit">Enviar</button>
          </div>
        </>
      )}
    </form>
    </>
  );
}
