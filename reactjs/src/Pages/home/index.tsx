import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks"
import useGeolocation from "../../hooks/useGeoLocation";
import { getUsers } from "../../redux/services/authService";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { User } from "../../../types/IUser";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const dispatch = useAppDispatch();
    const { coordinates } = useGeolocation();
    const [nearByUsers, setNearByUsers] = useState<User[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        if (coordinates && coordinates.latitude && coordinates.longitude)
            dispatch(getUsers({ lat: coordinates?.latitude, lang: coordinates?.longitude })).unwrap()
                .then(d => setNearByUsers(d))
    }, [coordinates])
    return <><List >
        {nearByUsers.length > 0 && nearByUsers.map(item =>
            <ListItem key={item.email ?? ""}>
                <ListItemText
                    primary={item.name ?? ""}
                    secondary={item.email ?? ""}
                />
            </ListItem>
        )}
    </List>
        <Button variant="contained" onClick={() => { navigate("/profile") }}> update Profile</Button>
    </>
}