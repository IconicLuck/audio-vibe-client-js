import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProviders";


const AddToPlaylistModal = ({ show, handleClose }) => {

    const { user } = useContext(AuthContext)

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/getPlaylistByUser/${user?.email}`)
            .then(res => res.json())
            .then(data => setPlaylists(data))
    }, [user])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        {
                            playlists.map(playlist => <button
                                key={playlist._id}
                                className="btn w-50 btn-success rounded-pill fw-bold col-4 m-2"
                            >{playlist.playlistName}</button>)
                        }
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToPlaylistModal;