import { FormControl, FormLabel, Input, Stack } from "@mui/material";
import React from "react";

function AddressStep() {
  return (
    <>
      <p>
        Address
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
                <Input placeholder="First name" defaultValue="First name" />
                <Input
                  placeholder="Last name"
                  defaultValue="Last name"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email"
                  defaultValue="user@gmail.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </p>
    </>
  );
}

export default AddressStep;
