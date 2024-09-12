import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const ContactRead = ({ setSelectedContact, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // States
  const [contacts, setContacts] = useState([]);

  // Handlers
  const updateContact = (contact) => {
    setSelectedContact(contact);
    setTabIndex("3");
  };
  const deleteContact = (contact) => {
    setSelectedContact(contact);
    setTabIndex("4");
  };

  // ---API
  useEffect(() => {
    const readContactInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/info/contact");
        if (response) {
          setOpenLoading(false);
          setContacts(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setContacts([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readContactInfo();
  }, []);

  return (
    <Card variant="outlined" square>
      <CardHeader title="Contact Details" subheader="Read" />
      <Grid container spacing={2}>
        {contacts.length ? (
          contacts.map((contact, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Email
                        </Typography>
                        <Typography variant="h5">{contact.email}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Phone
                        </Typography>
                        <Typography variant="h5">{contact.phone}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Address
                        </Typography>
                        <Typography variant="h5">{contact.address}</Typography>
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{
                          py: 0.5,
                          px: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Social Network
                        </Typography>
                        {contact.social.length ? (
                          <Stack direction={"row"} spacing={1} sx={{ overflow: "hidden", overflowX: "scroll" }}>
                            {contact.social.map((item, index) => {
                              return (
                                <Paper
                                  variant="outlined"
                                  key={index}
                                  sx={{ p: 1 }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Platform Name
                                  </Typography>
                                  <Typography variant="h5">
                                    {item.platformName}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    User Name
                                  </Typography>
                                  <Typography variant="h5">
                                    {item.username}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Base URL
                                  </Typography>
                                  <Typography variant="h5">
                                    {item.baseURL}
                                  </Typography>
                                </Paper>
                              );
                            })}
                          </Stack>
                        ) : null}
                      </Paper>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <ButtonGroup variant="outlined">
                      <Button
                        color="success"
                        onClick={() => updateContact(contact)}
                      >
                        <Typography variant="h5">Update</Typography>
                      </Button>
                      <Button
                        color="error"
                        onClick={() => deleteContact(contact)}
                      >
                        <Typography variant="h5">Delete</Typography>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <CardContent>
            Contact information not found, please create.
          </CardContent>
        )}
      </Grid>
    </Card>
  );
};

export default ContactRead;
