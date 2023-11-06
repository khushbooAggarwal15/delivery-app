import React from "react";
import { useAuth } from "@/utils/auth";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// import DropZone from "./DropZone";
// import FileUpload from "./FileUpload";
// import CountrySelector from "./CountrySelector";
// import EditorToolbar from "./EditorToolbar";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const userEmail = window.localStorage.getItem("email");
  const userPass = window.localStorage.getItem("password");

  console.log(window.localStorage.getItem("email"));

  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography
          level="h2"
          sx={{
            mt: 1,
            mb: 2,
          }}
        >
          My profile
        </Typography>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
        >
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Name</FormLabel>
              <FormControl
                sx={{
                  display: {
                    sm: "flex-column",
                    md: "flex-row",
                  },
                  gap: 2,
                }}
              >
                <Input
                  size="sm"
                  placeholder="First name"
                  defaultValue="Gagan"
                />
                <Input
                  size="sm"
                  placeholder="Last name"
                  defaultValue="Joshi"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="email"
                  defaultValue="user@gmail.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default Profile;
