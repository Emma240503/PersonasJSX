import s from './Personas.module.css';
import editImage from '@/assets/edit.png';
import deleteImage from '@/assets/delete.png';
import M from '@/assets/M.png';
import F from '@/assets/F.png';
import {useEffect, useState} from 'react';

function Personas() {
    const [personas, setPersonas] = useState([]);
    const [persona, setPersona] = useState({cedula:'',nombre:'',sexo:''});
    useEffect(() => {
        handleList();
    }, []);
    const backend="https://crudcrud.com/api/b787dc9ba4844b14bce57d6f745c4d7b";
    function handleFieldChange(event) {
        const field = event.target;
        const value = field.value;
        const name = field.name;
        let personaChanged = {...persona};
        personaChanged[name] = value;
        setPersona(personaChanged);
    }
    function handleList(){
        const request = new Request(backend+'/personas', {method: 'GET', headers: { }});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            const personas = await response.json();
            setPersonas(personas);
        })();
    }
    function handleEdit(entity){
        setPersona(entity);
    }
    function handleClear(){
        setPersona({cedula:'',nombre:'',sexo:''});
    }
    function handleSave(event){
        event.preventDefault();
        let personaSaved = {...persona};
        let url,method;
        if (personaSaved._id){
            method='PUT';
            url=backend+'/personas/'+personaSaved._id;
            delete personaSaved._id;
        }
        else{
            method='POST';
            url=backend+'/personas';
        }
        const request = new Request(url,{method: method,headers: { 'Content-Type': 'application/json'},body: JSON.stringify(personaSaved)});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            handleClear();
            handleList();
        })();
    }
    function handleDelete(entity){
        const request = new Request(backend+'/personas/'+entity._id,{method: 'DELETE',headers: { 'Content-Type': 'application/json'}});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            handleClear();
            handleList();
        })();
    }

    return (
        <>
            <Edit entity={persona} handleFieldChange={handleFieldChange} handleSave={handleSave} handleClear={handleClear}/>
            <hr/>
            <List list={personas} handleEdit={handleEdit} handleDelete={handleDelete}
            />
        </>
    );
}

function Edit({entity,handleFieldChange,handleSave,handleClear}){
  return (
      <div id="formularioDiv">
          <form name="formulario" id="formulario" onSubmit={handleSave}>
              <table border="0" cellPadding="3" cellSpacing="4">
                  <tbody>
                      <tr>
                          <td className={s.etiqueta}>Cedula</td>
                          <td><input type="text" name="cedula" id="cedula" value={entity.cedula} required onChange={handleFieldChange}/></td>
                      </tr>
                      <tr>
                          <td className={s.etiqueta}>Nombre</td>
                          <td><input type="text" name="nombre" id="nombre" value={entity.nombre} required onChange={handleFieldChange}/></td>
                      </tr>
                      <tr>
                          <td className={s.etiqueta}>Sexo</td>
                          <td>
                              <table>
                                  <tbody>
                                      <tr>
                                          <td><input type="radio" name="sexo" value="M" id="sexoMasc" checked={entity.sexo === 'M'} required onChange={handleFieldChange}/></td>
                                          <td id="tdMasc"></td>
                                          <td><input type="radio" name="sexo" value="F" id="sexoFem" checked={entity.sexo === 'F'} required onChange={handleFieldChange}/></td>
                                          <td id="tdFem"></td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td className={s.titulo} colSpan="2">
                              <input id="registrar" className={s.boton} type="submit" value="Registrar" /> &nbsp;
                              <input id="limpiar" className={s.boton} type="button" value="Limpiar" onClick={handleClear}/>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </form>
      </div>
  )
}

function List({list, handleEdit, handleDelete}){
    return (
        <div id="listadoDiv">
            <table className={s.grid}>
                <thead>
                    <tr><th>Cedula</th>
                        <th>Nombre</th>
                        <th>Sexo</th><th>...</th><th>...</th></tr>
                </thead>
                <tbody id="listado">
                    {list.map(persona => <Item persona={persona} key={persona.cedula} handleEdit={handleEdit} handleDelete={handleDelete}/>)}
                </tbody>
            </table>
        </div>
    );
}

function Item({persona, handleEdit, handleDelete}){
    return (
        <tr>
            <td>{persona.cedula}</td>
            <td>{persona.nombre}</td>
            <td><img className={s.icon} src={persona.sexo === 'M' ? M : F}/></td>
            <td><img src={editImage} onClick={() => handleEdit(persona)}/></td>
            <td><img src={deleteImage} onClick={() => handleDelete(persona)}/></td>
        </tr>
    );
}

export default Personas;
