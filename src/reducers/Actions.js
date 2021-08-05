import axios from 'axios';
export let SET_PEOPLELIST = 'setPeopleList';
export let SET_PEOPLESELECTED = 'setPeopleSelected';
export let SET_LOADINGLIST = 'setLoadingList';
export let SET_LOADING = 'setLoading';


export  function setLoadingList(isLoadingList) {
    return dispatch => {
        dispatch({type: SET_LOADINGLIST, payload: isLoadingList})
    }
}

export  function setLoading(isLoading) {
    return dispatch => {
        dispatch({type: SET_LOADING, payload: isLoading})
    }
}

export function setPeopleList(page) {
    return dispatch => {
        dispatch({type: SET_LOADINGLIST, payload: true});
        dispatch({type: SET_PEOPLESELECTED, payload: {}});
        return axios.get(`https://swapi.dev/api/people/?page=${page}`).then((response) => {
            // console.log(response);
            dispatch({type: SET_PEOPLELIST, payload: response.data.results});
            dispatch({type: SET_LOADINGLIST, payload: false});
        }, (error) => {
            dispatch({type: SET_LOADINGLIST, payload: false});
            dispatch({type: SET_PEOPLELIST, payload: []});
        })
    }
}

export function setPeopleSelected(urlSelected) {
    return dispatch => {
        if (urlSelected==="") {
            dispatch({type: SET_PEOPLESELECTED, payload: {}});
        } else {
            dispatch({type: SET_LOADING, payload: true});
            return axios.get(urlSelected).then((response) => {
                const responseData = response.data;
                if (response.data.films.length>0) {
                    const promises = response.data.films.map((f)=>axios.get(f)
                    .then((res) => {
                        return res.data
                    })
                    .catch((err) => {
                        return {error: err.message};
                    }) );
                    Promise.all(promises).then((reslist) => {
                        const lastyear = reslist.reduce((prev, current) => {
                            return (prev.release_date > current.release_date) ? prev : current
                        })
                        dispatch({type: SET_PEOPLESELECTED, payload: {...responseData,...{movies:reslist, lastyear}}});
                        dispatch({type: SET_LOADING, payload: false});
                    })
                    .catch((err) => {
                        dispatch({type: SET_PEOPLESELECTED, payload: {...responseData,...{movies:[], lastyear:{}}}});
                        dispatch({type: SET_LOADING, payload: false});

                    });
                } else {
                    dispatch({type: SET_PEOPLESELECTED, payload: {...responseData,...{movies:[], lastyear:{}}}});
                    dispatch({type: SET_LOADING, payload: false});
                }
                
            }, (error) => {
                dispatch({type: SET_LOADING, payload: false});
                dispatch({type: SET_PEOPLESELECTED, payload: {}});
            });
        }    
    }
}
