import { useSelector } from 'react-redux'

export default function GetToken() {
    return useSelector((state: any) => state.auth.token)
}