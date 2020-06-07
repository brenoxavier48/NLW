import React, { useState, useEffect, ChangeEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

const CreatePoint = ()=>{

    const [items, setItems] = useState<Item[]>([]);

    const [ufs, setUfs] = useState<Uf[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        setSelectedUf(String(event.target.value));
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        setSelectedCity(String(event.target.value));
    }

    interface Item{
        id: number;
        name: string;
        image_url: string;
    }

    interface Uf{
        id: number;
        sigla: string;
        nome: string;
    }

    interface City{
        id: number;
        nome: string;
    }

    useEffect(()=>{
        api.get('items')
            .then(response => {
                console.log(response);
                setItems(response.data);
            })
    }, [])

    useEffect(()=>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                let ufTratado = response.data.map((el: any) => {
                    return {id: el.id, nome: el.nome, sigla: el.sigla}
                })
                console.log(response);
                setUfs(ufTratado);
            })
    }, [])

    useEffect(()=>{

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                let cityTratado = response.data.map((el: any) => {
                    return {id: el.id, nome: el.nome}
                })
                console.log(response);
                setCities(cityTratado);
            })
    }, [selectedUf])

    

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to='/'>
                    <FiArrowLeft/>
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro de <br/>pontos de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input 
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                        />
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-19.8217822,-43.9879123]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-19.8217822,-43.9879123]}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                <option value="0">Seleciona uma UF</option>
                                {
                                    ufs.map(uf => {
                                        return(
                                            <option 
                                                key={uf.id} 
                                                value={uf.id}>
                                                    {uf.sigla} - {uf.nome}
                                            </option>
                                        )
                                    })
                                }
                                
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Seleciona uma cidade</option>
                                {
                                    cities.map(uf => {
                                        return(
                                            <option 
                                                key={uf.id} 
                                                value={uf.id}>
                                                    {uf.nome}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items.map( (el) => {
                                return(
                                    <li key={el.id}>
                                        <img src={el.image_url} alt="teste"/>
                                        <legend>{el.name}</legend>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;