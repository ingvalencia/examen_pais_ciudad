import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaisList = () => {
    const [paises, setPaises] = useState([]);
    const [nombre, setNombre] = useState('');
    const [ciudades, setCiudades] = useState([{ nombre: '' }]);
    const [editMode, setEditMode] = useState(false);
    const [editPaisId, setEditPaisId] = useState(null);

    useEffect(() => {
        fetchPaises();
    }, []);

    const fetchPaises = async () => {
        try {
            const response = await axios.get('/api/paises');
            setPaises(response.data);
        } catch (error) {
            console.error('Error fetching paises', error);
        }
    };

    const handleAddPais = async () => {
        try {
            const response = await axios.post('/api/paises', { nombre, ciudades });
            fetchPaises();
            setNombre('');
            setCiudades([{ nombre: '' }]);
            Swal.fire('País agregado', response.data.nombre, 'success');
        } catch (error) {
            console.error('Error adding pais', error);
            Swal.fire('Error', 'No se pudo agregar el país', 'error');
        }
    };

    const handleEditPais = async () => {
        try {
            const response = await axios.put(`/api/paises/${editPaisId}`, { nombre, ciudades });
            fetchPaises();
            setNombre('');
            setCiudades([{ nombre: '' }]);
            setEditMode(false);
            setEditPaisId(null);
            Swal.fire('País actualizado', response.data.nombre, 'success');
        } catch (error) {
            console.error('Error updating pais', error);
            Swal.fire('Error', 'No se pudo actualizar el país', 'error');
        }
    };

    const handleAddCityField = () => {
        setCiudades([...ciudades, { nombre: '' }]);
    };

    const handleCityChange = (index, event) => {
        const values = [...ciudades];
        values[index].nombre = event.target.value;
        setCiudades(values);
    };

    const handleDeletePais = async (id) => {
        try {
            await axios.delete(`/api/paises/${id}`);
            fetchPaises();
            Swal.fire('País eliminado', '', 'success');
        } catch (error) {
            console.error('Error deleting pais', error);
            Swal.fire('Error', 'No se pudo eliminar el país', 'error');
        }
    };

    const openEditModal = (pais) => {
        setEditMode(true);
        setEditPaisId(pais.id);
        setNombre(pais.nombre);
        setCiudades(pais.ciudades.map(ciudad => ({ nombre: ciudad.nombre })));
    };

    const closeModal = () => {
        setEditMode(false);
        setEditPaisId(null);
        setNombre('');
        setCiudades([{ nombre: '' }]);
    };

    return (
        <div className="container">
            <h1 className="my-4">Lista de Países</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del país"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                {ciudades.map((ciudad, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-control mt-2"
                        placeholder={`Nombre de la ciudad ${index + 1}`}
                        value={ciudad.nombre}
                        onChange={(e) => handleCityChange(index, e)}
                    />
                ))}
                <button className="btn btn-secondary mt-2" onClick={handleAddCityField}>Agregar Ciudad</button>
                {editMode ? (
                    <div>
                        <button className="btn btn-primary mt-2" onClick={handleEditPais}>Actualizar País</button>
                        <button className="btn btn-secondary mt-2" onClick={closeModal}>Cancelar</button>
                    </div>
                ) : (
                    <button className="btn btn-primary mt-2" onClick={handleAddPais}>Agregar País</button>
                )}
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Ciudades</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {paises.map(pais => (
                        <tr key={pais.id}>
                            <td>{pais.id}</td>
                            <td>{pais.nombre}</td>
                            <td>{pais.ciudades.map(ciudad => ciudad.nombre).join(', ')}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mx-1" onClick={() => openEditModal(pais)}>Editar</button>
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeletePais(pais.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaisList;
