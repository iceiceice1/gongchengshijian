import axios from "axios";

export async function createGroup(token, groupnickname){
    try {
        const res = await axios.post('/api/groups/create', {'groupnickname': groupnickname},
        {'headers': {'Authorization': 'Bearer ' + token }})
        return res;
    }
    catch (err) {
        return err;
    }
}

export async function searchGroup(token, content, searchField){
    try {
        const res = await axios.get('/api/groups/Search', {
            'headers': {'Authorization': 'Bearer ' + token },
            'params' : {
                content : content,
                searchField : searchField,
                searchType : 0
            }
        })
        return res;
    }
    catch (err) {
        return err
    }
}

export async function getMyManageGroups(token){
    try {
        const res = await axios.get('/api/groups/getMyManageGroups', {
            'headers' : {'Authorization': 'Bearer ' + token }
        })
        return res
    }
    catch (err) {
        return err
    }
}


export async function getMyNormalGroups(token){
    try {
        const res = await axios.get('/api/groups/getMyNormalGroups', {
            'headers' : {'Authorization': 'Bearer ' + token }
        })
        return res
    }
    catch (err) {
        return err
    }
}

export async function disbandGroup (token, groupId) {
    try {
        const res = await axios.delete('/api/groups/disbandGroup', {
            'headers': {'Authorization': 'Bearer ' + token },
            'params' : {
                groupId: groupId
            }
        })
        return res
    }
    catch (err) {
        return err
    }
}

export async function joingroup(token, id){
    try {
        const res = await axios.post('/api/groups/joinGroup', {groupId : id}, 
            {'headers': {'Authorization': 'Bearer ' + token }})
        return res
    }
    catch (err) {
        return err
    }
}

export async function exitgroup(token, id){
    try {
        const res = await axios.delete('/api/groups/quitGroup', 
            {   
                'headers': {'Authorization': 'Bearer ' + token },
                'params' : {
                    groupId: id
                }
            })
        return res
    }
    catch (err) {
        return err
    }
}