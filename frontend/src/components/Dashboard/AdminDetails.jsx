import { useState } from "react";

import { Tab, Card, CardHeader, CardContent } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../../contexts/adminContext";

import AdminRead from "./Admin/AdminRead";
import AdminUpdate from "./Admin/AdminUpdate";
import AdminDelete from "./Admin/AdminDelete";

function AdminDetails() {
  // Context
  const { token, admin } = useAdmin();

  // State
  const [tabIndex, setTabIndex] = useState("2");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // MUI - Tabs
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader
        title="Admin Information Manager"
        subheader={`${admin?.name} - ${
          admin?.role === "superAdmin"
            ? "Super Admin"
            : admin?.role === "admin"
            ? "Admin"
            : "Pending"
        }`}
      />

      <CardContent>
        <TabContext value={tabIndex}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
          >
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
            value="2"
            sx={{
              p: 0,
            }}
          >
            <AdminRead
              token={token}
              setSelectedAdmin={setSelectedAdmin}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <AdminUpdate
              token={token}
              selectedAdmin={selectedAdmin}
              setTabIndex={setTabIndex}
            />
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <AdminDelete
              token={token}
              selectedAdmin={selectedAdmin}
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default AdminDetails;
