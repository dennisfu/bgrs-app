import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button, ButtonGroup, Card, Dropdown, DropdownButton, ListGroup, Modal, Pagination, Spinner, Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import {setPeopleList, setPeopleSelected} from "../reducers/Actions";
import './People.scss';

export const People = () => {
    // console.log(useSelector(state => state));
    const peopleList = useSelector(state => state.UiReducer.peopleList);
    const peopleSelected = useSelector(state => state.UiReducer.peopleSelected);
    const isLoadingList = useSelector(state=> state.UiReducer.isLoadingList);
    const isLoading = useSelector(state=> state.UiReducer.isLoading);
    
    // const [selected, setSelected] = useState(people.url);
    const [page, setPage] = useState(1);
    const [show, setShow] = useState('');

    const handleClose = () => setShow('');
    const handleShow = (key) => setShow(key);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPeopleList(page)); 
    }, [page]);
    
    const pageContent = (p) => {
        const items=[];
        for (let number = 1; number <= 9; number++) {
            items.push(
            <Pagination.Item key={number} active={number === p} activeLabel="" onClick={number === p? null : ()=>setPage(number)}>
                {number}
            </Pagination.Item>,
            );
        }
        return (
            <Pagination>{items}</Pagination>
        )
    }  
    
    return (
        <div className="people-page">
            {pageContent(page)}
            {isLoadingList ? 
                <Spinner animation="border" variant="primary" /> : 
                <Dropdown>
                    <DropdownButton
                        as={ButtonGroup}
                        key="dropdown-charater"
                        id="dropdown-charater"
                        title={peopleSelected.name?peopleSelected.name:'Select a character'}
                    >
                        {
                            Array.isArray(peopleList) && peopleList.length>0 && 
                            peopleList.map((p, i)=>{
                                return (
                                    <Dropdown.Item 
                                        key={`p${i}`} 
                                        active={p.url===peopleSelected.url}
                                        onClick = {p.url===peopleSelected.url ? null : ()=>dispatch(setPeopleSelected(p.url))}
                                    >{p.name}</Dropdown.Item>
                                )
                            })
                        }    
                    </DropdownButton>
                </Dropdown>
            } 
            <div className="people-card">
            {isLoading ? 
                <Spinner animation="border" variant="primary" /> :
                peopleSelected.name &&
                <Card>
                    <Card.Header><h3>{peopleSelected.name}</h3></Card.Header>
                    <Card.Text>
                        <Tabs defaultActiveKey="movies" id="uncontrolled-tab" className="mb-3">
                            <Tab eventKey="profile" title="Profile">
                                <ListGroup>
                                    <ListGroup.Item variant="primary">Birth Year: {peopleSelected.birth_year}</ListGroup.Item>
                                    <ListGroup.Item>Eye Color: {peopleSelected.eye_color}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">Gender: {peopleSelected.gender}</ListGroup.Item>
                                    <ListGroup.Item>Hair Color: {peopleSelected.hair_color}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">Height: {peopleSelected.height}</ListGroup.Item>
                                    <ListGroup.Item>Mass: {peopleSelected.mass}</ListGroup.Item>
                                    <ListGroup.Item variant="primary">Skin Color: {peopleSelected.skin_color}</ListGroup.Item>
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="movies" title="Movies">
                                <ListGroup>
                                    {Array.isArray(peopleSelected.movies) && peopleSelected.movies.length>0 && peopleSelected.movies.map((m,i)=> {
                                            return (
                                                <ListGroup.Item key={`m${i}`} variant={i%2===0?'primary':''}>
                                                    <Button variant="link" onClick={()=>handleShow(`m${i}`)}>
                                                        {m.title} realesed on {m.release_date}
                                                    </Button>
                                                    <Modal show={show===`m${i}`} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                        <Modal.Title>{m.title}</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <p>Realesed on {m.release_date}</p>
                                                            <p>{m.opening_crawl}</p>
                                                            <p>Director: {m.director}<br />Producer: {m.producer}</p>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                        
                                                        <Button variant="primary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    
                                                </ListGroup.Item> 
                                            )     
                                        }
                                    )}
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="lastyear" title="Last Year">
                                <p>{`${new Date(peopleSelected.lastyear.release_date).getFullYear()} in ${peopleSelected.lastyear.title}`}</p>
                            </Tab>
                        </Tabs>
                    </Card.Text>    
                </Card>
            }
            </div>        
        </div>    
    ) 
}