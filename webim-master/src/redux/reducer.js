
export default function reducer(preState,action){
    const {type,data}=action
    switch (type){
        case 'change':
            return data;
        default: 
             return {}
    }
   
}