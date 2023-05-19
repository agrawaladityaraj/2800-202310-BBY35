import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import { Title } from "@mantine/core";

import AuthWrapper from "@/components/AuthWrapper";
import JourneyStepper from "@/components/JourneyStepper";
import useSmall from "@/Hooks/useSmall";

export default function AddDog() {
  const small = useSmall(1000);

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <AuthWrapper>
      <Stack sx={{ p: small ? 0 : "2em" }} spacing={small ? 1 : 2}>
        <Title sx={{ paddingLeft: "1em" }} order={small ? 3 : 1}>
          What stage are you on?
        </Title>
        <Box sx={{ padding: "2em" }}>
          <JourneyStepper
            activeStep={activeStep}
            onStepClick={(index: number) => setActiveStep(index)}
            small={small}
            showCard={true}
          />
        </Box>
      </Stack>
    </AuthWrapper>
  );
}
