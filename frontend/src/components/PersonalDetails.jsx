import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
    Avatar, Button, IconButton, Tab, TextField, Typography, Stack,
    styled, List, ListItem, ListSubheader, ListItemText,
    Card, CardHeader, CardContent, CardActions, ButtonGroup, Box
} from "@mui/material";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

const Input = styled('input')({
    display: 'none',
});

function PersonalDetails() {

    const { token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== MUI - Tabs
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        if (newValue === "1" || newValue === "3") {
            setName("");
            setInputProfession("");
            setProfessions([]);
            setSelectedImage("");
            setValue(newValue);
        }
        setUpdateId("");
        setDeleteId("");
        setValue(newValue);
    }

    // =========================================================================================== CREATE TAB
    const [name, setName] = useState("");

    const [inputProfession, setInputProfession] = useState("");
    const [professions, setProfessions] = useState([]);

    const [selectedImage, setSelectedImage] = useState("");
    //-------------------------------------------------------------------------------------------
    const handleFileChange = (event) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image); // base 64 encoding
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        }
    }
    //-------------------------------------------------------------------------------------------
    const handleProfession = () => {
        if (inputProfession !== "") {
            setProfessions((prevState) => [...prevState, inputProfession]);
            setInputProfession("");
        } else {
            return
        }
    }

    const deleteProfession = (id) => {
        const filteredResult = professions.filter((profession, index) => index !== id);
        setProfessions(filteredResult);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (name === "" || professions.length === 0) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a profile picture"); // Debug Log
                toast.info("Please select a profile picture");
            } else {
                const pictureURL = await uploadAdminPicture(selectedImage);
                // Create Personal Info
                const personalData = {
                    name: name,
                    picture: pictureURL,
                    profession: professions
                }
                const response = await createPersonalInfo(personalData);
                if (response) {
                    setName("");
                    setProfessions([]);
                    setSelectedImage("");
                    console.log(response); // Debig Log
                }
            }


        }
    }

    //------------------------------------------------------------------------------------------- API
    const uploadAdminPicture = async (base64EncodedImage) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/upload/admin/picture", { imageString: base64EncodedImage });
            if (response) {
                setOpenLoading(false);
                return response.data.url;
            }
        } catch (error) {
            setOpenLoading(false);
            console.log(error);
        }
    }

    const createPersonalInfo = async (personalData) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/info/personal", personalData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Created");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== READ TAB
    const [personal, setPersonal] = useState([]);
    //------------------------------------------------------------------------------------------- API
    const readPersonalInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.get("/api/info/personal");
            if (response) {
                setOpenLoading(false);
                setPersonal(response.data);
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setPersonal([]);
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== UPDATE TAB
    const [updateId, setUpdateId] = useState("");
    const updateInformation = (info) => {
        setValue("3");
        setSelectedImage(info.picture);
        setName(info.name);
        setProfessions(info.profession);
        setUpdateId(info._id);
    }

    const onUpdateHandler = async (event) => {
        event.preventDefault();
        if (name === "" || professions.length === 0) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            // Upload Profile Picture
            if (!selectedImage) {
                console.log("Please select a profile picture"); // Debug Log
                toast.info("Please select a profile picture");
            } else {
                const pictureURL = await uploadAdminPicture(selectedImage);
                // Update Personal Info
                const id = updateId;
                const personalData = {
                    name: name,
                    picture: pictureURL,
                    profession: professions
                }
                const response = await updatePersonalInfo(id, personalData);
                if (response) {
                    setUpdateId("");
                    console.log(response); // Debug Log
                }
            }


        }
    }
    //------------------------------------------------------------------------------------------- API
    const updatePersonalInfo = async (id, personalData) => {
        setOpenLoading(true);
        try {
            const response = await axios.patch(`/api/info/personal/${id}`, personalData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Updated");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== DELETE TAB
    const [deleteId, setDeleteId] = useState("");
    const deleteInformation = (info) => {
        setValue("4");
        setSelectedImage(info.picture);
        setName(info.name);
        setProfessions(info.profession);
        setDeleteId(info._id);
    }
    //------------------------------------------------------------------------------------------- API
    const deletePersonalInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.delete(`/api/info/personal/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                setOpenLoading(false);
                toast.success("Successfully Deleted");
                setDeleteId("");
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setOpenLoading(false);
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
    }

    // =========================================================================================== RENDER
    return (
        <Card>
            <CardHeader
                title="Personal Information"
                subheader="Manager"
            />

            <CardContent>

                <TabContext value={value}>
                    <TabList
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        variant="scrollable"
                    >
                        <Tab label="Create" value="1" icon={<CreateTwoToneIcon />} iconPosition="start" />
                        <Tab label="Read" value="2" icon={<StorageTwoToneIcon />} iconPosition="start" onClick={readPersonalInfo} />
                        <Tab label="Update" value="3" icon={<UpdateTwoToneIcon />} iconPosition="start" />
                        <Tab label="Delete" value="4" icon={<DeleteTwoToneIcon />} iconPosition="start" />
                    </TabList>

                    <TabPanel value="1"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Personal Details"
                                subheader="Create"
                            />
                            <form onSubmit={onSubmitHandler}>
                                <CardContent>

                                    <center>
                                        <Avatar src={selectedImage} sx={{ mb: 1, height: 128, width: 128 }} />
                                    </center>

                                    <Stack spacing={1}>

                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                        {
                                            professions.length
                                                ? <List>
                                                    {
                                                        professions.map((profession, index) => {
                                                            return <ListItem
                                                                key={index}
                                                                disablePadding
                                                                secondaryAction={
                                                                    <IconButton edge="end" onClick={() => deleteProfession(index)}>
                                                                        <DeleteTwoToneIcon />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <ListItemText primary={profession} />

                                                            </ListItem>

                                                        })
                                                    }
                                                </List>
                                                : null
                                        }

                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Profession"
                                            name="profession"
                                            value={inputProfession}
                                            onChange={(e) => setInputProfession(e.target.value)}
                                            fullWidth
                                        />

                                    </Stack>
                                </CardContent>

                                <CardActions>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary" component="label">
                                            <Input accept="image/*" multiple={false} type="file"
                                                onChange={handleFileChange}
                                            />
                                            <PhotoCamera />
                                        </IconButton>

                                        <Button
                                            variant="outlined"
                                            onClick={handleProfession}
                                        >
                                            Add Profession
                                        </Button>

                                        <LoadingButton
                                            variant="contained"
                                            disableElevation
                                            type="submit"
                                            loading={false}
                                        >
                                            Create
                                        </LoadingButton>
                                    </Stack>
                                </CardActions>
                            </form>
                        </Card>

                    </TabPanel>

                    <TabPanel value="2"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Personal Details"
                                subheader="Read"
                            />
                            {
                                personal.length
                                    ? personal.map((info, index) => {
                                        return <Box key={index}>
                                            <CardContent>
                                                <center>
                                                    <Avatar src={info.picture} sx={{ my: 1, height: 256, width: 256 }} />
                                                </center>
                                                <Typography color="text.secondary">Name</Typography>
                                                <Typography variant="h5">{info.name}</Typography>

                                                {
                                                    info.profession
                                                        ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                            <ListSubheader disableSticky>
                                                                Profession
                                                            </ListSubheader>
                                                            {
                                                                info.profession.map((prof, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                    >
                                                                        <ListItemText primary={prof} />

                                                                    </ListItem>
                                                                })

                                                            }
                                                        </List>
                                                        : null

                                                }
                                            </CardContent>

                                            <CardActions>
                                                <ButtonGroup variant="outlined">
                                                    <Button
                                                        color="success"
                                                        onClick={() => updateInformation(info)}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() => deleteInformation(info)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </CardActions>
                                        </Box>
                                    })
                                    : <CardContent>
                                        Personal information not found, please create.
                                    </CardContent>
                            }

                        </Card>
                    </TabPanel>

                    <TabPanel value="3"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Personal Details"
                                subheader="Update"
                            />
                            {
                                updateId !== ""
                                    ? <form onSubmit={onUpdateHandler}>
                                        <CardContent>
                                            <center>
                                                <Avatar src={selectedImage} sx={{ m: 1, height: 128, width: 128 }} />
                                            </center>

                                            <Stack spacing={1}>

                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />

                                                {
                                                    professions.length
                                                        ? <List>
                                                            {
                                                                professions.map((profession, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                        disablePadding
                                                                        secondaryAction={
                                                                            <IconButton edge="end" onClick={() => deleteProfession(index)}>
                                                                                <DeleteTwoToneIcon />
                                                                            </IconButton>
                                                                        }
                                                                    >
                                                                        <ListItemText primary={profession} />

                                                                    </ListItem>

                                                                })
                                                            }
                                                        </List>
                                                        : null
                                                }

                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Profession"
                                                    name="profession"
                                                    value={inputProfession}
                                                    onChange={(e) => setInputProfession(e.target.value)}
                                                    fullWidth
                                                />

                                            </Stack>
                                        </CardContent>
                                        <CardActions>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton color="primary" component="label">
                                                    <Input accept="image/*" multiple={false} type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                    <PhotoCamera />
                                                </IconButton>

                                                <Button
                                                    variant="outlined"
                                                    onClick={handleProfession}
                                                >
                                                    Add Profession
                                                </Button>

                                                <LoadingButton
                                                    variant="contained"
                                                    color="success"
                                                    disableElevation
                                                    type="submit"
                                                    loading={false}
                                                >
                                                    Update
                                                </LoadingButton>
                                            </Stack>
                                        </CardActions>
                                    </form>
                                    : <CardContent>
                                        What do you want to update?
                                    </CardContent>
                            }
                        </Card>
                    </TabPanel>

                    <TabPanel value="4"
                        sx={{
                            p: 0
                        }}
                    >

                        <Card
                            variant="outlined"
                            square
                        >
                            <CardHeader
                                title="Personal Details"
                                subheader="Delete"
                            />
                            {
                                deleteId !== ""
                                    ? <>
                                        <CardContent>
                                            <center>
                                                <Avatar src={selectedImage} sx={{ my: 1, height: 256, width: 256 }} />
                                            </center>
                                            <Typography color="text.secondary">Name</Typography>
                                            <Typography variant="h5">{name}</Typography>

                                            {
                                                professions
                                                    ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                        <ListSubheader disableSticky>
                                                            Profession
                                                        </ListSubheader>
                                                        {
                                                            professions.map((prof, index) => {
                                                                return <ListItem
                                                                    key={index}
                                                                >
                                                                    <ListItemText primary={prof} />

                                                                </ListItem>
                                                            })

                                                        }
                                                    </List>
                                                    : null

                                            }
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                                onClick={deletePersonalInfo}
                                            >
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </>
                                    : <CardContent>
                                        What do you want to delete?
                                    </CardContent>
                            }
                        </Card>
                    </TabPanel>
                </TabContext>

            </CardContent>

        </Card >
    )
}

export default PersonalDetails;