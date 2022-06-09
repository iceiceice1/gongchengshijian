import axios from "axios";

export async function getFriends(token){
    try{
        const res = await axios.get('/api/friends', 
            {'headers': {'Authorization': 'Bearer ' + token }})
        // console.log(res);
        return res;
    }
    catch(err){
        return err;
    }
}

export async function searchFriends(content, token){
    try{
        const res = await axios.get('/api/friendsSearch', {
            'headers' : {'Authorization' : 'Bearer ' + token },
            'params' : {
                content: content,
                fuzzy: true
            }
        })
        console.log(res);
        return res;
    }
    catch(err){
        return err
    }
}

export async function deleteFriend(token, _id){
    try{
        const res = await axios.delete('/api/friend', {
            'headers' : {'Authorization' : 'Bearer ' + token },
            'params' : {
                _id: _id
            }
        })
        console.log(res);
        return res;
    }
    catch(err){
        return err;
    }
}

export async function searchAll(content, token){
    try {
        const res = await axios.get('/api/usersSearch', {
            'headers' : {'Authorization' : 'Bearer ' + token },
            'params' : {
                content: content,
                fuzzy: true
            }
        })
        return res
    }
    catch (err) {
        return err
    }
}

export async function addfriend(token, _id){
    try{
        const res = await axios.post('/api/friend', {_id: _id} ,
        {
            'headers' : {'Authorization' : 'Bearer ' + token }
        })
        return res
    }
    catch(err){
        return err
    }
}