import {
  Stepper,
  StepperProps,
  createStyles,
  getStylesRef as getRef,
} from "@mantine/core";

const useStyles = createStyles((theme, _) => ({
  root: {
    padding: "2em",
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.blue[6],
      theme.colors.cyan[6]
    ),
  },

  stepIcon: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.blue[6],
        theme.colors.cyan[6]
      ),
    },
  },

  step: {
    transition: "transform 150ms ease",
  },

  content: {
    paddingTop: "3em",
  },
}));

export default function StyledStepper(props: StepperProps) {
  const { classes } = useStyles();
  return <Stepper classNames={classes} {...props} />;
}
