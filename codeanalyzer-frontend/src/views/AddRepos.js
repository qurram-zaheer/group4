import {useContext, useState} from "react";
import {Button, Input} from "reactstrap";
import {api} from "../lib/api";
import {useHistory} from "react-router-dom";
import GithubContext from "../contexts/GithubContext";
import {useToken} from "../auth/useToken";

const AddRepos = () => {
    const [count, setCount] = useState(1)
    const [token, setToken] = useToken()
    const [fillState, setFillState] = useState({})
    const history = useHistory()
    const {user, setUser} = useContext(GithubContext)

    const submit = async () => {
        await api.postRepos({
            data: {
                urls: Object.values(fillState),
                user
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return history.push("/admin/index")
    }

    const increaseCount = () => {
        setCount(count + 1)
    }
    const handleChange = (e) => {
        let innerState = fillState
        innerState[e.target.name] = e.target.value
        setFillState(innerState)
    }

    const renderInputs = () => {
        return Array(count).fill(0).map((item, idx) => <div key={idx} style={{display: 'flex', paddingBottom: '10px'}}>
            <Input onChange={(e) => {
                handleChange(e)
            }} name={idx} style={{marginRight: '5px'}}/>
            <Button onClick={increaseCount} style={{boxShadow: 'none'}} className='btn-default'>Add</Button>
        </div>)

    }
    return <div style={{height: '100%', display: 'flex'}}
                className='flex-column justify-content-center align-content-center mt-9'>
        <div style={{margin: 'auto'}}>
            <div className='pb-5'>Enter the URLs for the repositories you would like to analyse <span
                style={{color: '#218838', fontWeight: 'bold'}}>(format:
                /<span style={{color: '#38c2dc'}}>&#123;owner&#125;</span>/<span
                    style={{color: '#38c2dc'}}>&#123;repo&#125;</span>)</span>
            </div>
            <div>{renderInputs()}
                <Button className='btn btn-success w-100' onClick={submit}>Submit Repository List</Button>
            </div>
        </div>
    </div>

}

export default AddRepos