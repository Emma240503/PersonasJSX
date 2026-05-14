import s from './Productos.module.css';
import editImage from '@/assets/edit.png';
import deleteImage from '@/assets/delete.png';
import {useEffect, useState} from 'react';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({codigo:'',descripcion:'',precio:0});
    useEffect(() => {
        handleList();
    }, []);

    const backend="https://crudcrud.com/api/c12bb9889e2b482d95060cefefd91e07";

    function handleList(){
        const request = new Request(backend+'/productos', {method: 'GET', headers: { }});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            const productos = await response.json();
            setProductos(productos);
        })();
    }

    function handleEdit(entity){
        setProducto(entity);
    }

    function handleClear(){
        setProducto({codigo:'',descripcion:'',precio:0});
    }

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let productoChanged = {...producto};
        productoChanged[name] = value;
        setProducto(productoChanged);
    }

    function handleSave(event){
        event.preventDefault();
        let productoSaved = {...producto};
        let url,method;
        if (productoSaved._id){
            method='PUT';
            url=backend+'/productos/'+productoSaved._id;
            delete productoSaved._id;
        }
        else{
            method='POST';
            url=backend+'/productos';
        }
        const request = new Request(url,{method: method,headers: { 'Content-Type': 'application/json'},body: JSON.stringify(productoSaved)});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            handleClear();
            handleList();
        })();
    }

    function handleDelete(entity){
        const request = new Request(backend+'/productos/'+entity._id,{method: 'DELETE',headers: { 'Content-Type': 'application/json'}});
        (async ()=>{
            const response = await fetch(request);
            if (!response.ok) {alert("Error: "+response.status);return;}
            handleClear();
            handleList();
        })();
    }

    return (
        <>
            <Edit entity={producto} handleChange={handleChange} handleSave={handleSave} handleClear={handleClear}/>
            <hr/>
            <List list={productos} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </>
    );
}

function Edit({entity,handleChange,handleSave,handleClear}){
  return (
      <div id="formularioDiv">
          <form onSubmit={handleSave}>
              <table border="0" cellPadding="3" cellSpacing="4">
                  <tbody>
                  <tr>
                      <td className={s.etiqueta}>Codigo</td>
                      <td><input type="text" name="codigo" id="codigo" value={entity.codigo} required onChange={handleChange}/></td>
                  </tr>
                  <tr>
                      <td className={s.etiqueta}>Descripcion</td>
                      <td><input type="text" name="descripcion" id="descripcion" value={entity.descripcion} required onChange={handleChange}/></td>
                  </tr>
                  <tr>
                      <td className={s.etiqueta}>Precio</td>
                      <td><input type="number" name="precio" id="precio" value={entity.precio} onChange={handleChange}/></td>
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

function List({list, handleEdit,handleDelete}){
    return (
        <div id="listadoDiv">
            <table className={s.grid}>
                <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>...</th>
                    <th>...</th>
                </tr>
                </thead>
                <tbody id="listado">
                    {list.map(producto => <Item producto={producto} key={producto.codigo} handleEdit={handleEdit} handleDelete={handleDelete}/>)}
                </tbody>
            </table>
        </div>
    );
}

function Item({producto, handleEdit, handleDelete}){
    return (
        <tr>
            <td>{producto.codigo}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.precio}</td>
            <td><img src={editImage} onClick={() => handleEdit(producto)}/></td>
            <td><img src={deleteImage} onClick={() => handleDelete(producto)}/></td>
        </tr>
    );
}
export default Productos;
