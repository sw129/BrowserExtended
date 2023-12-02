import React, { useState } from 'react';
import styles from './css/DropDownSearchEngineList.module.css'
import { SearchEngine } from '../../types/types';

interface DropDownSearchEngineListProps {
    items: SearchEngine[];
    selectedItem: SearchEngine;
    handleSelect: (selectedItem: SearchEngine) => void;
    handleButton: () => void;
}

const DropDownSearchEngineList: React.FC<DropDownSearchEngineListProps> = ({ items, selectedItem, handleSelect, handleButton }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItemState, setSelectedItem] = useState<SearchEngine>(selectedItem);

    const handleItemClick = (item: SearchEngine) => {
        setSelectedItem(item);
        setIsOpen(false);
        handleSelect(item);
    };

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
                {selectedItemState.name}
            </div>
            {isOpen && (
                <ul className={styles.dropdownList}>
                    {items.map((item) => (
                        <li key={item.name} onClick={() => handleItemClick(item)}>{item.name}</li>
                    ))}
                    <li><button onClick={handleButton}>Изменить список</button></li>
                </ul>
            )}
        </div>
    );
};

export default DropDownSearchEngineList;
