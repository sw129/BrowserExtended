import React, { useState } from 'react';
import { SearchEngine } from '../../types/types';

interface SearchEngineListFormProps {
    initialSearchEngineList: SearchEngine[];
    onUpdateSearchEngineList: (engines: SearchEngine[]) => void;
}

function SearchEngineListForm({ initialSearchEngineList, onUpdateSearchEngineList }: SearchEngineListFormProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [img, setImg] = useState('');
    const [listSearch, setListSearch] = useState(initialSearchEngineList);


    const handleSubmit = () => {
        onUpdateSearchEngineList(listSearch);
    };

    const handleReset = () => {
        setListSearch(initialSearchEngineList)
    };

    const listRemove = (index: number) => {
        const newList = [...listSearch];
        newList.splice(index, 1);
        setListSearch(newList);
    };

    const listAdd = () => {
        const newList = [...listSearch, { name, url, img }];
        setListSearch(newList);
    };

    const listEdit = (index: number, name: string, url: string, img: string) => {
        const newList = [...listSearch];
        newList[index] = { name, url, img };
        setListSearch(newList);
    };

    return (
        <div>
            <ol>
                {listSearch.map((engine, index) => (
                    <li key={index}>
                        <input value={engine.name} onChange={(e) => listEdit(index, e.target.value, engine.url, engine.img)} />
                        <input value={engine.url} onChange={(e) => listEdit(index, engine.name, e.target.value, engine.img)} />
                        <input value={engine.img} onChange={(e) => listEdit(index, engine.name, engine.url, e.target.value)} />
                        <button type="button" onClick={() => listRemove(index)}>удалить</button>
                    </li>
                ))}
            </ol>
            <div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" />
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
                <input value={img} onChange={(e) => setImg(e.target.value)} placeholder="URL изображения" />
                <button type="button" onClick={listAdd}>Добавить</button>
            </div>
            <button type="button" onClick={handleSubmit}>Принять</button>
            <button type="button" onClick={handleReset}>Сбросить</button>
        </div>
    );
}

export default SearchEngineListForm;
