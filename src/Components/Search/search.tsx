import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SearchEngineListForm from './searchEngineListForm';
import { SearchEngine } from '../../types/types';
import styles from './css/search.module.css';
import DropDownSearchEngineList from './DropDownSearchEngineList';


const Search: React.FC = () => {
  const [searchEngineList, setSearchEngineList] = useState<SearchEngine[]>(() => {
    //список поисковиков
    const saved = localStorage.getItem('searchEngines');
    if (saved)
      return JSON.parse(saved);
    else {
      return [
        { name: 'Google', url: 'https://www.google.com/search?q=' },
        { name: 'Bing', url: 'https://www.bing.com/search?q=' },
        { name: 'Yandex', url: 'https://yandex.ru/search/?text=' },
      ];
    }
  });
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(() => {
    // Последний использованный поисковик
    const saved = localStorage.getItem('selectedEngine');
    if (saved)
      return JSON.parse(saved);
    else
      return searchEngineList[0]
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formIsOpen, setFormIsOpen] = useState(false);

  // открытие страницы поисковика с запросом
  const search = () => {
    window.open(selectedEngine.url + searchTerm, '_blank');
  };

  // Обновляем список поисковиков
  const updateSearchEngineList = (engines: SearchEngine[]) => {
    setSearchEngineList(engines);
  };

  // открытие страницы чата Bing с запросом
  const openBingChat = () => {
    const bingChatUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm) + '&qs=SYC&showconv=1&sendquery=1&FORM=ASCHT2&sp=9&ghc=1&lq=0';
    window.open(bingChatUrl, '_blank');
  };


  // обновление локального хранилища
  useEffect(() => {
    localStorage.setItem('searchEngines', JSON.stringify(searchEngineList));
  }, [searchEngineList]);
  useEffect(() => {
    localStorage.setItem('selectedEngine', JSON.stringify(selectedEngine));
  }, [selectedEngine]);

  return (
    <div>
      <div className={styles.gridContainer}>
        <img className={styles.searchImgsrc} src={selectedEngine.img} alt={selectedEngine.name} />
        <input className={styles.inputField} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className={styles.bingButton} onClick={openBingChat}>BingAI</button>
        <button className={styles.searchButton} onClick={search}>Поиск</button>
        <DropDownSearchEngineList
          items={searchEngineList}
          selectedItem={selectedEngine}
          handleSelect={(engine: SearchEngine) => setSelectedEngine(engine)}
          handleButton={() => setFormIsOpen(true)} />
      </div>

      <Modal isOpen={formIsOpen} onRequestClose={() => setFormIsOpen(false)}>
        <SearchEngineListForm
          initialSearchEngineList={searchEngineList}
          onUpdateSearchEngineList={updateSearchEngineList} />
        <button onClick={() => setFormIsOpen(false)}>Закрыть</button>
      </Modal>
    </div>
  );
};

export default Search;