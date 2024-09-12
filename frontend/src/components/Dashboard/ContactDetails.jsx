import { useState } from "react";

import { Card, CardHeader, CardContent, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import ContactCreate from "./Contact/ContactCreate";
import ContactRead from "./Contact/ContactRead";
import ContactUpdate from "./Contact/ContactUpdate";
import ContactDelete from "./Contact/ContactDelete";

function ContactDetails() {
  // Context
  const { token } = useAdmin();

  // State
  const [tabIndex, setTabIndex] = useState("1");
  const [selectedContact, setSelectedContact] = useState(null);

  // MUI - Tabs
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader title="Contact Information" subheader="Manager" />
      <CardContent>
        <TabContext value={tabIndex}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
          >
            <Tab
              label="Create"
              value="1"
              icon={<CreateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Read"
              value="2"
              icon={<StorageTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Update"
              value="3"
              icon={<UpdateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Delete"
              value="4"
              icon={<DeleteTwoToneIcon />}
              iconPosition="start"
            />
          </TabList>

          <TabPanel
            value="1"
            sx={{
              p: 0,
            }}
          >
            <ContactCreate token={token} setTabIndex={setTabIndex} />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
            <ContactRead
              setSelectedContact={setSelectedContact}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <ContactUpdate
              token={token}
              selectedContact={selectedContact}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <ContactDelete
              token={token}
              selectedContact={selectedContact}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default ContactDetails;
