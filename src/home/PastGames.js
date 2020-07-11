import React, { useState, useEffect } from 'react';
import PastGame from "./PastGame";

const List = (props) => {

    const [size, setSize] = useState(10);//useState(Array.from(Array(30).keys(), n => n + 1));
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 2) {
            if (size < props.games.length) {
                setIsFetching(true);
                console.log('Fetch more games')
            }

        }
    }

    function fetchMoreListItems() {
        setTimeout(() => {
            //setListItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
            setSize(size + 10);
            setIsFetching(false);
        }, 2000);
    }

    return (
        <div className={"centerPastGame"}>
            <p><b>PAST GAMES:</b></p>
            <div >
                {props.games.slice(0, size).map((listItem, i) => <PastGame key={i} props={listItem} />)}
            </div>
            {isFetching && 'Fetching older games...'}
        </div>
    );
};

export default List;