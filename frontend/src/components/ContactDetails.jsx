import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { Button, ButtonGroup, Card, CardHeader, CardContent, Tab, TextField, CardActions, Stack, Typography, List, ListItem, ListItemText, ListSubheader, IconButton, Box } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

function ContactDetails() {

    const { token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== MUI - Tabs
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        if (newValue === "1" || newValue === "3") {
            setEmail("");
            setPhone("");
            setAddress("");
            setInputSocial({
                platformName: "",
                baseURL: "",
                username: ""
            });
            setValue(newValue);
        }
        setUpdateId("");
        setDeleteId("");
        setValue(newValue);
    }

    // =========================================================================================== CREATE TAB
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [inputSocial, setInputSocial] = useState({
        platformName: "",
        baseURL: "",
        username: ""
    });
    const { platformName, baseURL, username } = inputSocial;
    const [social, setSocial] = useState([]);
    //-------------------------------------------------------------------------------------------
    const onChangeHandler = (event) => {
        setInputSocial((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSocial = () => {
        if (!platformName || !baseURL || !username) {
            console.log("Please fill all social fields"); // Debug Log
            toast.info("Please fill all social fields");
        } else {
            setSocial((prevState) => [...prevState, inputSocial]);
            setInputSocial({
                platformName: "",
                baseURL: "",
                username: ""
            });
        }
    }

    const deleteSocial = (id) => {
        const filteredResult = social.filter((item, index) => index !== id);
        setSocial(filteredResult);
    }
    //-------------------------------------------------------------------------------------------
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!email || !phone || !address || social.length === 0) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            const contactData = {
                email,
                phone,
                address,
                social
            }
            const response = await createContactInfo(contactData);
            if (response) {
                setEmail("");
                setPhone("");
                setAddress("");
                setSocial([]);
                console.log(response);
            }

        }
    }

    //------------------------------------------------------------------------------------------- API

    const createContactInfo = async (contactData) => {
        setOpenLoading(true);
        try {
            const response = await axios.post("/api/info/contact", contactData, {
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
    const [contact, setContact] = useState([]);
    //------------------------------------------------------------------------------------------- API
    const readContactInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.get("/api/info/contact");
            if (response) {
                setOpenLoading(false);
                setContact(response.data);
                return response;
            }
        } catch (error) {
            console.log(error); // Debug Log
            setContact([]);
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
        setEmail(info.email);
        setPhone(info.phone);
        setAddress(info.address);
        setSocial(info.social);
        setUpdateId(info._id);
    }

    const onUpdateHandler = async (event) => {
        event.preventDefault();
        if (!email || !phone || !address || social.length === 0) {
            console.log("Please provide all the details"); // Debug Log
            toast.info("Please provide all the details");
        } else {
            const contactData = {
                email,
                phone,
                address,
                social
            }
            const response = await updateContactInfo(contactData);
            if (response) {
                setUpdateId("");
                console.log(response); // Debug Log
            }

        }
    }

    //------------------------------------------------------------------------------------------- API

    const updateContactInfo = async (contactData) => {
        setOpenLoading(true);
        try {
            const response = await axios.patch(`/api/info/contact/${updateId}`, contactData, {
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
        setEmail(info.email);
        setPhone(info.phone);
        setAddress(info.address);
        setSocial(info.social);
        setDeleteId(info._id);
    }
    //------------------------------------------------------------------------------------------- API
    const deleteContactInfo = async () => {
        setOpenLoading(true);
        try {
            const response = await axios.delete(`/api/info/contact/${deleteId}`, {
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
                title="Contact Information"
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
                        <Tab label="Read" value="2" icon={<StorageTwoToneIcon />} iconPosition="start" onClick={readContactInfo} />
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
                                title="Contact Details"
                                subheader="Create"
                            />
                            <form onSubmit={onSubmitHandler}>
                                <CardContent>
                                    <Stack spacing={1}>
                                        <TextField size="small" color="secondary" variant="outlined" type="email" label="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Phone"
                                            name="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Address"
                                            name="address"
                                            multiline
                                            maxRows={4}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />

                                        <Typography color="text.secondary">Social Media</Typography>

                                        {
                                            social.length
                                                ? <List>
                                                    {
                                                        social.map((item, index) => {
                                                            return <ListItem
                                                                key={index}
                                                                disablePadding
                                                                secondaryAction={
                                                                    <IconButton edge="end" onClick={() => deleteSocial(index)}>
                                                                        <DeleteTwoToneIcon />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <ListItemText
                                                                    primary={item.platformName}
                                                                    secondary={item.username}
                                                                />

                                                            </ListItem>

                                                        })
                                                    }
                                                </List>
                                                : null
                                        }

                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Social Platform"
                                            name="platformName"
                                            value={platformName}
                                            onChange={onChangeHandler}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Base URL"
                                            name="baseURL"
                                            value={baseURL}
                                            onChange={onChangeHandler}
                                        />
                                        <TextField size="small" color="secondary" variant="outlined" type="text" label="Username"
                                            name="username"
                                            value={username}
                                            onChange={onChangeHandler}
                                        />
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="outlined"
                                            onClick={handleSocial}
                                        >
                                            Add Social
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
                                title="Contact Details"
                                subheader="Read"
                            />
                            {
                                contact.length
                                    ? contact.map((info, index) => {
                                        return <Box key={index}>
                                            <CardContent>
                                                <Typography color="text.secondary">Email</Typography>
                                                <Typography variant="h6" noWrap>{info.email}</Typography>
                                                <Typography color="text.secondary">Phone</Typography>
                                                <Typography variant="h6">{info.phone}</Typography>
                                                <Typography color="text.secondary">Address</Typography>
                                                <Typography variant="h6">{info.address}</Typography>
                                                {
                                                    info.social
                                                        ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                            <ListSubheader disableSticky>
                                                                Social Network
                                                            </ListSubheader>
                                                            {
                                                                info.social.map((soc, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                    >
                                                                        <ListItemText
                                                                            primary={soc.platformName}
                                                                            secondary={
                                                                                <>
                                                                                    <Typography
                                                                                        sx={{ display: 'inline' }}
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        color="text.primary"
                                                                                    >
                                                                                        {soc.username}
                                                                                    </Typography>
                                                                                    {` — ${soc.baseURL}`}
                                                                                </>
                                                                            }
                                                                        />

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
                                        Contact information not found, please create.
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
                                title="Contact Details"
                                subheader="Update"
                            />
                            {
                                updateId !== ""
                                    ? <form onSubmit={onUpdateHandler}>
                                        <CardContent>

                                            <Stack spacing={1}>

                                                <TextField size="small" color="secondary" variant="outlined" type="email" label="Email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Phone"
                                                    name="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Address"
                                                    name="address"
                                                    multiline
                                                    maxRows={4}
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />

                                                {
                                                    social.length
                                                        ? <List>
                                                            {
                                                                social.map((soc, index) => {
                                                                    return <ListItem
                                                                        key={index}
                                                                        disablePadding
                                                                        secondaryAction={
                                                                            <IconButton edge="end" onClick={() => deleteSocial(index)}>
                                                                                <DeleteTwoToneIcon />
                                                                            </IconButton>
                                                                        }
                                                                    >
                                                                        <ListItemText
                                                                            primary={soc.platformName}
                                                                            secondary={
                                                                                <>
                                                                                    <Typography
                                                                                        sx={{ display: 'inline' }}
                                                                                        component="span"
                                                                                        variant="body2"
                                                                                        color="text.primary"
                                                                                    >
                                                                                        {soc.username}
                                                                                    </Typography>
                                                                                    {` — ${soc.baseURL}`}
                                                                                </>
                                                                            }
                                                                        />

                                                                    </ListItem>

                                                                })
                                                            }
                                                        </List>
                                                        : null
                                                }

                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Social Platform"
                                                    name="platformName"
                                                    value={platformName}
                                                    onChange={onChangeHandler}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Base URL"
                                                    name="baseURL"
                                                    value={baseURL}
                                                    onChange={onChangeHandler}
                                                />
                                                <TextField size="small" color="secondary" variant="outlined" type="text" label="Username"
                                                    name="username"
                                                    value={username}
                                                    onChange={onChangeHandler}
                                                />

                                            </Stack>
                                        </CardContent>

                                        <CardActions>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleSocial}
                                                >
                                                    Add Social
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
                                title="Contact Details"
                                subheader="Delete"
                            />
                            {
                                deleteId !== ""
                                    ? <>
                                        <CardContent>

                                            <Typography color="text.secondary">Email</Typography>
                                            <Typography variant="h6" noWrap>{email}</Typography>
                                            <Typography color="text.secondary">Phone</Typography>
                                            <Typography variant="h6">{phone}</Typography>
                                            <Typography color="text.secondary">Address</Typography>
                                            <Typography variant="h6">{address}</Typography>

                                            {
                                                social
                                                    ? <List dense sx={{ border: "1px solid lightgray" }}>
                                                        <ListSubheader disableSticky>
                                                            Social Network
                                                        </ListSubheader>
                                                        {
                                                            social.map((soc, index) => {
                                                                return <ListItem
                                                                    key={index}
                                                                >
                                                                    <ListItemText
                                                                        primary={soc.platformName}
                                                                        secondary={
                                                                            <>
                                                                                <Typography
                                                                                    sx={{ display: 'inline' }}
                                                                                    component="span"
                                                                                    variant="body2"
                                                                                    color="text.primary"
                                                                                >
                                                                                    {soc.username}
                                                                                </Typography>
                                                                                {` — ${soc.baseURL}`}
                                                                            </>
                                                                        }
                                                                    />

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
                                                onClick={deleteContactInfo}
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

export default ContactDetails;